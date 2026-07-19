import type { Project } from '~/types/project'

/**
 * Add more entries here as new projects are ready to show — same shape as PSALM below.
 * `overview` powers the /projects/[slug] case-study page; `summary` stays the short
 * blurb shown on the /projects list card.
 */
export const projects: Project[] = [
  {
    slug: 'psalm',
    title: 'PSALM',
    period: '2023 — 2025',
    summary:
      'A thesis project building an LLM-as-a-judge framework for evaluating copyright infringement under EU law. PSALM scores stylistic appropriation in fine-tuned language models across ten dimensions, from computational overlap to statutory exceptions like parody and pastiche, and was tested against Llama 3.2 models fine-tuned on Dutch literary works.',
    overview: [
      'A thesis project building an LLM-as-a-judge framework for evaluating copyright infringement under EU law.',
      'PSALM scores stylistic appropriation in fine-tuned language models across ten dimensions, from computational overlap to statutory exceptions like parody and pastiche, and was tested against Llama 3.2 models fine-tuned on Dutch literary works.',
    ],
    stack: ['Python', 'PyTorch', 'Jupyter', 'Docker'],
    media: [
      {
        src: '/projects/psalm/pipeline-placeholder.svg',
        alt: 'Illustrative pipeline diagram: corpus, fine-tuned model, PSALM scorer, report',
        caption: 'Illustrative pipeline — placeholder diagram, not a real system screenshot.',
        placeholder: true,
      },
      {
        src: '/projects/psalm/dimensions-placeholder.svg',
        alt: 'Illustrative ten-dimension radar chart',
        caption: 'Illustrative shape — placeholder, not real evaluation results.',
        placeholder: true,
      },
    ],
    publications: [
      { label: 'PSALM — Preprint', venue: 'arXiv, 2026', href: 'https://arxiv.org/abs/2606.31250' },
      { label: 'PSALM — Literature Review', venue: 'NLLP Workshop 2025', href: 'https://aclanthology.org/2025.nllp-1.9/' },
    ],
    links: [
      { label: 'Repository', href: 'https://codeberg.org/nscharrenberg/PSALM' },
    ],
  },
]
