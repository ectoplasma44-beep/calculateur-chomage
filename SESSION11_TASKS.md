# Session 11 — Cluster senior complet + pages salaires profil

## RÈGLES GLOBALES
- Branche main, push après chaque tâche
- Lire src/lib/are-parametres.ts avant chaque page
- Tous les calculs depuis ARE_PARAMS — zéro valeur en dur
- Apostrophes françaises → guillemets doubles ou backticks dans JSX
- BreadcrumbList + FAQPage JSON-LD sur chaque page
- Commit après chaque page

---

## TÂCHE 1 — /licenciement-faute-senior

Fichier : src/app/licenciement-faute-senior/page.tsx
Meta title : "Licenciement faute grave senior 2025 : ARE 36 mois et recours"
Meta description : "Senior licencié pour faute grave après 55 ans ? ARE jusqu'à 36 mois maintenue, recours prud'hommes et impact retraite expliqués."
H1 : "Licenciement faute grave senior : ARE 36 mois et recours 2025"

Sections :
1. Introduction : double spécificité — senior + faute grave, enjeux retraite amplifiés
2. ARE maintenue après faute grave senior : même règle que droit commun,
   durée allongée 36 mois après 55 ans (dureeMax55ansEtPlusJours depuis ARE_PARAMS)
3. Calcul SJR : exemple senior 3 500 euros brut, 20 ans ancienneté
4. Ce que le senior perd : indemnité légale (1/4 x 10 ans + 1/3 x 10 ans), préavis
   Montants calculés depuis ARE_PARAMS
5. Recours prud'hommes senior : délai 12 mois, spécificités senior
   (discrimination par l'âge possible à invoquer en parallèle)
6. Impact retraite : trimestres validés pendant 36 mois ARE,
   tableau selon date départ retraite visée
7. Clause de non-concurrence senior : mêmes règles, mais contrepartie
   souvent plus élevée vu le niveau de responsabilité
8. Comparatif faute grave senior vs licenciement éco senior
   (tableau 6 critères)
9. FAQ 3 questions JSON-LD :
   - "Un senior licencié pour faute grave a-t-il droit à 36 mois de chômage ?"
   - "Peut-on invoquer la discrimination par l'âge lors d'un licenciement pour faute grave ?"
   - "Le licenciement pour faute grave d'un senior impacte-t-il sa retraite ?"
10. CTA : / + /chomage-seniors + /licenciement-faute-cadre
Liens à ajouter :
- /chomage-seniors/page.tsx : lien vers /licenciement-faute-senior
- /licenciement-faute/page.tsx : bandeau "Vous avez 55 ans et plus ?" vers /licenciement-faute-senior

Commit : git add . && git commit -m "feat: licenciement-faute-senior" && git push origin main

---

## TÂCHE 2 — /abandon-de-poste-senior

Fichier : src/app/abandon-de-poste-senior/page.tsx
Meta title : "Abandon de poste senior 2025 : ARE possible après 55 ans ?"
Meta description : "Senior qui abandonne son poste ? Depuis 2023, présomption de démission — mais des recours existent. ARE et impact retraite expliqués."
H1 : "Abandon de poste senior : ARE, présomption de démission et recours 2025"

Sections :
1. Introduction : abandon de poste depuis loi 2023 = présomption de démission,
   spécificité senior — enjeux retraite et ARE 36 mois en jeu
2. Présomption de démission (loi Marché du travail 2023) :
   - Délai : mise en demeure employeur → 15 jours → présomption démission
   - Conséquences : pas d'ARE (démission), perte indemnités
   - Cas où la présomption est renversée (motif légitime, état de santé)
3. Cas où l'abandon de poste senior ouvre des droits ARE :
   - Harcèlement moral prouvé → prise d'acte requalifiable
   - Inaptitude médicale → licenciement pour inaptitude
   - Modification unilatérale contrat par employeur
4. Stratégie alternative recommandée pour un senior :
   - Négocier une rupture conventionnelle plutôt qu'abandonner le poste
   - Prise d'acte si situation intenable (délai prud'hommes)
5. Calcul ARE si droits ouverts : exemple senior 3 200 euros brut,
   18 ans ancienneté — SJR + AJ depuis ARE_PARAMS, durée 36 mois
6. Impact retraite abandon de poste senior : trimestres perdus
   vs ARE (trimestres validés)
7. Comparatif abandon de poste vs RC vs prise d'acte pour un senior
   (tableau 5 critères : ARE, indemnités, délai, risque, impact retraite)
8. FAQ 3 questions JSON-LD :
   - "Un senior peut-il toucher le chômage après un abandon de poste ?"
   - "Vaut-il mieux faire une RC ou abandonner son poste quand on est senior ?"
   - "L'abandon de poste d'un senior impacte-t-il sa retraite ?"
9. CTA : / + /chomage-seniors + /abandon-de-poste + /rupture-conventionnelle-senior
Liens à ajouter :
- /chomage-seniors/page.tsx : lien vers /abandon-de-poste-senior
- /abandon-de-poste/page.tsx : bandeau "Vous avez 55 ans et plus ?" vers /abandon-de-poste-senior

Commit : git add . && git commit -m "feat: abandon-de-poste-senior" && git push origin main

---

## TÂCHE 3 — /demission-legitime-senior

Fichier : src/app/demission-legitime-senior/page.tsx
Meta title : "Démission légitime senior 2025 : ARE après 55 ans possible"
Meta description : "Senior qui démissionne pour motif légitime ? ARE maintenue jusqu'à 36 mois. Cas reconnus, dossier et calcul expliqués avec exemples."
H1 : "Démission légitime senior : ARE 36 mois et cas reconnus 2025"

Sections :
1. Introduction : démission = pas d'ARE en principe, mais motifs légitimes
   reconnus + durée allongée senior = situation avantageuse si bien préparée
2. Motifs légitimes reconnus (liste exhaustive Unédic) :
   - Suivi de conjoint pour motif professionnel
   - Victime de violences conjugales
   - Non-paiement salaire
   - Modification unilatérale contrat de travail
   - Reconversion (loi 2019, conditions spécifiques)
3. Spécificité senior : ARE jusqu'à 36 mois si 55 ans et plus
   (dureeMax55ansEtPlusJours depuis ARE_PARAMS)
4. Calcul SJR senior démission légitime :
   Exemple : senior 52 ans (attention : 52 ans = 30 mois max, pas 36),
   puis exemple 57 ans (36 mois max)
   SJR + AJ depuis ARE_PARAMS pour 3 000 euros brut
5. Dossier à constituer : justificatifs selon motif,
   délai de dépôt (2 mois après démission), instruction Pôle Emploi
6. Délai de carence : uniquement CP (pas de franchise indemnité car démission)
7. Recours si refus Pôle Emploi : commission de recours amiable,
   délai 2 mois, taux de succès partiel
8. Comparatif démission légitime vs RC vs abandon de poste senior
   (tableau 5 critères)
9. FAQ 3 questions JSON-LD :
   - "Quels sont les motifs de démission légitime reconnus pour un senior ?"
   - "Un senior qui démissionne pour suivre son conjoint a-t-il droit à l'ARE ?"
   - "Combien touche un senior de 57 ans en ARE après une démission légitime ?"
10. CTA : / + /chomage-seniors + /demission-legitime + /rupture-conventionnelle-senior
Liens à ajouter :
- /chomage-seniors/page.tsx : lien vers /demission-legitime-senior
- /demission-legitime/page.tsx : bandeau "Vous avez 55 ans et plus ?" vers /demission-legitime-senior

Commit : git add . && git commit -m "feat: demission-legitime-senior" && git push origin main

---

## TÂCHE 4 — /chomage-cadre-5000-euros

Fichier : src/app/chomage-cadre-5000-euros/page.tsx
Meta title : "Chômage cadre 5 000 €/mois 2025 : combien touchez-vous ?"
Meta description : "Cadre avec un salaire de 5 000 €/mois ? Calculez votre ARE exacte : 2 850 €/mois jusqu'au mois 7, puis dégressivité. Détail complet."
H1 : "Chômage cadre 5 000 € brut : ARE, dégressivité et durée 2025"

Sections :
1. Introduction : cas concret cadre à 5 000 euros — les chiffres exacts
2. Calcul SJR : 5 000 euros brut → SJR depuis ARE_PARAMS
3. Montant ARE mensuel : AJ x 30, avant et après dégressivité
4. Tableau mois par mois sur 24 mois (dégressivité mois 7)
5. Durée selon ancienneté : tableau 2 / 5 / 10 / 15 / 20 ans
6. Impact selon type de rupture :
   - RC : délai de carence + franchise
   - Licenciement éco : franchise réduite
   - Faute grave : carence CP uniquement
7. Cumul ARE + activité réduite pour ce profil
8. FAQ 3 questions JSON-LD :
   - "Combien touche un cadre à 5 000 €/mois au chômage ?"
   - "Quand commence la dégressivité pour un cadre à 5 000 € ?"
   - "Un cadre à 5 000 €/mois peut-il cumuler ARE et activité réduite ?"
9. CTA : / + /chomage-cadre + /degressivite-chomage
Liens à ajouter :
- /chomage-cadre/page.tsx : lien vers /chomage-cadre-5000-euros

Commit : git add . && git commit -m "feat: chomage-cadre-5000-euros" && git push origin main

---

## TÂCHE 5 — /chomage-cadre-4000-euros

Fichier : src/app/chomage-cadre-4000-euros/page.tsx
Meta title : "Chômage cadre 4 000 €/mois 2025 : montant ARE exact"
Meta description : "Cadre à 4 000 €/mois au chômage ? ARE mensuelle, dégressivité et durée calculées. Exemple chiffré complet selon ancienneté."
H1 : "Chômage cadre 4 000 € brut : ARE, dégressivité et durée 2025"

Mêmes sections que TÂCHE 4 mais avec salaire de référence 4 000 euros.
Adapter tous les calculs et exemples pour 4 000 euros brut/mois.

Lien à ajouter : /chomage-cadre/page.tsx → lien vers /chomage-cadre-4000-euros

Commit : git add . && git commit -m "feat: chomage-cadre-4000-euros" && git push origin main

---

## TÂCHE 6 — /chomage-interimaire-2000-euros

Fichier : src/app/chomage-interimaire-2000-euros/page.tsx
Meta title : "Chômage intérimaire 2 000 €/mois 2025 : ARE calculée"
Meta description : "Intérimaire avec un salaire moyen de 2 000 €/mois ? ARE calculée avec primes de précarité et CP inclus. Montant exact et durée."
H1 : "Chômage intérimaire 2 000 € brut : ARE, SJR et durée 2025"

Sections :
1. Introduction : cas concret intérimaire à 2 000 euros
2. Calcul SJR intérimaire : base missions + précarité 10% + CP 10%
   Assiette = 2 000 x (1 + 0.10 + 0.10) = 2 400 euros/mois
   Utiliser constantes INTERIM_TAUX_PRECARITE et INTERIM_TAUX_CP depuis la page
   chomage-interimaire (ou les redéclarer si non exportées)
3. SJR = assiette annuelle / jours travaillés
   Exemple : 12 mois de missions = 365 jours travaillés
   SJR = (2 400 x 12) / 365 = 78,90 euros/j
4. Montant ARE depuis ARE_PARAMS, mensuel
5. Durée selon jours travaillés : tableau 130 / 182 / 365 jours
6. Rechargement des droits : nouvelle mission 130 jours minimum
7. FAQ 3 questions JSON-LD :
   - "Combien touche un intérimaire à 2 000 €/mois au chômage ?"
   - "La prime de précarité est-elle incluse dans le calcul de l'ARE intérimaire ?"
   - "Combien de temps un intérimaire à 2 000 €/mois est-il indemnisé ?"
8. CTA : / + /chomage-interimaire
Lien à ajouter : /chomage-interimaire/page.tsx → lien vers /chomage-interimaire-2000-euros

Commit : git add . && git commit -m "feat: chomage-interimaire-2000-euros" && git push origin main

---

## TÂCHE 7 — Mise à jour sitemap

Lis le sitemap existant.
Ajoute les 6 nouvelles URLs avec priority 0.7, changefreq monthly,
lastmod date du jour :
- /licenciement-faute-senior
- /abandon-de-poste-senior
- /demission-legitime-senior
- /chomage-cadre-5000-euros
- /chomage-cadre-4000-euros
- /chomage-interimaire-2000-euros

Commit : git add . && git commit -m "feat: sitemap session 11" && git push origin main

---

## FIN SESSION 11
Puis :
Lis le fichier SESSION11_TASKS.md à la racine du projet.

Exécute les tâches 1 à 7 dans l'ordre.
Commit après chaque tâche comme indiqué.
Ne demande pas de confirmation entre les tâches.
Signale uniquement si un blocage technique rend une tâche impossible.
