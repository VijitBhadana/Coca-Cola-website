import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const anton = localFont({
  src: "./fonts/anton.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-anton",
  adjustFontFallback: false,
});

const archivo = localFont({
  src: "./fonts/archivo.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-archivo",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Coca-Cola — Five Cans, One Signature",
  description:
    "A scroll-driven brand story through five Coca-Cola cans: Original, Zero Sugar, Diet Coke, Cherry and Vanilla.",
};

export const viewport: Viewport = {
  themeColor: "#090c0e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
