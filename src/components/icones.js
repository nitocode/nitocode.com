// Icônes pixel : une grille de caractères par image, une palette par icône.
// Deux images = animation (elles alternent). « . » = transparent.
export const ICONES = {
  bulle: { pal: { '#': '#0F1115', y: '#FFF4D0', k: '#0F1115' }, images: [[
    '..########..', '.#yyyyyyyy#.', '#yyyykkkyyy#', '#yyykyyykyy#', '#yyyyyykyyy#', '#yyyyykyyyy#',
    '#yyyyykyyyy#', '#yyyyyyyyyy#', '#yyyyykyyyy#', '.#yyyyyyyy#.', '..#y######..', '..##........',
  ], [
    '..########..', '.#yyyyyyyy#.', '#yyyyykyyyy#', '#yyyyykyyyy#', '#yyyyykyyyy#', '#yyyyykyyyy#',
    '#yyyyykyyyy#', '#yyyyyyyyyy#', '#yyyyykyyyy#', '.#yyyyyyyy#.', '..#y######..', '..##........',
  ]] },
  souris: { pal: { '#': '#0F1115', t: '#E6FFFB', c: '#B5F1EA', b: '#B5F1EA', B: '#0F1115', '|': '#0F1115' }, images: [[
    '.....|.....', '....|......', '.....|.....', '...#####...', '..#bb#cc#..', '.#bbb#ccc#.', '.#bbb#ccc#.', '.#########.',
    '.#ttttttt#.', '.#ttttttt#.', '.#ttttttt#.', '..#ttttt#..', '...#####...',
  ], [
    '.....|.....', '......|....', '.....|.....', '...#####...', '..#BB#cc#..', '.#BBB#ccc#.', '.#BBB#ccc#.', '.#########.',
    '.#ttttttt#.', '.#ttttttt#.', '.#ttttttt#.', '..#ttttt#..', '...#####...',
  ]] },
  cafe: { pal: { '#': '#F4F1EA', m: '#9B7BFF', s: '#9DA1AA' }, images: [[
    '...s...s....', '....s...s...', '...s...s....', '............', '#########...', '#mmmmmmm###.',
    '#mmmmmmm#.#.', '#mmmmmmm#.#.', '#mmmmmmm###.', '.#mmmmm#....', '..#####.....', '############',
  ], [
    '....s...s...', '...s...s....', '....s...s...', '............', '#########...', '#mmmmmmm###.',
    '#mmmmmmm#.#.', '#mmmmmmm#.#.', '#mmmmmmm###.', '.#mmmmm#....', '..#####.....', '############',
  ]] },
  lune: { pal: { '#': '#9B7BFF' }, images: [[
    '..###..', '.##....', '##.....', '##.....', '##.....', '.##....', '..###..',
  ]] },
  soleil: { pal: { y: '#FFC83D' }, images: [[
    '.....y.....', '.y...y...y.', '..y.....y..', '....yyy....', '...yyyyy...', 'yy.yyyyy.yy',
    '...yyyyy...', '....yyy....', '..y.....y..', '.y...y...y.', '.....y.....',
  ], [
    '...........', '.....y.....', '.y.......y.', '....yyy....', '...yyyyy...', '.y.yyyyy.y.',
    '...yyyyy...', '....yyy....', '.y.......y.', '.....y.....', '...........',
  ]] },
  telephone: { pal: { '#': '#D9D6CE', s: '#9B7BFF', o: '#0F1115', S: '#4B3A99' }, images: [[
    '.########.', '.#ssssss#.', '.#ssssss#.', '.#ssssss#.', '.#ssssss#.', '.#ssssss#.', '.#ssssss#.',
    '.########.', '.###oo###.', '.########.',
  ], [
    '.########.', '.#SSSSSS#.', '.#ssssss#.', '.#ssssss#.', '.#ssssss#.', '.#ssssss#.', '.#ssssss#.',
    '.########.', '.###oo###.', '.########.',
  ]] },
  robot: { pal: { '#': '#9B7BFF', a: '#F4F1EA', e: '#F4F1EA', k: '#0F1115' }, images: [[
    '.....a.....', '....aaa....', '.#########.', '##ee###ee##', '##ee###ee##', '###########',
    '.##kkkkk##.', '.#########.',
  ], [
    '.....a.....', '....aaa....', '.#########.', '###########', '##ee###ee##', '###########',
    '.##kkkkk##.', '.#########.',
  ]] },
  message: { pal: { '#': '#9B7BFF', p: '#1A1C28', k: '#F4F1EA' }, images: [[
    '.##########.', '#pppppppppp#', '#ppkppkppkp#', '#pppppppppp#', '.##########.', '..##........', '..#.........',
  ], [
    '.##########.', '#pppppppppp#', '#ppkppkpppp#', '#pppppppppp#', '.##########.', '..##........', '..#.........',
  ]] },
  branche: { pal: { '#': '#9DA1AA', o: '#9B7BFF' }, images: [[
    '.oo....oo.', '.oo....oo.', '..#....#..', '..#....#..', '..#...#...', '..#..#....', '..###.....',
    '..#.......', '..#.......', '.oo.......', '.oo.......',
  ]] },
  coche: { pal: { '#': '#8BE9A8' }, images: [[
    '.........##', '........##.', '.......##..', '##....##...', '.##..##....', '..####.....', '...##......',
  ]] },
  fusee: { pal: { r: '#F4F1EA', w: '#9B7BFF', f: '#FFC83D' }, images: [[
    '....r....', '...rrr...', '...rwr...', '...rrr...', '...rrr...', '..rrrrr..', '.r.rrr.r.', 'r..rrr..r',
    '....f....', '...fff...', '....f....',
  ], [
    '....r....', '...rrr...', '...rwr...', '...rrr...', '...rrr...', '..rrrrr..', '.r.rrr.r.', 'r..rrr..r',
    '...f.f...', '....f....', '.........',
  ]] },
  personne: { pal: { '#': '#FFC83D' }, images: [[
    '...###...', '..#####..', '..#####..', '...###...', '.........', '.#######.', '#########', '#########',
  ]] },
  video: { pal: { '#': '#9DA1AA', p: '#9B7BFF' }, images: [[
    '############', '#..........#', '#...p......#', '#...pp.....#', '#...ppp....#', '#...pp.....#',
    '#...p......#', '#..........#', '############',
  ]] },
  carrousel: { pal: { '#': '#9DA1AA', y: '#FFC83D', m: '#9B7BFF' }, images: [[
    '...########', '...#......#', '########..#', '#......#..#', '#..y...#..#', '#.....m#..#',
    '#...mmm#..#', '#.mmmmm####', '#......#...', '########...',
  ]] },
  horloge: { pal: { '#': '#9DA1AA', h: '#9B7BFF' }, images: [[
    '...#####...', '..#.....#..', '.#...h...#.', '#....h....#', '#....h....#', '#....hhh..#',
    '#.........#', '.#.......#.', '..#.....#..', '...#####...',
  ]] },
  document: { pal: { '#': '#F4F1EA', l: '#9B7BFF' }, images: [[
    '######...', '#....##..', '#....###.', '#.......#', '#.lllll.#', '#.......#', '#.llll..#',
    '#.......#', '#.lllll.#', '#.......#', '#########',
  ]] },
  cadenas: { pal: { '#': '#9DA1AA' }, images: [[
    '..###..', '.#...#.', '.#...#.', '#######', '###.###', '###.###', '#######',
  ]] },
}

/** SVG d'une icône, en rectangles fusionnés par ligne */
export function svgIcone(nom) {
  const ic = ICONES[nom]
  if (!ic) return ''
  const w = ic.images[0][0].length, h = ic.images[0].length
  const groupes = ic.images.map((img, n) => {
    let r = ''
    img.forEach((ligne, y) => {
      let x = 0
      while (x < w) {
        const c = ligne[x]
        if (c === '.' || c === undefined) { x++; continue }
        let fin = x
        while (fin < w && ligne[fin] === c) fin++
        r += `<rect x="${x}" y="${y}" width="${fin - x}" height="1.02" fill="${ic.pal[c]}"/>`
        x = fin
      }
    })
    return ic.images.length > 1 ? `<g class="f${n + 1}">${r}</g>` : r
  }).join('')
  return `<svg viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" aria-hidden="true">${groupes}</svg>`
}
