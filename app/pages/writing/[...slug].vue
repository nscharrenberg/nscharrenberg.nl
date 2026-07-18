<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('writing').path(route.path).first(),
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
})
</script>

<template>
  <article v-if="page" class="page">
    <NuxtLink to="/writing" class="page__back">← ~/writing</NuxtLink>
    <p class="page__date">{{ page.date }}</p>
    <h1 class="page__title">{{ page.title }}</h1>
    <ContentRenderer :value="page" class="prose" />
  </article>
</template>

<style scoped>
.page {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-2xl) clamp(16px, 4vw, 40px);
}

.page__back {
  display: inline-block;
  font-size: 13px;
  color: var(--accent);
  margin-bottom: var(--space-lg);
}

.page__date {
  font-size: 12px;
  color: var(--fg2);
  margin: 0 0 8px;
}

.page__title {
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  color: var(--fg0);
  margin: 0 0 var(--space-lg);
}
</style>
