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

    <TerminalWindow title="cat about.md" class="page__bio">
      <p v-for="(paragraph, i) in bio" :key="i" class="page__paragraph">{{ paragraph }}</p>
    </TerminalWindow>

    <h2 class="page__subhead">Focus areas</h2>
    <ul class="page__tags">
      <li v-for="area in focusAreas" :key="area" class="page__tag">{{ area }}</li>
    </ul>
  </div>
</template>

<style scoped>
.page {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-2xl) clamp(16px, 4vw, 40px);
}

.page__bio {
  margin-bottom: var(--space-lg);
}

.page__paragraph + .page__paragraph {
  margin-top: var(--space-sm);
}

.page__subhead {
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg2);
  margin: 0 0 var(--space-sm);
}

.page__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.page__tag {
  font-size: 12.5px;
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  color: var(--fg1);
}
</style>
