<template>
  <EnTete titre="Roadmaps">
    <template #sur><RouterLink to="/">nitocode</RouterLink> / roadmaps</template>
    {{ t({ fr: 'Où en est chaque expérience : ce qui est fait, ce qui avance, ce qui arrive. Une carte par projet, un niveau par étape.', en: 'Where each experiment stands: what’s done, what’s moving, what’s next. One map per project, one level per milestone.' }) }}
  </EnTete>
  <main class="page">
    <section>
      <div class="projets">
        <RouterLink v-for="p in PROJETS" :key="p.id" :to="`/roadmaps/${p.id}`" class="projet revele" :style="{ '--c': p.couleur }">
          <div class="tete-projet">
            <Icone :nom="p.icone" class="ico" />
            <h2>{{ p.nom }}</h2>
          </div>
          <p>{{ t(p.pitch) }}</p>
          <Progression :projet="p" />
          <span class="lien">{{ t({ fr: 'Voir la carte', en: 'See the map' }) }}</span>
        </RouterLink>
      </div>
    </section>
  </main>
  <PiedDePage />
</template>

<script setup>
import EnTete from '../components/EnTete.vue'
import PiedDePage from '../components/PiedDePage.vue'
import Icone from '../components/Icone.vue'
import Progression from '../components/Progression.vue'
import data from '../data/roadmaps.json'
import { t } from '../i18n.js'
import { usePage } from '../tete.js'
import { useRevele } from '../revele.js'

const PROJETS = data.projets
usePage({
  titre: { fr: 'Roadmaps', en: 'Roadmaps' },
  description: { fr: 'Les roadmaps publiques de Noubal, Nitosouris et du labo Nitocode.', en: 'The public roadmaps of Noubal, Nitosouris and the Nitocode lab.' },
  chemin: '/roadmaps/',
})
useRevele()
</script>

<style>
.projets { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr)); gap: 30px; }
.projet { display: flex; flex-direction: column; gap: 14px; padding: 24px; text-decoration: none; background: var(--bloc);
          box-shadow: inset 0 6px 0 var(--c), 6px 6px 0 #000; transition: transform .16s steps(2); }
.projet:hover { transform: translateY(-6px); }
.projet .tete-projet { display: flex; align-items: center; gap: 14px; }
.projet .ico { width: 40px; }
.projet h2 { margin: 0; padding: 0; background: none; font-size: 26px; }
.projet p { margin: 0; color: var(--texte); flex: 1; }
.projet .lien { --c: inherit; color: var(--c); padding: 0; }
</style>
