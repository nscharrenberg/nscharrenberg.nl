export interface UseTypewriterOptions {
  typingMs?: number
  deletingMs?: number
  holdMs?: number
  gapMs?: number
  startDelayMs?: number
}

/**
 * Types out and rotates through a list of phrases, letter by letter.
 * Falls back to displaying the first phrase statically when the user
 * prefers reduced motion, or when there's only one phrase to show.
 */
export function useTypewriter(phrases: string[], options: UseTypewriterOptions = {}) {
  const {
    typingMs = 55,
    deletingMs = 28,
    holdMs = 1200,
    gapMs = 280,
    startDelayMs = 300,
  } = options

  const text = ref('')
  const prefersReducedMotion = usePrefersReducedMotion()

  let phraseIndex = 0
  let mode: 'typing' | 'holding' | 'deleting' = 'typing'
  let timer: ReturnType<typeof setTimeout> | undefined

  function tick() {
    const full = phrases[phraseIndex] ?? ''

    if (mode === 'typing') {
      text.value = full.slice(0, text.value.length + 1)
      if (text.value === full) {
        mode = 'holding'
        timer = setTimeout(tick, holdMs)
        return
      }
      timer = setTimeout(tick, typingMs)
      return
    }

    if (mode === 'holding') {
      mode = 'deleting'
      timer = setTimeout(tick, gapMs)
      return
    }

    // mode === 'deleting'
    text.value = text.value.slice(0, -1)
    if (text.value.length === 0) {
      phraseIndex = (phraseIndex + 1) % phrases.length
      mode = 'typing'
      timer = setTimeout(tick, gapMs)
      return
    }
    timer = setTimeout(tick, deletingMs)
  }

  onMounted(() => {
    if (prefersReducedMotion.value || phrases.length <= 1) {
      text.value = phrases[0] ?? ''
      return
    }
    timer = setTimeout(tick, startDelayMs)
  })

  onBeforeUnmount(() => clearTimeout(timer))

  return { text: readonly(text) }
}
