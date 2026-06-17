# AUDIT — Cohérence JSON-LD (BreadcrumbList + FAQPage)

**Date :** 2026-06-17  
**Méthode :** grep de `BreadcrumbList`, `FAQPage` et `application/ld+json` dans src/app/**/*.tsx.

---

## Pages avec JSON-LD incomplet

### 1. `/` — Page d'accueil (`src/app/page.tsx`)
- **FAQPage** : ✓ présente
- **BreadcrumbList** : ✗ absente
- **Observation :** La page d'accueil n'a pas de BreadcrumbList (logique pour la racine, mais Google peut l'afficher comme "MonChomage.fr > Accueil").

### 2. `/comprendre-assurance-chomage` (`src/app/comprendre-assurance-chomage/page.tsx`)
- **BreadcrumbList** : ✓ présente
- **FAQPage** : ✗ absente
- **Observation :** Page de contenu éditorial sans FAQ structurée JSON-LD. Seule page de contenu avec ce profil — toutes les autres pages calculateurs ont les deux.

---

## Pages sans JSON-LD (pages institutionnelles — exclusion légitime)

| Page | Justification |
|---|---|
| `/mentions-legales` | Page institutionnelle légale |
| `/politique-confidentialite` | Page institutionnelle RGPD |
| `/a-propos` | Page institutionnelle |
| `/methodologie` | Page institutionnelle/éditorial |

Ces 4 pages n'ont ni BreadcrumbList ni FAQPage. L'exclusion est justifiée pour les pages légales et institutionnelles.

---

## Pages avec les deux JSON-LD (BreadcrumbList + FAQPage) — conformes

42 pages ont les deux schémas JSON-LD. Liste des pages calculateurs/satellites confirmées :

- /rupture-conventionnelle, /fin-de-cdd, /licenciement-economique
- /salaire-journalier-reference, /duree-indemnisation, /demission-legitime
- /abandon-de-poste, /cumul-emploi-chomage, /degressivite-chomage
- /chomage-seniors, /demission-reconversion-cpf, /licenciement-faute
- /temps-partiel, /delai-carence-chomage, /chomage-net-brut
- /chomage-cadre, /rupture-conventionnelle-cadre, /licenciement-economique-cadre
- /chomage-interimaire, /fin-de-cdd-interimaire, /chomage-alternant-apprenti
- /fin-de-cdd-alternant, /rupture-conventionnelle-senior, /licenciement-economique-senior
- /chomage-rqth, /fin-de-cdd-rqth, /chomage-apres-conge-maternite
- /rupture-conventionnelle-conge-parental, /chomage-fonctionnaire-reconversion
- /licenciement-faute-senior, /abandon-de-poste-senior, /demission-legitime-senior
- /licenciement-faute-cadre, /chomage-cadre-5000-euros, /chomage-cadre-4000-euros
- /chomage-cadre-3000-euros, /chomage-interimaire-2000-euros, /chomage-interimaire-1500-euros
- /rupture-conventionnelle-interimaire, /licenciement-interimaire
- /[montant] (dynamique)

---

## Synthèse

| Statut | Nombre de pages |
|---|---|
| BreadcrumbList + FAQPage (conformes) | 42 |
| FAQPage seule (BreadcrumbList manquante) | 1 (`/`) |
| BreadcrumbList seule (FAQPage manquante) | 1 (`/comprendre-assurance-chomage`) |
| Aucun JSON-LD (institutionnel, exclusion OK) | 4 |
| **Total pages.tsx** | **48** |
