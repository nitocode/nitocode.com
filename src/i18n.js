// Two languages. Pre-rendered HTML is French; once hydrated, the page switches to the visitor's language
// (?lang=, remembered choice, or browser language). Every displayed text is an object { fr, en }.
import { ref } from 'vue'

export const lang = ref('fr')

/** Hidden text added to links that open a new tab (read by screen readers) */
export const NEW_TAB = { fr: ' (nouvel onglet)', en: ' (new tab)' }

/** Text in the current language: t({ fr: '…', en: '…' }) or t('already a string') */
export function t(text) {
  if (text == null || typeof text === 'string') return text
  return text[lang.value] ?? text.fr
}

function wantedLang() {
  const fromUrl = new URLSearchParams(location.search).get('lang')
  if (fromUrl === 'fr' || fromUrl === 'en') return fromUrl
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'fr' || saved === 'en') return saved
  } catch (e) {}
  return (navigator.languages || [navigator.language || 'fr']).some(l => /^fr/i.test(l)) ? 'fr' : 'en'
}

export function initLang() {
  setLang(wantedLang())
}

export function setLang(l, remember = false) {
  lang.value = l
  document.documentElement.lang = l
  if (remember) {
    try { localStorage.setItem('lang', l) } catch (e) {}
    const url = new URL(location.href)
    if (url.searchParams.has('lang')) { url.searchParams.set('lang', l); history.replaceState(history.state, '', url) }
  }
}
