<template>
  <!-- Un workflow = une chaîne d'étapes ; au survol, la bulle dit comment et avec quoi -->
  <div class="schema-cadre">
    <ol class="schema" :style="{ '--n': workflow.etapes.length }">
      <li v-for="(e, i) in workflow.etapes" :key="i" class="etape" :class="e.qui">
        <Infobulle>
          <button type="button" class="bloc-etape" :aria-label="`${i + 1}. ${t(e.titre)}`">
            <span class="qui">{{ t(QUI[e.qui]) }}</span>
            <Icone :nom="e.icone" class="ico" />
            <span class="titre-etape">{{ t(e.titre) }}</span>
          </button>
          <template #bulle>
            <strong>{{ i + 1 }}. {{ t(e.titre) }}</strong>
            <p>{{ t(e.texte) }}</p>
            <span class="meta">{{ e.outil }}<template v-if="e.duree"> · {{ t(e.duree) }}</template></span>
          </template>
        </Infobulle>
      </li>
    </ol>
  </div>
</template>

<script setup>
import Icone from './Icone.vue'
import Infobulle from './Infobulle.vue'
import { t } from '../i18n.js'
import { QUI } from '../data/workflows.js'
defineProps({ workflow: { type: Object, required: true } })
</script>

<style>
.schema { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); gap: 30px; }
.etape { position: relative; --q: var(--auto); }
.etape.moi { --q: var(--moi); }
.etape.ia { --q: var(--ia); }
/* La flèche vers l'étape suivante */
.etape:not(:last-child)::after { content: ""; position: absolute; top: 50%; right: -24px; width: 18px; height: 18px; transform: translateY(-50%);
  background: var(--gris); clip-path: polygon(0 30%, 50% 30%, 50% 0, 100% 50%, 50% 100%, 50% 70%, 0 70%); }
.etape .ib { display: block; height: 100%; }
.bloc-etape { width: 100%; height: 100%; min-height: 150px; border: 0; cursor: help; font: inherit; color: var(--papier);
              display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 12px; padding: 14px 10px 16px;
              background: var(--bloc); box-shadow: inset 0 4px 0 var(--q), 5px 5px 0 #000; transition: transform .12s steps(2); }
.bloc-etape:hover { transform: translateY(-4px); }
.bloc-etape .qui { align-self: flex-start; font: 700 12px/1 var(--mono); letter-spacing: .08em; text-transform: uppercase;
                   background: var(--q); color: var(--encre); padding: 4px 6px 3px; }
.bloc-etape .ico { width: 40px; height: 40px; align-items: center; justify-content: center; }
.bloc-etape .titre-etape { font: 500 16px/1.3 var(--ubuntu); text-align: center; }
@media (max-width: 760px) {
  .schema { grid-template-columns: 1fr; gap: 26px; }
  .etape:not(:last-child)::after { top: auto; bottom: -22px; right: auto; left: 50%; transform: translateX(-50%) rotate(90deg); }
  .bloc-etape { min-height: 0; flex-direction: row; justify-content: flex-start; text-align: left; padding: 14px 16px; }
  .bloc-etape .qui { align-self: center; min-width: 46px; text-align: center; }
  .bloc-etape .ico { width: 32px; height: 32px; flex: none; }
  .bloc-etape .titre-etape { text-align: left; }
}
</style>
