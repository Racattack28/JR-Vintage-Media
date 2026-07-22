import Reveal from "@/components/Reveal";

export default function Care() {
  return (
    <Reveal className="block bg-[#ece1cb] py-[70px] px-6 md:px-12">
      <div className="max-w-[820px] mx-auto text-center">
        <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[1.5px] text-[#9c3d1f] mb-[14px]">
          HOW{" "}
          <span className="font-[family-name:var(--font-bitter)] italic text-[13px]">
            I
          </span>{" "}
          WORK
        </div>
        <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[34px] m-0 mb-5">
          Your tapes are handled with real care while they&apos;re with me.
        </h2>
        <p className="text-[16px] leading-[1.75] text-[rgba(43,32,22,0.75)] m-0">
          From the moment your order arrives to the day it&apos;s posted
          back, you&apos;ll get updates so you always know where things are
          at. This isn&apos;t a job I rush through, it&apos;s work I
          genuinely care about.
        </p>
      </div>
    </Reveal>
  );
}
