<script setup lang="ts">
const DISPLAY_NAME = 'Noah Scharrenberg'
const TAGLINES = ['Artificial Intelligence Engineer', 'Software Engineer', 'Researcher']

useSeoMeta({
  title: 'AI Engineer • Software Engineer',
  description: 'Noah Scharrenberg is an AI Engineer and Software Engineer. Profiles: Codeberg, GitHub, LinkedIn.',
  ogTitle: DISPLAY_NAME,
  ogDescription: 'AI Engineer • Software Engineer',
  ogType: 'website',
})
</script>

<template>
  <section class="hero" aria-label="Homepage">
    <GlitchText tag="h1" :text="DISPLAY_NAME" class="hero__name" />

    <div class="hero__underline" aria-hidden="true" />

    <p class="hero__tagline">
      <TypewriterText :phrases="TAGLINES" />
    </p>

    <nav class="hero__socials" aria-label="Social links">
      <SocialLink href="https://www.linkedin.com/in/nscharrenberg/" label="LinkedIn">
        <IconLinkedin />
      </SocialLink>
      <SocialLink href="https://github.com/nscharrenberg" label="GitHub">
        <IconGithub />
      </SocialLink>
      <SocialLink href="https://codeberg.org/nscharrenberg" label="Codeberg">
        <IconCodeberg />
      </SocialLink>
    </nav>
  </section>
</template>

<style scoped>
.hero {
  min-height: calc(100dvh - var(--nav-height));
  display: grid;
  gap: clamp(14px, 2.2vw, 22px);
  place-content: center;
  justify-items: center;
  text-align: center;
  padding: clamp(16px, 4vw, 56px);
}

.hero__name {
  font-size: clamp(40px, 8vw, 96px);
}

.hero__underline {
  width: min(680px, 92vw);
  height: 2px;
  background: linear-gradient(90deg, transparent, rgb(255 106 0 / 90%), rgb(255 138 31 / 60%), transparent);
  box-shadow: 0 0 22px rgb(255 106 0 / 18%);
  border-radius: 999px;
}

.hero__tagline {
  color: var(--fg1);
  font-size: clamp(14px, 2vw, 18px);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  user-select: none;
  margin: 0;
}

.hero__socials {
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
}
</style>
