import { NextResponse } from "next/server";
import {
  sendPartnerEnquiryConfirmation,
  sendPartnerEnquiryNotification,
} from "@/lib/mailer";

interface PartnerEnquiryBody {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  vertical: string | null;
  message: string | null;
}

function generateReferenceNumber(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `JR-P${digits}`;
}

export async function POST(request: Request) {
  let body: PartnerEnquiryBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body?.businessName?.trim() || !body?.contactName?.trim() || !body?.email?.trim()) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const referenceNumber = generateReferenceNumber();

  console.log("[partner-enquiry] New enquiry", referenceNumber, JSON.stringify(body));

  const enquiryInput = { referenceNumber, ...body };

  const [notifyResult, confirmationResult] = await Promise.allSettled([
    sendPartnerEnquiryNotification(enquiryInput),
    sendPartnerEnquiryConfirmation(enquiryInput),
  ]);

  if (notifyResult.status === "rejected") {
    console.error("[partner-enquiry] Failed to send notification email:", notifyResult.reason);
  } else if (!notifyResult.value.sent) {
    console.error("[partner-enquiry] Notification email not sent:", notifyResult.value.reason);
  }

  if (confirmationResult.status === "rejected") {
    console.error("[partner-enquiry] Failed to send confirmation email:", confirmationResult.reason);
  } else if (!confirmationResult.value.sent) {
    console.error("[partner-enquiry] Confirmation email not sent:", confirmationResult.value.reason);
  }

  return NextResponse.json({ referenceNumber });
}
