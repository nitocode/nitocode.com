<template>
  <header class="scene">
    <NuitCanvas />
    <BarreHaut accueil />
    <div class="page">
      <img class="logo anime" src="/img/logo-complet.svg" alt="Nitocode" width="1080" height="212">
      <p class="sur">// night code</p>
      <h1 :aria-label="`${titreA} ${titreB}.`">
        <span aria-hidden="true">{{ titreA.slice(0, na) }}<span v-if="na < titreA.length" class="curseur"></span><span class="cache">{{ titreA.slice(na) }}</span></span><br>
        <em aria-hidden="true">{{ titreB.slice(0, nb) }}<span v-if="na === titreA.length && nb < titreB.length" class="curseur"></span><span class="cache">{{ titreB.slice(nb) }}</span></em><span aria-hidden="true" :class="{ cache: !fini }">.</span><span v-if="fini" class="curseur" aria-hidden="true"></span>
      </h1>
      <p class="chapo">{{ t(T.chapo) }}</p>
      <div class="boutons">
        <a class="btn" href="#experiences">{{ t(T.voir) }}</a>
        <a class="btn creux" href="https://ko-fi.com/nitocode" target="_blank" rel="noopener">{{ t(T.kofi) }}</a>
      </div>
    </div>
  </header>
  <div class="tramage"></div>

  <main class="page">
    <section id="experiences">
      <h2 class="revele"><span class="invite">&gt;</span> {{ t(T.experiences) }}</h2>
      <div class="cartouches">
        <div v-for="x in EXPERIENCES" :key="x.num" class="support revele">
          <article class="cartouche" :style="{ '--c': x.couleur }">
            <div class="etiquette">
              <span class="num">{{ x.num }}</span>
              <h3>{{ x.nom }}</h3>
              <Icone :nom="x.icone" class="ico" />
              <p class="tag">{{ t(x.tag) }}</p>
            </div>
            <p>{{ t(x.texte) }}</p>
            <ul><li v-for="(p, i) in x.points" :key="i">{{ t(p) }}</li></ul>
            <div class="liens">
              <a class="lien" :href="x.lien" target="_blank" rel="noopener">{{ t(x.cta) }}</a>
              <RouterLink class="lien sec" :to="`/roadmaps/${x.id}`">Roadmap</RouterLink>
            </div>
            <div class="rainures"></div>
          </article>
        </div>
      </div>
    </section>

    <section id="labo">
      <h2 class="revele"><span class="invite">&gt;</span> {{ t(T.labo) }}</h2>
      <div class="deux">
        <div>
          <p v-html="t(T.labo1)"></p>
          <p>{{ t(T.labo2) }}</p>
          <div class="boutons serres">
            <RouterLink class="btn" to="/workflows">{{ t(T.voirWorkflows) }}</RouterLink>
            <a class="btn creux" href="https://x.com/nitocode" target="_blank" rel="noopener">{{ t(T.suivre) }}</a>
          </div>
        </div>
        <div ref="ecran" class="ecran revele" role="group" :aria-label="t(T.regles)">
          <div class="barre"><span>{{ t(T.fichier) }}</span><span>{{ heure }}</span></div>
          <div class="corps">
            <div class="l" style="--i:0"><span class="v">nitocode@nuit:~$</span> <b>cat {{ t(T.fichier) }}</b></div>
            <div v-for="(r, i) in REGLES" :key="i" class="l" :style="{ '--i': i + 1 }">{{ i + 1 }}. {{ t(r) }}</div>
            <div class="l fin" :style="{ '--i': REGLES.length + 1 }"><span class="v">nitocode@nuit:~$</span> </div>
          </div>
        </div>
      </div>
    </section>

    <section id="soutenir">
      <h2 class="revele"><span class="invite">&gt;</span> {{ t(T.soutenir) }}</h2>
      <div class="soutien revele">
        <Icone nom="cafe" class="ico" />
        <p>{{ t(T.don) }}</p>
        <a class="btn" href="https://ko-fi.com/nitocode" target="_blank" rel="noopener">{{ t(T.cafe) }}</a>
      </div>
    </section>

    <section id="reseaux">
      <h2 class="revele"><span class="invite">&gt;</span> {{ t(T.reseaux) }}</h2>
      <ul class="menu">
        <li v-for="r in RESEAUX" :key="r.url">
          <a :href="r.url" target="_blank" rel="noopener"><span class="nom">{{ r.nom }}</span><span class="pts"></span><span class="h">{{ t(r.h) }}</span></a>
        </li>
      </ul>
    </section>
  </main>
  <PiedDePage />
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import NuitCanvas from '../components/NuitCanvas.vue'
import BarreHaut from '../components/BarreHaut.vue'
import Icone from '../components/Icone.vue'
import PiedDePage from '../components/PiedDePage.vue'
import { langue, t } from '../i18n.js'
import { useRevele } from '../revele.js'
import { usePage } from '../tete.js'

const T = {
  titreA: { fr: "J'expérimente pour moi,", en: 'I experiment for myself,' },
  titreB: { fr: 'tout le monde en profite', en: 'and everyone benefits' },
  chapo: {
    fr: "Salut, moi c'est Nitocode. Dev le jour, le soir je pars de mes propres problèmes (comme une soirée entre amis sans bon jeu à plusieurs) et j'expérimente jusqu'à trouver une solution. Elle me sert d'abord, puis je la partage pour que tout le monde en profite, et je raconte comment c'est fait.",
    en: "Hi, I'm Nitocode. Dev by day; at night I start from my own problems (like a night with friends and no good multiplayer game) and experiment until I find a solution. It helps me first, then I share it so everyone can benefit, and I explain how it's made.",
  },
  voir: { fr: 'Voir les expériences', en: 'See the experiments' },
  kofi: { fr: 'Soutenir sur Ko-fi', en: 'Support on Ko-fi' },
  experiences: { fr: 'Expériences', en: 'Experiments' },
  labo: { fr: 'Labo', en: 'Lab' },
  labo1: {
    fr: 'Le labo tourne avec quelques heures par semaine. Pour tenir, je me suis construit un QG : un brief chaque matin sur Discord avec <strong>une</strong> tâche de 25 minutes, des assistants IA qui préparent le travail, et GitHub pour tout garder.',
    en: 'The lab runs on a few hours a week. To keep it going, I built myself an HQ: a brief every morning on Discord with <strong>one</strong> 25-minute task, AI assistants that prepare the work, and GitHub to keep track of everything.',
  },
  labo2: {
    fr: "Les essais, les ratés et ce que j'en apprends, je les partage en build in public. Toutes les étapes sont détaillées dans les workflows.",
    en: 'The attempts, the failures and what I learn from them, I share building in public. Every step is laid out in the workflows.',
  },
  voirWorkflows: { fr: 'Voir les workflows', en: 'See the workflows' },
  suivre: { fr: 'Suivre @nitocode', en: 'Follow @nitocode' },
  regles: { fr: 'Les règles du labo', en: 'The lab rules' },
  fichier: { fr: 'regles.txt', en: 'rules.txt' },
  soutenir: { fr: 'Soutenir', en: 'Support' },
  don: {
    fr: "Ce qui sort du labo est fait pour être partagé. Si Noubal ou Nitosouris t'a servi, un café sur Ko-fi aide à payer les serveurs et à tenir les prochaines nuits de code. Et surtout, il prouve à mes proches que coder la nuit, ça paie au moins les cafés.",
    en: 'What comes out of the lab is meant to be shared. If Noubal or Nitosouris helped you, a coffee on Ko-fi helps pay for the servers and fuels the next nights of code. Above all, it proves to my loved ones that coding at night at least pays for the coffee.',
  },
  cafe: { fr: 'Offrir un café', en: 'Buy me a coffee' },
  reseaux: { fr: 'Réseaux', en: 'Socials' },
  nuit: { fr: ' · bonne heure pour coder', en: ' · good time to code' },
  jour: { fr: ' · ici, il fait toujours nuit', en: " · here, it's always night" },
}

const EXPERIENCES = [
  {
    id: 'noubal', num: 'EXP_01', nom: 'Noubal', couleur: 'var(--noubal)', icone: 'bulle', lien: 'https://noubal.com',
    tag: { fr: 'quiz multijoueur en temps réel · FR + EN', en: 'real-time multiplayer quiz · FR + EN' },
    texte: { fr: 'Un écran partagé, chacun répond sur son téléphone. Le jeu parfait pour un apéro ou une soirée entre amis.', en: 'One shared screen, everyone answers on their phone. Perfect for drinks or a night in with friends.' },
    points: [
      { fr: 'Rien à installer : on rejoint avec un QR code et un pseudo', en: 'Nothing to install: join with a QR code and a nickname' },
      { fr: 'Plus de 20 thèmes, des milliers de questions, « Tu préfères », enchères…', en: '20+ themes, thousands of questions, “Would you rather”, auctions…' },
      { fr: 'Les joueurs notent chaque question, et je réécris celles qui ne marchent pas', en: "Players rate every question, and I rewrite the ones that don't work" },
    ],
    cta: { fr: 'Jouer sur noubal.com', en: 'Play on noubal.com' },
  },
  {
    id: 'nitosouris', num: 'EXP_02', nom: 'Nitosouris', couleur: 'var(--souris)', icone: 'souris', lien: 'https://nitosouris.com',
    tag: { fr: 'apprendre à jouer, dans le navigateur', en: 'learn to play, in the browser' },
    texte: { fr: "Un site pour progresser aux jeux vidéo, qu'on soit novice complet ou déjà gamer, à son rythme.", en: "A site to get better at video games, whether you're a total beginner or already a gamer, at your own pace." },
    points: [
      { fr: 'Directement dans le navigateur, sans rien installer', en: 'Right in the browser, nothing to install' },
      { fr: 'Refonte complète en cours : circuits, école de drift, arbre de progression', en: 'Full rebuild in progress: tracks, drift school, skill tree' },
      { fr: 'Un univers à lui, avec une histoire en préparation', en: 'A world of its own, with a story in the works' },
    ],
    cta: { fr: 'Essayer nitosouris.com', en: 'Try nitosouris.com' },
  },
]

const REGLES = [
  { fr: 'partir de mes vrais problèmes', en: 'start from my real problems' },
  { fr: 'expérimenter, même si ça rate', en: 'experiment, even if it fails' },
  { fr: 'ce qui marche : je le partage', en: 'what works: I share it' },
  { fr: "raconter ce que j'apprends", en: 'tell what I learn' },
]

const RESEAUX = [
  { nom: 'Nitocode · X', url: 'https://x.com/nitocode', h: '@nitocode' },
  { nom: 'Nitocode · Instagram', url: 'https://www.instagram.com/nito.code', h: '@nito.code' },
  { nom: 'GitHub', url: 'https://github.com/nitocode', h: 'nitocode' },
  { nom: 'Noubal · X', url: 'https://x.com/noubal_quiz', h: '@noubal_quiz' },
  { nom: 'Noubal · Instagram', url: 'https://www.instagram.com/noubal', h: '@noubal' },
  { nom: 'Noubal · TikTok', url: 'https://www.tiktok.com/@noubal.quiz', h: '@noubal.quiz' },
  { nom: 'Noubal · Discord', url: 'https://discord.gg/mTu8AkUkkw', h: { fr: 'rejoindre', en: 'join' } },
  { nom: 'Nitosouris · X', url: 'https://x.com/nitosouris', h: '@nitosouris' },
  { nom: 'Ko-fi', url: 'https://ko-fi.com/nitocode', h: 'nitocode' },
]

usePage({
  titre: { fr: "Nitocode · j'expérimente pour moi, tout le monde en profite", en: 'Nitocode · I experiment for myself, and everyone benefits' },
  description: {
    fr: "Nitocode : je pars de mes propres problèmes, j'expérimente le soir, et ce qui marche, je le partage pour que tout le monde en profite. Noubal, Nitosouris.",
    en: 'Nitocode: I start from my own problems, experiment at night, and what works, I share so everyone can benefit. Noubal, Nitosouris.',
  },
  chemin: '/',
  complet: true,
})
useRevele()

/* ---------- Titre tapé au clavier ---------- */
const titreA = computed(() => t(T.titreA)), titreB = computed(() => t(T.titreB))
const i = ref(Infinity)   // au pré-rendu, le titre est entier
const na = computed(() => Math.min(i.value, titreA.value.length))
const nb = computed(() => Math.max(0, Math.min(i.value - titreA.value.length, titreB.value.length)))
const fini = computed(() => i.value >= titreA.value.length + titreB.value.length)
let frappe
onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // Attendre que la langue du visiteur soit posée (App la pose après le montage des pages)
  setTimeout(() => {
    i.value = 0
    frappe = setInterval(() => { i.value++; if (fini.value) { clearInterval(frappe); i.value = Infinity } }, 45)
  }, 0)
})
watch(langue, () => { if (!fini.value) { clearInterval(frappe); i.value = Infinity } })

/* ---------- Écran du labo : heure du visiteur, lignes qui s'impriment ---------- */
const ecran = ref(null), maintenant = ref(null)
const heure = computed(() => {
  const d = maintenant.value
  if (!d) return ''
  const h = d.getHours()
  return String(h).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + t(h >= 20 || h < 6 ? T.nuit : T.jour)
})
let horloge, obsEcran
onMounted(() => {
  maintenant.value = new Date()
  horloge = setInterval(() => (maintenant.value = new Date()), 30000)
  obsEcran = new IntersectionObserver(([e]) => { if (e.isIntersecting) { ecran.value.classList.add('imprime'); obsEcran.disconnect() } })
  obsEcran.observe(ecran.value.closest('section'))
})
onBeforeUnmount(() => { clearInterval(frappe); clearInterval(horloge); obsEcran?.disconnect() })
</script>

<style>
.cache { visibility: hidden; }

/* ---------- Cartouches ---------- */
.cartouches { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(290px, 100%), 1fr)); gap: 36px; }
.support { filter: drop-shadow(6px 6px 0 #000); transition: transform .16s steps(2); }
.support:hover { transform: translateY(-8px); }
.cartouche { --n: 14px; height: 100%; background: var(--bloc); padding: 26px 24px 0; display: flex; flex-direction: column;
             clip-path: polygon(0 var(--n), var(--n) var(--n), var(--n) 0, calc(100% - var(--n)) 0, calc(100% - var(--n)) var(--n), 100% var(--n), 100% 100%, 0 100%); }
.etiquette { background: var(--c); color: var(--encre); padding: 16px 16px 14px; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 4px 12px; align-items: center;
             box-shadow: inset 0 -6px 0 rgba(0,0,0,.18); }
.etiquette .num { font: 14px var(--mono); letter-spacing: .05em; grid-column: 1; }
.etiquette h3 { font: 700 30px/1.1 var(--ubuntu); margin: 0; grid-column: 1; color: var(--encre); }
.etiquette .tag { grid-column: 1 / -1; margin: 6px 0 0; font-size: 16px; line-height: 1.3; }
.etiquette .ico { grid-column: 2; grid-row: 1 / 3; width: 56px; }
.cartouche > p { margin: 20px 0 10px; color: var(--papier); }
.cartouche ul { list-style: none; margin: 0 0 22px; padding: 0; color: var(--gris); }
.cartouche li { padding-left: 22px; position: relative; margin-bottom: 4px; }
.cartouche li::before { content: ""; position: absolute; left: 2px; top: .45em; width: 8px; height: 8px; background: var(--c); }
.cartouche .liens { margin-top: auto; display: flex; flex-wrap: wrap; gap: 0 26px; }
.lien { font: 500 17px var(--ubuntu); color: var(--c); text-decoration: none; padding: 10px 0 18px; }
.lien::before { content: "▶ "; }
.lien:hover { color: var(--papier); }
.lien.sec { color: var(--gris); }
.rainures { height: 22px; margin: 0 -24px; background: repeating-linear-gradient(90deg, var(--bloc-2) 0 6px, transparent 6px 14px); }

/* ---------- Labo ---------- */
.deux { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(290px, 100%), 1fr)); gap: 36px; align-items: start; }
.deux p { margin: 0 0 16px; }
.deux strong { color: var(--papier); font-weight: 400; background: var(--violet-sombre); padding: 0 4px; }
.boutons.serres { margin-top: 24px; }
.ecran { background: #07080D; box-shadow: 0 0 0 4px var(--bloc-2), 0 0 0 8px #000, 8px 8px 0 8px #000; font: 18px/1.5 var(--mono); color: #8BE9A8; position: relative; }
.ecran::after { content: ""; position: absolute; inset: 0; pointer-events: none;
                background: repeating-linear-gradient(0deg, rgba(0,0,0,.28) 0 2px, transparent 2px 4px); }
.ecran .barre { display: flex; justify-content: space-between; gap: 8px; background: var(--bloc-2); color: var(--gris); padding: 4px 12px; font-size: 15px; }
.ecran .corps { padding: 14px 16px 18px; }
.ecran .v { color: var(--violet); }
.ecran b { color: var(--papier); font-weight: 400; }
.js .ecran .l { visibility: hidden; }
.js .ecran.imprime .l { animation: montre 0s forwards; animation-delay: calc(var(--i) * .45s + .3s); }
@keyframes montre { to { visibility: visible; } }
.ecran .fin::after { content: "█"; animation: clignote 1s steps(1) infinite; }

/* ---------- Soutenir ---------- */
.soutien { display: grid; grid-template-columns: auto 1fr auto; gap: 28px; align-items: center; background: var(--bloc); padding: 28px; box-shadow: 6px 6px 0 #000; }
.soutien .ico { width: 72px; }
.soutien p { margin: 0; color: var(--papier); }
@media (max-width: 640px) { .soutien { grid-template-columns: 1fr; } }

/* ---------- Menu réseaux ---------- */
.menu { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(380px, 100%), 1fr)); gap: 2px 40px; }
.menu a { display: flex; align-items: baseline; gap: 10px; padding: 8px 4px; text-decoration: none; }
.menu a::before { content: "▶"; color: var(--violet); font-size: 13px; visibility: hidden; }
.menu a:hover::before, .menu a:focus-visible::before { visibility: visible; animation: clignote .5s steps(1) infinite; }
.menu .nom { white-space: nowrap; font-weight: 500; color: var(--papier); }
.menu .pts { flex: 1; border-bottom: 3px dotted var(--bloc-2); transform: translateY(-5px); }
.menu .h { color: var(--gris); font-family: var(--mono); }
.menu a:hover .nom { color: var(--violet); }

@media (prefers-reduced-motion: reduce) { .js .ecran .l { visibility: visible; } }
</style>
