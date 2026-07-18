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
        <CommandLine path="~/resume" command="resume --format=full" class="resume__cmd" />

        <header class="resume__header">
          <p class="resume__name">Noah Scharrenberg</p>
          <p class="resume__role">AI Engineer · Software Engineer</p>
        </header>

        <section class="spec">
          <h2 class="spec__label"><span class="spec__index">01</span> Summary</h2>
          <div class="spec__body">
            <p v-for="(paragraph, i) in bio" :key="i">{{ paragraph }}</p>
          </div>
        </section>

        <section class="spec">
          <h2 class="spec__label"><span class="spec__index">02</span> Skills</h2>
          <div class="spec__body">
            <ul class="spec__pills">
              <li v-for="area in focusAreas" :key="area">{{ area }}</li>
            </ul>
          </div>
        </section>

        <section class="spec">
          <h2 class="spec__label"><span class="spec__index">03</span> Experience</h2>
          <div class="spec__body">
            <div v-for="entry in experience" :key="`${entry.org}-${entry.period}`" class="spec__entry">
              <div class="spec__entry-head">
                <span class="spec__entry-title">{{ entry.role }} · {{ entry.org }}</span>
                <span class="spec__entry-period">{{ entry.period }}</span>
              </div>
              <p>{{ entry.summary }}</p>
            </div>
          </div>
        </section>

        <section class="spec">
          <h2 class="spec__label"><span class="spec__index">04</span> Education</h2>
          <div class="spec__body">
            <div v-for="entry in education" :key="`${entry.org}-${entry.period}`" class="spec__entry">
              <div class="spec__entry-head">
                <span class="spec__entry-title">{{ entry.role }} · {{ entry.org }}</span>
                <span class="spec__entry-period">{{ entry.period }}</span>
              </div>
              <p>{{ entry.summary }}</p>
            </div>
          </div>
        </section>

        <section class="spec">
          <h2 class="spec__label"><span class="spec__index">05</span> Projects</h2>
          <div class="spec__body">
            <div v-for="project in projects" :key="project.title" class="spec__entry">
              <div class="spec__entry-head">
                <span class="spec__entry-title">{{ project.title }}</span>
                <span class="spec__entry-period">{{ project.stack.join(' · ') }}</span>
              </div>
              <p>{{ project.summary }}</p>
              <p class="spec__entry-links">
                <a
                  v-for="link in project.links"
                  :key="link.href"
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                >{{ link.label }}</a>
              </p>
            </div>
          </div>
        </section>

        <section class="spec spec--contact">
          <h2 class="spec__label"><span class="spec__index">06</span> Contact</h2>
          <div class="spec__body">
            <ul class="spec__links">
              <li><a href="https://www.linkedin.com/in/nscharrenberg/" target="_blank" rel="noopener noreferrer">linkedin.com/in/nscharrenberg</a></li>
              <li><a href="https://github.com/nscharrenberg" target="_blank" rel="noopener noreferrer">github.com/nscharrenberg</a></li>
              <li><a href="https://codeberg.org/nscharrenberg" target="_blank" rel="noopener noreferrer">codeberg.org/nscharrenberg</a></li>
            </ul>
          </div>
        </section>
      </article>
    </Reveal>
  </div>
</template>

<style scoped>
.page {
  max-width: 860px;
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
  padding: clamp(20px, 4vw, 32px) clamp(20px, 4vw, 40px) clamp(24px, 4vw, 40px);
}

.resume__cmd {
  margin-bottom: var(--space-lg);
}

.resume__header {
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--line-strong);
}

.resume__name {
  font-size: 26px;
  font-weight: 700;
  color: var(--fg0);
  margin: 0 0 4px;
}

.resume__role {
  font-size: 14px;
  color: var(--fg1);
  margin: 0;
}

/* --- spec-sheet section grid: numbered label column + content column --- */
.spec {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: var(--space-md);
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--line);
}

.spec:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.spec__label {
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg0);
  margin: 0;
}

.spec__index {
  color: var(--accent);
  margin-right: 6px;
}

.spec__body p {
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--fg1);
  margin: 0 0 8px;
}

.spec__body p:last-child {
  margin-bottom: 0;
}

.spec__pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.spec__pills li {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--line-strong);
  color: var(--fg1);
}

.spec__entry {
  margin-bottom: var(--space-sm);
}

.spec__entry:last-child {
  margin-bottom: 0;
}

.spec__entry-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.spec__entry-title {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--fg0);
}

.spec__entry-period {
  font-size: 12px;
  color: var(--fg2);
  white-space: nowrap;
}

.spec__entry-links {
  display: flex;
  gap: var(--space-sm);
}

.spec__entry-links a {
  color: var(--accent);
  font-size: 12.5px;
}

.spec__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm) var(--space-md);
  font-size: 12.5px;
}

.spec__links a {
  color: var(--accent);
}

@media (max-width: 560px) {
  .spec {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}
</style>
