const SITE_URL = 'https://nscharrenberg.nl'

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
  components: [{ path: '~/components', pathPrefix: false }],

  css: [
    '~/assets/css/reset.css',
    '~/assets/css/tokens.css',
    '~/assets/css/main.css',
  ],

  site: {
    url: SITE_URL,
    name: 'Noah Scharrenberg',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'color-scheme', content: 'dark' },
        { name: 'theme-color', content: '#ff6a00' },
      ],
      link: [
        { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
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
