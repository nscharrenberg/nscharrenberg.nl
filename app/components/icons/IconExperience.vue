<script setup lang="ts">
interface Props {
  /** Icon size in pixels, applied to both width and height. */
  size?: number
}

withDefaults(defineProps<Props>(), { size: 24 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3.5" y="8" width="17" height="11" rx="1.5" stroke="currentColor" stroke-width="1.6" />
    <path d="M8.5 8V6a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 6v2" stroke="currentColor" stroke-width="1.6" />
    <path d="M3.5 13h17" stroke="currentColor" stroke-width="1.6" />
  </svg>
</template>
