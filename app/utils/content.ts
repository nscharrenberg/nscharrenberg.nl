/**
 * Walks a parsed Markdown body and counts words in text nodes. Used to show
 * a real, computed word count / read time instead of a hand-typed one that
 * would drift from the actual content.
 *
 * Nuxt Content v3's body AST ("minimark") is array-based, not the hast-like
 * `{type, value, children}` object tree you might expect: a tag node is
 * `[tagName, attrs, ...children]`, and a node LIST is just an array of
 * those (or of plain text strings). We tell the two apart by checking
 * whether element 0 looks like a tag name — if so, skip the attrs object
 * at index 1 and recurse into the rest; otherwise treat the whole array as
 * a list of sibling nodes.
 */
export function countWords(node: unknown): number {
  if (!node) return 0

  if (typeof node === 'string') {
    return node.trim().split(/\s+/).filter(Boolean).length
  }

  if (Array.isArray(node)) {
    const [first, second] = node
    const looksLikeTagNode = typeof first === 'string' && typeof second === 'object' && second !== null && !Array.isArray(second)
    const items = looksLikeTagNode ? node.slice(2) : node
    return items.reduce((sum: number, child) => sum + countWords(child), 0)
  }

  if (typeof node === 'object') {
    const n = node as { value?: unknown }
    if (Array.isArray(n.value)) return countWords(n.value)
  }

  return 0
}

export function estimateReadMinutes(words: number): number {
  return Math.max(1, Math.round(words / 200))
}

/** Rough `ls -la`-style file size, derived from the same word count (~6 bytes/word incl. spaces/markup). */
export function estimateFileSize(words: number): string {
  const kb = (words * 6) / 1024
  return kb < 1 ? `${Math.max(1, Math.round(kb * 1024))}B` : `${kb.toFixed(1)}K`
}
