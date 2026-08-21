import type { Locale } from "./i18n";

/**
 * Dados centrais dos projetos — os componentes só leem daqui.
 *
 * `image` aponta para um arquivo em `public/`. Enquanto for `null`, o slot
 * renderiza o placeholder com o texto de `imageAlt`; basta soltar o screenshot
 * em `public/projects/<id>.png` e preencher o campo para a imagem aparecer.
 */
export type Project = {
  id: string;
  name: string;
  description: Record<Locale, string>;
  stack: string[];
  repo: string;
  demo?: string;
  urlLabel: string;
  image: string | null;
  imageAlt: Record<Locale, string>;
};

export const projects: Project[] = [
  {
    id: "fitmeta",
    name: "FitMeta",
    description: {
      pt: "Aplicação web de gerenciamento de treinos com autenticação, CRUD integrado ao banco e rotas protegidas.",
      en: "Workout management web app with user auth, database-backed CRUD and protected routes.",
    },
    stack: ["React", "TypeScript", "Supabase", "React Query"],
    repo: "https://github.com/guilhermerezende10/FitMeta",
    demo: "https://fitmeta.com.br",
    urlLabel: "fitmeta.com.br",
    image: null,
    imageAlt: {
      pt: "Screenshot do FitMeta — aplicação de gerenciamento de treinos",
      en: "FitMeta screenshot — workout management app",
    },
  },
  {
    id: "docgen",
    name: "Docgen",
    description: {
      pt: "Recebe código em mais de 10 linguagens, detecta a linguagem e gera documentação técnica rodando um LLM local via Ollama — sem nuvem nem chaves de API.",
      en: "Takes source code in 10+ languages, auto-detects the language and generates technical docs by running a local LLM via Ollama — no cloud, no API keys.",
    },
    stack: ["React", "TypeScript", "Ollama", "Vite"],
    repo: "https://github.com/guilhermerezende10/documentation-creator",
    urlLabel: "Docgen",
    image: null,
    imageAlt: {
      pt: "Screenshot do Docgen — gerador de documentação técnica",
      en: "Docgen screenshot — technical documentation generator",
    },
  },
];
