<script setup lang="ts">
// Purely decorative grid + scanline + sweep wash. Fixed to the viewport so
// it sits behind every route without each page re-declaring it.
</script>

<template>
  <div class="crt" aria-hidden="true">
    <div class="crt__sweep" />
  </div>
</template>

<style scoped>
.crt {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.crt::before {
  content: "";
  position: absolute;
  inset: -2px;
  background:
    linear-gradient(rgb(255 255 255 / 4%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 3%) 1px, transparent 1px);
  background-size: 64px 64px, 64px 64px;
  opacity: 0.22;
  filter: blur(0.2px);
  transform: translateZ(0);
  mask-image: radial-gradient(1200px 700px at 50% 45%, black 20%, transparent 70%);
}

.crt::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    180deg,
    rgb(255 255 255 / 5%) 0px,
    rgb(255 255 255 / 5%) 1px,
    transparent 2px,
    transparent 6px
  );
  opacity: 0.12;
  mix-blend-mode: overlay;
}

.crt__sweep {
  position: absolute;
  left: -10%;
  top: -30%;
  width: 120%;
  height: 24%;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgb(255 255 255 / 8%) 45%,
    rgb(255 255 255 / 2%) 55%,
    transparent 100%
  );
  transform: rotate(-4deg);
  opacity: 0.55;
  animation: sweep var(--dur-sweep) linear infinite;
  filter: blur(0.4px);
}

@keyframes sweep {
  0% { transform: translateY(-60vh) rotate(-4deg); }
  100% { transform: translateY(160vh) rotate(-4deg); }
}

@media (prefers-reduced-motion: reduce) {
  .crt__sweep {
    animation: none;
    opacity: 0.25;
  }
}
</style>
