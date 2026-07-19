// @vitest-environment nuxt
import type { VueWrapper } from '@vue/test-utils'
import { DOMWrapper, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'
import CaseGallery from '~/components/portfolio/CaseGallery.vue'
import type { ProjectMedia } from '~/types/project'

const MEDIA: ProjectMedia[] = [
  { src: '/a.svg', alt: 'Diagram A', caption: 'First caption', placeholder: true },
  { src: '/b.svg', alt: 'Diagram B' },
  { src: '/c.svg', alt: 'Diagram C' },
]

function body() {
  return new DOMWrapper(document.body)
}

let currentWrapper: VueWrapper | undefined

async function openLightbox(media: ProjectMedia[] = MEDIA, index = 0) {
  currentWrapper = mount(CaseGallery, { props: { media }, attachTo: document.body })
  await currentWrapper.findAll('.gallery__thumb')[index]!.trigger('click')
  await nextTick()
  return currentWrapper
}

afterEach(() => {
  currentWrapper?.unmount()
  currentWrapper = undefined
  document.body.innerHTML = ''
})

describe('CaseGallery', () => {
  it('renders a thumbnail per media item, with a badge only for placeholders', () => {
    currentWrapper = mount(CaseGallery, { props: { media: MEDIA }, attachTo: document.body })

    const thumbs = currentWrapper.findAll('.gallery__thumb')
    expect(thumbs).toHaveLength(3)
    expect(thumbs[0]!.find('.gallery__badge').exists()).toBe(true)
    expect(thumbs[1]!.find('.gallery__badge').exists()).toBe(false)
  })

  it('is closed until a thumbnail is clicked', () => {
    currentWrapper = mount(CaseGallery, { props: { media: MEDIA }, attachTo: document.body })
    expect(body().find('[role="dialog"]').exists()).toBe(false)
  })

  it('opens the lightbox on the clicked image, with its caption and placeholder badge', async () => {
    await openLightbox(MEDIA, 0)

    expect(body().find('[role="dialog"]').exists()).toBe(true)
    expect(body().find('.lightbox__figure img').attributes('src')).toBe('/a.svg')
    expect(body().find('.lightbox__caption').text()).toBe('First caption')
    expect(body().find('.gallery__badge--lightbox').exists()).toBe(true)
  })

  it('hides the caption and placeholder badge for images that have neither', async () => {
    await openLightbox(MEDIA, 1)

    expect(body().find('.lightbox__caption').exists()).toBe(false)
    expect(body().find('.gallery__badge--lightbox').exists()).toBe(false)
  })

  it('hides prev/next nav for a single-image gallery', async () => {
    await openLightbox([MEDIA[0]!], 0)

    expect(body().find('.lightbox__nav').exists()).toBe(false)
  })

  it('navigates forward and wraps around at the end', async () => {
    await openLightbox(MEDIA, 2)

    await body().find('.lightbox__nav--next').trigger('click')
    expect(body().find('.lightbox__figure img').attributes('src')).toBe('/a.svg')
  })

  it('navigates backward and wraps around at the start', async () => {
    await openLightbox(MEDIA, 0)

    await body().find('.lightbox__nav--prev').trigger('click')
    expect(body().find('.lightbox__figure img').attributes('src')).toBe('/c.svg')
  })

  it('navigates with ArrowRight/ArrowLeft while open', async () => {
    await openLightbox(MEDIA, 0)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
    await nextTick()
    expect(body().find('.lightbox__figure img').attributes('src')).toBe('/b.svg')

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))
    await nextTick()
    expect(body().find('.lightbox__figure img').attributes('src')).toBe('/a.svg')
  })

  it('ignores arrow keys while closed', async () => {
    currentWrapper = mount(CaseGallery, { props: { media: MEDIA }, attachTo: document.body })

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
    await nextTick()

    expect(body().find('[role="dialog"]').exists()).toBe(false)
  })

  it('closes via the close button, Escape, and the backdrop', async () => {
    await openLightbox()
    await body().find('.lightbox__close').trigger('click')
    expect(body().find('[role="dialog"]').exists()).toBe(false)

    await openLightbox()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    expect(body().find('[role="dialog"]').exists()).toBe(false)

    await openLightbox()
    await body().find('.overlay').trigger('click')
    expect(body().find('[role="dialog"]').exists()).toBe(false)
  })

  it('returns focus to the trigger thumbnail on close', async () => {
    const wrapper = mount(CaseGallery, { props: { media: MEDIA }, attachTo: document.body })
    const thumb = wrapper.findAll('.gallery__thumb')[1]!
    await thumb.trigger('click')
    await nextTick()

    await body().find('.lightbox__close').trigger('click')
    await nextTick()

    expect(document.activeElement).toBe(thumb.element)
    currentWrapper = wrapper
  })
})
