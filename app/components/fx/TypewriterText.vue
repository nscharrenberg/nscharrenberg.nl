<script setup lang="ts">
import { useTypewriter } from '~/composables/useTypewriter'

interface Props {
  /** Phrases typed and deleted in a loop, one after another. */
  phrases: string[]
}

const props = defineProps<Props>()
const { text } = useTypewriter(props.phrases)
</script>

<template>
  <span class="typewriter">
    <span class="typewriter__text">{{ text }}</span>
    <span class="typewriter__cursor" aria-hidden="true">▌</span>
  </span>
</template>

<style scoped>
.typewriter {
  position: relative;
  white-space: nowrap;
  display: inline-flex;
  align-items: baseline;
  gap: 10px;
}

.typewriter__cursor {
  display: inline-block;
  width: 10px;
  color: rgb(255 106 0 / 95%);
  transform: translateY(-1px);
  animation: blink var(--dur-cursor) steps(2, end) infinite;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .typewriter__cursor {
    animation: none;
    opacity: 0;
  }
}
</style>
