// Titre, description et aperçu de partage de chaque page (pré-rendus en français ; l'onglet suit la langue choisie)
import { useHead } from '@unhead/vue'
import { t, langue } from './i18n.js'

const SITE = 'https://nitocode.com'

export function usePage({ titre, description, chemin, complet = false, image = '/img/og.png' }) {
  const titreFinal = () => (complet ? t(titre) : `${t(titre)} · Nitocode`)
  useHead({
    htmlAttrs: { lang: () => langue.value },
    title: titreFinal,
    meta: [
      { name: 'description', content: () => t(description) },
      { property: 'og:title', content: titreFinal },
      { property: 'og:description', content: () => t(description) },
      { property: 'og:image', content: SITE + image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:url', content: SITE + chemin },
      { property: 'og:locale', content: 'fr_FR' },
      { property: 'og:locale:alternate', content: 'en_US' },
    ],
    link: chemin === '/' ? [
      { rel: 'alternate', hreflang: 'fr', href: SITE + '/' },
      { rel: 'alternate', hreflang: 'en', href: SITE + '/en/' },
    ] : [],
  })
}
