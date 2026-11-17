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
| Pages | `src/pages/` (Home, Roadmaps, Roadmap, Workflows, Workflow) |
| Roadmaps (jalons, statuts) | `src/data/roadmaps.json` — `status` : `done`, `in-progress`, `upcoming` |
| Workflows (étapes, bulles) | `src/data/workflows.js` — `who` : `me`, `ai`, `auto` |
| Icônes pixel | `src/components/icons.js` (une grille de caractères par image) |
| Charte (couleurs, polices) | `src/style.css` |
| Fichiers servis tels quels | `public/` (CNAME, images, `/en/` pour l'aperçu anglais) |
| Images d'aperçu de partage | `sh tools/og.sh` refait `public/img/og.png` et `og-en.png` |

## Code
Le code (fichiers, identifiants, classes CSS, commentaires) est en anglais ; les textes affichés sont en français et en anglais.

## Langues
Tout texte affiché est un objet `{ fr, en }` passé à `t()`. Le HTML pré-rendu est en français ;
le navigateur bascule ensuite dans la langue choisie (bouton FR/EN, `?lang=en`, ou langue du navigateur).

## Ajouter une page
1. Créer `src/pages/MyPage.vue` (en-tête : `<PageHeader title="…">`, pied : `<SiteFooter />`, `usePage({ … })` pour le titre et l'aperçu).
2. L'ajouter dans `routes` de `src/main.js`.
