<template>
  <!-- Roadmap as a game map: a winding path, one level per milestone -->
  <ol ref="root" class="level-map" :style="{ '--c': project.color, '--cols': cols }">
    <li v-for="(m, i) in project.milestones" :key="m.id" class="cell" :class="m.status"
        :style="{ gridRow: Math.floor(i / cols) + 1, gridColumn: column(i) + 1 }">
      <span v-for="s in segments(i)" :key="s.side" class="track" :class="[s.side, { walked: s.walked }]"></span>
      <Tooltip>
        <button type="button" class="level" :aria-label="`${i + 1}. ${t(m.title)} (${t(STATUS[m.status])})`">
          <span class="num">{{ i + 1 }}</span>
          <PixelIcon v-if="m.status === 'done'" name="check" class="symbol" />
          <span v-else-if="m.status === 'in-progress'" class="symbol play" aria-hidden="true">▶</span>
          <PixelIcon v-else name="lock" class="symbol" />
        </button>
        <template #tip>
          <strong>{{ t(m.title) }}</strong>
          <p>{{ t(m.text) }}</p>
          <span class="meta">{{ GLYPH[m.status] }} {{ t(STATUS[m.status]) }} · {{ t(m.when) }}</span>
        </template>
      </Tooltip>
      <span class="name">{{ t(m.title) }}</span>
      <span class="when">{{ t(m.when) }}</span>
    </li>
  </ol>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import PixelIcon from './PixelIcon.vue'
import Tooltip from './Tooltip.vue'
import { t } from '../i18n.js'

const props = defineProps({ project: { type: Object, required: true } })
const STATUS = {
  done: { fr: 'terminé', en: 'done' },
  'in-progress': { fr: 'en cours', en: 'in progress' },
  upcoming: { fr: 'à venir', en: 'coming up' },
}
const GLYPH = { done: '✓', 'in-progress': '▶', upcoming: '🔒' }

// Levels per row depend on the width (4 when pre-rendered, recomputed in the browser)
const root = ref(null), cols = ref(4)
let resizeObserver
onMounted(() => {
  resizeObserver = new ResizeObserver(([e]) => {
    const w = e.contentRect.width
    cols.value = w >= 760 ? 4 : w >= 470 ? 3 : 2
  })
  resizeObserver.observe(root.value)
})
onBeforeUnmount(() => resizeObserver?.disconnect())

const row = i => Math.floor(i / cols.value)
// Winding path: every other row reads right to left
const column = i => (row(i) % 2 ? cols.value - 1 - (i % cols.value) : i % cols.value)

// Path pieces around a level, towards the previous and the next one.
// Same row: a horizontal half-line. Next row: the turn goes along the outer edge of the grid.
function segments(i) {
  const milestones = props.project.milestones, n = milestones.length, pieces = []
  const towards = (j, walked) => {
    if (j < 0 || j >= n) return
    if (row(j) === row(i)) pieces.push({ side: column(j) < column(i) ? 'left' : 'right', walked })
    else {
      const edge = row(Math.min(i, j)) % 2 ? 'left' : 'right'  // the turn happens where the upper row ends
      pieces.push({ side: `${edge} out`, walked })
      pieces.push({ side: `${j > i ? 'down' : 'up'}-${edge}`, walked })
    }
  }
  towards(i - 1, i > 0 && milestones[i - 1].status === 'done')
  towards(i + 1, milestones[i].status === 'done')
  return pieces
}
</script>

<style>
.level-map { --cols: 4; --thick: 6px; --row-h: 76px; list-style: none; margin: 0; padding: 0;
             display: grid; grid-template-columns: repeat(var(--cols), 1fr); }
.level-map .cell { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 10px 34px; min-width: 0; }
/* The path */
.track { position: absolute; background: var(--panel-2); z-index: 0; }
.track.walked { background: var(--c); }
.track.left, .track.right { top: calc(var(--row-h) / 2 - var(--thick) / 2); height: var(--thick); }
.track.left { left: 0; right: 50%; }
.track.right { left: 50%; right: 0; }
.track.down-right, .track.down-left { top: calc(var(--row-h) / 2 - var(--thick) / 2); bottom: 0; width: var(--thick); }
.track.up-right, .track.up-left { top: 0; height: calc(var(--row-h) / 2 + var(--thick) / 2); width: var(--thick); }
.track.down-right, .track.up-right { right: 0; }
.track.down-left, .track.up-left { left: 0; }
/* The level */
.level-map .has-tooltip { z-index: 1; height: var(--row-h); display: flex; align-items: center; }
.level { position: relative; width: 64px; height: 64px; border: 0; padding: 0; cursor: help; display: grid; place-items: center;
         font: inherit; background: var(--panel); box-shadow: inset 0 0 0 3px var(--panel-2), 5px 5px 0 #000;
         transition: transform .12s steps(2); }
.level:hover { transform: translateY(-4px); }
.level .num { position: absolute; top: 4px; left: 6px; font: 13px var(--mono); color: var(--grey); }
.level .symbol { width: 26px; }
.done .level { background: var(--c); box-shadow: inset 0 -6px 0 rgba(0,0,0,.22), 5px 5px 0 #000; }
.done .level .num { color: var(--ink); }
.done .level .symbol svg rect { fill: var(--ink); }
.in-progress .level { background: var(--night); box-shadow: inset 0 0 0 4px var(--c), 5px 5px 0 #000; }
.in-progress .level .play { width: auto; color: var(--c); font-size: 26px; line-height: 1; }
.in-progress .level::after { content: ""; position: absolute; inset: -9px; box-shadow: 0 0 0 3px var(--c); animation: blink 1s steps(1) infinite; pointer-events: none; }
.upcoming .level .symbol { width: 20px; opacity: .8; }
.level-map .name { margin-top: 10px; font-weight: 500; color: var(--paper); line-height: 1.3; font-size: 16px; overflow-wrap: anywhere; }
.upcoming .name { color: var(--grey); }
.level-map .when { font: 14px var(--mono); color: var(--grey); }
.in-progress .when { color: var(--c); }
</style>
