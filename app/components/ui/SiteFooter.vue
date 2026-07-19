<script setup lang="ts">
import { REPO_URL } from '~/data/contact'

const YEAR = new Date().getFullYear()
// Baked in at build time — an actual calendar date rather than a relative
// "2 days ago" string, so it stays accurate without needing client-side
// correction (unlike the resume's "years in tech" stat, this one is
// supposed to reflect the last real build, not the visitor's clock).
const BUILD_DATE = new Date().toISOString().slice(0, 10)

const prefersReducedMotion = usePrefersReducedMotion()
const uptimeText = ref('00:00:00')
let timer: ReturnType<typeof setInterval> | undefined

function formatUptime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
  const s = String(totalSeconds % 60).padStart(2, '0')
  return `${h}:${m}:${s}`
}

onMounted(() => {
  if (prefersReducedMotion.value) return

  const start = performance.now()
  timer = setInterval(() => {
    uptimeText.value = formatUptime(performance.now() - start)
  }, 1000)
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <CommandLine path="~" command="uptime" />
      <p class="footer__status">
        <span class="footer__dot" aria-hidden="true" />
        <span v-if="!prefersReducedMotion">session {{ uptimeText }} · </span>rebuilt {{ BUILD_DATE }} · signal stable
      </p>

      <nav class="footer__links" aria-label="Footer">
        <NuxtLink to="/colophon">cat colophon.md</NuxtLink>
        <EmailLink label="mail me" />
        <a :href="REPO_URL" target="_blank" rel="noopener noreferrer">view source ↗</a>
      </nav>

      <p class="footer__copy">© {{ YEAR }} Noah Scharrenberg</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
  background: var(--bg1);
  padding: var(--space-lg) clamp(16px, 4vw, 40px);
}

@media (max-width: 720px) {
  .footer {
    /* Clears the fixed bottom tab bar (CommandNav) so this, the true end of
       every page's content now, never sits underneath it. */
    padding-bottom: calc(var(--space-lg) + var(--tabbar-height));
  }
}

.footer__inner {
  max-width: var(--content-width);
  margin: 0 auto;
}

.footer__status {
  font-size: 12.5px;
  color: var(--fg2);
  margin: var(--space-xs) 0 var(--space-md);
  font-variant-numeric: tabular-nums;
  line-height: 1.6;
}

.footer__dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 8px;
  border-radius: 50%;
  background: var(--glitch2);
  box-shadow: 0 0 6px rgb(0 255 123 / 60%);
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm) var(--space-lg);
  margin-bottom: var(--space-md);
  font-size: 13px;
}

.footer__links a {
  color: var(--accent);
}

.footer__links a:hover {
  text-decoration: underline;
}

.footer__copy {
  font-size: 11.5px;
  color: var(--fg2);
  margin: 0;
}
</style>
