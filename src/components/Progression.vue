<template>
  <!-- Barre de progression en cases : une case par jalon -->
  <div class="progression" :style="{ '--c': projet.couleur }">
    <span class="cases" aria-hidden="true">
      <span v-for="j in projet.jalons" :key="j.id" class="pc" :class="j.statut"></span>
    </span>
    <span class="compte">{{ faits }}/{{ projet.jalons.length }} {{ t({ fr: 'niveaux terminés', en: 'levels done' }) }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { t } from '../i18n.js'
const props = defineProps({ projet: { type: Object, required: true } })
const faits = computed(() => props.projet.jalons.filter(j => j.statut === 'fait').length)
</script>

<style>
.progression { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 14px; }
.progression .cases { display: flex; gap: 4px; }
.progression .pc { width: 18px; height: 18px; background: var(--bloc-2); }
.progression .pc.fait { background: var(--c); }
.progression .pc.en-cours { background: var(--nuit); box-shadow: inset 0 0 0 3px var(--c); animation: clignote 1s steps(1) infinite; }
.progression .compte { font: 15px var(--mono); color: var(--gris); }
</style>
