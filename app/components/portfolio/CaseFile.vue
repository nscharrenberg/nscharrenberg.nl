<script setup lang="ts">
import type { Project } from '~/types/project'

const props = defineProps<{ project: Project; index: number }>()

const caseNumber = computed(() => `Nº ${String(props.index + 1).padStart(3, '0')}`)

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
  <article class="file" @mousemove="onMove">
    <header class="file__header">
      <span class="file__case">CASE {{ caseNumber }}</span>
      <span class="file__stamp">{{ project.status ?? 'Published' }}</span>
    </header>

    <h2 class="file__title">
      <NuxtLink :to="`/projects/${project.slug}`">{{ project.title }}</NuxtLink>
    </h2>
    <p class="file__summary">{{ project.summary }}</p>

    <div class="file__section">
      <p class="file__label">Stack</p>
      <ul class="file__stack">
        <li v-for="tech in project.stack" :key="tech" class="file__tag">{{ tech }}</li>
      </ul>
    </div>

    <NuxtLink :to="`/projects/${project.slug}`" class="file__open">Open case file →</NuxtLink>
  </article>
</template>

<style scoped>
.file {
  position: relative;
  border: 1px solid var(--line);
  border-left: 2px solid var(--accent);
  border-radius: var(--radius-md);
  background: var(--bg1);
  padding: var(--space-lg);
  overflow: hidden;
  transition: border-color var(--dur-hover) ease, transform var(--dur-hover) ease;
}

.file::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgb(255 106 0 / 8%), transparent 65%);
  opacity: 0;
  transition: opacity 260ms ease;
  pointer-events: none;
}

.file:hover::before {
  opacity: 1;
}

.file:hover {
  border-left-color: var(--accent2);
  transform: translateY(-2px);
}

.file > * {
  position: relative;
}

.file__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.file__case {
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--fg2);
}

.file__stamp {
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--glitch2);
  border: 1px solid rgb(0 255 123 / 35%);
  border-radius: 5px;
  padding: 3px 8px;
  transform: rotate(-3deg);
}

.file__title {
  font-size: clamp(19px, 2.4vw, 22px);
  font-weight: 700;
  margin: 0 0 10px;
}

.file__title a {
  color: var(--fg0);
  transition: color var(--dur-hover) ease;
}

.file__title a:hover {
  color: var(--accent);
}

.file__summary {
  font-size: 14px;
  line-height: 1.65;
  color: var(--fg1);
  margin: 0 0 var(--space-md);
  max-width: 68ch;
}

.file__section + .file__section {
  margin-top: var(--space-sm);
}

.file__label {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg2);
  margin: 0 0 8px;
}

.file__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.file__tag {
  font-size: 11px;
  letter-spacing: 0.03em;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid var(--line-strong);
  color: var(--fg2);
}

.file__open {
  display: inline-block;
  margin-top: var(--space-md);
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
  border-bottom: 1px solid transparent;
}

.file__open:hover {
  border-bottom-color: currentcolor;
}
</style>
