import type { Metadata } from "next";
import QuoteFlow from "./QuoteFlow";

export const metadata: Metadata = {
  title: "Get a free quote | JR Vintage Media",
  description:
    "Get a free quote to convert your VHS, VHS-C, S-VHS, Video8, Hi8, Digital8 or MiniDV tapes to digital files.",
};

export default function QuotePage() {
  return <QuoteFlow />;
}
