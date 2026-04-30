"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Search, MapPin, Info } from "lucide-react";

export default function BoothFinderPage() {
  const [search, setSearch] = useState("");
  const [mockResult, setMockResult] = useState<string | null>(null);

  const handleSearch = () => {
    if (search.trim()) {
      setMockResult("Govt. Primary School, Sector 4 (Room 2)");
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] max-w-md mx-auto bg-background shadow-xl border-x">
      <header className="flex items-center p-4 border-b bg-primary text-primary-foreground">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80 shrink-0">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold ml-2">Find Polling Booth</h1>
      </header>
      <main className="flex-1 p-6 overflow-y-auto space-y-8 pb-12">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">Where do I vote?</h2>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 h-12 rounded-xl border px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              placeholder="Enter your locality or EPIC number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} className="h-12 w-12 rounded-xl shrink-0" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          
          {mockResult && (
            <div className="mt-6 p-5 bg-primary/10 border border-primary/20 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2">
              <MapPin className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Your Polling Booth</p>
                <p className="text-lg font-bold text-foreground mt-1">{mockResult}</p>
                <Button variant="link" className="px-0 mt-2 h-auto text-primary font-bold">Get Directions</Button>
              </div>
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold text-foreground">What to bring?</h2>
          </div>
          <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-r-xl mb-6 flex gap-3">
            <Info className="h-6 w-6 text-destructive shrink-0" />
            <p className="text-sm text-foreground font-medium leading-relaxed">
              <strong>Important:</strong> The voter slip alone is <span className="underline decoration-destructive decoration-2">NOT</span> a valid ID. You must bring one of the approved photo IDs below.
            </p>
          </div>

          <div className="bg-secondary/30 border rounded-2xl p-5">
             <h3 className="font-bold text-lg mb-4 text-foreground">12 Approved Photo IDs</h3>
             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
               <li className="bg-card border p-3 rounded-xl shadow-sm font-bold text-foreground">1. EPIC (Voter ID)</li>
               <li className="bg-card border p-3 rounded-xl shadow-sm font-bold text-foreground">2. Aadhaar Card</li>
               <li className="bg-card border p-3 rounded-xl shadow-sm font-bold text-foreground">3. PAN Card</li>
               <li className="bg-card border p-3 rounded-xl shadow-sm font-bold text-foreground">4. Driving License</li>
               <li className="bg-card border p-3 rounded-xl shadow-sm font-bold text-foreground">5. Indian Passport</li>
               <li className="bg-card border p-3 rounded-xl shadow-sm font-bold text-foreground">6. Passbook with Photo</li>
               <li className="bg-card border p-3 rounded-xl shadow-sm font-bold text-foreground">7. MNREGA Job Card</li>
               <li className="bg-card border p-3 rounded-xl shadow-sm font-bold text-foreground">8. Health Insurance Smart Card</li>
               <li className="bg-card border p-3 rounded-xl shadow-sm font-bold text-foreground">9. Pension Document</li>
               <li className="bg-card border p-3 rounded-xl shadow-sm font-bold text-foreground">10. Official ID (Govt)</li>
               <li className="bg-card border p-3 rounded-xl shadow-sm font-bold text-foreground">11. MP/MLA/MLC Official ID</li>
               <li className="bg-card border p-3 rounded-xl shadow-sm font-bold text-foreground">12. Unique Disability ID</li>
             </ul>
          </div>
        </section>
        
        <p className="text-xs text-center text-muted-foreground mt-4">Source: <a href="https://eci.gov.in" target="_blank" rel="noreferrer" className="underline hover:text-foreground">eci.gov.in</a></p>
      </main>
    </div>
  );
}
