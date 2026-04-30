"use client";

import { useLang } from "@/lib/hooks/use-lang";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react";

const eligibilityData = {
  en: [
    "Indian citizen",
    "18 years or older on the qualifying date",
    "Ordinarily resident in the constituency",
    "Name enrolled in the Electoral Roll",
  ],
  hi: [
    "भारतीय नागरिक हों",
    "अर्हता तिथि पर 18 वर्ष या उससे अधिक आयु के हों",
    "निर्वाचन क्षेत्र में सामान्यतः निवासी हों",
    "नाम मतदाता सूची में दर्ज हो",
  ],
};

const docsData = {
  en: [
    { label: "Age Proof", examples: "Birth Certificate, School Certificate, Passport" },
    { label: "Address Proof", examples: "Aadhaar, Utility Bill, Bank Passbook" },
    { label: "Recent Passport-size Photo", examples: "Plain white background" },
  ],
  hi: [
    { label: "आयु प्रमाण", examples: "जन्म प्रमाण पत्र, विद्यालय प्रमाण पत्र, पासपोर्ट" },
    { label: "पता प्रमाण", examples: "आधार, उपयोगिता बिल, बैंक पासबुक" },
    { label: "हालिया पासपोर्ट-साइज़ फोटो", examples: "सादी सफेद पृष्ठभूमि" },
  ],
};

const stepsData = {
  en: [
    { step: 1, text: "Visit the National Voters' Service Portal", url: "https://voters.eci.gov.in" },
    { step: 2, text: 'Select "Voter Registration" then "New Voter Registration (Form 6)".' },
    { step: 3, text: "Fill in your personal details, address, and upload documents." },
    { step: 4, text: "Submit and note your reference number for tracking." },
    { step: 5, text: "A Booth Level Officer (BLO) may visit to verify your address." },
  ],
  hi: [
    { step: 1, text: "राष्ट्रीय मतदाता सेवा पोर्टल पर जाएं", url: "https://voters.eci.gov.in" },
    { step: 2, text: '"वोटर रजिस्ट्रेशन" और फिर "नया मतदाता पंजीकरण (फॉर्म 6)" चुनें।' },
    { step: 3, text: "अपना व्यक्तिगत विवरण, पता दर्ज करें और दस्तावेज़ अपलोड करें।" },
    { step: 4, text: "सबमिट करें और ट्रैकिंग के लिए संदर्भ संख्या नोट करें।" },
    { step: 5, text: "एक बूथ स्तर अधिकारी (BLO) आपके पते की सत्यापन के लिए आ सकते हैं।" },
  ],
};

export default function RegisterPage() {
  const { lang, dict } = useLang();
  const eligibility = eligibilityData[lang === 'hi' ? 'hi' : 'en'];
  const docs = docsData[lang === 'hi' ? 'hi' : 'en'];
  const steps = stepsData[lang === 'hi' ? 'hi' : 'en'];

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <header className="flex items-center px-4 md:px-8 py-5 border-b bg-gradient-to-r from-primary to-primary/85 text-primary-foreground">
        <Link href="/" className="md:hidden">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/15 shrink-0">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold ml-2 md:ml-0 tracking-tight">{dict.registerTitle}</h1>
      </header>
      <main className="flex-1 p-6 md:p-10 overflow-y-auto pb-20 md:pb-12">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Eligibility */}
          <section className="motion-safe:animate-in fade-in slide-in-from-bottom-3 duration-500">
            <h2 className="text-2xl md:text-3xl font-bold mb-5 text-foreground">{dict.registerSubtitle}</h2>
            <h3 className="font-semibold text-foreground mb-3 text-base">{dict.eligibilityTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {eligibility.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3.5 bg-muted/50 rounded-xl border hover:bg-muted/80 transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  <p className="text-sm font-medium text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Documents */}
          <section className="motion-safe:animate-in fade-in slide-in-from-bottom-3 duration-500 delay-100">
            <h3 className="font-semibold text-foreground mb-3 text-base">{dict.docsTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {docs.map((doc, idx) => (
                <div key={idx} className="p-4 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <p className="font-bold text-foreground text-sm">{doc.label}</p>
                  <p className="text-xs text-muted-foreground mt-1.5">{doc.examples}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Steps */}
          <section className="motion-safe:animate-in fade-in slide-in-from-bottom-3 duration-500 delay-200">
            <h3 className="font-semibold text-foreground mb-5 text-base">{dict.stepsTitle}</h3>
            <div className="relative space-y-0 max-w-lg">
              {steps.map((s, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0 z-10">{s.step}</div>
                    {idx < steps.length - 1 && <div className="w-0.5 flex-1 bg-border mt-1 mb-1 min-h-[1.5rem]" />}
                  </div>
                  <div className="pb-5 pt-1.5 flex-1">
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noreferrer" className="font-bold text-primary flex items-center gap-1 text-sm underline underline-offset-2">
                        {s.text} <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    ) : (
                      <p className="text-sm text-foreground">{s.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
