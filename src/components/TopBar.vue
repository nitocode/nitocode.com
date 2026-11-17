<template>
  <div class="top-bar">
    <RouterLink v-if="!home" to="/" class="home-link" :aria-label="t({ fr: 'Accueil', en: 'Home' })">
      <img src="/img/logo-complet.svg" alt="Nitocode" width="1080" height="212">
    </RouterLink>
    <nav class="nav" aria-label="Pages">
      <RouterLink to="/roadmaps" :class="{ active: route.path.startsWith('/roadmaps') }">Roadmaps</RouterLink>
      <RouterLink to="/workflows" :class="{ active: route.path.startsWith('/workflows') }">Workflows</RouterLink>
    </nav>
    <div class="langs" role="group" aria-label="Langue / Language">
      <button type="button" lang="fr" title="Français" :aria-pressed="lang === 'fr'" @click="setLang('fr', true)">FR</button>
      <button type="button" lang="en" title="English" :aria-pressed="lang === 'en'" @click="setLang('en', true)">EN</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { lang, setLang, t } from '../i18n.js'

defineProps({ home: Boolean })
const route = useRoute()
</script>
