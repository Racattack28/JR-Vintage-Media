"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { faqCategories, faqData, type FaqCategory } from "@/lib/data";

export default function Faq() {
  const [category, setCategory] = useState<FaqCategory>(faqCategories[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visibleFaqs = faqData
    .map((faq, i) => ({ ...faq, index: i }))
    .filter((faq) => faq.cat === category);

  function selectCategory(cat: FaqCategory) {
    setCategory(cat);
    setOpenIndex(null);
  }

  return (
    <Reveal
      id="faq"
      className="block max-w-[900px] mx-auto px-6 md:px-12 py-[46px] scroll-mt-[60px]"
    >
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
              className="cursor-pointer font-[family-name:var(--font-barlow)] text-[14px] font-semibold py-[9px] px-[18px] rounded-[30px] border-[1.5px]"
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
        {visibleFaqs.map((faq) => {
          const open = openIndex === faq.index;
          return (
            <div
              key={faq.index}
              className="border-b border-[rgba(43,32,22,0.16)]"
            >
              <button
                onClick={() =>
                  setOpenIndex((cur) => (cur === faq.index ? null : faq.index))
                }
                className="cursor-pointer w-full text-left bg-transparent border-0 flex items-center justify-between gap-5 py-6"
              >
                <div className="text-[17px] font-semibold">{faq.q}</div>
                <div className="font-[family-name:var(--font-barlow)] text-[22px] text-[#bf4e2a] shrink-0">
                  {open ? "−" : "+"}
                </div>
              </button>
              {open && (
                <p className="jr-faq-answer text-[15px] leading-[1.7] text-[rgba(43,32,22,0.7)] m-0 mb-[26px] max-w-[700px]">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
