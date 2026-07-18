<script setup lang="ts">
import { education } from '~/data/education'
import { experience } from '~/data/experience'

useSeoMeta({
  title: 'Experience',
  description: 'Roles, research, and education for Noah Scharrenberg.',
})
</script>

<template>
  <div class="page">
    <SectionHeading eyebrow="~/experience" title="Experience">
      A commit log of roles, research, and education, most recent first.
    </SectionHeading>

    <CommandLine path="~/experience" command="git log --graph main" class="page__cmd" />
    <div class="page__timeline">
      <Reveal
        v-for="(entry, i) in experience"
        :key="`${entry.org}-${entry.period}`"
        :delay="i * 90"
      >
        <TimelineItem :entry="entry" :is-last="i === experience.length - 1" />
      </Reveal>
    </div>

    <CommandLine path="~/experience" command="git log --graph education" class="page__cmd page__cmd--education" />
    <div class="page__timeline">
      <Reveal
        v-for="(entry, i) in education"
        :key="`${entry.org}-${entry.period}`"
        :delay="i * 90"
      >
        <TimelineItem :entry="entry" :is-last="i === education.length - 1" />
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

.page__cmd {
  margin-bottom: var(--space-md);
}

.page__cmd--education {
  margin-top: var(--space-lg);
}
</style>
