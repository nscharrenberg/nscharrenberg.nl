<script setup lang="ts">
import TerminalWindow from './TerminalWindow.vue'
</script>

<template>
  <Story title="TerminalWindow">
    <Variant title="Titled">
      <TerminalWindow title="~/about">
        A window chrome with a titlebar — wraps terminal-styled content blocks across the site.
      </TerminalWindow>
    </Variant>
    <Variant title="Untitled">
      <TerminalWindow>
        No title passed — the titlebar shows only the three dots.
      </TerminalWindow>
    </Variant>
  </Story>
</template>
