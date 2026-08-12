# Real site data: contact, experience, projects

## Purpose

`app/data/*.ts` holds the site's content (per the README, it's plain TypeScript,
edited directly — no CMS). Several fields were placeholder or incomplete:

- `contact.ts` had a literal `REPLACE_ME` email.
- `experience.ts` only listed the two most recent roles.
- `projects.ts` only listed one project (PSALM), with no other real work represented.

This pass replaces those with the author's actual data, gathered via interview.
`about.ts` and `education.ts` were reviewed and confirmed already accurate — no
changes.

## 1. `app/data/contact.ts`

```ts
export const EMAIL_USER = 'noah'
export const EMAIL_DOMAIN = 'glorycode.nl'
```

`REPO_URL` and social links (LinkedIn/GitHub/Codeberg, hardcoded in `resume.vue`
and `index.vue`) are unchanged — confirmed correct.

## 2. `app/data/experience.ts` — full replacement

Ten entries, most-recent-first (matches `/experience` page's stated ordering;
`resume.vue` re-sorts by start year independently so raw order doesn't affect
it). Periods use month precision (`"Mon YYYY — Mon YYYY"` / `"Mon YYYY — Present"`)
since exact months are known and several roles overlap — this is a deliberate
departure from the previous year-only format, needed to make the overlapping
Contractuo/Arion roles legible rather than looking like a data error.

```ts
import type { TimelineEntry } from '~/types/timeline'

export const experience: TimelineEntry[] = [
  {
    role: 'Research Assistant',
    org: 'Maastricht University',
    period: 'Mar 2026 — Present',
    summary: 'Part-time. Synthetic data generation for the NWO-TDCC SSH project, with a focus on copyright infringement.',
  },
  {
    role: 'Machine Learning Researcher Intern (graduation thesis)',
    org: 'Contractuo',
    period: 'Apr 2025 — Oct 2025',
    summary: 'Benchmarked large language model unlearning techniques as a mitigation strategy against copyright infringement, with a focus on EU regulatory frameworks.',
  },
  {
    role: 'Machine Learning Researcher Intern',
    org: 'Contractuo',
    period: 'Sep 2024 — Apr 2025',
    summary: 'Researched on-premise automation for legal document analysis, delivering quantitative and qualitative insights to optimize tender procurement using large language models.',
  },
  {
    role: 'Machine Learning Engineer',
    org: 'Contractuo',
    period: 'Jul 2024 — Present',
    summary: 'Part-time. Focused on document intelligence and legal AI.',
  },
  {
    role: 'Software Engineer',
    org: 'Netpresenter',
    period: 'Sep 2023 — Jul 2024',
    summary: 'Platform development using Laravel and Vue.',
  },
  {
    role: 'Software Engineer',
    org: 'Educom & Detacom',
    period: 'Aug 2022 — Aug 2023',
    summary: 'Part-time. Financial software development — new features, bugfixing, performance improvements, and refactoring using C#/ASP.NET.',
  },
  {
    role: 'Software Engineer',
    org: 'World of Content',
    period: 'Aug 2021 — Feb 2022',
    summary: 'Part-time. Platform development using Laravel and Vue, mainly batch upload functionality and performance improvements.',
  },
  {
    role: 'Software Engineer',
    org: 'Arion',
    period: 'Jul 2020 — Jul 2021',
    summary: 'Part-time. Platform development using React Native and Node.js, and reworked the audio & feedback features.',
  },
  {
    role: 'AI / Software Engineering Intern (graduation internship)',
    org: 'Arion',
    period: 'Feb 2020 — Nov 2020',
    summary: 'Researched conversational AI (BERT models, wake-word detection, on-device NLP), built a prototype offline on-device conversational assistant for mobile ("running assistant"), and developed an administrative dashboard for the backend system.',
  },
  {
    role: 'Blockchain Consultant Intern',
    org: 'Bearingpoint Caribbean (now Blyce)',
    period: 'Aug 2018 — Feb 2019',
    summary: 'Researched the product portfolio for blockchain use-cases, delivered an advisory report on innovative opportunities, and built a proof-of-concept for the Sentoo Payment Platform.',
  },
]
```

## 3. `app/data/projects.ts` — append 5 entries after PSALM

Order: PSALM (flagship, unchanged) then most-recent-first by project period.
Periods are year-only, matching PSALM's existing style — the source dates
("finished in month X, ~6 months duration") are approximate, so year-only
avoids implying false precision. New `status` values ("Coursework"/"Thesis")
override the `CaseFile.vue` default of "Published" so unpublished coursework
isn't mislabeled.

```ts
  {
    slug: 'hybrid-generative-tabular',
    title: 'Hybrid Generative Models for High-Fidelity Synthetic Tabular Data',
    period: '2023 — 2024',
    status: 'Coursework',
    summary:
      'A group research project proposing two novel models for synthetic tabular data generation: a Transformer-enhanced CTGAN that uses attention to capture complex feature relationships, and VAE-DBM, a hybrid approach pairing Variational Autoencoders for continuous variables with Deep Boltzmann Machines for categorical ones. Evaluated against the Adult Census Income dataset for fidelity and utility.',
    overview: [
      'A group research project proposing two novel models for synthetic tabular data generation: a Transformer-enhanced CTGAN that uses attention to capture complex feature relationships, and VAE-DBM, a hybrid approach pairing Variational Autoencoders for continuous variables with Deep Boltzmann Machines for categorical ones.',
      'Evaluated against the Adult Census Income dataset for fidelity and utility. Joint work with Tauseef Ahmed, Jonathon Bird, and Aditya Shourya (equal contribution), supervised by Chang Sun at Maastricht University.',
    ],
    stack: ['Python', 'PyTorch'],
    publications: [
      { label: 'Hybrid Generative Models for High-Fidelity Synthetic Tabular Data', venue: 'Course project, Maastricht University, 2024', href: '/projects/hybrid-generative-tabular/paper.pdf' },
    ],
    links: [],
  },
  {
    slug: 'job-recommendation-xai',
    title: 'Multi-Stakeholder Explainable Job Recommendation Systems',
    period: '2023 — 2024',
    status: 'Coursework',
    summary:
      'A group research project on explainable AI for multi-stakeholder job recommender systems — examining how explanation techniques (text-based, graph-based, feature attribution) should differ across job seekers, recruiters, and company representatives to be genuinely useful to each audience.',
    overview: [
      'A group research project on explainable AI for multi-stakeholder job recommender systems — examining how explanation techniques (text-based, graph-based, feature attribution) should differ across job seekers, recruiters, and company representatives to be genuinely useful to each audience.',
      'Joint work with Al-Saeedi Ali, Arslan Ayse, Parii Dan, Franz Sebastian, and Postaru Damian, supervised by Francesco Barile and Roan Schellingerhout at Maastricht University.',
    ],
    stack: ['Python'],
    publications: [
      { label: 'Multi-Stakeholder Explainable Job Recommendation Systems', venue: 'Course project, Maastricht University, 2024', href: '/projects/job-recommendation-xai/paper.pdf' },
    ],
    links: [],
  },
  {
    slug: 'ontozsl-dpcgan',
    title: 'OntoZSL-DPCGAN',
    period: '2022 — 2023',
    status: 'Thesis',
    summary:
      'A BSc thesis introducing Onto-CGANs and OntoZSL-CGANs — generative models for synthetic personal health data that incorporate ontology embeddings and zero-shot learning to generate realistic data for sparse or entirely unseen patient classes, extending the DP-CGAN framework with semantic, ontology-aware conditioning.',
    overview: [
      'A BSc thesis introducing Onto-CGANs and OntoZSL-CGANs — generative models for synthetic personal health data that incorporate ontology embeddings and zero-shot learning to generate realistic data for sparse or entirely unseen patient classes.',
      'Extends the DP-CGAN framework with semantic, ontology-aware conditioning. Supervised by Chang Sun and Remzi Celebi at Maastricht University.',
    ],
    stack: ['Python', 'TensorFlow', 'PyTorch', 'Docker'],
    publications: [
      { label: 'Ontology-Based Conditional Generative Adversarial Networks for the Generation of Personal Health Data', venue: 'BSc Thesis, Maastricht University, 2023', href: '/projects/ontozsl-dpcgan/paper.pdf' },
    ],
    links: [
      { label: 'Repository', href: 'https://github.com/nscharrenberg/OntoZSL-DPCGAN' },
    ],
  },
  {
    slug: 'eating-insects',
    title: 'Eating Insects: Protein Property Prediction',
    period: '2022 — 2023',
    status: 'Coursework',
    summary:
      'A Django application that uses ensemble machine learning (sequential neural networks, random forests, decision trees, linear regression) to predict protein properties like solubility — automating a step in researching sustainable, insect-based food additives that would otherwise be done manually.',
    stack: ['Python', 'Django', 'TensorFlow', 'Scikit-learn'],
    links: [
      { label: 'Repository', href: 'https://github.com/nscharrenberg/EatingInsects' },
    ],
  },
  {
    slug: 'covid-21',
    title: 'COVID-21',
    period: '2021 — 2022',
    status: 'Coursework',
    summary:
      'A digital reimplementation of the board game Pandemic, built to pit AI agents (RHEA and MCTS-based) against human players in stopping a fictional pandemic and its mutations — an academic project exploring game-playing AI within a cooperative, stochastic board game.',
    stack: ['Java', 'JMonkeyEngine', 'Maven'],
    links: [
      { label: 'Repository', href: 'https://github.com/nscharrenberg/COVID-21' },
    ],
  },
```

## 4. New static assets

Copy the three source PDFs (currently in the user's Downloads folder) into
`public/projects/<slug>/paper.pdf`:

- `Group_5___Final_Paper.pdf` → `public/projects/hybrid-generative-tabular/paper.pdf`
- `Project_Plan_Group_2___DSDM_Project_1.pdf` → `public/projects/job-recommendation-xai/paper.pdf`
- `Ontology_Based_Conditional_Generative_Adversarial_Networks_for_the_Generation_of_Personal_Health_Data.pdf` → `public/projects/ontozsl-dpcgan/paper.pdf`

## Out of scope

- PSALM's existing placeholder media SVGs (`pipeline-placeholder.svg`,
  `dimensions-placeholder.svg`) — no real diagrams were provided, left as-is.
- `about.ts`, `education.ts` — confirmed accurate, unchanged.
- Any component/type changes — existing `TimelineEntry` and `Project` shapes
  already support every field used above.

## Testing

No new logic is introduced — this is a data-only change. Verification is:
`pnpm typecheck` (new fields conform to existing types), `pnpm lint`, and a
visual check of `/resume`, `/experience`, and `/projects` in the dev server.
