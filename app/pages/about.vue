<script setup lang="ts">
import { bio, focusAreas } from '~/data/about'

useSeoMeta({
  title: 'About',
  description: 'Background, focus areas, and what Noah Scharrenberg is currently working on.',
})
</script>

<template>
  <div class="page">
    <SectionHeading eyebrow="~/about" title="About">
      Background and focus areas.
    </SectionHeading>

    <Reveal>
      <TerminalWindow title="noah@host — about" class="page__session">
        <CommandLine command="whoami" />
        <p class="out">Noah Scharrenberg — AI Engineer, Software Engineer</p>

        <CommandLine command="cat focus.txt" />
        <ul class="out out--tags">
          <li v-for="area in focusAreas" :key="area" class="tag">{{ area }}</li>
        </ul>

        <CommandLine command="cat about.md" />
        <p v-for="(paragraph, i) in bio" :key="i" class="out out--prose">{{ paragraph }}</p>

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

.out--tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
}

.tag {
  font-size: 12.5px;
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  color: var(--fg1);
}
</style>
