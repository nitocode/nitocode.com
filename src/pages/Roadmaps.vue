<template>
  <PageHeader title="Roadmaps">
    <template #kicker><RouterLink to="/">nitocode</RouterLink> / roadmaps</template>
    {{ t({ fr: 'Où en est chaque expérience : ce qui est fait, ce qui avance, ce qui arrive. Une carte par projet, un niveau par étape.', en: 'Where each experiment stands: what’s done, what’s moving, what’s next. One map per project, one level per milestone.' }) }}
  </PageHeader>
  <main id="main" class="page" tabindex="-1">
    <section>
      <div class="projects">
        <RouterLink v-for="p in roadmaps.projects" :key="p.id" :to="`/roadmaps/${p.id}`" class="project reveal" :style="{ '--c': p.color }">
          <div class="project-head">
            <PixelIcon :name="p.icon" class="icon" />
            <h2>{{ p.name }}</h2>
          </div>
          <p>{{ t(p.pitch) }}</p>
          <ProgressBar :project="p" />
          <span class="link">{{ t({ fr: 'Voir la carte', en: 'See the map' }) }}</span>
        </RouterLink>
      </div>
    </section>
  </main>
  <SiteFooter />
</template>

<script setup>
import PageHeader from '../components/PageHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import PixelIcon from '../components/PixelIcon.vue'
import ProgressBar from '../components/ProgressBar.vue'
import roadmaps from '../data/roadmaps.json'
import { t } from '../i18n.js'
import { usePage } from '../head.js'
import { useReveal } from '../reveal.js'

usePage({
  title: { fr: 'Roadmaps', en: 'Roadmaps' },
  description: { fr: 'Les roadmaps publiques de Noubal, Nitosouris et du labo Nitocode.', en: 'The public roadmaps of Noubal, Nitosouris and the Nitocode lab.' },
  path: '/roadmaps/',
})
useReveal()
</script>

<style>
.projects { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr)); gap: 30px; }
.project { display: flex; flex-direction: column; gap: 14px; padding: 24px; text-decoration: none; background: var(--panel);
           box-shadow: inset 0 6px 0 var(--c), 6px 6px 0 #000; transition: transform .16s steps(2); }
.project:hover { transform: translateY(-6px); }
.project .project-head { display: flex; align-items: center; gap: 14px; }
.project .icon { width: 40px; }
.project h2 { margin: 0; padding: 0; background: none; font-size: 26px; }
.project p { margin: 0; color: var(--text); flex: 1; }
.project .link { color: var(--c); font: 500 17px var(--ubuntu); }
.project .link::before { content: "▶ "; }
</style>
