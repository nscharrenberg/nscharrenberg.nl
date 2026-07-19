<script setup lang="ts">
import CommandLine from './CommandLine.vue'
</script>

<template>
  <Story title="CommandLine">
    <Variant title="Command">
      <CommandLine path="~/projects" command="ls -la" />
    </Variant>
    <Variant title="Cursor only">
      <CommandLine path="~/projects" cursor />
    </Variant>
  </Story>
</template>
