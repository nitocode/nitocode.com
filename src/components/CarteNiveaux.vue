<template>
  <!-- Roadmap façon carte de jeu : un chemin en serpentin, un niveau par jalon -->
  <ol ref="racine" class="carte" :style="{ '--c': projet.couleur, '--cols': cols }">
    <li v-for="(j, i) in projet.jalons" :key="j.id" class="case" :class="j.statut"
        :style="{ gridRow: Math.floor(i / cols) + 1, gridColumn: colonne(i) + 1 }">
      <span v-for="s in segments(i)" :key="s.cote" class="piste" :class="[s.cote, { parcourue: s.parcourue }]"></span>
      <Infobulle>
        <button type="button" class="niveau" :aria-label="`${i + 1}. ${t(j.titre)} (${t(STATUTS[j.statut])})`">
          <span class="num">{{ i + 1 }}</span>
          <Icone v-if="j.statut === 'fait'" nom="coche" class="sym" />
          <span v-else-if="j.statut === 'en-cours'" class="sym joue" aria-hidden="true">▶</span>
          <Icone v-else nom="cadenas" class="sym" />
        </button>
        <template #bulle>
          <strong>{{ t(j.titre) }}</strong>
          <p>{{ t(j.texte) }}</p>
          <span class="meta">{{ PICTO[j.statut] }} {{ t(STATUTS[j.statut]) }} · {{ t(j.quand) }}</span>
        </template>
      </Infobulle>
      <span class="nom">{{ t(j.titre) }}</span>
      <span class="quand">{{ t(j.quand) }}</span>
    </li>
  </ol>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Icone from './Icone.vue'
import Infobulle from './Infobulle.vue'
import { t } from '../i18n.js'

const props = defineProps({ projet: { type: Object, required: true } })
const STATUTS = {
  fait: { fr: 'terminé', en: 'done' },
  'en-cours': { fr: 'en cours', en: 'in progress' },
  'a-venir': { fr: 'à venir', en: 'coming up' },
}
const PICTO = { fait: '✓', 'en-cours': '▶', 'a-venir': '🔒' }

// Nombre de niveaux par ligne selon la largeur (4 au pré-rendu, recalculé dans le navigateur)
const racine = ref(null), cols = ref(4)
let ro
onMounted(() => {
  ro = new ResizeObserver(([e]) => {
    const w = e.contentRect.width
    cols.value = w >= 760 ? 4 : w >= 470 ? 3 : 2
  })
  ro.observe(racine.value)
})
onBeforeUnmount(() => ro?.disconnect())

const ligne = i => Math.floor(i / cols.value)
// Serpentin : une ligne sur deux se lit de droite à gauche
const colonne = i => (ligne(i) % 2 ? cols.value - 1 - (i % cols.value) : i % cols.value)

// Morceaux de chemin autour d'un niveau : vers le précédent et vers le suivant.
// Dans une même ligne, un demi-trait horizontal ; d'une ligne à l'autre, le virage passe par le bord extérieur.
function segments(i) {
  const n = props.projet.jalons.length, s = []
  const vers = (j, parcourue) => {
    if (j < 0 || j >= n) return
    if (ligne(j) === ligne(i)) s.push({ cote: colonne(j) < colonne(i) ? 'gauche' : 'droite', parcourue })
    else {
      const bord = ligne(Math.min(i, j)) % 2 ? 'g' : 'd'   // le virage se fait du côté où la ligne du haut finit
      s.push({ cote: (bord === 'd' ? 'droite' : 'gauche') + ' sort', parcourue })
      s.push({ cote: (j > i ? 'bas-' : 'haut-') + bord, parcourue })
    }
  }
  const jal = props.projet.jalons
  vers(i - 1, i > 0 && jal[i - 1].statut === 'fait')
  vers(i + 1, jal[i].statut === 'fait')
  return s
}
</script>

<style>
.carte { --cols: 4; --e: 6px; --h: 76px; list-style: none; margin: 0; padding: 0 0 0;
         display: grid; grid-template-columns: repeat(var(--cols), 1fr); }
.case { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 10px 34px; min-width: 0; }
/* Le chemin */
.piste { position: absolute; background: var(--bloc-2); z-index: 0; }
.piste.parcourue { background: var(--c); }
.piste.gauche, .piste.droite { top: calc(var(--h) / 2 - var(--e) / 2); height: var(--e); }
.piste.gauche { left: 0; right: 50%; }
.piste.droite { left: 50%; right: 0; }
.piste.bas-d, .piste.bas-g { top: calc(var(--h) / 2 - var(--e) / 2); bottom: 0; width: var(--e); }
.piste.haut-d, .piste.haut-g { top: 0; height: calc(var(--h) / 2 + var(--e) / 2); width: var(--e); }
.piste.bas-d, .piste.haut-d { right: 0; }
.piste.bas-g, .piste.haut-g { left: 0; }
/* Le niveau */
.case .ib { z-index: 1; height: var(--h); display: flex; align-items: center; }
.niveau { position: relative; width: 64px; height: 64px; border: 0; padding: 0; cursor: help; display: grid; place-items: center;
          font: inherit; background: var(--bloc); box-shadow: inset 0 0 0 3px var(--bloc-2), 5px 5px 0 #000;
          transition: transform .12s steps(2); }
.niveau:hover { transform: translateY(-4px); }
.niveau .num { position: absolute; top: 4px; left: 6px; font: 13px var(--mono); color: var(--gris); }
.niveau .sym { width: 26px; }
.fait .niveau { background: var(--c); box-shadow: inset 0 -6px 0 rgba(0,0,0,.22), 5px 5px 0 #000; }
.fait .niveau .num { color: var(--encre); }
.fait .niveau .sym svg rect { fill: var(--encre); }
.en-cours .niveau { background: var(--nuit); box-shadow: inset 0 0 0 4px var(--c), 5px 5px 0 #000; }
.en-cours .niveau .joue { width: auto; color: var(--c); font-size: 26px; line-height: 1; }
.en-cours .niveau::after { content: ""; position: absolute; inset: -9px; box-shadow: 0 0 0 3px var(--c); animation: clignote 1s steps(1) infinite; pointer-events: none; }
.a-venir .niveau .sym { width: 20px; opacity: .8; }
.case .nom { margin-top: 10px; font-weight: 500; color: var(--papier); line-height: 1.3; font-size: 16px; overflow-wrap: anywhere; }
.a-venir .nom { color: var(--gris); }
.case .quand { font: 14px var(--mono); color: var(--gris); }
.en-cours .quand { color: var(--c); }
</style>
