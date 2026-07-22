import Link from "next/link";

interface ConfirmationProps {
  orderNumber: string;
  name: string;
  email: string;
  grandTotal: number;
  isMail: boolean;
}

export default function Confirmation({
  orderNumber,
  name,
  email,
  grandTotal,
  isMail,
}: ConfirmationProps) {
  const confirmationText = isMail
    ? "Pack your tapes securely and mail them in. Include your name and order number inside the box."
    : "Bring your tapes by for drop-off whenever works for you.";

  return (
    <div className="text-center py-16 px-5" style={{ animation: "jr-fade-up 0.5s ease both" }}>
      <div className="w-16 h-16 rounded-full bg-[#bf4e2a] text-[#fffaf0] flex items-center justify-center text-[28px] mx-auto mb-7">
        ✓
      </div>
      <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2px] text-[#9c3d1f] mb-[10px]">
        ORDER {orderNumber}
      </div>
      <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[36px] m-0 mb-4">
        Thanks, {name}. Got it.
      </h2>
      <p className="text-[15px] leading-[1.7] text-[rgba(43,32,22,0.7)] max-w-[460px] mx-auto mb-9">
        {confirmationText} You&apos;ll hear from Jack at {email} shortly to
        confirm details.
      </p>
      <div className="inline-block text-left border border-[rgba(43,32,22,0.16)] rounded-[14px] py-6 px-7 bg-[#fffaf0] mb-9">
        <div className="text-[13px] text-[rgba(43,32,22,0.55)] mb-1">
          Estimated total &ndash; nothing to pay today
        </div>
        <div className="font-[family-name:var(--font-barlow)] text-[24px]">
          ${grandTotal}
        </div>
      </div>
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
