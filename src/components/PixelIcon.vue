<template>
  <span class="pixel-icon" v-html="iconSvg(name)"></span>
</template>

<script setup>
import { iconSvg } from './icons.js'
defineProps({ name: { type: String, required: true } })
</script>

<style>
.pixel-icon { display: inline-flex; }
.pixel-icon svg { width: 100%; height: auto; }
</style>
