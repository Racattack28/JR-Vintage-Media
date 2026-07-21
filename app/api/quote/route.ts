import { NextResponse } from "next/server";

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

  // TODO: Wire up a real email service (e.g. Resend, SendGrid, Postmark, or
  // SMTP via nodemailer) to notify the business owner (Jack) at his inbox
  // whenever a new quote request comes in. For now this just logs the lead
  // server-side so nothing is silently lost during development.
  //
  // Example with Resend once an API key is configured:
  //   await resend.emails.send({
  //     from: 'quotes@jrvintagemedia.com',
  //     to: 'jack@jrvintagemedia.com',
  //     subject: `New quote request ${orderNumber}`,
  //     text: JSON.stringify(body, null, 2),
  //   });
  console.log("[quote] New quote request", orderNumber, JSON.stringify(body));

  return NextResponse.json({ orderNumber });
}
