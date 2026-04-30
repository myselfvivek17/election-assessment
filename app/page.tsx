"use client";

import { useState, useEffect, useRef } from "react";
import { getDictionary, Language } from "@/lib/i18n";
import { getSpeechService } from "@/lib/channels/speech";
import { generateChatResponse } from "@/lib/ai/gemini";
import { Mic, MicOff, Send, Volume2, VolumeX, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [lang, setLang] = useState<Language>("hi");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const dict = getDictionary(lang);
  const speechService = getSpeechService();

  useEffect(() => {
    speechService.setLang(lang);
    if (messages.length === 0) {
      setMessages([{ role: "model", text: dict.welcome }]);
      if (isVoiceOutputEnabled) {
        // give it a tiny delay for voice synthesis to be ready on load
        setTimeout(() => speechService.speak(dict.welcome, lang), 500);
      }
    }
  }, [lang]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "hi" ? "en" : "hi"));
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    
    setInput("");
    const newMessages = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await generateChatResponse(text, history, lang);
    setMessages((prev) => [...prev, { role: "model", text: responseText }]);
    setIsLoading(false);

    if (isVoiceOutputEnabled) {
      speechService.speak(responseText, lang);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
    } else {
      speechService.startListening(
        (text) => {
          setInput(text);
          handleSend(text);
          setIsListening(false);
        },
        (err) => {
          console.error(err);
          setIsListening(false);
        },
        () => setIsListening(false)
      );
      setIsListening(true);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] max-w-md mx-auto bg-background border-x shadow-xl">
      <header className="flex justify-between items-center p-4 border-b bg-primary text-primary-foreground">
        <h1 className="text-xl font-bold">Election Sathi</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsVoiceOutputEnabled(!isVoiceOutputEnabled)} aria-label="Toggle Voice Output" className="text-primary-foreground hover:bg-primary/80">
            {isVoiceOutputEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleLanguage} aria-label="Toggle Language" className="text-primary-foreground hover:bg-primary/80 flex gap-1">
            <Globe className="h-4 w-4" />
            <span>{lang === 'hi' ? 'EN' : 'HI'}</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`p-4 rounded-2xl max-w-[85%] text-base shadow-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted text-foreground rounded-tl-sm'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-4 rounded-2xl bg-muted text-foreground rounded-tl-sm animate-pulse">
              ...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      <footer className="p-4 border-t bg-background">
        <div className="flex gap-3 items-center">
          <Button
            variant={isListening ? "destructive" : "secondary"}
            size="icon"
            onClick={toggleListening}
            className={`rounded-full h-14 w-14 shrink-0 shadow-md transition-all ${isListening ? 'animate-pulse scale-105' : 'hover:scale-105'}`}
            aria-label={dict.tapToSpeak}
          >
            {isListening ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
          </Button>
          <input
            type="text"
            className="flex-1 h-14 rounded-full border px-5 text-base focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            placeholder={isListening ? dict.listening : dict.askMe}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isListening}
          />
          <Button
            onClick={() => handleSend()}
            size="icon"
            className="rounded-full h-14 w-14 shrink-0 shadow-md bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={!input.trim() || isListening}
            aria-label="Send Message"
          >
            <Send className="h-6 w-6" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
