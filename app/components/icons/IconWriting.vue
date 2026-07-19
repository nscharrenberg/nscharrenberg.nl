<script setup lang="ts">
interface Props {
  /** Icon size in pixels, applied to both width and height. */
  size?: number
}

withDefaults(defineProps<Props>(), { size: 24 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M15.5 4.5 19.5 8.5 8 20H4v-4L15.5 4.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
    <path d="M13.5 6.5 17.5 10.5" stroke="currentColor" stroke-width="1.6" />
  </svg>
</template>
