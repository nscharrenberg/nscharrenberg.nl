// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import EmailLink from '~/components/primitives/EmailLink.vue'

describe('EmailLink', () => {
  it('resolves a mailto href on mount and shows the static label by default', async () => {
    const wrapper = mount(EmailLink, { props: { label: 'Email' } })
    await nextTick()

    expect(wrapper.text()).toBe('Email')
    expect(wrapper.attributes('href')).toMatch(/^mailto:/)
    expect(wrapper.classes()).not.toContain('is-pending')
  })

  it('shows the resolved address as link text when showAddress is set', async () => {
    const wrapper = mount(EmailLink, { props: { showAddress: true } })
    await nextTick()

    expect(wrapper.text()).toMatch(/@/)
  })
})
