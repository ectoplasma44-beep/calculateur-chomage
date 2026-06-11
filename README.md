# MonChomage.fr

Calculateur d'allocation chômage (ARE) France 2026 — outil indépendant, non affilié à France Travail ou à l'Unédic.

## Fonctionnalités

- **Calculateur ARE** en temps réel : SJR, allocation journalière et mensuelle brutes, durée d'indemnisation, dégressivité
- **Pages institutionnelles** : méthodologie, guide de l'assurance chômage, mentions légales, à propos
- **SEO** : metadata, JSON-LD (FAQPage, BreadcrumbList), sitemap.xml, robots.txt

## Architecture

- `src/lib/are-parametres.ts` — **source unique de vérité** pour tous les paramètres réglementaires (taux, montants, seuils). Aucune valeur ARE n'est hardcodée ailleurs.
- `src/lib/calcul-are.ts` — logique de calcul pure (SJR, allocation, dégressivité, durée, validation)
- `src/types/are.ts` — types TypeScript
- `src/components/CalculateurARE.tsx` — composant client du calculateur
- `src/__tests__/calcul-are.test.ts` — 70 tests Jest

## Sources

Paramètres issus du document Unédic « Paramètres utiles — Janvier 2026 », en vigueur depuis le 01/07/2025. Prochaine revalorisation attendue le 01/07/2026.

## Commandes

```bash
npm run dev     # serveur de développement
npm test        # tests Jest
npm run build   # build de production
```
