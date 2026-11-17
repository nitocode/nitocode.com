<template>
  <EnTete :titre="`Roadmap ${projet.nom}`">
    <template #sur><RouterLink to="/">nitocode</RouterLink> / <RouterLink to="/roadmaps">roadmaps</RouterLink> / {{ projet.id }}</template>
    {{ t(projet.pitch) }}
  </EnTete>
  <main class="page">
    <section>
      <div class="entete-carte revele">
        <Progression :projet="projet" />
        <ul class="legende" :style="{ '--c': projet.couleur }">
          <li><span class="pc fait"></span>{{ t({ fr: 'terminé', en: 'done' }) }}</li>
          <li><span class="pc en-cours"></span>{{ t({ fr: 'en cours', en: 'in progress' }) }}</li>
          <li><span class="pc a-venir"></span>{{ t({ fr: 'à venir', en: 'coming up' }) }}</li>
        </ul>
      </div>
      <p class="astuce">{{ t({ fr: 'Survole ou touche un niveau pour lire le détail.', en: 'Hover or tap a level to read the details.' }) }}</p>
      <CarteNiveaux :projet="projet" />
      <div class="boutons">
        <a class="btn" :href="projet.lien" target="_blank" rel="noopener">{{ projet.lien.replace('https://', '') }}</a>
        <RouterLink class="btn creux" to="/roadmaps">{{ t({ fr: 'Les autres roadmaps', en: 'Other roadmaps' }) }}</RouterLink>
      </div>
    </section>
  </main>
  <PiedDePage />
</template>

<script setup>
import { computed } from 'vue'
import EnTete from '../components/EnTete.vue'
import PiedDePage from '../components/PiedDePage.vue'
import CarteNiveaux from '../components/CarteNiveaux.vue'
import Progression from '../components/Progression.vue'
import data from '../data/roadmaps.json'
import { t } from '../i18n.js'
import { usePage } from '../tete.js'
import { useRevele } from '../revele.js'

const props = defineProps({ id: { type: String, required: true } })
const projet = computed(() => data.projets.find(p => p.id === props.id))
usePage({
  titre: { fr: `Roadmap ${projet.value.nom}`, en: `${projet.value.nom} roadmap` },
  description: projet.value.pitch,
  chemin: `/roadmaps/${props.id}/`,
})
useRevele()
</script>

<style>
.entete-carte { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px 30px; margin-bottom: 8px; }
.legende { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px 18px; font: 15px var(--mono); color: var(--gris); }
.legende li { display: flex; align-items: center; gap: 8px; }
.legende .pc { width: 16px; height: 16px; background: var(--bloc-2); }
.legende .pc.fait { background: var(--c); }
.legende .pc.en-cours { background: var(--nuit); box-shadow: inset 0 0 0 3px var(--c); }
.astuce { color: var(--gris); font-size: 16px; margin: 0 0 30px; }
section > .boutons { margin-top: 20px; }
</style>
