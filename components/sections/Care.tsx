import Reveal from "@/components/Reveal";

export default function Care() {
  return (
    <Reveal className="block bg-[#ece1cb] py-[76px] px-6 md:px-12">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
        <div className="text-center lg:text-left">
          <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[1.5px] text-[#9c3d1f] mb-[14px]">
            HOW{" "}
            <span className="font-[family-name:var(--font-bitter)] text-[13px]">
              I
            </span>{" "}
            WORK
          </div>
          <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[34px] m-0 mb-5 max-w-[520px] mx-auto lg:mx-0">
            Your tapes are handled with real care while they&apos;re with me.
          </h2>
          <p className="text-[16px] leading-[1.75] text-[rgba(43,32,22,0.75)] m-0 max-w-[520px] mx-auto lg:mx-0">
            From the moment your order arrives to the day it&apos;s posted
            back, you&apos;ll get updates so you always know where things are
            at. This isn&apos;t a job I rush through, it&apos;s work I
            genuinely care about.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-[14px] border-[1.5px] border-dashed border-[rgba(43,32,22,0.25)] rounded-[24px] pointer-events-none" />
          <div className="relative w-full h-[500px] rounded-[18px] overflow-hidden shadow-[0_18px_40px_rgba(43,32,22,0.18)]">
            <video
              className="w-full h-full object-cover"
              src="/videos/care-sample.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
            <div className="absolute left-4 bottom-4 font-[family-name:var(--font-barlow)] text-[11px] tracking-[1px] uppercase text-[#f5efe2] bg-[rgba(43,32,22,0.65)] backdrop-blur-sm px-3 py-[7px] rounded-full">
              A tape I have recently converted
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
