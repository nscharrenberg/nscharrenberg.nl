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
      A selection of things built and shipped.
    </SectionHeading>

    <div class="page__grid">
      <Reveal v-for="(project, i) in projects" :key="project.title" :delay="i * 80">
        <ProjectCard :project="project" />
      </Reveal>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 960px;
  margin: 0 auto;
  padding: var(--space-2xl) clamp(16px, 4vw, 40px);
}

.page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-md);
}
</style>
