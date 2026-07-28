import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import QuoteFlow from "./QuoteFlow";

export const metadata: Metadata = buildMetadata({
  title: "Get a free quote | JR Vintage Media",
  description:
    "Get a free quote to convert your VHS, VHS-C, S-VHS, Video8, Hi8, Digital8 or MiniDV tapes to digital files.",
  path: "/quote",
});

export default function QuotePage() {
  return <QuoteFlow />;
}
