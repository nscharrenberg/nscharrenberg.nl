<script setup lang="ts">
const route = useRoute()
const { open: openPalette } = useCommandPalette()

const links = [
  { to: '/', path: '~' },
  { to: '/about', path: '~/about' },
  { to: '/projects', path: '~/projects' },
  { to: '/experience', path: '~/experience' },
  { to: '/writing', path: '~/writing' },
]

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

const currentPath = computed(() => links.find((l) => isActive(l.to))?.path ?? route.path)
</script>

<template>
  <nav class="nav" aria-label="Primary">
    <NuxtLink to="/" class="nav__prompt" aria-label="Home">
      <span class="nav__user">noah@nscharrenberg</span><span class="nav__sep">:</span><span class="nav__path">{{ currentPath }}</span><span class="nav__caret">$</span>
    </NuxtLink>

    <ul class="nav__list">
      <li v-for="link in links" :key="link.to">
        <NuxtLink :to="link.to" class="nav__link" :class="{ 'nav__link--active': isActive(link.to) }">
          <span class="nav__dot" aria-hidden="true" />{{ link.path }}
        </NuxtLink>
      </li>
    </ul>

    <button type="button" class="nav__search" aria-label="Open search (Ctrl K)" @click="openPalette">
      <svg class="nav__search-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.6" />
        <path d="M20 20L16 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      </svg>
      <span class="nav__search-label">Search</span>
      <kbd class="nav__kbd">⌘K</kbd>
    </button>
  </nav>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: var(--space-md);
  height: var(--nav-height);
  padding: 0 clamp(16px, 4vw, 40px);
  border-bottom: 1px solid var(--line);
  background: rgb(7 8 11 / 72%);
  backdrop-filter: blur(10px);
  font-size: 13px;
}

.nav__prompt {
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.nav__user {
  color: var(--glitch2);
}

.nav__sep {
  color: var(--fg2);
}

.nav__path {
  color: var(--fg1);
}

.nav__caret {
  color: var(--accent);
  margin-left: 2px;
}

.nav__list {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex: 1;
  min-width: 0;
}

.nav__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--fg1);
  white-space: nowrap;
  padding: 6px 2px;
  border-bottom: 1px solid transparent;
  transition: color var(--dur-hover) ease, border-color var(--dur-hover) ease;
}

.nav__dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentcolor;
  opacity: 0;
  transition: opacity var(--dur-hover) ease;
}

.nav__link:hover {
  color: var(--fg0);
}

.nav__link--active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.nav__link--active .nav__dot {
  opacity: 1;
}

.nav__search {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 10px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--line-strong);
  background: var(--bg1);
  color: var(--fg1);
  cursor: pointer;
  transition: border-color var(--dur-hover) ease, color var(--dur-hover) ease;
}

.nav__search:hover {
  border-color: rgb(255 106 0 / 40%);
  color: var(--fg0);
}

.nav__search-icon {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

.nav__kbd {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--fg2);
  border: 1px solid var(--line-strong);
  border-radius: 4px;
  padding: 1px 5px;
}

@media (max-width: 720px) {
  .nav__list {
    display: none;
  }

  .nav__search-label {
    display: none;
  }
}
</style>
