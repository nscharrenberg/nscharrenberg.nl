<script setup lang="ts">
const { data: posts } = await useAsyncData('writing-index', () =>
  queryCollection('writing').order('date', 'DESC').all(),
)

useSeoMeta({
  title: 'Writing',
  description: 'Notes and posts by Noah Scharrenberg.',
})
</script>

<template>
  <div class="page">
    <SectionHeading eyebrow="~/writing" title="Writing">
      Notes on AI/ML, software engineering, and whatever else is worth writing down.
    </SectionHeading>

    <ul v-if="posts?.length" class="page__list">
      <Reveal v-for="(post, i) in posts" :key="post.path" tag="li" :delay="i * 70">
        <NuxtLink :to="post.path" class="page__link">
          <span class="page__date">{{ post.date }}</span>
          <span class="page__title">{{ post.title }} <span class="page__arrow">→</span></span>
          <span class="page__desc">{{ post.description }}</span>
        </NuxtLink>
      </Reveal>
    </ul>
    <p v-else class="page__empty">Nothing published yet.</p>
  </div>
</template>

<style scoped>
.page {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-2xl) clamp(16px, 4vw, 40px);
}

.page__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.page__link {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: var(--space-sm);
  padding: var(--space-sm) 4px;
  margin: 0 -4px;
  border-radius: var(--radius-sm);
  border-bottom: 1px solid var(--line);
  transition: background var(--dur-hover) ease;
}

.page__link:hover {
  background: var(--bg1);
}

.page__arrow {
  display: inline-block;
  color: var(--accent);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity var(--dur-hover) ease, transform var(--dur-hover) ease;
}

.page__link:hover .page__arrow {
  opacity: 1;
  transform: translateX(0);
}

.page__date {
  font-size: 12px;
  color: var(--fg2);
  font-variant-numeric: tabular-nums;
}

.page__title {
  display: block;
  color: var(--fg0);
  font-weight: 700;
  font-size: 14.5px;
  margin-bottom: 4px;
}

.page__desc {
  display: block;
  grid-column: 2;
  color: var(--fg1);
  font-size: 13px;
}

.page__empty {
  color: var(--fg2);
}
</style>
