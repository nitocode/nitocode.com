// Deux langues. Le HTML pré-rendu est en français ; au chargement, le navigateur passe dans la langue
// choisie (?lang=, choix mémorisé, ou langue du navigateur). Les textes sont des objets { fr, en }.
import { ref } from 'vue'

export const langue = ref('fr')

/** Texte dans la langue courante : t({ fr: '…', en: '…' }) ou t('déjà une chaîne') */
export function t(texte) {
  if (texte == null || typeof texte === 'string') return texte
  return texte[langue.value] ?? texte.fr
}

function langueVoulue() {
  const url = new URLSearchParams(location.search).get('lang')
  if (url === 'fr' || url === 'en') return url
  try {
    const l = localStorage.getItem('langue')
    if (l === 'fr' || l === 'en') return l
  } catch (e) {}
  return (navigator.languages || [navigator.language || 'fr']).some(l => /^fr/i.test(l)) ? 'fr' : 'en'
}

export function initLangue() {
  poseLangue(langueVoulue())
}

export function poseLangue(l, memoriser = false) {
  langue.value = l
  document.documentElement.lang = l
  if (memoriser) {
    try { localStorage.setItem('langue', l) } catch (e) {}
    const url = new URL(location.href)
    if (url.searchParams.has('lang')) { url.searchParams.set('lang', l); history.replaceState(history.state, '', url) }
  }
}
