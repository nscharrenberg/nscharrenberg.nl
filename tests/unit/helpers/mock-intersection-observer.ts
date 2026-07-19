import { vi } from 'vitest'

/**
 * happy-dom doesn't implement IntersectionObserver, and @vueuse's
 * useIntersectionObserver no-ops silently without it. This stub lets tests
 * manually fire an intersection to exercise the "element became visible"
 * branch of components that use it (DecryptText, Reveal).
 */
export class MockIntersectionObserver implements IntersectionObserver {
  static instances: MockIntersectionObserver[] = []

  root = null
  rootMargin = ''
  thresholds: ReadonlyArray<number> = []
  callback: IntersectionObserverCallback

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    MockIntersectionObserver.instances.push(this)
  }

  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = () => []

  trigger(isIntersecting: boolean) {
    this.callback([{ isIntersecting } as IntersectionObserverEntry], this)
  }
}

export function installMockIntersectionObserver() {
  MockIntersectionObserver.instances = []
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  return MockIntersectionObserver
}
