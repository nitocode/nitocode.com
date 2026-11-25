<template>
  <div class="dither"></div>
  <footer class="site-footer">
    <div class="page">
      <h2><span class="prompt">&gt;</span> {{ t(T.title) }}</h2>
      <div class="groups">
        <section v-for="g in GROUPS" :key="g.id" class="group" :style="{ '--c': g.color }" :aria-labelledby="`footer-${g.id}`">
          <div class="head">
            <img v-if="g.logo" :src="g.logo" alt="" class="mark" width="254" height="212">
            <PixelIcon v-else :name="g.icon" class="mark" />
            <div>
              <h3 :id="`footer-${g.id}`">{{ g.name }}</h3>
              <p>{{ t(g.tag) }}</p>
            </div>
          </div>
          <ul>
            <li v-for="l in g.links" :key="l.to || l.url">
              <component :is="l.to ? 'RouterLink' : 'a'" class="icon-link" v-bind="l.to ? { to: l.to } : { href: l.url, target: '_blank', rel: 'noopener' }"
                         @pointerenter="active[g.id] = l" @pointerleave="active[g.id] = null"
                         @focus="active[g.id] = l" @blur="active[g.id] = null">
                <PixelIcon :name="l.icon" />
                <span class="sr-only">{{ g.name }} · {{ t(l.label) }}{{ l.url ? t(NEW_TAB) : '' }}</span>
              </component>
            </li>
          </ul>
          <!-- Name of the hovered or focused icon, on its own line (it never covers anything); screen readers get it from the link -->
          <p class="caption" aria-hidden="true">
            <template v-if="active[g.id]">▶ {{ t(active[g.id].label) }}<span v-if="active[g.id].handle"> · {{ active[g.id].handle }}</span></template>
          </p>
        </section>
      </div>

      <div class="bottom">
        <span class="signature"><PixelIcon name="moon" />{{ t(T.signature) }}</span>
        <nav :aria-label="t(T.nav)">
          <RouterLink to="/">nitocode.com</RouterLink>
          <RouterLink to="/roadmaps">Roadmaps</RouterLink>
          <RouterLink to="/workflows">Workflows</RouterLink>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { reactive } from 'vue'
import PixelIcon from './PixelIcon.vue'
import { t, NEW_TAB } from '../i18n.js'

const T = {
  title: { fr: 'Me suivre', en: 'Follow me' },
  signature: { fr: 'codé la nuit, utile le jour', en: 'coded at night, useful by day' },
  nav: { fr: 'Pied de page', en: 'Footer' },
}
const L = {
  site: { fr: 'Le site', en: 'Website' },
  roadmap: { fr: 'La roadmap', en: 'Roadmap' },
  workflow: { fr: 'Le workflow', en: 'Workflow' },
  discord: { fr: 'Discord · rejoindre', en: 'Discord · join' },
}

// One group per project: its logo, then its links as pixel logos (the name shows on hover or focus)
const GROUPS = [
  {
    id: 'nitocode', name: 'Nitocode', color: 'var(--purple)', logo: '/img/logo-mark.svg',
    tag: { fr: 'le labo, en public', en: 'the lab, in public' },
    links: [
      { icon: 'x', label: 'X', handle: '@nitocode', url: 'https://x.com/nitocode' },
      { icon: 'instagram', label: 'Instagram', handle: '@nito.code', url: 'https://www.instagram.com/nito.code' },
      { icon: 'discord', label: L.discord, handle: 'Nitocode', url: 'https://discord.gg/FRH3RZRh5' },
      { icon: 'github', label: 'GitHub', handle: 'nitocode', url: 'https://github.com/nitocode' },
      { icon: 'cup', label: 'Ko-fi', handle: 'nitocode', url: 'https://ko-fi.com/nitocode' },
    ],
  },
  {
    id: 'noubal', name: 'Noubal', color: 'var(--noubal)', icon: 'bubble',
    tag: { fr: 'quiz entre amis', en: 'quiz with friends' },
    links: [
      { icon: 'globe', label: L.site, handle: 'noubal.com', url: 'https://noubal.com' },
      { icon: 'x', label: 'X', handle: '@noubal_quiz', url: 'https://x.com/noubal_quiz' },
      { icon: 'instagram', label: 'Instagram', handle: '@noubal', url: 'https://www.instagram.com/noubal' },
      { icon: 'tiktok', label: 'TikTok', handle: '@noubal.quiz', url: 'https://www.tiktok.com/@noubal.quiz' },
      { icon: 'discord', label: L.discord, url: 'https://discord.gg/mTu8AkUkkw' },
      { icon: 'flag', label: L.roadmap, to: '/roadmaps/noubal' },
    ],
  },
  {
    id: 'nitosouris', name: 'Nitosouris', color: 'var(--nitosouris)', icon: 'mouse',
    tag: { fr: 'apprendre à jouer', en: 'learn to play' },
    links: [
      { icon: 'globe', label: L.site, handle: 'nitosouris.com', url: 'https://nitosouris.com' },
      { icon: 'x', label: 'X', handle: '@nitosouris', url: 'https://x.com/nitosouris' },
      { icon: 'flag', label: L.roadmap, to: '/roadmaps/nitosouris' },
    ],
  },
  {
    id: 'nitosports', name: 'NitoSports', color: '#A3E635', icon: 'ball',
    tag: { fr: 'analyse vidéo du badminton', en: 'badminton video analysis' },
    links: [
      { icon: 'flag', label: L.roadmap, to: '/roadmaps/nitosports' },
      { icon: 'flow', label: L.workflow, to: '/workflows/nitosports-match' },
    ],
  },
]

const active = reactive({})
</script>

<style>
.site-footer { padding: 56px 0 0; }
.site-footer h2 { font: 700 28px var(--ubuntu); color: var(--paper); margin: 0 0 30px; padding-bottom: 14px;
                  background: linear-gradient(var(--purple), var(--purple)) left bottom / 48px 4px no-repeat; }
.site-footer .groups { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(220px, 100%), 1fr)); gap: 20px; }
.site-footer .group { background: var(--panel); box-shadow: inset 0 4px 0 var(--c), 6px 6px 0 #000; padding: 20px 18px 10px; }
.site-footer .head { display: flex; align-items: center; gap: 14px; }
.site-footer .mark { width: 40px; height: auto; flex: none; }
.site-footer h3 { font: 700 20px/1.2 var(--ubuntu); color: var(--paper); margin: 0; }
.site-footer .head p { margin: 2px 0 0; font-size: 15px; line-height: 1.3; color: var(--grey); }
.site-footer ul { list-style: none; margin: 16px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
.site-footer .icon-link { display: grid; place-items: center; width: 44px; height: 44px; color: var(--text);
                          background: var(--ink); box-shadow: inset 0 0 0 2px var(--panel-2); }
.site-footer .icon-link .pixel-icon { width: 22px; }
.site-footer .icon-link:hover, .site-footer .icon-link:focus-visible { color: var(--ink); background: var(--c); box-shadow: 3px 3px 0 #000; }
.site-footer .caption { min-height: 1.5em; margin: 8px 0 0; font: 15px/1.5 var(--mono); color: var(--c); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.site-footer .bottom { padding: 40px 0 48px; display: flex; flex-wrap: wrap; gap: 14px; align-items: center; justify-content: space-between; color: var(--grey); }
.site-footer .signature { display: flex; align-items: center; gap: 12px; }
.site-footer .signature .pixel-icon { width: 28px; }
.site-footer nav { display: flex; flex-wrap: wrap; gap: 4px 18px; }
.site-footer nav a { color: var(--grey); text-decoration: none; padding: 6px 0; }
.site-footer nav a:hover { color: var(--purple); }
@media (hover: none) { .site-footer .caption { min-height: 0; margin: 0; } .site-footer .group { padding-bottom: 20px; } }
</style>
