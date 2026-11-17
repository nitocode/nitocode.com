<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue'
import { initLangue } from './i18n.js'

// Le HTML pré-rendu est en français : on bascule dans la langue du visiteur seulement après l'hydratation
onMounted(initLangue)
</script>
