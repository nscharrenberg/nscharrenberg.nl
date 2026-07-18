<script setup lang="ts">
const route = useRoute()

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
</script>

<template>
  <nav class="nav" aria-label="Primary">
    <NuxtLink to="/" class="nav__prompt">
      <span class="nav__user">noah@nscharrenberg</span><span class="nav__sep">:</span><span class="nav__cmd">cd</span>
    </NuxtLink>
    <ul class="nav__list">
      <li v-for="link in links" :key="link.to">
        <NuxtLink :to="link.to" class="nav__link" :class="{ 'nav__link--active': isActive(link.to) }">
          {{ link.path }}
        </NuxtLink>
      </li>
    </ul>
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
  overflow-x: auto;
}

.nav__prompt {
  flex-shrink: 0;
  white-space: nowrap;
}

.nav__user {
  color: var(--glitch2);
}

.nav__sep {
  color: var(--fg2);
}

.nav__cmd {
  color: var(--fg1);
}

.nav__list {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.nav__link {
  color: var(--fg1);
  white-space: nowrap;
  padding: 6px 2px;
  border-bottom: 1px solid transparent;
  transition: color var(--dur-hover) ease, border-color var(--dur-hover) ease;
}

.nav__link:hover {
  color: var(--fg0);
}

.nav__link--active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}
</style>
