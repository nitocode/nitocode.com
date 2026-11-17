<template>
  <!-- Progress as squares: one square per milestone -->
  <div class="progress" :style="{ '--c': project.color }">
    <span class="squares" aria-hidden="true">
      <span v-for="m in project.milestones" :key="m.id" class="sq" :class="m.status"></span>
    </span>
    <span class="count">{{ doneCount }}/{{ project.milestones.length }} {{ t({ fr: 'niveaux terminés', en: 'levels done' }) }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { t } from '../i18n.js'

const props = defineProps({ project: { type: Object, required: true } })
const doneCount = computed(() => props.project.milestones.filter(m => m.status === 'done').length)
</script>

<style>
.progress { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 14px; }
.progress .squares { display: flex; gap: 4px; }
.progress .sq { width: 18px; height: 18px; background: var(--panel-2); }
.progress .sq.done { background: var(--c); }
.progress .sq.in-progress { background: var(--night); box-shadow: inset 0 0 0 3px var(--c); animation: blink 1s steps(1) infinite; }
.progress .count { font: 15px var(--mono); color: var(--grey); }
</style>
