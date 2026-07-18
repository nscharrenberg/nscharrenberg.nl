<template>
  <div class="shell">
    <CrtOverlay />
    <CommandNav />
    <main class="shell__main">
      <slot />
    </main>
    <MicroStatus />
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
</style>
