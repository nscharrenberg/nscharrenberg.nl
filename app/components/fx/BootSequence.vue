<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { usePrefersReducedMotion } from '~/composables/usePrefersReducedMotion'

// One-time boot flourish on first visit each session. Purely decorative and
// always skippable — never gates the real content underneath, which is
// already rendered and gets revealed the moment this closes.
const SCRIPT = [
  'booting nscharrenberg.nl',
  'loading profile: Noah Scharrenberg',
  'role: AI Engineer / Software Engineer',
  'connection secure — welcome',
]
const LINE_MS = 220
const HOLD_MS = 500

const prefersReducedMotion = usePrefersReducedMotion()
const visible = ref(false)
const lines = ref<string[]>([])

const timers: ReturnType<typeof setTimeout>[] = []

function finish() {
  if (!visible.value) return
  visible.value = false
  timers.forEach(clearTimeout)
  window.removeEventListener('keydown', finish)
  sessionStorage.setItem('booted', '1')
}

onMounted(() => {
  if (prefersReducedMotion.value || sessionStorage.getItem('booted')) return

  visible.value = true
  window.addEventListener('keydown', finish)

  SCRIPT.forEach((line, i) => {
    timers.push(
      setTimeout(() => {
        lines.value.push(line)
      }, i * LINE_MS),
    )
  })
  timers.push(setTimeout(finish, SCRIPT.length * LINE_MS + HOLD_MS))
})

onBeforeUnmount(() => {
  timers.forEach(clearTimeout)
  window.removeEventListener('keydown', finish)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="boot">
      <div v-if="visible" class="boot" aria-hidden="true" @click="finish">
        <div class="boot__lines">
          <p v-for="(line, i) in lines" :key="i" class="boot__line">
            <span class="boot__prompt">&gt;</span> {{ line }}
          </p>
          <span class="boot__cursor">▌</span>
        </div>
        <p class="boot__skip">click or press any key to skip</p>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.boot {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  background: var(--bg0);
  cursor: pointer;
}

.boot__lines {
  font-size: 14px;
  color: var(--fg1);
  display: grid;
  gap: 8px;
}

.boot__prompt {
  color: var(--accent);
}

.boot__cursor {
  color: var(--accent);
  animation: blink var(--dur-cursor) steps(2, end) infinite;
}

.boot__skip {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg2);
  margin: 0;
}

.boot-leave-active {
  transition: opacity 320ms ease;
}

.boot-leave-to {
  opacity: 0;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
</style>
