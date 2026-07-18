const isOpen = ref(false)

/**
 * Singleton (module-scoped state) so the trigger in the navbar and the
 * palette itself stay in sync without prop drilling.
 */
export function useCommandPalette() {
  function open() {
    isOpen.value = true
  }
  function close() {
    isOpen.value = false
  }
  function toggle() {
    isOpen.value = !isOpen.value
  }

  return { isOpen, open, close, toggle }
}
