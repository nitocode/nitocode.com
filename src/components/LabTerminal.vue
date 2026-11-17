<template>
  <!-- Lab terminal: prints the lab rules, then (easter egg) becomes a real-looking shell to browse the site -->
  <div ref="root" class="terminal" :class="{ printing, live: ready }" role="region" :aria-label="t(T.label)" @click="focusInput">
    <div class="bar"><span>{{ t(T.file) }}</span><span>{{ clock }}</span></div>
    <div ref="body" class="body">
      <div class="line" style="--i:0"><span class="accent">nitocode@nuit:~$</span> <b>cat {{ t(T.file) }}</b></div>
      <div v-for="(r, i) in RULES" :key="i" class="line" :style="{ '--i': i + 1 }">{{ i + 1 }}. {{ t(r) }}</div>

      <template v-if="ready">
        <div role="log" aria-live="polite" class="log">
          <div v-for="(entry, i) in log" :key="i" :class="entry.kind">
            <template v-if="entry.kind === 'cmd'"><span class="accent">{{ entry.prompt }}</span> <b>{{ entry.text }}</b></template>
            <template v-else>{{ entry.text || ' ' }}</template>
          </div>
        </div>
        <form class="prompt-line" @submit.prevent="submit">
          <label :for="inputId" class="accent">{{ prompt }}</label>
          <input :id="inputId" ref="input" v-model="line" type="text" autocomplete="off" autocapitalize="off"
                 autocorrect="off" spellcheck="false" enterkeyhint="go" :aria-describedby="`${inputId}-hint`"
                 @keydown="onKey">
        </form>
        <p v-if="!log.length" :id="`${inputId}-hint`" class="psst">{{ t(T.hint) }}</p>
        <p v-else :id="`${inputId}-hint`" class="sr-only">{{ t(T.hint) }}</p>
      </template>
      <div v-else class="line end" :style="{ '--i': RULES.length + 1 }"><span class="accent">nitocode@nuit:~$</span> </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { useRouter } from 'vue-router'
import { lang, setLang, t } from '../i18n.js'
import { buildTree, complete, HOME, pretty, run } from '../terminal/shell.js'

const T = {
  label: { fr: 'Terminal du labo', en: 'Lab terminal' },
  file: { fr: 'regles.txt', en: 'rules.txt' },
  hint: { fr: '# psst… clique ici et tape help', en: '# psst… click here and type help' },
  night: { fr: ' · bonne heure pour coder', en: ' · good time to code' },
  day: { fr: ' · ici, il fait toujours nuit', en: " · here, it's always night" },
}
const RULES = [
  { fr: 'partir de mes vrais problèmes', en: 'start from my real problems' },
  { fr: 'expérimenter, même si ça rate', en: 'experiment, even if it fails' },
  { fr: 'ce qui marche : je le partage', en: 'what works: I share it' },
  { fr: "raconter ce que j'apprends", en: 'tell what I learn' },
]

const router = useRouter(), inputId = useId()
const root = ref(null), body = ref(null), input = ref(null)
const printing = ref(false), ready = ref(false)
const line = ref(''), log = ref([]), cwd = ref(HOME), history = []
let historyIndex = 0

const tree = computed(() => buildTree(t, RULES))
const prompt = computed(() => `nitocode@nuit:${pretty(cwd.value)}$`)

function focusInput() {
  // Keep text selectable: only focus when nothing is being selected
  if (!getSelection()?.toString()) input.value?.focus({ preventScroll: true })
}

async function submit() {
  const text = line.value
  line.value = ''
  log.value.push({ kind: 'cmd', prompt: prompt.value, text })
  if (text.trim()) { history.push(text.trim()); historyIndex = history.length }
  const state = { cwd: cwd.value, tree: tree.value, history, lang: lang.value, tr: t }
  const result = run(text, state)
  cwd.value = state.cwd
  for (const l of result.lines) log.value.push({ kind: result.error ? 'err' : 'out', text: l })
  const action = result.action || {}
  if (action.clear) log.value = []
  if (action.lang) setLang(action.lang, true)
  if (action.url) window.open(action.url, '_blank', 'noopener')
  if (action.blur) input.value?.blur()
  if (action.navigate) setTimeout(() => router.push(action.navigate), 350)
  await nextTick()
  body.value.scrollTop = body.value.scrollHeight
}

function onKey(e) {
  if (e.key === 'ArrowUp' && history.length) {
    e.preventDefault()
    historyIndex = Math.max(0, historyIndex - 1)
    line.value = history[historyIndex]
  } else if (e.key === 'ArrowDown' && history.length) {
    e.preventDefault()
    historyIndex = Math.min(history.length, historyIndex + 1)
    line.value = history[historyIndex] ?? ''
  } else if (e.key === 'Tab' && line.value.trim()) {
    // Completion only when something is typed: an empty line lets Tab move the focus on (no keyboard trap)
    const completed = complete(line.value, { cwd: cwd.value, tree: tree.value })
    if (completed) { e.preventDefault(); line.value = completed }
  } else if (e.key === 'Escape') {
    input.value.blur()
  } else if (e.key === 'l' && e.ctrlKey) {
    e.preventDefault()
    log.value = []
  }
}

/* Visitor's local time in the title bar */
const now = ref(null)
const clock = computed(() => {
  const d = now.value
  if (!d) return ''
  const h = d.getHours()
  return String(h).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + t(h >= 20 || h < 6 ? T.night : T.day)
})

let clockTimer, observer, readyTimer
onMounted(() => {
  now.value = new Date()
  clockTimer = setInterval(() => (now.value = new Date()), 30000)
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  // Rules are printed line by line when the section scrolls into view, then the prompt becomes live
  observer = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return
    printing.value = true
    observer.disconnect()
    readyTimer = setTimeout(() => (ready.value = true), reduced ? 0 : (RULES.length + 1) * 450 + 300)
  })
  observer.observe(root.value.closest('section'))
})
onBeforeUnmount(() => { clearInterval(clockTimer); clearTimeout(readyTimer); observer?.disconnect() })
</script>

<style>
.terminal { background: #07080D; box-shadow: 0 0 0 4px var(--panel-2), 0 0 0 8px #000, 8px 8px 0 8px #000; font: 18px/1.5 var(--mono); color: #8BE9A8; position: relative; }
.terminal.live { cursor: text; }
.terminal::after { content: ""; position: absolute; inset: 0; pointer-events: none;
                   background: repeating-linear-gradient(0deg, rgba(0,0,0,.28) 0 2px, transparent 2px 4px); }
.terminal .bar { display: flex; justify-content: space-between; gap: 8px; background: var(--panel-2); color: var(--grey); padding: 4px 12px; font-size: 15px; }
.terminal .body { padding: 14px 16px 18px; max-height: 440px; overflow-y: auto; overflow-wrap: anywhere; scrollbar-color: var(--panel-2) transparent; }
.terminal .accent { color: var(--purple); }
.terminal b { color: var(--paper); font-weight: 400; }
.js .terminal .line { visibility: hidden; }
.js .terminal.printing .line { animation: show 0s forwards; animation-delay: calc(var(--i) * .45s + .3s); }
@keyframes show { to { visibility: visible; } }
.terminal .end::after { content: "█"; animation: blink 1s steps(1) infinite; }
.terminal .log .out, .terminal .log .err { white-space: pre-wrap; }
.terminal .log .err { color: #FF9C8A; }
.terminal .prompt-line { display: flex; flex-wrap: wrap; gap: 0 1ch; align-items: baseline; }
.terminal .prompt-line label { white-space: nowrap; }
.terminal .prompt-line input { flex: 1; min-width: 4ch; background: transparent; border: 0; padding: 0; margin: 0;
                               font: inherit; color: var(--paper); caret-color: #8BE9A8; }
.terminal .prompt-line input:focus { outline: none; }
.terminal:focus-within { box-shadow: 0 0 0 4px var(--noubal), 0 0 0 8px #000, 8px 8px 0 8px #000; }
.terminal .psst { margin: 6px 0 0; color: var(--grey); font-size: 15px; }
@media (max-width: 520px) { .terminal { font-size: 16px; } }
@media (prefers-reduced-motion: reduce) { .js .terminal .line { visibility: visible; } }
</style>
