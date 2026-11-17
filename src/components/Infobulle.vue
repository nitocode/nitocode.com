<template>
  <span ref="racine" class="ib"
        @pointerenter="e => e.pointerType === 'mouse' && ouvre()"
        @pointerleave="e => e.pointerType === 'mouse' && ferme()"
        @pointerdown="e => (dernier = e.pointerType)"
        @focusin="ouvre" @focusout="ferme" @click="clic" @keydown.esc="ferme">
    <slot />
    <Teleport to="body">
      <div v-if="ouvert" ref="bulle" class="bulle" :class="sens" :style="style" role="tooltip">
        <slot name="bulle" />
      </div>
    </Teleport>
  </span>
</template>

<script setup>
// Bulle d'explication : au survol (souris), au focus (clavier) ou au toucher (mobile, un 2e toucher la ferme).
import { nextTick, onBeforeUnmount, ref } from 'vue'

const racine = ref(null), bulle = ref(null), ouvert = ref(false)
const sens = ref('dessus'), style = ref({})
let dernier = 'mouse'

async function ouvre() {
  if (ouvert.value) return
  ouvert.value = true
  style.value = { visibility: 'hidden', left: '0px', top: '0px' }
  await nextTick()
  place()
  document.addEventListener('pointerdown', dehors, true)
  addEventListener('scroll', ferme, { passive: true, once: true })
}
function ferme() {
  ouvert.value = false
  document.removeEventListener('pointerdown', dehors, true)
}
function clic() {
  if (dernier === 'mouse') return
  ouvert.value ? ferme() : ouvre()
}
function dehors(e) { if (!racine.value?.contains(e.target) && !bulle.value?.contains(e.target)) ferme() }

function place() {
  const cible = (racine.value.firstElementChild || racine.value).getBoundingClientRect()
  const b = bulle.value.getBoundingClientRect()
  const marge = 16, ecart = 14
  const enHaut = cible.top - b.height - ecart > 8
  sens.value = enHaut ? 'dessus' : 'dessous'
  const centre = cible.left + cible.width / 2
  const gauche = Math.max(marge, Math.min(innerWidth - marge - b.width, centre - b.width / 2))
  const haut = enHaut ? cible.top - b.height - ecart : cible.bottom + ecart
  style.value = {
    left: gauche + scrollX + 'px', top: haut + scrollY + 'px',
    '--pointe': Math.max(14, Math.min(b.width - 14, centre - gauche)) + 'px',
  }
}
onBeforeUnmount(ferme)
</script>

<style>
.ib { display: inline-block; position: relative; }
</style>
