<script setup lang="ts">
interface Props {
  text: string
  /** Element/heading level to render as. */
  tag?: string
}

withDefaults(defineProps<Props>(), { tag: 'span' })
</script>

<template>
  <component :is="tag" class="glitch" :data-text="text" :aria-label="text">
    <span class="glitch__base">{{ text }}</span>
  </component>
</template>

<style scoped>
.glitch {
  position: relative;
  display: inline-block;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
  text-shadow: 0 16px 42px var(--shadow);
}

.glitch__base {
  position: relative;
  z-index: 3;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  z-index: 2;
  opacity: 0.92;
  mix-blend-mode: screen;
  filter: saturate(1.2);
  pointer-events: none;
}

.glitch::before {
  color: var(--accent);
  transform: translate(2px, 0);
  text-shadow: 0 0 18px rgb(255 106 0 / 24%);
  clip-path: inset(0 0 0 0);
  animation: glitch-a var(--dur-glitch-a) infinite linear alternate-reverse;
}

.glitch::after {
  color: var(--glitch2);
  transform: translate(-2px, 0);
  text-shadow: 0 0 18px rgb(0 255 123 / 14%);
  clip-path: inset(0 0 0 0);
  animation: glitch-b var(--dur-glitch-b) infinite linear alternate-reverse;
}

@keyframes glitch-a {
  0% { clip-path: inset(12% 0 70% 0); transform: translate(2px, -1px); }
  7% { clip-path: inset(64% 0 18% 0); transform: translate(3px, 1px); }
  14% { clip-path: inset(18% 0 56% 0); transform: translate(1px, 0); }
  21% { clip-path: inset(40% 0 38% 0); transform: translate(4px, -2px); }
  28% { clip-path: inset(74% 0 10% 0); transform: translate(2px, 2px); }
  35% { clip-path: inset(0 0 0 0); transform: translate(2px, 0); }
  55% { clip-path: inset(22% 0 52% 0); transform: translate(5px, 1px); }
  72% { clip-path: inset(60% 0 16% 0); transform: translate(2px, -1px); }
  100% { clip-path: inset(8% 0 78% 0); transform: translate(3px, 0); }
}

@keyframes glitch-b {
  0% { clip-path: inset(70% 0 12% 0); transform: translate(-2px, 1px); }
  9% { clip-path: inset(10% 0 76% 0); transform: translate(-4px, -1px); }
  18% { clip-path: inset(44% 0 36% 0); transform: translate(-1px, 0); }
  27% { clip-path: inset(20% 0 58% 0); transform: translate(-5px, 2px); }
  36% { clip-path: inset(0 0 0 0); transform: translate(-2px, 0); }
  54% { clip-path: inset(62% 0 14% 0); transform: translate(-3px, 1px); }
  73% { clip-path: inset(28% 0 52% 0); transform: translate(-6px, -2px); }
  100% { clip-path: inset(78% 0 8% 0); transform: translate(-3px, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .glitch::before,
  .glitch::after {
    animation: none;
    clip-path: inset(0 0 0 0);
    transform: none;
    opacity: 0.55;
  }
}
</style>
