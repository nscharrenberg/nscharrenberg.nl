<script setup lang="ts">
import EmailLink from './EmailLink.vue'
</script>

<template>
  <Story title="EmailLink">
    <Variant title="Static label">
      <EmailLink label="Email" />
    </Variant>
    <Variant title="Shows resolved address">
      <EmailLink show-address />
    </Variant>
  </Story>
</template>
