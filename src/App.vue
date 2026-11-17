<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import { initLang } from './i18n.js'

// Pre-rendered HTML is French: switch to the visitor's language only after hydration
onMounted(initLang)
</script>
