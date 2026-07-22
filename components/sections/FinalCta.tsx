import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function FinalCta() {
  return (
    <Reveal className="block max-w-[1240px] mx-auto px-6 md:px-12 pt-[46px] pb-[80px] text-center">
      <h2 className="font-[family-name:var(--font-bitter)] font-normal text-[44px] m-0 mb-7">
        Ready to see what&apos;s on those tapes?
      </h2>
      <Link
        href="/quote"
        className="jr-btn inline-block font-[family-name:var(--font-lato)] font-semibold text-[16px] bg-[#bf4e2a] hover:bg-[#9c3d1f] text-[#fffaf0] py-[17px] px-[34px] rounded-[30px]"
      >
        Get a free quote
      </Link>
    </Reveal>
  );
}
