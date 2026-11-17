<template>
  <!-- Header of inner pages: the same night as the home page, shorter -->
  <header class="scene short">
    <NightSky />
    <TopBar />
    <div class="page">
      <p class="kicker"><slot name="kicker" /></p>
      <h1>{{ title }}<span class="cursor" aria-hidden="true"></span></h1>
      <p v-if="$slots.default" class="lead"><slot /></p>
    </div>
  </header>
  <div class="dither"></div>
</template>

<script setup>
import NightSky from './NightSky.vue'
import TopBar from './TopBar.vue'
defineProps({ title: String })
</script>
