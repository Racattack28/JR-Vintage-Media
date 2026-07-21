import type { ServiceType } from "@/lib/quote-types";

interface StepServiceProps {
  serviceType: ServiceType;
  onSelect: (value: ServiceType) => void;
}

export default function StepService({ serviceType, onSelect }: StepServiceProps) {
  return (
    <div className="jr-fade-up">
      <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[32px] m-0 mb-2">
        How will your tapes get to me?
      </h2>
      <p className="text-[15px] text-[rgba(43,32,22,0.65)] m-0 mb-8">
        Choose one. You can always coordinate specifics with Jack after you
        submit.
      </p>
      <div className="jr-grid-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <button
          type="button"
          onClick={() => onSelect("local")}
          className="cursor-pointer text-left rounded-2xl p-7 border-2"
          style={{
            borderColor: serviceType === "local" ? "#bf4e2a" : "rgba(43,32,22,0.16)",
            background: serviceType === "local" ? "#fbeee6" : "#fffaf0",
          }}
        >
          <div className="font-[family-name:var(--font-bitter)] text-[22px] mb-2">
            Local drop-off
          </div>
          <div className="text-[14px] leading-[1.6] text-[rgba(43,32,22,0.65)]">
            Drop tapes off in person, no shipping needed.
          </div>
        </button>
        <button
          type="button"
          onClick={() => onSelect("mail")}
          className="cursor-pointer text-left rounded-2xl p-7 border-2"
          style={{
            borderColor: serviceType === "mail" ? "#bf4e2a" : "rgba(43,32,22,0.16)",
            background: serviceType === "mail" ? "#fbeee6" : "#fffaf0",
          }}
        >
          <div className="font-[family-name:var(--font-bitter)] text-[22px] mb-2">
            Mail-in
          </div>
          <div className="text-[14px] leading-[1.6] text-[rgba(43,32,22,0.65)]">
            Pack and ship your tapes from anywhere.
          </div>
        </button>
      </div>
    </div>
  );
}
