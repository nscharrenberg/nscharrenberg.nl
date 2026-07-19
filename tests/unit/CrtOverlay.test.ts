// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CrtOverlay from '~/components/fx/CrtOverlay.vue'

describe('CrtOverlay', () => {
  it('renders a decorative, accessibility-hidden overlay', () => {
    const wrapper = mount(CrtOverlay)

    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(wrapper.find('.crt__sweep').exists()).toBe(true)
  })
})
