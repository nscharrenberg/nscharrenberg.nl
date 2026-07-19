<script setup lang="ts">
import { projects } from '~/data/projects'

const route = useRoute()
const slug = route.params.slug as string

const index = projects.findIndex((p) => p.slug === slug)
if (index === -1) {
  throw createError({ statusCode: 404, statusMessage: 'Case file not found' })
}

const project = projects[index]!
const caseNumber = `Nº ${String(index + 1).padStart(3, '0')}`

useSeoMeta({
  title: project.title,
  description: project.summary,
})
</script>

<template>
  <div class="page">
    <NuxtLink to="/projects" class="back">← All case files</NuxtLink>

    <Reveal tag="header" class="case__header">
      <CommandLine path="~/projects" :command="`cat ${project.slug}/case.md`" />
      <div class="case__meta">
        <span class="case__number">CASE {{ caseNumber }}</span>
        <span class="case__stamp">{{ project.status ?? 'Published' }}</span>
      </div>
      <h1 class="case__title">{{ project.title }}</h1>
      <p v-if="project.period" class="case__period">{{ project.period }}</p>
      <ul class="case__stack">
        <li v-for="tech in project.stack" :key="tech" class="case__tag">{{ tech }}</li>
      </ul>
    </Reveal>

    <Reveal tag="section" class="exhibit">
      <h2 class="exhibit__label"><span class="exhibit__letter">Exhibit A</span> Overview</h2>
      <p v-for="(paragraph, i) in (project.overview ?? [project.summary])" :key="i" class="exhibit__prose">
        {{ paragraph }}
      </p>
    </Reveal>

    <Reveal v-if="project.media?.length" tag="section" class="exhibit">
      <h2 class="exhibit__label"><span class="exhibit__letter">Exhibit B</span> Media</h2>
      <CaseGallery :media="project.media" />
    </Reveal>

    <Reveal v-if="project.publications?.length" tag="section" class="exhibit">
      <h2 class="exhibit__label"><span class="exhibit__letter">Exhibit C</span> Publications</h2>
      <ul class="pubs">
        <li v-for="pub in project.publications" :key="pub.href" class="pub">
          <a :href="pub.href" target="_blank" rel="noopener noreferrer" class="pub__link">
            <span class="pub__title">{{ pub.label }}</span>
            <span class="pub__venue">{{ pub.venue }}</span>
          </a>
        </li>
      </ul>
    </Reveal>

    <Reveal v-if="project.links.length" tag="section" class="exhibit exhibit--last">
      <h2 class="exhibit__label"><span class="exhibit__letter">Exhibit D</span> Links</h2>
      <ul class="pubs">
        <li v-for="link in project.links" :key="link.href" class="pub">
          <a :href="link.href" target="_blank" rel="noopener noreferrer" class="pub__link pub__link--plain">
            {{ link.label }} →
          </a>
        </li>
      </ul>
    </Reveal>
  </div>
</template>

<style scoped>
.page {
  max-width: 780px;
  margin: 0 auto;
  padding: var(--space-2xl) clamp(16px, 4vw, 40px);
}

.back {
  display: inline-block;
  font-size: 13px;
  color: var(--fg2);
  margin-bottom: var(--space-lg);
  transition: color var(--dur-hover) ease;
}

.back:hover {
  color: var(--accent);
}

.case__header {
  border: 1px solid var(--line);
  border-left: 2px solid var(--accent);
  border-radius: var(--radius-md);
  background: var(--bg1);
  padding: clamp(20px, 4vw, 32px);
  margin-bottom: var(--space-lg);
}

.case__meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin: var(--space-sm) 0 var(--space-sm);
}

.case__number {
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--fg2);
}

.case__stamp {
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--glitch2);
  border: 1px solid rgb(0 255 123 / 35%);
  border-radius: 5px;
  padding: 3px 8px;
  transform: rotate(-3deg);
}

.case__title {
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--fg0);
  margin: 0 0 4px;
}

.case__period {
  font-size: 13px;
  color: var(--fg2);
  margin: 0 0 var(--space-sm);
}

.case__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: var(--space-sm);
}

.case__tag {
  font-size: 11px;
  letter-spacing: 0.03em;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid var(--line-strong);
  color: var(--fg2);
}

.exhibit {
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--bg1);
  padding: clamp(18px, 3.5vw, 28px);
  margin-bottom: var(--space-md);
}

.exhibit--last {
  margin-bottom: 0;
}

.exhibit__label {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 15px;
  font-weight: 700;
  color: var(--fg0);
  margin: 0 0 var(--space-md);
}

.exhibit__letter {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}

.exhibit__prose {
  font-size: 14px;
  line-height: 1.7;
  color: var(--fg1);
  margin: 0;
  max-width: 68ch;
}

.exhibit__prose + .exhibit__prose {
  margin-top: 10px;
}

.pubs {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.pub__link {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px 12px;
  padding: 12px 14px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  transition: border-color var(--dur-hover) ease, transform var(--dur-hover) ease;
}

.pub__link:hover {
  border-color: rgb(255 106 0 / 40%);
  transform: translateY(-1px);
}

.pub__title {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--fg0);
}

.pub__venue {
  font-size: 12px;
  color: var(--fg2);
}

.pub__link--plain {
  color: var(--accent);
  font-size: 13.5px;
  font-weight: 400;
  justify-content: flex-start;
}
</style>
