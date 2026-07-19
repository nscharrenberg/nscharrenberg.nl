<script setup lang="ts">
interface Props {
  /** Icon size in pixels, applied to both width and height. */
  size?: number
}

withDefaults(defineProps<Props>(), { size: 24 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.6" />
    <line x1="12" y1="11" x2="12" y2="16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    <circle cx="12" cy="8.2" r="1" fill="currentColor" />
  </svg>
</template>
