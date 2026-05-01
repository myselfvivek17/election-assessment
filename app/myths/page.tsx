"use client";

import { useLang } from "@/lib/context/lang-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText } from "lucide-react";

const mythsData = {
  en: [
    {
      myth: "I can vote online from my phone.",
      fact: "No. India does not allow online voting. You must physically visit the polling station or apply for postal ballot if eligible."
    },
    {
      myth: "I can use my Voter Slip as an ID to vote.",
      fact: "No. The Voter Slip is only for information. You must carry your EPIC (Voter ID) or one of the 11 other approved photo IDs."
    },
    {
      myth: "EVMs can be hacked via Bluetooth or Wi-Fi.",
      fact: "EVMs are standalone machines with no network connectivity (no radio frequency, no Bluetooth, no Wi-Fi). They cannot be hacked wirelessly."
    }
  ],
  hi: [
    {
      myth: "मैं अपने फोन से ऑनलाइन वोट कर सकता/सकती हूँ।",
      fact: "नहीं। भारत में ऑनलाइन मतदान की अनुमति नहीं है। आपको मतदान केंद्र पर जाना होगा या पात्र होने पर डाक मतपत्र के लिए आवेदन करना होगा।"
    },
    {
      myth: "मैं मतदान के लिए अपनी वोटर स्लिप को ID के रूप में उपयोग कर सकता/सकती हूँ।",
      fact: "नहीं। वोटर स्लिप केवल जानकारी के लिए है। आपको अपना EPIC (वोटर ID) या 11 अन्य स्वीकृत फोटो ID में से एक ले जाना होगा।"
    },
    {
      myth: "EVM को ब्लूटूथ या Wi-Fi के ज़रिए हैक किया जा सकता है।",
      fact: "EVM स्टैंडअलोन मशीनें हैं जिनमें कोई नेटवर्क कनेक्टिविटी नहीं है (न रेडियो फ्रीक्वेंसी, न ब्लूटूथ, न Wi-Fi)। इन्हें वायरलेस तरीके से हैक नहीं किया जा सकता।"
    }
  ]
};

export default function MythsPage() {
  const { lang, dict } = useLang();
  const myths = lang === 'hi' ? mythsData.hi : mythsData.en;

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <header className="flex items-center px-4 md:px-8 py-5 border-b bg-gradient-to-r from-primary to-primary/85 text-primary-foreground">
        <Link href="/" className="md:hidden">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/15 shrink-0">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold ml-2 md:ml-0 tracking-tight">{dict.mythsTitle}</h1>
      </header>
      <main className="flex-1 p-6 md:p-10 overflow-y-auto pb-20 md:pb-12">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {myths.map((item, idx) => (
            <div key={idx} className="bg-card border rounded-2xl p-5 shadow-sm space-y-4 hover:shadow-md transition-shadow motion-safe:animate-in fade-in slide-in-from-bottom-3 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="bg-destructive/10 p-3.5 rounded-xl flex gap-3 items-start">
                <FileText className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-destructive uppercase tracking-wider mb-1">{dict.myth}</p>
                  <p className="text-foreground font-bold text-sm">{item.myth}</p>
                </div>
              </div>
              <div className="bg-green-600/10 p-3.5 rounded-xl flex gap-3 items-start">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">{dict.fact}</p>
                  <p className="text-foreground font-medium text-sm leading-relaxed">{item.fact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
