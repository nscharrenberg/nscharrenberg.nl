// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import type { Project } from '~/types/project'

mockNuxtImport('usePrefersReducedMotion', () => {
  const prefersReducedMotion = ref(false)
  ;(globalThis as { __prefersReducedMotion?: typeof prefersReducedMotion }).__prefersReducedMotion = prefersReducedMotion
  return () => prefersReducedMotion
})

const CaseFile = (await import('~/components/portfolio/CaseFile.vue')).default
const prefersReducedMotion = (globalThis as { __prefersReducedMotion: ReturnType<typeof ref<boolean>> }).__prefersReducedMotion

const PROJECT: Project = {
  slug: 'psalm',
  title: 'PSALM',
  summary: 'A literature review pipeline.',
  stack: ['Python', 'LangChain'],
  links: [],
}

describe('CaseFile', () => {
  it('renders a zero-padded, 1-indexed case number', () => {
    const wrapper = mount(CaseFile, { props: { project: PROJECT, index: 0 } })
    expect(wrapper.find('.file__case').text()).toBe('CASE Nº 001')

    const tenth = mount(CaseFile, { props: { project: PROJECT, index: 9 } })
    expect(tenth.find('.file__case').text()).toBe('CASE Nº 010')
  })

  it('defaults the status stamp to Published when none is set', () => {
    const wrapper = mount(CaseFile, { props: { project: PROJECT, index: 0 } })
    expect(wrapper.find('.file__stamp').text()).toBe('Published')
  })

  it('shows an explicit status when set', () => {
    const wrapper = mount(CaseFile, { props: { project: { ...PROJECT, status: 'In progress' }, index: 0 } })
    expect(wrapper.find('.file__stamp').text()).toBe('In progress')
  })

  it('links the title and the "Open case file" link to the project slug', () => {
    const wrapper = mount(CaseFile, { props: { project: PROJECT, index: 0 } })

    const links = wrapper.findAllComponents({ name: 'NuxtLink' })
    expect(links).toHaveLength(2)
    for (const link of links) {
      expect(link.props('to')).toBe('/projects/psalm')
    }
  })

  it('renders every stack tag', () => {
    const wrapper = mount(CaseFile, { props: { project: PROJECT, index: 0 } })

    const tags = wrapper.findAll('.file__tag')
    expect(tags.map((t) => t.text())).toEqual(['Python', 'LangChain'])
  })

  it('tracks the pointer position as CSS custom properties on mousemove', async () => {
    prefersReducedMotion.value = false
    const wrapper = mount(CaseFile, { props: { project: PROJECT, index: 0 }, attachTo: document.body })
    const el = wrapper.find('.file').element as HTMLElement
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      left: 0, top: 0, width: 200, height: 100, right: 200, bottom: 100, x: 0, y: 0, toJSON: () => {},
    })

    await wrapper.find('.file').trigger('mousemove', { clientX: 50, clientY: 25 })

    expect(el.style.getPropertyValue('--mx')).toBe('25%')
    expect(el.style.getPropertyValue('--my')).toBe('25%')
  })

  it('does not update pointer position when motion is reduced', async () => {
    prefersReducedMotion.value = true
    const wrapper = mount(CaseFile, { props: { project: PROJECT, index: 0 }, attachTo: document.body })
    const el = wrapper.find('.file').element as HTMLElement

    await wrapper.find('.file').trigger('mousemove', { clientX: 50, clientY: 25 })

    expect(el.style.getPropertyValue('--mx')).toBe('')
  })
})
