<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <Story title="SectionHeading">
    <Variant title="Default">
      <SectionHeading eyebrow="~/about" title="About">
        Some lede text under the title.
      </SectionHeading>
    </Variant>
  </Story>
</template>
