import nodemailer from "nodemailer";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  return transporter;
}

export interface QuoteNotificationInput {
  orderNumber: string;
  serviceType: "local" | "mail" | null;
  tapes: {
    count: number;
    pricePerTape: number;
    subtotal: number;
    longMedCount: number;
    longMaxCount: number;
    longSurcharge: number;
  };
  delivery: {
    method: string;
    sizeLabel: string | null;
    price: number;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
    address: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
  };
  notes: string | null;
  grandTotal: number;
}

const DELIVERY_LABELS: Record<string, string> = {
  usb: "USB stick",
  harddrive: "External hard drive",
  youtube: "Private YouTube link",
  drive: "Google Drive",
};

// Strips characters that could be used for SMTP header injection (CWE-93)
// if user-supplied text ends up in a header field like Subject.
function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------------------------------------------------------------------------
// Email rendering helpers
//
// These land in Outlook for Windows, which renders with the Word engine:
// no max-width on <div>, no rgba() colours (they fall back to black or drop
// out), unreliable padding/background on <div>, no border-radius, and
// margins on <p> are hit and miss. So the layout is nested presentation
// <table>s with bgcolor attributes, a fixed 520px width, solid hex colours
// and spacer rows instead of margins. A media query narrows it on phones
// for clients that support one; Outlook keeps the fixed width.
// ---------------------------------------------------------------------------

const EMAIL = {
  pageBg: "#f5efe2",
  cardBg: "#fffaf0",
  ink: "#2b2016",
  inkText: "#f5efe2",
  accent: "#d9a15a",
  label: "#8a7a63",
  hairline: "#e6e0d6", // was rgba(43,32,22,0.12) over the cream card
  darkLabel: "#c3bbaf", // was rgba(245,239,226,0.75) over the dark panel
  darkMuted: "#9a9286", // was rgba(245,239,226,0.55) over the dark panel
} as const;

const FONT = "Arial, Helvetica, sans-serif";

function spacerRow(height: number): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td height="${height}" style="height:${height}px;line-height:${height}px;font-size:1px;">&nbsp;</td></tr></table>`;
}

function paragraph(html: string): string {
  return `<p style="margin:0;font-family:${FONT};font-size:14px;line-height:1.6;color:${EMAIL.ink};">${html}</p>`;
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td width="110" style="width:110px;padding:7px 12px 7px 0;font-family:${FONT};color:${EMAIL.label};font-size:13px;line-height:1.4;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
      <td style="padding:7px 0;font-family:${FONT};color:${EMAIL.ink};font-size:14px;line-height:1.5;font-weight:700;">${escapeHtml(value)}</td>
    </tr>`;
}

function rowsTable(rows: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">${rows}</table>`;
}

function sectionBlock(label: string, inner: string): string {
  return `${spacerRow(20)}
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
      <tr>
        <td style="border-top:1px solid ${EMAIL.hairline};padding-top:20px;">
          <p style="margin:0 0 10px;font-family:${FONT};font-size:11px;line-height:14px;letter-spacing:1.5px;color:${EMAIL.label};text-transform:uppercase;">${label}</p>
          ${inner}
        </td>
      </tr>
    </table>`;
}

function totalBox(label: string, amount: string, sub?: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="${EMAIL.ink}" style="width:100%;border-collapse:collapse;background-color:${EMAIL.ink};border-radius:10px;">
      <tr>
        <td style="padding:16px 20px;font-family:${FONT};font-size:13px;line-height:1.4;color:${EMAIL.darkLabel};vertical-align:middle;">${label}${
          sub
            ? `<br /><span style="font-size:11px;line-height:1.4;color:${EMAIL.darkMuted};">${sub}</span>`
            : ""
        }</td>
        <td align="right" style="padding:16px 20px;font-family:${FONT};font-size:20px;line-height:1.2;font-weight:700;color:${EMAIL.inkText};text-align:right;vertical-align:middle;white-space:nowrap;">${amount}</td>
      </tr>
    </table>`;
}

function emailShell(opts: {
  preheader: string;
  kicker: string;
  title: string;
  titleBold?: boolean;
  body: string;
}): string {
  const titleSize = opts.titleBold === false ? "20px" : "22px";
  const titleWeight = opts.titleBold === false ? "normal" : "bold";
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="x-apple-disable-message-reformatting" />
<title>&nbsp;</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<style>
  body, table, td, p, div { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  table, td { mso-table-lspace:0pt; mso-table-rspace:0pt; }
  table { border-collapse:collapse; }
  body { margin:0; padding:0; width:100% !important; background-color:${EMAIL.pageBg}; }
  @media only screen and (max-width:600px) {
    .email-card { width:100% !important; }
    .email-pad { padding-left:20px !important; padding-right:20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${EMAIL.pageBg};">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${EMAIL.pageBg};">${escapeHtml(opts.preheader)}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="${EMAIL.pageBg}" style="width:100%;background-color:${EMAIL.pageBg};">
    <tr>
      <td align="center" style="padding:32px 16px;font-family:${FONT};">
        <!--[if mso]><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="520" align="center"><tr><td><![endif]-->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="520" class="email-card" style="width:520px;max-width:520px;background-color:${EMAIL.cardBg};border:1px solid ${EMAIL.hairline};border-radius:14px;">
          <tr>
            <td class="email-pad" bgcolor="${EMAIL.ink}" style="background-color:${EMAIL.ink};padding:26px 28px;border-radius:14px 14px 0 0;">
              <p style="margin:0 0 8px;font-family:${FONT};font-size:11px;line-height:14px;letter-spacing:2px;color:${EMAIL.accent};text-transform:uppercase;">${opts.kicker}</p>
              <p style="margin:0;font-family:${FONT};font-size:${titleSize};line-height:1.3;font-weight:${titleWeight};color:${EMAIL.inkText};">${opts.title}</p>
            </td>
          </tr>
          <tr>
            <td class="email-pad" style="padding:26px 28px;font-family:${FONT};">
${opts.body}
            </td>
          </tr>
        </table>
        <!--[if mso]></td></tr></table><![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildSummary(input: QuoteNotificationInput) {
  const { contact, tapes, delivery } = input;

  const serviceText = input.serviceType === "mail" ? "Mail-in" : "Local drop-off";

  const tapesText =
    `${tapes.count} tape${tapes.count === 1 ? "" : "s"} x $${tapes.pricePerTape} = $${tapes.subtotal}` +
    (tapes.longSurcharge > 0
      ? ` (+$${tapes.longSurcharge} long-recording surcharge: ${tapes.longMedCount} x 2-4hr, ${tapes.longMaxCount} x 4-6hr)`
      : "");

  const deliveryLabel = DELIVERY_LABELS[delivery.method] ?? delivery.method;
  const deliveryText =
    delivery.price > 0
      ? `${deliveryLabel}, from $${delivery.price}${delivery.sizeLabel ? ` (${delivery.sizeLabel})` : ""}`
      : `${deliveryLabel} (free)`;

  const addressText =
    input.serviceType === "mail"
      ? [contact.address, [contact.city, contact.state, contact.zip].filter(Boolean).join(", ")]
          .filter(Boolean)
          .join(", ")
      : null;

  return { serviceText, tapesText, deliveryText, addressText };
}

export async function sendQuoteNotification(
  input: QuoteNotificationInput
): Promise<{ sent: boolean; reason?: string }> {
  const client = getTransporter();

  if (!client) {
    return {
      sent: false,
      reason:
        "SMTP not configured (missing SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASSWORD env vars)",
    };
  }

  const notifyTo = process.env.QUOTE_NOTIFICATION_EMAIL || process.env.SMTP_USER!;
  const { contact, notes } = input;
  const { serviceText, tapesText, deliveryText, addressText } = buildSummary(input);

  const textLines = [
    `New quote request ${input.orderNumber}`,
    "",
    `Service:  ${serviceText}`,
    `Tapes:    ${tapesText}`,
    `Delivery: ${deliveryText}`,
    notes ? `Notes:    ${notes}` : null,
    "",
    `Estimated total: $${input.grandTotal}`,
    "",
    "Contact",
    `  Name:  ${contact.name}`,
    `  Phone: ${contact.phone}`,
    `  Email: ${contact.email}`,
    addressText ? `  Address: ${addressText}` : null,
  ].filter((line): line is string => line !== null);

  const html = emailShell({
    preheader: `New quote request ${input.orderNumber} from ${contact.name} - estimated $${input.grandTotal}`,
    kicker: "New quote request",
    title: escapeHtml(input.orderNumber),
    body: `${rowsTable(
      row("Service", serviceText) +
        row("Tapes", tapesText) +
        row("Delivery", deliveryText) +
        (notes ? row("Notes", notes) : "")
    )}
${sectionBlock(
  "Contact",
  rowsTable(
    row("Name", contact.name) +
      row("Phone", contact.phone) +
      row("Email", contact.email) +
      (addressText ? row("Address", addressText) : "")
  )
)}
${spacerRow(22)}
${totalBox("Estimated total", `$${input.grandTotal}`)}`,
  });

  await client.sendMail({
    from: `"JR Vintage Media" <${process.env.SMTP_USER}>`,
    to: notifyTo,
    replyTo: sanitizeHeaderValue(contact.email),
    subject: `New quote request ${input.orderNumber} - ${sanitizeHeaderValue(contact.name)}`,
    text: textLines.join("\n"),
    html,
  });

  return { sent: true };
}

export async function sendCustomerConfirmation(
  input: QuoteNotificationInput
): Promise<{ sent: boolean; reason?: string }> {
  const client = getTransporter();

  if (!client) {
    return {
      sent: false,
      reason:
        "SMTP not configured (missing SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASSWORD env vars)",
    };
  }

  const { contact, notes } = input;
  const { serviceText, tapesText, deliveryText, addressText } = buildSummary(input);
  const firstName = contact.name.trim().split(/\s+/)[0] || contact.name;

  const openingText =
    input.serviceType === "mail"
      ? "I'll be in touch shortly to confirm everything. In the meantime, pack your tapes securely (a sturdy box with a bit of padding so they can't shift around) and post them through when you're ready."
      : "I'll be in touch shortly to confirm everything and organise a time for you to drop your tapes by.";

  const textLines = [
    `Hi ${firstName},`,
    "",
    `Thanks for sending through your quote request. ${openingText}`,
    "",
    `Here's a copy of what you sent through, for your records:`,
    "",
    `Order: ${input.orderNumber}`,
    `Service:  ${serviceText}`,
    `Tapes:    ${tapesText}`,
    `Delivery: ${deliveryText}`,
    notes ? `Notes:    ${notes}` : null,
    addressText ? `Address:  ${addressText}` : null,
    "",
    `Estimated total: $${input.grandTotal} (nothing to pay today)`,
    "",
    "If anything's changed or you've got questions in the meantime, just reply to this email, it comes straight to me.",
    "",
    "Thanks again,",
    "Jack",
    "JR Vintage Media",
  ].filter((line): line is string => line !== null);

  const html = emailShell({
    preheader: `Your quote request ${input.orderNumber} - estimated total $${input.grandTotal}, nothing to pay today.`,
    kicker: `Order ${escapeHtml(input.orderNumber)}`,
    title: `Thanks, ${escapeHtml(firstName)}. Got it.`,
    titleBold: false,
    body: `${paragraph(
      `Thanks for sending through your quote request. ${escapeHtml(openingText)}`
    )}
${spacerRow(16)}
${paragraph("Here's a copy of what you sent through, for your records:")}
${spacerRow(18)}
${rowsTable(
  row("Service", serviceText) +
    row("Tapes", tapesText) +
    row("Delivery", deliveryText) +
    (notes ? row("Notes", notes) : "") +
    (addressText ? row("Address", addressText) : "")
)}
${spacerRow(22)}
${totalBox("Estimated total", `$${input.grandTotal}`, "nothing to pay today")}
${spacerRow(22)}
${paragraph(
  "If anything's changed or you've got questions in the meantime, just reply to this email, it comes straight to me."
)}
${spacerRow(18)}
${paragraph("Thanks again,<br />Jack, JR Vintage Media")}`,
  });

  await client.sendMail({
    from: `"Jack at JR Vintage Media" <${process.env.SMTP_USER}>`,
    to: sanitizeHeaderValue(contact.email),
    subject: `Got it, ${sanitizeHeaderValue(firstName)}, your quote request (${input.orderNumber})`,
    text: textLines.join("\n"),
    html,
  });

  return { sent: true };
}

export interface PartnerEnquiryInput {
  referenceNumber: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  vertical: string | null;
  message: string | null;
}

export async function sendPartnerEnquiryNotification(
  input: PartnerEnquiryInput
): Promise<{ sent: boolean; reason?: string }> {
  const client = getTransporter();

  if (!client) {
    return {
      sent: false,
      reason:
        "SMTP not configured (missing SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASSWORD env vars)",
    };
  }

  const notifyTo = process.env.QUOTE_NOTIFICATION_EMAIL || process.env.SMTP_USER!;

  const textLines = [
    `New partner enquiry ${input.referenceNumber}`,
    "",
    `Business: ${input.businessName}`,
    input.vertical ? `Type:     ${input.vertical}` : null,
    input.message ? `Message:  ${input.message}` : null,
    "",
    "Contact",
    `  Name:  ${input.contactName}`,
    `  Phone: ${input.phone}`,
    `  Email: ${input.email}`,
  ].filter((line): line is string => line !== null);

  const html = emailShell({
    preheader: `New partner enquiry ${input.referenceNumber} from ${input.businessName}`,
    kicker: "New partner enquiry",
    title: escapeHtml(input.referenceNumber),
    body: `${rowsTable(
      row("Business", input.businessName) +
        (input.vertical ? row("Type", input.vertical) : "") +
        (input.message ? row("Message", input.message) : "")
    )}
${sectionBlock(
  "Contact",
  rowsTable(
    row("Name", input.contactName) +
      row("Phone", input.phone) +
      row("Email", input.email)
  )
)}`,
  });

  await client.sendMail({
    from: `"JR Vintage Media" <${process.env.SMTP_USER}>`,
    to: notifyTo,
    replyTo: sanitizeHeaderValue(input.email),
    subject: `New partner enquiry ${input.referenceNumber} - ${sanitizeHeaderValue(input.businessName)}`,
    text: textLines.join("\n"),
    html,
  });

  return { sent: true };
}

export async function sendPartnerEnquiryConfirmation(
  input: PartnerEnquiryInput
): Promise<{ sent: boolean; reason?: string }> {
  const client = getTransporter();

  if (!client) {
    return {
      sent: false,
      reason:
        "SMTP not configured (missing SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASSWORD env vars)",
    };
  }

  const firstName = input.contactName.trim().split(/\s+/)[0] || input.contactName;

  const textLines = [
    `Hi ${firstName},`,
    "",
    "Thanks for your interest in partnering with JR Vintage Media. I'll be in touch shortly to talk through how it could work for " +
      `${input.businessName}.`,
    "",
    `Reference: ${input.referenceNumber}`,
    `Business:  ${input.businessName}`,
    input.vertical ? `Type:      ${input.vertical}` : null,
    input.message ? `Message:   ${input.message}` : null,
    "",
    "If there's anything you'd like to add before then, just reply to this email, it comes straight to me.",
    "",
    "Thanks again,",
    "Jack",
    "JR Vintage Media",
  ].filter((line): line is string => line !== null);

  const html = emailShell({
    preheader: "Thanks for your interest in partnering with JR Vintage Media.",
    kicker: `Reference ${escapeHtml(input.referenceNumber)}`,
    title: `Thanks, ${escapeHtml(firstName)}. Got it.`,
    titleBold: false,
    body: `${paragraph(
      `Thanks for your interest in partnering with JR Vintage Media. I'll be in touch shortly to talk through how it could work for ${escapeHtml(
        input.businessName
      )}.`
    )}
${spacerRow(20)}
${rowsTable(
  row("Business", input.businessName) +
    (input.vertical ? row("Type", input.vertical) : "") +
    (input.message ? row("Message", input.message) : "")
)}
${spacerRow(22)}
${paragraph(
  "If there's anything you'd like to add before then, just reply to this email, it comes straight to me."
)}
${spacerRow(18)}
${paragraph("Thanks again,<br />Jack, JR Vintage Media")}`,
  });

  await client.sendMail({
    from: `"Jack at JR Vintage Media" <${process.env.SMTP_USER}>`,
    to: sanitizeHeaderValue(input.email),
    subject: `Got it, ${sanitizeHeaderValue(firstName)}, thanks for your interest in partnering`,
    text: textLines.join("\n"),
    html,
  });

  return { sent: true };
}
