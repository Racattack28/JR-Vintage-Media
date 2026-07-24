import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import { formatNavItems, partnerVerticals } from "@/lib/data";

type HeaderVariant = "site" | "format" | "order";

const navLinkClass =
  "jr-nav-link text-[#2b2016] no-underline text-[14px] font-medium";

function ChevronDown() {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden="true"
      className="jr-chevron shrink-0 relative top-[1px]"
    >
      <path
        d="M1 5L5 1L9 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NavLinks({ prefixHome }: { prefixHome: boolean }) {
  const base = prefixHome ? "/" : "";
  return (
    <>
      <Link href={`${base}#how`} className={navLinkClass}>
        How it works
      </Link>
      <div className="jr-dropdown relative">
        <div className={`${navLinkClass} cursor-default flex items-center gap-[5px]`}>
          What I convert
          <ChevronDown />
        </div>
        <div className="jr-dropdown-menu">
          <div className="jr-dropdown-menu-inner">
            {formatNavItems.map((item) => (
              <Link
                key={item.slug}
                href={`/formats/${item.slug}`}
                className="jr-dropdown-item"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="jr-dropdown relative">
        <div className={`${navLinkClass} cursor-default flex items-center gap-[5px]`}>
          Partner with me
          <ChevronDown />
        </div>
        <div className="jr-dropdown-menu">
          <div className="jr-dropdown-menu-inner">
            {partnerVerticals.map((item) => (
              <Link
                key={item.slug}
                href={`/partner/${item.slug}`}
                className="jr-dropdown-item"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Link href={`${base}#pricing`} className={navLinkClass}>
        Pricing
      </Link>
      <Link href={`${base}#service`} className={navLinkClass}>
        Local &amp; mail-in
      </Link>
      <Link href={`${base}#about`} className={navLinkClass}>
        About me
      </Link>
      <Link href={`${base}#faq`} className={navLinkClass}>
        FAQ
      </Link>
    </>
  );
}

export default function Header({ variant }: { variant: HeaderVariant }) {
  return (
    <div className="sticky top-0 z-50 relative flex items-center justify-between py-3 px-6 md:px-12 bg-[rgba(245,239,226,0.92)] backdrop-blur-[6px] border-b border-[rgba(43,32,22,0.14)]">
      <Link href="/" className="flex items-center min-w-0">
        <Image
          src="/logo.png"
          alt="JR Vintage Media"
          width={606}
          height={312}
          className="h-14 w-auto sm:h-20 sm:w-auto rounded-[8px] shrink-0"
          priority
        />
      </Link>

      {variant === "order" ? (
        <Link
          href="/"
          className="shrink-0 whitespace-nowrap font-[family-name:var(--font-lato)] font-semibold text-[13px] sm:text-[14px] bg-transparent border border-[#2b2016] text-[#2b2016] py-[8px] px-[14px] sm:py-[9px] sm:px-[18px] rounded-[30px]"
        >
          Back to site
        </Link>
      ) : (
        <>
          <div className="hidden min-[1150px]:flex items-center gap-[22px]">
            <NavLinks prefixHome={variant === "format"} />
            <Link
              href="/quote"
              className="jr-btn font-[family-name:var(--font-lato)] font-semibold text-[14px] bg-[#bf4e2a] hover:bg-[#9c3d1f] text-[#fffaf0] py-[11px] px-[22px] rounded-[30px]"
            >
              Get a free quote
            </Link>
          </div>
          <MobileNav prefixHome={variant === "format"} />
        </>
      )}
    </div>
  );
}
