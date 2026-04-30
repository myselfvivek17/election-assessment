"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Volume2, ArrowRight } from "lucide-react";
import { getSpeechService } from "@/lib/channels/speech";

const steps = [
  { id: 1, title: "Enter Polling Station", desc: "Find your name on the voter list outside and join the queue." },
  { id: 2, title: "Polling Officer 1", desc: "Show your valid ID. The officer will verify your identity." },
  { id: 3, title: "Polling Officer 2", desc: "The officer will mark your finger with indelible ink, give you a slip, and take your signature." },
  { id: 4, title: "Polling Officer 3", desc: "Hand over the slip and let the officer check the ink on your finger." },
  { id: 5, title: "Proceed to Voting Compartment", desc: "Walk to the EVM (Electronic Voting Machine) kept in the voting compartment." },
  { id: 6, title: "Press the Button", desc: "Press the blue button on the EVM against the name/symbol of your candidate." },
  { id: 7, title: "Hear the Beep", desc: "A red light will glow and you will hear a loud beep sound." },
  { id: 8, title: "Check the VVPAT", desc: "Look at the VVPAT machine. A slip will appear for 7 seconds showing your candidate's serial number, name, and symbol." },
  { id: 9, title: "Exit", desc: "You have successfully voted! You can now safely exit the polling station." },
];

export default function PollDayPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];

  const handleReadAloud = () => {
    const speech = getSpeechService();
    speech.speak(`${step.title}. ${step.desc}`, 'en');
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
  };
  
  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(c => c - 1);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] max-w-md mx-auto bg-background shadow-xl border-x">
      <header className="flex items-center p-4 border-b bg-primary text-primary-foreground">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80 shrink-0">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold ml-2">Polling Day Guide</h1>
      </header>
      <main className="flex-1 p-6 flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-background to-muted/50 pb-32">
        
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-sm font-bold text-muted-foreground">
          <span>Step {currentStep + 1} of 9</span>
          <Button variant="outline" size="sm" onClick={handleReadAloud} className="rounded-full shadow-sm text-foreground border-border hover:bg-muted">
            <Volume2 className="h-4 w-4 mr-2"/> Read Aloud
          </Button>
        </div>

        <div className="w-full max-w-sm bg-card border rounded-3xl p-8 shadow-lg text-center min-h-[320px] flex flex-col justify-center motion-safe:animate-in zoom-in-95 duration-300" key={currentStep}>
           <div className="w-20 h-20 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-3xl mb-6">
             {step.id}
           </div>
           <h2 className="text-2xl font-bold text-foreground mb-4">{step.title}</h2>
           <p className="text-muted-foreground text-lg leading-relaxed">{step.desc}</p>
        </div>

        <div className="absolute bottom-8 left-6 right-6 flex gap-4">
           <Button variant="outline" className="flex-1 h-14 rounded-full font-bold text-base shadow-sm border-border text-foreground hover:bg-muted" disabled={currentStep === 0} onClick={prevStep}>
             Back
           </Button>
           <Button className="flex-1 h-14 rounded-full font-bold text-base shadow-md bg-primary text-primary-foreground hover:bg-primary/90" disabled={currentStep === steps.length - 1} onClick={nextStep}>
             Next <ArrowRight className="h-5 w-5 ml-2"/>
           </Button>
        </div>
      </main>
    </div>
  );
}
