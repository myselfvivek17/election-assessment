"use client";

import { useState } from "react";
import { useLang } from "@/lib/hooks/use-lang";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Volume2, ArrowRight } from "lucide-react";
import { getSpeechService } from "@/lib/channels/speech";

const stepsData = {
  en: [
    { id: 1, title: "Enter Polling Station", desc: "Find your name on the voter list outside and join the queue." },
    { id: 2, title: "Polling Officer 1", desc: "Show your valid ID. The officer will verify your identity." },
    { id: 3, title: "Polling Officer 2", desc: "The officer will mark your finger with indelible ink, give you a slip, and take your signature." },
    { id: 4, title: "Polling Officer 3", desc: "Hand over the slip and let the officer check the ink on your finger." },
    { id: 5, title: "Proceed to Voting Compartment", desc: "Walk to the EVM (Electronic Voting Machine) kept in the voting compartment." },
    { id: 6, title: "Press the Button", desc: "Press the blue button on the EVM against the name/symbol of your candidate." },
    { id: 7, title: "Hear the Beep", desc: "A red light will glow and you will hear a loud beep sound." },
    { id: 8, title: "Check the VVPAT", desc: "Look at the VVPAT machine. A slip will appear for 7 seconds showing your candidate's serial number, name, and symbol." },
    { id: 9, title: "Exit", desc: "You have successfully voted! You can now safely exit the polling station." },
  ],
  hi: [
    { id: 1, title: "मतदान केंद्र में प्रवेश करें", desc: "बाहर मतदाता सूची में अपना नाम खोजें और कतार में लग जाएं।" },
    { id: 2, title: "मतदान अधिकारी 1", desc: "अपना वैध ID दिखाएं। अधिकारी आपकी पहचान सत्यापित करेगा।" },
    { id: 3, title: "मतदान अधिकारी 2", desc: "अधिकारी आपकी उंगली पर अमिट स्याही लगाएगा, एक पर्ची देगा और आपका हस्ताक्षर लेगा।" },
    { id: 4, title: "मतदान अधिकारी 3", desc: "पर्ची सौंपें और अधिकारी को अपनी उंगली पर स्याही जाँचने दें।" },
    { id: 5, title: "मतदान कक्ष में जाएं", desc: "मतदान कक्ष में रखी EVM (इलेक्ट्रॉनिक वोटिंग मशीन) के पास जाएं।" },
    { id: 6, title: "बटन दबाएं", desc: "EVM पर अपने उम्मीदवार के नाम/चिह्न के सामने नीला बटन दबाएं।" },
    { id: 7, title: "बीप की आवाज़ सुनें", desc: "लाल बत्ती जलेगी और आपको एक तेज़ बीप की आवाज़ सुनाई देगी।" },
    { id: 8, title: "VVPAT जाँचें", desc: "VVPAT मशीन देखें। 7 सेकंड के लिए एक पर्ची दिखेगी जिसमें आपके उम्मीदवार का क्रमांक, नाम और चिह्न होगा।" },
    { id: 9, title: "बाहर जाएं", desc: "आपने सफलतापूर्वक मतदान कर लिया! अब आप सुरक्षित रूप से मतदान केंद्र से बाहर जा सकते हैं।" },
  ]
};

export default function PollDayPage() {
  const { lang, dict } = useLang();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = lang === 'hi' ? stepsData.hi : stepsData.en;
  const step = steps[currentStep];

  const handleReadAloud = () => {
    const speech = getSpeechService();
    speech.speak(`${step.title}. ${step.desc}`, lang);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] max-w-md mx-auto bg-background shadow-xl border-x">
      <header className="flex items-center px-4 py-5 border-b bg-gradient-to-r from-primary to-primary/85 text-primary-foreground">
        <Link href="/">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/15 shrink-0">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold ml-2 tracking-tight">{dict.pollDayTitle}</h1>
      </header>
      <main className="flex-1 p-6 flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-background to-muted/50 pb-36">

        {/* Step counter + Read Aloud */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-sm font-bold text-muted-foreground">
          <span>{dict.pollDayStep} {currentStep + 1} {dict.pollDayOf} 9</span>
          <Button variant="outline" size="sm" onClick={handleReadAloud} className="rounded-full shadow-sm text-foreground border-border hover:bg-muted transition-colors">
            <Volume2 className="h-4 w-4 mr-2"/> {dict.readAloud}
          </Button>
        </div>

        {/* Segmented progress bar */}
        <div className="absolute top-16 left-6 right-6 flex gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i <= currentStep ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>

        {/* Step card */}
        <div className="w-full max-w-sm bg-card border rounded-3xl p-8 shadow-lg text-center min-h-[320px] flex flex-col justify-center motion-safe:animate-in zoom-in-95 duration-300" key={currentStep}>
           <div className="w-20 h-20 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-3xl mb-6">
             {step.id}
           </div>
           <h2 className="text-2xl font-bold text-foreground mb-4">{step.title}</h2>
           <p className="text-muted-foreground text-lg leading-relaxed">{step.desc}</p>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-8 left-6 right-6 flex gap-4">
           <Button variant="outline" className="flex-1 h-14 rounded-full font-bold text-base shadow-sm border-border text-foreground hover:bg-muted transition-colors" disabled={currentStep === 0} onClick={() => setCurrentStep(c => c - 1)}>
             {dict.back}
           </Button>
           <Button className="flex-1 h-14 rounded-full font-bold text-base shadow-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" disabled={currentStep === steps.length - 1} onClick={() => setCurrentStep(c => c + 1)}>
             {dict.next} <ArrowRight className="h-5 w-5 ml-2"/>
           </Button>
        </div>
      </main>
    </div>
  );
}
