<template>
  <PageHeader title="Workflows">
    <template #kicker><RouterLink to="/">nitocode</RouterLink> / workflows</template>
    {{ t({ fr: 'Comment chaque chose est fabriquée avec quelques heures par semaine : ce que je fais, ce que fait l’IA, et ce qui tourne tout seul.', en: 'How each thing gets made with a few hours a week: what I do, what AI does, and what runs on its own.' }) }}
  </PageHeader>
  <main id="main" class="page" tabindex="-1">
    <section>
      <ul class="who-legend reveal">
        <li v-for="(label, key) in WHO" :key="key" :class="key"><span class="dot"></span><strong>{{ t(label) }}</strong> {{ t(EXPLAIN[key]) }}</li>
      </ul>
      <div class="workflow-list">
        <RouterLink v-for="w in WORKFLOWS" :key="w.id" :to="`/workflows/${w.id}`" class="workflow-card reveal">
          <PixelIcon :name="w.icon" class="icon" />
          <div>
            <h2>{{ t(w.title) }}</h2>
            <p>{{ t(w.summary) }}</p>
            <span class="split" aria-hidden="true">
              <span v-for="(s, i) in w.steps" :key="i" class="dot" :class="s.who"></span>
            </span>
          </div>
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
import { WHO, WORKFLOWS } from '../data/workflows.js'
import { t } from '../i18n.js'
import { usePage } from '../head.js'
import { useReveal } from '../reveal.js'

const EXPLAIN = {
  me: { fr: 'je le fais à la main', en: 'I do it by hand' },
  ai: { fr: 'Claude le fait, je relis', en: 'Claude does it, I review' },
  auto: { fr: 'un script ou une routine, sans personne', en: 'a script or routine, nobody involved' },
}
usePage({
  title: { fr: 'Workflows', en: 'Workflows' },
  description: { fr: 'Les coulisses de Nitocode : brief quotidien, développement avec Claude Code, posts sur les réseaux.', en: 'Behind the scenes at Nitocode: daily brief, building with Claude Code, social media posts.' },
  path: '/workflows/',
})
useReveal()
</script>

<style>
.who-legend { list-style: none; margin: 0 0 36px; padding: 0; display: flex; flex-wrap: wrap; gap: 8px 28px; color: var(--grey); font-size: 16px; }
.who-legend li { display: flex; align-items: center; gap: 8px; }
.who-legend strong { color: var(--paper); font-weight: 500; }
.workflow-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(420px, 100%), 1fr)); gap: 26px; }
.workflow-card { display: grid; grid-template-columns: 48px 1fr; gap: 18px; padding: 22px; text-decoration: none; background: var(--panel);
                 box-shadow: 6px 6px 0 #000; transition: transform .16s steps(2); }
.workflow-card:hover { transform: translateY(-6px); }
.workflow-card:hover h2 { color: var(--purple); }
.workflow-card .icon { width: 48px; }
.workflow-card h2 { font-size: 22px; margin: 0 0 8px; padding: 0; background: none; }
.workflow-card p { margin: 0 0 14px; color: var(--text); font-size: 17px; }
.split { display: flex; gap: 4px; }
</style>
