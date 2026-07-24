import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlaceholderImage from "@/components/PlaceholderImage";
import { partnerVerticals } from "@/lib/data";

export const metadata: Metadata = {
  title: "Partner with me | JR Vintage Media",
  description:
    "A tape-to-digital and tribute video service for the clients you already serve. Bulk conversion, tribute video add-ons, and a quiet white-label handoff for funeral homes, senior living, genealogy services, professional organizers, videographers, and photo studios.",
};

const valueProps = [
  "Bulk and batch conversion, send five tapes or fifty, priced and handled the same careful way.",
  "Tribute video and slideshow add-on, I can help assemble a simple highlight reel from converted footage, not just hand back raw files.",
  "Quiet white-label handoff, your clients deal with you, not me. I work in the background and the finished files go back through you.",
];

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-[#f5efe2] font-[family-name:var(--font-lato)] text-[#2b2016]">
      <Header variant="format" />

      <div className="bg-[#2b2016] text-[#f5efe2]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-[84px] grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2.5px] text-[#d9a15a] mb-[14px]">
              PARTNER WITH ME
            </div>
            <h1 className="font-[family-name:var(--font-bitter)] font-normal text-[40px] leading-[1.25] m-0 mb-6">
              A tape-to-digital and tribute video service for the clients you
              already serve
            </h1>
            <p className="text-[16px] leading-[1.8] text-[rgba(245,239,226,0.75)] m-0 mb-8 max-w-[540px]">
              Funeral homes are usually the first to hear about it: a family
              preparing a tribute video finds a box of old home movies
              nobody&apos;s played in twenty years. It&apos;s the same story
              across a handful of trades, tapes turn up during a decluttering
              job, a genealogy search, or while going through a loved
              one&apos;s things at a senior living facility. If your work
              regularly puts you in front of someone holding a tape they
              can&apos;t watch, I handle the conversion quietly in the
              background so you can stay focused on your own clients, and
              hand the finished files back exactly the way you need them.
            </p>
            <ul className="m-0 mb-9 pl-[18px] text-[15px] leading-[1.8] text-[rgba(245,239,226,0.8)] max-w-[540px] flex flex-col gap-2">
              {valueProps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link
              href="/quote"
              className="jr-btn inline-block font-[family-name:var(--font-lato)] font-semibold text-[16px] bg-[#bf4e2a] hover:bg-[#9c3d1f] text-[#fffaf0] py-4 px-8 rounded-[30px]"
            >
              Get a free quote
            </Link>
          </div>
          <PlaceholderImage
            alt="Drop a photo of Jack handing off a finished box of tapes to a local business partner"
            heightClass="h-[420px]"
            shadow
          />
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-[84px]">
        <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2.5px] text-[#9c3d1f] mb-[14px]">
          WHO THIS IS FOR
        </div>
        <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[36px] m-0 mb-11 max-w-[700px]">
          Wherever old tapes turn up in your line of work, there&apos;s a way
          to help your clients without adding to your own.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partnerVerticals.map((vertical) => (
            <Link
              key={vertical.slug}
              href={`/partner/${vertical.slug}`}
              className="group block border border-[rgba(43,32,22,0.16)] rounded-[18px] p-8 bg-[#fffaf0] no-underline hover:border-[#bf4e2a] transition-colors"
            >
              <h3 className="font-[family-name:var(--font-bitter)] font-normal text-[22px] m-0 mb-3 text-[#2b2016]">
                {vertical.title}
              </h3>
              <p className="text-[15px] leading-[1.7] text-[rgba(43,32,22,0.75)] m-0 mb-4">
                {vertical.teaser}
              </p>
              <span className="text-[14px] font-semibold text-[#bf4e2a] group-hover:text-[#9c3d1f]">
                Learn more &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>

      <Footer prefixHome />
    </div>
  );
}
