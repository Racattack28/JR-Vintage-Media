import type { Metadata } from "next";

export const siteUrl = "https://jrvintagemedia.com";
const siteName = "JR Vintage Media";
const defaultImage = { url: "/hero-tapes.png", width: 2000, height: 1500 };

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [defaultImage],
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultImage.url],
    },
  };
}
