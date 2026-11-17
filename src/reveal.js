// Wipe-in on scroll. We observe the section, not the element:
// an element clipped to zero is never "intersecting" for the observer.
import { onMounted, onBeforeUnmount } from 'vue'

export function useReveal() {
  let observer
  onMounted(() => {
    observer = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return
      e.target.querySelectorAll('.reveal').forEach((el, i) => { el.style.animationDelay = i * .15 + 's'; el.classList.add('seen') })
      observer.unobserve(e.target)
    }), { rootMargin: '0px 0px -15% 0px' })
    document.querySelectorAll('main section').forEach(s => observer.observe(s))
  })
  onBeforeUnmount(() => observer?.disconnect())
}
