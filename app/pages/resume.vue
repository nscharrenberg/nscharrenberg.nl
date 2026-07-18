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
        Everything above, parsed into one file you can take with you.
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
        <CommandLine path="~/resume" command="cat resume.yaml" class="resume__cmd" />

        <p class="yaml__comment"># curriculum vitae</p>

        <dl class="yaml__map yaml__map--root">
          <div class="yaml__pair">
            <dt>name</dt>
            <dd>Noah Scharrenberg</dd>
          </div>
          <div class="yaml__pair">
            <dt>role</dt>
            <dd>AI Engineer · Software Engineer</dd>
          </div>
        </dl>

        <section class="yaml__section">
          <h2 class="yaml__key">summary<span class="yaml__punct">: |</span></h2>
          <div class="yaml__body">
            <p v-for="(paragraph, i) in bio" :key="i" class="yaml__scalar">{{ paragraph }}</p>
          </div>
        </section>

        <section class="yaml__section">
          <h2 class="yaml__key">skills<span class="yaml__punct">:</span></h2>
          <ul class="yaml__body yaml__list">
            <li v-for="area in focusAreas" :key="area" class="yaml__item">
              <span class="yaml__dash" aria-hidden="true">-</span>{{ area }}
            </li>
          </ul>
        </section>

        <section class="yaml__section">
          <h2 class="yaml__key">experience<span class="yaml__punct">:</span></h2>
          <ul class="yaml__body yaml__list">
            <li v-for="entry in experience" :key="`${entry.org}-${entry.period}`" class="yaml__item yaml__item--map">
              <span class="yaml__dash" aria-hidden="true">-</span>
              <dl class="yaml__map">
                <div class="yaml__pair"><dt>role</dt><dd>{{ entry.role }}</dd></div>
                <div class="yaml__pair"><dt>org</dt><dd>{{ entry.org }}</dd></div>
                <div class="yaml__pair"><dt>period</dt><dd>{{ entry.period }}</dd></div>
                <div class="yaml__pair yaml__pair--wrap"><dt>summary</dt><dd>{{ entry.summary }}</dd></div>
              </dl>
            </li>
          </ul>
        </section>

        <section class="yaml__section">
          <h2 class="yaml__key">education<span class="yaml__punct">:</span></h2>
          <ul class="yaml__body yaml__list">
            <li v-for="entry in education" :key="`${entry.org}-${entry.period}`" class="yaml__item yaml__item--map">
              <span class="yaml__dash" aria-hidden="true">-</span>
              <dl class="yaml__map">
                <div class="yaml__pair"><dt>role</dt><dd>{{ entry.role }}</dd></div>
                <div class="yaml__pair"><dt>org</dt><dd>{{ entry.org }}</dd></div>
                <div class="yaml__pair"><dt>period</dt><dd>{{ entry.period }}</dd></div>
                <div class="yaml__pair yaml__pair--wrap"><dt>summary</dt><dd>{{ entry.summary }}</dd></div>
              </dl>
            </li>
          </ul>
        </section>

        <section class="yaml__section">
          <h2 class="yaml__key">projects<span class="yaml__punct">:</span></h2>
          <ul class="yaml__body yaml__list">
            <li v-for="project in projects" :key="project.title" class="yaml__item yaml__item--map">
              <span class="yaml__dash" aria-hidden="true">-</span>
              <dl class="yaml__map">
                <div class="yaml__pair"><dt>title</dt><dd>{{ project.title }}</dd></div>
                <div class="yaml__pair yaml__pair--wrap"><dt>stack</dt><dd>[{{ project.stack.join(', ') }}]</dd></div>
                <div class="yaml__pair yaml__pair--wrap"><dt>summary</dt><dd>{{ project.summary }}</dd></div>
                <div class="yaml__pair yaml__pair--wrap">
                  <dt>links</dt>
                  <dd>
                    <ul class="yaml__links">
                      <li v-for="link in project.links" :key="link.href">
                        <span class="yaml__dash" aria-hidden="true">-</span>
                        <a :href="link.href" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
                      </li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </li>
          </ul>
        </section>

        <section class="yaml__section">
          <h2 class="yaml__key">contact<span class="yaml__punct">:</span></h2>
          <dl class="yaml__body yaml__map">
            <div class="yaml__pair">
              <dt>linkedin</dt>
              <dd><a href="https://www.linkedin.com/in/nscharrenberg/" target="_blank" rel="noopener noreferrer">linkedin.com/in/nscharrenberg</a></dd>
            </div>
            <div class="yaml__pair">
              <dt>github</dt>
              <dd><a href="https://github.com/nscharrenberg" target="_blank" rel="noopener noreferrer">github.com/nscharrenberg</a></dd>
            </div>
            <div class="yaml__pair">
              <dt>codeberg</dt>
              <dd><a href="https://codeberg.org/nscharrenberg" target="_blank" rel="noopener noreferrer">codeberg.org/nscharrenberg</a></dd>
            </div>
          </dl>
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
  font-size: 13.5px;
  line-height: 1.7;
}

.resume__cmd {
  margin-bottom: var(--space-lg);
}

.yaml__comment {
  color: var(--fg2);
  margin: 0 0 var(--space-md);
}

/* --- key: value mapping rows --- */
.yaml__map {
  margin: 0;
}

.yaml__map--root {
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--line-strong);
}

.yaml__map--root .yaml__pair dd {
  font-size: 15px;
  color: var(--fg0);
  font-weight: 700;
}

.yaml__map--root .yaml__pair:last-child dd {
  font-size: 13.5px;
  font-weight: 400;
  color: var(--fg1);
}

.yaml__pair {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
}

.yaml__pair--wrap {
  align-items: flex-start;
}

.yaml__pair:last-child {
  margin-bottom: 0;
}

.yaml__pair dt {
  flex-shrink: 0;
  color: var(--fg2);
}

.yaml__pair dt::after {
  content: ':';
  color: var(--fg2);
}

.yaml__pair dd {
  margin: 0;
  color: var(--fg1);
}

.yaml__pair dd a {
  color: var(--accent2);
}

/* --- top-level section keys, styled as literal yaml, not headings --- */
.yaml__section {
  margin-top: var(--space-md);
  padding-top: var(--space-md);
  border-top: 1px solid var(--line);
}

.yaml__section:first-of-type {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}

.yaml__key {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--accent);
  margin: 0 0 var(--space-sm);
}

.yaml__punct {
  color: var(--fg2);
  font-weight: 400;
}

/* --- indented block under a key, guided by a dashed rule like an editor's indent guide --- */
.yaml__body {
  margin: 0;
  padding-left: 18px;
  border-left: 1px dashed var(--line-strong);
}

.yaml__scalar {
  margin: 0 0 8px;
  color: var(--fg1);
}

.yaml__scalar:last-child {
  margin-bottom: 0;
}

.yaml__list {
  list-style: none;
  padding-left: 18px;
}

.yaml__item {
  color: var(--fg1);
  margin-bottom: 6px;
}

.yaml__item:last-child {
  margin-bottom: 0;
}

.yaml__dash {
  color: var(--glitch2);
  margin-right: 8px;
}

.yaml__item--map {
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--space-sm);
}

.yaml__item--map:last-child {
  margin-bottom: 0;
}

.yaml__item--map > .yaml__dash {
  flex-shrink: 0;
  margin-top: 1px;
}

.yaml__item--map .yaml__map {
  flex: 1;
  min-width: 0;
}

.yaml__item--map .yaml__pair dt {
  min-width: 62px;
}

.yaml__links {
  list-style: none;
  margin: 4px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 4px var(--space-md);
}

.yaml__links li {
  display: flex;
  align-items: baseline;
}

@media (max-width: 560px) {
  .yaml__pair {
    flex-wrap: wrap;
  }

  .yaml__item--map .yaml__pair dt {
    min-width: 0;
  }
}
</style>
