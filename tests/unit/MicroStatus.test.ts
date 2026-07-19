// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MicroStatus from '~/components/layout/MicroStatus.vue'

describe('MicroStatus', () => {
  it('uses the default left/right text when no props are given', () => {
    const wrapper = mount(MicroStatus)

    expect(wrapper.text()).toBe('signal·stable')
  })

  it('renders custom left/right text', () => {
    const wrapper = mount(MicroStatus, { props: { left: 'uplink', right: 'degraded' } })

    expect(wrapper.text()).toBe('uplink·degraded')
  })

  it('is hidden from the accessibility tree', () => {
    const wrapper = mount(MicroStatus)

    expect(wrapper.attributes('aria-hidden')).toBe('true')
  })
})
