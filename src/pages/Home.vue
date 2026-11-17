<template>
  <header class="scene">
    <NightSky />
    <TopBar home />
    <div class="page">
      <img class="logo animated" src="/img/logo-complet.svg" alt="Nitocode" width="1080" height="212">
      <p class="kicker">// night code</p>
      <h1 :aria-label="`${titleA} ${titleB}.`">
        <span aria-hidden="true">{{ titleA.slice(0, typedA) }}<span v-if="typedA < titleA.length" class="cursor"></span><span class="ghost">{{ titleA.slice(typedA) }}</span></span><br>
        <em aria-hidden="true">{{ titleB.slice(0, typedB) }}<span v-if="typedA === titleA.length && typedB < titleB.length" class="cursor"></span><span class="ghost">{{ titleB.slice(typedB) }}</span></em><span aria-hidden="true" :class="{ ghost: !finished }">.</span><span v-if="finished" class="cursor" aria-hidden="true"></span>
      </h1>
      <p class="lead">{{ t(T.lead) }}</p>
      <div class="buttons">
        <a class="btn" href="#experiments">{{ t(T.see) }}</a>
        <a class="btn outline" href="https://ko-fi.com/nitocode" target="_blank" rel="noopener">{{ t(T.kofi) }}<span class="sr-only">{{ t(NEW_TAB) }}</span></a>
      </div>
    </div>
  </header>
  <div class="dither"></div>

  <main id="main" class="page" tabindex="-1">
    <section id="experiments">
      <h2 class="reveal"><span class="prompt">&gt;</span> {{ t(T.experiments) }}</h2>
      <div class="cartridges">
        <div v-for="x in EXPERIMENTS" :key="x.num" class="cartridge-wrap reveal">
          <article class="cartridge" :style="{ '--c': x.color }">
            <div class="label">
              <span class="num">{{ x.num }}</span>
              <h3>{{ x.name }}</h3>
              <PixelIcon :name="x.icon" class="icon" />
              <p class="tag">{{ t(x.tag) }}</p>
            </div>
            <p>{{ t(x.text) }}</p>
            <ul><li v-for="(p, i) in x.points" :key="i">{{ t(p) }}</li></ul>
            <div class="links">
              <a v-if="x.url" class="link" :href="x.url" target="_blank" rel="noopener">{{ t(x.cta) }}<span class="sr-only">{{ t(NEW_TAB) }}</span></a>
              <RouterLink class="link secondary" :to="`/roadmaps/${x.id}`">Roadmap</RouterLink>
            </div>
            <div class="grooves"></div>
          </article>
        </div>
      </div>
    </section>

    <section id="lab">
      <h2 class="reveal"><span class="prompt">&gt;</span> {{ t(T.lab) }}</h2>
      <div class="two-cols">
        <div>
          <p v-html="t(T.lab1)"></p>
          <p>{{ t(T.lab2) }}</p>
          <div class="buttons tight">
            <RouterLink class="btn" to="/workflows">{{ t(T.seeWorkflows) }}</RouterLink>
            <a class="btn outline" href="https://x.com/nitocode" target="_blank" rel="noopener">{{ t(T.follow) }}<span class="sr-only">{{ t(NEW_TAB) }}</span></a>
          </div>
        </div>
        <LabTerminal />
      </div>
    </section>

    <section id="support">
      <h2 class="reveal"><span class="prompt">&gt;</span> {{ t(T.support) }}</h2>
      <div class="support-box reveal">
        <PixelIcon name="coffee" class="icon" />
        <p>{{ t(T.donate) }}</p>
        <a class="btn" href="https://ko-fi.com/nitocode" target="_blank" rel="noopener">{{ t(T.coffee) }}<span class="sr-only">{{ t(NEW_TAB) }}</span></a>
      </div>
    </section>
  </main>
  <SiteFooter />
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import NightSky from '../components/NightSky.vue'
import TopBar from '../components/TopBar.vue'
import PixelIcon from '../components/PixelIcon.vue'
import SiteFooter from '../components/SiteFooter.vue'
import LabTerminal from '../components/LabTerminal.vue'
import { lang, t, NEW_TAB } from '../i18n.js'
import { useReveal } from '../reveal.js'
import { usePage } from '../head.js'

const T = {
  titleA: { fr: "J'expérimente pour moi,", en: 'I experiment for myself,' },
  titleB: { fr: 'tout le monde en profite', en: 'and everyone benefits' },
  lead: {
    fr: "Salut, moi c'est Nitocode. Dev le jour, le soir je pars de mes propres problèmes (comme une soirée entre amis sans bon jeu à plusieurs) et j'expérimente jusqu'à trouver une solution. Elle me sert d'abord, puis je la partage pour que tout le monde en profite, et je raconte comment c'est fait.",
    en: "Hi, I'm Nitocode. Dev by day; at night I start from my own problems (like a night with friends and no good multiplayer game) and experiment until I find a solution. It helps me first, then I share it so everyone can benefit, and I explain how it's made.",
  },
  see: { fr: 'Voir les expériences', en: 'See the experiments' },
  kofi: { fr: 'Soutenir sur Ko-fi', en: 'Support on Ko-fi' },
  experiments: { fr: 'Expériences', en: 'Experiments' },
  lab: { fr: 'Labo', en: 'Lab' },
  lab1: {
    fr: 'Le labo tourne avec quelques heures par semaine. Pour tenir, je me suis construit un QG : un brief chaque matin sur Discord avec <strong>une</strong> tâche de 25 minutes, des assistants IA qui préparent le travail, et GitHub pour tout garder.',
    en: 'The lab runs on a few hours a week. To keep it going, I built myself an HQ: a brief every morning on Discord with <strong>one</strong> 25-minute task, AI assistants that prepare the work, and GitHub to keep track of everything.',
  },
  lab2: {
    fr: "Les essais, les ratés et ce que j'en apprends, je les partage en build in public. Toutes les étapes sont détaillées dans les workflows.",
    en: 'The attempts, the failures and what I learn from them, I share building in public. Every step is laid out in the workflows.',
  },
  seeWorkflows: { fr: 'Voir les workflows', en: 'See the workflows' },
  follow: { fr: 'Suivre @nitocode', en: 'Follow @nitocode' },
  support: { fr: 'Soutenir', en: 'Support' },
  donate: {
    fr: "Ce qui sort du labo est fait pour être partagé. Si Noubal ou Nitosouris t'a servi, un café sur Ko-fi aide à payer les serveurs et à tenir les prochaines nuits de code. Et surtout, il prouve à mes proches que coder la nuit, ça paie au moins les cafés.",
    en: 'What comes out of the lab is meant to be shared. If Noubal or Nitosouris helped you, a coffee on Ko-fi helps pay for the servers and fuels the next nights of code. Above all, it proves to my loved ones that coding at night at least pays for the coffee.',
  },
  coffee: { fr: 'Offrir un café', en: 'Buy me a coffee' },
}

const EXPERIMENTS = [
  {
    id: 'noubal', num: 'EXP_01', name: 'Noubal', color: 'var(--noubal)', icon: 'bubble', url: 'https://noubal.com',
    tag: { fr: 'quiz multijoueur en temps réel · FR + EN', en: 'real-time multiplayer quiz · FR + EN' },
    text: { fr: 'Un écran partagé, chacun répond sur son téléphone. Le jeu parfait pour un apéro ou une soirée entre amis.', en: 'One shared screen, everyone answers on their phone. Perfect for drinks or a night in with friends.' },
    points: [
      { fr: 'Rien à installer : on rejoint avec un QR code et un pseudo', en: 'Nothing to install: join with a QR code and a nickname' },
      { fr: 'Plus de 20 thèmes, des milliers de questions, « Tu préfères », enchères…', en: '20+ themes, thousands of questions, “Would you rather”, auctions…' },
      { fr: 'Les joueurs notent chaque question, et je réécris celles qui ne marchent pas', en: "Players rate every question, and I rewrite the ones that don't work" },
    ],
    cta: { fr: 'Jouer sur noubal.com', en: 'Play on noubal.com' },
  },
  {
    id: 'nitosouris', num: 'EXP_02', name: 'Nitosouris', color: 'var(--nitosouris)', icon: 'mouse', url: 'https://nitosouris.com',
    tag: { fr: 'apprendre à jouer, dans le navigateur', en: 'learn to play, in the browser' },
    text: { fr: "Un site pour progresser aux jeux vidéo, qu'on soit novice complet ou déjà gamer, à son rythme.", en: "A site to get better at video games, whether you're a total beginner or already a gamer, at your own pace." },
    points: [
      { fr: 'Directement dans le navigateur, sans rien installer', en: 'Right in the browser, nothing to install' },
      { fr: 'Refonte complète en cours : circuits, école de drift, arbre de progression', en: 'Full rebuild in progress: tracks, drift school, skill tree' },
      { fr: 'Un univers à lui, avec une histoire en préparation', en: 'A world of its own, with a story in the works' },
    ],
    cta: { fr: 'Essayer nitosouris.com', en: 'Try nitosouris.com' },
  },
  {
    id: 'nitofoot', num: 'EXP_03', name: 'Nitofoot', color: '#A3E635', icon: 'ball', url: null,
    tag: { fr: 'stats de foot à 5, analysées sur mon PC', en: '5-a-side stats, analysed on my PC' },
    text: { fr: 'Les pros ont des capteurs pour mesurer chaque course. Nous, au five entre amis, on n’a rien : je filme, un script analyse.', en: 'Pros have trackers to measure every run. We, playing 5-a-side with friends, have nothing: I film, a script analyses.' },
    points: [
      { fr: 'Deux caméras en hauteur, aucun capteur sur les joueurs', en: 'Two cameras up high, no tracker on the players' },
      { fr: 'Distance, passes, buts, arrêts : tout tourne en local sur ma carte graphique', en: 'Distance, passes, goals, saves: it all runs locally on my graphics card' },
      { fr: 'Un fichier de stats ouvert, prêt pour les apps de foot', en: 'An open stats file, ready for football apps' },
    ],
  },
]

usePage({
  title: { fr: "Nitocode · j'expérimente pour moi, tout le monde en profite", en: 'Nitocode · I experiment for myself, and everyone benefits' },
  description: {
    fr: "Nitocode : je pars de mes propres problèmes, j'expérimente le soir, et ce qui marche, je le partage pour que tout le monde en profite. Noubal, Nitosouris, Nitofoot.",
    en: 'Nitocode: I start from my own problems, experiment at night, and what works, I share so everyone can benefit. Noubal, Nitosouris, Nitofoot.',
  },
  path: '/',
  full: true,
})
useReveal()

/* ---------- Title typed letter by letter ---------- */
const titleA = computed(() => t(T.titleA)), titleB = computed(() => t(T.titleB))
const typed = ref(Infinity)  // pre-rendered: the whole title is shown
const typedA = computed(() => Math.min(typed.value, titleA.value.length))
const typedB = computed(() => Math.max(0, Math.min(typed.value - titleA.value.length, titleB.value.length)))
const finished = computed(() => typed.value >= titleA.value.length + titleB.value.length)
let typing
onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // Wait until the visitor's language is set (App sets it after the pages are mounted)
  setTimeout(() => {
    typed.value = 0
    typing = setInterval(() => { typed.value++; if (finished.value) { clearInterval(typing); typed.value = Infinity } }, 45)
  }, 0)
})
watch(lang, () => { if (!finished.value) { clearInterval(typing); typed.value = Infinity } })

onBeforeUnmount(() => clearInterval(typing))
</script>

<style>
.ghost { visibility: hidden; }

/* ---------- Cartridges ---------- */
.cartridges { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(290px, 100%), 1fr)); gap: 36px; }
.cartridge-wrap { filter: drop-shadow(6px 6px 0 #000); transition: transform .16s steps(2); }
.cartridge-wrap:hover { transform: translateY(-8px); }
.cartridge { --notch: 14px; height: 100%; background: var(--panel); padding: 26px 24px 0; display: flex; flex-direction: column;
             clip-path: polygon(0 var(--notch), var(--notch) var(--notch), var(--notch) 0, calc(100% - var(--notch)) 0, calc(100% - var(--notch)) var(--notch), 100% var(--notch), 100% 100%, 0 100%); }
.label { background: var(--c); color: var(--ink); padding: 16px 16px 14px; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 4px 12px; align-items: center;
         box-shadow: inset 0 -6px 0 rgba(0,0,0,.18); }
.label .num { font: 14px var(--mono); letter-spacing: .05em; grid-column: 1; }
.label h3 { font: 700 30px/1.1 var(--ubuntu); margin: 0; grid-column: 1; color: var(--ink); }
.label .tag { grid-column: 1 / -1; margin: 6px 0 0; font-size: 16px; line-height: 1.3; }
.label .icon { grid-column: 2; grid-row: 1 / 3; width: 56px; }
.cartridge > p { margin: 20px 0 10px; color: var(--paper); }
.cartridge ul { list-style: none; margin: 0 0 22px; padding: 0; color: var(--grey); }
.cartridge li { padding-left: 22px; position: relative; margin-bottom: 4px; }
.cartridge li::before { content: ""; position: absolute; left: 2px; top: .45em; width: 8px; height: 8px; background: var(--c); }
.cartridge .links { margin-top: auto; display: flex; flex-wrap: wrap; gap: 0 26px; }
.link { font: 500 17px var(--ubuntu); color: var(--c); text-decoration: none; padding: 10px 0 18px; }
.link::before { content: "▶ "; }
.link:hover { color: var(--paper); }
.link.secondary { color: var(--grey); }
.grooves { height: 22px; margin: 0 -24px; background: repeating-linear-gradient(90deg, var(--panel-2) 0 6px, transparent 6px 14px); }

/* ---------- Lab ---------- */
.two-cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(290px, 100%), 1fr)); gap: 36px; align-items: start; }
.two-cols p { margin: 0 0 16px; }
.two-cols strong { color: var(--paper); font-weight: 400; background: var(--purple-dark); padding: 0 4px; }
.buttons.tight { margin-top: 24px; }

/* ---------- Support ---------- */
.support-box { display: grid; grid-template-columns: auto 1fr auto; gap: 28px; align-items: center; background: var(--panel); padding: 28px; box-shadow: 6px 6px 0 #000; }
.support-box .icon { width: 72px; }
.support-box p { margin: 0; color: var(--paper); }
@media (max-width: 640px) { .support-box { grid-template-columns: 1fr; } }

</style>
