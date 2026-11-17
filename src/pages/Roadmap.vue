<template>
  <PageHeader :title="`Roadmap ${project.name}`">
    <template #kicker><RouterLink to="/">nitocode</RouterLink> / <RouterLink to="/roadmaps">roadmaps</RouterLink> / {{ project.id }}</template>
    {{ t(project.pitch) }}
  </PageHeader>
  <main class="page">
    <section>
      <div class="map-header reveal">
        <ProgressBar :project="project" />
        <ul class="legend" :style="{ '--c': project.color }">
          <li><span class="sq done"></span>{{ t({ fr: 'terminé', en: 'done' }) }}</li>
          <li><span class="sq in-progress"></span>{{ t({ fr: 'en cours', en: 'in progress' }) }}</li>
          <li><span class="sq upcoming"></span>{{ t({ fr: 'à venir', en: 'coming up' }) }}</li>
        </ul>
      </div>
      <p class="hint">{{ t({ fr: 'Survole ou touche un niveau pour lire le détail.', en: 'Hover or tap a level to read the details.' }) }}</p>
      <LevelMap :project="project" />
      <div class="buttons">
        <a class="btn" :href="project.url" target="_blank" rel="noopener">{{ project.url.replace('https://', '') }}</a>
        <RouterLink class="btn outline" to="/roadmaps">{{ t({ fr: 'Les autres roadmaps', en: 'Other roadmaps' }) }}</RouterLink>
      </div>
    </section>
  </main>
  <SiteFooter />
</template>

<script setup>
import { computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import LevelMap from '../components/LevelMap.vue'
import ProgressBar from '../components/ProgressBar.vue'
import roadmaps from '../data/roadmaps.json'
import { t } from '../i18n.js'
import { usePage } from '../head.js'
import { useReveal } from '../reveal.js'

const props = defineProps({ id: { type: String, required: true } })
const project = computed(() => roadmaps.projects.find(p => p.id === props.id))
usePage({
  title: { fr: `Roadmap ${project.value.name}`, en: `${project.value.name} roadmap` },
  description: project.value.pitch,
  path: `/roadmaps/${props.id}/`,
})
useReveal()
</script>

<style>
.map-header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px 30px; margin-bottom: 8px; }
.legend { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px 18px; font: 15px var(--mono); color: var(--grey); }
.legend li { display: flex; align-items: center; gap: 8px; }
.legend .sq { width: 16px; height: 16px; background: var(--panel-2); }
.legend .sq.done { background: var(--c); }
.legend .sq.in-progress { background: var(--night); box-shadow: inset 0 0 0 3px var(--c); }
section > .buttons { margin-top: 20px; }
</style>
