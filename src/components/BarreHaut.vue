<template>
  <div class="barre-haut">
    <RouterLink v-if="!accueil" to="/" class="accueil" :aria-label="t({ fr: 'Accueil', en: 'Home' })">
      <img src="/img/logo-complet.svg" alt="Nitocode" width="1080" height="212">
    </RouterLink>
    <nav class="nav" :aria-label="t({ fr: 'Pages', en: 'Pages' })">
      <RouterLink to="/roadmaps" :class="{ actif: route.path.startsWith('/roadmaps') }">Roadmaps</RouterLink>
      <RouterLink to="/workflows" :class="{ actif: route.path.startsWith('/workflows') }">Workflows</RouterLink>
    </nav>
    <div class="langues" role="group" aria-label="Langue / Language">
      <button type="button" lang="fr" title="Français" :aria-pressed="langue === 'fr'" @click="poseLangue('fr', true)">FR</button>
      <button type="button" lang="en" title="English" :aria-pressed="langue === 'en'" @click="poseLangue('en', true)">EN</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { langue, poseLangue, t } from '../i18n.js'
const route = useRoute()
defineProps({ accueil: Boolean })
</script>
