<script setup lang="ts">
interface Props {
  /** URL for external links, or a route path when `internal` is set. */
  href: string
  /** Accessible name — used as the visible label, tooltip text, or aria-label depending on `showLabel`. */
  label: string
  /** Internal Nuxt route — renders a <NuxtLink> instead of an external <a target="_blank">. */
  internal?: boolean
  /** Show the label as visible text next to the icon, instead of only on hover. */
  showLabel?: boolean
}

withDefaults(defineProps<Props>(), { internal: false, showLabel: false })
</script>

<template>
  <NuxtLink
    v-if="internal"
    :to="href"
    class="social"
    :class="{ 'social--labeled': showLabel }"
    :aria-label="showLabel ? undefined : label"
  >
    <span v-if="!showLabel" class="social__tooltip" role="tooltip">{{ label }}</span>
    <slot />
    <span v-if="showLabel" class="social__label">{{ label }}</span>
  </NuxtLink>
  <a
    v-else
    :href="href"
    target="_blank"
    rel="me noopener noreferrer"
    class="social"
    :class="{ 'social--labeled': showLabel }"
    :aria-label="showLabel ? undefined : label"
  >
    <span v-if="!showLabel" class="social__tooltip" role="tooltip">{{ label }}</span>
    <slot />
    <span v-if="showLabel" class="social__label">{{ label }}</span>
  </a>
</template>

<style scoped>
.social {
  position: relative;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-md);
  border: 1px solid var(--line-strong);
  background: rgb(10 12 18 / 55%);
  box-shadow: 0 12px 28px rgb(0 0 0 / 35%);
  transition: transform var(--dur-hover) ease, border-color var(--dur-hover) ease, box-shadow var(--dur-hover) ease;
  color: var(--fg0);
}

.social :deep(svg) {
  opacity: 0.95;
}

.social:hover {
  transform: translateY(-2px);
  border-color: rgb(255 106 0 / 35%);
  box-shadow: 0 16px 34px rgb(0 0 0 / 40%), 0 0 0 2px var(--accent-soft);
}

.social:focus-visible {
  box-shadow: 0 0 0 3px var(--focus), 0 16px 34px rgb(0 0 0 / 40%);
  border-color: rgb(255 106 0 / 50%);
}

.social__tooltip {
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translate(-50%, -100%);
  padding: 6px 10px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(243 246 255 / 92%);
  background: rgb(10 12 18 / 92%);
  border: 1px solid var(--line-strong);
  border-radius: 10px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 120ms ease, transform 120ms ease;
}

.social:hover .social__tooltip,
.social:focus-visible .social__tooltip {
  opacity: 1;
  transform: translate(-50%, calc(-100% - 4px));
}

/* --- labeled variant: icon + always-visible text, e.g. the resume link --- */
.social--labeled {
  display: inline-flex;
  flex-direction: row;
  width: auto;
  height: 40px;
  padding: 0 16px 0 12px;
  gap: 8px;
}

.social__label {
  font-size: 13px;
  color: var(--fg0);
  white-space: nowrap;
}
</style>
