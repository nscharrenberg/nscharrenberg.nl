// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTypewriter } from '~/composables/useTypewriter'

const OPTS = { startDelayMs: 5, typingMs: 5, deletingMs: 5, holdMs: 10, gapMs: 5 }

function harness(phrases: string[]) {
  return defineComponent({
    setup() {
      const { text } = useTypewriter(phrases, OPTS)
      return () => h('span', text.value)
    },
  })
}

/** Steps fake time forward in small increments, recording the rendered text after each step. */
async function collect(wrapper: ReturnType<typeof mount>, steps: number, stepMs = 5) {
  const seen: string[] = []
  for (let i = 0; i < steps; i++) {
    await vi.advanceTimersByTimeAsync(stepMs)
    seen.push(wrapper.text())
  }
  return seen
}

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('types a phrase forward to completion', async () => {
    const wrapper = mount(harness(['Hi']))
    const seen = await collect(wrapper, 10)

    expect(seen).toContain('Hi')
  })

  it('cycles through every phrase, fully typing each one in order', async () => {
    const wrapper = mount(harness(['Hi', 'Yo']))
    const seen = await collect(wrapper, 40)

    const firstHi = seen.indexOf('Hi')
    const firstYo = seen.indexOf('Yo')

    expect(firstHi).toBeGreaterThanOrEqual(0)
    expect(firstYo).toBeGreaterThan(firstHi)
  })

  it('shows a single phrase statically without scheduling a rotation', async () => {
    const wrapper = mount(harness(['Only one']))

    await vi.advanceTimersByTimeAsync(1000)
    expect(wrapper.text()).toBe('Only one')
  })
})
