<template>
  <EnTete :titre="t(w.titre)">
    <template #sur><RouterLink to="/">nitocode</RouterLink> / <RouterLink to="/workflows">workflows</RouterLink> / {{ w.id }}</template>
    {{ t(w.resume) }}
  </EnTete>
  <main class="page">
    <section>
      <p class="astuce">{{ t({ fr: 'Survole ou touche une étape pour lire le détail.', en: 'Hover or tap a step to read the details.' }) }}</p>
      <SchemaWorkflow :workflow="w" />
      <details class="deroule">
        <summary>{{ t({ fr: 'Tout lire étape par étape', en: 'Read it all step by step' }) }}</summary>
        <ol>
          <li v-for="(e, i) in w.etapes" :key="i" :class="e.qui">
            <span class="pastille"></span>
            <div><strong>{{ t(e.titre) }}</strong> <em>({{ t(QUI[e.qui]) }} · {{ e.outil }})</em><br>{{ t(e.texte) }}</div>
          </li>
        </ol>
      </details>
      <div class="boutons">
        <RouterLink v-if="suivant" class="btn" :to="`/workflows/${suivant.id}`">{{ t({ fr: 'Workflow suivant', en: 'Next workflow' }) }} : {{ t(suivant.titre) }}</RouterLink>
        <RouterLink class="btn creux" to="/workflows">{{ t({ fr: 'Tous les workflows', en: 'All workflows' }) }}</RouterLink>
      </div>
    </section>
  </main>
  <PiedDePage />
</template>

<script setup>
import { computed } from 'vue'
import EnTete from '../components/EnTete.vue'
import PiedDePage from '../components/PiedDePage.vue'
import SchemaWorkflow from '../components/SchemaWorkflow.vue'
import { QUI, WORKFLOWS } from '../data/workflows.js'
import { t } from '../i18n.js'
import { usePage } from '../tete.js'

const props = defineProps({ id: { type: String, required: true } })
const idx = computed(() => WORKFLOWS.findIndex(x => x.id === props.id))
const w = computed(() => WORKFLOWS[idx.value])
const suivant = computed(() => WORKFLOWS[(idx.value + 1) % WORKFLOWS.length])
usePage({ titre: w.value.titre, description: w.value.resume, chemin: `/workflows/${props.id}/` })
</script>

<style>
.deroule { margin: 44px 0 0; background: var(--bloc); padding: 16px 20px; box-shadow: 6px 6px 0 #000; }
.deroule summary { cursor: pointer; font-weight: 500; color: var(--papier); }
.deroule ol { list-style: none; margin: 16px 0 0; padding: 0; display: grid; gap: 16px; }
.deroule li { display: flex; gap: 12px; align-items: flex-start; }
.deroule li .pastille { margin-top: 6px; }
.deroule strong { color: var(--papier); font-weight: 500; }
.deroule em { color: var(--gris); font-style: normal; font-size: 15px; }
</style>
