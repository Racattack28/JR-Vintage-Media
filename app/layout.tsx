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

export const metadata: Metadata = {
  title: "JR Vintage Media | Tape-to-digital VHS transfer",
  description:
    "JR Vintage Media converts VHS, VHS-C, S-VHS, Video8, Hi8, Digital8 and MiniDV tapes to digital files. Local drop-off or mail-in, free tape cleaning and repair, simple per-tape pricing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${merriweather.variable} ${bitter.variable} ${barlowSemiCondensed.variable} ${lato.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
