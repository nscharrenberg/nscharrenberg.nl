// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ref } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'

mockNuxtImport('usePrefersReducedMotion', () => {
  const prefersReducedMotion = ref(false)
  ;(globalThis as { __prefersReducedMotion?: typeof prefersReducedMotion }).__prefersReducedMotion = prefersReducedMotion
  return () => prefersReducedMotion
})

const AmbientGlyphs = (await import('~/components/fx/AmbientGlyphs.vue')).default
const prefersReducedMotion = (globalThis as { __prefersReducedMotion: ReturnType<typeof ref<boolean>> }).__prefersReducedMotion

afterEach(() => {
  vi.restoreAllMocks()
})

describe('AmbientGlyphs', () => {
  it('renders a canvas when motion is not reduced', () => {
    prefersReducedMotion.value = false
    const wrapper = mount(AmbientGlyphs)

    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  it('renders nothing when motion is reduced', () => {
    prefersReducedMotion.value = true
    const wrapper = mount(AmbientGlyphs)

    expect(wrapper.find('canvas').exists()).toBe(false)
    expect(wrapper.html()).toBe('<!--v-if-->')
  })

  it('sizes the canvas to the window on mount and on resize', () => {
    prefersReducedMotion.value = false
    Object.defineProperty(window, 'innerWidth', { value: 800, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 600, configurable: true })
    const wrapper = mount(AmbientGlyphs, { attachTo: document.body })

    const canvas = wrapper.find('canvas').element as HTMLCanvasElement
    expect(canvas.width).toBe(800)
    expect(canvas.height).toBe(600)

    Object.defineProperty(window, 'innerWidth', { value: 400, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 300, configurable: true })
    window.dispatchEvent(new Event('resize'))

    expect(canvas.width).toBe(400)
    expect(canvas.height).toBe(300)
    wrapper.unmount()
  })

  it('cancels the animation frame while the tab is hidden, and resumes when visible again', () => {
    prefersReducedMotion.value = false
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(42)
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
    const wrapper = mount(AmbientGlyphs, { attachTo: document.body })
    rafSpy.mockClear()

    Object.defineProperty(document, 'hidden', { value: true, configurable: true })
    document.dispatchEvent(new Event('visibilitychange'))
    expect(cancelSpy).toHaveBeenCalled()

    Object.defineProperty(document, 'hidden', { value: false, configurable: true })
    document.dispatchEvent(new Event('visibilitychange'))
    expect(rafSpy).toHaveBeenCalled()

    wrapper.unmount()
  })

  it('does not resume the animation on visibilitychange when motion is reduced mid-session', () => {
    prefersReducedMotion.value = false
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(42)
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
    const wrapper = mount(AmbientGlyphs, { attachTo: document.body })

    Object.defineProperty(document, 'hidden', { value: true, configurable: true })
    document.dispatchEvent(new Event('visibilitychange'))
    rafSpy.mockClear()

    prefersReducedMotion.value = true
    Object.defineProperty(document, 'hidden', { value: false, configurable: true })
    document.dispatchEvent(new Event('visibilitychange'))

    expect(rafSpy).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('stops the animation loop and detaches listeners on unmount', () => {
    prefersReducedMotion.value = false
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
    const removeWindowSpy = vi.spyOn(window, 'removeEventListener')
    const removeDocSpy = vi.spyOn(document, 'removeEventListener')
    const wrapper = mount(AmbientGlyphs, { attachTo: document.body })

    wrapper.unmount()

    expect(cancelSpy).toHaveBeenCalled()
    expect(removeWindowSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    expect(removeDocSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function))
  })

  it('draws and ages glyphs each frame, spawning new ones and dropping ones that fell offscreen', () => {
    prefersReducedMotion.value = false
    // happy-dom has no real Canvas 2D backend — stub just enough of the API
    // for tick()'s drawing calls to run instead of no-op on a null context.
    const ctx = {
      clearRect: vi.fn(),
      fillText: vi.fn(),
      font: '',
      fillStyle: '',
    }
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(ctx as unknown as CanvasRenderingContext2D)
    Object.defineProperty(window, 'innerWidth', { value: 800, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 600, configurable: true })

    let tick: FrameRequestCallback | undefined
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      tick = cb
      return 1
    })
    // Guarantee spawn() passes its random chance check.
    vi.spyOn(Math, 'random').mockReturnValue(0.001)

    const wrapper = mount(AmbientGlyphs, { attachTo: document.body })
    expect(tick).toBeTypeOf('function')

    tick!(0)
    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 800, 600)
    expect(ctx.fillText).toHaveBeenCalledTimes(1)

    // Push the spawned glyph far past the bottom edge, then tick again — it
    // should be filtered out and nothing left to draw.
    Math.random = () => 0.999
    for (let i = 0; i < 2000; i++) tick!(0)
    ctx.fillText.mockClear()
    tick!(0)
    expect(ctx.fillText).not.toHaveBeenCalled()

    wrapper.unmount()
  })
})
