<script setup lang="ts">
export interface TimelineEntry {
  role: string
  org: string
  period: string
  summary: string
}

withDefaults(defineProps<{ entry: TimelineEntry; isLast?: boolean }>(), { isLast: false })
</script>

<template>
  <article class="item" :class="{ 'item--last': isLast }">
    <div class="item__rail" aria-hidden="true">
      <span class="item__dot" />
      <span class="item__line" />
    </div>
    <div class="item__body">
      <p class="item__period">{{ entry.period }}</p>
      <h3 class="item__role">{{ entry.role }} <span class="item__org">· {{ entry.org }}</span></h3>
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

.item__period {
  font-size: 11px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--fg2);
  margin: 0 0 6px;
}

.item__role {
  font-size: 15px;
  font-weight: 700;
  color: var(--fg0);
  margin: 0 0 8px;
  transition: color var(--dur-hover) ease;
}

.item__org {
  font-weight: 400;
  color: var(--fg2);
}

.item__summary {
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--fg1);
  margin: 0;
}
</style>
