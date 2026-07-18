<script setup lang="ts">
interface Command {
  label: string
  hint: string
  path: string
}

const STATIC_COMMANDS: Command[] = [
  { label: 'Home', hint: '~', path: '/' },
  { label: 'About', hint: '~/about', path: '/about' },
  { label: 'Projects', hint: '~/projects', path: '/projects' },
  { label: 'Experience', hint: '~/experience', path: '/experience' },
  { label: 'Writing', hint: '~/writing', path: '/writing' },
  { label: 'Resume', hint: '~/resume', path: '/resume' },
]

const { isOpen, close } = useCommandPalette()

const LISTBOX_ID = 'cmdk-listbox'
function optionId(i: number) {
  return `cmdk-option-${i}`
}

const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
const triggerToRefocus = ref<HTMLElement | null>(null)

const { data: posts, execute: loadPosts } = useAsyncData(
  'cmdk-writing',
  () => queryCollection('writing').select('title', 'path').all(),
  { immediate: false },
)

const commands = computed<Command[]>(() => [
  ...STATIC_COMMANDS,
  ...(posts.value ?? []).map((post) => ({
    label: post.title,
    hint: post.path,
    path: post.path,
  })),
])

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return commands.value
  return commands.value.filter(
    (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q),
  )
})

watch(results, () => {
  activeIndex.value = 0
})

watch(isOpen, async (open) => {
  // Hide/disable the rest of the app from focus and the accessibility tree
  // while the modal is open — CommandPalette itself lives outside #__nuxt
  // (teleported to <body>), so this doesn't affect the palette.
  document.getElementById('__nuxt')?.toggleAttribute('inert', open)

  if (open) {
    triggerToRefocus.value = (document.activeElement as HTMLElement) ?? null
    query.value = ''
    activeIndex.value = 0
    if (!posts.value) loadPosts()
    await nextTick()
    inputRef.value?.focus()
  } else {
    triggerToRefocus.value?.focus?.()
  }
})

function select(command: Command) {
  close()
  navigateTo(command.path)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, results.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const command = results.value[activeIndex.value]
    if (command) select(command)
  } else if (e.key === 'Escape') {
    close()
  } else if (e.key === 'Tab') {
    // The input is the only real tab stop in here — keep focus trapped in
    // the dialog rather than letting it escape to (inert, but still) DOM
    // order elsewhere.
    e.preventDefault()
  }
}

function onGlobalKeydown(e: KeyboardEvent) {
  const isMod = e.metaKey || e.ctrlKey
  if (isMod && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    useCommandPalette().toggle()
  } else if (e.key === 'Escape' && isOpen.value) {
    close()
  }
}

onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onGlobalKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="palette">
      <div v-if="isOpen" class="overlay" role="presentation" @click.self="close">
        <div class="panel" role="dialog" aria-modal="true" aria-label="Command palette">
          <div class="panel__input-row">
            <span class="panel__prompt">$</span>
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              role="combobox"
              class="panel__input"
              placeholder="Search pages and posts..."
              autocomplete="off"
              spellcheck="false"
              aria-autocomplete="list"
              aria-expanded="true"
              :aria-controls="LISTBOX_ID"
              :aria-activedescendant="results.length ? optionId(activeIndex) : undefined"
              @keydown="onKeydown"
            >
            <kbd class="panel__esc">esc</kbd>
          </div>

          <ul v-if="results.length" :id="LISTBOX_ID" class="panel__list" role="listbox">
            <li
              v-for="(command, i) in results"
              :id="optionId(i)"
              :key="command.path"
              role="option"
              :aria-selected="i === activeIndex"
              class="panel__item"
              :class="{ 'panel__item--active': i === activeIndex }"
              @mouseenter="activeIndex = i"
              @click="select(command)"
            >
              <span class="panel__label">{{ command.label }}</span>
              <span class="panel__hint">{{ command.hint }}</span>
            </li>
          </ul>
          <p v-else class="panel__empty">No matches.</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: min(18vh, 160px);
  background: rgb(4 5 7 / 70%);
  backdrop-filter: blur(4px);
}

.panel {
  width: min(560px, 92vw);
  border-radius: var(--radius-lg);
  border: 1px solid var(--line-strong);
  background: var(--bg1);
  box-shadow: 0 30px 80px rgb(0 0 0 / 55%), 0 0 0 1px rgb(255 106 0 / 8%);
  overflow: hidden;
}

.panel__input-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--line);
}

.panel__prompt {
  color: var(--accent);
  font-weight: 700;
}

.panel__input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--fg0);
  font-family: var(--font-mono);
  font-size: 15px;
}

.panel__input::placeholder {
  color: var(--fg2);
}

.panel__esc {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--fg2);
  border: 1px solid var(--line-strong);
  border-radius: 5px;
  padding: 2px 6px;
}

.panel__list {
  max-height: 320px;
  overflow-y: auto;
  padding: 8px;
}

.panel__item {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.panel__item--active {
  background: var(--bg2);
}

.panel__item--active .panel__label {
  color: var(--accent);
}

.panel__label {
  color: var(--fg0);
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.panel__hint {
  color: var(--fg2);
  font-size: 12px;
  white-space: nowrap;
}

.panel__empty {
  padding: 24px 18px;
  color: var(--fg2);
  font-size: 13.5px;
  margin: 0;
}

.palette-enter-active,
.palette-leave-active {
  transition: opacity 160ms ease;
}

.palette-enter-from,
.palette-leave-to {
  opacity: 0;
}
</style>
