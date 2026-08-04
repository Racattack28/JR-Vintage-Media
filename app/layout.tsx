import type { Metadata } from "next";
import { Merriweather, Bitter, Barlow_Semi_Condensed, Lato } from "next/font/google";
import { buildMetadata, siteUrl } from "@/lib/seo";
import { formatData, formatSlugs, reviewData, googleBusinessUrl } from "@/lib/data";
import "./globals.css";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const barlowSemiCondensed = Barlow_Semi_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const description =
  "JR Vintage Media converts VHS, VHS-C, S-VHS, Video8, Hi8, Digital8 and MiniDV tapes to digital files. Local drop-off in Mooloolaba, Sunshine Coast, or mail-in from anywhere in Australia. Free tape cleaning and repair, simple per-tape pricing.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...buildMetadata({
    title: "JR Vintage Media | VHS to Digital Conversion, Sunshine Coast",
    description,
    path: "/",
  }),
};

const averageRating =
  reviewData.reduce((sum, review) => sum + review.rating, 0) / reviewData.length;

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "JR Vintage Media",
  image: `${siteUrl}/logo.png`,
  url: siteUrl,
  telephone: "+61481198213",
  email: "jackrac@jrvintagemedia.com",
  founder: {
    "@type": "Person",
    name: "Jack Racovalis",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mooloolaba",
    addressRegion: "QLD",
    addressCountry: "AU",
  },
  areaServed: [
    { "@type": "City", name: "Mooloolaba" },
    { "@type": "AdministrativeArea", name: "Sunshine Coast" },
    { "@type": "Country", name: "Australia" },
  ],
  ...(googleBusinessUrl ? { sameAs: [googleBusinessUrl] } : {}),
  ...(reviewData.length > 0
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: averageRating.toFixed(1),
          reviewCount: reviewData.length,
        },
      }
    : {}),
  priceRange: "$$",
  description,
  makesOffer: formatSlugs.map((slug) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: `${formatData[slug].title} to digital conversion`,
      description: formatData[slug].description,
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${merriweather.variable} ${bitter.variable} ${barlowSemiCondensed.variable} ${lato.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
