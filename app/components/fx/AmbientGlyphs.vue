<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { usePrefersReducedMotion } from '~/composables/usePrefersReducedMotion'

// Sparse, low-opacity falling glyphs — an ambient touch exclusive to Home so
// the landing page reads as more atmospheric than the calmer inner pages.
// Capped glyph count and a slow fall speed keep this cheap; fully skipped
// under prefers-reduced-motion and paused when the tab isn't visible.
const FONT = '14px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
const CHARS = '01<>{}[]/\\#=+-.'
const COLUMN_WIDTH = 26
const FALL_SPEED = 0.35
const MAX_GLYPHS = 30
const SPAWN_CHANCE = 0.05
const COLORS = ['255 106 0', '0 255 123']

interface Glyph { x: number, y: number, char: string, alpha: number, color: string }

const canvasRef = ref<HTMLCanvasElement | null>(null)
const prefersReducedMotion = usePrefersReducedMotion()

let ctx: CanvasRenderingContext2D | null = null
let raf = 0
let glyphs: Glyph[] = []
let width = 0
let height = 0

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
}

function spawn() {
  if (glyphs.length >= MAX_GLYPHS || Math.random() > SPAWN_CHANCE) return
  glyphs.push({
    x: Math.floor(Math.random() * (width / COLUMN_WIDTH)) * COLUMN_WIDTH,
    y: -20,
    char: CHARS[Math.floor(Math.random() * CHARS.length)] ?? '0',
    alpha: 0.05 + Math.random() * 0.08,
    color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? COLORS[0]!,
  })
}

function tick() {
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)
  spawn()

  ctx.font = FONT
  glyphs = glyphs.filter((g) => g.y < height + 20)
  for (const g of glyphs) {
    g.y += FALL_SPEED
    ctx.fillStyle = `rgb(${g.color} / ${g.alpha})`
    ctx.fillText(g.char, g.x, g.y)
  }

  raf = requestAnimationFrame(tick)
}

function handleVisibility() {
  if (document.hidden) {
    cancelAnimationFrame(raf)
  } else if (!prefersReducedMotion.value) {
    raf = requestAnimationFrame(tick)
  }
}

onMounted(() => {
  if (prefersReducedMotion.value) return
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  document.addEventListener('visibilitychange', handleVisibility)
  raf = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
  document.removeEventListener('visibilitychange', handleVisibility)
})
</script>

<template>
  <canvas v-if="!prefersReducedMotion" ref="canvasRef" class="ambient" aria-hidden="true" />
</template>

<style scoped>
.ambient {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
</style>
