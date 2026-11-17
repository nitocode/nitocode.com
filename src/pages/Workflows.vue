<template>
  <EnTete titre="Workflows">
    <template #sur><RouterLink to="/">nitocode</RouterLink> / workflows</template>
    {{ t({ fr: 'Comment chaque chose est fabriquée avec quelques heures par semaine : ce que je fais, ce que fait l’IA, et ce qui tourne tout seul.', en: 'How each thing gets made with a few hours a week: what I do, what AI does, and what runs on its own.' }) }}
  </EnTete>
  <main class="page">
    <section>
      <ul class="legende-qui revele">
        <li v-for="(q, k) in QUI" :key="k" :class="k"><span class="pastille"></span><strong>{{ t(q) }}</strong> {{ t(EXPLIQUE[k]) }}</li>
      </ul>
      <div class="liste-workflows">
        <RouterLink v-for="w in WORKFLOWS" :key="w.id" :to="`/workflows/${w.id}`" class="carte-workflow revele">
          <Icone :nom="w.icone" class="ico" />
          <div>
            <h2>{{ t(w.titre) }}</h2>
            <p>{{ t(w.resume) }}</p>
            <span class="repartition" aria-hidden="true">
              <span v-for="(e, i) in w.etapes" :key="i" class="pastille" :class="e.qui"></span>
            </span>
          </div>
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
import { QUI, WORKFLOWS } from '../data/workflows.js'
import { t } from '../i18n.js'
import { usePage } from '../tete.js'
import { useRevele } from '../revele.js'

const EXPLIQUE = {
  moi: { fr: 'je le fais à la main', en: 'I do it by hand' },
  ia: { fr: 'Claude le fait, je relis', en: 'Claude does it, I review' },
  auto: { fr: 'un script ou une routine, sans personne', en: 'a script or routine, nobody involved' },
}
usePage({
  titre: { fr: 'Workflows', en: 'Workflows' },
  description: { fr: 'Les coulisses de Nitocode : brief quotidien, développement avec Claude Code, posts sur les réseaux.', en: 'Behind the scenes at Nitocode: daily brief, building with Claude Code, social media posts.' },
  chemin: '/workflows/',
})
useRevele()
</script>

<style>
.pastille { display: inline-block; width: 14px; height: 14px; background: var(--auto); flex: none; }
.moi > .pastille, .pastille.moi { background: var(--moi); }
.ia > .pastille, .pastille.ia { background: var(--ia); }
.legende-qui { list-style: none; margin: 0 0 36px; padding: 0; display: flex; flex-wrap: wrap; gap: 8px 28px; color: var(--gris); font-size: 16px; }
.legende-qui li { display: flex; align-items: center; gap: 8px; }
.legende-qui strong { color: var(--papier); font-weight: 500; }
.liste-workflows { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(420px, 100%), 1fr)); gap: 26px; }
.carte-workflow { display: grid; grid-template-columns: 48px 1fr; gap: 18px; padding: 22px; text-decoration: none; background: var(--bloc);
                  box-shadow: 6px 6px 0 #000; transition: transform .16s steps(2); }
.carte-workflow:hover { transform: translateY(-6px); }
.carte-workflow:hover h2 { color: var(--violet); }
.carte-workflow .ico { width: 48px; }
.carte-workflow h2 { font-size: 22px; margin: 0 0 8px; padding: 0; background: none; }
.carte-workflow p { margin: 0 0 14px; color: var(--texte); font-size: 17px; }
.repartition { display: flex; gap: 4px; }
</style>
