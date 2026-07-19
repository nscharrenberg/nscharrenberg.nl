// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CommandLine from '~/components/primitives/CommandLine.vue'

describe('CommandLine', () => {
  it('renders the path and command text', () => {
    const wrapper = mount(CommandLine, { props: { path: '~/projects', command: 'ls -la' } })

    expect(wrapper.find('.cmd__path').text()).toBe('~/projects')
    expect(wrapper.find('.cmd__text').text()).toBe('ls -la')
    expect(wrapper.find('.cmd__cursor').exists()).toBe(false)
  })

  it('shows a blinking cursor instead of command text when cursor is set', () => {
    const wrapper = mount(CommandLine, { props: { cursor: true } })

    expect(wrapper.find('.cmd__cursor').exists()).toBe(true)
    expect(wrapper.find('.cmd__text').exists()).toBe(false)
  })
})
