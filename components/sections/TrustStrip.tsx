import Reveal from "@/components/Reveal";

const items = [
  "FREE TAPE CLEANING & REPAIR",
  "LOCAL DROP-OFF OR MAIL-IN",
  "VHS · VHS-C · MiniDV",
  "USB, HARD DRIVE, YOUTUBE, OR DRIVE",
];

export default function TrustStrip() {
  return (
    <Reveal className="border-t border-b border-[rgba(43,32,22,0.14)] bg-[#ece1cb] overflow-hidden">
      <div className="jr-marquee-track flex flex-nowrap w-max py-4 gap-[50px] font-[family-name:var(--font-barlow)] text-[11.5px] tracking-[0.5px] text-[#5a4a34] whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="jr-trust-item shrink-0">
            {item}
          </div>
        ))}
      </div>
    </Reveal>
  );
}
