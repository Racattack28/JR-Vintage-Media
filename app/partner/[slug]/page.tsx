import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PlaceholderImage from "@/components/PlaceholderImage";
import { partnerVerticals } from "@/lib/data";

export function generateStaticParams() {
  return partnerVerticals.map((vertical) => ({ slug: vertical.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vertical = partnerVerticals.find((v) => v.slug === slug);
  if (!vertical) return {};
  return {
    title: `Partner with me | ${vertical.title} | JR Vintage Media`,
    description: vertical.teaser,
  };
}

const valueProps = [
  "Bulk and batch conversion, send five tapes or fifty, priced and handled the same careful way.",
  "Tribute video and slideshow add-on, I can help assemble a simple highlight reel from converted footage, not just hand back raw files.",
  "Quiet white-label handoff, your clients deal with you, not me. I work in the background and the finished files go back through you.",
];

export default async function PartnerVerticalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vertical = partnerVerticals.find((v) => v.slug === slug);

  if (!vertical) {
    notFound();
  }

  const others = partnerVerticals.filter((v) => v.slug !== slug);

  return (
    <div className="min-h-screen bg-[#f5efe2] font-[family-name:var(--font-lato)] text-[#2b2016]">
      <Header variant="format" />

      <div className="bg-[#2b2016] text-[#f5efe2]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-[84px] grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2.5px] text-[#d9a15a] mb-[14px]">
              FOR {vertical.title.toUpperCase()}
            </div>
            <h1 className="font-[family-name:var(--font-bitter)] font-normal text-[40px] leading-[1.25] m-0 mb-6">
              {vertical.heroHeadline}
            </h1>
            {vertical.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="text-[16px] leading-[1.8] text-[rgba(245,239,226,0.75)] m-0 mb-6 max-w-[540px]"
              >
                {paragraph}
              </p>
            ))}
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
            alt={`Drop a photo relevant to ${vertical.title.toLowerCase()}`}
            heightClass="h-[420px]"
            shadow
          />
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-[84px]">
        <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2.5px] text-[#9c3d1f] mb-[14px]">
          OTHER PARTNERSHIPS
        </div>
        <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[30px] m-0 mb-8 max-w-[700px]">
          Wherever old tapes turn up in your line of work, there&apos;s a way
          to help.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {others.map((other) => (
            <Link
              key={other.slug}
              href={`/partner/${other.slug}`}
              className="block border border-[rgba(43,32,22,0.16)] rounded-[14px] py-4 px-5 bg-[#fffaf0] no-underline text-[15px] font-semibold text-[#2b2016] hover:border-[#bf4e2a] transition-colors"
            >
              {other.title}
            </Link>
          ))}
        </div>
      </div>

      <Footer prefixHome />
    </div>
  );
}
