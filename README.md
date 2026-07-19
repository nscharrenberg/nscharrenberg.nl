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
- **@vueuse/core** / **@vueuse/nuxt** — `useMediaQuery`, `useIntersectionObserver`, etc.
- Plain CSS custom properties for theming (`app/assets/css/tokens.css`) — no CSS framework; the
  design surface is small enough that a token file covers it.
- **Vitest** + **@vue/test-utils** for unit/component tests, **ESLint** (`@nuxt/eslint`) for
  linting, `nuxt typecheck` (vue-tsc) for type checking, **Histoire** for the component catalog
  (see [Design system](#design-system)).

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Other scripts:

```bash
pnpm lint            # eslint .
pnpm typecheck       # nuxt typecheck
pnpm test            # vitest run
pnpm generate        # static build → .output/public
pnpm preview         # serve the last `generate` output locally
pnpm story:dev       # component catalog → http://localhost:6006
pnpm story:build     # static component catalog → .histoire/dist
pnpm story:preview   # serve the last `story:build` output locally
```

## Project structure

```
app/
├── components/
│   ├── primitives/  Generic, reusable, data-free UI: SectionHeading, TerminalWindow,
│   │                CommandLine, SocialLink, EmailLink — the design-system tier
│   ├── fx/          Motion/effect primitives: GlitchText, DecryptText, TypewriterText,
│   │                Reveal, BootSequence, AmbientGlyphs, CrtOverlay
│   ├── layout/       App-shell singletons, not meant for reuse: CommandNav, CommandPalette,
│   │                 SiteFooter, MicroStatus
│   ├── portfolio/    Domain composites bound to this site's content types: CaseFile,
│   │                 CaseGallery, TimelineItem
│   └── icons/        Inline SVG icon components (`size` prop, default 24px)
├── composables/      useTypewriter, usePrefersReducedMotion, useCommandPalette
├── data/             projects.ts, experience.ts, education.ts, about.ts, contact.ts
├── types/            Shared type definitions (Project, TimelineEntry) used by both
│                     data files and the components that render them
├── layouts/          default.vue (nav + CRT overlay + status bar shell)
├── pages/            index, about, projects/, experience, resume, colophon, writing/
├── error.vue         404 / error page
└── assets/css/       tokens.css (design tokens), reset.css, main.css
content/writing/      Markdown posts for the Writing section
tests/unit/           Vitest + @vue/test-utils component/composable tests
histoire.config.ts    Component catalog configuration
histoire.setup.ts     Global CSS + Nuxt-runtime stubs (e.g. NuxtLink) for the catalog
```

Component names are flat (`<GlitchText>`, not `<FxGlitchText>`) via the `components` option in
`nuxt.config.ts` — files are organized into subfolders for maintainability, but every filename is
unique across the project so there's no need for Nuxt's folder-prefixed naming.

## Design system

`app/components/primitives/` and `app/components/fx/` are written to be portable outside this
specific site — they don't rely on Nuxt's implicit auto-imports (auto-registered components, or
`ref`/`computed`/composables resolved by magic). Every cross-component reference and Vue API they
use is an explicit `import`, the same way it would need to be if this tier were ever extracted into
its own package. `layout/` and `portfolio/` are the opposite: app-shell singletons and
content-bound composites that are intentionally *not* meant to be reused elsewhere, so they keep
using Nuxt's normal auto-imports.

Browse and develop those reusable components in isolation with [Histoire](https://histoire.dev):

```bash
pnpm story:dev
```

Each primitive/fx component has a co-located `ComponentName.story.vue` file with one `<Variant>`
per meaningful prop combination. Histoire auto-generates a live "Controls" panel and source-code
snippet from the component's props, alongside the story's own preset variants.

Adding a new component to the catalog:

1. Build the component under `primitives/` or `fx/` using explicit imports only (no reliance on
   Nuxt auto-import) — check an existing file like `SectionHeading.vue` for the pattern.
2. Add JSDoc comments on each prop — they show up in Histoire's generated docs.
3. Add a `ComponentName.story.vue` next to it with one or more `<Variant>` blocks.
4. Add a `tests/unit/ComponentName.test.ts` covering its rendered output.

## Editing content

Nothing below is wired to a CMS — it's plain TypeScript/Markdown, edited directly:

- **About** — `app/data/about.ts`
- **Projects** — `app/data/projects.ts`
- **Experience / Education** — `app/data/experience.ts`, `app/data/education.ts`
- **Contact** — `app/data/contact.ts`
- **Writing** — add/remove `.md` files in `content/writing/`; each needs `title`, `description`,
  and `date` front matter

## Theming

Every color, spacing, radius, and motion-duration value used across components is a CSS custom
property defined once in `app/assets/css/tokens.css`. The site is dark-only by design (a CRT
aesthetic doesn't have a light-mode equivalent) — adjusting the palette, or adding an alternate
accent theme, means editing that one file rather than hunting through components.

## Deployment

`pnpm generate` produces a fully static site in `.output/public/` — deployable to any static host
(Cloudflare Pages, Netlify, GitHub Pages, Codeberg Pages, etc.). There's no Node server to run in
production.
