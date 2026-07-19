// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ref } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { installMockIntersectionObserver } from './helpers/mock-intersection-observer'

mockNuxtImport('usePrefersReducedMotion', () => {
  const prefersReducedMotion = ref(false)
  ;(globalThis as { __prefersReducedMotion?: typeof prefersReducedMotion }).__prefersReducedMotion = prefersReducedMotion
  return () => prefersReducedMotion
})

const DecryptText = (await import('~/components/fx/DecryptText.vue')).default
const prefersReducedMotion = (globalThis as { __prefersReducedMotion: ReturnType<typeof ref<boolean>> }).__prefersReducedMotion

describe('DecryptText', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the full text immediately, before any intersection fires', () => {
    prefersReducedMotion.value = false
    installMockIntersectionObserver()
    const wrapper = mount(DecryptText, { props: { text: 'About' } })

    expect(wrapper.text()).toBe('About')
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('renders as the given tag', () => {
    prefersReducedMotion.value = false
    installMockIntersectionObserver()
    const wrapper = mount(DecryptText, { props: { text: 'About', tag: 'h1' } })

    expect(wrapper.element.tagName).toBe('H1')
  })

  it('scrambles then resolves back to the full text once it intersects', async () => {
    prefersReducedMotion.value = false
    const IO = installMockIntersectionObserver()
    const wrapper = mount(DecryptText, { props: { text: 'About' } })

    IO.instances[0]!.trigger(true)
    await vi.advanceTimersByTimeAsync(26)
    // Mid-scramble: same length, but not guaranteed to equal the source text.
    expect(wrapper.text()).toHaveLength('About'.length)

    await vi.advanceTimersByTimeAsync(26 * 16)
    expect(wrapper.text()).toBe('About')
  })

  it('preserves spaces during the scramble', async () => {
    prefersReducedMotion.value = false
    const IO = installMockIntersectionObserver()
    const wrapper = mount(DecryptText, { props: { text: 'Noah Scharrenberg' } })

    IO.instances[0]!.trigger(true)
    await vi.advanceTimersByTimeAsync(26)

    expect(wrapper.text()[4]).toBe(' ')
  })

  it('ignores a non-intersecting entry and never starts scrambling', async () => {
    prefersReducedMotion.value = false
    const IO = installMockIntersectionObserver()
    const wrapper = mount(DecryptText, { props: { text: 'About' } })

    IO.instances[0]!.trigger(false)
    await vi.advanceTimersByTimeAsync(1000)

    expect(wrapper.text()).toBe('About')
  })

  it('skips the intersection observer entirely when motion is reduced', () => {
    prefersReducedMotion.value = true
    const IO = installMockIntersectionObserver()
    mount(DecryptText, { props: { text: 'About' } })

    expect(IO.instances).toHaveLength(0)
  })

  it('clears the scramble interval on unmount', async () => {
    prefersReducedMotion.value = false
    const IO = installMockIntersectionObserver()
    const wrapper = mount(DecryptText, { props: { text: 'About' } })

    IO.instances[0]!.trigger(true)
    await vi.advanceTimersByTimeAsync(26)

    wrapper.unmount()
    expect(vi.getTimerCount()).toBe(0)
  })
})
