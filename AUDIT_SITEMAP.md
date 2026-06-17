# AUDIT — Sitemap vs routes réelles

**Date :** 2026-06-17  
**Méthode :** Comparaison entre `src/app/sitemap.ts` et les `page.tsx` existants dans `src/app/`.  
**Note :** Le build complet (`npm run build`) n'a pas été exécuté pour cet audit — la comparaison est faite sur la base du système de fichiers et du sitemap statique.

---

## Routes existantes ABSENTES du sitemap

| Route | Fichier | Observation |
|---|---|---|
| `/licenciement-faute-cadre` | `src/app/licenciement-faute-cadre/page.tsx` | **MANQUANT** — page de contenu complète, non institutionnelle |
| `/politique-confidentialite` | `src/app/politique-confidentialite/page.tsx` | Intentionnellement absent (page institutionnelle RGPD) |

### Point critique : `/licenciement-faute-cadre` absent du sitemap

Le sitemap contient `/licenciement-faute` (priorité 0.9) et `/licenciement-faute-senior` (priorité 0.7) mais **pas `/licenciement-faute-cadre`**. Cette page calculateur complète est créée depuis la session 11 (commit `dbb3494`) et n'est pas indexée via le sitemap.

---

## URLs du sitemap sans route existante correspondante

Aucune URL du sitemap ne pointe vers une route inexistante.

Les routes dynamiques `chomage-salaire-X-euros` (générées via `SALAIRES_CONFIG`) sont bien couvertes par `src/app/[montant]/page.tsx`.

---

## Récapitulatif du sitemap

Le sitemap couvre **44 URLs statiques** + N URLs dynamiques (SALAIRES_CONFIG).

URLs statiques présentes dans le sitemap :

| Priorité | Routes |
|---|---|
| 1.0 | / |
| 0.9 | /rupture-conventionnelle, /fin-de-cdd, /licenciement-economique, /demission-legitime, /abandon-de-poste, /demission-reconversion-cpf, /licenciement-faute |
| 0.8 | /salaire-journalier-reference, /duree-indemnisation, /cumul-emploi-chomage, /degressivite-chomage, /chomage-seniors, /comprendre-assurance-chomage, /temps-partiel, /delai-carence-chomage, /chomage-net-brut, /chomage-cadre, /rupture-conventionnelle-cadre, /licenciement-economique-cadre, /chomage-interimaire, /chomage-alternant-apprenti, /rupture-conventionnelle-senior, /licenciement-economique-senior |
| 0.7 | /fin-de-cdd-interimaire, /fin-de-cdd-alternant, /chomage-rqth, /fin-de-cdd-rqth, /chomage-apres-conge-maternite, /rupture-conventionnelle-conge-parental, /chomage-fonctionnaire-reconversion, /licenciement-faute-senior, /abandon-de-poste-senior, /demission-legitime-senior, /chomage-cadre-5000-euros, /chomage-cadre-4000-euros, /chomage-interimaire-2000-euros, /rupture-conventionnelle-interimaire, /licenciement-interimaire, /chomage-cadre-3000-euros, /chomage-interimaire-1500-euros + SALAIRES_CONFIG |
| 0.6 | /methodologie |
| 0.5 | /a-propos |
| 0.3 | /mentions-legales |
