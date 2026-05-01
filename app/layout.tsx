import type { Metadata, Viewport } from "next";
import { Noto_Sans } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import { LangProvider } from "@/lib/context/lang-context";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Election Sathi - Your AI Voting Assistant",
  description: "Get verified election information and register to vote with AI assistance.",
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
    >
      <body className={`${notoSans.variable} font-sans antialiased bg-muted/30`}>
        <LangProvider>
          <AppShell>{children}</AppShell>
        </LangProvider>
      </body>
    </html>
  );
}
