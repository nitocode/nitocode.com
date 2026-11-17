<template>
  <PageHeader :title="t(workflow.title)">
    <template #kicker><RouterLink to="/">nitocode</RouterLink> / <RouterLink to="/workflows">workflows</RouterLink> / {{ workflow.id }}</template>
    {{ t(workflow.summary) }}
  </PageHeader>
  <main class="page">
    <section>
      <p class="hint">{{ t({ fr: 'Survole ou touche une étape pour lire le détail.', en: 'Hover or tap a step to read the details.' }) }}</p>
      <WorkflowDiagram :workflow="workflow" />
      <details class="walkthrough">
        <summary>{{ t({ fr: 'Tout lire étape par étape', en: 'Read it all step by step' }) }}</summary>
        <ol>
          <li v-for="(s, i) in workflow.steps" :key="i" :class="s.who">
            <span class="dot"></span>
            <div><strong>{{ t(s.title) }}</strong> <em>({{ t(WHO[s.who]) }} · {{ s.tool }})</em><br>{{ t(s.text) }}</div>
          </li>
        </ol>
      </details>
      <div class="buttons">
        <RouterLink v-if="next" class="btn" :to="`/workflows/${next.id}`">{{ t({ fr: 'Workflow suivant', en: 'Next workflow' }) }} : {{ t(next.title) }}</RouterLink>
        <RouterLink class="btn outline" to="/workflows">{{ t({ fr: 'Tous les workflows', en: 'All workflows' }) }}</RouterLink>
      </div>
    </section>
  </main>
  <SiteFooter />
</template>

<script setup>
import { computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import SiteFooter from '../components/SiteFooter.vue'
import WorkflowDiagram from '../components/WorkflowDiagram.vue'
import { WHO, WORKFLOWS } from '../data/workflows.js'
import { t } from '../i18n.js'
import { usePage } from '../head.js'

const props = defineProps({ id: { type: String, required: true } })
const index = computed(() => WORKFLOWS.findIndex(w => w.id === props.id))
const workflow = computed(() => WORKFLOWS[index.value])
const next = computed(() => WORKFLOWS[(index.value + 1) % WORKFLOWS.length])
usePage({ title: workflow.value.title, description: workflow.value.summary, path: `/workflows/${props.id}/` })
</script>

<style>
.walkthrough { margin: 44px 0 0; background: var(--panel); padding: 16px 20px; box-shadow: 6px 6px 0 #000; }
.walkthrough summary { cursor: pointer; font-weight: 500; color: var(--paper); }
.walkthrough ol { list-style: none; margin: 16px 0 0; padding: 0; display: grid; gap: 16px; }
.walkthrough li { display: flex; gap: 12px; align-items: flex-start; }
.walkthrough li .dot { margin-top: 6px; }
.walkthrough strong { color: var(--paper); font-weight: 500; }
.walkthrough em { color: var(--grey); font-style: normal; font-size: 15px; }
</style>
