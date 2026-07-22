import { stepLabels } from "@/lib/data";

export default function Stepper({ step }: { step: number }) {
  return (
    <>
      <div className="sm:hidden mb-10">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[13px] font-semibold text-[#2b2016]">
            Step {step + 1} of {stepLabels.length}
          </div>
          <div className="text-[13px] text-[rgba(43,32,22,0.5)]">
            {stepLabels[step]}
          </div>
        </div>
        <div className="h-[6px] rounded-full bg-[rgba(43,32,22,0.15)] overflow-hidden">
          <div
            className="h-full bg-[#bf4e2a] transition-all duration-300 ease-in-out"
            style={{ width: `${((step + 1) / stepLabels.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-[6px] mb-12">
        {stepLabels.map((label, i) => {
          const active = i === step;
          const done = i < step;
          const isLast = i === stepLabels.length - 1;
          const bg = done ? "#bf4e2a" : active ? "#2b2016" : "transparent";
          const fg = done || active ? "#fffaf0" : "#2b2016";
          const border = done || active ? "transparent" : "rgba(43,32,22,0.3)";
          const labelColor = active ? "#2b2016" : "rgba(43,32,22,0.45)";

          return (
            <div
              key={label}
              className="flex items-center gap-[6px]"
              style={{ flex: isLast ? "none" : "1" }}
            >
              <div
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center font-[family-name:var(--font-barlow)] text-[12px] shrink-0"
                style={{
                  background: bg,
                  color: fg,
                  border: `1.5px solid ${border}`,
                }}
              >
                {done ? "✓" : i + 1}
              </div>
              <div
                className="text-[12px] font-semibold whitespace-nowrap"
                style={{ color: labelColor }}
              >
                {label}
              </div>
              {!isLast && (
                <div className="h-[1.5px] flex-1 bg-[rgba(43,32,22,0.2)] mx-1 relative overflow-hidden">
                  <div
                    className="jr-step-line-fill absolute inset-0 bg-[#bf4e2a]"
                    style={{ width: done ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
