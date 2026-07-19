<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { EMAIL_DOMAIN, EMAIL_USER } from '~/data/contact'

interface Props {
  /** Shown before the address resolves on mount, and as the link text if `showAddress` is false. */
  label?: string
  /** Render the actual address as the link text once resolved, instead of the static label. */
  showAddress?: boolean
}

withDefaults(defineProps<Props>(), { label: 'Email', showAddress: false })

const address = ref('')
const href = computed(() => (address.value ? `mailto:${address.value}` : undefined))

onMounted(() => {
  // Assembled here rather than written in the template/data as one string —
  // the prerendered HTML never contains a matchable address, only real
  // visitors with JS (which is effectively everyone on a resume site) see
  // it, resolved well before a user could trigger the resume's print flow.
  address.value = `${EMAIL_USER}@${EMAIL_DOMAIN}`
})
</script>

<template>
  <a :href="href" :class="{ 'is-pending': !address }">
    <slot>{{ showAddress && address ? address : label }}</slot>
  </a>
</template>
