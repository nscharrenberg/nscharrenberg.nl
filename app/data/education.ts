import type { TimelineEntry } from '~/components/portfolio/TimelineItem.vue'

/**
 * TODO: replace with real degrees/institutions, most recent first.
 * Same shape as experience.ts — "role" doubles as the degree/programme name.
 */
export const education: TimelineEntry[] = [
  {
    role: 'Degree programme',
    org: 'Institution',
    period: '20XX — 20XX',
    summary: 'Thesis title or honors note, if any.',
  },
]
