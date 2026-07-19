// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SectionHeading from '~/components/primitives/SectionHeading.vue'

describe('SectionHeading', () => {
  it('renders the eyebrow and title', () => {
    const wrapper = mount(SectionHeading, { props: { eyebrow: '~/about', title: 'About' } })

    expect(wrapper.find('.heading__eyebrow').text()).toBe('~/about')
    expect(wrapper.find('.heading__title').text()).toBe('About')
  })

  it('renders lede slot content only when a slot is provided', () => {
    const withLede = mount(SectionHeading, {
      props: { eyebrow: '~/about', title: 'About' },
      slots: { default: 'Some lede text.' },
    })
    const withoutLede = mount(SectionHeading, { props: { eyebrow: '~/about', title: 'About' } })

    expect(withLede.find('.heading__lede').exists()).toBe(true)
    expect(withLede.find('.heading__lede').text()).toBe('Some lede text.')
    expect(withoutLede.find('.heading__lede').exists()).toBe(false)
  })
})
