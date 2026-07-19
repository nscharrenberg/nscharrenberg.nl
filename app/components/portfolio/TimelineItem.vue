<script setup lang="ts">
import type { TimelineEntry } from '~/types/timeline'

const props = withDefaults(defineProps<{ entry: TimelineEntry; isLast?: boolean }>(), { isLast: false })

/** Deterministic 7-char hex "commit hash" from the entry's own text — cosmetic, but stable per entry. */
function pseudoHash(input: string): string {
  let h = 0
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0
  }
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}

const hash = computed(() => pseudoHash(`${props.entry.role}${props.entry.org}${props.entry.period}`))
const isActive = computed(() => props.entry.period.toLowerCase().includes('present'))
const status = computed(() => (isActive.value ? 'ACTIVE' : 'DONE'))
</script>

<template>
  <article class="item" :class="{ 'item--last': isLast }">
    <div class="item__rail" aria-hidden="true">
      <span class="item__dot" />
      <span class="item__line" />
    </div>
    <div class="item__body">
      <p class="item__hash">commit {{ hash }}</p>
      <h2 class="item__role">{{ entry.role }} <span class="item__org">· {{ entry.org }}</span></h2>

      <dl class="item__meta">
        <div class="item__row">
          <dt>Date</dt>
          <dd>{{ entry.period }}</dd>
        </div>
        <div class="item__row">
          <dt>Status</dt>
          <dd class="item__status" :class="{ 'item__status--active': isActive }">{{ status }}</dd>
        </div>
      </dl>

      <p class="item__summary">{{ entry.summary }}</p>
    </div>
  </article>
</template>

<style scoped>
.item {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: var(--space-sm);
}

.item__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
  flex-shrink: 0;
  margin-top: 6px;
  transition: box-shadow var(--dur-hover) ease;
}

.item:hover .item__dot {
  box-shadow: 0 0 0 6px var(--accent-soft);
}

.item:hover .item__role {
  color: var(--accent);
}

.item__line {
  flex: 1;
  width: 1px;
  background: var(--line-strong);
  margin-top: 6px;
}

.item--last .item__line {
  display: none;
}

.item__body {
  padding-bottom: var(--space-lg);
}

.item__hash {
  font-size: 12px;
  color: rgb(255 106 0 / 80%);
  margin: 0 0 8px;
}

.item__role {
  font-size: 15px;
  font-weight: 700;
  color: var(--fg0);
  margin: 0 0 10px;
  transition: color var(--dur-hover) ease;
}

.item__org {
  font-weight: 400;
  color: var(--fg2);
}

.item__meta {
  display: grid;
  gap: 4px;
  margin: 0 0 var(--space-sm);
}

.item__row {
  display: flex;
  gap: 10px;
  font-size: 12.5px;
}

.item__row dt {
  width: 52px;
  flex-shrink: 0;
  color: var(--fg2);
}

.item__row dd {
  margin: 0;
  color: var(--fg1);
}

.item__status {
  letter-spacing: 0.05em;
}

.item__status--active {
  color: var(--glitch2);
}

.item__summary {
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--fg1);
  margin: 0;
  padding-left: var(--space-sm);
  border-left: 2px solid var(--line);
}
</style>
