// @vitest-environment nuxt
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import GlitchText from '~/components/fx/GlitchText.vue'

describe('GlitchText', () => {
  it('renders the text and mirrors it into data-text for the glitch layers', () => {
    const wrapper = mount(GlitchText, { props: { text: 'Noah Scharrenberg' } })

    expect(wrapper.text()).toBe('Noah Scharrenberg')
    expect(wrapper.attributes('data-text')).toBe('Noah Scharrenberg')
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('renders as the given tag', () => {
    const wrapper = mount(GlitchText, { props: { text: '404', tag: 'div' } })

    expect(wrapper.element.tagName).toBe('DIV')
  })
})
