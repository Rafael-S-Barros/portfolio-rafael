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
 * Skill chips. `icon` names a file under `public/icons/`.
 *
 * The SVGs are vendored from simple-icons (CC0) with the brand colour baked in,
 * rather than fetched from cdn.simpleicons.org at runtime: a corporate network
 * that blocks the CDN would otherwise render this whole section as bare labels.
 *
 * One mark per chip: the Stack band is dark in both themes, so there is no
 * light-theme variant to swap to.
 */
type ChipSpec = { label: string; icon: string };

const chipSpecs: ChipSpec[] = [
  { label: "React", icon: "react" },
  { label: "Git", icon: "git" },
  { label: "GitHub", icon: "github" },
  { label: "TypeScript", icon: "typescript" },
  { label: "JavaScript", icon: "javascript" },
  { label: "HTML5", icon: "html5" },
  { label: "CSS3", icon: "css" },
  { label: "Tailwind CSS", icon: "tailwindcss" },
  { label: "Python", icon: "python" },
  { label: "Claude Code", icon: "claude" },
];

export const stackChips = chipSpecs.map((chip) => ({
  label: chip.label,
  icon: `/icons/${chip.icon}.svg`,
}));
