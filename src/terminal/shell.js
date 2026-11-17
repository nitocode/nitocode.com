// Lab terminal easter egg: a tiny fake Linux shell to browse the site from the home page.
// Pure logic (no Vue, no DOM): run(line, state) returns the output lines and, sometimes, an action
// (navigate to a page, open a link, clear the screen, change language) that the component carries out.
import roadmaps from '../data/roadmaps.json'
import { WORKFLOWS, WHO } from '../data/workflows.js'

export const HOME = '/home/nitocode'

const STATUS_GLYPH = { done: '[x]', 'in-progress': '[>]', upcoming: '[ ]' }

/** Builds the file tree in the given language. Each node: { dir: {…} } or { file: [lines] }, plus an optional route or url. */
export function buildTree(tr, rules) {
  const projects = {}
  for (const p of roadmaps.projects) {
    projects[p.id] = {
      route: `/roadmaps/${p.id}`,
      dir: {
        'README.md': { file: [`# ${p.name}`, '', tr(p.pitch), ...(p.url ? ['', p.url] : [])], url: p.url },
        'roadmap.txt': { route: `/roadmaps/${p.id}`, file: roadmapLines(p, tr) },
      },
    }
  }
  projects.afrenchcouple = {
    dir: {
      'README.md': {
        file: tr({
          fr: ['# A French Couple', '', 'Le compte réseaux de notre couple : on y poste ce qu’on aime,',
               'des tests de posts IA et des lives Twitch.', '',
               'C’est aussi mon terrain de jeu pour la communication :',
               'les outils de Nitocode (vidéos, carrousels) y sont testés en premier.', '',
               'Statut : ligne éditoriale en cours de définition.'],
          en: ['# A French Couple', '', 'Our couple’s social account: we post what we love,',
               'AI post experiments and Twitch streams.', '',
               'It’s also my playground for communication:',
               'Nitocode tools (videos, carousels) get tested there first.', '',
               'Status: editorial line being defined.'],
        }),
      },
    },
  }

  const workflows = {}
  for (const w of WORKFLOWS) {
    workflows[`${w.id}.txt`] = {
      route: `/workflows/${w.id}`,
      file: [`# ${tr(w.title)}`, '', tr(w.summary), '',
             ...w.steps.map((s, i) => `${i + 1}. [${tr(WHO[s.who]).toUpperCase()}] ${tr(s.title)}  (${tr(s.tool)})`)],
    }
  }

  return {
    dir: {
      [tr({ fr: 'regles.txt', en: 'rules.txt' })]: { file: rules.map((r, i) => `${i + 1}. ${tr(r)}`) },
      'projects': { route: '/roadmaps', dir: projects },
      'workflows': { route: '/workflows', dir: workflows },
      'about.txt': {
        route: '/',
        file: tr({
          fr: ['Nitocode : dev le jour, le soir je pars de mes propres problèmes',
               'et j’expérimente jusqu’à trouver une solution. Elle me sert d’abord,',
               'puis je la partage, et je raconte comment c’est fait.'],
          en: ['Nitocode: dev by day; at night I start from my own problems',
               'and experiment until I find a solution. It helps me first,',
               'then I share it, and I explain how it’s made.'],
        }),
      },
      '.coffee': {
        url: 'https://ko-fi.com/nitocode',
        file: ['   ( (', '    ) )', '  ........', '  |      |]', '  \\      /', '   `----´', '',
               tr({ fr: 'Fichier caché trouvé ! Un café pour tenir la nuit : open .coffee', en: 'Hidden file found! A coffee for the night: open .coffee' })],
      },
    },
  }
}

function roadmapLines(p, tr) {
  const done = p.milestones.filter(m => m.status === 'done').length
  return [
    `# Roadmap ${p.name}  ${done}/${p.milestones.length}`, '',
    ...p.milestones.map(m => `${STATUS_GLYPH[m.status]} ${tr(m.title)}  · ${tr(m.when)}`),
    '', '[x] ' + tr({ fr: 'terminé', en: 'done' }) + '   [>] ' + tr({ fr: 'en cours', en: 'in progress' }) + '   [ ] ' + tr({ fr: 'à venir', en: 'coming up' }),
  ]
}

/** Absolute path from what the visitor typed (relative, ~, .., absolute) */
export function resolve(cwd, input = '') {
  let path = input.trim()
  if (!path || path === '~') return HOME
  if (path.startsWith('~/')) path = HOME + path.slice(1)
  else if (!path.startsWith('/')) path = cwd + '/' + path
  const parts = []
  for (const part of path.split('/')) {
    if (!part || part === '.') continue
    if (part === '..') parts.pop(); else parts.push(part)
  }
  return '/' + parts.join('/')
}

export function lookup(tree, path) {
  if (path === HOME) return tree
  if (!path.startsWith(HOME + '/')) return null
  let node = tree
  for (const part of path.slice(HOME.length + 1).split('/')) {
    node = node.dir?.[part]
    if (!node) return null
  }
  return node
}

export const pretty = path => (path.startsWith(HOME) ? '~' + path.slice(HOME.length) : path)

const COMMANDS = ['help', 'ls', 'cd', 'pwd', 'cat', 'open', 'tree', 'whoami', 'date', 'echo', 'history', 'clear', 'lang', 'neofetch', 'exit', 'sudo']

/** Tab completion: completes the command, or the last path argument. Returns the new line, or null. */
export function complete(line, state) {
  const words = line.split(' ')
  if (words.length === 1) {
    const hits = COMMANDS.filter(c => c.startsWith(words[0]))
    return hits.length === 1 ? hits[0] + ' ' : null
  }
  const arg = words.pop()
  const slash = arg.lastIndexOf('/')
  const base = slash >= 0 ? arg.slice(0, slash + 1) : '', start = arg.slice(slash + 1)
  const dir = lookup(state.tree, resolve(state.cwd, base || '.'))
  if (!dir?.dir) return null
  const hits = Object.keys(dir.dir).filter(n => n.startsWith(start) && (start.startsWith('.') || !n.startsWith('.')))
  if (hits.length !== 1) return null
  const name = hits[0] + (dir.dir[hits[0]].dir ? '/' : '')
  return [...words, base + name].join(' ')
}

/** Runs one command line. state: { cwd, tree, history, lang, tr } (cwd is updated in place). */
export function run(line, state) {
  const tr = state.tr
  const [cmd, ...args] = line.trim().split(/\s+/)
  const flags = args.filter(a => a.startsWith('-') && a.length > 1), paths = args.filter(a => !a.startsWith('-') || a.length === 1)
  const out = lines => ({ lines: [].concat(lines) })
  const err = text => ({ lines: [].concat(text), error: true })
  const target = () => resolve(state.cwd, paths[0] || '.')

  switch (cmd) {
    case undefined: case '': return out([])
    case 'help': return out(tr({
      fr: ['Commandes :',
           '  ls [-a] [dossier]   lister (avec -a : fichiers cachés)',
           '  cd <dossier>        changer de dossier (cd .. pour remonter)',
           '  cat <fichier>       lire un fichier',
           '  open <chemin>       ouvrir la page du site correspondante',
           '  tree                tout voir d’un coup',
           '  pwd, whoami, date, echo, history, clear, neofetch',
           '  lang fr|en          changer la langue du site',
           '',
           'Tab complète les noms, ↑ ↓ rappellent les commandes, Échap pour sortir.',
           'Commence par : ls'],
      en: ['Commands:',
           '  ls [-a] [folder]    list (with -a: hidden files)',
           '  cd <folder>         change folder (cd .. to go up)',
           '  cat <file>          read a file',
           '  open <path>         open the matching page of the site',
           '  tree                see everything at once',
           '  pwd, whoami, date, echo, history, clear, neofetch',
           '  lang fr|en          switch the site language',
           '',
           'Tab completes names, ↑ ↓ recall commands, Escape to leave.',
           'Start with: ls'],
    }))
    case 'ls': {
      const node = lookup(state.tree, target())
      if (!node) return err(`ls: ${paths[0]}: ${tr({ fr: 'aucun fichier ou dossier de ce nom', en: 'no such file or directory' })}`)
      if (!node.dir) return out(paths[0])
      const all = flags.some(f => f.includes('a'))
      const names = Object.keys(node.dir).filter(n => all || !n.startsWith('.'))
      return out((all ? ['.', '..'] : []).concat(names.map(n => (node.dir[n].dir ? n + '/' : n))).join('   '))
    }
    case 'cd': {
      const path = target(), node = lookup(state.tree, path)
      if (!paths[0]) { state.cwd = HOME; return out([]) }
      if (!node) {
        if (!path.startsWith(HOME)) return err(`cd: ${paths[0]}: ${tr({ fr: 'permission refusée (ici, tout se passe dans ~)', en: 'permission denied (everything happens in ~)' })}`)
        return err(`cd: ${paths[0]}: ${tr({ fr: 'aucun fichier ou dossier de ce nom', en: 'no such file or directory' })}`)
      }
      if (!node.dir) return err(`cd: ${paths[0]}: ${tr({ fr: 'ce n’est pas un dossier (essaie cat)', en: 'not a directory (try cat)' })}`)
      state.cwd = path
      return out([])
    }
    case 'pwd': return out(state.cwd)
    case 'cat': {
      if (!paths[0]) return err(tr({ fr: 'cat : quel fichier ? (ex. cat about.txt)', en: 'cat: which file? (e.g. cat about.txt)' }))
      const node = lookup(state.tree, target())
      if (!node) return err(`cat: ${paths[0]}: ${tr({ fr: 'aucun fichier ou dossier de ce nom', en: 'no such file or directory' })}`)
      if (node.dir) return err(`cat: ${paths[0]}: ${tr({ fr: 'c’est un dossier (essaie ls ou cd)', en: 'is a directory (try ls or cd)' })}`)
      const more = node.route || node.url ? ['', tr({ fr: `→ open ${paths[0]} pour ouvrir la page`, en: `→ open ${paths[0]} to open the page` })] : []
      return out(node.file.concat(more))
    }
    case 'open': {
      const node = lookup(state.tree, target())
      if (!node) return err(`open: ${paths[0] || '.'}: ${tr({ fr: 'aucun fichier ou dossier de ce nom', en: 'no such file or directory' })}`)
      if (node.route) return { lines: [tr({ fr: `ouverture de ${node.route}…`, en: `opening ${node.route}…` })], action: { navigate: node.route } }
      if (node.url) return { lines: [tr({ fr: `ouverture de ${node.url} (nouvel onglet)…`, en: `opening ${node.url} (new tab)…` })], action: { url: node.url } }
      return err(tr({ fr: `open : pas de page pour ${paths[0] || '.'} (essaie cat)`, en: `open: no page for ${paths[0] || '.'} (try cat)` }))
    }
    case 'tree': {
      const lines = [pretty(state.cwd)]
      const walk = (node, prefix) => {
        const names = Object.keys(node.dir).filter(n => !n.startsWith('.'))
        names.forEach((n, i) => {
          const last = i === names.length - 1
          lines.push(prefix + (last ? '└── ' : '├── ') + n + (node.dir[n].dir ? '/' : ''))
          if (node.dir[n].dir) walk(node.dir[n], prefix + (last ? '    ' : '│   '))
        })
      }
      const node = lookup(state.tree, state.cwd)
      if (node?.dir) walk(node, '')
      return out(lines)
    }
    case 'whoami': return out(tr({ fr: 'nitocode : dev le jour, expérimentateur la nuit', en: 'nitocode: dev by day, experimenter by night' }))
    case 'date': return out(new Date().toLocaleString(state.lang === 'fr' ? 'fr-FR' : 'en-GB'))
    case 'echo': return out(args.join(' '))
    case 'history': return out(state.history.map((h, i) => `  ${i + 1}  ${h}`))
    case 'clear': return { lines: [], action: { clear: true } }
    case 'lang':
      if (args[0] !== 'fr' && args[0] !== 'en') return err('lang: fr | en')
      return { lines: [args[0] === 'fr' ? 'Langue : français' : 'Language: English'], action: { lang: args[0] } }
    case 'neofetch': return out([
      '  ▄▄▄▄▄▄▄     nitocode@nuit',
      ' █ <n/> █    -------------',
      '  ▀▀▀▀▀▀▀    OS: ' + tr({ fr: 'NuitOS', en: 'NightOS' }),
      '             Shell: lab-sh 0.1',
      '             ' + tr({ fr: 'Projets', en: 'Projects' }) + ': ' + roadmaps.projects.map(p => p.name).join(', '),
      '             ' + tr({ fr: 'Carburant : café', en: 'Fuel: coffee' }),
      '             ' + tr({ fr: 'Temps dispo : 2 h par jour', en: 'Free time: 2h a day' }),
    ])
    case 'exit': return { lines: [tr({ fr: 'Il n’y a pas de sortie. Juste du code la nuit. (Échap pour quitter le terminal)', en: 'There is no exit. Just code at night. (Escape leaves the terminal)' })], action: { blur: true } }
    case 'sudo': return err(tr({ fr: 'nitocode n’est pas dans le fichier sudoers. Cet incident sera signalé… à la lune.', en: 'nitocode is not in the sudoers file. This incident will be reported… to the moon.' }))
    case 'rm': return err(tr({ fr: 'rm : bien essayé. Ici, on ne supprime que des bugs.', en: 'rm: nice try. Here, we only delete bugs.' }))
    case 'vim': case 'vi': case 'nano': case 'emacs': return err(tr({ fr: `${cmd} : lecture seule. Mais bon choix d’éditeur.`, en: `${cmd}: read-only. Good choice of editor though.` }))
    default: return err(`${cmd}: ${tr({ fr: 'commande introuvable. Tape help.', en: 'command not found. Type help.' })}`)
  }
}
