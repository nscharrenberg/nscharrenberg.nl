<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { usePrefersReducedMotion } from '~/composables/usePrefersReducedMotion'

interface Props {
  /** Final text — scrambles through random characters before resolving to this once it enters the viewport. */
  text: string
  /** Element/heading level to render as. */
  tag?: string
}

const props = withDefaults(defineProps<Props>(), { tag: 'span' })

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01!<>-_/[]{}=+*^#'
const FRAMES = 16
const FRAME_MS = 26

const display = ref(props.text)
const target = ref<HTMLElement | null>(null)
const prefersReducedMotion = usePrefersReducedMotion()

let timer: ReturnType<typeof setInterval> | undefined

function scramble() {
  const full = props.text
  let frame = 0

  timer = setInterval(() => {
    frame += 1
    const revealCount = Math.round((frame / FRAMES) * full.length)

    display.value = full
      .split('')
      .map((ch, i) => {
        if (ch === ' ') return ' '
        if (i < revealCount) return ch
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      })
      .join('')

    if (frame >= FRAMES) {
      display.value = full
      clearInterval(timer)
    }
  }, FRAME_MS)
}

onMounted(() => {
  if (prefersReducedMotion.value) return

  const { stop } = useIntersectionObserver(
    target,
    ([entry]) => {
      if (entry?.isIntersecting) {
        scramble()
        stop()
      }
    },
    { threshold: 0.4 },
  )
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <component :is="tag" ref="target" class="decrypt">{{ display }}</component>
</template>

<style scoped>
.decrypt {
  font-variant-ligatures: none;
}
</style>
