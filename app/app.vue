<script setup lang="ts">
const SITE_URL = 'https://nscharrenberg.nl/'
const DISPLAY_NAME = 'Noah Scharrenberg'

useHead({
  titleTemplate: (title) => (title ? `${title} — ${DISPLAY_NAME}` : DISPLAY_NAME),
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: DISPLAY_NAME,
        jobTitle: ['AI Engineer', 'Software Engineer', 'Machine Learning Engineer'],
        url: SITE_URL,
        sameAs: [
          'https://codeberg.org/nscharrenberg',
          'https://github.com/nscharrenberg',
          'https://www.linkedin.com/in/nscharrenberg/',
        ],
      }),
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
