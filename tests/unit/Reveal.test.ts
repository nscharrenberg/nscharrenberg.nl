// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { nextTick, ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { installMockIntersectionObserver } from './helpers/mock-intersection-observer'

mockNuxtImport('usePrefersReducedMotion', () => {
  const prefersReducedMotion = ref(false)
  ;(globalThis as { __prefersReducedMotion?: typeof prefersReducedMotion }).__prefersReducedMotion = prefersReducedMotion
  return () => prefersReducedMotion
})

const Reveal = (await import('~/components/fx/Reveal.vue')).default
const prefersReducedMotion = (globalThis as { __prefersReducedMotion: ReturnType<typeof ref<boolean>> }).__prefersReducedMotion

describe('Reveal', () => {
  it('starts hidden and renders as a div by default', () => {
    prefersReducedMotion.value = false
    installMockIntersectionObserver()
    const wrapper = mount(Reveal, { slots: { default: 'Hello' } })

    expect(wrapper.classes()).not.toContain('reveal--visible')
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.text()).toBe('Hello')
  })

  it('renders as the given tag', () => {
    prefersReducedMotion.value = false
    installMockIntersectionObserver()
    const wrapper = mount(Reveal, { props: { tag: 'section' } })

    expect(wrapper.element.tagName).toBe('SECTION')
  })

  it('becomes visible once it intersects the viewport', async () => {
    prefersReducedMotion.value = false
    const IO = installMockIntersectionObserver()
    const wrapper = mount(Reveal)

    expect(wrapper.classes()).not.toContain('reveal--visible')
    IO.instances[0]!.trigger(true)
    await nextTick()

    expect(wrapper.classes()).toContain('reveal--visible')
  })

  it('stays hidden for a non-intersecting entry', async () => {
    prefersReducedMotion.value = false
    const IO = installMockIntersectionObserver()
    const wrapper = mount(Reveal)

    IO.instances[0]!.trigger(false)
    await nextTick()

    expect(wrapper.classes()).not.toContain('reveal--visible')
  })

  it('is visible immediately when motion is reduced, skipping the observer', async () => {
    prefersReducedMotion.value = true
    const IO = installMockIntersectionObserver()
    const wrapper = mount(Reveal)
    await nextTick()

    expect(wrapper.classes()).toContain('reveal--visible')
    expect(IO.instances).toHaveLength(0)
  })

  it('applies the delay prop as a transition-delay style', () => {
    prefersReducedMotion.value = false
    installMockIntersectionObserver()
    const wrapper = mount(Reveal, { props: { delay: 240 } })

    expect(wrapper.attributes('style')).toContain('transition-delay: 240ms')
  })
})
