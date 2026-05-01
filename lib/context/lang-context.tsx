"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getDictionary, Language, Dictionary } from "@/lib/i18n";
import { logLanguageSwitch } from "@/lib/firebase/analytics";

type LangContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  dict: Dictionary;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("hi");

  useEffect(() => {
    const saved = localStorage.getItem("es_lang") as Language | null;
    if (saved) setLangState(saved);
    
    // Also listen for changes from other tabs/instances
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "es_lang" && e.newValue) {
        setLangState(e.newValue as Language);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Language) => {
    logLanguageSwitch(lang, l);
    localStorage.setItem("es_lang", l);
    setLangState(l);
  };

  const dict = getDictionary(lang);

  return (
    <LangContext.Provider value={{ lang, setLang, dict }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (context === undefined) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return context;
}
