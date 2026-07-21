import Reveal from "@/components/Reveal";

const steps = [
  {
    num: "01",
    title: "Send or drop off",
    body: "Bring your tapes to a local drop-off, or pack them into any box and mail them. I'll confirm as soon as they arrive.",
  },
  {
    num: "02",
    title: "I transfer, tape by tape",
    body: "Every tape is cleaned, and repaired free of charge if needed, then played and captured in real time on calibrated decks in my own studio.",
  },
  {
    num: "03",
    title: "Receive your files",
    body: "Digital files are delivered by download link, plus a USB stick if you'd like a physical backup too. Your original tapes are returned to you cleaned and in their original condition.",
  },
];

export default function HowItWorks() {
  return (
    <Reveal
      id="how"
      className="block max-w-[1240px] mx-auto px-6 md:px-12 py-[110px] scroll-mt-[60px]"
    >
      <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2.5px] text-[#9c3d1f] mb-[14px]">
        HOW IT WORKS
      </div>
      <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[42px] m-0 mb-14 max-w-[600px]">
        Three steps between the attic box and the family group chat.
      </h2>
      <div className="jr-grid-3 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {steps.map((step) => (
          <div key={step.num} className="jr-how-step">
            <div className="jr-how-num font-[family-name:var(--font-bitter)] text-[46px] text-[#bf4e2a] mb-[14px] transition-colors duration-[250ms]">
              {step.num}
            </div>
            <h3 className="text-[19px] font-semibold m-0 mb-[10px]">
              {step.title}
            </h3>
            <p className="text-[15px] leading-[1.7] text-[rgba(43,32,22,0.7)] m-0">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
