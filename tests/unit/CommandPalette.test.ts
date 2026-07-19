// @vitest-environment nuxt
import type { VueWrapper } from '@vue/test-utils'
import { DOMWrapper, mount } from '@vue/test-utils'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'

const { navigateToMock } = vi.hoisted(() => ({ navigateToMock: vi.fn() }))
mockNuxtImport('navigateTo', () => navigateToMock)

mockNuxtImport('queryCollection', () => {
  return () => ({
    select: () => ({
      all: async () => [{ title: 'Copyright and LLMs', path: '/writing/copyright-and-llms' }],
    }),
  })
})

const { useCommandPalette } = await import('~/composables/useCommandPalette')
const CommandPalette = (await import('~/components/layout/CommandPalette.vue')).default

/** CommandPalette teleports to <body>, outside the mounted wrapper's own subtree. */
function body() {
  return new DOMWrapper(document.body)
}

let currentWrapper: VueWrapper | undefined

function mountPalette() {
  currentWrapper = mount(CommandPalette, { attachTo: document.body })
  return currentWrapper
}

async function openPalette() {
  mountPalette()
  useCommandPalette().open()
  await nextTick()
  await nextTick()
}

afterEach(() => {
  useCommandPalette().close()
  navigateToMock.mockClear()
  // Unmounts the global keydown listener registered in onMounted — without
  // this, listeners from earlier tests pile up on `window` and a single
  // dispatched event fires all of them at once.
  currentWrapper?.unmount()
  currentWrapper = undefined
  document.body.innerHTML = ''
})

describe('CommandPalette', () => {
  it('is hidden until opened', () => {
    mountPalette()

    expect(body().find('[role="dialog"]').exists()).toBe(false)
  })

  it('renders the static commands and loaded writing posts once opened', async () => {
    await openPalette()

    expect(body().find('[role="dialog"]').exists()).toBe(true)
    expect(body().text()).toContain('Home')
    expect(body().text()).toContain('Copyright and LLMs')
  })

  it('filters results as the query changes', async () => {
    await openPalette()

    await body().find('input').setValue('resume')

    const items = body().findAll('[role="option"]')
    expect(items).toHaveLength(1)
    expect(items[0]!.text()).toContain('Resume')
  })

  it('shows an empty state when nothing matches', async () => {
    await openPalette()

    await body().find('input').setValue('zzz-no-match')

    expect(body().find('.panel__empty').exists()).toBe(true)
    expect(body().find('[role="listbox"]').exists()).toBe(false)
  })

  it('moves the active option with ArrowDown/ArrowUp, clamped to the result bounds', async () => {
    await openPalette()

    const input = body().find('input')
    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(body().findAll('[role="option"]')[0]!.attributes('aria-selected')).toBe('true')

    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(body().findAll('[role="option"]')[1]!.attributes('aria-selected')).toBe('true')
  })

  it('traps Tab inside the dialog instead of letting focus escape', async () => {
    await openPalette()

    const event = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true })
    body().find('input').element.dispatchEvent(event)
    expect(event.defaultPrevented).toBe(true)
  })

  it('moves the active option on hover', async () => {
    await openPalette()

    await body().findAll('[role="option"]')[1]!.trigger('mouseenter')
    expect(body().findAll('[role="option"]')[1]!.attributes('aria-selected')).toBe('true')
  })

  it('ignores keys it does not handle', async () => {
    await openPalette()

    await body().find('input').trigger('keydown', { key: 'a' })

    expect(useCommandPalette().isOpen.value).toBe(true)
    expect(navigateToMock).not.toHaveBeenCalled()
  })

  it('does nothing on Enter when there are no results', async () => {
    await openPalette()

    await body().find('input').setValue('zzz-no-match')
    await body().find('input').trigger('keydown', { key: 'Enter' })

    expect(navigateToMock).not.toHaveBeenCalled()
  })

  it('does not reload writing posts on a second open', async () => {
    await openPalette()
    useCommandPalette().close()
    await nextTick()
    useCommandPalette().open()
    await nextTick()
    await nextTick()

    expect(body().text()).toContain('Copyright and LLMs')
  })

  it('navigates to the active command and closes on Enter', async () => {
    await openPalette()

    await body().find('input').trigger('keydown', { key: 'Enter' })

    expect(navigateToMock).toHaveBeenCalledWith('/')
    expect(useCommandPalette().isOpen.value).toBe(false)
  })

  it('navigates to a command on click', async () => {
    await openPalette()

    await body().find('input').setValue('about')
    await body().find('[role="option"]').trigger('click')

    expect(navigateToMock).toHaveBeenCalledWith('/about')
  })

  it('closes on Escape', async () => {
    await openPalette()

    await body().find('input').trigger('keydown', { key: 'Escape' })

    expect(useCommandPalette().isOpen.value).toBe(false)
  })

  it('closes when clicking the overlay backdrop', async () => {
    await openPalette()

    await body().find('.overlay').trigger('click')

    expect(useCommandPalette().isOpen.value).toBe(false)
  })

  it('toggles open on Ctrl+K and closes on Escape globally', async () => {
    mountPalette()
    await nextTick()
    expect(useCommandPalette().isOpen.value).toBe(false)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))
    expect(useCommandPalette().isOpen.value).toBe(true)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(useCommandPalette().isOpen.value).toBe(false)
  })
})
