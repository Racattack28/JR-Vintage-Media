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
  grandTotal: number;
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
  const { contact, tapes, delivery } = input;

  const addressLines =
    input.serviceType === "mail"
      ? [
          contact.address,
          [contact.city, contact.state, contact.zip].filter(Boolean).join(", "),
        ]
          .filter(Boolean)
          .join("\n")
      : null;

  const lines = [
    `New quote request: ${input.orderNumber}`,
    "",
    `Service: ${input.serviceType === "mail" ? "Mail-in" : "Local drop-off"}`,
    "",
    `Tapes: ${tapes.count} x $${tapes.pricePerTape} = $${tapes.subtotal}`,
    tapes.longSurcharge > 0
      ? `Long recordings: ${tapes.longMedCount} x 2-4hr, ${tapes.longMaxCount} x 4-6hr (+$${tapes.longSurcharge})`
      : null,
    "",
    `Delivery: ${delivery.method}${delivery.sizeLabel ? ` (${delivery.sizeLabel})` : ""}${delivery.price > 0 ? ` +$${delivery.price}` : " (free)"}`,
    "",
    `Estimated total: $${input.grandTotal}`,
    "",
    "Contact:",
    `  ${contact.name}`,
    `  ${contact.email}`,
    `  ${contact.phone}`,
    addressLines ? `  ${addressLines.replace(/\n/g, "\n  ")}` : null,
  ].filter((line): line is string => line !== null);

  await client.sendMail({
    from: `"JR Vintage Media" <${process.env.SMTP_USER}>`,
    to: notifyTo,
    replyTo: contact.email,
    subject: `New quote request ${input.orderNumber} - ${contact.name}`,
    text: lines.join("\n"),
  });

  return { sent: true };
}
