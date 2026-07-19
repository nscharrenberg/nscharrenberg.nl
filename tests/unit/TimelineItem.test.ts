// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TimelineItem from '~/components/portfolio/TimelineItem.vue'
import type { TimelineEntry } from '~/types/timeline'

const ENTRY: TimelineEntry = {
  role: 'Software Engineer',
  org: 'Acme',
  period: '2023 — Present',
  summary: 'Building things.',
}

describe('TimelineItem', () => {
  it('renders the role, org, period, and summary', () => {
    const wrapper = mount(TimelineItem, { props: { entry: ENTRY } })

    expect(wrapper.find('.item__role').text()).toBe('Software Engineer · Acme')
    expect(wrapper.find('.item__row dd').text()).toBe('2023 — Present')
    expect(wrapper.find('.item__summary').text()).toBe('Building things.')
  })

  it('renders a stable 7-character hex commit hash derived from the entry', () => {
    const a = mount(TimelineItem, { props: { entry: ENTRY } })
    const b = mount(TimelineItem, { props: { entry: { ...ENTRY } } })

    const hashText = a.find('.item__hash').text()
    expect(hashText).toMatch(/^commit [0-9a-f]{7}$/)
    expect(hashText).toBe(b.find('.item__hash').text())
  })

  it('produces a different hash for a different entry', () => {
    const a = mount(TimelineItem, { props: { entry: ENTRY } })
    const b = mount(TimelineItem, { props: { entry: { ...ENTRY, org: 'Other Co' } } })

    expect(a.find('.item__hash').text()).not.toBe(b.find('.item__hash').text())
  })

  it('marks the status ACTIVE when the period includes "present" (case-insensitive)', () => {
    const wrapper = mount(TimelineItem, { props: { entry: ENTRY } })

    expect(wrapper.find('.item__status').text()).toBe('ACTIVE')
    expect(wrapper.find('.item__status').classes()).toContain('item__status--active')
  })

  it('marks the status DONE for a completed period', () => {
    const wrapper = mount(TimelineItem, { props: { entry: { ...ENTRY, period: '2019 — 2022' } } })

    expect(wrapper.find('.item__status').text()).toBe('DONE')
    expect(wrapper.find('.item__status').classes()).not.toContain('item__status--active')
  })

  it('hides the connecting rail line on the last item', () => {
    const middle = mount(TimelineItem, { props: { entry: ENTRY } })
    const last = mount(TimelineItem, { props: { entry: ENTRY, isLast: true } })

    expect(middle.classes()).not.toContain('item--last')
    expect(last.classes()).toContain('item--last')
  })
})
