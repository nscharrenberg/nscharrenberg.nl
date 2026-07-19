<script setup lang="ts">
const DISPLAY_NAME = 'Noah Scharrenberg'

const route = useRoute()

// withSiteUrl (from nuxt-site-config) resolves site.url + the app's base
// URL + the given path into one absolute URL — using it rather than
// concatenating site.url by hand keeps this correct when the site is
// served from a subpath (e.g. GitHub Pages' /<repo>/ prefix), and it
// automatically follows site.url wherever that's configured (nuxt.config.ts,
// overridable via NUXT_PUBLIC_SITE_URL), so switching domains later means
// changing that one place, not hunting down hardcoded URLs here.
const canonicalUrl = withSiteUrl(route.path, { withBase: true })
const personUrl = withSiteUrl('/', { withBase: true })
const ogImageUrl = withSiteUrl('/og-image.png', { withBase: true })

useHead({
  titleTemplate: (title) => (title ? `${title} — ${DISPLAY_NAME}` : DISPLAY_NAME),
  link: [
    { rel: 'canonical', href: canonicalUrl },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: DISPLAY_NAME,
        jobTitle: ['AI Engineer', 'Software Engineer', 'Machine Learning Engineer'],
        url: personUrl.value,
        sameAs: [
          'https://codeberg.org/nscharrenberg',
          'https://github.com/nscharrenberg',
          'https://www.linkedin.com/in/nscharrenberg/',
        ],
      })),
    },
  ],
  // <Reveal> content starts at opacity:0 and is only shown once JS runs an
  // IntersectionObserver. If JS fails to load/execute, that content would
  // stay invisible forever for sighted users (it's still in the SSR HTML,
  // so crawlers/screen readers are unaffected either way) — force it visible
  // when JS isn't available at all.
  noscript: [
    { innerHTML: '<style>.reveal{opacity:1!important;transform:none!important}</style>' },
  ],
})

useSeoMeta({
  ogSiteName: DISPLAY_NAME,
  ogType: 'website',
  ogImage: ogImageUrl,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: `${DISPLAY_NAME} — AI Engineer, Software Engineer`,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
