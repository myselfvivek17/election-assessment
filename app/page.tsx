"use client";

import { useState, useEffect, useRef } from "react";
import { getDictionary } from "@/lib/i18n";
import { useLang } from "@/lib/hooks/use-lang";
import { getSpeechService } from "@/lib/channels/speech";
import { generateChatResponse } from "@/lib/ai/gemini";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Mic, MicOff, Send, Volume2, VolumeX, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { lang, setLang, dict } = useLang();
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(() => [
    { role: "model", text: getDictionary("hi").welcome }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const speechService = getSpeechService();

  useEffect(() => {
    speechService.setLang(lang);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages(prev => {
      if (prev.length === 1 && prev[0].role === 'model') {
        return [{ role: 'model', text: dict.welcome }];
      }
      return prev;
    });
  }, [lang, speechService, dict.welcome]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleLanguage = () => {
    setLang(lang === "hi" ? "en" : "hi");
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    
    setInput("");
    const newMessages = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setIsLoading(true);

    const historyMessages = messages[0]?.role === 'model' ? messages.slice(1) : messages;
    
    const history = historyMessages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await generateChatResponse(text, history, lang);

    setMessages(current => [...current, { role: "model", text: responseText }]);
    
    if (isVoiceOutputEnabled) {
      const cleanTextForSpeech = responseText.replace(/[*#_`]/g, '');
      speechService.speak(cleanTextForSpeech, lang);
    }
    setIsLoading(false);
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

  const isWelcomeOnly = messages.length === 1 && messages[0].role === 'model';

  return (
    <div className="flex flex-col h-[100dvh] max-w-md mx-auto bg-background border-x shadow-xl">
      <header className="flex justify-between items-center px-4 py-5 border-b bg-gradient-to-r from-primary to-primary/85 text-primary-foreground">
        <h1 className="text-xl font-bold tracking-tight">Election Sathi</h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsVoiceOutputEnabled(!isVoiceOutputEnabled)} aria-label="Toggle Voice Output" className="text-primary-foreground hover:bg-primary-foreground/15">
            {isVoiceOutputEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleLanguage} aria-label="Toggle Language" className="text-primary-foreground hover:bg-primary-foreground/15 flex gap-1">
            <Globe className="h-4 w-4" />
            <span className="font-semibold">{lang === 'hi' ? 'EN' : 'हि'}</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {/* Welcome hero (only visible before first user message) */}
        {isWelcomeOnly && (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8 motion-safe:animate-in fade-in duration-500">
            <div className="text-6xl mb-5">🗳️</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{dict.welcome}</h2>
            <p className="text-muted-foreground text-base max-w-[280px] leading-relaxed">
              {lang === 'hi' ? 'वोटिंग, रजिस्ट्रेशन, या चुनाव के बारे में कुछ भी पूछें।' : 'Ask me anything about voting, registration, or elections.'}
            </p>
          </div>
        )}

        {/* Chat messages (hidden during welcome-only state) */}
        {!isWelcomeOnly && messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} motion-safe:animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`p-4 rounded-2xl max-w-[85%] text-base shadow-sm ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted text-foreground rounded-tl-sm'}`}>
              <ReactMarkdown
                components={{
                  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc ml-5 mb-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal ml-5 mb-2">{children}</ol>,
                  li: ({ children }) => <li className="mb-1">{children}</li>,
                  a: ({ href, children }) => <a href={href} className="underline" target="_blank" rel="noreferrer">{children}</a>,
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex justify-start motion-safe:animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="px-5 py-4 rounded-2xl bg-muted text-foreground rounded-tl-sm flex gap-1.5 items-center">
              <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground"></span>
              <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground"></span>
              <span className="typing-dot w-2 h-2 rounded-full bg-muted-foreground"></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Quick-action chips */}
      <div className="px-4 py-3 border-t bg-background/80 backdrop-blur-sm flex gap-2 overflow-x-auto hide-scrollbar">
        <Link href="/register"><Button variant="secondary" size="sm" className="rounded-full whitespace-nowrap shadow-sm font-semibold text-secondary-foreground hover:bg-secondary/70 transition-colors">📝 {dict.registration}</Button></Link>
        <Link href="/booth"><Button variant="secondary" size="sm" className="rounded-full whitespace-nowrap shadow-sm font-semibold text-secondary-foreground hover:bg-secondary/70 transition-colors">📍 {dict.findBooth}</Button></Link>
        <Link href="/candidates"><Button variant="secondary" size="sm" className="rounded-full whitespace-nowrap shadow-sm font-semibold text-secondary-foreground hover:bg-secondary/70 transition-colors">👤 {dict.candidates}</Button></Link>
        <Link href="/poll-day"><Button variant="secondary" size="sm" className="rounded-full whitespace-nowrap shadow-sm font-semibold text-secondary-foreground hover:bg-secondary/70 transition-colors">🗓️ {dict.pollDay}</Button></Link>
        <Link href="/myths"><Button variant="secondary" size="sm" className="rounded-full whitespace-nowrap shadow-sm font-semibold text-secondary-foreground hover:bg-secondary/70 transition-colors">💡 {dict.myths}</Button></Link>
      </div>

      {/* Input bar */}
      <footer className="p-4 border-t bg-background">
        <div className="flex gap-3 items-center">
          <Button
            variant={isListening ? "destructive" : "secondary"}
            size="icon"
            onClick={toggleListening}
            className={`rounded-full h-14 w-14 shrink-0 shadow-md transition-all duration-200 ${isListening ? 'animate-pulse scale-105' : 'hover:scale-105'}`}
            aria-label={dict.tapToSpeak}
          >
            {isListening ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
          </Button>
          <input
            type="text"
            className="flex-1 h-14 rounded-full border px-5 text-base focus:outline-none focus:ring-2 focus:ring-primary shadow-sm bg-card"
            placeholder={isListening ? dict.listening : dict.askMe}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isListening}
          />
          <Button
            onClick={() => handleSend()}
            size="icon"
            className="rounded-full h-14 w-14 shrink-0 shadow-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
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
