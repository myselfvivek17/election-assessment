"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function MythsPage() {
  const myths = [
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
  ];

  return (
    <div className="flex flex-col min-h-[100dvh] max-w-md mx-auto bg-background shadow-xl border-x">
      <header className="flex items-center p-4 border-b bg-primary text-primary-foreground">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80 shrink-0">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold ml-2">Myth Buster</h1>
      </header>
      <main className="flex-1 p-6 overflow-y-auto space-y-6 pb-12">
         {myths.map((item, idx) => (
           <div key={idx} className="bg-card border rounded-2xl p-5 shadow-sm space-y-4">
             <div className="bg-destructive/10 p-3 rounded-xl flex gap-3 items-start">
               <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
               <div>
                 <p className="text-xs font-bold text-destructive uppercase tracking-wider mb-1">Myth</p>
                 <p className="text-foreground font-bold text-sm">{item.myth}</p>
               </div>
             </div>
             <div className="bg-green-600/10 p-3 rounded-xl flex gap-3 items-start">
               <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
               <div>
                 <p className="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Fact</p>
                 <p className="text-foreground font-medium text-sm leading-relaxed">{item.fact}</p>
               </div>
             </div>
           </div>
         ))}
      </main>
    </div>
  );
}
