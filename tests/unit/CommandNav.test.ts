// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'

const { routeMock } = vi.hoisted(() => ({ routeMock: { path: '/' } }))
mockNuxtImport('useRoute', () => () => routeMock)

const { openMock } = vi.hoisted(() => ({ openMock: vi.fn() }))
mockNuxtImport('useCommandPalette', () => () => ({ open: openMock, close: vi.fn(), toggle: vi.fn(), isOpen: { value: false } }))

const CommandNav = (await import('~/components/layout/CommandNav.vue')).default

describe('CommandNav', () => {
  it('marks the home link active only on the exact root path', () => {
    routeMock.path = '/'
    const wrapper = mount(CommandNav)

    const links = wrapper.findAll('.nav__link')
    expect(links[0]!.classes()).toContain('nav__link--active')
    expect(links[1]!.classes()).not.toContain('nav__link--active')
  })

  it('marks a nested route active via startsWith, and not the home link', () => {
    routeMock.path = '/projects/psalm'
    const wrapper = mount(CommandNav)

    const links = wrapper.findAll('.nav__link')
    expect(links[0]!.classes()).not.toContain('nav__link--active')
    const projects = links.find((l) => l.text().includes('~/projects'))
    expect(projects!.classes()).toContain('nav__link--active')
  })

  it('shows the active link\'s path in the prompt, falling back to the raw route path', () => {
    routeMock.path = '/about'
    const withMatch = mount(CommandNav)
    expect(withMatch.find('.nav__path').text()).toBe('~/about')

    routeMock.path = '/unknown-route'
    const withoutMatch = mount(CommandNav)
    expect(withoutMatch.find('.nav__path').text()).toBe('/unknown-route')
  })

  it('opens the command palette when the search button is clicked', async () => {
    routeMock.path = '/'
    const wrapper = mount(CommandNav)

    await wrapper.find('.nav__search').trigger('click')

    expect(openMock).toHaveBeenCalled()
  })

  it('renders a tab bar link for every nav entry', () => {
    routeMock.path = '/'
    const wrapper = mount(CommandNav)

    expect(wrapper.findAll('.tabbar__link')).toHaveLength(6)
  })
})
