<script setup lang="ts">
interface Props {
  /** Text shown in the titlebar next to the three dots. Omit to show only the dots. */
  title?: string
}

withDefaults(defineProps<Props>(), { title: '' })
</script>

<template>
  <div class="term">
    <div class="term__bar">
      <span class="term__dot" />
      <span class="term__dot" />
      <span class="term__dot" />
      <span v-if="title" class="term__title">{{ title }}</span>
    </div>
    <div class="term__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.term {
  border-radius: var(--radius-md);
  border: 1px solid var(--line-strong);
  background: rgb(10 12 18 / 55%);
  box-shadow: 0 12px 28px rgb(0 0 0 / 35%);
  overflow: hidden;
  text-align: left;
}

.term__bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 12px;
  border-bottom: 1px solid var(--line);
  background: var(--bg2);
}

.term__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--line-strong);
}

.term__title {
  margin-left: 6px;
  font-size: 11px;
  color: var(--fg2);
}

.term__body {
  padding: 14px 16px;
  font-size: 14px;
  line-height: 1.6;
  color: rgb(243 246 255 / 92%);
}
</style>
