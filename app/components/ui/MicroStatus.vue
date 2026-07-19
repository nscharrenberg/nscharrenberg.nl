<script setup lang="ts">
interface Props {
  left?: string
  right?: string
}

withDefaults(defineProps<Props>(), { left: 'signal', right: 'stable' })
</script>

<template>
  <div class="micro" aria-hidden="true">
    <span>{{ left }}</span><span class="micro__dot">·</span><span>{{ right }}</span>
  </div>
</template>

<style scoped>
.micro {
  position: fixed;
  right: 16px;
  bottom: 12px;
  color: var(--fg2);
  font-size: 12px;
  letter-spacing: 0.06em;
  user-select: none;
  pointer-events: none;
  z-index: 2;
}

.micro__dot {
  color: rgb(255 106 0 / 80%);
}

@media (max-width: 720px) {
  /* Would otherwise sit underneath the fixed bottom tab bar (CommandNav). */
  .micro {
    display: none;
  }
}
</style>
