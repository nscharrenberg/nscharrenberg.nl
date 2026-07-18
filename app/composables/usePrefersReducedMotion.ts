/**
 * SSR-safe reactive read of `prefers-reduced-motion`.
 * Returns `false` on the server and during the first paint, then updates
 * once mounted — matching how the media query itself behaves.
 */
export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
