<script setup lang="ts">
import type { TimelineEntry } from '~/components/portfolio/TimelineItem.vue'
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

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function startYear(period: string) {
  return Number(period.match(/\d{4}/)?.[0] ?? 0)
}

const CURRENT_YEAR = new Date().getFullYear()
const oldestStart = Math.min(...[...experience, ...education].map((entry) => startYear(entry.period)))
const currentRoleCount = experience.filter((entry) => /present/i.test(entry.period)).length

const stats = [
  { label: 'Years in tech', value: CURRENT_YEAR - oldestStart },
  { label: 'Degrees earned', value: education.length },
  { label: 'Focus areas', value: focusAreas.length },
  { label: 'Roles active now', value: currentRoleCount },
]

interface ProcessEntry extends TimelineEntry {
  current: boolean
  pid: number
}

function toProcessEntry(offset: number) {
  return (entry: TimelineEntry, i: number): ProcessEntry => ({
    ...entry,
    current: /present/i.test(entry.period),
    pid: offset + i * 37,
  })
}

const workTimeline: ProcessEntry[] = experience
  .map(toProcessEntry(4200))
  .sort((a, b) => startYear(b.period) - startYear(a.period))

const eduTimeline: ProcessEntry[] = education
  .map(toProcessEntry(8100))
  .sort((a, b) => startYear(b.period) - startYear(a.period))

const statsEl = ref<HTMLElement | null>(null)
const prefersReducedMotion = usePrefersReducedMotion()

onMounted(() => {
  if (prefersReducedMotion.value) return

  const { stop } = useIntersectionObserver(
    statsEl,
    ([entry]) => {
      if (!entry?.isIntersecting) return
      stop()

      const nodes = statsEl.value?.querySelectorAll<HTMLElement>('.stat__value') ?? []
      nodes.forEach((node, i) => {
        const target = Number(node.textContent)
        if (!Number.isFinite(target)) return

        const duration = 800
        const startAt = performance.now() + i * 90

        const tick = (now: number) => {
          const elapsed = now - startAt
          if (elapsed < 0) {
            requestAnimationFrame(tick)
            return
          }
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - (1 - progress) ** 3
          node.textContent = String(Math.round(target * eased))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      })
    },
    { threshold: 0.4 },
  )
})
</script>

<template>
  <div class="page">
    <div class="page__top no-print">
      <SectionHeading eyebrow="~/resume" title="Resume">
        Everything above, running as one process.
      </SectionHeading>
      <button type="button" class="download" @click="downloadPdf">
        <IconResume />
        Download PDF
      </button>
    </div>
    <p class="page__hint no-print">
      Opens your browser's print dialog — choose "Save as PDF" as the destination.
    </p>

    <article class="cv">
      <Reveal tag="header" class="cv__header">
        <CommandLine path="~/resume" command="whoami" />
        <p class="cv__name">Noah Scharrenberg</p>
        <p class="cv__role">AI Engineer · Software Engineer</p>
      </Reveal>

      <Reveal tag="section" class="cv__stats">
        <h2 class="cv__title cv__title--standalone">At a Glance</h2>
        <div ref="statsEl" class="stats">
          <div v-for="stat in stats" :key="stat.label" class="stat">
            <span class="stat__value">{{ stat.value }}</span>
            <span class="stat__label">{{ stat.label }}</span>
          </div>
        </div>
      </Reveal>

      <Reveal tag="section" class="cv__section">
        <div class="cv__head">
          <h2 class="cv__title">Summary</h2>
          <CommandLine path="~/resume" command="cat summary.md" />
        </div>
        <p v-for="(paragraph, i) in bio" :key="i" class="cv__prose">{{ paragraph }}</p>
      </Reveal>

      <Reveal tag="section" class="cv__section">
        <div class="cv__head">
          <h2 class="cv__title">Experience</h2>
          <CommandLine path="~/resume" command="ps aux --work" />
        </div>
        <ul class="proc">
          <li v-for="entry in workTimeline" :key="`${entry.org}-${entry.period}`" class="proc__row">
            <div class="proc__meta">
              <span class="proc__status" :class="entry.current ? 'proc__status--running' : 'proc__status--done'">
                <span class="proc__dot" aria-hidden="true" />
                {{ entry.current ? 'RUNNING' : 'DONE' }}
              </span>
              <span class="proc__pid">PID {{ entry.pid }}</span>
            </div>
            <p class="proc__cmd">
              <span class="proc__role">{{ entry.role }}</span><span class="proc__at">@</span><span class="proc__org">{{ entry.org }}</span>
              <span class="proc__period">{{ entry.period }}</span>
            </p>
            <p class="proc__summary"><span class="proc__tree" aria-hidden="true">└─</span>{{ entry.summary }}</p>
          </li>
        </ul>
      </Reveal>

      <Reveal tag="section" class="cv__section">
        <div class="cv__head">
          <h2 class="cv__title">Education</h2>
          <CommandLine path="~/resume" command="ps aux --edu" />
        </div>
        <ul class="proc">
          <li v-for="entry in eduTimeline" :key="`${entry.org}-${entry.period}`" class="proc__row">
            <div class="proc__meta">
              <span class="proc__status" :class="entry.current ? 'proc__status--running' : 'proc__status--done'">
                <span class="proc__dot" aria-hidden="true" />
                {{ entry.current ? 'RUNNING' : 'DONE' }}
              </span>
              <span class="proc__pid">PID {{ entry.pid }}</span>
            </div>
            <p class="proc__cmd">
              <span class="proc__role">{{ entry.role }}</span><span class="proc__at">@</span><span class="proc__org">{{ entry.org }}</span>
              <span class="proc__period">{{ entry.period }}</span>
            </p>
            <p class="proc__summary"><span class="proc__tree" aria-hidden="true">└─</span>{{ entry.summary }}</p>
          </li>
        </ul>
      </Reveal>

      <Reveal tag="section" class="cv__section">
        <div class="cv__head">
          <h2 class="cv__title">Skills</h2>
          <CommandLine path="~/resume" command="tail -f skills.log" />
        </div>
        <ul class="log">
          <li v-for="(area, i) in focusAreas" :key="area" class="log__row">
            <span class="log__time">[{{ (i * 0.041 + 0.012).toFixed(3) }}s]</span>
            <span class="log__name">{{ slug(area) }}</span>
            <span class="log__ok">OK</span>
          </li>
        </ul>
      </Reveal>

      <Reveal tag="section" class="cv__section">
        <div class="cv__head">
          <h2 class="cv__title">Projects</h2>
          <CommandLine path="~/resume" command="ls -la dist/" />
        </div>
        <ul class="artifacts">
          <li v-for="project in projects" :key="project.title" class="artifact">
            <p class="artifact__row">
              <span class="artifact__perm">-rwxr-xr-x</span>
              <span class="artifact__name">{{ slug(project.title) }}.pkg</span>
              <span class="artifact__stack">{{ project.stack.join(' · ') }}</span>
            </p>
            <p class="artifact__summary">{{ project.summary }}</p>
            <p class="artifact__flags">
              <a
                v-for="link in project.links"
                :key="link.href"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="artifact__flag"
              >--{{ slug(link.label) }}</a>
            </p>
          </li>
        </ul>
      </Reveal>

      <Reveal tag="section" class="cv__section cv__section--last">
        <div class="cv__head">
          <h2 class="cv__title">Contact</h2>
          <CommandLine path="~/resume" command="netstat -tlnp" />
        </div>
        <table class="netstat">
          <thead>
            <tr>
              <th scope="col">Proto</th>
              <th scope="col">Service</th>
              <th scope="col">Address</th>
              <th scope="col">State</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>tcp</td>
              <td>linkedin</td>
              <td><a href="https://www.linkedin.com/in/nscharrenberg/" target="_blank" rel="noopener noreferrer">linkedin.com/in/nscharrenberg</a></td>
              <td class="netstat__state">LISTEN</td>
            </tr>
            <tr>
              <td>tcp</td>
              <td>github</td>
              <td><a href="https://github.com/nscharrenberg" target="_blank" rel="noopener noreferrer">github.com/nscharrenberg</a></td>
              <td class="netstat__state">LISTEN</td>
            </tr>
            <tr>
              <td>tcp</td>
              <td>codeberg</td>
              <td><a href="https://codeberg.org/nscharrenberg" target="_blank" rel="noopener noreferrer">codeberg.org/nscharrenberg</a></td>
              <td class="netstat__state">LISTEN</td>
            </tr>
          </tbody>
        </table>
      </Reveal>
    </article>
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

.cv {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

/* --- header --- */
.cv__header {
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--bg1);
  padding: clamp(20px, 4vw, 32px);
}

.cv__name {
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--fg0);
  margin: var(--space-sm) 0 4px;
}

.cv__role {
  font-size: 14px;
  color: var(--fg1);
  margin: 0;
}

/* --- stat strip --- */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--line);
  overflow: hidden;
}

.stat {
  background: var(--bg1);
  padding: clamp(16px, 3vw, 22px) clamp(10px, 2vw, 16px);
  text-align: center;
}

.stat__value {
  display: block;
  font-size: clamp(26px, 5vw, 38px);
  font-weight: 800;
  color: var(--accent);
  text-shadow: 0 0 24px rgb(255 106 0 / 18%);
  font-variant-numeric: tabular-nums;
}

.stat__label {
  display: block;
  margin-top: 4px;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--fg2);
}

@media (max-width: 560px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* --- shared section shell --- */
.cv__section {
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--bg1);
  padding: clamp(18px, 3.5vw, 28px);
}

.cv__head {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: var(--space-md);
}

.cv__title {
  font-size: 15px;
  font-weight: 700;
  color: var(--fg0);
  margin: 0;
}

.cv__title--standalone {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg2);
  margin: 0 0 10px 2px;
}

.cv__prose {
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--fg1);
  margin: 0;
}

.cv__prose + .cv__prose {
  margin-top: 10px;
}

/* --- process table (experience / education) --- */
.proc {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.proc__row {
  padding-top: var(--space-md);
  border-top: 1px solid var(--line);
}

.proc__row:first-child {
  padding-top: 0;
  border-top: none;
}

.proc__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
  font-size: 11px;
  letter-spacing: 0.04em;
}

.proc__status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
}

.proc__status--running {
  color: var(--glitch2);
}

.proc__status--done {
  color: var(--fg2);
}

.proc__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentcolor;
}

.proc__status--running .proc__dot {
  animation: proc-pulse 1.6s ease-in-out infinite;
}

@keyframes proc-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgb(0 255 123 / 45%); }
  50% { opacity: 0.55; box-shadow: 0 0 0 4px rgb(0 255 123 / 0%); }
}

.proc__pid {
  color: var(--fg2);
}

.proc__cmd {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 2px 8px;
  margin: 0 0 4px;
  font-size: 14px;
}

.proc__role {
  color: var(--fg0);
  font-weight: 700;
}

.proc__at {
  color: var(--fg2);
}

.proc__org {
  color: var(--fg1);
}

.proc__period {
  margin-left: auto;
  color: var(--fg2);
  font-size: 12px;
  white-space: nowrap;
}

.proc__summary {
  display: flex;
  gap: 8px;
  margin: 0;
  padding-left: 4px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--fg1);
}

.proc__tree {
  flex-shrink: 0;
  color: var(--line-strong);
}

/* --- skills boot log --- */
.log {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.log__row {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 12.5px;
}

.log__time {
  color: var(--fg2);
  flex-shrink: 0;
}

.log__name {
  color: var(--fg1);
  flex: 1;
}

.log__ok {
  color: var(--glitch2);
  font-weight: 700;
}

/* --- project artifacts --- */
.artifacts {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.artifact {
  padding-top: var(--space-md);
  border-top: 1px solid var(--line);
}

.artifact:first-child {
  padding-top: 0;
  border-top: none;
}

.artifact__row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 10px;
  margin: 0 0 6px;
  font-size: 13px;
}

.artifact__perm {
  color: var(--fg2);
}

.artifact__name {
  color: var(--fg0);
  font-weight: 700;
}

.artifact__stack {
  color: var(--fg2);
  font-size: 12px;
}

.artifact__summary {
  font-size: 13px;
  line-height: 1.65;
  color: var(--fg1);
  margin: 0 0 8px;
}

.artifact__flags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin: 0;
}

.artifact__flag {
  color: var(--accent2);
  font-size: 12.5px;
}

/* --- contact table --- */
.netstat {
  width: 100%;
  border-collapse: collapse;
  font-size: 12.5px;
}

.netstat th {
  text-align: left;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--fg2);
  font-weight: 400;
  padding: 0 10px 8px 0;
  border-bottom: 1px solid var(--line-strong);
}

.netstat td {
  padding: 8px 10px 8px 0;
  border-bottom: 1px solid var(--line);
  color: var(--fg1);
  white-space: nowrap;
}

.netstat td a {
  color: var(--accent2);
}

.netstat__state {
  color: var(--glitch2);
  font-weight: 700;
}

.netstat tr:last-child td {
  border-bottom: none;
}

@media (max-width: 560px) {
  .netstat {
    display: block;
    overflow-x: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .proc__status--running .proc__dot {
    animation: none;
  }
}
</style>
