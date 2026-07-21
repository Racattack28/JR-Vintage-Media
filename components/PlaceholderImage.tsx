interface PlaceholderImageProps {
  alt: string;
  heightClass?: string;
  radiusClass?: string;
  shadow?: boolean;
  className?: string;
}

export default function PlaceholderImage({
  alt,
  heightClass = "h-[380px]",
  radiusClass = "rounded-[18px]",
  shadow = false,
  className = "",
}: PlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative w-full ${heightClass} ${radiusClass} ${shadow ? "shadow-[0_24px_50px_-20px_rgba(43,32,22,0.35)]" : ""} flex flex-col items-center justify-center gap-3 bg-[#e4d8bf] border border-[rgba(43,32,22,0.16)] text-center px-8 ${className}`}
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(43,32,22,0.4)"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="11" r="2.2" />
        <path d="M3 17l5-4 4 3 3-2.5 6 4.5" />
      </svg>
      <span className="text-[13px] leading-snug text-[rgba(43,32,22,0.55)] font-medium max-w-[260px]">
        {alt}
      </span>
    </div>
  );
}
