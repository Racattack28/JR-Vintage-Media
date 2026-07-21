import { deliveryCatalog, hddSizes, usbSizes, type DeliveryMethod } from "@/lib/data";

interface StepDeliveryProps {
  deliveryMethod: DeliveryMethod;
  usbSize: string;
  hddSize: string;
  onSelectMethod: (method: DeliveryMethod) => void;
  onSelectUsbSize: (id: string) => void;
  onSelectHddSize: (id: string) => void;
}

export default function StepDelivery({
  deliveryMethod,
  usbSize,
  hddSize,
  onSelectMethod,
  onSelectUsbSize,
  onSelectHddSize,
}: StepDeliveryProps) {
  const showSizePicker = deliveryMethod === "usb" || deliveryMethod === "harddrive";
  const sizeOptions = deliveryMethod === "usb" ? usbSizes : hddSizes;
  const activeSizeId = deliveryMethod === "usb" ? usbSize : hddSize;

  return (
    <div className="jr-fade-up">
      <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[32px] m-0 mb-2">
        How should I deliver your files?
      </h2>
      <p className="text-[15px] text-[rgba(43,32,22,0.65)] m-0 mb-8">
        Pick one. A USB stick is recommended so you always have a physical
        copy.
      </p>

      <div className="flex flex-col gap-[14px] mb-6">
        {deliveryCatalog.map((opt) => {
          const selected = deliveryMethod === opt.id;
          const isFree = opt.id === "youtube" || opt.id === "drive";
          const priceLabel = isFree
            ? "Free"
            : opt.id === "usb"
            ? `from $${usbSizes[0].price}`
            : `from $${hddSizes[0].price}`;

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

      {showSizePicker && (
        <div>
          <div className="text-[13px] font-semibold text-[rgba(43,32,22,0.6)] mb-[10px]">
            {deliveryMethod === "usb" ? "Choose a USB size" : "Choose a hard drive size"}
          </div>
          <div className="flex flex-col gap-[10px]">
            {sizeOptions.map((sz) => {
              const selected = sz.id === activeSizeId;
              return (
                <button
                  type="button"
                  key={sz.id}
                  onClick={() =>
                    deliveryMethod === "usb"
                      ? onSelectUsbSize(sz.id)
                      : onSelectHddSize(sz.id)
                  }
                  className="cursor-pointer text-left flex items-center justify-between rounded-xl py-[14px] px-5 border-2"
                  style={{
                    borderColor: selected ? "#bf4e2a" : "rgba(43,32,22,0.16)",
                    background: selected ? "#fbeee6" : "#fffaf0",
                  }}
                >
                  <div className="text-[14px] font-semibold">{sz.label}</div>
                  <div className="font-[family-name:var(--font-barlow)] text-[14px]">
                    +${sz.price}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
