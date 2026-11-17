<template>
  <span ref="root" class="has-tooltip"
        @pointerenter="e => e.pointerType === 'mouse' && open()"
        @pointerleave="e => e.pointerType === 'mouse' && close()"
        @pointerdown="e => (lastPointer = e.pointerType)"
        @focusin="open" @focusout="close" @click="onClick" @keydown.esc="close">
    <slot />
    <Teleport to="body">
      <div v-if="isOpen" ref="bubble" class="tooltip" :class="side" :style="style" role="tooltip">
        <slot name="tip" />
      </div>
    </Teleport>
  </span>
</template>

<script setup>
// Explanation bubble: on hover (mouse), on focus (keyboard) or on tap (touch; a second tap closes it).
import { nextTick, onBeforeUnmount, ref } from 'vue'

const root = ref(null), bubble = ref(null), isOpen = ref(false)
const side = ref('above'), style = ref({})
let lastPointer = 'mouse'

async function open() {
  if (isOpen.value) return
  isOpen.value = true
  style.value = { visibility: 'hidden', left: '0px', top: '0px' }
  await nextTick()
  position()
  document.addEventListener('pointerdown', onOutside, true)
  addEventListener('scroll', close, { passive: true, once: true })
}
function close() {
  isOpen.value = false
  document.removeEventListener('pointerdown', onOutside, true)
}
function onClick() {
  if (lastPointer === 'mouse') return
  isOpen.value ? close() : open()
}
function onOutside(e) { if (!root.value?.contains(e.target) && !bubble.value?.contains(e.target)) close() }

// Above the target if there is room, otherwise below; kept inside the viewport, the arrow still points at the target
function position() {
  const target = (root.value.firstElementChild || root.value).getBoundingClientRect()
  const b = bubble.value.getBoundingClientRect()
  const margin = 16, gap = 14
  const fitsAbove = target.top - b.height - gap > 8
  side.value = fitsAbove ? 'above' : 'below'
  const center = target.left + target.width / 2
  const left = Math.max(margin, Math.min(innerWidth - margin - b.width, center - b.width / 2))
  const top = fitsAbove ? target.top - b.height - gap : target.bottom + gap
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
