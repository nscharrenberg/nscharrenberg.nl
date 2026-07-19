<script setup lang="ts">
interface Props {
  /** Shown after the `noah@host:` prefix, e.g. "~/projects". */
  path?: string
  /** Required unless `cursor` is set — a cursor-only line has no command text. */
  command?: string
  /** Show a blinking cursor instead of the command — for a "session still live" closing line. */
  cursor?: boolean
}

withDefaults(defineProps<Props>(), { path: '~', command: '', cursor: false })
</script>

<template>
  <div class="cmd">
    <span class="cmd__user">noah@host</span><span class="cmd__sep">:</span><span class="cmd__path">{{ path }}</span><span class="cmd__dollar">$</span>
    <span v-if="!cursor" class="cmd__text">{{ command }}</span>
    <span v-else class="cmd__cursor" aria-hidden="true">▌</span>
  </div>
</template>

<style scoped>
.cmd {
  font-size: 13px;
  white-space: nowrap;
  overflow-x: auto;
}

.cmd__user {
  color: rgb(255 106 0 / 90%);
}

.cmd__sep {
  color: var(--fg2);
}

.cmd__path {
  color: rgb(0 255 123 / 75%);
}

.cmd__dollar {
  color: var(--fg1);
  margin-right: 8px;
}

.cmd__text {
  color: var(--fg0);
}

.cmd__cursor {
  color: var(--accent);
  animation: cmd-blink var(--dur-cursor) steps(2, end) infinite;
}

@keyframes cmd-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
</style>
