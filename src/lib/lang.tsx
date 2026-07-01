"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Bi, Locale } from "@/lib/content";

interface LangContextValue {
  lang: Locale;
  toggle: () => void;
  /** Pick the string for the current locale. */
  t: (v: Bi) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Locale>("zh");

  // Keep <html lang> in sync for a11y / SEO.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(
    () => setLang((l) => (l === "zh" ? "en" : "zh")),
    [],
  );

  const t = useCallback((v: Bi) => v[lang], [lang]);

  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within <LangProvider>");
  return ctx;
}
