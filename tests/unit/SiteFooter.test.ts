// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ref } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// `ref()` can't be called inside `vi.hoisted` (it runs before imports are
// bound), so the ref is created lazily inside the mock factory and exposed
// on globalThis for tests to flip.
mockNuxtImport('usePrefersReducedMotion', () => {
  const prefersReducedMotion = ref(false)
  ;(globalThis as { __prefersReducedMotion?: typeof prefersReducedMotion }).__prefersReducedMotion = prefersReducedMotion
  return () => prefersReducedMotion
})

const SiteFooter = (await import('~/components/layout/SiteFooter.vue')).default
const prefersReducedMotion = (globalThis as { __prefersReducedMotion: ReturnType<typeof ref<boolean>> }).__prefersReducedMotion

describe('SiteFooter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows the copyright line with the current year', () => {
    const wrapper = mount(SiteFooter)

    expect(wrapper.find('.footer__copy').text()).toBe(`© ${new Date().getFullYear()} Noah Scharrenberg`)
  })

  it('counts a live session uptime when motion is not reduced', async () => {
    prefersReducedMotion.value = false
    const wrapper = mount(SiteFooter)

    expect(wrapper.find('.footer__status').text()).toContain('session 00:00:00')

    await vi.advanceTimersByTimeAsync(2000)
    expect(wrapper.find('.footer__status').text()).toContain('session 00:00:02')
  })

  it('hides the session timer and stays static when motion is reduced', async () => {
    prefersReducedMotion.value = true
    const wrapper = mount(SiteFooter)

    expect(wrapper.find('.footer__status').text()).not.toContain('session')
    expect(wrapper.find('.footer__status').text()).toContain('rebuilt')

    await vi.advanceTimersByTimeAsync(2000)
    expect(wrapper.find('.footer__status').text()).not.toContain('session')
  })

  it('stops the uptime timer on unmount', async () => {
    prefersReducedMotion.value = false
    const wrapper = mount(SiteFooter)
    await vi.advanceTimersByTimeAsync(1000)
    expect(wrapper.find('.footer__status').text()).toContain('session 00:00:01')

    wrapper.unmount()
    await vi.advanceTimersByTimeAsync(3000)

    expect(vi.getTimerCount()).toBe(0)
  })

  it('links to the colophon, email, and repo', () => {
    prefersReducedMotion.value = false
    const wrapper = mount(SiteFooter)

    const nuxtLink = wrapper.findComponent({ name: 'NuxtLink' })
    expect(nuxtLink.props('to')).toBe('/colophon')
    expect(wrapper.find('a[href^="https://github.com"]').exists()).toBe(true)
  })
})
