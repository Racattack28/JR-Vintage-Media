"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { reviewData, googleBusinessUrl } from "@/lib/data";

function GoogleBadge() {
  const badge = (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[rgba(43,32,22,0.55)]">
      <svg viewBox="0 0 18 18" className="w-[14px] h-[14px]" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62z"
        />
        <path
          fill="#34A853"
          d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.95v2.33A9 9 0 0 0 9 18z"
        />
        <path
          fill="#FBBC05"
          d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.95A9 9 0 0 0 0 9c0 1.45.35 2.83.95 4.03l3-2.33z"
        />
        <path
          fill="#EA4335"
          d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .95 4.97l3 2.33C4.66 5.17 6.65 3.58 9 3.58z"
        />
      </svg>
      Google review
    </span>
  );

  if (!googleBusinessUrl) return badge;

  return (
    <a
      href={googleBusinessUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80"
    >
      {badge}
    </a>
  );
}

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
      className="block max-w-[1240px] mx-auto px-6 md:px-12 pt-[84px] pb-8"
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
                <div className="border border-[rgba(43,32,22,0.16)] rounded-2xl p-7 bg-[#fffaf0] h-full flex flex-col">
                  <div className="font-[family-name:var(--font-barlow)] text-[15px] text-[#bf4e2a] mb-[14px]">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(Math.max(0, 5 - review.rating))}
                  </div>
                  <p className="text-[15px] leading-[1.7] text-[rgba(43,32,22,0.75)] m-0 mb-5">
                    {review.text}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <div className="text-[14px] font-semibold">
                      {review.name}
                    </div>
                    {review.source === "google" && <GoogleBadge />}
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
