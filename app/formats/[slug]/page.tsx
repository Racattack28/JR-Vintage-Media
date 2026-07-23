import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatData, formatSlugs, type FormatSlug } from "@/lib/data";

export function generateStaticParams() {
  return formatSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = formatData[slug as FormatSlug];
  if (!entry) return {};
  return {
    title: `${entry.title} tape transfer | JR Vintage Media`,
    description: entry.description,
  };
}

export default async function FormatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = formatData[slug as FormatSlug];

  if (!entry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f5efe2] font-[family-name:var(--font-lato)] text-[#2b2016]">
      <Header variant="format" />
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 pt-16 pb-24">
        <div className="relative w-full h-[380px] rounded-[18px] overflow-hidden shadow-[0_24px_50px_-20px_rgba(43,32,22,0.35)] mb-9">
          <Image
            src={entry.image}
            alt={entry.placeholder}
            fill
            sizes="(min-width: 1000px) 904px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2.5px] text-[#9c3d1f] mb-[14px]">
          TAPE FORMAT
        </div>
        <h1 className="font-[family-name:var(--font-bitter)] font-normal text-[40px] m-0 mb-5">
          {entry.title}
        </h1>
        <p className="text-[16px] leading-[1.8] text-[rgba(43,32,22,0.75)] m-0 mb-10 max-w-[720px]">
          {entry.description}
        </p>
        <Link
          href="/quote"
          className="jr-btn inline-block font-[family-name:var(--font-lato)] font-semibold text-[16px] bg-[#bf4e2a] hover:bg-[#9c3d1f] text-[#fffaf0] py-4 px-8 rounded-[30px]"
        >
          Get a free quote
        </Link>
      </div>
      <Footer prefixHome />
    </div>
  );
}
