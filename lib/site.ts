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
  resume: {
    href: "/Rafael_Curriculo_PT.pdf",
    fileName: "Rafael_Curriculo_PT.pdf",
  },
} as const;

/**
 * Skill chips. `dark`/`light` are simpleicons slugs with an explicit hex when a
 * brand mark needs a different colour per theme (GitHub's mark is the only one).
 */
type ChipSpec = { label: string; slug?: string; dark?: string; light?: string };

const chipSpecs: ChipSpec[] = [
  { label: "React", slug: "react/61DAFB" },
  { label: "Git", slug: "git/F05032" },
  { label: "GitHub", dark: "github/FFFFFF", light: "github/181717" },
  { label: "TypeScript", slug: "typescript/3178C6" },
  { label: "JavaScript", slug: "javascript/F7DF1E" },
  { label: "HTML5", slug: "html5/E34F26" },
  { label: "CSS3", slug: "css/663399" },
  { label: "Tailwind CSS", slug: "tailwindcss/06B6D4" },
  { label: "Python", slug: "python/3776AB" },
  { label: "Claude Code", slug: "claude/D97757" },
];

const iconBase = "https://cdn.simpleicons.org/";

export const stackChips = chipSpecs.map((chip) => ({
  label: chip.label,
  iconDark: iconBase + (chip.dark ?? chip.slug),
  iconLight: iconBase + (chip.light ?? chip.slug),
}));
