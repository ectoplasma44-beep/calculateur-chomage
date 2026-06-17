# Session 17 — Cluster intérimaire complet + pages salaires manquantes

## RÈGLES GLOBALES
- Branche main
- Lire src/lib/are-parametres.ts avant chaque page
- Tous les calculs depuis ARE_PARAMS — zéro valeur en dur
- Apostrophes françaises → guillemets doubles ou backticks dans JSX
- BreadcrumbList + FAQPage JSON-LD sur chaque page

## RÈGLE DE PUSH OBLIGATOIRE
Après chaque commit :
git push origin main
git log origin/main..main --oneline
Si la liste n'est pas vide, relancer le push avant de continuer.
Ne jamais passer à la tâche suivante sans confirmation vide.

---

## TÂCHE 1 — /rupture-conventionnelle-interimaire

Lis d'abord : src/app/chomage-interimaire/page.tsx
Fichier cible : src/app/rupture-conventionnelle-interimaire/page.tsx

Meta title : "RC intérimaire 2025 : possible ? Conditions et ARE"
Meta description : "Un intérimaire peut-il signer une rupture conventionnelle ? Conditions, calcul ARE et alternatives expliqués avec exemples chiffrés 2025."
H1 : "Rupture conventionnelle intérimaire : conditions et ARE 2025"

Sections :
1. Introduction (150 mots) : la RC suppose un CDI — cas rare mais possible
   pour un intérimaire en CDI intérimaire (CDI-I), distinction à clarifier
2. CDI intérimaire vs contrat de mission classique :
   - CDI-I : RC possible comme tout CDI
   - Contrat de mission (CDD) : RC impossible, seule la rupture anticipée existe
3. RC pour un salarié en CDI intérimaire :
   - Procédure identique à un CDI classique
   - Indemnité minimale légale + éventuelle convention ETT
   - Exemple : CDI-I, 4 ans ancienneté, salaire moyen 2 000 euros brut
4. Calcul SJR pour un CDI-I en RC :
   - Base sur moyenne des missions effectuées
   - Calcul ARE depuis ARE_PARAMS
5. Alternative : rupture anticipée d'un contrat de mission
   - Accord entre les 3 parties (intérimaire, ETT, entreprise utilisatrice)
   - Conditions ARE différentes (voir /fin-de-cdd-interimaire)
6. Comparatif RC (CDI-I) vs fin de mission classique (tableau 5 critères)
7. FAQ 3 questions JSON-LD :
   - "Un intérimaire peut-il signer une rupture conventionnelle ?"
   - "Quelle différence entre CDI intérimaire et contrat de mission ?"
   - "Comment calculer l'ARE après une RC en CDI intérimaire ?"
8. CTA : /chomage-interimaire + /fin-de-cdd-interimaire

BreadcrumbList : Accueil > Chômage intérimaire > Rupture conventionnelle intérimaire

Lien à ajouter : chomage-interimaire/page.tsx → lien vers /rupture-conventionnelle-interimaire

Commit : git add . && git commit -m "feat: rupture-conventionnelle-interimaire"
Puis RÈGLE DE PUSH OBLIGATOIRE.

---

## TÂCHE 2 — /licenciement-interimaire

Lis d'abord : src/app/chomage-interimaire/page.tsx
Fichier cible : src/app/licenciement-interimaire/page.tsx

Meta title : "Licenciement intérimaire 2025 : CDI-I, motifs et ARE"
Meta description : "Intérimaire en CDI licencié ? Motifs possibles, indemnités et calcul ARE expliqués. Distinction avec la fin de mission classique."
H1 : "Licenciement intérimaire : CDI-I, motifs et ARE 2025"

Sections :
1. Introduction : licenciement suppose un CDI — uniquement applicable
   au CDI intérimaire (CDI-I), pas au contrat de mission
2. Motifs de licenciement possibles pour un CDI-I :
   - Économique : si l'ETT manque de missions à proposer durablement
   - Personnel : faute, inaptitude, insuffisance professionnelle
   - Particularité : obligation de l'ETT de proposer des missions avant licenciement
3. Indemnité légale licenciement CDI-I :
   - Formule standard depuis ARE_PARAMS
   - Exemple : CDI-I, 5 ans, salaire moyen missions 2 100 euros brut
4. ARE après licenciement CDI-I :
   - Calcul SJR sur moyenne missions
   - Pas de franchise si licenciement classique (hors RC)
5. Licenciement pour absence de mission prolongée :
   - Obligation ETT de chercher activement des missions
   - Recours possible si négligence prouvée
6. Comparatif licenciement CDI-I vs fin de mission classique (tableau)
7. FAQ 3 questions JSON-LD :
   - "Une ETT peut-elle licencier un CDI intérimaire faute de missions ?"
   - "Quelle indemnité pour un licenciement en CDI intérimaire ?"
   - "Le licenciement d'un CDI-I ouvre-t-il les mêmes droits ARE qu'un CDI classique ?"
8. CTA : /chomage-interimaire + /rupture-conventionnelle-interimaire

BreadcrumbList : Accueil > Chômage intérimaire > Licenciement intérimaire

Lien à ajouter : chomage-interimaire/page.tsx → lien vers /licenciement-interimaire

Commit : git add . && git commit -m "feat: licenciement-interimaire"
Puis RÈGLE DE PUSH OBLIGATOIRE.

---

## TÂCHE 3 — /chomage-cadre-3000-euros

Lis d'abord : src/app/chomage-cadre-5000-euros/page.tsx (reprendre la même structure)
Fichier cible : src/app/chomage-cadre-3000-euros/page.tsx

Meta title : "Chômage cadre 3 000 €/mois 2025 : montant ARE exact"
Meta description : "Cadre à 3 000 €/mois au chômage ? ARE mensuelle, dégressivité et durée calculées depuis les paramètres officiels. Exemple complet."
H1 : "Chômage cadre 3 000 € brut : ARE, dégressivité et durée 2025"

Mêmes sections que chomage-cadre-5000-euros mais avec salaire de référence 3 000 euros.
Adapter tous les calculs depuis ARE_PARAMS pour 3 000 euros brut/mois.

Lien à ajouter : chomage-cadre/page.tsx → lien vers /chomage-cadre-3000-euros

Commit : git add . && git commit -m "feat: chomage-cadre-3000-euros"
Puis RÈGLE DE PUSH OBLIGATOIRE.

---

## TÂCHE 4 — /chomage-interimaire-1500-euros

Lis d'abord : src/app/chomage-interimaire-2000-euros/page.tsx (reprendre la même structure)
Fichier cible : src/app/chomage-interimaire-1500-euros/page.tsx

Meta title : "Chômage intérimaire 1 500 €/mois 2025 : ARE calculée"
Meta description : "Intérimaire à 1 500 €/mois en moyenne ? ARE calculée avec primes de précarité et CP inclus. Montant exact et durée d'indemnisation."
H1 : "Chômage intérimaire 1 500 € brut : ARE, SJR et durée 2025"

Mêmes sections que chomage-interimaire-2000-euros mais avec salaire moyen 1 500 euros.
Adapter l'assiette : 1 500 x (1 + 0.10 + 0.10) = 1 800 euros/mois.

Lien à ajouter : chomage-interimaire/page.tsx → lien vers /chomage-interimaire-1500-euros

Commit : git add . && git commit -m "feat: chomage-interimaire-1500-euros"
Puis RÈGLE DE PUSH OBLIGATOIRE.

---

## TÂCHE 5 — Sitemap + vérification finale

Ajoute les 4 nouvelles URLs au sitemap :
priority 0.7, changefreq monthly, lastmod date du jour.

Commit : git add . && git commit -m "feat: sitemap session 17"
Puis RÈGLE DE PUSH OBLIGATOIRE.

VÉRIFICATION FINALE :
git log origin/main --oneline -10
Afficher le résultat pour confirmer les 5 commits sur le remote.

---

## FIN SESSION 17
