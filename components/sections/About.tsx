import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <Reveal
      id="about"
      className="block bg-[#ece1cb] py-[76px] px-6 md:px-12 scroll-mt-[60px]"
    >
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-14 items-center">
        <div className="relative w-full h-[340px] rounded-[18px] overflow-hidden">
          <Image
            src="/about-jack.jpg"
            alt="Jack Racovalis smiling, holding a pool cue at a bar"
            fill
            sizes="(min-width: 1024px) 435px, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2.5px] text-[#9c3d1f] mb-[14px]">
            WHO&apos;S BEHIND THIS
          </div>
          <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[36px] m-0 mb-[18px]">
            Hi, I&apos;m Jack Racovalis.
          </h2>
          <p className="text-[16px] leading-[1.75] text-[rgba(43,32,22,0.75)] m-0 mb-4 max-w-[560px]">
            I founded JR Vintage Media as I found genuine interest in
            helping people and families save their memories. After wanting
            to save and watch my parents&apos; wedding tape myself, I saw how
            much can ride on a single tape, and that&apos;s what the
            business is built around now: trust and integrity. Every order
            runs on my own decks, watched and logged by hand, because I know
            what it means when it&apos;s your family on the other end.
          </p>
          <p className="text-[16px] leading-[1.75] text-[rgba(43,32,22,0.75)] m-0 max-w-[560px]">
            Outside of this, I work as a business advisor helping clients
            manage listings and confidently navigate selling their
            business, and I&apos;m an active member of the Young Chamber of
            Commerce. When I&apos;m not behind a tape deck, you&apos;ll
            usually find me at the gym, out hiking, or watching the AFL.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
