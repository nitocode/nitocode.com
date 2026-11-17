// Apparitions au défilement : on observe la section, pas l'élément
// (un élément rogné à 0 n'est jamais « visible » pour l'observateur).
import { onMounted, onBeforeUnmount } from 'vue'

export function useRevele() {
  let obs
  onMounted(() => {
    obs = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return
      e.target.querySelectorAll('.revele').forEach((el, i) => { el.style.animationDelay = i * .15 + 's'; el.classList.add('vu') })
      obs.unobserve(e.target)
    }), { rootMargin: '0px 0px -15% 0px' })
    document.querySelectorAll('main section').forEach(s => obs.observe(s))
  })
  onBeforeUnmount(() => obs?.disconnect())
}
