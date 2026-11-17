<template>
  <!-- En-tête des pages intérieures : la même nuit que l'accueil, en plus court -->
  <header class="scene courte">
    <NuitCanvas />
    <BarreHaut />
    <div class="page">
      <p class="sur"><slot name="sur" /></p>
      <h1>{{ titre }}<span class="curseur" aria-hidden="true"></span></h1>
      <p v-if="$slots.default" class="chapo"><slot /></p>
    </div>
  </header>
  <div class="tramage"></div>
</template>

<script setup>
import NuitCanvas from './NuitCanvas.vue'
import BarreHaut from './BarreHaut.vue'
defineProps({ titre: String })
</script>
