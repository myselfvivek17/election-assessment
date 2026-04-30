"use client";

import { useState } from "react";
import { useLang } from "@/lib/hooks/use-lang";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Search, User, ShieldAlert, GraduationCap, Banknote, ShieldCheck } from "lucide-react";
import candidates from "@/lib/data/candidates.json";

export default function CandidatesPage() {
  const { dict } = useLang();
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (search.trim()) setShowResults(true);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] max-w-md mx-auto bg-background shadow-xl border-x">
      <header className="flex items-center px-4 py-5 border-b bg-gradient-to-r from-primary to-primary/85 text-primary-foreground">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/15 shrink-0">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold ml-2 tracking-tight">{dict.candidatesTitle}</h1>
      </header>
      <main className="flex-1 p-6 overflow-y-auto space-y-10 pb-12">
        <section className="motion-safe:animate-in fade-in slide-in-from-bottom-3 duration-500">
          <h2 className="text-2xl font-bold mb-5 text-foreground">{dict.candidatesSubtitle}</h2>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 h-12 rounded-xl border px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary shadow-sm bg-card"
              placeholder={dict.candidatesPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} className="h-12 w-12 rounded-xl shrink-0" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {showResults && (
            <div className="mt-8 space-y-6 motion-safe:animate-in fade-in slide-in-from-bottom-2">
              <h3 className="text-lg font-bold text-foreground">{dict.candidatesResultTitle} — {search}</h3>
              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <div key={candidate.id} className="bg-card border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3 border-b pb-4 mb-4">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-foreground">{candidate.name}</h4>
                        <p className="text-sm text-muted-foreground">{candidate.party}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><GraduationCap className="h-3 w-3"/> {dict.education}</p>
                        <p className="font-bold text-sm text-foreground mt-0.5">{candidate.education}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Banknote className="h-3 w-3"/> {dict.assets}</p>
                        <p className="font-bold text-sm text-foreground mt-0.5">{candidate.assets}</p>
                      </div>
                      <div className="col-span-2 bg-muted/40 p-3 rounded-lg border flex items-center justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            {candidate.criminalCases > 0 ? <ShieldAlert className="h-3 w-3 text-destructive"/> : <ShieldCheck className="h-3 w-3 text-green-600"/>}
                            {dict.criminalCases}
                          </p>
                          <p className={`font-bold text-sm mt-0.5 ${candidate.criminalCases > 0 ? 'text-destructive' : 'text-green-600'}`}>
                            {candidate.criminalCases}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 text-xs font-bold" onClick={() => window.open(candidate.sourceUrl, '_blank')}>
                          {dict.viewAffidavit}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center text-muted-foreground mt-4">{dict.candidatesSource}: <a href="https://affidavit.eci.gov.in" target="_blank" rel="noreferrer" className="underline hover:text-foreground transition-colors">affidavit.eci.gov.in</a></p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
