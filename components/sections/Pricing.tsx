import Reveal from "@/components/Reveal";
import { disclaimerText } from "@/lib/data";

const tiers = [
  { label: "1–5 TAPES", price: "$35", accent: false },
  { label: "6–10 TAPES", price: "$32", accent: false },
  { label: "11+ TAPES", price: "$30", accent: true },
];

export default function Pricing() {
  return (
    <Reveal
      id="pricing"
      className="block bg-[#2b2016] text-[#f5efe2] py-[110px] px-6 md:px-12 scroll-mt-[60px]"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2.5px] text-[#d9a15a] mb-[14px]">
          PRICING
        </div>
        <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[42px] m-0 mb-14 max-w-[600px] text-[#f5efe2]">
          Simple, per-tape pricing. The more you send, the less each one
          costs.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-7">
          {tiers.map((tier) => (
            <div
              key={tier.label}
              className={`jr-price-card rounded-2xl p-8 ${
                tier.accent
                  ? "bg-[#bf4e2a]"
                  : "bg-[#3a2c1c] border border-[rgba(245,239,226,0.15)]"
              }`}
            >
              <div
                className={`font-[family-name:var(--font-barlow)] text-[12px] tracking-[1.5px] mb-4 ${
                  tier.accent ? "text-[#f5efe2]" : "text-[#d9a15a]"
                }`}
              >
                {tier.label}
              </div>
              <div
                className={`font-[family-name:var(--font-bitter)] text-[48px] mb-[6px] ${
                  tier.accent ? "text-[#fffaf0]" : ""
                }`}
              >
                {tier.price}
              </div>
              <div
                className={`text-[14px] ${
                  tier.accent
                    ? "text-[rgba(255,250,240,0.85)]"
                    : "text-[rgba(245,239,226,0.65)]"
                }`}
              >
                per tape, standard play up to 2 hrs
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between bg-[#3a2c1c] border border-[rgba(245,239,226,0.15)] rounded-2xl py-[26px] px-8 flex-wrap gap-4 mb-4">
          <div>
            <div className="font-semibold text-[16px] mb-1">
              Long recordings
            </div>
            <div className="text-[14px] text-[rgba(245,239,226,0.65)]">
              For tapes running past the standard 2-hour play time
            </div>
          </div>
          <div className="flex gap-6 font-[family-name:var(--font-barlow)] text-[13px] text-[#d9a15a]">
            <div>2–4 HRS &nbsp;+$15</div>
            <div>4–6 HRS &nbsp;+$30</div>
          </div>
        </div>

        <div className="flex items-center justify-between bg-[#3a2c1c] border border-[rgba(245,239,226,0.15)] rounded-2xl py-[26px] px-8 flex-wrap gap-4">
          <div>
            <div className="font-semibold text-[16px] mb-1">
              Delivery: USB, hard drive, private YouTube link, or Google
              Drive
            </div>
            <div className="text-[14px] text-[rgba(245,239,226,0.65)]">
              Picked once your tapes are digitized. USB stick is
              recommended.
            </div>
          </div>
          <div className="font-[family-name:var(--font-barlow)] text-[13px] text-[#d9a15a]">
            USB FROM $18
          </div>
        </div>

        <p className="text-[12.5px] leading-[1.6] text-[rgba(245,239,226,0.55)] max-w-[720px] mt-5 mb-0">
          <strong>Disclaimer:</strong> {disclaimerText}
        </p>
      </div>
    </Reveal>
  );
}
