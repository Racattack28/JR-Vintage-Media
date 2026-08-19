import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <Image
        src="/hero-tapes-bg.jpg"
        alt="Stacks of VHS tapes and DVDs beside a CRT TV and VCR"
        fill
        sizes="100vw"
        className="jr-hero-bg object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(20,13,8,0.92)] via-[rgba(20,13,8,0.72)] to-[rgba(20,13,8,0.4)]" />
      <div className="absolute inset-0 bg-[rgba(80,30,15,0.18)] mix-blend-multiply" />

      <div className="jr-hero-stagger relative max-w-[1240px] mx-auto px-6 md:px-12 pt-28 pb-32 md:pt-36 md:pb-40 flex flex-col items-center text-center">
        <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2.5px] text-[#e8a874] mb-3">
          TAPES IN. MEMORIES BACK.
        </div>
        <h1 className="font-[family-name:var(--font-merriweather)] italic font-black text-[clamp(34px,5.5vw,66px)] leading-[1.18] m-0 mb-5 max-w-[950px] text-[#f5efe2]">
          Some memories aren&apos;t lost,{" "}
          <em className="text-[#e8845a]">
            they&apos;re simply waiting to be played again.
          </em>
        </h1>
        <p className="jr-hero-copy text-[17px] leading-[1.7] text-[rgba(245,239,226,0.85)] max-w-[680px] m-0 mb-7">
          VHS and camcorder tapes degrade a little more every year. I
          transfer them by hand, one reel at a time, right here on the
          Sunshine Coast, onto digital files you can keep and share, giving
          every tape the full attention it deserves from the moment it
          arrives to the moment it&apos;s back in your hands.
        </p>
        <div className="flex gap-4 items-center justify-center">
          <Link
            href="/quote"
            className="jr-btn font-[family-name:var(--font-lato)] font-semibold text-[15px] bg-[#bf4e2a] hover:bg-[#9c3d1f] text-[#fffaf0] py-[15px] px-7 rounded-[30px]"
          >
            Get a free quote
          </Link>
          <a
            href="#pricing"
            className="jr-btn font-[family-name:var(--font-lato)] font-semibold text-[15px] text-[#f5efe2] border-[1.5px] border-[rgba(245,239,226,0.6)] hover:border-[#f5efe2] py-[13.5px] px-7 rounded-[30px]"
          >
            See pricing
          </a>
        </div>
      </div>
    </div>
  );
}
