import en from "@/messages/en.json";
import pt from "@/messages/pt.json";

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

/** Both dictionaries ship to the client: the language toggle is instant and URL-less. */
export const messages: Record<Locale, typeof pt> = { pt, en };

export const LOCALE_STORAGE_KEY = "rb-lang";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
