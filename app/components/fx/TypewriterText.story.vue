<script setup lang="ts">
import TypewriterText from './TypewriterText.vue'
</script>

<template>
  <Story title="TypewriterText">
    <Variant title="Default">
      <TypewriterText :phrases="['Artificial Intelligence Engineer', 'Software Engineer', 'Researcher']" />
    </Variant>
  </Story>
</template>
