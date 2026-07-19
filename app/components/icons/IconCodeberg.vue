<script setup lang="ts">
interface Props {
  /** Icon size in pixels, applied to both width and height. */
  size?: number
}

withDefaults(defineProps<Props>(), { size: 24 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9Z" stroke="currentColor" stroke-width="1.6" opacity="0.9" />
    <path
      d="M7.2 14.2c1.2 2.6 3.7 4.3 6.7 4.3 3.4 0 6.3-2.2 7.2-5.3-1.8.8-4.4.8-7.3-.4-2.7-1.1-4.8-1.1-6.6-.5Z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M9.3 9.2c1.2-.8 3.2-.8 5.1 0 1.9.8 3.3 2.2 3.7 3.5-1.1-.5-2.6-.9-4.3-.9-2.1 0-3.7.4-4.5 1 0-1.4 0-2.6 0-3.6Z"
      fill="currentColor"
      opacity="0.65"
    />
  </svg>
</template>
