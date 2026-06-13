# Session 8 — Préparation AdSense

## RÈGLES GLOBALES
- Branche main, push après chaque tâche
- Apostrophes françaises → guillemets doubles ou backticks dans JSX

---

## TÂCHE 1 — ads.txt

Crée le fichier public/ads.txt avec ce contenu :
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0

IMPORTANT : laisser pub-XXXXXXXXXXXXXXXX tel quel comme placeholder.
Abi remplacera manuellement par son vrai Publisher ID après le push.

Commit : git add . && git commit -m "feat: ads.txt AdSense" && git push origin main

---

## TÂCHE 2 — Mise à jour politique de confidentialité

Lis src/app/mentions-legales/page.tsx ou src/app/politique-confidentialite/page.tsx
(lire les deux, identifier lequel contient la politique de confidentialité).

Ajoute une section "Publicite et cookies" si absente, avec ce contenu :
- Ce site utilise Google AdSense, un service de publicite de Google LLC.
- Google AdSense utilise des cookies pour diffuser des annonces personnalisees
  basees sur les visites anterieures de l'utilisateur sur ce site et d'autres sites.
- L'utilisateur peut desactiver la personnalisation des annonces via
  https://www.google.com/settings/ads
- Google AdSense respecte le RGPD : https://policies.google.com/privacy

Si la page politique de confidentialite n'existe pas du tout, crée-la :
Fichier : src/app/politique-confidentialite/page.tsx
Contenu : politique complete RGPD incluant :
- Responsable du traitement
- Donnees collectees (logs serveur, cookies analytiques, cookies publicitaires)
- Section Google AdSense detaillee comme ci-dessus
- Droits de l'utilisateur (acces, rectification, suppression)
- Contact : ajouter un email placeholder [contact@monchomage.fr]
- Lien vers /mentions-legales

Ajouter un lien vers /politique-confidentialite dans le footer si absent.

Commit : git add . && git commit -m "feat: politique confidentialite AdSense RGPD" && git push origin main

---

## TÂCHE 3 — Banniere cookies (consentement RGPD)

Crée le composant src/components/CookieBanner.tsx :
- Banniere fixe en bas de page (position fixed, z-50)
- Texte : "Ce site utilise des cookies publicitaires (Google AdSense) et analytiques.
  En continuant, vous acceptez leur utilisation."
- Bouton "Accepter" (fond bleu) + bouton "Refuser" (fond gris)
- Au clic : stocker le choix dans localStorage ("cookie-consent" = "accepted" ou "refused")
- Si "refused" : ne pas charger le script AdSense
- Si "accepted" ou premiere visite sans choix : afficher les pubs
- La banniere disparait apres le choix et ne reapparait pas

Integre CookieBanner dans src/app/layout.tsx.

IMPORTANT : ne pas encore ajouter le script AdSense — Tâche 4 s'en charge.

Commit : git add . && git commit -m "feat: banniere cookies RGPD" && git push origin main

---

## TÂCHE 4 — Script AdSense dans le layout

Lis src/app/layout.tsx.

Ajoute dans le <head> :
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>

IMPORTANT : laisser ca-pub-XXXXXXXXXXXXXXXX comme placeholder.
Utiliser le composant Script de next/script (import existant ou a ajouter).
Le script ne doit se charger que si le consentement cookie est "accepted" —
verifier que la logique CookieBanner de la Tâche 3 gere ca correctement,
sinon ajuster.

Commit : git add . && git commit -m "feat: script AdSense layout conditionnel" && git push origin main

---

## TÂCHE 5 — Audit contenu fin

Lis tous les fichiers src/app/*/page.tsx.
Identifie les pages dont le contenu textuel est inferieur a 300 mots
(compter approximativement les strings de texte dans le JSX).
Pour chaque page courte trouvee :
- Ajouter une section "Questions frequentes" avec 2 questions/reponses
  basees sur le sujet de la page
- Minimum 300 mots total apres ajout

Lister dans le commit message les pages modifiees.

Commit : git add . && git commit -m "feat: enrichissement contenu pages courtes audit" && git push origin main

---

## TÂCHE 6 — Checklist AdSense

Crée le fichier ADSENSE_CHECKLIST.md a la racine :

# Checklist AdSense — monchomage.fr

## Actions automatiques (faites par Claude Code session 8)
- [x] ads.txt créé dans /public
- [x] Politique de confidentialite avec section AdSense
- [x] Banniere cookies RGPD
- [x] Script AdSense conditionnel dans layout
- [x] Audit contenu — pages < 300 mots enrichies

## Actions manuelles requises AVANT soumission AdSense

### 1. Remplacer les placeholders Publisher ID
- public/ads.txt : remplacer pub-XXXXXXXXXXXXXXXX par ton vrai Publisher ID
- src/app/layout.tsx : remplacer ca-pub-XXXXXXXXXXXXXXXX par ton vrai Publisher ID
- Ton Publisher ID est visible sur : https://adsense.google.com/intl/fr_fr/start/
  (format : pub-1234567890123456)

### 2. Verifier le deploiement Vercel
- Aller sur https://www.monchomage.fr/ads.txt
- Verifier que le fichier est accessible et contient ton Publisher ID
- Aller sur https://www.monchomage.fr/politique-confidentialite
- Verifier que la page est accessible

### 3. Ajouter monchomage.fr dans AdSense
- Aller sur https://adsense.google.com
- Sites > Ajouter un site
- Entrer : monchomage.fr
- Copier le code de verification si demande (le coller dans layout.tsx balise <head>)

### 4. Soumettre pour examen
- AdSense > Sites > monchomage.fr > Soumettre pour examen
- Delai habituel : 1 a 14 jours

## Apres approbation AdSense
- Creer une unite publicitaire (banniere 728x90 ou responsive)
- Ajouter le composant AdUnit dans les pages a fort trafic en premier
- Priorite : /chomage-cadre, /chomage-interimaire, /chomage-alternant-apprenti

Commit : git add . && git commit -m "docs: checklist AdSense soumission" && git push origin main

---

## FIN SESSION 8
Puis lance :
Lis le fichier SESSION8_TASKS.md à la racine du projet.

Exécute les tâches 1 à 6 dans l'ordre.
Commit après chaque tâche comme indiqué.
Ne demande pas de confirmation entre les tâches.
Signale uniquement si un blocage technique rend une tâche impossible.
