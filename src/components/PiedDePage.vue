<template>
  <div class="tramage"></div>
  <div class="page">
    <footer>
      <span class="signe"><Icone nom="lune" />{{ t({ fr: 'codé la nuit, utile le jour', en: 'coded at night, useful by day' }) }}</span>
      <nav>
        <RouterLink to="/">nitocode.com</RouterLink>
        <RouterLink to="/roadmaps">Roadmaps</RouterLink>
        <RouterLink to="/workflows">Workflows</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup>
import Icone from './Icone.vue'
import { t } from '../i18n.js'
</script>
