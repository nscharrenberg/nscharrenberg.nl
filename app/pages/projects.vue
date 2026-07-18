<script setup lang="ts">
import { projects } from '~/data/projects'

useSeoMeta({
  title: 'Projects',
  description: 'A selection of projects by Noah Scharrenberg.',
})
</script>

<template>
  <div class="page">
    <SectionHeading eyebrow="~/projects" title="Projects">
      Case files on things built and shipped.
    </SectionHeading>

    <div class="page__stack">
      <Reveal v-for="(project, i) in projects" :key="project.title" :delay="i * 80">
        <CaseFile :project="project" :index="i" />
      </Reveal>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 820px;
  margin: 0 auto;
  padding: var(--space-2xl) clamp(16px, 4vw, 40px);
}

.page__stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}
</style>
