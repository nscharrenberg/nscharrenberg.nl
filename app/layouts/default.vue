<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="shell">
    <a href="#main-content" class="skip-link">Skip to content</a>
    <CrtOverlay />
    <AmbientGlyphs v-if="route.path === '/'" />
    <CommandNav />
    <main id="main-content" class="shell__main" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
    <CommandPalette />
  </div>
</template>

<style scoped>
.shell {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.shell__main {
  flex: 1;
  position: relative;
  z-index: 1;
}

.shell__main:focus {
  outline: none;
}

.skip-link {
  position: fixed;
  top: -48px;
  left: 12px;
  z-index: 200;
  padding: 10px 16px;
  border-radius: var(--radius-sm);
  background: var(--bg1);
  border: 1px solid var(--line-strong);
  color: var(--fg0);
  font-size: 13px;
  transition: top var(--dur-hover) ease;
}

.skip-link:focus-visible {
  top: 12px;
}
</style>
