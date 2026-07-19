export interface ProjectLink {
  label: string
  href: string
}

export interface ProjectMedia {
  src: string
  alt: string
  caption?: string
  /** True for illustrative/demo imagery, rendered with a visible "placeholder" badge. */
  placeholder?: boolean
}

export interface ProjectPublication {
  /** e.g. "PSALM — Literature Review" */
  label: string
  /** e.g. "NLLP Workshop 2025" */
  venue: string
  href: string
}

export interface Project {
  slug: string
  title: string
  role?: string
  period?: string
  summary: string
  /** Longer-form paragraphs for the case-study detail page. Falls back to `summary` if omitted. */
  overview?: string[]
  stack: string[]
  /** Defaults to "Published" — set explicitly for in-progress work. */
  status?: string
  media?: ProjectMedia[]
  publications?: ProjectPublication[]
  links: ProjectLink[]
}
