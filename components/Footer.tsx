import Image from "next/image";

export default function Footer() {
  return (
    <div className="border-t border-[rgba(43,32,22,0.14)] py-9 px-6 md:px-12 flex items-center justify-between flex-wrap gap-3 text-[13px] text-[rgba(43,32,22,0.55)]">
      <div className="flex items-center gap-[10px]">
        <Image
          src="/logo.png"
          alt="JR Vintage Media"
          width={28}
          height={28}
          className="h-7 w-7 rounded-[6px] object-cover"
        />
        <div>&copy; 2026 JR Vintage Media, by Jack Racovalis</div>
      </div>
      <div>Local &amp; mail-in service</div>
    </div>
  );
}
