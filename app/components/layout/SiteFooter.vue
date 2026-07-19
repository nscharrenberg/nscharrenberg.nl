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
      <div class="footer__row">
        <p class="footer__status">
          <span class="footer__dot" aria-hidden="true" />
          <span v-if="!prefersReducedMotion">session {{ uptimeText }} · </span>rebuilt {{ BUILD_DATE }}
        </p>

        <nav class="footer__icons" aria-label="Footer">
          <NuxtLink to="/colophon" aria-label="Colophon" title="Colophon">
            <IconInfo :size="17" />
          </NuxtLink>
          <EmailLink aria-label="Email" title="Email">
            <IconMail :size="17" />
          </EmailLink>
          <a :href="REPO_URL" target="_blank" rel="noopener noreferrer" aria-label="View source" title="View source">
            <IconCode :size="17" />
          </a>
        </nav>
      </div>

      <p class="footer__copy">© {{ YEAR }} Noah Scharrenberg</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
  background: var(--bg1);
  padding: var(--space-sm) clamp(16px, 4vw, 40px);
}

@media (max-width: 720px) {
  .footer {
    /* Clears the fixed bottom tab bar (CommandNav) so this, the true end of
       every page's content now, never sits underneath it. */
    padding-bottom: calc(var(--space-sm) + var(--tabbar-height));
  }
}

.footer__inner {
  max-width: var(--content-width);
  margin: 0 auto;
}

.footer__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
}

.footer__status {
  font-size: 12px;
  color: var(--fg2);
  margin: 0;
  font-variant-numeric: tabular-nums;
}

.footer__dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 7px;
  border-radius: 50%;
  background: var(--glitch2);
  box-shadow: 0 0 6px rgb(0 255 123 / 60%);
}

.footer__icons {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.footer__icons a {
  display: flex;
  color: var(--fg2);
  transition: color var(--dur-hover) ease;
}

.footer__icons a:hover {
  color: var(--accent);
}

.footer__copy {
  font-size: 11px;
  color: var(--fg2);
  margin: 6px 0 0;
}
</style>
