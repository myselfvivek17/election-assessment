"use client";

import { useState } from "react";
import { useLang } from "@/lib/hooks/use-lang";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Search, MapPin } from "lucide-react";

const ids = {
  en: [
    "EPIC (Voter ID Card)", "Aadhaar Card", "Passport", "Driving Licence",
    "PAN Card (with photo)", "Smart Card (RSBY)", "MNREGA Job Card",
    "Bank / Post Office Passbook (with photo)", "Health Insurance Smart Card",
    "Pension Documents (with photo)", "NPR Smart Card", "Official Identity Card issued by Central / State Govt."
  ],
  hi: [
    "EPIC (मतदाता पहचान पत्र)", "आधार कार्ड", "पासपोर्ट", "ड्राइविंग लाइसेंस",
    "PAN कार्ड (फोटो सहित)", "स्मार्ट कार्ड (RSBY)", "MNREGA जॉब कार्ड",
    "बैंक / डाकघर पासबुक (फोटो सहित)", "स्वास्थ्य बीमा स्मार्ट कार्ड",
    "पेंशन दस्तावेज़ (फोटो सहित)", "NPR स्मार्ट कार्ड", "केंद्र / राज्य सरकार द्वारा जारी आधिकारिक पहचान पत्र"
  ]
};

const mockResultData = {
  en: { name: "Model Primary School, Main Road, Delhi — 110001", officers: "Presiding Officer: Mr. Sharma" },
  hi: { name: "मॉडल प्राथमिक विद्यालय, मेन रोड, दिल्ली — 110001", officers: "पीठासीन अधिकारी: श्री शर्मा" },
};

export default function BoothPage() {
  const { lang, dict } = useLang();
  const [query, setQuery] = useState("");
  const [mockResult, setMockResult] = useState(false);
  const photoIds = lang === 'hi' ? ids.hi : ids.en;
  const mockBooth = lang === 'hi' ? mockResultData.hi : mockResultData.en;

  return (
    <div className="flex flex-col min-h-[100dvh] max-w-md mx-auto bg-background shadow-xl border-x">
      <header className="flex items-center px-4 py-5 border-b bg-gradient-to-r from-primary to-primary/85 text-primary-foreground">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/15 shrink-0">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold ml-2 tracking-tight">{dict.boothTitle}</h1>
      </header>
      <main className="flex-1 p-6 overflow-y-auto space-y-10 pb-12">
        <section className="motion-safe:animate-in fade-in slide-in-from-bottom-3 duration-500">
          <h2 className="text-2xl font-bold mb-5 text-foreground">{dict.boothSubtitle}</h2>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 h-12 rounded-xl border px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary shadow-sm bg-card"
              placeholder={dict.boothPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && query.trim() && setMockResult(true)}
            />
            <Button className="h-12 w-12 rounded-xl shrink-0" size="icon" onClick={() => query.trim() && setMockResult(true)}>
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {mockResult && (
            <div className="mt-6 p-5 bg-primary/10 border border-primary/20 rounded-2xl flex items-start gap-3 motion-safe:animate-in fade-in slide-in-from-bottom-2">
              <MapPin className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider">{dict.boothYourBooth}</p>
                <p className="font-bold text-foreground mt-1">{mockBooth.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{mockBooth.officers}</p>
              </div>
            </div>
          )}
        </section>

        <section className="motion-safe:animate-in fade-in slide-in-from-bottom-3 duration-500 delay-100">
          <h3 className="text-lg font-bold text-foreground mb-4">{dict.boothIdsTitle}</h3>
          <div className="space-y-2.5">
            {photoIds.map((id, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3.5 bg-muted/50 rounded-xl border hover:bg-muted/80 transition-colors">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0">{idx + 1}</div>
                <p className="text-sm font-medium text-foreground">{id}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
