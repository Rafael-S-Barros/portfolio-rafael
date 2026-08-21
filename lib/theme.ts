export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "rb-theme";

/** Matches when the visitor's OS is set to light. */
export const LIGHT_SCHEME_QUERY = "(prefers-color-scheme: light)";

/**
 * The single rule for which theme to paint: an explicit choice always wins,
 * and the OS preference decides for anyone who has not chosen yet.
 *
 * Must stay self-contained — no imports, no closure over module scope — because
 * `themeInitScript` serialises this function to run before hydration.
 */
export function resolveTheme(stored: string | null, prefersLight: boolean): Theme {
  if (stored === "light" || stored === "dark") return stored;
  return prefersLight ? "light" : "dark";
}

/**
 * Runs in <head> before first paint so the page never flashes the wrong theme.
 *
 * It serialises `resolveTheme` rather than restating the rule, so the pre-paint
 * pass and React can never disagree about which theme to show.
 */
export const themeInitScript = `
try {
  var resolve = ${resolveTheme.toString()};
  var t = resolve(
    localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)}),
    window.matchMedia(${JSON.stringify(LIGHT_SCHEME_QUERY)}).matches
  );
  document.documentElement.setAttribute('data-theme', t);
} catch (e) {}
`;
