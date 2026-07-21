import Image from "next/image";
import Link from "next/link";
import { formatNavItems } from "@/lib/data";

type HeaderVariant = "site" | "format" | "order";

const navLinkClass =
  "jr-nav-link text-[#2b2016] no-underline text-[14px] font-medium";

function NavLinks({ prefixHome }: { prefixHome: boolean }) {
  const base = prefixHome ? "/" : "";
  return (
    <>
      <Link href={`${base}#how`} className={navLinkClass}>
        How it works
      </Link>
      <div className="jr-dropdown relative">
        <div className={`${navLinkClass} cursor-default`}>What I convert</div>
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
    <div className="sticky top-0 z-50 flex items-center justify-between py-[18px] px-6 md:px-12 bg-[rgba(245,239,226,0.92)] backdrop-blur-[6px] border-b border-[rgba(43,32,22,0.14)]">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="JR Vintage Media"
          width={64}
          height={64}
          className="h-16 w-16 rounded-[10px] object-cover"
          priority
        />
        <div className="font-[family-name:var(--font-bitter)] text-[22px] tracking-[0.5px]">
          JR Vintage Media
        </div>
      </Link>

      {variant === "order" ? (
        <Link
          href="/"
          className="font-[family-name:var(--font-lato)] font-semibold text-[14px] bg-transparent border border-[#2b2016] text-[#2b2016] py-[9px] px-[18px] rounded-[30px]"
        >
          Back to site
        </Link>
      ) : (
        <div className="hidden min-[1150px]:flex items-center gap-[22px]">
          <NavLinks prefixHome={variant === "format"} />
          <Link
            href="/quote"
            className="jr-btn font-[family-name:var(--font-lato)] font-semibold text-[14px] bg-[#bf4e2a] hover:bg-[#9c3d1f] text-[#fffaf0] py-[11px] px-[22px] rounded-[30px]"
          >
            Get a free quote
          </Link>
        </div>
      )}
    </div>
  );
}
