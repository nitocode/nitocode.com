<template>
  <span class="icone" v-html="svgIcone(nom)"></span>
</template>

<script setup>
import { svgIcone } from './icones.js'
defineProps({ nom: { type: String, required: true } })
</script>

<style>
.icone { display: inline-flex; }
.icone svg { width: 100%; height: auto; }
</style>
