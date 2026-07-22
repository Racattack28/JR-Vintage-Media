import Image from "next/image";
import Link from "next/link";
import { formatNavItems } from "@/lib/data";

export default function Hero() {
  return (
    <div className="flex flex-col gap-8 max-w-[1240px] mx-auto px-6 md:px-12 pt-12 pb-20">
      <div style={{ animation: "jr-fade-up 0.7s ease both" }}>
        <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2.5px] text-[#9c3d1f] mb-[18px]">
          TAPES IN. MEMORIES BACK.
        </div>
        <h1 className="font-[family-name:var(--font-merriweather)] italic font-black text-[clamp(30px,4.5vw,54px)] leading-[1.35] m-0 mb-6">
          Some memories aren&apos;t lost,{" "}
          <em className="text-[#bf4e2a]">
            they&apos;re simply waiting to be played again.
          </em>
        </h1>
        <p className="jr-hero-copy text-[17px] leading-[1.7] text-[rgba(43,32,22,0.75)] max-w-[480px] m-0 mb-[34px]">
          VHS and camcorder tapes degrade a little more every year. I
          transfer them by hand, one reel at a time, onto digital files you
          can keep and share. It&apos;s a one-person operation, so your tapes
          stay with me the whole time.
        </p>
        <div className="flex gap-4 items-center">
          <Link
            href="/quote"
            className="jr-btn font-[family-name:var(--font-lato)] font-semibold text-[15px] bg-[#bf4e2a] hover:bg-[#9c3d1f] text-[#fffaf0] py-[15px] px-7 rounded-[30px]"
          >
            Get a free quote
          </Link>
          <a
            href="#pricing"
            className="text-[15px] font-semibold text-[#2b2016] no-underline border-b-2 border-[#2b2016] pb-[2px]"
          >
            See pricing
          </a>
        </div>
      </div>
      <div className="jr-hero-frame relative">
        <div className="absolute -inset-[18px] border-[1.5px] border-dashed border-[rgba(43,32,22,0.25)] rounded-[22px] pointer-events-none" />
        <div className="relative w-full h-[440px] rounded-[18px] overflow-hidden shadow-[0_24px_50px_-20px_rgba(43,32,22,0.35)]">
          <Image
            src="/hero-tapes.png"
            alt="Stacks of VHS tapes and DVDs beside a CRT TV and VCR"
            fill
            sizes="(min-width: 1240px) 1144px, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="jr-hero-overlay">
          <div className="grid grid-cols-5 gap-5 p-8">
            {formatNavItems.map((item) => (
              <Link
                key={item.slug}
                href={`/formats/${item.slug}`}
                className="jr-hero-overlay-name text-center text-[#f5efe2] text-[13px] font-semibold no-underline"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
