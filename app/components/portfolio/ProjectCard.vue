<script setup lang="ts">
export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  title: string
  summary: string
  stack: string[]
  links: ProjectLink[]
}

defineProps<{ project: Project }>()
</script>

<template>
  <article class="card">
    <h3 class="card__title">{{ project.title }}</h3>
    <p class="card__summary">{{ project.summary }}</p>
    <ul class="card__stack">
      <li v-for="tech in project.stack" :key="tech" class="card__tag">{{ tech }}</li>
    </ul>
    <div class="card__links">
      <a v-for="link in project.links" :key="link.href" :href="link.href" target="_blank" rel="noreferrer" class="card__link">{{ link.label }} →</a>
    </div>
  </article>
</template>

<style scoped>
.card {
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--bg1);
  padding: var(--space-md);
  transition: border-color var(--dur-hover) ease, transform var(--dur-hover) ease;
}

.card:hover {
  border-color: rgb(255 106 0 / 30%);
  transform: translateY(-2px);
}

.card__title {
  font-size: 16px;
  font-weight: 700;
  color: var(--fg0);
  margin: 0 0 8px;
}

.card__summary {
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--fg1);
  margin: 0 0 14px;
}

.card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 14px;
}

.card__tag {
  font-size: 11px;
  letter-spacing: 0.03em;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid var(--line-strong);
  color: var(--fg2);
}

.card__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm) var(--space-md);
}

.card__link {
  font-size: 13px;
  color: var(--accent);
  border-bottom: 1px solid transparent;
}

.card__link:hover {
  border-bottom-color: currentcolor;
}
</style>
