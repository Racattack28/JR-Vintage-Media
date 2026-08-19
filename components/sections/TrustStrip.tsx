import Reveal from "@/components/Reveal";

const items = [
  "FREE TAPE CLEANING & REPAIR",
  "LOCAL DROP-OFF OR MAIL-IN",
  "VHS · VHS-C · Hi8 & Video8 · MiniDV · Other",
  "USB, HARD DRIVE, YOUTUBE, OR DRIVE",
  "5.0★ RATED ON GOOGLE REVIEWS",
  "SERVICING MOOLOOLABA & THE SUNSHINE COAST",
];

// Repeated enough times that the track is comfortably wider than any
// realistic viewport (including ultrawide desktops), so the loop seam
// is never visible and there's no empty gap. Must stay an even number
// so the first half exactly matches the second half for a seamless
// -50% translateX loop.
const REPEATS = 10;
const trackItems = Array.from({ length: REPEATS }, () => items).flat();

export default function TrustStrip() {
  return (
    <Reveal className="border-b border-[rgba(43,32,22,0.14)] bg-[#ece1cb] overflow-hidden shadow-[0_-14px_24px_-18px_rgba(20,13,8,0.45)_inset]">
      <div className="jr-marquee-track flex flex-nowrap w-max py-6 gap-[50px] font-[family-name:var(--font-barlow)] text-[15px] tracking-[0.5px] text-[#5a4a34] whitespace-nowrap">
        {trackItems.map((item, i) => (
          <div key={i} className="jr-trust-item shrink-0">
            {item}
          </div>
        ))}
      </div>
    </Reveal>
  );
}
