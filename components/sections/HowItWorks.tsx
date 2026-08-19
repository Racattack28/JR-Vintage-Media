"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

const steps = [
  {
    title: "Send or drop off",
    body: "Bring your tapes to a local drop-off, or pack them into any box and mail them. I'll confirm as soon as they arrive.",
  },
  {
    title: "I transfer, tape by tape",
    body: "Every tape is cleaned, and repaired free of charge if needed, then played and captured in real time on calibrated decks in my own studio.",
  },
  {
    title: "Receive your files",
    body: "Digital files are delivered by download link, plus a USB stick if you'd like a physical backup too. Your original tapes are returned to you cleaned and in their original condition.",
  },
];

function NumBadge({ active, num }: { active: boolean; num: number }) {
  return (
    <div
      className="relative z-10 shrink-0 w-[46px] h-[46px] rounded-full flex items-center justify-center font-[family-name:var(--font-bitter)] text-[18px] font-semibold"
      style={{
        backgroundColor: active ? "#bf4e2a" : "#e8dcc4",
        color: active ? "#fffaf0" : "rgba(43,32,22,0.45)",
        boxShadow: active
          ? "0 0 0 7px rgba(191,78,42,0.16), 0 6px 16px -4px rgba(191,78,42,0.5)"
          : "0 0 0 0 rgba(191,78,42,0)",
        transform: active ? "scale(1.06)" : "scale(0.92)",
        transition:
          "background-color 0.35s ease, color 0.35s ease, box-shadow 0.45s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {num}
    </div>
  );
}

function ConnectorFill({
  fill,
  vertical,
}: {
  fill: number;
  vertical?: boolean;
}) {
  const inTransit = fill > 0.02 && fill < 0.98;
  return (
    <div
      className={`relative bg-[rgba(191,78,42,0.2)] ${
        vertical ? "w-full h-full" : "w-full h-full"
      }`}
    >
      <div
        className={`bg-[#bf4e2a] ${vertical ? "w-full origin-top" : "h-full origin-left"}`}
        style={{
          height: vertical ? "100%" : "100%",
          width: vertical ? "100%" : "100%",
          transform: vertical ? `scaleY(${fill})` : `scaleX(${fill})`,
          transition: "transform 0.1s linear",
        }}
      />
      {inTransit && (
        <div
          className="absolute w-[9px] h-[9px] rounded-full bg-[#e8845a]"
          style={{
            boxShadow: "0 0 10px 3px rgba(232,132,90,0.75)",
            ...(vertical
              ? { left: "50%", top: `${fill * 100}%`, transform: "translate(-50%, -50%)" }
              : { top: "50%", left: `${fill * 100}%`, transform: "translate(-50%, -50%)" }),
          }}
        />
      )}
    </div>
  );
}

export default function HowItWorks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      const raf = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(raf);
    }

    let ticking = false;

    function update() {
      ticking = false;
      const el = trackRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // Starts filling once the track is ~80% down the viewport (just
      // entering view) and finishes once it's scrolled fully past that
      // point, so the line fills in step with how far you've scrolled
      // through the section rather than all at once.
      const raw = (viewportH * 0.8 - rect.top) / rect.height;
      setProgress(Math.min(1, Math.max(0, raw)));
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    const initialRaf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(initialRaf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <Reveal
      id="how"
      className="block max-w-[1240px] mx-auto px-6 md:px-12 py-[84px] scroll-mt-[60px]"
    >
      <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2.5px] text-[#9c3d1f] mb-[14px]">
        HOW IT WORKS
      </div>
      <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[42px] m-0 mb-11 max-w-[600px]">
        Three easy steps to bring your old memories back to life.
      </h2>

      {/* One grid drives both the badges/connectors and the text, so the
          numbers are always pixel-aligned with their titles - a separate
          flex "rail" above the grid drifted out of sync with the columns
          below at different widths. */}
      <div
        ref={trackRef}
        className="jr-grid-3 grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        {steps.map((step, i) => {
          const active = progress >= i / (steps.length - 1) - 0.02;
          const segmentFill =
            i < steps.length - 1
              ? Math.min(1, Math.max(0, progress * (steps.length - 1) - i))
              : 0;
          return (
            <div key={step.title} className="relative flex lg:block gap-5">
              {/* Mobile: connector runs down the full item height into the
                  gap below. Desktop: connector runs from this badge's right
                  edge, across the gap, to the next badge's left edge. */}
              {i < steps.length - 1 && (
                <div className="lg:hidden absolute top-[46px] bottom-[-40px] left-[23px] w-[2px]">
                  <ConnectorFill fill={segmentFill} vertical />
                </div>
              )}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-[23px] left-[46px] h-[2px] w-[calc(100%-46px+40px)]">
                  <ConnectorFill fill={segmentFill} />
                </div>
              )}

              <div className="shrink-0">
                <NumBadge active={active} num={i + 1} />
              </div>
              <div className="lg:mt-5">
                <h3 className="text-[19px] font-semibold m-0 mb-[10px]">
                  {step.title}
                </h3>
                <p className="text-[15px] leading-[1.7] text-[rgba(43,32,22,0.7)] m-0">
                  {step.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
