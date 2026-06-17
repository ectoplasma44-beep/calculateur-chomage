# AUDIT — Pages orphelines (aucun lien interne entrant)

**Date :** 2026-06-17  
**Méthode :** Pour chaque route, recherche de tout `href="/[route]"` dans src/**/*.tsx (hors sitemap, hors la page elle-même).

## Pages orphelines confirmées

### 1. `/chomage-net-brut`
- **Fichier :** `src/app/chomage-net-brut/page.tsx`
- **Absent du layout** (footer/nav) : oui
- **Aucun lien entrant** dans aucune autre page TSX
- **Présent dans le sitemap** : oui (priorité 0.8)
- **Impact :** Accessible uniquement via sitemap ou URL directe. Aucun maillage interne.

### 2. `/temps-partiel`
- **Fichier :** `src/app/temps-partiel/page.tsx`
- **Absent du layout** (footer/nav) : oui
- **Aucun lien entrant** dans aucune autre page TSX
- **Présent dans le sitemap** : oui (priorité 0.8)
- **Impact :** Accessible uniquement via sitemap ou URL directe. Aucun maillage interne.

### 3. Routes dynamiques `/chomage-salaire-X-euros` (`[montant]`)
- **Fichier :** `src/app/[montant]/page.tsx`
- **Aucun href** vers ces routes dans aucune page du projet
- **Présentes dans le sitemap** : oui (via `SALAIRES_CONFIG`)
- **Impact :** Accessibles uniquement via sitemap. Aucun maillage interne.

---

## Pages avec liens entrants uniquement depuis la page d'accueil

Ces pages ne sont pas orphelines mais n'ont qu'un seul point d'entrée :

| Route | Lien entrant unique |
|---|---|
| /chomage-cadre | home page |
| /chomage-interimaire | home page + fin-de-cdd |
| /chomage-alternant-apprenti | home page + fin-de-cdd |
| /chomage-rqth | home page + duree-indemnisation |
| /chomage-fonctionnaire-reconversion | home page + demission-reconversion-cpf |

---

## Pages correctement maillées

Toutes les autres routes ont au moins un lien entrant depuis une autre page de contenu ou depuis le layout global.
