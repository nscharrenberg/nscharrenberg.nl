import { defineSetupVue3 } from '@histoire/plugin-vue'
import { h } from 'vue'
import './app/assets/css/reset.css'
import './app/assets/css/tokens.css'
import './app/assets/css/main.css'

// Stand-in for Nuxt's auto-registered <NuxtLink>, which doesn't exist outside
// a Nuxt runtime. Renders as a plain <a> so link-based components/stories
// still work here. Uses a render function, not a template string, since this
// Vue build has no runtime template compiler.
export const setupVue3 = defineSetupVue3(({ app }) => {
  app.component('NuxtLink', {
    props: { to: { type: String, default: '#' } },
    render(this: { to: string }) {
      return h('a', { href: this.to }, this.$slots.default?.())
    },
  })
})
