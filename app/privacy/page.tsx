import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | JR Vintage Media",
  description:
    "How JR Vintage Media collects, uses, and protects your personal information.",
};

const h2Class = "font-[family-name:var(--font-bitter)] font-normal text-[24px] mt-10 mb-3";
const pClass = "text-[15px] leading-[1.75] text-[rgba(43,32,22,0.75)] m-0 mb-4";
const liClass = "text-[15px] leading-[1.75] text-[rgba(43,32,22,0.75)]";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f5efe2] font-[family-name:var(--font-lato)] text-[#2b2016]">
      <Header variant="format" />
      <div className="max-w-[760px] mx-auto px-6 md:px-12 pt-16 pb-24">
        <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2.5px] text-[#9c3d1f] mb-[14px]">
          LEGAL
        </div>
        <h1 className="font-[family-name:var(--font-bitter)] font-normal text-[40px] m-0 mb-2">
          Privacy Policy
        </h1>
        <p className="text-[13px] text-[rgba(43,32,22,0.5)] m-0 mb-8">
          Last updated: July 23, 2026
        </p>

        <p className={pClass}>
          This policy explains what personal information JR Vintage Media
          collects, how it&apos;s used, and how it&apos;s protected.
        </p>

        <h2 className={h2Class}>What we collect</h2>
        <p className={pClass}>
          When you place an order or get in touch, we may collect:
        </p>
        <ul className="m-0 mb-4 pl-[18px] flex flex-col gap-2">
          <li className={liClass}>Your name</li>
          <li className={liClass}>Postal address (for sending and returning tapes)</li>
          <li className={liClass}>Email address</li>
          <li className={liClass}>Phone number</li>
        </ul>
        <p className={pClass}>
          We only collect what we need to process your order and
          communicate with you about it.
        </p>

        <h2 className={h2Class}>How we use it</h2>
        <p className={pClass}>Your information is used to:</p>
        <ul className="m-0 mb-4 pl-[18px] flex flex-col gap-2">
          <li className={liClass}>Process and fulfil your order</li>
          <li className={liClass}>
            Contact you about your order, including any issues with your
            tapes
          </li>
          <li className={liClass}>
            Send your converted files and returned tapes to the correct
            address
          </li>
        </ul>
        <p className={pClass}>
          We do not use your information for marketing unless you&apos;ve
          separately opted in, and we do not sell or share your personal
          information with third parties, other than where necessary to
          complete your order (for example, a courier or postage provider).
        </p>

        <h2 className={h2Class}>Storage and security</h2>
        <p className={pClass}>
          We take reasonable steps to keep your information secure and only
          keep it for as long as needed to complete your order and meet any
          record-keeping obligations.
        </p>

        <h2 className={h2Class}>Your rights</h2>
        <p className={pClass}>
          You can ask us what personal information we hold about you, and
          ask us to correct or delete it, by contacting us at{" "}
          <a href="mailto:jackrac@jrvintagemedia.com" className="jr-link">
            jackrac@jrvintagemedia.com
          </a>
          .
        </p>

        <h2 className={h2Class}>Changes to this policy</h2>
        <p className={pClass}>
          We may update this policy from time to time. The current version
          will always be available on our website.
        </p>

        <h2 className={h2Class}>Contact</h2>
        <p className={pClass}>
          Questions about this policy can be sent to{" "}
          <a href="mailto:jackrac@jrvintagemedia.com" className="jr-link">
            jackrac@jrvintagemedia.com
          </a>
          .
        </p>
      </div>
      <Footer prefixHome />
    </div>
  );
}
