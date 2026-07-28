"use client";

import { useRef, type HTMLAttributes, type MouseEvent } from "react";

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  maxTilt?: number;
  lift?: number;
}

export default function TiltCard({
  children,
  className,
  maxTilt = 7,
  lift = 6,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * maxTilt * 2;
    const rotateX = (0.5 - py) * maxTilt * 2;

    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${lift}px)`;
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`jr-tilt-card ${className ?? ""}`}
      {...props}
    >
      {children}
    </div>
  );
}
