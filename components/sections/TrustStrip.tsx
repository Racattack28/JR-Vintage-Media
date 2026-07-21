import Reveal from "@/components/Reveal";

const items = [
  "FREE TAPE CLEANING & REPAIR",
  "LOCAL DROP-OFF OR MAIL-IN",
  "VHS · VHS-C · MiniDV",
  "USB, HARD DRIVE, YOUTUBE, OR DRIVE",
];

export default function TrustStrip() {
  return (
    <Reveal className="border-t border-b border-[rgba(43,32,22,0.14)] bg-[#ece1cb]">
      <div className="max-w-[1240px] mx-auto py-4 px-6 md:px-12 flex justify-center flex-nowrap overflow-x-auto gap-[50px] font-[family-name:var(--font-barlow)] text-[11.5px] tracking-[0.5px] text-[#5a4a34] whitespace-nowrap">
        {items.map((item) => (
          <div key={item} className="jr-trust-item">
            {item}
          </div>
        ))}
      </div>
    </Reveal>
  );
}
