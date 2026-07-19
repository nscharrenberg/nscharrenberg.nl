<script setup lang="ts">
import { REPO_URL } from '~/data/contact'

useSeoMeta({
  title: 'Colophon',
  description: 'How this site is built: stack, hosting, and design decisions.',
})

const stack = [
  'Nuxt 4 / Vue 3',
  '@nuxt/content, for the writing section',
  '@vueuse/nuxt, mostly for reduced-motion checks and intersection observers',
  '@nuxtjs/sitemap + @nuxtjs/robots, for sitemap.xml, robots.txt, and canonical URLs',
  'TypeScript, strict mode on',
  'Vitest + @vue/test-utils for the tests',
  'ESLint via @nuxt/eslint',
]

const philosophy = [
  'No webfonts. Just the monospace font already on your system.',
  'No analytics, no trackers, no third-party scripts. Ask me directly for visitor numbers.',
  'Dark only. Built around a CRT/terminal look on purpose.',
  'Animations respect reduced motion. Content renders server-side; JavaScript only adds effects on top.',
]
</script>

<template>
  <div class="page">
    <SectionHeading eyebrow="~/colophon" title="Colophon">
      How this site is put together.
    </SectionHeading>

    <Reveal>
      <TerminalWindow title="noah@host — colophon" class="page__session">
        <CommandLine command="cat stack.txt" />
        <ul class="out out--list">
          <li v-for="item in stack" :key="item" class="out__item">{{ item }}</li>
        </ul>

        <CommandLine command="cat philosophy.txt" />
        <p v-for="(paragraph, i) in philosophy" :key="i" class="out out--prose">{{ paragraph }}</p>

        <CommandLine command="git remote -v" />
        <p class="out">
          origin
          <a :href="REPO_URL" target="_blank" rel="noopener noreferrer">{{ REPO_URL.replace('https://', '') }}</a>
          (source, public)
        </p>

        <CommandLine cursor />
      </TerminalWindow>
    </Reveal>
  </div>
</template>

<style scoped>
.page {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-2xl) clamp(16px, 4vw, 40px);
}

.page__session :deep(.term__body) {
  display: grid;
  gap: var(--space-xs);
}

.out {
  color: var(--fg1);
  font-size: 14px;
  line-height: 1.6;
}

.out a {
  color: var(--accent);
}

.out--list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 4px;
}

.out__item::before {
  content: "- ";
  color: var(--glitch2);
}

.out--prose {
  max-width: 68ch;
}
</style>
