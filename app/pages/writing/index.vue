<script setup lang="ts">
const { data: posts } = await useAsyncData('writing-index', () =>
  queryCollection('writing').order('date', 'DESC').all(),
)

const rows = computed(() =>
  (posts.value ?? []).map((post) => {
    const words = countWords(post.body)
    return {
      ...post,
      filename: `${post.path.split('/').pop()}.md`,
      size: estimateFileSize(words),
      readMinutes: estimateReadMinutes(words),
    }
  }),
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

    <template v-if="rows.length">
      <CommandLine path="~/writing" command="ls -la" />

      <div class="listing">
        <div class="listing__head" aria-hidden="true">
          <span>Name</span>
          <span>Size</span>
          <span>Date</span>
        </div>

        <ul class="listing__list">
          <Reveal v-for="(post, i) in rows" :key="post.path" tag="li" :delay="i * 70">
            <NuxtLink :to="post.path" class="listing__row">
              <span class="listing__name">
                {{ post.filename }}
                <span class="listing__desc">{{ post.description }}</span>
                <span class="listing__tags">
                  <span v-for="tag in post.tags" :key="tag" class="listing__tag">#{{ tag }}</span>
                </span>
              </span>
              <span class="listing__size">{{ post.size }} · {{ post.readMinutes }} min read</span>
              <span class="listing__date">{{ post.date }}</span>
            </NuxtLink>
          </Reveal>
        </ul>
      </div>
    </template>
    <p v-else class="page__empty">Nothing published yet.</p>
  </div>
</template>

<style scoped>
.page {
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space-2xl) clamp(16px, 4vw, 40px);
}

.listing {
  margin-top: var(--space-md);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.listing__head {
  display: grid;
  grid-template-columns: 1fr 180px 110px;
  gap: var(--space-sm);
  padding: 10px var(--space-sm);
  background: var(--bg1);
  border-bottom: 1px solid var(--line);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg2);
}

@media (max-width: 640px) {
  .listing__head {
    display: none;
  }
}

.listing__row {
  display: grid;
  grid-template-columns: 1fr 180px 110px;
  gap: var(--space-sm);
  align-items: baseline;
  padding: var(--space-sm);
  border-bottom: 1px solid var(--line);
  transition: background var(--dur-hover) ease;
}

.listing__row:hover {
  background: var(--bg1);
}

@media (max-width: 640px) {
  .listing__row {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}

.listing__name {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: var(--fg0);
  font-weight: 700;
  font-size: 14px;
}

.listing__desc {
  color: var(--fg1);
  font-weight: 400;
  font-size: 13px;
}

.listing__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 2px;
}

.listing__tag {
  color: var(--accent);
  font-weight: 400;
  font-size: 11.5px;
}

.listing__size,
.listing__date {
  color: var(--fg2);
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.page__empty {
  color: var(--fg2);
}
</style>
