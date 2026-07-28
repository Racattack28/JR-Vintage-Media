import { NextResponse } from "next/server";
import { sendCustomerConfirmation, sendQuoteNotification } from "@/lib/mailer";

interface QuoteRequestBody {
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

function generateOrderNumber(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `JR-${digits}`;
}

export async function POST(request: Request) {
  let body: QuoteRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body?.serviceType || !body?.contact?.name || !body?.contact?.email) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const orderNumber = generateOrderNumber();

  console.log("[quote] New quote request", orderNumber, JSON.stringify(body));

  const emailInput = { orderNumber, ...body };

  const [notifyResult, confirmationResult] = await Promise.allSettled([
    sendQuoteNotification(emailInput),
    sendCustomerConfirmation(emailInput),
  ]);

  // Don't fail the customer's submission just because an email had a
  // problem, their details are already logged above so Jack can follow
  // up manually if needed. Log loudly so it's visible in the hosting
  // provider's server logs.
  if (notifyResult.status === "rejected") {
    console.error("[quote] Failed to send notification email:", notifyResult.reason);
  } else if (!notifyResult.value.sent) {
    console.error("[quote] Notification email not sent:", notifyResult.value.reason);
  }

  if (confirmationResult.status === "rejected") {
    console.error("[quote] Failed to send customer confirmation email:", confirmationResult.reason);
  } else if (!confirmationResult.value.sent) {
    console.error("[quote] Customer confirmation email not sent:", confirmationResult.value.reason);
  }

  return NextResponse.json({ orderNumber });
}
