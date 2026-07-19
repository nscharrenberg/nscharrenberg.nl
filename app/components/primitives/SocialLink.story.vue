<script setup lang="ts">
import IconGithub from '~/components/icons/IconGithub.vue'
import IconResume from '~/components/icons/IconResume.vue'
import SocialLink from './SocialLink.vue'
</script>

<template>
  <Story title="SocialLink">
    <Variant title="External, icon-only">
      <SocialLink href="https://github.com/nscharrenberg" label="GitHub">
        <IconGithub :size="22" />
      </SocialLink>
    </Variant>
    <Variant title="Internal, labeled">
      <SocialLink href="/resume" label="Resume" internal show-label>
        <IconResume :size="18" />
      </SocialLink>
    </Variant>
  </Story>
</template>
