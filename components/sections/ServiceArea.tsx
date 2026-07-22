import Reveal from "@/components/Reveal";

export default function ServiceArea() {
  return (
    <Reveal
      id="service"
      className="block max-w-[1240px] mx-auto px-6 md:px-12 py-[84px] scroll-mt-[60px]"
    >
      <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2.5px] text-[#9c3d1f] mb-[14px]">
        LOCAL &amp; MAIL-IN
      </div>
      <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[42px] m-0 mb-11 max-w-[600px]">
        Wherever your tapes are, there&apos;s a way to get them to me.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-[rgba(43,32,22,0.16)] rounded-[18px] p-9 bg-[#fffaf0]">
          <h3 className="font-[family-name:var(--font-bitter)] font-normal text-[26px] m-0 mb-3">
            Local drop-off
          </h3>
          <p className="text-[15px] leading-[1.7] text-[rgba(43,32,22,0.7)] m-0 mb-5">
            Drop tapes off in person and skip the packing. I&apos;ll text you
            a heads up when your transfer is ready.
          </p>
          <ul className="m-0 pl-[18px] text-[14px] leading-[2] text-[rgba(43,32,22,0.75)]">
            <li>No shipping cost or risk</li>
            <li>Flexible drop-off scheduling</li>
          </ul>
        </div>
        <div className="border border-[rgba(43,32,22,0.16)] rounded-[18px] p-9 bg-[#fffaf0]">
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
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
