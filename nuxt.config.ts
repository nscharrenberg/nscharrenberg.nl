// The permanent domain, once self-hosted there. Until then, CI overrides
// this via the NUXT_PUBLIC_SITE_URL env var to point at wherever the site
// is actually being served (currently a GitHub Pages subpath) — see
// .github/workflows/ci.yml. Switching domains later is then a one-line
// change: drop that env var (or point it elsewhere) and this default takes
// over everywhere the URL is used (sitemap, robots.txt, JSON-LD, OG tags).
const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://nscharrenberg.nl'

// A robots.txt built with an app base URL only ever appears at
// .../<base>/robots.txt — a path crawlers never check, since they only look
// at the true domain root. Generating one there wouldn't just be useless,
// it'd be silently wrong, so @nuxt/robots refuses to build it at all while
// NUXT_APP_BASE_URL is set (i.e. during the temporary GitHub Pages subpath
// phase — see ci.yml). This makes that intentional instead of a surprise in
// the build log; it starts generating normally the moment the custom domain
// (and its unprefixed root) is live.
const HAS_BASE_URL = !!process.env.NUXT_APP_BASE_URL

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@vueuse/nuxt',
  ],

  // Component filenames are unique across subfolders (fx/, ui/, portfolio/, icons/),
  // so keep flat tag names (<GlitchText>) instead of Nuxt's folder-prefixed defaults.
  // Histoire's *.story.vue files live next to the components they document —
  // ignored here so Nuxt doesn't also register them as real components.
  components: [{ path: '~/components', pathPrefix: false, ignore: ['**/*.story.vue'] }],

  css: [
    '~/assets/css/reset.css',
    '~/assets/css/tokens.css',
    '~/assets/css/main.css',
  ],

  site: {
    url: SITE_URL,
    name: 'Noah Scharrenberg',
  },

  robots: {
    robotsTxt: !HAS_BASE_URL,
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'color-scheme', content: 'dark' },
        { name: 'theme-color', content: '#ff6a00' },
      ],
      link: [
        { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', href: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
        { rel: 'icon', href: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  routeRules: {
    // Every route is static content — prerender the whole site.
    '/**': { prerender: true },
  },

  future: { compatibilityVersion: 4 },
})
