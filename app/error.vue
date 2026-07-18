<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const route = useRoute()
const rawPath = route.fullPath || '/'
const safePath = rawPath.length > 64 ? `${rawPath.slice(0, 61)}…` : rawPath

const files = ['index.html', 'robots.txt', 'sitemap.xml', 'humans.txt', 'llms.txt']
const lsOutput = files.join('  ')

const lsText = ref('')
const prefersReducedMotion = usePrefersReducedMotion()

onMounted(() => {
  if (prefersReducedMotion.value) {
    lsText.value = lsOutput
    return
  }
  let i = 0
  const timer = setInterval(() => {
    i += 1
    lsText.value = lsOutput.slice(0, i)
    if (i >= lsOutput.length) clearInterval(timer)
  }, 16)
})

const statusCode = props.error?.statusCode ?? 404

useSeoMeta({
  title: `${statusCode} — Page Not Found`,
  robots: 'noindex,follow',
})

function returnHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="shell">
    <CrtOverlay />

    <main class="shell__main">
      <section class="panel" aria-label="Error page">
        <GlitchText tag="div" :text="String(statusCode)" class="panel__code" />

        <p class="panel__msg">Page not found</p>

        <TerminalWindow class="panel__term">
          <div>
            <span class="panel__prompt">noah@host</span>:<span class="panel__path">~/web</span>$ cd
            <span>{{ safePath }}</span>
          </div>
          <div>
            <span class="panel__prompt">noah@host</span>:<span class="panel__path">~/web</span>$ ls
          </div>
          <div>{{ lsText }}</div>
        </TerminalWindow>

        <div class="panel__actions">
          <button type="button" class="panel__btn" @click="returnHome">Return home</button>
        </div>
      </section>
    </main>

    <MicroStatus left="trace" right="lost" />
  </div>
</template>

<style scoped>
.shell {
  min-height: 100dvh;
  position: relative;
  background:
    radial-gradient(1200px 700px at 50% 40%, rgb(255 106 0 / 8%), transparent 60%),
    radial-gradient(900px 600px at 30% 65%, rgb(0 255 123 / 4.5%), transparent 55%),
    linear-gradient(180deg, var(--bg0), var(--bg1));
  color: var(--fg0);
  font-family: var(--font-mono);
}

.shell__main {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: clamp(16px, 4vw, 56px);
  position: relative;
  z-index: 1;
}

.panel {
  width: min(720px, 100%);
  text-align: center;
  display: grid;
  gap: 18px;
  justify-items: center;
}

.panel__code {
  font-size: clamp(72px, 12vw, 160px);
  line-height: 0.9;
  letter-spacing: -0.04em;
}

.panel__msg {
  color: var(--fg1);
  font-size: clamp(14px, 2vw, 18px);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0;
}

.panel__term {
  width: min(720px, 96%);
  font-size: 14px;
}

.panel__prompt {
  color: rgb(255 106 0 / 90%);
}

.panel__path {
  color: rgb(0 255 123 / 75%);
}

.panel__actions {
  margin-top: 4px;
}

.panel__btn {
  height: 44px;
  padding: 0 14px;
  border-radius: var(--radius-md);
  border: 1px solid var(--line-strong);
  background: rgb(10 12 18 / 55%);
  color: var(--fg0);
  cursor: pointer;
  transition: transform var(--dur-hover) ease, border-color var(--dur-hover) ease, box-shadow var(--dur-hover) ease;
}

.panel__btn:hover {
  transform: translateY(-2px);
  border-color: rgb(255 106 0 / 35%);
  box-shadow: 0 16px 34px rgb(0 0 0 / 40%), 0 0 0 2px var(--accent-soft);
}
</style>
