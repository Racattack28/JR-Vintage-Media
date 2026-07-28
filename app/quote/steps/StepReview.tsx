import { disclaimerText } from "@/lib/data";

interface StepReviewProps {
  serviceLabel: string;
  totalTapes: number;
  tapeSubtotal: number;
  longSummary: string;
  deliverySummary: string;
  name: string;
  email: string;
  notes: string;
  grandTotal: number;
}

export default function StepReview({
  serviceLabel,
  totalTapes,
  tapeSubtotal,
  longSummary,
  deliverySummary,
  name,
  email,
  notes,
  grandTotal,
}: StepReviewProps) {
  return (
    <div className="jr-fade-up">
      <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[32px] m-0 mb-2">
        Review your quote
      </h2>
      <p className="text-[15px] text-[rgba(43,32,22,0.65)] m-0 mb-7">
        Double check everything, then submit. Jack will follow up by email to
        confirm next steps.
      </p>
      <div className="border border-[rgba(43,32,22,0.16)] rounded-2xl overflow-hidden bg-[#fffaf0]">
        <div className="flex justify-between py-[18px] px-6 border-b border-[rgba(43,32,22,0.12)]">
          <div className="text-[rgba(43,32,22,0.6)] text-[14px]">Service</div>
          <div className="font-semibold text-[14px]">{serviceLabel}</div>
        </div>
        <div className="flex justify-between py-[18px] px-6 border-b border-[rgba(43,32,22,0.12)]">
          <div className="text-[rgba(43,32,22,0.6)] text-[14px]">Tapes</div>
          <div className="font-semibold text-[14px] text-right">
            {totalTapes} {totalTapes === 1 ? "tape" : "tapes"}, ${tapeSubtotal}
            {longSummary && (
              <>
                <br />
                {longSummary}
              </>
            )}
          </div>
        </div>
        <div className="flex justify-between py-[18px] px-6 border-b border-[rgba(43,32,22,0.12)]">
          <div className="text-[rgba(43,32,22,0.6)] text-[14px] shrink-0 mr-4">
            Delivery
          </div>
          <div className="font-semibold text-[14px] text-right">
            {deliverySummary}
          </div>
        </div>
        <div className="flex justify-between py-[18px] px-6 border-b border-[rgba(43,32,22,0.12)]">
          <div className="text-[rgba(43,32,22,0.6)] text-[14px]">Contact</div>
          <div className="font-semibold text-[14px] text-right">
            {name}
            <br />
            {email}
          </div>
        </div>
        {notes.trim() && (
          <div className="flex justify-between py-[18px] px-6 border-b border-[rgba(43,32,22,0.12)]">
            <div className="text-[rgba(43,32,22,0.6)] text-[14px]">Notes</div>
            <div className="font-semibold text-[14px] text-right max-w-[280px]">
              {notes}
            </div>
          </div>
        )}
        <div className="flex justify-between items-center py-[22px] px-6 bg-[#2b2016] text-[#f5efe2]">
          <div>
            <div className="text-[15px]">Estimated total</div>
            <div className="text-[12px] text-[rgba(245,239,226,0.65)] mt-[2px]">
              – nothing to pay today
            </div>
          </div>
          <div className="font-[family-name:var(--font-barlow)] text-[22px]">
            ${grandTotal}
          </div>
        </div>
      </div>
      <p className="text-[12.5px] leading-[1.6] text-[rgba(43,32,22,0.5)] mt-4 mb-0">
        <strong>Disclaimer:</strong> {disclaimerText}
      </p>
    </div>
  );
}
