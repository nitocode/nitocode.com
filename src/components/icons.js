// Pixel icons: one character grid per frame, one palette per icon.
// Two frames = animation (they alternate). "." = transparent.
// A copy lives in nitocode-hq/carousels/icons.js: keep both identical.
export const ICONS = {
  bubble: { palette: { '#': '#0F1115', y: '#FFF4D0', k: '#0F1115' }, frames: [[
    '..########..', '.#yyyyyyyy#.', '#yyyykkkyyy#', '#yyykyyykyy#', '#yyyyyykyyy#', '#yyyyykyyyy#',
    '#yyyyykyyyy#', '#yyyyyyyyyy#', '#yyyyykyyyy#', '.#yyyyyyyy#.', '..#y######..', '..##........',
  ], [
    '..########..', '.#yyyyyyyy#.', '#yyyyykyyyy#', '#yyyyykyyyy#', '#yyyyykyyyy#', '#yyyyykyyyy#',
    '#yyyyykyyyy#', '#yyyyyyyyyy#', '#yyyyykyyyy#', '.#yyyyyyyy#.', '..#y######..', '..##........',
  ]] },
  mouse: { palette: { '#': '#0F1115', t: '#E6FFFB', c: '#B5F1EA', b: '#B5F1EA', B: '#0F1115', '|': '#0F1115' }, frames: [[
    '.....|.....', '....|......', '.....|.....', '...#####...', '..#bb#cc#..', '.#bbb#ccc#.', '.#bbb#ccc#.', '.#########.',
    '.#ttttttt#.', '.#ttttttt#.', '.#ttttttt#.', '..#ttttt#..', '...#####...',
  ], [
    '.....|.....', '......|....', '.....|.....', '...#####...', '..#BB#cc#..', '.#BBB#ccc#.', '.#BBB#ccc#.', '.#########.',
    '.#ttttttt#.', '.#ttttttt#.', '.#ttttttt#.', '..#ttttt#..', '...#####...',
  ]] },
  coffee: { palette: { '#': '#F4F1EA', m: '#9B7BFF', s: '#9DA1AA' }, frames: [[
    '...s...s....', '....s...s...', '...s...s....', '............', '#########...', '#mmmmmmm###.',
    '#mmmmmmm#.#.', '#mmmmmmm#.#.', '#mmmmmmm###.', '.#mmmmm#....', '..#####.....', '############',
  ], [
    '....s...s...', '...s...s....', '....s...s...', '............', '#########...', '#mmmmmmm###.',
    '#mmmmmmm#.#.', '#mmmmmmm#.#.', '#mmmmmmm###.', '.#mmmmm#....', '..#####.....', '############',
  ]] },
  ball: { palette: { '#': '#0F1115', w: '#F4F1EA', k: '#0F1115', g: '#A3E635' }, frames: [[
    '....####....', '..##wwww##..', '.#wwwkkwww#.', '.#wwkkkkww#.', '#wwwwkkwwww#', '#kwwwwwwwwk#',
    '#kkwwwwwwkk#', '#kwwwkkwwwk#', '.#wwkkkkww#.', '.#wwwkkwww#.', '..##wwww##..', 'gg..####..gg',
  ], [
    '....####....', '..##wwww##..', '.#wkkwwwww#.', '.#kkkkwwww#.', '#wwkkwwwkkw#', '#wwwwwwkkkk#',
    '#wwwwwwwkkw#', '#kkwwwwwwww#', '.#kkwwwkkw#.', '.#wwwwkkkk#.', '..##wwwkk#..', 'gg..####..gg',
  ]] },
  moon: { palette: { '#': '#9B7BFF' }, frames: [[
    '..###..', '.##....', '##.....', '##.....', '##.....', '.##....', '..###..',
  ]] },
  sun: { palette: { y: '#FFC83D' }, frames: [[
    '.....y.....', '.y...y...y.', '..y.....y..', '....yyy....', '...yyyyy...', 'yy.yyyyy.yy',
    '...yyyyy...', '....yyy....', '..y.....y..', '.y...y...y.', '.....y.....',
  ], [
    '...........', '.....y.....', '.y.......y.', '....yyy....', '...yyyyy...', '.y.yyyyy.y.',
    '...yyyyy...', '....yyy....', '.y.......y.', '.....y.....', '...........',
  ]] },
  phone: { palette: { '#': '#D9D6CE', s: '#9B7BFF', o: '#0F1115', S: '#4B3A99' }, frames: [[
    '.########.', '.#ssssss#.', '.#ssssss#.', '.#ssssss#.', '.#ssssss#.', '.#ssssss#.', '.#ssssss#.',
    '.########.', '.###oo###.', '.########.',
  ], [
    '.########.', '.#SSSSSS#.', '.#ssssss#.', '.#ssssss#.', '.#ssssss#.', '.#ssssss#.', '.#ssssss#.',
    '.########.', '.###oo###.', '.########.',
  ]] },
  robot: { palette: { '#': '#9B7BFF', a: '#F4F1EA', e: '#F4F1EA', k: '#0F1115' }, frames: [[
    '.....a.....', '....aaa....', '.#########.', '##ee###ee##', '##ee###ee##', '###########',
    '.##kkkkk##.', '.#########.',
  ], [
    '.....a.....', '....aaa....', '.#########.', '###########', '##ee###ee##', '###########',
    '.##kkkkk##.', '.#########.',
  ]] },
  message: { palette: { '#': '#9B7BFF', p: '#1A1C28', k: '#F4F1EA' }, frames: [[
    '.##########.', '#pppppppppp#', '#ppkppkppkp#', '#pppppppppp#', '.##########.', '..##........', '..#.........',
  ], [
    '.##########.', '#pppppppppp#', '#ppkppkpppp#', '#pppppppppp#', '.##########.', '..##........', '..#.........',
  ]] },
  branch: { palette: { '#': '#9DA1AA', o: '#9B7BFF' }, frames: [[
    '.oo....oo.', '.oo....oo.', '..#....#..', '..#....#..', '..#...#...', '..#..#....', '..###.....',
    '..#.......', '..#.......', '.oo.......', '.oo.......',
  ]] },
  check: { palette: { '#': '#8BE9A8' }, frames: [[
    '.........##', '........##.', '.......##..', '##....##...', '.##..##....', '..####.....', '...##......',
  ]] },
  rocket: { palette: { r: '#F4F1EA', w: '#9B7BFF', f: '#FFC83D' }, frames: [[
    '....r....', '...rrr...', '...rwr...', '...rrr...', '...rrr...', '..rrrrr..', '.r.rrr.r.', 'r..rrr..r',
    '....f....', '...fff...', '....f....',
  ], [
    '....r....', '...rrr...', '...rwr...', '...rrr...', '...rrr...', '..rrrrr..', '.r.rrr.r.', 'r..rrr..r',
    '...f.f...', '....f....', '.........',
  ]] },
  person: { palette: { '#': '#FFC83D' }, frames: [[
    '...###...', '..#####..', '..#####..', '...###...', '.........', '.#######.', '#########', '#########',
  ]] },
  video: { palette: { '#': '#9DA1AA', p: '#9B7BFF' }, frames: [[
    '############', '#..........#', '#...p......#', '#...pp.....#', '#...ppp....#', '#...pp.....#',
    '#...p......#', '#..........#', '############',
  ]] },
  carousel: { palette: { '#': '#9DA1AA', y: '#FFC83D', m: '#9B7BFF' }, frames: [[
    '...########', '...#......#', '########..#', '#......#..#', '#..y...#..#', '#.....m#..#',
    '#...mmm#..#', '#.mmmmm####', '#......#...', '########...',
  ]] },
  clock: { palette: { '#': '#9DA1AA', h: '#9B7BFF' }, frames: [[
    '...#####...', '..#.....#..', '.#...h...#.', '#....h....#', '#....h....#', '#....hhh..#',
    '#.........#', '.#.......#.', '..#.....#..', '...#####...',
  ]] },
  document: { palette: { '#': '#F4F1EA', l: '#9B7BFF' }, frames: [[
    '######...', '#....##..', '#....###.', '#.......#', '#.lllll.#', '#.......#', '#.llll..#',
    '#.......#', '#.lllll.#', '#.......#', '#########',
  ]] },
  lock: { palette: { '#': '#9DA1AA' }, frames: [[
    '..###..', '.#...#.', '.#...#.', '#######', '###.###', '###.###', '#######',
  ]] },
  // Monochrome icons ("currentColor"): they take the text colour, so links can change colour on hover
  x: { palette: { '#': 'currentColor' }, frames: [[
    '###.....#.', '.###...#..', '..###.#...', '...####...', '....###...', '...#.###..', '..#...###.', '.#.....###',
  ]] },
  instagram: { palette: { '#': 'currentColor' }, frames: [[
    '.########.', '#........#', '#......#.#', '#..####..#', '#..#..#..#', '#..#..#..#', '#..####..#', '#........#',
    '#........#', '.########.',
  ]] },
  tiktok: { palette: { '#': 'currentColor' }, frames: [[
    '.....#...', '.....##..', '.....#.##', '.....#...', '..####...', '.##..#...', '.#...#...', '.##.##...', '..###....',
  ]] },
  discord: { palette: { '#': 'currentColor' }, frames: [[
    '..##....##..', '.##########.', '############', '###..##..###', '###..##..###', '############', '.####..####.',
    '..##....##..',
  ]] },
  github: { palette: { '#': 'currentColor' }, frames: [[
    '.#.......#.', '.##.....##.', '.#########.', '###########', '##..###..##', '###########', '.#########.',
    '..#######..', '#...###....', '.#..#.#....', '..###.#....',
  ]] },
  globe: { palette: { '#': 'currentColor' }, frames: [[
    '...####...', '.##.##.##.', '.#..##..#.', '##########', '#...##...#', '##########', '.#..##..#.', '.##.##.##.',
    '...####...',
  ]] },
  cup: { palette: { '#': 'currentColor' }, frames: [[
    '..#..#....', '.#..#.....', '..........', '########..', '#......###', '#......#.#', '#......###', '.#....#...',
    '..####....',
  ]] },
  flag: { palette: { '#': 'currentColor' }, frames: [[
    '#.......', '#######.', '########', '#######.', '#.......', '#.......', '#.......', '#.......', '##......',
  ]] },
  flow: { palette: { '#': 'currentColor' }, frames: [[
    '###......', '#.#......', '###......', '.#.......', '.#....###', '.######.#', '......###',
  ]] },
}

/** SVG markup of an icon, with runs of same-colour pixels merged into one rect per row */
export function iconSvg(name) {
  const icon = ICONS[name]
  if (!icon) return ''
  const w = icon.frames[0][0].length, h = icon.frames[0].length
  const groups = icon.frames.map((frame, n) => {
    let rects = ''
    frame.forEach((row, y) => {
      let x = 0
      while (x < w) {
        const c = row[x]
        if (c === '.' || c === undefined) { x++; continue }
        let end = x
        while (end < w && row[end] === c) end++
        rects += `<rect x="${x}" y="${y}" width="${end - x}" height="1.02" fill="${icon.palette[c]}"/>`
        x = end
      }
    })
    return icon.frames.length > 1 ? `<g class="f${n + 1}">${rects}</g>` : rects
  }).join('')
  return `<svg viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" aria-hidden="true">${groups}</svg>`
}
