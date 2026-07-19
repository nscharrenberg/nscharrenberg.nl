// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SocialLink from '~/components/primitives/SocialLink.vue'

describe('SocialLink', () => {
  it('renders an external link with target=_blank and an aria-label by default', () => {
    const wrapper = mount(SocialLink, { props: { href: 'https://github.com/x', label: 'GitHub' } })

    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('https://github.com/x')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('aria-label')).toBe('GitHub')
    expect(link.find('.social__tooltip').text()).toBe('GitHub')
  })

  it('shows a visible label and drops the aria-label/tooltip when showLabel is set', () => {
    const wrapper = mount(SocialLink, { props: { href: 'https://github.com/x', label: 'GitHub', showLabel: true } })

    const link = wrapper.find('a')
    expect(link.attributes('aria-label')).toBeUndefined()
    expect(link.find('.social__tooltip').exists()).toBe(false)
    expect(link.find('.social__label').text()).toBe('GitHub')
  })

  it('renders an internal route as a NuxtLink instead of an external anchor', async () => {
    const wrapper = mount(SocialLink, {
      props: { href: '/resume', label: 'Resume', internal: true },
      global: { stubs: { NuxtLink: { template: '<a :href="to"><slot /></a>', props: ['to'] } } },
    })

    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('/resume')
    expect(link.attributes('target')).toBeUndefined()
  })
})
