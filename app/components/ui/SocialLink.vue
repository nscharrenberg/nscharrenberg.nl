<script setup lang="ts">
interface Props {
  href: string
  label: string
  /** Internal Nuxt route — renders a <NuxtLink> instead of an external <a target="_blank">. */
  internal?: boolean
}

withDefaults(defineProps<Props>(), { internal: false })
</script>

<template>
  <component
    :is="internal ? 'NuxtLink' : 'a'"
    class="social"
    :to="internal ? href : undefined"
    :href="internal ? undefined : href"
    :target="internal ? undefined : '_blank'"
    :rel="internal ? undefined : 'me noopener noreferrer'"
    :aria-label="label"
  >
    <span class="social__tooltip" role="tooltip">{{ label }}</span>
    <slot />
  </component>
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
  width: 22px;
  height: 22px;
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
</style>
