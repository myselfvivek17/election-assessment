"use client";
import { useState, useEffect } from "react";
import { getDictionary, Language } from "@/lib/i18n";

export function useLang() {
  const [lang, setLangState] = useState<Language>("hi");

  useEffect(() => {
    const saved = localStorage.getItem("es_lang") as Language | null;
    if (saved) setLangState(saved);
  }, []);

  const setLang = (l: Language) => {
    localStorage.setItem("es_lang", l);
    setLangState(l);
  };

  const dict = getDictionary(lang);
  return { lang, setLang, dict };
}
