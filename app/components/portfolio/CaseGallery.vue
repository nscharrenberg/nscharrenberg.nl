<script setup lang="ts">
import type { ProjectMedia } from '~/types/project'

const props = defineProps<{ media: ProjectMedia[] }>()

const activeIndex = ref<number | null>(null)
const isOpen = computed(() => activeIndex.value !== null)
const active = computed(() => (activeIndex.value !== null ? props.media[activeIndex.value] : null))

const triggerToRefocus = ref<HTMLElement | null>(null)

function open(index: number, e: MouseEvent) {
  triggerToRefocus.value = e.currentTarget as HTMLElement
  activeIndex.value = index
}

function close() {
  activeIndex.value = null
  triggerToRefocus.value?.focus?.()
}

function next() {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value + 1) % props.media.length
}

function prev() {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value - 1 + props.media.length) % props.media.length
}

function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}

// A plain @keydown on the overlay only fires while focus is inside it, which
// isn't guaranteed here — bind at the window level instead, scoped to while
// the lightbox is actually open, matching CommandPalette's pattern.
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

watch(isOpen, (open) => {
  document.getElementById('__nuxt')?.toggleAttribute('inert', open)
})
</script>

<template>
  <div class="gallery">
    <button
      v-for="(item, i) in media"
      :key="item.src"
      type="button"
      class="gallery__thumb"
      :aria-label="`Open image: ${item.alt}`"
      @click="open(i, $event)"
    >
      <img :src="item.src" :alt="item.alt" loading="lazy">
      <span v-if="item.placeholder" class="gallery__badge">Placeholder</span>
    </button>

    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="isOpen" class="overlay" role="presentation" @click.self="close">
          <div class="lightbox" role="dialog" aria-modal="true" :aria-label="active?.alt">
            <button type="button" class="lightbox__close" aria-label="Close" @click="close">✕</button>

            <button
              v-if="media.length > 1"
              type="button"
              class="lightbox__nav lightbox__nav--prev"
              aria-label="Previous image"
              @click="prev"
            >‹</button>

            <figure class="lightbox__figure">
              <img :src="active?.src" :alt="active?.alt">
              <span v-if="active?.placeholder" class="gallery__badge gallery__badge--lightbox">Placeholder</span>
              <figcaption v-if="active?.caption" class="lightbox__caption">{{ active.caption }}</figcaption>
            </figure>

            <button
              v-if="media.length > 1"
              type="button"
              class="lightbox__nav lightbox__nav--next"
              aria-label="Next image"
              @click="next"
            >›</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-sm);
}

.gallery__thumb {
  position: relative;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: zoom-in;
  background: var(--bg2);
  transition: border-color var(--dur-hover) ease, transform var(--dur-hover) ease;
}

.gallery__thumb:hover {
  border-color: rgb(255 106 0 / 40%);
  transform: translateY(-2px);
}

.gallery__thumb img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.gallery__badge {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fg0);
  background: rgb(10 12 18 / 85%);
  border: 1px solid var(--line-strong);
  border-radius: 5px;
  padding: 3px 7px;
  pointer-events: none;
}

.gallery__badge--lightbox {
  top: 16px;
  right: 16px;
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: clamp(16px, 4vw, 48px);
  background: rgb(4 5 7 / 88%);
  backdrop-filter: blur(6px);
}

.lightbox {
  position: relative;
  width: min(920px, 100%);
  display: grid;
  place-items: center;
}

.lightbox__figure {
  position: relative;
  margin: 0;
  max-width: 100%;
}

.lightbox__figure img {
  display: block;
  max-width: 100%;
  max-height: 74dvh;
  border-radius: var(--radius-md);
  border: 1px solid var(--line-strong);
}

.lightbox__caption {
  margin-top: var(--space-sm);
  font-size: 13px;
  color: var(--fg2);
  text-align: center;
}

.lightbox__close {
  position: absolute;
  top: -44px;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--line-strong);
  background: var(--bg1);
  color: var(--fg0);
  cursor: pointer;
}

.lightbox__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  background: rgb(10 12 18 / 75%);
  color: var(--fg0);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.lightbox__nav--prev {
  left: -10px;
}

.lightbox__nav--next {
  right: -10px;
}

@media (max-width: 640px) {
  .lightbox__nav--prev {
    left: 4px;
  }

  .lightbox__nav--next {
    right: 4px;
  }
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 160ms ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
