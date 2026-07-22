"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { reviewData } from "@/lib/data";

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const count = reviewData.length;
  const maxIndex = Math.max(0, count - visibleCards);
  const stops = maxIndex + 1;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setVisibleCards(mq.matches ? 1 : 3);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % stops);
    }, 5000);
    return () => clearInterval(timer);
  }, [stops]);

  // Clamp for rendering rather than syncing back into state, since
  // stops can shrink when the viewport crosses the mobile breakpoint.
  const clampedIndex = Math.min(index, maxIndex);
  const offset = `-${clampedIndex * (100 / visibleCards)}%`;

  return (
    <Reveal
      id="reviews"
      className="block max-w-[1240px] mx-auto px-6 md:px-12 pt-[110px] pb-10"
    >
      <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2.5px] text-[#9c3d1f] mb-[14px]">
        REVIEWS
      </div>
      <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[42px] m-0 mb-10 max-w-[600px]">
        What families are saying.
      </h2>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${offset})` }}
          >
            {reviewData.map((review, i) => (
              <div
                key={i}
                className="shrink-0 grow-0 px-3 box-border"
                style={{ flexBasis: `${100 / visibleCards}%` }}
              >
                <div className="border border-[rgba(43,32,22,0.16)] rounded-2xl p-7 bg-[#fffaf0] h-full">
                  <div className="font-[family-name:var(--font-barlow)] text-[15px] text-[#bf4e2a] mb-[14px]">
                    ★★★★★
                  </div>
                  <p className="text-[15px] leading-[1.7] text-[rgba(43,32,22,0.75)] m-0 mb-5">
                    {review.text}
                  </p>
                  <div className="text-[14px] font-semibold">
                    {review.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5 mt-6">
          <button
            onClick={() => setIndex((i) => (i - 1 + stops) % stops)}
            aria-label="Previous review"
            className="jr-btn w-[38px] h-[38px] rounded-full border-[1.5px] border-[#2b2016] bg-transparent text-[16px] cursor-pointer"
          >
            &larr;
          </button>
          <div className="flex gap-2">
            {Array.from({ length: stops }, (_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="w-2 h-2 rounded-full cursor-pointer p-0 border-0"
                style={{
                  background:
                    i === clampedIndex ? "#bf4e2a" : "rgba(43,32,22,0.2)",
                }}
              />
            ))}
          </div>
          <button
            onClick={() => setIndex((i) => (i + 1) % stops)}
            aria-label="Next review"
            className="jr-btn w-[38px] h-[38px] rounded-full border-[1.5px] border-[#2b2016] bg-transparent text-[16px] cursor-pointer"
          >
            &rarr;
          </button>
        </div>
      </div>
    </Reveal>
  );
}
