"use client";

import Link from "next/link";
import { useRef, type ComponentProps, type MouseEvent } from "react";

type HoverGlowLinkProps = ComponentProps<typeof Link>;

export default function HoverGlowLink({
  children,
  className,
  ...props
}: HoverGlowLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <Link
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`jr-glow-card group relative overflow-hidden ${className ?? ""}`}
      {...props}
    >
      <span
        aria-hidden
        className="jr-glow-card-shine pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      <div className="relative z-10">{children}</div>
    </Link>
  );
}
