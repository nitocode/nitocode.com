// Title, description and share preview of each page (pre-rendered in French; the tab title follows the chosen language)
import { useHead } from '@unhead/vue'
import { t, lang } from './i18n.js'

const SITE = 'https://nitocode.com'

export function usePage({ title, description, path, full = false, image = '/img/og.png' }) {
  const fullTitle = () => (full ? t(title) : `${t(title)} · Nitocode`)
  useHead({
    htmlAttrs: { lang: () => lang.value },
    title: fullTitle,
    meta: [
      { name: 'description', content: () => t(description) },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: () => t(description) },
      { property: 'og:image', content: SITE + image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:url', content: SITE + path },
      { property: 'og:locale', content: 'fr_FR' },
      { property: 'og:locale:alternate', content: 'en_US' },
    ],
    link: path === '/' ? [
      { rel: 'alternate', hreflang: 'fr', href: SITE + '/' },
      { rel: 'alternate', hreflang: 'en', href: SITE + '/en/' },
    ] : [],
  })
}
