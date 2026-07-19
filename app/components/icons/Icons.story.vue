<script setup lang="ts">
import IconAbout from './IconAbout.vue'
import IconCode from './IconCode.vue'
import IconCodeberg from './IconCodeberg.vue'
import IconExperience from './IconExperience.vue'
import IconGithub from './IconGithub.vue'
import IconHome from './IconHome.vue'
import IconInfo from './IconInfo.vue'
import IconLinkedin from './IconLinkedin.vue'
import IconMail from './IconMail.vue'
import IconProjects from './IconProjects.vue'
import IconResume from './IconResume.vue'
import IconWriting from './IconWriting.vue'

const icons = [
  { name: 'IconAbout', component: IconAbout },
  { name: 'IconCode', component: IconCode },
  { name: 'IconCodeberg', component: IconCodeberg },
  { name: 'IconExperience', component: IconExperience },
  { name: 'IconGithub', component: IconGithub },
  { name: 'IconHome', component: IconHome },
  { name: 'IconInfo', component: IconInfo },
  { name: 'IconLinkedin', component: IconLinkedin },
  { name: 'IconMail', component: IconMail },
  { name: 'IconProjects', component: IconProjects },
  { name: 'IconResume', component: IconResume },
  { name: 'IconWriting', component: IconWriting },
]
</script>

<template>
  <Story title="Icons">
    <Variant title="All icons">
      <div class="icon-grid">
        <div v-for="icon in icons" :key="icon.name" class="icon-grid__item">
          <component :is="icon.component" :size="24" />
          <span class="icon-grid__label">{{ icon.name }}</span>
        </div>
      </div>
    </Variant>
    <Variant title="Sizes">
      <div class="icon-grid">
        <div v-for="size in [16, 20, 24, 32]" :key="size" class="icon-grid__item">
          <IconGithub :size="size" />
          <span class="icon-grid__label">{{ size }}px</span>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.icon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.icon-grid__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--fg0);
}

.icon-grid__label {
  font-size: 11px;
  color: var(--fg2);
}
</style>
