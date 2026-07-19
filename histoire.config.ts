import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  plugins: [HstVue()],
  setupFile: '/histoire.setup.ts',
  theme: {
    title: 'nscharrenberg.nl',
    defaultColorScheme: 'dark',
    storeColorScheme: true,
  },
  backgroundPresets: [
    { label: 'Terminal', color: '#07080b', contrastColor: '#f3f6ff' },
    { label: 'Panel', color: '#0b0d12', contrastColor: '#f3f6ff' },
    { label: 'White', color: '#ffffff', contrastColor: '#000000' },
  ],
  autoApplyContrastColor: true,
  vite: {
    plugins: [vue()],
    resolve: {
      // Mirrors Nuxt's `~`/`@` -> `app/` alias so components using their normal
      // import paths (as they would inside the Nuxt app) also resolve here.
      alias: {
        '~': fileURLToPath(new URL('./app', import.meta.url)),
        '@': fileURLToPath(new URL('./app', import.meta.url)),
      },
    },
  },
})
