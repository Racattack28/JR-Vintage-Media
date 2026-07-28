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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:7px 0;color:#8a7a63;font-size:13px;width:110px;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
      <td style="padding:7px 0;color:#2b2016;font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
    </tr>`;
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
      ? `${deliveryLabel} — from $${delivery.price}${delivery.sizeLabel ? ` (${delivery.sizeLabel})` : ""}`
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

  const html = `
  <div style="background:#f5efe2;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;">
    <div style="max-width:520px;margin:0 auto;background:#fffaf0;border-radius:14px;overflow:hidden;border:1px solid rgba(43,32,22,0.12);">
      <div style="background:#2b2016;padding:26px 28px;">
        <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;color:#d9a15a;text-transform:uppercase;margin-bottom:8px;">
          New quote request
        </div>
        <div style="color:#f5efe2;font-size:22px;">${escapeHtml(input.orderNumber)}</div>
      </div>
      <div style="padding:26px 28px;">
        <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;">
          ${row("Service", serviceText)}
          ${row("Tapes", tapesText)}
          ${row("Delivery", deliveryText)}
          ${notes ? row("Notes", notes) : ""}
        </table>

        <div style="margin-top:10px;padding-top:20px;border-top:1px solid rgba(43,32,22,0.12);">
          <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:1.5px;color:#8a7a63;text-transform:uppercase;margin-bottom:10px;">
            Contact
          </div>
          <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;">
            ${row("Name", contact.name)}
            ${row("Phone", contact.phone)}
            ${row("Email", contact.email)}
            ${addressText ? row("Address", addressText) : ""}
          </table>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-top:22px;background:#2b2016;border-radius:10px;font-family:Arial,sans-serif;">
          <tr>
            <td style="padding:16px 20px;color:rgba(245,239,226,0.75);font-size:13px;">Estimated total</td>
            <td style="padding:16px 20px;color:#f5efe2;font-size:20px;font-weight:bold;text-align:right;">$${input.grandTotal}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>`;

  await client.sendMail({
    from: `"JR Vintage Media" <${process.env.SMTP_USER}>`,
    to: notifyTo,
    replyTo: contact.email,
    subject: `New quote request ${input.orderNumber} - ${contact.name}`,
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

  const nextStepText =
    input.serviceType === "mail"
      ? "Pack your tapes securely (a sturdy box with a bit of padding so they can't shift around) and post them to me. I'll email you to confirm as soon as they arrive."
      : "Bring your tapes by for drop-off whenever suits you — no need to book a time, just reach out when you're on your way.";

  const textLines = [
    `Hi ${firstName},`,
    "",
    `Thanks for sending through your quote request — I've got it, and this email is your copy for reference.`,
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
    nextStepText,
    "",
    "I'll follow up personally by email soon to confirm the details above. If anything's changed or you've got questions in the meantime, just reply to this email — it comes straight to me.",
    "",
    "Thanks again,",
    "Jack",
    "JR Vintage Media",
  ].filter((line): line is string => line !== null);

  const html = `
  <div style="background:#f5efe2;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;">
    <div style="max-width:520px;margin:0 auto;background:#fffaf0;border-radius:14px;overflow:hidden;border:1px solid rgba(43,32,22,0.12);">
      <div style="background:#2b2016;padding:26px 28px;">
        <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;color:#d9a15a;text-transform:uppercase;margin-bottom:8px;">
          Order ${escapeHtml(input.orderNumber)}
        </div>
        <div style="color:#f5efe2;font-size:20px;">Thanks, ${escapeHtml(firstName)} — got it.</div>
      </div>
      <div style="padding:26px 28px;">
        <p style="margin:0 0 18px;color:#2b2016;font-size:14px;line-height:1.6;font-family:Arial,sans-serif;">
          ${escapeHtml(nextStepText)}
        </p>
        <p style="margin:0 0 20px;color:#2b2016;font-size:14px;line-height:1.6;font-family:Arial,sans-serif;">
          Here's a copy of what you sent through, for your records:
        </p>

        <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;">
          ${row("Service", serviceText)}
          ${row("Tapes", tapesText)}
          ${row("Delivery", deliveryText)}
          ${notes ? row("Notes", notes) : ""}
          ${addressText ? row("Address", addressText) : ""}
        </table>

        <table style="width:100%;border-collapse:collapse;margin-top:22px;background:#2b2016;border-radius:10px;font-family:Arial,sans-serif;">
          <tr>
            <td style="padding:16px 20px;color:rgba(245,239,226,0.75);font-size:13px;">
              Estimated total<br/><span style="font-size:11px;color:rgba(245,239,226,0.55);">nothing to pay today</span>
            </td>
            <td style="padding:16px 20px;color:#f5efe2;font-size:20px;font-weight:bold;text-align:right;vertical-align:middle;">$${input.grandTotal}</td>
          </tr>
        </table>

        <p style="margin:22px 0 0;color:#2b2016;font-size:14px;line-height:1.6;font-family:Arial,sans-serif;">
          I'll follow up personally by email soon to confirm the details above. If anything's changed or you've got questions in the meantime, just reply to this email — it comes straight to me.
        </p>
        <p style="margin:18px 0 0;color:#2b2016;font-size:14px;line-height:1.6;font-family:Arial,sans-serif;">
          Thanks again,<br/>Jack — JR Vintage Media
        </p>
      </div>
    </div>
  </div>`;

  await client.sendMail({
    from: `"Jack at JR Vintage Media" <${process.env.SMTP_USER}>`,
    to: contact.email,
    subject: `Got it, ${firstName} — your quote request (${input.orderNumber})`,
    text: textLines.join("\n"),
    html,
  });

  return { sent: true };
}
