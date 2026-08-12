# Real Site Data (Contact, Experience, Projects) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace placeholder/incomplete content in `app/data/{contact,experience,projects}.ts` with the site owner's real contact info, full work history, and seven real projects (PSALM plus six newly added), backed by real hosted PDFs.

**Architecture:** This is a data-only change — no new components, composables, or types. `app/data/*.ts` are plain exported TypeScript arrays/constants already consumed by existing pages (`resume.vue`, `experience.vue`, `projects/index.vue`, `projects/[slug].vue`, `colophon.vue`) via the existing `TimelineEntry` (`app/types/timeline.ts`) and `Project` (`app/types/project.ts`) interfaces. Five source PDFs get copied from the user's Downloads folder into `public/projects/<slug>/` so `Project.publications[].href` can link to them as static assets served at build time.

**Tech Stack:** Nuxt 4 / TypeScript (strict) — no new dependencies.

## Global Constraints

- Do not modify `app/types/timeline.ts` or `app/types/project.ts` — both interfaces already support every field used below.
- Do not modify `app/data/about.ts` or `app/data/education.ts` — confirmed accurate, out of scope.
- Do not touch PSALM's existing placeholder media SVGs — out of scope.
- No new logic/components are introduced. "Tests" for this plan are `pnpm typecheck`, `pnpm lint`, `pnpm test` (existing suite must stay green — no test imports `app/data` directly, confirmed by grep), and a manual visual check via `pnpm dev`.
- Source spec: `docs/superpowers/specs/2026-08-12-real-site-data-design.md` — all copy/content below is copied verbatim from it.

---

### Task 1: Real contact email

**Files:**
- Modify: `app/data/contact.ts:8-9`

**Interfaces:**
- Consumes: nothing new.
- Produces: `EMAIL_USER`, `EMAIL_DOMAIN` string constants — already consumed by `EmailLink.vue` (unchanged consumer, no signature change).

- [ ] **Step 1: Replace the placeholder email constants**

In `app/data/contact.ts`, replace lines 8-9:

```ts
export const EMAIL_USER = 'noah'
export const EMAIL_DOMAIN = 'glorycode.nl'
```

Leave the JSDoc comment above them and `REPO_URL` below them untouched.

- [ ] **Step 2: Verify the placeholder is gone**

Run: `grep -rn "REPLACE_ME\|replace-with-your-domain" app/`
Expected: no output (no matches).

- [ ] **Step 3: Typecheck and lint**

Run: `pnpm typecheck && pnpm lint`
Expected: both exit 0, no errors.

- [ ] **Step 4: Commit**

```bash
git add app/data/contact.ts
git commit -m "content: set real contact email"
```

---

### Task 2: Full work history in experience.ts

**Files:**
- Modify: `app/data/experience.ts` (full file replacement of the `experience` array)

**Interfaces:**
- Consumes: `TimelineEntry` from `~/types/timeline` (fields: `role: string`, `org: string`, `period: string`, `summary: string` — unchanged).
- Produces: `experience: TimelineEntry[]`, 10 entries, most-recent-first — consumed as-is by `app/pages/experience.vue` (renders in array order) and `app/pages/resume.vue` (re-sorts by parsed start year independently, so array order doesn't need to be date-sorted for that consumer, but must be for `experience.vue`'s "most recent first" copy).

- [ ] **Step 1: Replace the full contents of `app/data/experience.ts`**

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

- [ ] **Step 2: Verify entry count**

Run: `grep -c "role:" app/data/experience.ts`
Expected: `10`

- [ ] **Step 3: Typecheck and lint**

Run: `pnpm typecheck && pnpm lint`
Expected: both exit 0, no errors.

- [ ] **Step 4: Run existing test suite**

Run: `pnpm test`
Expected: all tests pass (no test imports `app/data/experience.ts` directly, so this only guards against an unrelated regression).

- [ ] **Step 5: Commit**

```bash
git add app/data/experience.ts
git commit -m "content: add full work history to experience.ts"
```

---

### Task 3: Six real projects in projects.ts

**Files:**
- Modify: `app/data/projects.ts` (append to the existing `projects` array, after the PSALM entry)

**Interfaces:**
- Consumes: `Project`, `ProjectMedia`, `ProjectPublication`, `ProjectLink` from `~/types/project` (all fields already defined: `slug`, `title`, `role?`, `period?`, `summary`, `overview?`, `stack`, `status?`, `media?`, `publications?`, `links` — unchanged).
- Produces: `projects: Project[]` grown from 1 to 7 entries — consumed as-is by `app/pages/projects/index.vue` (listing) and `app/pages/projects/[slug].vue` (case-study page keyed by `slug`), and by `app/pages/resume.vue` (`projects` artifacts list). New `status` values used: `'Coursework'`, `'Thesis'`, `'Exhibited'` — `CaseFile.vue` already renders `project.status ?? 'Published'` with no allowlist, so any string works.

- [ ] **Step 1: Append six entries to `app/data/projects.ts`, immediately after the closing `},` of the PSALM entry (before the array's closing `]`)**

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
      'A group project proposing a protein solubility prediction tool for insect-based food ingredients — extracting protein features and combining several models with ensemble learning to identify safer, more sustainable alternatives to conventional food additives.',
    overview: [
      'A group project proposing a protein solubility prediction tool for insect-based food ingredients — extracting protein features and combining several models with ensemble learning to identify safer, more sustainable alternatives to conventional food additives.',
      'Implemented as a Django application. Joint work with Bunyamin Thijssen, Claudia Sanchez, Parand Mohri, Mohammad Fayazi, and Laurence Manoukian, supervised by K. Schneider at Maastricht University.',
    ],
    stack: ['Python', 'Django', 'TensorFlow', 'Scikit-learn'],
    publications: [
      { label: 'Detect Alternative Insect-Based Ingredients For Solubility Properties', venue: 'Course project, Maastricht University, 2023', href: '/projects/eating-insects/paper.pdf' },
    ],
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
  {
    slug: 'frightened-flowers',
    title: 'Frightened Flowers',
    period: '2019',
    status: 'Exhibited',
    summary:
      'An interactive light installation for Glow Eindhoven 2019, later also shown at Dutch Design Week — potted plants that physically react to nearby visitors, detected through a staged array of PIR sensors behind custom 3D-printed housings and coordinated by a Raspberry Pi server driving Arduino-controlled hardware.',
    overview: [
      'An interactive light installation for Glow Eindhoven 2019, later also shown at Dutch Design Week — potted plants that physically move in response to nearby visitors.',
      'Visitor proximity is detected through a staged array of PIR sensors behind custom 3D-printed cone housings, tuned to register arm movement rather than legs or background noise. A Raspberry Pi running as a central server tracks each plant\'s state and pushes updates to Arduino-controlled hardware; the lifting mechanism itself was developed in collaboration with the TU Eindhoven Robohub.',
    ],
    stack: ['Arduino', 'Raspberry Pi', 'Python', 'PIR Sensors'],
    publications: [
      { label: 'Frightened Flowers — Research Report (Dutch)', venue: 'Internal research report, Glow Eindhoven, 2019', href: '/projects/frightened-flowers/research.pdf' },
    ],
    links: [
      { label: 'Installation video', href: 'https://www.youtube.com/watch?v=KNkMIjjfhcI' },
      { label: 'Installation video (alt)', href: 'https://www.youtube.com/watch?v=C89FyGgkbp0' },
    ],
  },
```

- [ ] **Step 2: Verify entry count**

Run: `grep -c "slug:" app/data/projects.ts`
Expected: `7` (PSALM + 6 new entries).

- [ ] **Step 3: Typecheck and lint**

Run: `pnpm typecheck && pnpm lint`
Expected: both exit 0. If typecheck fails, the most likely cause is a missing comma between the PSALM entry and the first new entry — check the array literal is still valid.

- [ ] **Step 4: Run existing test suite**

Run: `pnpm test`
Expected: all tests pass (`tests/unit/CaseFile.test.ts` and `tests/unit/CaseGallery.test.ts` construct their own fixture `Project` objects rather than importing `app/data/projects.ts`, so this only guards against an unrelated regression).

- [ ] **Step 5: Commit**

```bash
git add app/data/projects.ts
git commit -m "content: add six real projects alongside PSALM"
```

---

### Task 4: Host the five source PDFs as static assets

**Files:**
- Create: `public/projects/hybrid-generative-tabular/paper.pdf`
- Create: `public/projects/job-recommendation-xai/paper.pdf`
- Create: `public/projects/ontozsl-dpcgan/paper.pdf`
- Create: `public/projects/eating-insects/paper.pdf`
- Create: `public/projects/frightened-flowers/research.pdf`

**Interfaces:**
- Consumes: nothing (static files).
- Produces: five files served at build time from `/projects/<slug>/<file>.pdf`, matching the `href` values set on each project's `publications[]` entry in Task 3.

- [ ] **Step 1: Create the destination directories and copy each source PDF**

Run:

```bash
mkdir -p public/projects/hybrid-generative-tabular public/projects/job-recommendation-xai public/projects/ontozsl-dpcgan public/projects/eating-insects public/projects/frightened-flowers

cp "C:/Users/NScha/Downloads/Group_5___Final_Paper.pdf" public/projects/hybrid-generative-tabular/paper.pdf
cp "C:/Users/NScha/Downloads/Project_Plan_Group_2___DSDM_Project_1.pdf" public/projects/job-recommendation-xai/paper.pdf
cp "C:/Users/NScha/Downloads/Ontology_Based_Conditional_Generative_Adversarial_Networks_for_the_Generation_of_Personal_Health_Data.pdf" public/projects/ontozsl-dpcgan/paper.pdf
cp "C:/Users/NScha/Downloads/Project_3_1_Report.pdf" public/projects/eating-insects/paper.pdf
cp "C:/Users/NScha/Downloads/Frightened_Flowers_onderzoek.pdf" public/projects/frightened-flowers/research.pdf
```

- [ ] **Step 2: Verify all five files exist and are non-empty**

Run: `find public/projects -name "*.pdf" -size +1k | sort`

Expected output (5 lines):
```
public/projects/eating-insects/paper.pdf
public/projects/frightened-flowers/research.pdf
public/projects/hybrid-generative-tabular/paper.pdf
public/projects/job-recommendation-xai/paper.pdf
public/projects/ontozsl-dpcgan/paper.pdf
```

- [ ] **Step 3: Cross-check each `href` in `app/data/projects.ts` resolves to a file created above**

Run: `grep -oE "/projects/[a-z0-9-]+/[a-z]+\.pdf" app/data/projects.ts | sort -u`

Expected output (5 lines, matching the files from Step 1 exactly):
```
/projects/eating-insects/paper.pdf
/projects/frightened-flowers/research.pdf
/projects/hybrid-generative-tabular/paper.pdf
/projects/job-recommendation-xai/paper.pdf
/projects/ontozsl-dpcgan/paper.pdf
```

- [ ] **Step 4: Commit**

```bash
git add public/projects/hybrid-generative-tabular/paper.pdf public/projects/job-recommendation-xai/paper.pdf public/projects/ontozsl-dpcgan/paper.pdf public/projects/eating-insects/paper.pdf public/projects/frightened-flowers/research.pdf
git commit -m "content: host project paper/research PDFs"
```

---

### Task 5: Full verification pass

**Files:** none (verification only — no changes expected).

**Interfaces:** none.

- [ ] **Step 1: Run the full check suite**

Run: `pnpm typecheck && pnpm lint && pnpm test`
Expected: all three pass with exit code 0.

- [ ] **Step 2: Run a static generate to catch build-time issues (broken routes, missing assets)**

Run: `pnpm generate`
Expected: exits 0, `.output/public/projects/hybrid-generative-tabular/paper.pdf` (and the other 4 PDFs) exist in the output directory.

Run: `find .output/public/projects -name "*.pdf"`
Expected: 5 lines, matching Task 4's file list.

- [ ] **Step 3: Manual visual check via dev server**

Run: `pnpm dev` (leave running), then in a browser:
- Visit `/resume` — confirm the Contact table shows the real email via the "Copy" / mailto interaction, and the Experience/Education/Projects sections list all 10 experience entries and 7 projects.
- Visit `/experience` — confirm all 10 entries render, most-recent-first, with no visual overlap/breakage from the longer role/org strings (e.g. "Machine Learning Researcher Intern (graduation thesis)").
- Visit `/projects` — confirm 7 project cards render, each with the correct `status` badge ("Published" for PSALM, "Coursework" ×4, "Thesis", "Exhibited").
- Visit `/projects/hybrid-generative-tabular`, `/projects/job-recommendation-xai`, `/projects/ontozsl-dpcgan`, `/projects/eating-insects`, `/projects/frightened-flowers` — confirm each case-study page loads, the "Repository"/video links point to the right external URLs, and the publication link opens the correct hosted PDF.

Stop the dev server (Ctrl+C) once confirmed.

No commit for this task — verification only, no files changed.

---
