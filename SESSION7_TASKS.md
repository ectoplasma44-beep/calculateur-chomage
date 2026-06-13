# Session 7 — Sitemap + maillage interne

## RÈGLES GLOBALES
- Branche main, push après chaque tâche
- Zéro valeur en dur dans les composants
- Apostrophes françaises → guillemets doubles ou backticks dans JSX

---

## TÂCHE 1 — Mettre à jour le sitemap

Lis le fichier sitemap.xml (ou sitemap.ts selon l'implémentation) existant.
Ajoute les 14 URLs suivantes avec priorité et changefreq appropriés :
- /chomage-cadre → priority 0.8, changefreq monthly
- /rupture-conventionnelle-cadre → priority 0.8, changefreq monthly
- /licenciement-economique-cadre → priority 0.8, changefreq monthly
- /chomage-interimaire → priority 0.8, changefreq monthly
- /fin-de-cdd-interimaire → priority 0.7, changefreq monthly
- /chomage-alternant-apprenti → priority 0.8, changefreq monthly
- /fin-de-cdd-alternant → priority 0.7, changefreq monthly
- /rupture-conventionnelle-senior → priority 0.8, changefreq monthly
- /licenciement-economique-senior → priority 0.8, changefreq monthly
- /chomage-rqth → priority 0.7, changefreq monthly
- /fin-de-cdd-rqth → priority 0.7, changefreq monthly
- /chomage-apres-conge-maternite → priority 0.7, changefreq monthly
- /rupture-conventionnelle-conge-parental → priority 0.7, changefreq monthly
- /chomage-fonctionnaire-reconversion → priority 0.7, changefreq monthly

Date lastmod : date du jour au format YYYY-MM-DD.
Vérifie que les URLs existantes sont toujours présentes — ne pas supprimer.

Commit : git add . && git commit -m "feat: sitemap session 7 - 14 nouvelles URLs" && git push origin main

---

## TÂCHE 2 — Audit et complétion du maillage interne

Lis tous les fichiers src/app/*/page.tsx un par un.
Pour chaque lien manquant dans la liste ci-dessous, ajoute-le dans la page source
sous forme de lien inline dans le texte ou de bandeau bleu selon le contexte.

### Liens manquants à ajouter :

SOURCE → CIBLE (texte du lien)
/chomage-cadre → /licenciement-faute-cadre si la page existe, sinon ignorer
/rupture-conventionnelle-senior → /chomage-seniors (lien "Voir tous les droits seniors")
/licenciement-economique-senior → /chomage-seniors (lien "Voir tous les droits seniors")
/chomage-rqth → /chomage-seniors (note : RQTH ≠ senior mais lien thématique droits allongés)
/fin-de-cdd-rqth → /chomage-rqth (lien "Voir tous les droits RQTH")
/chomage-apres-conge-maternite → /rupture-conventionnelle-conge-parental
/rupture-conventionnelle-conge-parental → /chomage-apres-conge-maternite
/chomage-fonctionnaire-reconversion → /demission-reconversion-cpf
/chomage-fonctionnaire-reconversion → /demission-legitime
/ (page accueil) → section "Votre profil" avec liens vers les 5 hubs :
  /chomage-cadre, /chomage-interimaire, /chomage-alternant-apprenti,
  /chomage-rqth, /chomage-fonctionnaire-reconversion

### Section "Votre profil" sur la page d'accueil :
Ajoute une section après le calculateur principal avec ce contenu :
- Titre : "Votre situation est particuliere ?"
- 5 cartes Tailwind (grid-cols-2 md:grid-cols-3) avec icone + titre + lien :
  1. "Vous etes cadre" → /chomage-cadre
  2. "Vous etes interimaire" → /chomage-interimaire
  3. "Vous etes alternant" → /chomage-alternant-apprenti
  4. "Vous avez 55 ans ou plus" → /chomage-seniors
  5. "Vous etes reconnu RQTH" → /chomage-rqth
  6. "Vous etes fonctionnaire" → /chomage-fonctionnaire-reconversion

Commit : git add . && git commit -m "feat: maillage interne session 7" && git push origin main

---

## TÂCHE 3 — Générer la liste d'indexation GSC

Crée le fichier GSC_INDEXATION_SESSION7.md à la racine avec ce contenu :

# URLs à indexer dans Google Search Console — Session 7
# Quota : 10-12 URLs par jour
# Ordre de priorité : hubs en premier (plus de valeur de maillage)

## Jour 1 (priorité haute — hubs)
https://www.monchomage.fr/chomage-cadre
https://www.monchomage.fr/chomage-interimaire
https://www.monchomage.fr/chomage-alternant-apprenti
https://www.monchomage.fr/chomage-rqth
https://www.monchomage.fr/chomage-fonctionnaire-reconversion
https://www.monchomage.fr/rupture-conventionnelle-cadre
https://www.monchomage.fr/licenciement-economique-cadre
https://www.monchomage.fr/rupture-conventionnelle-senior
https://www.monchomage.fr/licenciement-economique-senior
https://www.monchomage.fr/fin-de-cdd-interimaire

## Jour 2 (priorité normale — pages combo)
https://www.monchomage.fr/fin-de-cdd-alternant
https://www.monchomage.fr/fin-de-cdd-rqth
https://www.monchomage.fr/chomage-apres-conge-maternite
https://www.monchomage.fr/rupture-conventionnelle-conge-parental

Commit : git add . && git commit -m "docs: liste indexation GSC session 7" && git push origin main

---

## FIN SESSION 7

Étape 2 — Le prompt maître
Lis le fichier SESSION7_TASKS.md à la racine du projet.

Exécute les tâches 1, 2 et 3 dans l'ordre.
Commit après chaque tâche comme indiqué.
Ne demande pas de confirmation entre les tâches.
Signale uniquement si un blocage technique rend une tâche impossible.
