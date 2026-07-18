<script setup lang="ts">
interface Props {
  eyebrow: string
  title: string
}

defineProps<Props>()
</script>

<template>
  <header class="heading">
    <p class="heading__eyebrow">{{ eyebrow }}</p>
    <h1 class="heading__title">{{ title }}</h1>
    <p v-if="$slots.default" class="heading__lede">
      <slot />
    </p>
  </header>
</template>

<style scoped>
.heading {
  margin-bottom: var(--space-lg);
}

.heading__eyebrow {
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 14px;
}

.heading__eyebrow::before {
  content: "";
  width: 18px;
  height: 1px;
  background: var(--accent);
  display: inline-block;
}

.heading__title {
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--fg0);
  margin: 0 0 14px;
}

.heading__lede {
  color: var(--fg1);
  font-size: 15px;
  line-height: 1.7;
  max-width: 62ch;
  margin: 0;
}
</style>
