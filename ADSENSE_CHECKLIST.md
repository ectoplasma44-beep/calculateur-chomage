# Checklist AdSense — monchomage.fr

## Actions automatiques (faites par Claude Code session 8)
- [x] ads.txt créé dans /public
- [x] Politique de confidentialite avec section AdSense
- [x] Banniere cookies RGPD
- [x] Script AdSense conditionnel dans layout
- [x] Audit contenu — pages < 300 mots enrichies

## Actions manuelles requises AVANT soumission AdSense

### 1. Remplacer les placeholders Publisher ID
- public/ads.txt : remplacer pub-9904521546520967 par ton vrai Publisher ID
- src/app/layout.tsx : remplacer ca-pub-9904521546520967 par ton vrai Publisher ID
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
