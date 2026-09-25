import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

const cardClass =
  "h-full border border-[rgba(43,32,22,0.16)] rounded-[18px] p-9 bg-[#fffaf0] hover:border-[#bf4e2a] hover:shadow-[0_20px_40px_-26px_rgba(43,32,22,0.35)]";

export default function ServiceArea() {
  return (
    <Reveal
      id="service"
      className="block max-w-[1240px] mx-auto px-6 md:px-12 py-[84px] scroll-mt-[60px]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 lg:items-center mb-11">
        <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[42px] lg:text-[38px] m-0 text-balance">
          Wherever your tapes are,{" "}
          <br className="hidden lg:block" />
          there&apos;s a way to get them to me.
        </h2>
        <div className="max-w-[480px]">
          <div className="flex items-center gap-2 mb-3 text-[#bf4e2a] font-[family-name:var(--font-barlow)] text-[14px] font-medium">
            <svg
              viewBox="0 0 10 12"
              className="w-[9px] h-[11px]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M0 0 L10 6 L0 12 Z" />
            </svg>
            Local drop-off &amp; mail-in
          </div>
          <p className="text-[16px] leading-[1.75] text-[rgba(43,32,22,0.7)] m-0">
            I&apos;m based in Mooloolaba, so if you&apos;re on the Sunshine
            Coast you can drop your tapes off in person. Anywhere else in
            Australia, just post them in.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 jr-stagger">
        <div className="jr-stagger-item h-full">
          <TiltCard className={cardClass}>
            <h3 className="font-[family-name:var(--font-bitter)] font-normal text-[26px] m-0 mb-3">
              Local drop-off
            </h3>
            <p className="text-[15px] leading-[1.7] text-[rgba(43,32,22,0.7)] m-0 mb-5">
              Drop tapes off in person in Mooloolaba and skip the packing.
              I&apos;ll text you a heads up when your transfer is ready.
            </p>
            <ul className="m-0 pl-[18px] text-[14px] leading-[2] text-[rgba(43,32,22,0.75)]">
              <li>Servicing Mooloolaba and the wider Sunshine Coast</li>
              <li>No shipping cost or risk</li>
              <li>Flexible drop-off scheduling</li>
            </ul>
          </TiltCard>
        </div>
        <div className="jr-stagger-item h-full">
          <TiltCard className={cardClass}>
            <h3 className="font-[family-name:var(--font-bitter)] font-normal text-[26px] m-0 mb-3">
              Mail-in
            </h3>
            <p className="text-[15px] leading-[1.7] text-[rgba(43,32,22,0.7)] m-0 mb-5">
              Pack your tapes into any sturdy box and send them in. I&apos;ll
              confirm receipt and treat them like my own.
            </p>
            <ul className="m-0 pl-[18px] text-[14px] leading-[2] text-[rgba(43,32,22,0.75)]">
              <li>Works from anywhere in the country</li>
              <li>Arrival confirmation by email</li>
              <li>Tracked return postage, added to your final invoice</li>
            </ul>
          </TiltCard>
        </div>
      </div>
    </Reveal>
  );
}
