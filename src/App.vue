<template>
  <a class="skip-link" href="#main" @click.prevent="skipToMain">{{ t({ fr: 'Aller au contenu', en: 'Skip to content' }) }}</a>
  <RouterView />
  <p class="sr-only" aria-live="polite">{{ announce }}</p>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { initLang, t } from './i18n.js'

// Pre-rendered HTML is French: switch to the visitor's language only after hydration
onMounted(initLang)

function skipToMain() {
  const main = document.getElementById('main')
  main?.focus({ preventScroll: true })
  main?.scrollIntoView()
}

// Client-side navigation: keyboard and screen reader users land on the new page's title, and it is announced
const router = useRouter(), announce = ref('')
router.afterEach((to, from) => {
  // Skip the first load (from = START_LOCATION, no matched route) and hash-only changes
  if (!from.matched.length || to.path === from.path) return
  nextTick(() => setTimeout(() => {
    const h1 = document.querySelector('h1')
    if (!h1) return
    h1.setAttribute('tabindex', '-1')
    h1.focus({ preventScroll: true })
    announce.value = document.title
  }, 50))
})
</script>
