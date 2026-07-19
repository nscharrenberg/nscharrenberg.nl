import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    coverage: {
      provider: 'v8',
      all: true,
      reporter: ['text', 'json-summary', 'html'],
      include: ['app/components/**/*.vue', 'app/composables/**/*.ts'],
      exclude: ['app/components/**/*.story.vue'],
    },
  },
})
