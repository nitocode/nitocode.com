<template>
  <canvas ref="canvas" aria-hidden="true"></canvas>
</template>

<script setup>
// The city at night, in pixels: dithered sky, stars, moon, buildings, and my purple window blinking.
import { onMounted, onBeforeUnmount, ref } from 'vue'

const canvas = ref(null)
let cleanup = () => {}

onMounted(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
  const P = 4  // one sky pixel = 4 screen pixels
  const el = canvas.value, ctx = el.getContext('2d')
  const SKY = ['#0B0C18', '#0F1024', '#141433', '#1B1840', '#251D4D']
  const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]
  let W, H, background, stars, backRow, frontRow, windows, myWindow, shootingStar = null, tick = 0, timer = null, moon
  const rand = (a, b) => a + Math.random() * (b - a)
  const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16))
  const px = (x, y, c, w = 1, h = 1) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h) }

  function init() {
    const box = el.getBoundingClientRect()
    W = Math.max(1, Math.ceil(box.width / P)); H = Math.max(1, Math.ceil(box.height / P))
    el.width = W; el.height = H
    // Sky in dithered bands (no smooth gradient: it's pixel art)
    background = document.createElement('canvas'); background.width = W; background.height = H
    const bctx = background.getContext('2d'), img = bctx.createImageData(W, H), colors = SKY.map(hex)
    for (let y = 0; y < H; y++) {
      const f = (y / H) * (SKY.length - 1), i = Math.min(SKY.length - 2, Math.floor(f)), frac = f - i
      for (let x = 0; x < W; x++) {
        const c = frac * 16 > BAYER[y & 3][x & 3] ? colors[i + 1] : colors[i], k = (y * W + x) * 4
        img.data[k] = c[0]; img.data[k + 1] = c[1]; img.data[k + 2] = c[2]; img.data[k + 3] = 255
      }
    }
    bctx.putImageData(img, 0, 0)
    const ground = Math.ceil(Math.min(170, box.height * .45) / P)
    stars = Array.from({ length: Math.round(W * H / 900) }, () => ({
      x: Math.floor(rand(0, W)), y: Math.floor(rand(0, H - ground - 6)), phase: Math.floor(rand(0, 60)),
      period: Math.floor(rand(18, 60)), big: Math.random() < .08, purple: Math.random() < .18,
    }))
    // Two rows of buildings: the back one is taller and has no windows
    backRow = []; frontRow = []; windows = []
    for (let x = -2; x < W;) { const w = Math.floor(rand(5, 12)); backRow.push({ x, w, h: Math.floor(rand(ground * .5, ground * 1.05)) }); x += w }
    for (let x = -1; x < W;) {
      const w = Math.floor(rand(7, 18)), h = Math.floor(rand(ground * .3, ground * .85))
      frontRow.push({ x, w, h })
      for (let wx = x + 2; wx < x + w - 2; wx += 3)
        for (let wy = H - h + 3; wy < H - 2; wy += 4)
          windows.push({ x: wx, y: wy, on: Math.random() < .22 })
      x += w + (Math.random() < .35 ? 1 : 0)
    }
    const target = W * .72
    const candidates = windows.filter(f => Math.abs(f.x - target) < 6).sort((a, b) => a.y - b.y)
    myWindow = candidates[0] || windows[0]
    // Moon: on mobile it sits at the very top, so keep it clear of the top bar buttons
    const r = Math.min(9, Math.max(5, Math.round(W / 40)))
    let my = W < 130 ? r + 3 : Math.round(H * .2), mx = Math.round(W * .86)
    if (W < 130) {
      const bar = el.parentElement.querySelector('.top-bar')
      if (bar && bar.querySelector('.home-link')) {
        // Inner pages: the bar spans the whole width, the moon goes below it
        my = Math.ceil((bar.getBoundingClientRect().bottom - box.top) / P) + r + 3
      } else if (bar) {
        const buttons = bar.querySelector('.nav, .langs')
        mx = Math.min(mx, Math.floor((buttons.getBoundingClientRect().left - box.left - 14) / P) - r)
      }
    }
    moon = { r, x: mx, y: my }
    draw()
  }

  function draw() {
    if (!myWindow) return
    ctx.drawImage(background, 0, 0)
    for (const s of stars) {
      if (((tick + s.phase) % s.period) <= s.period * .18) continue
      const c = s.purple ? '#9B7BFF' : '#F4F1EA'
      px(s.x, s.y, c)
      if (s.big && ((tick + s.phase) % s.period) < s.period * .6) { px(s.x - 1, s.y, c); px(s.x + 1, s.y, c); px(s.x, s.y - 1, c); px(s.x, s.y + 1, c) }
    }
    const { r, x: mx, y: my } = moon
    for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++)
      if (x * x + y * y <= r * r && (x - 3) ** 2 + (y + 2) ** 2 > (r - 1) ** 2) px(mx + x, my + y, '#F4F1EA')
    if (shootingStar) {
      const { x, y } = shootingStar;
      ['#F4F1EA', '#C9B8FF', '#9B7BFF', '#4B3A99', '#2B2260'].forEach((c, i) => px(x + i * 2, y - i, c, 2, 1))
      shootingStar.x -= 3; shootingStar.y += 1.5; shootingStar.life--
      if (shootingStar.life <= 0) shootingStar = null
    }
    for (const b of backRow) px(b.x, H - b.h, '#16142E', b.w, b.h)
    for (const b of frontRow) px(b.x, H - b.h, '#07080F', b.w, b.h)
    for (const w of windows) if (w.on && w !== myWindow) px(w.x, w.y, '#F4D27A')
    px(myWindow.x, myWindow.y, (tick % 8) < 5 ? '#9B7BFF' : '#4B3A99')
  }

  function step() {
    tick++
    if (Math.random() < .35 && windows.length) { const w = windows[Math.floor(Math.random() * windows.length)]; w.on = !w.on }
    if (!shootingStar && Math.random() < .012) shootingStar = { x: Math.floor(rand(W * .35, W * .95)), y: Math.floor(rand(2, H * .25)), life: 14 }
    draw()
  }
  const start = () => { if (!reducedMotion && !timer) timer = setInterval(step, 125) }
  const stop = () => { clearInterval(timer); timer = null }

  // Wait for fonts: the top bar changes width once they load, and the moon is placed next to it
  ;(document.fonts ? document.fonts.ready : Promise.resolve()).then(init)
  init()
  const visibility = new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop())
  visibility.observe(el)
  let pending, width = innerWidth  // on mobile the address bar changes the height: redraw only when the width changes
  const onResize = () => {
    if (innerWidth === width) return
    width = innerWidth; clearTimeout(pending); pending = setTimeout(init, 150)
  }
  addEventListener('resize', onResize)
  cleanup = () => { stop(); visibility.disconnect(); removeEventListener('resize', onResize) }
})
onBeforeUnmount(() => cleanup())
</script>
