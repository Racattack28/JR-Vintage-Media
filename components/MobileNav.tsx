"use client";

import Link from "next/link";
import { useState } from "react";
import { formatNavItems, partnerVerticals } from "@/lib/data";

const linkClass =
  "block py-3 text-[15px] font-medium text-[#2b2016] no-underline border-b border-[rgba(43,32,22,0.1)]";

export default function MobileNav({ prefixHome }: { prefixHome: boolean }) {
  const [open, setOpen] = useState(false);
  const [formatsOpen, setFormatsOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const base = prefixHome ? "/" : "";

  function close() {
    setOpen(false);
    setFormatsOpen(false);
    setPartnerOpen(false);
  }

  return (
    <div className="min-[1150px]:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="jr-btn flex flex-col justify-center gap-[5px] w-10 h-10 bg-transparent border-none cursor-pointer"
      >
        <span
          className="block h-[2px] w-6 bg-[#2b2016] transition-transform duration-200"
          style={
            open
              ? { transform: "translateY(7px) rotate(45deg)" }
              : undefined
          }
        />
        <span
          className="block h-[2px] w-6 bg-[#2b2016] transition-opacity duration-200"
          style={open ? { opacity: 0 } : undefined}
        />
        <span
          className="block h-[2px] w-6 bg-[#2b2016] transition-transform duration-200"
          style={
            open
              ? { transform: "translateY(-7px) rotate(-45deg)" }
              : undefined
          }
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#f5efe2] border-b border-[rgba(43,32,22,0.14)] px-6 py-2 shadow-[0_16px_24px_-12px_rgba(0,0,0,0.2)]">
          <Link href={`${base}#how`} className={linkClass} onClick={close}>
            How it works
          </Link>

          <button
            type="button"
            onClick={() => setFormatsOpen((v) => !v)}
            className={`${linkClass} w-full flex items-center justify-between bg-transparent cursor-pointer text-left`}
          >
            What I convert
            <span className="font-[family-name:var(--font-barlow)] text-[18px] text-[#bf4e2a]">
              {formatsOpen ? "−" : "+"}
            </span>
          </button>
          {formatsOpen && (
            <div className="pl-4 pb-2">
              {formatNavItems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/formats/${item.slug}`}
                  className="block py-2 text-[14px] text-[rgba(43,32,22,0.75)] no-underline"
                  onClick={close}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setPartnerOpen((v) => !v)}
            className={`${linkClass} w-full flex items-center justify-between bg-transparent cursor-pointer text-left`}
          >
            Partner with me
            <span className="font-[family-name:var(--font-barlow)] text-[18px] text-[#bf4e2a]">
              {partnerOpen ? "−" : "+"}
            </span>
          </button>
          {partnerOpen && (
            <div className="pl-4 pb-2">
              {partnerVerticals.map((item) => (
                <Link
                  key={item.slug}
                  href={`/partner/${item.slug}`}
                  className="block py-2 text-[14px] text-[rgba(43,32,22,0.75)] no-underline"
                  onClick={close}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}

          <Link href={`${base}#pricing`} className={linkClass} onClick={close}>
            Pricing
          </Link>
          <Link href={`${base}#service`} className={linkClass} onClick={close}>
            Local &amp; mail-in
          </Link>
          <Link href={`${base}#about`} className={linkClass} onClick={close}>
            About me
          </Link>
          <Link
            href={`${base}#faq`}
            className={`${linkClass} border-b-0`}
            onClick={close}
          >
            FAQ
          </Link>

          <Link
            href="/quote"
            onClick={close}
            className="jr-btn block text-center mt-4 mb-4 font-[family-name:var(--font-lato)] font-semibold text-[14px] bg-[#bf4e2a] hover:bg-[#9c3d1f] text-[#fffaf0] py-3 px-[22px] rounded-[30px] no-underline"
          >
            Get a free quote
          </Link>
        </div>
      )}
    </div>
  );
}
