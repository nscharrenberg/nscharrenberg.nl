<script setup lang="ts">
import Reveal from './Reveal.vue'
</script>

<template>
  <Story title="Reveal">
    <Variant title="Default">
      <Reveal>
        <p>Fades and slides into place once it enters the viewport (or immediately if reduced motion is preferred).</p>
      </Reveal>
    </Variant>
    <Variant title="Staggered delay">
      <Reveal :delay="200">
        <p>Same effect, delayed by 200ms — used for staggering list items.</p>
      </Reveal>
    </Variant>
  </Story>
</template>
