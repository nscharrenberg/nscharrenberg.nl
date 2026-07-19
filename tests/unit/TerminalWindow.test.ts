// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TerminalWindow from '~/components/primitives/TerminalWindow.vue'

describe('TerminalWindow', () => {
  it('renders the title and slot content', () => {
    const wrapper = mount(TerminalWindow, {
      props: { title: '~/about' },
      slots: { default: 'Hello there' },
    })

    expect(wrapper.find('.term__title').text()).toBe('~/about')
    expect(wrapper.text()).toContain('Hello there')
  })

  it('omits the title element when no title is given', () => {
    const wrapper = mount(TerminalWindow, { slots: { default: 'No title' } })

    expect(wrapper.find('.term__title').exists()).toBe(false)
  })
})
