<script setup lang="ts">
import { experience } from '~/data/experience'

useSeoMeta({
  title: 'Experience',
  description: 'Roles and research timeline for Noah Scharrenberg.',
})
</script>

<template>
  <div class="page">
    <SectionHeading eyebrow="~/experience" title="Experience">
      Roles and research, most recent first.
    </SectionHeading>

    <div class="page__timeline">
      <Reveal
        v-for="(entry, i) in experience"
        :key="`${entry.org}-${entry.period}`"
        :delay="i * 90"
      >
        <TimelineItem :entry="entry" :is-last="i === experience.length - 1" />
      </Reveal>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-2xl) clamp(16px, 4vw, 40px);
}
</style>
