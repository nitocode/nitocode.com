import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import './style.css'
import Home from './pages/Home.vue'
import Roadmaps from './pages/Roadmaps.vue'
import Roadmap from './pages/Roadmap.vue'
import Workflows from './pages/Workflows.vue'
import Workflow from './pages/Workflow.vue'
import roadmaps from './data/roadmaps.json'
import { WORKFLOWS } from './data/workflows.js'

// One fixed URL per project and per workflow: each one is pre-rendered as its own HTML page
const routes = [
  { path: '/', component: Home },
  { path: '/roadmaps', component: Roadmaps },
  ...roadmaps.projects.map(p => ({ path: `/roadmaps/${p.id}`, component: Roadmap, props: { id: p.id } })),
  { path: '/workflows', component: Workflows },
  ...WORKFLOWS.map(w => ({ path: `/workflows/${w.id}`, component: Workflow, props: { id: w.id } })),
  { path: '/:unknown(.*)*', redirect: '/' },
]

export const createApp = ViteSSG(App, {
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash }
    return { top: 0 }
  },
})
