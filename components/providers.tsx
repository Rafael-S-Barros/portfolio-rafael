"use client";

import { NextIntlClientProvider } from "next-intl";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";

import {
  defaultLocale,
  isLocale,
  LOCALE_STORAGE_KEY,
  messages,
  type Locale,
} from "@/lib/i18n";
import {
  LIGHT_SCHEME_QUERY,
  resolveTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

export type { Theme };

/**
 * What the server renders. The inline script in the layout has already painted
 * the real theme by the time this matters, and the client snapshot corrects the
 * React tree right after hydration.
 */
const defaultTheme: Theme = "dark";

/* ── localStorage as an external store ──────────────────────
   Both preferences live in localStorage, which React can read
   through useSyncExternalStore: the server snapshot keeps
   hydration stable, and the client snapshot takes over right
   after — no setState-in-effect, no flash.
   ───────────────────────────────────────────────────────── */

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  // `storage` fires when another tab changes the preference.
  window.addEventListener("storage", onStoreChange);
  // Follows the OS live, but only matters while no explicit choice is stored:
  // with one stored, `readTheme` ignores the query and the snapshot is stable.
  const lightScheme = window.matchMedia(LIGHT_SCHEME_QUERY);
  lightScheme.addEventListener("change", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
    lightScheme.removeEventListener("change", onStoreChange);
  };
}

function readTheme(): Theme {
  return resolveTheme(
    localStorage.getItem(THEME_STORAGE_KEY),
    window.matchMedia(LIGHT_SCHEME_QUERY).matches,
  );
}

function readLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  return isLocale(stored) ? stored : defaultLocale;
}

/* ── Contexts ───────────────────────────────────────────── */

type ThemeContextValue = { theme: Theme; toggleTheme: () => void };
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <Providers>");
  return ctx;
}

type LocaleContextValue = { locale: Locale; setLocale: (locale: Locale) => void };
const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <Providers>");
  return ctx;
}

/* ── Provider ───────────────────────────────────────────── */

export function Providers({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => defaultTheme);
  const locale = useSyncExternalStore(subscribe, readLocale, () => defaultLocale);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  const toggleTheme = useCallback(() => {
    localStorage.setItem(THEME_STORAGE_KEY, readTheme() === "dark" ? "light" : "dark");
    emit();
  }, []);

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
    emit();
  }, []);

  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      <LocaleContext value={{ locale, setLocale }}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages[locale]}
          timeZone="America/Sao_Paulo"
        >
          {children}
        </NextIntlClientProvider>
      </LocaleContext>
    </ThemeContext>
  );
}
