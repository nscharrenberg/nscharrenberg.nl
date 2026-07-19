// @vitest-environment nuxt
import type { VueWrapper } from '@vue/test-utils'
import { DOMWrapper, mount } from '@vue/test-utils'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { nextTick, ref } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

mockNuxtImport('usePrefersReducedMotion', () => {
  const prefersReducedMotion = ref(false)
  ;(globalThis as { __prefersReducedMotion?: typeof prefersReducedMotion }).__prefersReducedMotion = prefersReducedMotion
  return () => prefersReducedMotion
})

const BootSequence = (await import('~/components/fx/BootSequence.vue')).default
const prefersReducedMotion = (globalThis as { __prefersReducedMotion: ReturnType<typeof ref<boolean>> }).__prefersReducedMotion

function body() {
  return new DOMWrapper(document.body)
}

let currentWrapper: VueWrapper | undefined

afterEach(() => {
  currentWrapper?.unmount()
  currentWrapper = undefined
  document.body.innerHTML = ''
  sessionStorage.clear()
  vi.useRealTimers()
})

describe('BootSequence', () => {
  beforeEach(() => {
    prefersReducedMotion.value = false
    sessionStorage.clear()
    vi.useFakeTimers()
  })

  it('plays on first mount and reveals lines one at a time', async () => {
    currentWrapper = mount(BootSequence, { attachTo: document.body })
    await nextTick()

    expect(body().find('.boot').exists()).toBe(true)
    expect(body().findAll('.boot__line')).toHaveLength(0)

    // The first line has a 0ms delay, so it appears alongside the 220ms one
    // the moment the clock advances at all.
    await vi.advanceTimersByTimeAsync(220)
    expect(body().findAll('.boot__line')).toHaveLength(2)

    await vi.advanceTimersByTimeAsync(220 * 2)
    expect(body().findAll('.boot__line')).toHaveLength(4)
  })

  it('finishes automatically after the full sequence plus hold time, and records it in sessionStorage', async () => {
    currentWrapper = mount(BootSequence, { attachTo: document.body })

    await vi.advanceTimersByTimeAsync(4 * 220 + 500)

    expect(body().find('.boot').exists()).toBe(false)
    expect(sessionStorage.getItem('booted')).toBe('1')
  })

  it('skips on click', async () => {
    currentWrapper = mount(BootSequence, { attachTo: document.body })
    await nextTick()

    await body().find('.boot').trigger('click')

    expect(body().find('.boot').exists()).toBe(false)
    expect(sessionStorage.getItem('booted')).toBe('1')
  })

  it('skips on any keypress', async () => {
    currentWrapper = mount(BootSequence, { attachTo: document.body })

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    await vi.advanceTimersByTimeAsync(0)

    expect(body().find('.boot').exists()).toBe(false)
  })

  it('does not render at all when motion is reduced', () => {
    prefersReducedMotion.value = true
    currentWrapper = mount(BootSequence, { attachTo: document.body })

    expect(body().find('.boot').exists()).toBe(false)
    expect(sessionStorage.getItem('booted')).toBeNull()
  })

  it('does not replay once already booted this session', () => {
    sessionStorage.setItem('booted', '1')
    currentWrapper = mount(BootSequence, { attachTo: document.body })

    expect(body().find('.boot').exists()).toBe(false)
  })

  it('is a no-op to finish twice (e.g. a keypress after auto-finish already ran)', async () => {
    currentWrapper = mount(BootSequence, { attachTo: document.body })
    await vi.advanceTimersByTimeAsync(4 * 220 + 500)
    expect(sessionStorage.getItem('booted')).toBe('1')

    sessionStorage.removeItem('booted')
    // finish() already removed the keydown listener, so this should be a no-op.
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))

    expect(sessionStorage.getItem('booted')).toBeNull()
  })

  it('clears pending timers and listeners on unmount before they fire', async () => {
    const wrapper = mount(BootSequence, { attachTo: document.body })
    const removeSpy = vi.spyOn(window, 'removeEventListener')

    wrapper.unmount()

    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    await vi.advanceTimersByTimeAsync(4 * 220 + 500)
    expect(sessionStorage.getItem('booted')).toBeNull()
  })
})
