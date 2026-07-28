import type { Metadata } from "next";
import Header from "@/components/Header";
import { partnerVerticals } from "@/lib/data";
import PartnerEnquiryForm from "./PartnerEnquiryForm";

export const metadata: Metadata = {
  title: "Partner enquiry | JR Vintage Media",
  description:
    "Get in touch to talk through how partnering with JR Vintage Media could work for your business.",
};

export default async function PartnerEnquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ vertical?: string }>;
}) {
  const { vertical: verticalSlug } = await searchParams;
  const matchedVertical = partnerVerticals.find((v) => v.slug === verticalSlug);

  return (
    <div className="min-h-screen bg-[#f5efe2] font-[family-name:var(--font-lato)] text-[#2b2016]">
      <Header variant="order" />
      <div className="max-w-[760px] mx-auto px-8 py-14 pb-[120px]">
        <PartnerEnquiryForm initialVertical={matchedVertical?.title ?? ""} />
      </div>
    </div>
  );
}
