import type { Locale } from "./i18n";

type ResumeFile = {
  /** Path under `public/` — case-sensitive once deployed. */
  href: string;
  /** What the browser saves it as, so it must read well in the target language. */
  fileName: string;
};

/**
 * One CV per locale. Typed as a full `Record`, so adding a locale to `lib/i18n`
 * fails the type check here until its CV exists — rather than silently handing
 * a visitor the wrong language.
 */
const resume: Record<Locale, ResumeFile> = {
  pt: {
    href: "/Rafael_Curriculo_PT.pdf",
    fileName: "Rafael_Curriculo_PT.pdf",
  },
  en: {
    href: "/Rafael_Resume_EN.pdf",
    fileName: "Rafael_Resume_EN.pdf",
  },
};

export const site = {
  name: "Rafael Barros",
  email: "rafaelbarros0511445@gmail.com",
  github: {
    url: "https://github.com/Rafael-S-Barros",
    label: "github.com/Rafael-S-Barros",
  },
  linkedin: {
    url: "https://linkedin.com/in/rafael-barros-67a24b3b0",
    label: "linkedin.com/in/rafael-barros-67a24b3b0",
  },
  resume,
} as const;

/**
 * Skill chips. `dark`/`light` name the file under `public/icons/` when a brand
 * mark needs a different variant per theme — GitHub's is the only one.
 *
 * The SVGs are vendored from simple-icons (CC0) with the brand colour baked in,
 * rather than fetched from cdn.simpleicons.org at runtime: a corporate network
 * that blocks the CDN would otherwise render this whole section as bare labels.
 */
type ChipSpec = { label: string; slug?: string; dark?: string; light?: string };

const chipSpecs: ChipSpec[] = [
  { label: "React", slug: "react" },
  { label: "Git", slug: "git" },
  { label: "GitHub", dark: "github-dark", light: "github-light" },
  { label: "TypeScript", slug: "typescript" },
  { label: "JavaScript", slug: "javascript" },
  { label: "HTML5", slug: "html5" },
  { label: "CSS3", slug: "css" },
  { label: "Tailwind CSS", slug: "tailwindcss" },
  { label: "Python", slug: "python" },
  { label: "Claude Code", slug: "claude" },
];

const iconBase = "/icons/";

export const stackChips = chipSpecs.map((chip) => ({
  label: chip.label,
  iconDark: `${iconBase}${chip.dark ?? chip.slug}.svg`,
  iconLight: `${iconBase}${chip.light ?? chip.slug}.svg`,
}));
