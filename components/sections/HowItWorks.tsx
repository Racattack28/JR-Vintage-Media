"use client";

import { useEffect, useRef } from "react";
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

const ACTIVE_BG = "#bf4e2a";
const INACTIVE_BG = "#e8dcc4";
const ACTIVE_COLOR = "#fffaf0";
const INACTIVE_COLOR = "rgba(43,32,22,0.45)";
const ACTIVE_SHADOW =
  "0 0 0 7px rgba(191,78,42,0.16), 0 6px 16px -4px rgba(191,78,42,0.5)";
const INACTIVE_SHADOW = "0 0 0 0 rgba(191,78,42,0)";

type Refs = {
  badges: (HTMLDivElement | null)[];
  fillsH: (HTMLDivElement | null)[];
  fillsV: (HTMLDivElement | null)[];
  dotsH: (HTMLDivElement | null)[];
  dotsV: (HTMLDivElement | null)[];
};

export default function HowItWorks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const refs = useRef<Refs>({
    badges: [],
    fillsH: [],
    fillsV: [],
    dotsH: [],
    dotsV: [],
  });
  const activeRef = useRef<boolean[]>(steps.map(() => false));

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Applies every frame while scrolling: pure DOM writes via refs, no
    // React state/re-render in the hot path, and no CSS transition on the
    // continuously-updated transforms - both were adding a trailing lag
    // that read as jank, especially on iPhone.
    function applyProgress(progress: number) {
      const n = steps.length - 1;
      const r = refs.current;

      steps.forEach((_, i) => {
        const active = progress >= i / n - 0.02;
        if (active === activeRef.current[i]) return;
        activeRef.current[i] = active;

        const badge = r.badges[i];
        if (badge) {
          badge.style.backgroundColor = active ? ACTIVE_BG : INACTIVE_BG;
          badge.style.color = active ? ACTIVE_COLOR : INACTIVE_COLOR;
          badge.style.boxShadow = active ? ACTIVE_SHADOW : INACTIVE_SHADOW;
          badge.style.transform = active ? "scale(1.06)" : "scale(0.92)";
        }
      });

      for (let i = 0; i < steps.length - 1; i++) {
        const segFill = Math.min(1, Math.max(0, progress * n - i));
        const inTransit = segFill > 0.02 && segFill < 0.98;

        const fillH = r.fillsH[i];
        if (fillH) fillH.style.transform = `scaleX(${segFill})`;
        const fillV = r.fillsV[i];
        if (fillV) fillV.style.transform = `scaleY(${segFill})`;

        const dotH = r.dotsH[i];
        if (dotH) {
          dotH.style.opacity = inTransit ? "1" : "0";
          dotH.style.left = `${segFill * 100}%`;
        }
        const dotV = r.dotsV[i];
        if (dotV) {
          dotV.style.opacity = inTransit ? "1" : "0";
          dotV.style.top = `${segFill * 100}%`;
        }
      }
    }

    if (reduceMotion) {
      const raf = requestAnimationFrame(() => applyProgress(1));
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
      applyProgress(Math.min(1, Math.max(0, raw)));
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
        {steps.map((step, i) => (
          <div key={step.title} className="relative flex lg:block gap-5">
            {/* Mobile: connector runs down the full item height into the
                gap below. Desktop: connector runs from this badge's right
                edge, across the gap, to the next badge's left edge. */}
            {i < steps.length - 1 && (
              <div className="lg:hidden absolute top-[46px] bottom-[-40px] left-[23px] w-[2px] bg-[rgba(191,78,42,0.2)]">
                <div
                  ref={(el) => {
                    refs.current.fillsV[i] = el;
                  }}
                  className="w-full h-full bg-[#bf4e2a] origin-top"
                  style={{ transform: "scaleY(0)" }}
                />
                <div
                  ref={(el) => {
                    refs.current.dotsV[i] = el;
                  }}
                  className="absolute w-[9px] h-[9px] rounded-full bg-[#e8845a] opacity-0"
                  style={{
                    boxShadow: "0 0 10px 3px rgba(232,132,90,0.75)",
                    left: "50%",
                    top: "0%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
            )}
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-[23px] left-[46px] h-[2px] w-[calc(100%-46px+40px)] bg-[rgba(191,78,42,0.2)]">
                <div
                  ref={(el) => {
                    refs.current.fillsH[i] = el;
                  }}
                  className="w-full h-full bg-[#bf4e2a] origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
                <div
                  ref={(el) => {
                    refs.current.dotsH[i] = el;
                  }}
                  className="absolute w-[9px] h-[9px] rounded-full bg-[#e8845a] opacity-0"
                  style={{
                    boxShadow: "0 0 10px 3px rgba(232,132,90,0.75)",
                    top: "50%",
                    left: "0%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
            )}

            <div className="shrink-0">
              <div
                ref={(el) => {
                  refs.current.badges[i] = el;
                }}
                className="relative z-10 shrink-0 w-[46px] h-[46px] rounded-full flex items-center justify-center font-[family-name:var(--font-bitter)] text-[18px] font-semibold"
                style={{
                  backgroundColor: INACTIVE_BG,
                  color: INACTIVE_COLOR,
                  boxShadow: INACTIVE_SHADOW,
                  transform: "scale(0.92)",
                  transition:
                    "background-color 0.35s ease, color 0.35s ease, box-shadow 0.45s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                {i + 1}
              </div>
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
        ))}
      </div>
    </Reveal>
  );
}
