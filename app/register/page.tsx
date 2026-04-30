"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] max-w-md mx-auto bg-background shadow-xl border-x">
      <header className="flex items-center p-4 border-b bg-primary text-primary-foreground">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80 shrink-0">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold ml-2">Voter Registration</h1>
      </header>
      <main className="flex-1 p-6 overflow-y-auto space-y-8 pb-12">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">Am I eligible?</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg"><CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" /> Indian Citizen</li>
            <li className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg"><CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" /> 18 years or older</li>
            <li className="flex items-center gap-3 bg-muted/50 p-3 rounded-lg"><CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" /> Resident of the polling area</li>
          </ul>
        </section>
        
        <section className="p-5 bg-secondary/30 border rounded-2xl">
          <h2 className="text-xl font-bold mb-4 text-foreground">Form 6 Document Checklist</h2>
          <div className="space-y-4">
            <div className="bg-card p-4 rounded-xl shadow-sm border">
              <h3 className="font-bold text-foreground">1. Age Proof (Any one)</h3>
              <p className="text-sm text-muted-foreground mt-1">Birth Certificate, Aadhaar Card, PAN Card, Driving License, or 10th/12th Marksheet.</p>
            </div>
            <div className="bg-card p-4 rounded-xl shadow-sm border">
              <h3 className="font-bold text-foreground">2. Address Proof (Any one)</h3>
              <p className="text-sm text-muted-foreground mt-1">Water/Electricity Bill, Aadhaar Card, Passport, or Bank Passbook.</p>
            </div>
            <div className="bg-card p-4 rounded-xl shadow-sm border">
              <h3 className="font-bold text-foreground">3. Passport Size Photo</h3>
              <p className="text-sm text-muted-foreground mt-1">Recent, color photo with white background.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-foreground">How to apply?</h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border">
             {/* Step 1 */}
             <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">1</div>
                <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border shadow-sm bg-card">
                  <h3 className="font-bold text-foreground">Download Voter Helpline App</h3>
                  <p className="text-sm text-muted-foreground mt-1">Available on Google Play and App Store.</p>
                </div>
             </div>
             {/* Step 2 */}
             <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">2</div>
                <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border shadow-sm bg-card">
                  <h3 className="font-bold text-foreground">Fill Form 6</h3>
                  <p className="text-sm text-muted-foreground mt-1">Select &quot;Voter Registration&quot; then &quot;New Voter Registration (Form 6)&quot;.</p>
                </div>
             </div>
             {/* Step 3 */}
             <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">3</div>
                <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border shadow-sm bg-card">
                  <h3 className="font-bold text-foreground">Upload Documents</h3>
                  <p className="text-sm text-muted-foreground mt-1">Upload clear photos of your age and address proofs.</p>
                </div>
             </div>
          </div>
        </section>

        <section className="text-center pt-4">
           <Button className="w-full h-14 text-lg rounded-full font-bold shadow-md" onClick={() => window.open('https://voters.eci.gov.in', '_blank')}>
             Visit ECI Portal
           </Button>
           <p className="text-xs text-muted-foreground mt-3">Source: <a href="https://voters.eci.gov.in" target="_blank" rel="noreferrer" className="underline hover:text-foreground">voters.eci.gov.in</a></p>
        </section>
      </main>
    </div>
  );
}
