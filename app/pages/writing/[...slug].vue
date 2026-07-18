<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('writing').path(route.path).first(),
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const filename = computed(() => `${route.path.split('/').pop()}.md`)
const readMinutes = computed(() => estimateReadMinutes(countWords(page.value?.body)))

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
})
</script>

<template>
  <article v-if="page" class="page">
    <NuxtLink to="/writing" class="page__back">← ~/writing</NuxtLink>

    <CommandLine path="~/writing" :command="`cat ${filename}`" class="page__cmd" />

    <p class="page__meta">{{ page.date }} · {{ readMinutes }} min read</p>
    <DecryptText tag="h1" :text="page.title" class="page__title" />

    <ul v-if="page.tags?.length" class="page__tags">
      <li v-for="tag in page.tags" :key="tag" class="page__tag">#{{ tag }}</li>
    </ul>

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

.page__cmd {
  margin-bottom: var(--space-sm);
}

.page__meta {
  font-size: 12px;
  color: var(--fg2);
  margin: 0 0 8px;
}

.page__title {
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  color: var(--fg0);
  margin: 0 0 var(--space-sm);
}

.page__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin: 0 0 var(--space-lg);
}

.page__tag {
  font-size: 12px;
  color: var(--accent);
}
</style>
