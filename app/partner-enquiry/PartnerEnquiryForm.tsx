"use client";

import { useState } from "react";
import Link from "next/link";
import { partnerVerticals } from "@/lib/data";

const inputClass =
  "font-[family-name:var(--font-lato)] text-[15px] py-[14px] px-4 rounded-[10px] border border-[rgba(43,32,22,0.2)] bg-[#fffaf0] w-full";

interface PartnerEnquiryFormProps {
  initialVertical: string;
}

export default function PartnerEnquiryForm({ initialVertical }: PartnerEnquiryFormProps) {
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vertical, setVertical] = useState(initialVertical);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);

  const valid = businessName.trim() && contactName.trim() && email.trim() && phone.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/partner-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          contactName,
          email,
          phone,
          vertical: vertical || null,
          message: message.trim() || null,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      setReferenceNumber(data.referenceNumber);
    } catch {
      setError(
        "Something went wrong sending your enquiry. Please try again, or email Jack directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (referenceNumber) {
    return (
      <div className="text-center py-16 px-5" style={{ animation: "jr-fade-up 0.5s ease both" }}>
        <div className="w-16 h-16 rounded-full bg-[#bf4e2a] text-[#fffaf0] flex items-center justify-center text-[28px] mx-auto mb-7">
          ✓
        </div>
        <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2px] text-[#9c3d1f] mb-[10px]">
          REFERENCE {referenceNumber}
        </div>
        <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[36px] m-0 mb-4">
          Thanks, {contactName.trim().split(/\s+/)[0]}. Got it.
        </h2>
        <p className="text-[15px] leading-[1.7] text-[rgba(43,32,22,0.7)] max-w-[460px] mx-auto mb-9">
          I&apos;ll be in touch shortly to talk through how a partnership
          could work for {businessName}. You&apos;ll hear from me at{" "}
          {email}.
        </p>
        <div>
          <Link
            href="/"
            className="jr-btn inline-block font-[family-name:var(--font-lato)] font-semibold text-[15px] bg-[#bf4e2a] hover:bg-[#9c3d1f] text-[#fffaf0] py-[14px] px-7 rounded-[30px]"
          >
            Back to site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="jr-fade-up">
      <h1 className="font-[family-name:var(--font-bitter)] font-normal text-[32px] m-0 mb-2">
        Let&apos;s talk about partnering
      </h1>
      <p className="text-[15px] text-[rgba(43,32,22,0.65)] m-0 mb-8">
        Tell me a bit about your business and I&apos;ll be in touch to talk
        through how this could work for your clients.
      </p>

      <div className="flex flex-col gap-4">
        <div className="jr-grid-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Business name"
            className={inputClass}
          />
          <input
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div className="jr-grid-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className={inputClass}
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            type="email"
            className={inputClass}
          />
        </div>
        <select
          value={vertical}
          onChange={(e) => setVertical(e.target.value)}
          className={`${inputClass} appearance-none`}
        >
          <option value="">What type of business is this? (optional)</option>
          {partnerVerticals.map((v) => (
            <option key={v.slug} value={v.title}>
              {v.title}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What would you like to know more about? (optional)"
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && <p className="text-[13px] text-[#bf4e2a] mt-4 mb-0">{error}</p>}

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          disabled={!valid || submitting}
          className="font-[family-name:var(--font-lato)] font-bold text-[15px] bg-[#bf4e2a] text-[#fffaf0] border-none py-[14px] px-[30px] rounded-[30px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
