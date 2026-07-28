import type { Metadata } from "next";
import { Merriweather, Bitter, Barlow_Semi_Condensed, Lato } from "next/font/google";
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

const siteUrl = "https://jrvintagemedia.com";
const title = "JR Vintage Media | Tape-to-digital VHS transfer";
const description =
  "JR Vintage Media converts VHS, VHS-C, S-VHS, Video8, Hi8, Digital8 and MiniDV tapes to digital files. Local drop-off or mail-in, free tape cleaning and repair, simple per-tape pricing.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "JR Vintage Media",
    images: [{ url: "/hero-tapes.png", width: 2000, height: 1500 }],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/hero-tapes.png"],
  },
};

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
  areaServed: "AU",
  priceRange: "$$",
  description,
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
