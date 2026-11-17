<template>
  <span ref="root" class="has-tooltip"
        @pointerenter="e => e.pointerType === 'mouse' && open()"
        @pointerleave="e => e.pointerType === 'mouse' && closeSoon()"
        @pointerdown="e => (lastPointer = e.pointerType)"
        @focusin="open" @focusout="close" @click="onClick">
    <slot />
    <Teleport to="body">
      <div v-if="isOpen" :id="id" ref="bubble" class="tooltip" :class="side" :style="style" role="tooltip"
           @pointerenter="cancelClose" @pointerleave="closeSoon">
        <slot name="tip" />
      </div>
    </Teleport>
  </span>
</template>

<script setup>
// Explanation bubble: on hover (mouse), on focus (keyboard) or on tap (touch; a second tap closes it).
// WCAG 1.4.13: the pointer can move onto the bubble without it closing, and Escape always closes it.
// The bubble describes its target (aria-describedby), so screen readers read it on focus.
import { nextTick, onBeforeUnmount, ref, useId } from 'vue'

const id = useId()
const root = ref(null), bubble = ref(null), isOpen = ref(false)
const side = ref('above'), style = ref({})
let lastPointer = 'mouse', closeTimer

const target = () => root.value?.firstElementChild || root.value

async function open() {
  cancelClose()
  if (isOpen.value) return
  isOpen.value = true
  style.value = { visibility: 'hidden', left: '0px', top: '0px' }
  await nextTick()
  position()
  target()?.setAttribute('aria-describedby', id)
  document.addEventListener('pointerdown', onOutside, true)
  document.addEventListener('keydown', onKey)
  addEventListener('scroll', onScroll, { passive: true })
}
function close() {
  cancelClose()
  isOpen.value = false
  target()?.removeAttribute('aria-describedby')
  document.removeEventListener('pointerdown', onOutside, true)
  document.removeEventListener('keydown', onKey)
  removeEventListener('scroll', onScroll)
}
function closeSoon() { cancelClose(); closeTimer = setTimeout(close, 180) }
function cancelClose() { clearTimeout(closeTimer) }
function onClick() {
  if (lastPointer === 'mouse') return
  isOpen.value ? close() : open()
}
function onKey(e) { if (e.key === 'Escape') close() }
function onOutside(e) { if (!root.value?.contains(e.target) && !bubble.value?.contains(e.target)) close() }
// Keyboard focus scrolls the page smoothly: keep the bubble, just move it along
function onScroll() { if (root.value?.contains(document.activeElement)) position(); else close() }

// Above the target if there is room, otherwise below; kept inside the viewport, the arrow still points at the target
function position() {
  if (!bubble.value) return
  const box = target().getBoundingClientRect()
  const b = bubble.value.getBoundingClientRect()
  const margin = 16, gap = 14
  const fitsAbove = box.top - b.height - gap > 8
  side.value = fitsAbove ? 'above' : 'below'
  const center = box.left + box.width / 2
  const left = Math.max(margin, Math.min(innerWidth - margin - b.width, center - b.width / 2))
  const top = fitsAbove ? box.top - b.height - gap : box.bottom + gap
  style.value = {
    left: left + scrollX + 'px', top: top + scrollY + 'px',
    '--tip-x': Math.max(14, Math.min(b.width - 14, center - left)) + 'px',
  }
}
onBeforeUnmount(close)
</script>

<style>
.has-tooltip { display: inline-block; position: relative; }
</style>
