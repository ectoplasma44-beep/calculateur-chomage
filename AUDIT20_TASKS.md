# Audit technique complet — monchomage.fr

## TÂCHE 1 — Liens internes cassés
Liste tous les fichiers page.tsx du projet (src/app si présent, sinon app/ à la racine —
vérifier la structure réelle avant de chercher).
Pour chaque fichier, extrait tous les href="/..." présents dans le JSX.
Pour chaque href trouvé, vérifie qu'un dossier/fichier page.tsx correspondant
existe réellement dans le projet.
Liste dans AUDIT_LIENS_CASSES.md tous les liens qui pointent vers une route
inexistante, avec le fichier source et la route cible.

## TÂCHE 2 — Pages orphelines
Pour chaque route existante, vérifie si au moins un autre fichier du projet
contient un href vers cette route (hors sitemap et hors la page elle-même).
Liste dans AUDIT_PAGES_ORPHELINES.md toutes les pages qui n'ont aucun lien
interne entrant.

## TÂCHE 3 — Sitemap vs routes réelles
Compare la liste des routes générées par le build (sortie de npm run build)
avec les URLs présentes dans le sitemap.
Liste dans AUDIT_SITEMAP.md :
- Les routes qui existent mais sont absentes du sitemap
- Les URLs du sitemap qui ne correspondent à aucune route existante

## TÂCHE 4 — Cohérence JSON-LD
Pour chaque page du projet, vérifie la présence de BreadcrumbList et FAQPage JSON-LD
(la plupart des pages calculateurs/satellites devraient avoir les deux —
exclure uniquement les pages institutionnelles type mentions-legales si pertinent).
Liste dans AUDIT_JSONLD.md les pages où l'un des deux est absent ou mal formé.

## TÂCHE 5 — Vérification git/déploiement (point critique suite incident session 15 monindemnite)
Exécute :
git log origin/main --oneline -20
git log origin/main..main --oneline
Si la deuxième commande renvoie des commits non vides, c'est qu'il existe
des commits locaux jamais poussés — les lister explicitement dans AUDIT_GIT.md
avec leur hash et message. Si la liste est vide, écrire dans AUDIT_GIT.md :
"Aucun commit local en attente — historique distant à jour."

## TÂCHE 6 — Pages sans CTR optimization identifiable
Liste les pages créées depuis la session 11 (se référer aux messages de commit
"feat: [slug]" dans git log).
Vérifie si leur title/meta description suit un pattern orienté question/bénéfice
(comme les pages optimisées en session 9), ou si elles ont encore un title
générique de création initiale.
Liste dans AUDIT_CTR.md les pages candidates à une réécriture de title/meta.

Ne corrige rien dans cette session — uniquement produire les 6 fichiers d'audit.
git add . && git commit -m "docs: audit technique complet monchomage"
git push origin main
git log origin/main..main --oneline
Puis :
Lis le fichier AUDIT20_TASKS.md à la racine du projet.
Exécute les tâches 1 à 6. Ne corrige rien — uniquement produire les
fichiers d'audit listés. Un seul commit final, avec vérification du push.
