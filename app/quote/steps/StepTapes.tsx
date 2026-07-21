interface StepTapesProps {
  vhsCount: number;
  longMedCount: number;
  longMaxCount: number;
  pricePerTape: number;
  tapeSubtotal: number;
  onVhsChange: (value: number) => void;
  onLongMedChange: (value: number) => void;
  onLongMaxChange: (value: number) => void;
}

function CounterButton({
  onClick,
  children,
  size = 34,
}: {
  onClick: () => void;
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="jr-btn rounded-full border-[1.5px] border-[#2b2016] bg-transparent cursor-pointer flex items-center justify-center"
      style={{ width: size, height: size, fontSize: size > 32 ? 18 : 16 }}
    >
      {children}
    </button>
  );
}

export default function StepTapes({
  vhsCount,
  longMedCount,
  longMaxCount,
  pricePerTape,
  tapeSubtotal,
  onVhsChange,
  onLongMedChange,
  onLongMaxChange,
}: StepTapesProps) {
  return (
    <div className="jr-fade-up">
      <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[32px] m-0 mb-2">
        How many tapes are you sending?
      </h2>
      <p className="text-[15px] text-[rgba(43,32,22,0.65)] m-0 mb-8">
        Standard play, up to 2 hours each. Pricing drops automatically at 6
        and 11 tapes.
      </p>

      <div className="flex flex-col gap-4 mb-7">
        <div className="flex items-center justify-between border border-[rgba(43,32,22,0.16)] rounded-[14px] py-5 px-6 bg-[#fffaf0]">
          <div>
            <div className="font-semibold text-[16px]">
              VHS / camcorder tapes
            </div>
            <div className="text-[13px] text-[rgba(43,32,22,0.55)]">
              VHS, VHS-C, MiniDV, Hi8
            </div>
          </div>
          <div className="flex items-center gap-4">
            <CounterButton onClick={() => onVhsChange(Math.max(0, vhsCount - 1))}>
              &minus;
            </CounterButton>
            <div className="font-[family-name:var(--font-barlow)] text-[18px] w-6 text-center">
              {vhsCount}
            </div>
            <CounterButton onClick={() => onVhsChange(vhsCount + 1)}>+</CounterButton>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between bg-[#2b2016] text-[#f5efe2] rounded-[14px] py-5 px-6">
        <div className="text-[14px]">
          {vhsCount} tapes &times; ${pricePerTape} each
        </div>
        <div className="font-[family-name:var(--font-barlow)] text-[19px]">
          ${tapeSubtotal}
        </div>
      </div>

      <div className="mt-5">
        <div className="text-[13px] font-semibold text-[rgba(43,32,22,0.6)] mb-1">
          Any of these tapes run longer than 2 hours?
        </div>
        <div className="text-[13px] text-[rgba(43,32,22,0.55)] mb-[10px]">
          Not sure? That&apos;s completely fine, leave this at zero. I&apos;ll
          check the actual runtime when I digitize each tape and email you
          before doing any work if a long-recording charge applies.
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center justify-between border border-[rgba(43,32,22,0.16)] rounded-xl py-[14px] px-5 bg-[#fffaf0]">
            <div className="text-[14px]">
              2&ndash;4 hrs{" "}
              <span className="text-[rgba(43,32,22,0.5)]">(+$15 each)</span>
            </div>
            <div className="flex items-center gap-[14px]">
              <CounterButton
                size={30}
                onClick={() => onLongMedChange(Math.max(0, longMedCount - 1))}
              >
                &minus;
              </CounterButton>
              <div className="font-[family-name:var(--font-barlow)] text-[16px] w-5 text-center">
                {longMedCount}
              </div>
              <CounterButton size={30} onClick={() => onLongMedChange(longMedCount + 1)}>
                +
              </CounterButton>
            </div>
          </div>
          <div className="flex items-center justify-between border border-[rgba(43,32,22,0.16)] rounded-xl py-[14px] px-5 bg-[#fffaf0]">
            <div className="text-[14px]">
              4&ndash;6 hrs{" "}
              <span className="text-[rgba(43,32,22,0.5)]">(+$30 each)</span>
            </div>
            <div className="flex items-center gap-[14px]">
              <CounterButton
                size={30}
                onClick={() => onLongMaxChange(Math.max(0, longMaxCount - 1))}
              >
                &minus;
              </CounterButton>
              <div className="font-[family-name:var(--font-barlow)] text-[16px] w-5 text-center">
                {longMaxCount}
              </div>
              <CounterButton size={30} onClick={() => onLongMaxChange(longMaxCount + 1)}>
                +
              </CounterButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
