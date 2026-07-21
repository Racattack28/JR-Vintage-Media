import { stepLabels } from "@/lib/data";

export default function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-[6px] mb-12">
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
              style={{ background: bg, color: fg, border: `1.5px solid ${border}` }}
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
  );
}
