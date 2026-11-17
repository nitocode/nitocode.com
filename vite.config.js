import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  ssgOptions: {
    // One HTML file per URL (roadmaps/noubal/index.html…): GitHub Pages serves them as is,
    // and X or Discord can read each page's preview without running JavaScript.
    dirStyle: 'nested',
    formatting: 'none',
  },
})
