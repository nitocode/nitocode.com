<template>
  <canvas ref="cv" aria-hidden="true"></canvas>
</template>

<script setup>
// La ville la nuit, en pixels : ciel tramé, étoiles, lune, immeubles, et ma fenêtre violette qui clignote.
import { onMounted, onBeforeUnmount, ref } from 'vue'

const cv = ref(null)
let nettoie = () => {}

onMounted(() => {
  const calme = matchMedia('(prefers-reduced-motion: reduce)').matches
  const P = 4
  const el = cv.value, cx = el.getContext('2d')
  const CIEL = ['#0B0C18', '#0F1024', '#141433', '#1B1840', '#251D4D']
  const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]
  let W, H, fond, etoiles, arriere, devant, fenetres, maFenetre, filante = null, t = 0, minuterie = null, lune
  const alea = (a, b) => a + Math.random() * (b - a)
  const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16))
  const px = (x, y, c, w = 1, h = 1) => { cx.fillStyle = c; cx.fillRect(x, y, w, h) }

  function init() {
    const r = el.getBoundingClientRect()
    W = Math.max(1, Math.ceil(r.width / P)); H = Math.max(1, Math.ceil(r.height / P))
    el.width = W; el.height = H
    // Ciel en bandes tramées (pas de dégradé lisse : c'est du pixel)
    fond = document.createElement('canvas'); fond.width = W; fond.height = H
    const fx = fond.getContext('2d'), img = fx.createImageData(W, H), cols = CIEL.map(hex)
    for (let y = 0; y < H; y++) {
      const f = (y / H) * (CIEL.length - 1), i = Math.min(CIEL.length - 2, Math.floor(f)), frac = f - i
      for (let x = 0; x < W; x++) {
        const c = frac * 16 > BAYER[y & 3][x & 3] ? cols[i + 1] : cols[i], k = (y * W + x) * 4
        img.data[k] = c[0]; img.data[k + 1] = c[1]; img.data[k + 2] = c[2]; img.data[k + 3] = 255
      }
    }
    fx.putImageData(img, 0, 0)
    const sol = Math.ceil(Math.min(170, r.height * .45) / P)
    etoiles = Array.from({ length: Math.round(W * H / 900) }, () => ({
      x: Math.floor(alea(0, W)), y: Math.floor(alea(0, H - sol - 6)), p: Math.floor(alea(0, 60)),
      per: Math.floor(alea(18, 60)), grosse: Math.random() < .08, violette: Math.random() < .18,
    }))
    // Deux rangées d'immeubles : celle du fond, plus haute et sans fenêtres
    arriere = []; devant = []; fenetres = []
    for (let x = -2; x < W;) { const w = Math.floor(alea(5, 12)); arriere.push({ x, w, h: Math.floor(alea(sol * .5, sol * 1.05)) }); x += w }
    for (let x = -1; x < W;) {
      const w = Math.floor(alea(7, 18)), h = Math.floor(alea(sol * .3, sol * .85))
      devant.push({ x, w, h })
      for (let fx2 = x + 2; fx2 < x + w - 2; fx2 += 3)
        for (let fy = H - h + 3; fy < H - 2; fy += 4)
          fenetres.push({ x: fx2, y: fy, on: Math.random() < .22 })
      x += w + (Math.random() < .35 ? 1 : 0)
    }
    const cible = W * .72
    const candidates = fenetres.filter(f => Math.abs(f.x - cible) < 6).sort((a, b) => a.y - b.y)
    maFenetre = candidates[0] || fenetres[0]
    // Lune : sur mobile elle monte tout en haut, on la garde à gauche des boutons du haut
    const rl = Math.min(9, Math.max(5, Math.round(W / 40)))
    let my = W < 130 ? rl + 3 : Math.round(H * .2), mx = Math.round(W * .86)
    if (W < 130) {
      const barre = el.parentElement.querySelector('.barre-haut')
      if (barre && barre.querySelector('.accueil')) {
        // Pages intérieures : la barre occupe toute la largeur, la lune passe dessous
        my = Math.ceil((barre.getBoundingClientRect().bottom - r.top) / P) + rl + 3
      } else if (barre) {
        const boutons = barre.querySelector('.nav, .langues')
        mx = Math.min(mx, Math.floor((boutons.getBoundingClientRect().left - r.left - 14) / P) - rl)
      }
    }
    lune = { r: rl, x: mx, y: my }
    dessine()
  }

  function dessine() {
    if (!maFenetre) return
    cx.drawImage(fond, 0, 0)
    for (const e of etoiles) {
      if (((t + e.p) % e.per) <= e.per * .18) continue
      const c = e.violette ? '#9B7BFF' : '#F4F1EA'
      px(e.x, e.y, c)
      if (e.grosse && ((t + e.p) % e.per) < e.per * .6) { px(e.x - 1, e.y, c); px(e.x + 1, e.y, c); px(e.x, e.y - 1, c); px(e.x, e.y + 1, c) }
    }
    const { r, x: mx, y: my } = lune
    for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++)
      if (x * x + y * y <= r * r && (x - 3) ** 2 + (y + 2) ** 2 > (r - 1) ** 2) px(mx + x, my + y, '#F4F1EA')
    if (filante) {
      const { x, y } = filante;
      ['#F4F1EA', '#C9B8FF', '#9B7BFF', '#4B3A99', '#2B2260'].forEach((c, i) => px(x + i * 2, y - i, c, 2, 1))
      filante.x -= 3; filante.y += 1.5; filante.v--
      if (filante.v <= 0) filante = null
    }
    for (const b of arriere) px(b.x, H - b.h, '#16142E', b.w, b.h)
    for (const b of devant) px(b.x, H - b.h, '#07080F', b.w, b.h)
    for (const f of fenetres) if (f.on && f !== maFenetre) px(f.x, f.y, '#F4D27A')
    px(maFenetre.x, maFenetre.y, (t % 8) < 5 ? '#9B7BFF' : '#4B3A99')
  }

  function tick() {
    t++
    if (Math.random() < .35 && fenetres.length) { const f = fenetres[Math.floor(Math.random() * fenetres.length)]; f.on = !f.on }
    if (!filante && Math.random() < .012) filante = { x: Math.floor(alea(W * .35, W * .95)), y: Math.floor(alea(2, H * .25)), v: 14 }
    dessine()
  }
  const demarre = () => { if (!calme && !minuterie) minuterie = setInterval(tick, 125) }
  const arrete = () => { clearInterval(minuterie); minuterie = null }

  // Attendre les polices : la barre du haut change de largeur, et la lune se cale dessus
  ;(document.fonts ? document.fonts.ready : Promise.resolve()).then(init)
  init()
  const vu = new IntersectionObserver(([e]) => e.isIntersecting ? demarre() : arrete())
  vu.observe(el)
  let attente, largeur = innerWidth  // sur mobile, la barre d'adresse change la hauteur : on ne redessine que si la largeur change
  const surResize = () => {
    if (innerWidth === largeur) return
    largeur = innerWidth; clearTimeout(attente); attente = setTimeout(init, 150)
  }
  addEventListener('resize', surResize)
  nettoie = () => { arrete(); vu.disconnect(); removeEventListener('resize', surResize) }
})
onBeforeUnmount(() => nettoie())
</script>
