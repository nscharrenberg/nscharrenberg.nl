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

const prefersReducedMotion = usePrefersReducedMotion()

function onMove(e: MouseEvent) {
  if (prefersReducedMotion.value) return
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
  el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
}
</script>

<template>
  <article class="card" @mousemove="onMove">
    <h2 class="card__title">{{ project.title }}</h2>
    <p class="card__summary">{{ project.summary }}</p>
    <ul class="card__stack">
      <li v-for="tech in project.stack" :key="tech" class="card__tag">{{ tech }}</li>
    </ul>
    <div class="card__links">
      <a v-for="link in project.links" :key="link.href" :href="link.href" target="_blank" rel="noopener noreferrer" class="card__link">{{ link.label }} →</a>
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--bg1);
  padding: var(--space-md);
  overflow: hidden;
  transition: border-color var(--dur-hover) ease, transform var(--dur-hover) ease;
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgb(255 106 0 / 12%), transparent 65%);
  opacity: 0;
  transition: opacity 260ms ease;
  pointer-events: none;
}

.card:hover::before {
  opacity: 1;
}

.card:hover {
  border-color: rgb(255 106 0 / 30%);
  transform: translateY(-2px);
}

.card > * {
  position: relative;
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
