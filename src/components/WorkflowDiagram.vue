<template>
  <!-- A workflow = a chain of steps; hovering a step shows how and with which tool -->
  <ol class="diagram" :style="{ '--n': workflow.steps.length }">
    <li v-for="(s, i) in workflow.steps" :key="i" class="step" :class="s.who">
      <Tooltip>
        <button type="button" class="step-box" :aria-label="`${i + 1}. ${t(s.title)}`">
          <span class="who">{{ t(WHO[s.who]) }}</span>
          <PixelIcon :name="s.icon" class="icon" />
          <span class="step-title">{{ t(s.title) }}</span>
        </button>
        <template #tip>
          <strong>{{ i + 1 }}. {{ t(s.title) }}</strong>
          <p>{{ t(s.text) }}</p>
          <span class="meta">{{ s.tool }}<template v-if="s.duration"> · {{ t(s.duration) }}</template></span>
        </template>
      </Tooltip>
    </li>
  </ol>
</template>

<script setup>
import PixelIcon from './PixelIcon.vue'
import Tooltip from './Tooltip.vue'
import { t } from '../i18n.js'
import { WHO } from '../data/workflows.js'

defineProps({ workflow: { type: Object, required: true } })
</script>

<style>
.diagram { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); gap: 30px; }
.step { position: relative; --who-color: var(--auto); }
.step.me { --who-color: var(--me); }
.step.ai { --who-color: var(--ai); }
/* Arrow to the next step */
.step:not(:last-child)::after { content: ""; position: absolute; top: 50%; right: -24px; width: 18px; height: 18px; transform: translateY(-50%);
  background: var(--grey); clip-path: polygon(0 30%, 50% 30%, 50% 0, 100% 50%, 50% 100%, 50% 70%, 0 70%); }
.step .has-tooltip { display: block; height: 100%; }
.step-box { width: 100%; height: 100%; min-height: 150px; border: 0; cursor: help; font: inherit; color: var(--paper);
            display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 12px; padding: 14px 10px 16px;
            background: var(--panel); box-shadow: inset 0 4px 0 var(--who-color), 5px 5px 0 #000; transition: transform .12s steps(2); }
.step-box:hover { transform: translateY(-4px); }
.step-box .who { align-self: flex-start; font: 700 12px/1 var(--mono); letter-spacing: .08em; text-transform: uppercase;
                 background: var(--who-color); color: var(--ink); padding: 4px 6px 3px; }
.step-box .icon { width: 40px; height: 40px; align-items: center; justify-content: center; }
.step-box .step-title { font: 500 16px/1.3 var(--ubuntu); text-align: center; }
@media (max-width: 760px) {
  .diagram { grid-template-columns: 1fr; gap: 26px; }
  .step:not(:last-child)::after { top: auto; bottom: -22px; right: auto; left: 50%; transform: translateX(-50%) rotate(90deg); }
  .step-box { min-height: 0; flex-direction: row; justify-content: flex-start; text-align: left; padding: 14px 16px; }
  .step-box .who { align-self: center; min-width: 46px; text-align: center; }
  .step-box .icon { width: 32px; height: 32px; flex: none; }
  .step-box .step-title { text-align: left; }
}
</style>
