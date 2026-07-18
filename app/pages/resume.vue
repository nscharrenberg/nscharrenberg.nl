<script setup lang="ts">
import { bio, focusAreas } from '~/data/about'
import { education } from '~/data/education'
import { experience } from '~/data/experience'
import { projects } from '~/data/projects'

useSeoMeta({
  title: 'Resume',
  description: "Noah Scharrenberg's resume — experience, education, projects, and skills.",
})

function downloadPdf() {
  window.print()
}
</script>

<template>
  <div class="page">
    <div class="page__top no-print">
      <SectionHeading eyebrow="~/resume" title="Resume">
        Everything above, in one page you can take with you.
      </SectionHeading>
      <button type="button" class="download" @click="downloadPdf">
        <IconResume />
        Download PDF
      </button>
    </div>
    <p class="page__hint no-print">
      Opens your browser's print dialog — choose "Save as PDF" as the destination.
    </p>

    <Reveal>
      <article class="resume">
        <header class="resume__header">
          <p class="resume__name">Noah Scharrenberg</p>
          <p class="resume__role">AI Engineer · Software Engineer</p>
          <ul class="resume__links">
            <li><a href="https://www.linkedin.com/in/nscharrenberg/" target="_blank" rel="noopener noreferrer">linkedin.com/in/nscharrenberg</a></li>
            <li><a href="https://github.com/nscharrenberg" target="_blank" rel="noopener noreferrer">github.com/nscharrenberg</a></li>
            <li><a href="https://codeberg.org/nscharrenberg" target="_blank" rel="noopener noreferrer">codeberg.org/nscharrenberg</a></li>
          </ul>
        </header>

        <section class="resume__section">
          <h2>Summary</h2>
          <p v-for="(paragraph, i) in bio" :key="i">{{ paragraph }}</p>
        </section>

        <section class="resume__section">
          <h2>Skills</h2>
          <ul class="resume__pills">
            <li v-for="area in focusAreas" :key="area">{{ area }}</li>
          </ul>
        </section>

        <section class="resume__section">
          <h2>Experience</h2>
          <div v-for="entry in experience" :key="`${entry.org}-${entry.period}`" class="resume__entry">
            <div class="resume__entry-head">
              <span class="resume__entry-title">{{ entry.role }} · {{ entry.org }}</span>
              <span class="resume__entry-period">{{ entry.period }}</span>
            </div>
            <p>{{ entry.summary }}</p>
          </div>
        </section>

        <section class="resume__section">
          <h2>Education</h2>
          <div v-for="entry in education" :key="`${entry.org}-${entry.period}`" class="resume__entry">
            <div class="resume__entry-head">
              <span class="resume__entry-title">{{ entry.role }} · {{ entry.org }}</span>
              <span class="resume__entry-period">{{ entry.period }}</span>
            </div>
            <p>{{ entry.summary }}</p>
          </div>
        </section>

        <section class="resume__section">
          <h2>Projects</h2>
          <div v-for="project in projects" :key="project.title" class="resume__entry">
            <div class="resume__entry-head">
              <span class="resume__entry-title">{{ project.title }}</span>
              <span class="resume__entry-period">{{ project.stack.join(' · ') }}</span>
            </div>
            <p>{{ project.summary }}</p>
            <p class="resume__entry-links">
              <a
                v-for="link in project.links"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
              >{{ link.label }}</a>
            </p>
          </div>
        </section>
      </article>
    </Reveal>
  </div>
</template>

<style scoped>
.page {
  max-width: 760px;
  margin: 0 auto;
  padding: var(--space-2xl) clamp(16px, 4vw, 40px);
}

.page__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-md);
}

.download {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--line-strong);
  background: var(--bg1);
  color: var(--fg0);
  font-family: var(--font-mono);
  font-size: 13px;
  cursor: pointer;
  transition: border-color var(--dur-hover) ease, transform var(--dur-hover) ease;
}

.download:hover {
  border-color: rgb(255 106 0 / 40%);
  transform: translateY(-1px);
}

.download :deep(svg) {
  width: 16px;
  height: 16px;
}

.page__hint {
  font-size: 12px;
  color: var(--fg2);
  margin: -8px 0 var(--space-lg);
}

.resume {
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--bg1);
  padding: clamp(24px, 4vw, 40px);
}

.resume__header {
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--line);
}

.resume__name {
  font-size: 24px;
  font-weight: 700;
  color: var(--fg0);
  margin: 0 0 4px;
}

.resume__role {
  font-size: 14px;
  color: var(--fg1);
  margin: 0 0 var(--space-sm);
}

.resume__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm) var(--space-md);
  font-size: 12.5px;
}

.resume__links a {
  color: var(--accent);
}

.resume__section {
  margin-bottom: var(--space-lg);
}

.resume__section:last-child {
  margin-bottom: 0;
}

.resume__section h2 {
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 var(--space-sm);
}

.resume__section p {
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--fg1);
  margin: 0 0 8px;
}

.resume__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.resume__pills li {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  color: var(--fg1);
}

.resume__entry {
  margin-bottom: var(--space-sm);
}

.resume__entry:last-child {
  margin-bottom: 0;
}

.resume__entry-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.resume__entry-title {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--fg0);
}

.resume__entry-period {
  font-size: 12px;
  color: var(--fg2);
  white-space: nowrap;
}

.resume__entry-links {
  display: flex;
  gap: var(--space-sm);
}

.resume__entry-links a {
  color: var(--accent);
  font-size: 12.5px;
}
</style>
