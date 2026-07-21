import type { QuoteState } from "@/lib/quote-types";

interface StepDetailsProps {
  state: QuoteState;
  onChange: <K extends keyof QuoteState>(key: K, value: QuoteState[K]) => void;
}

const inputClass =
  "font-[family-name:var(--font-lato)] text-[15px] py-[14px] px-4 rounded-[10px] border border-[rgba(43,32,22,0.2)] bg-[#fffaf0] w-full";

export default function StepDetails({ state, onChange }: StepDetailsProps) {
  const isMail = state.serviceType === "mail";
  const subtext = isMail
    ? "We'll need your mailing address to send a prepaid return label plan."
    : "Just your contact info. You'll coordinate drop-off timing directly.";

  return (
    <div className="jr-fade-up">
      <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[32px] m-0 mb-2">
        Your contact details
      </h2>
      <p className="text-[15px] text-[rgba(43,32,22,0.65)] m-0 mb-8">{subtext}</p>
      <div className="flex flex-col gap-4">
        <div className="jr-grid-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            value={state.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Full name"
            className={inputClass}
          />
          <input
            value={state.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="Phone number"
            className={inputClass}
          />
        </div>
        <input
          value={state.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="Email address"
          type="email"
          className={inputClass}
        />
        {isMail && (
          <>
            <input
              value={state.address}
              onChange={(e) => onChange("address", e.target.value)}
              placeholder="Street address"
              className={inputClass}
            />
            <div className="grid grid-cols-1 sm:grid-cols-[1.4fr_1fr_1fr] gap-4">
              <input
                value={state.city}
                onChange={(e) => onChange("city", e.target.value)}
                placeholder="City"
                className={inputClass}
              />
              <input
                value={state.state}
                onChange={(e) => onChange("state", e.target.value)}
                placeholder="State"
                className={inputClass}
              />
              <input
                value={state.zip}
                onChange={(e) => onChange("zip", e.target.value)}
                placeholder="ZIP"
                className={inputClass}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
