import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import './style.css'
import Accueil from './pages/Accueil.vue'
import Roadmaps from './pages/Roadmaps.vue'
import Roadmap from './pages/Roadmap.vue'
import Workflows from './pages/Workflows.vue'
import Workflow from './pages/Workflow.vue'
import data from './data/roadmaps.json'
import { WORKFLOWS } from './data/workflows.js'

// Une adresse fixe par projet et par workflow : chacune est pré-rendue en page HTML
const routes = [
  { path: '/', component: Accueil },
  { path: '/roadmaps', component: Roadmaps },
  ...data.projets.map(p => ({ path: `/roadmaps/${p.id}`, component: Roadmap, props: { id: p.id } })),
  { path: '/workflows', component: Workflows },
  ...WORKFLOWS.map(w => ({ path: `/workflows/${w.id}`, component: Workflow, props: { id: w.id } })),
  { path: '/:rien(.*)*', redirect: '/' },
]

export const createApp = ViteSSG(App, {
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash }
    return { top: 0 }
  },
})
