<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { usePrefersReducedMotion } from '~/composables/usePrefersReducedMotion'

interface Props {
  /** Element/wrapper to render as. */
  tag?: string
  /** Stagger delay in ms — pass index * 60 or similar for list items. */
  delay?: number
}

const props = withDefaults(defineProps<Props>(), { tag: 'div', delay: 0 })

const target = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const prefersReducedMotion = usePrefersReducedMotion()

onMounted(() => {
  if (prefersReducedMotion.value) {
    isVisible.value = true
    return
  }

  const { stop } = useIntersectionObserver(
    target,
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
        stop()
      }
    },
    { threshold: 0.2 },
  )
})
</script>

<template>
  <component
    :is="tag"
    ref="target"
    class="reveal"
    :class="{ 'reveal--visible': isVisible }"
    :style="{ transitionDelay: `${props.delay}ms` }"
  >
    <slot />
  </component>
</template>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 560ms cubic-bezier(0.16, 1, 0.3, 1), transform 560ms cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal--visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
