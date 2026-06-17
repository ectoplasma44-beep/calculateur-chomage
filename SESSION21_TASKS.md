# Session 21 — Corrections audit technique monchomage

## RÈGLE DE PUSH OBLIGATOIRE
Après chaque commit :
git push origin main
git log origin/main..main --oneline
Si la liste n'est pas vide, relancer le push avant de continuer.

---

## TÂCHE 1 — Correction "2025" → "2026" (11 pages)

Lis AUDIT_CTR.md pour la liste exacte des 11 pages concernées.
Pour chaque page, remplace "2025" par "2026" dans :
- Le title (metadata)
- La meta description
- Le H1 si "2025" y figure
- Tout texte visible mentionnant l'année dans le corps de page

Ne pas toucher aux dates dans les exemples de calcul historiques s'il y en a
(uniquement les mentions génériques "en 2025" / "2025" qui désignent l'année courante).

Vérifie aussi les pages antérieures à la session 11 au cas où elles auraient
le même problème (recherche globale "2025" dans tous les fichiers page.tsx).

En même temps, corrige sur ces 2 pages spécifiques :
- /rupture-conventionnelle-interimaire : remplacer "RC" par "rupture conventionnelle"
  dans le title (garder l'abréviation uniquement dans le corps si déjà introduite)
- /licenciement-interimaire : remplacer "CDI-I" par "CDI intérimaire" dans le title

Commit : git add . && git commit -m "fix: mise a jour annee 2025 vers 2026 + jargon CTR"
Puis RÈGLE DE PUSH OBLIGATOIRE.

---

## TÂCHE 2 — Sitemap manquant

Ajoute /licenciement-faute-cadre au sitemap : priority 0.8, changefreq monthly,
lastmod date du jour.

Commit : git add . && git commit -m "fix: ajout licenciement-faute-cadre au sitemap"
Puis RÈGLE DE PUSH OBLIGATOIRE.

---

## TÂCHE 3 — JSON-LD manquant (2 pages)

Page d'accueil (/ — fichier racine du projet) :
Ajoute BreadcrumbList JSON-LD (Accueil uniquement, niveau 1).

/comprendre-assurance-chomage :
Ajoute FAQPage JSON-LD avec 3 questions cohérentes avec le contenu déjà présent
sur la page (ne pas dupliquer une FAQ visuelle existante sans schema —
si une FAQ visuelle existe déjà sans JSON-LD, génère le schema à partir
de ces questions existantes plutôt que d'en inventer de nouvelles).

Commit : git add . && git commit -m "fix: jsonld manquant accueil et comprendre-assurance-chomage"
Puis RÈGLE DE PUSH OBLIGATOIRE.

---

## TÂCHE 4 — Pages orphelines (2 pages)

/chomage-net-brut et /temps-partiel n'ont aucun lien interne entrant.
Identifie 2-3 pages pertinentes du site (probablement les pages hub ou
les pages situations générales comme /salaire-journalier-reference ou
/duree-indemnisation) et ajoute un lien inline ou un bandeau vers chacune
des 2 pages orphelines depuis une page pertinente.

Commit : git add . && git commit -m "fix: liens internes chomage-net-brut et temps-partiel"
Puis RÈGLE DE PUSH OBLIGATOIRE.

---

## VÉRIFICATION FINALE
git log origin/main --oneline -10

---

## FIN SESSION 21
Puis :
Lis le fichier SESSION21_TASKS.md à la racine du projet.
Exécute les tâches 1 à 4 dans l'ordre, en respectant la RÈGLE DE PUSH OBLIGATOIRE.
Ne demande pas de confirmation entre les tâches.
