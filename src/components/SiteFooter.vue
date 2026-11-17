<template>
  <div class="dither"></div>
  <div class="page">
    <footer>
      <span class="signature"><PixelIcon name="moon" />{{ t({ fr: 'codé la nuit, utile le jour', en: 'coded at night, useful by day' }) }}</span>
      <nav>
        <RouterLink to="/">nitocode.com</RouterLink>
        <RouterLink to="/roadmaps">Roadmaps</RouterLink>
        <RouterLink to="/workflows">Workflows</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup>
import PixelIcon from './PixelIcon.vue'
import { t } from '../i18n.js'
</script>
