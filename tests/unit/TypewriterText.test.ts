// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import TypewriterText from '~/components/fx/TypewriterText.vue'

describe('TypewriterText', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders an empty text span and cursor before typing starts', () => {
    const wrapper = mount(TypewriterText, { props: { phrases: ['Hello'] } })

    expect(wrapper.find('.typewriter__text').exists()).toBe(true)
    expect(wrapper.find('.typewriter__cursor').exists()).toBe(true)
  })

  it('types out the given phrase over time', async () => {
    const wrapper = mount(TypewriterText, { props: { phrases: ['Hi'] } })

    await vi.advanceTimersByTimeAsync(5000)

    expect(wrapper.find('.typewriter__text').text()).toBe('Hi')
  })
})
