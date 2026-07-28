import { deliveryCatalog, type DeliveryMethod } from "@/lib/data";

interface StepDeliveryProps {
  deliveryMethod: DeliveryMethod;
  onSelectMethod: (method: DeliveryMethod) => void;
}

export default function StepDelivery({
  deliveryMethod,
  onSelectMethod,
}: StepDeliveryProps) {
  const selectedEntry = deliveryCatalog.find((d) => d.id === deliveryMethod);

  return (
    <div className="jr-fade-up">
      <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[32px] m-0 mb-2">
        How should I deliver your files?
      </h2>
      <p className="text-[15px] text-[rgba(43,32,22,0.65)] m-0 mb-8">
        Pick one. A USB stick is recommended so you always have a physical
        copy.
      </p>

      <div className="flex flex-col gap-[14px] mb-2">
        {deliveryCatalog.map((opt) => {
          const selected = deliveryMethod === opt.id;
          const priceLabel = opt.startingPrice
            ? `from $${opt.startingPrice}`
            : "Free";

          return (
            <button
              type="button"
              key={opt.id}
              onClick={() => onSelectMethod(opt.id)}
              className="cursor-pointer text-left flex items-center justify-between rounded-[14px] py-[18px] px-6 border-2"
              style={{
                borderColor: selected ? "#bf4e2a" : "rgba(43,32,22,0.16)",
                background: selected ? "#fbeee6" : "#fffaf0",
              }}
            >
              <div>
                <div className="flex items-center gap-[10px]">
                  <div className="font-semibold text-[15px]">{opt.label}</div>
                  {opt.recommended && (
                    <div className="font-[family-name:var(--font-barlow)] text-[11px] tracking-[1px] text-[#fffaf0] bg-[#bf4e2a] py-[3px] px-2 rounded-[20px]">
                      RECOMMENDED
                    </div>
                  )}
                </div>
                <div className="text-[13px] text-[rgba(43,32,22,0.55)] mt-[2px]">
                  {opt.desc}
                </div>
              </div>
              <div className="font-[family-name:var(--font-barlow)] text-[15px] shrink-0 ml-4">
                {priceLabel}
              </div>
            </button>
          );
        })}
      </div>

      {selectedEntry?.priceNote && (
        <p className="text-[13px] leading-[1.6] text-[rgba(43,32,22,0.55)] italic m-0 mt-2">
          {selectedEntry.priceNote}
        </p>
      )}
    </div>
  );
}
