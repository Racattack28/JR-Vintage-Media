"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { faqCategories, faqData, type FaqCategory } from "@/lib/data";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function Faq() {
  const [category, setCategory] = useState<FaqCategory>(faqCategories[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function selectCategory(cat: FaqCategory) {
    setCategory(cat);
    setOpenIndex(null);
  }

  return (
    <Reveal
      id="faq"
      className="block max-w-[900px] mx-auto px-6 md:px-12 py-[46px] scroll-mt-[60px]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2.5px] text-[#9c3d1f] mb-[14px]">
        FAQ
      </div>
      <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[42px] m-0 mb-9 max-w-[600px]">
        Questions people ask before sending their tapes.
      </h2>
      <div className="flex gap-[10px] flex-wrap mb-6">
        {faqCategories.map((cat) => {
          const active = cat === category;
          return (
            <button
              key={cat}
              onClick={() => selectCategory(cat)}
              className="cursor-pointer font-[family-name:var(--font-barlow)] text-[14px] font-semibold py-[9px] px-[18px] rounded-[30px] border-[1.5px] transition-transform duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[0_10px_20px_-10px_rgba(43,32,22,0.4)] active:translate-y-0 active:scale-95"
              style={{
                borderColor: active ? "#bf4e2a" : "rgba(43,32,22,0.25)",
                background: active ? "#bf4e2a" : "transparent",
                color: active ? "#fffaf0" : "#2b2016",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col">
        {faqData.map((faq, index) => {
          const open = openIndex === index;
          const visible = faq.cat === category;
          return (
            <div
              key={index}
              className={`border-b border-[rgba(43,32,22,0.16)] ${visible ? "" : "hidden"}`}
            >
              <button
                onClick={() => setOpenIndex((cur) => (cur === index ? null : index))}
                aria-expanded={open}
                className="cursor-pointer w-full text-left bg-transparent border-0 flex items-center justify-between gap-5 py-6"
              >
                <div className="text-[17px] font-semibold">{faq.q}</div>
                <div className="font-[family-name:var(--font-barlow)] text-[22px] text-[#bf4e2a] shrink-0">
                  {open ? "−" : "+"}
                </div>
              </button>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="text-[15px] leading-[1.7] text-[rgba(43,32,22,0.7)] m-0 mb-[26px] max-w-[700px]">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
