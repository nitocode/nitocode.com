import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    // Une page HTML par adresse (roadmaps/noubal/index.html…) : GitHub Pages les sert telles quelles,
    // et X ou Discord lisent l'aperçu de chaque page sans exécuter de JavaScript.
    dirStyle: 'nested',
    formatting: 'none',
  },
})
