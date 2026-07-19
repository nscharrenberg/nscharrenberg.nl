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
      d="M4 7a1 1 0 0 1 1-1h4.5l1.5 2H19a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7Z"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linejoin="round"
    />
  </svg>
</template>
