import Image from "next/image";
import Link from "next/link";
import { formatNavItems } from "@/lib/data";

const columnHeadingClass =
  "font-[family-name:var(--font-barlow)] text-[12px] tracking-[2px] text-[#d9a15a] mb-4";
const footerLinkClass =
  "text-[14px] text-[rgba(245,239,226,0.75)] no-underline hover:text-[#f5efe2]";

export default function Footer({
  prefixHome = false,
}: {
  prefixHome?: boolean;
}) {
  const base = prefixHome ? "/" : "";

  return (
    <div className="bg-[#2b2016] text-[#f5efe2]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Image
              src="/logo.png"
              alt="JR Vintage Media"
              width={606}
              height={312}
              className="h-14 w-auto rounded-[8px] mb-6"
            />
            <div className="flex flex-col gap-2 text-[14px] text-[rgba(245,239,226,0.75)]">
              <div className="text-[#f5efe2] font-semibold">
                Jack Racovalis
              </div>
              <a href="tel:+61481198213" className="hover:text-[#f5efe2]">
                0481 198 213
              </a>
              <a
                href="mailto:jackrac@jrvintagemedia.com"
                className="hover:text-[#f5efe2]"
              >
                jackrac@jrvintagemedia.com
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:contents">
            <div>
              <div className={columnHeadingClass}>EXPLORE</div>
              <nav className="flex flex-col gap-3">
                <Link href={`${base}#how`} className={footerLinkClass}>
                  How it works
                </Link>
                <Link href={`${base}#pricing`} className={footerLinkClass}>
                  Pricing
                </Link>
                <Link href={`${base}#service`} className={footerLinkClass}>
                  Local &amp; mail-in
                </Link>
                <Link href={`${base}#about`} className={footerLinkClass}>
                  About me
                </Link>
                <Link href={`${base}#faq`} className={footerLinkClass}>
                  FAQ
                </Link>
              </nav>
            </div>

            <div>
              <div className={columnHeadingClass}>TAPE FORMATS</div>
              <nav className="flex flex-col gap-3">
                {formatNavItems.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/formats/${item.slug}`}
                    className={footerLinkClass}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <div className={columnHeadingClass}>GET STARTED</div>
              <nav className="flex flex-col gap-3">
                <Link href="/quote" className={footerLinkClass}>
                  Get a free quote
                </Link>
                <Link href="/partner" className={footerLinkClass}>
                  Partner with me
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(245,239,226,0.15)] mt-10 lg:mt-12 pt-6 flex items-center justify-between flex-wrap gap-4 text-[13px] text-[rgba(245,239,226,0.55)]">
          <div className="flex items-center flex-wrap gap-x-5 gap-y-2">
            <div>&copy; 2026 JR Vintage Media, by Jack Racovalis</div>
            <Link href="/privacy" className="hover:text-[#f5efe2]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#f5efe2]">
              Terms &amp; Conditions
            </Link>
          </div>
          <div>Local &amp; mail-in service</div>
        </div>
      </div>
    </div>
  );
}
