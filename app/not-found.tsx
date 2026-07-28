import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f5efe2] font-[family-name:var(--font-lato)] text-[#2b2016] flex flex-col">
      <Header variant="format" />
      <div className="flex-1 flex items-center justify-center text-center px-6 py-24">
        <div>
          <div className="font-[family-name:var(--font-barlow)] text-[12px] tracking-[2.5px] text-[#9c3d1f] mb-[14px]">
            404
          </div>
          <h1 className="font-[family-name:var(--font-bitter)] font-normal text-[36px] m-0 mb-4">
            This tape isn&apos;t in the collection.
          </h1>
          <p className="text-[16px] leading-[1.7] text-[rgba(43,32,22,0.7)] max-w-[440px] mx-auto mb-9">
            The page you&apos;re looking for doesn&apos;t exist, or the link
            might be out of date.
          </p>
          <Link
            href="/"
            className="jr-btn inline-block font-[family-name:var(--font-lato)] font-semibold text-[15px] bg-[#bf4e2a] hover:bg-[#9c3d1f] text-[#fffaf0] py-[14px] px-7 rounded-[30px]"
          >
            Back to site
          </Link>
        </div>
      </div>
      <Footer prefixHome />
    </div>
  );
}
