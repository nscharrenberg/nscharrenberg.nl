/**
 * Prefixes a root-relative internal path with the deploy base URL (Nuxt's
 * `app.baseURL`, e.g. `/nscharrenberg.nl/` on GitHub Pages). `<NuxtLink>` and
 * bundled asset URLs get this prefix automatically, but a plain string in a
 * `:href`/`:src` binding does not — so any literal internal path rendered
 * that way needs to go through this helper. External URLs are left as-is.
 */
export function withBaseUrl(path: string, base: string): string {
  if (/^https?:\/\//.test(path)) return path
  const trimmedBase = base.replace(/\/$/, '')
  return `${trimmedBase}${path}`
}
