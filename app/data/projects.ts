import type { Project } from '~/components/portfolio/ProjectCard.vue'

/**
 * TODO: replace these placeholder entries with real projects.
 * Each card renders title/summary/stack/links exactly as given here —
 * there's no other content source to update.
 */
export const projects: Project[] = [
  {
    title: 'Example Project One',
    summary:
      'Replace with a one- or two-sentence outcome-focused summary: what it does, what problem it solved, and any measurable result.',
    stack: ['Python', 'PyTorch', 'FastAPI'],
    repoHref: 'https://github.com/nscharrenberg',
  },
  {
    title: 'Example Project Two',
    summary: 'Replace with another project — case studies read better than a bare feature list.',
    stack: ['TypeScript', 'Vue'],
    repoHref: 'https://codeberg.org/nscharrenberg',
  },
]
