# Portfólio — Rafael Barros

Site pessoal de página única, bilíngue PT/EN, com tema claro e escuro. Feito para
recrutadores técnicos e engenheiros de software, com o objetivo de conseguir
estágio em desenvolvimento front-end ou full stack.

Seções: hero, Sobre, Stack, Projetos, Trajetória e Contato.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Estilo | Tailwind CSS v4 + CSS próprio em `app/globals.css` |
| i18n | next-intl |
| Animação | motion |
| Linguagem | TypeScript |

O visual foi portado de um design feito no Claude Design. Os estilos ficam em
classes CSS com os valores exatos do design, não em utilitários do Tailwind —
as animações (cometas, timeline por scroll, reveals escalonados) dependem de
valores específicos demais para traduzir sem perda. O Tailwind está ativo e os
tokens de design vivem no bloco `@theme inline` do `globals.css`.

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em http://localhost:3000.

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build |
| `npm run lint` | ESLint (desde o Next 16, o `build` não roda o linter sozinho) |

## Onde mexer no conteúdo

Quase tudo que muda com frequência está fora dos componentes:

| Arquivo | Conteúdo |
|---|---|
| `lib/projects.ts` | Os projetos: nome, descrição por idioma, stack, links, screenshot |
| `messages/pt.json` / `messages/en.json` | Todo o texto da interface |
| `lib/site.ts` | Contato, currículos e os chips da seção Stack |
| `public/` | Currículos em PDF, imagens do hero, ícones da stack, logo |
| `app/icon.png` / `app/apple-icon.png` | Favicon e ícone de tela inicial |

### Adicionando um projeto

Basta um objeto novo em `lib/projects.ts`. O campo `image` aponta para um
arquivo em `public/`; enquanto for `null`, o slot mostra um placeholder com o
texto alternativo, então dá para subir o projeto antes de ter o screenshot.

### Traduções

`lib/i18n.ts` tipa `en.json` contra a forma do `pt.json`. Uma chave adicionada
só num dos idiomas **quebra o type check** — é proposital, evita texto faltando
em produção.

## Idioma fora da URL

O toggle PT/EN é instantâneo e não navega — escolha deliberada, herdada do
design. Em troca, o `lang` do HTML sai como `pt-BR` no servidor e só é corrigido
após a hidratação, e a versão em inglês não é indexável. É decisão, não bug.

## Convenções

- Branch a partir de `develop`, PR, merge. Nunca commit direto em `develop` ou `main`.
- Conventional commits, mensagens em português.
- Trabalho rastreado em issues; o PR referencia a issue que fecha.
