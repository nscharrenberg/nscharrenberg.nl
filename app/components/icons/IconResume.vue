<script setup lang="ts">
interface Props {
  /** Icon size in pixels, applied to both width and height. */
  size?: number
}

withDefaults(defineProps<Props>(), { size: 24 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6.5 3.5h8l4 4v13a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linejoin="round"
    />
    <path d="M14 3.5v4h4" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
    <path d="M8.2 12h7.2M8.2 15h7.2M8.2 9h3.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
  </svg>
</template>
