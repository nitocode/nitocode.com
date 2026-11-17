# nitocode.com

Site de Nitocode, en Vue 3 + Vite, pré-rendu en pages HTML statiques (vite-ssg) et hébergé par GitHub Pages.

## Travailler dessus
```bash
npm install
npm run dev      # http://localhost:5173, rechargement à chaud
npm run build    # génère dist/ (une page HTML par adresse)
```
Pousser sur `main` suffit : `.github/workflows/deploy.yml` construit et publie le site (~1 min).

## Où est quoi
| Quoi | Où |
|---|---|
| Pages | `src/pages/` (Accueil, Roadmaps, Roadmap, Workflows, Workflow) |
| Roadmaps (jalons, statuts) | `src/data/roadmaps.json` — statut : `fait`, `en-cours`, `a-venir` |
| Workflows (étapes, bulles) | `src/data/workflows.js` — qui : `moi`, `ia`, `auto` |
| Icônes pixel | `src/components/icones.js` (une grille de caractères par image) |
| Charte (couleurs, polices) | `src/style.css` |
| Fichiers servis tels quels | `public/` (CNAME, images, `/en/` pour l'aperçu anglais) |
| Images d'aperçu de partage | `sh outils/og.sh` refait `public/img/og.png` et `og-en.png` |

## Langues
Tout texte affiché est un objet `{ fr, en }` passé à `t()`. Le HTML pré-rendu est en français ;
le navigateur bascule ensuite dans la langue choisie (bouton FR/EN, `?lang=en`, ou langue du navigateur).

## Ajouter une page
1. Créer `src/pages/MaPage.vue` (en-tête : `<EnTete titre="…">`, pied : `<PiedDePage />`, `usePage({ … })` pour le titre et l'aperçu).
2. L'ajouter dans `routes` de `src/main.js`.
