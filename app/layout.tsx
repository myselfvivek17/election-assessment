import type { Metadata, Viewport } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Election Sathi",
  description: "An interactive, voice-first, multilingual AI assistant for voter education in India.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#c47520",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
