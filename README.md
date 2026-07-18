# nscharrenberg.nl

Personal portfolio site of Noah Scharrenberg — AI/ML Engineer, Software Engineer. Nuxt 4 (Vue 3),
statically generated, styled as a terminal/CRT/glitch aesthetic.

## Stack

- **Nuxt 4** (Vue 3, Composition API, `<script setup>`) — statically generated (`nuxi generate`),
  no server needed in production.
- **TypeScript**, strict.
- **@nuxt/content** for the `/writing` section — Markdown files in `content/writing/`.
- **@nuxtjs/sitemap** / **@nuxtjs/robots** — generate `sitemap.xml` / `robots.txt` from the site's
  actual routes instead of hand-maintaining them.
- **@vueuse/nuxt** — `useMediaQuery` for `prefers-reduced-motion`.
- Plain CSS custom properties for theming (`app/assets/css/tokens.css`) — no CSS framework; the
  design surface is small enough that a token file covers it.
- **Vitest** + **@vue/test-utils** for unit/component tests, **ESLint** (`@nuxt/eslint`) for
  linting, `nuxt typecheck` (vue-tsc) for type checking.

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Other scripts:

```bash
pnpm lint        # eslint .
pnpm typecheck   # nuxt typecheck
pnpm test        # vitest run
pnpm generate    # static build → .output/public
pnpm preview     # serve the last `generate` output locally
```

## Project structure

```
app/
├── components/
│   ├── fx/          GlitchText, CrtOverlay, TypewriterText — the terminal/glitch effects
│   ├── ui/           SocialLink, MicroStatus, TerminalWindow, SectionHeading, CommandNav
│   ├── portfolio/    ProjectCard, TimelineItem
│   └── icons/        Inline SVG icon components
├── composables/       useTypewriter, usePrefersReducedMotion
├── data/              projects.ts, experience.ts, about.ts — TODO: replace placeholder content
├── layouts/           default.vue (nav + CRT overlay + status bar shell)
├── pages/             index, about, projects, experience, writing/
├── error.vue          404 / error page
└── assets/css/        tokens.css (design tokens), reset.css, main.css
content/writing/       Markdown posts for the Writing section
```

Component names are flat (`<GlitchText>`, not `<FxGlitchText>`) via the `components` option in
`nuxt.config.ts` — files are organized into subfolders for maintainability, but every filename is
unique across the project so there's no need for Nuxt's folder-prefixed naming.

## Editing content

Nothing below is wired to a CMS — it's plain TypeScript/Markdown, edited directly:

- **About** — `app/data/about.ts`
- **Projects** — `app/data/projects.ts`
- **Experience** — `app/data/experience.ts`
- **Writing** — add/remove `.md` files in `content/writing/`; each needs `title`, `description`,
  and `date` front matter (see `content/writing/hello-world.md`)

## Theming

Every color, spacing, radius, and motion-duration value used across components is a CSS custom
property defined once in `app/assets/css/tokens.css`. The site is dark-only by design (a CRT
aesthetic doesn't have a light-mode equivalent) — adjusting the palette, or adding an alternate
accent theme, means editing that one file rather than hunting through components.

## Deployment

`pnpm generate` produces a fully static site in `.output/public/` — deployable to any static host
(Cloudflare Pages, Netlify, GitHub Pages, Codeberg Pages, etc.). There's no Node server to run in
production.
