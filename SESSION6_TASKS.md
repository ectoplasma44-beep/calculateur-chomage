# Session 6 — Pages restantes à créer

## RÈGLES GLOBALES (appliquer à chaque tâche)
- Lire src/lib/are-parametres.ts avant chaque page
- Ajouter les constantes manquantes dans are-parametres.ts si nécessaire
- Tous les calculs depuis ARE_PARAMS — zéro valeur en dur
- Apostrophes françaises → guillemets doubles ou backticks dans JSX
- Contenu uniquement basé sur règles ARE + Code du travail 2024-2025
- BreadcrumbList + FAQPage JSON-LD sur chaque page
- Commit après chaque page : git add . && git commit -m "feat: [slug]" && git push origin main

---

## TÂCHE 5 — /fin-de-cdd-interimaire
Fichier : src/app/fin-de-cdd-interimaire/page.tsx
Meta title : "Fin de mission interim chomage 2025 : calcul ARE et droits"
Meta description : "Fin de mission d'interim ? Calcul ARE, SJR sur missions effectives, delai de carence et droits 2025. Exemples chiffres pour interimaires."
H1 : "Fin de mission interim : ARE, droits et calcul 2025"
Sections :
1. Introduction : fin de mission = motif valable ARE automatique (pas de carence motif)
2. Conditions ouverture droits : 130 jours / 910h sur 24 mois, inscription dans 12 mois
3. SJR fin de mission : base missions effectives + precarite 10% + CP 10%
   Exemple : 4 missions sur 6 mois, total 11 000 euros brut -> calcul complet
4. Delai de carence : uniquement carence CP (pas de franchise indemnite car fin de mission)
   Tableau : carence selon duree missions (3 / 6 / 9 / 12 mois de missions)
5. Duree indemnisation : 1j indemnise / 1j travaille, plafond 24 mois
6. Rechargement des droits : nouvelle mission 130j minimum
7. Cas : fin de mission anticipee par entreprise utilisatrice (droits identiques)
8. Cas : fin de mission + CDI refuse (conditions identiques requises depuis 2023)
9. Comparatif fin de mission vs fin CDD classique (tableau 5 criteres)
10. FAQ 3 questions JSON-LD :
    - "Peut-on toucher le chomage apres chaque fin de mission ?"
    - "La prime de precarite est-elle incluse dans le calcul de l'ARE ?"
    - "Combien de temps apres une fin de mission recoit-on l'ARE ?"
CTA : / + /chomage-interimaire + /delai-carence-chomage
Lien a ajouter : chomage-interimaire/page.tsx -> lien vers /fin-de-cdd-interimaire

---

## TÂCHE 6 — /chomage-alternant-apprenti (hub)
Fichier : src/app/chomage-alternant-apprenti/page.tsx
Meta title : "Chomage alternant apprenti 2025 : droits ARE apres alternance"
Meta description : "Fin de contrat d'alternance ou d'apprentissage ? Droits ARE, conditions, calcul SJR et duree indemnisation 2025 expliques avec exemples."
H1 : "Chomage alternant et apprenti : droits ARE 2025"
Sections :
1. Introduction : specificite statut alternant — contrat pro ou apprentissage,
   fin de contrat = motif valable, droits souvent meconnus
2. Conditions ARE alternant :
   - Contrat pro (CDD) : memes conditions qu'un CDD classique (130j / 910h)
   - Contrat apprentissage : idem depuis reforme 2019
   - Age : pas de limite basse, plafond 29 ans pour le contrat mais pas pour l'ARE
3. Calcul SJR alternant :
   - Base : salaire brut percu pendant alternance (% SMIC selon age)
   - Inclure toutes les periodes du contrat
   - Exemple : alternant 21 ans, 2 ans de contrat, salaire 1 200 euros brut/mois
     -> SJR = (28 800) / 730 = 39,45 euros/j -> AJ depuis ARE_PARAMS
4. Duree indemnisation : selon jours travailles (1j/1j), max 24 mois
5. Cas : rupture contrat alternance avant terme
   - A l'initiative de l'employeur : ARE ouverte
   - A l'initiative de l'alternant : assimile a demission (sauf cas legitimes)
   - Rupture periode essai : cas specifique
6. Fin d'alternance + poursuite etudes : pas compatible ARE (statut etudiant)
7. Fin d'alternance + recherche emploi : ARE ouverte si conditions remplies
8. Tableau comparatif alternant vs stagiaire vs CDD classique (5 criteres)
9. FAQ 3 questions JSON-LD :
   - "Un alternant a-t-il droit au chomage apres son contrat ?"
   - "Comment est calcule l'ARE d'un ancien alternant ?"
   - "Peut-on toucher l'ARE et reprendre des etudes en meme temps ?"
CTA : / + /fin-de-cdd + /fin-de-cdd-alternant (page a venir)
Lien a ajouter : fin-de-cdd/page.tsx -> bandeau "Vous etes alternant ?"

---

## TÂCHE 7 — /fin-de-cdd-alternant
Fichier : src/app/fin-de-cdd-alternant/page.tsx
Meta title : "Fin de contrat alternance chomage 2025 : ARE et demarches"
Meta description : "Contrat d'alternance termine ? Calcul ARE, demarches Pole Emploi et droits 2025. Guide complet avec exemples chiffres pour alternants."
H1 : "Fin de contrat alternance : ARE, demarches et droits 2025"
Sections :
1. Introduction : fin de contrat alternance = evenement frequent, droits souvent ignores
2. Conditions ARE : 130j / 910h, inscription dans 12 mois
3. SJR : base salaire alternance complet (24 mois pour contrat 2 ans)
   Exemple A : alternant 20 ans, 2 ans, 1 100 euros/mois -> calcul complet
   Exemple B : alternant 25 ans, 1 an, 1 500 euros/mois -> calcul complet
4. Delai de carence : uniquement CP (pas d'indemnite de fin de contrat pour l'alternance)
5. Duree indemnisation selon duree contrat : tableau 1 an / 2 ans / 3 ans
6. Demarches : inscription PE dans 12 mois, documents employeur (attestation)
7. Cumul ARE + formation courte post-alternance : regles
8. Non-renouvellement vs rupture avant terme : differences de droits
9. FAQ 3 questions JSON-LD :
   - "Combien touche-t-on de chomage apres une alternance de 2 ans ?"
   - "Faut-il attendre la fin du contrat pour s'inscrire a Pole Emploi ?"
   - "Peut-on cumuler ARE et formation apres une alternance ?"
CTA : / + /chomage-alternant-apprenti + /delai-carence-chomage
Lien a ajouter : chomage-alternant-apprenti/page.tsx -> lien vers /fin-de-cdd-alternant

---

## TÂCHE 8 — /rupture-conventionnelle-senior
Fichier : src/app/rupture-conventionnelle-senior/page.tsx
Meta title : "Rupture conventionnelle senior 2025 : ARE et retraite apres 55 ans"
Meta description : "Senior en rupture conventionnelle apres 55 ans ? Droits ARE allonges, cumul retraite et impact pension 2025. Exemples chiffres."
H1 : "Rupture conventionnelle senior : ARE, retraite et droits apres 55 ans"
Sections :
1. Introduction : specificite senior (55 ans+) en RC — droits allonges, proximite retraite,
   arbitrage RC vs maintien poste
2. Conditions ARE senior : memes regles generales + duree allongee
   - 53-54 ans : duree max 30 mois
   - 55 ans et plus : duree max 36 mois (ARE_PARAMS.dureeMaxSenior si existant, sinon ajouter)
3. Calcul SJR senior : exemple 3 500 euros brut/mois, 20 ans anciennete
4. Franchise RC senior :
   - Indemnite legale : 1/4 x salaire x annees (jusqu'a 10 ans) + 1/3 au-dela
   - Calcul indemnite pour 20 ans anciennete, 3 500 euros
   - Franchise sur part supra-legale, plafond franchiseMaxRC (150j)
5. Degressivite : s'applique si SJR > seuil — verifier si senior exonere (non en 2025)
6. Impact sur la retraite :
   - Trimestres valides pendant ARE (1 trimestre / 50j indemnises)
   - Calcul pension : periodes ARE comptent pour la duree mais pas pour le salaire de reference
   - Tableau : impact selon duree ARE (12 / 24 / 36 mois) sur trimestres
7. Arbitrage RC a 57 ans vs maintien jusqu'a 62 ans :
   - Scenario A : RC a 57 + ARE 36 mois + retraite a 62 ans
   - Scenario B : maintien poste jusqu'a 62 ans
   - Comparaison revenus nets sur 5 ans (calcul illustratif, non contractuel)
8. Cumul ARE + petits revenus activite reduite senior
9. Tableau comparatif senior vs non-senior (duree ARE, degressivite, trimestres)
10. FAQ 3 questions JSON-LD :
    - "Un senior de 57 ans a-t-il plus de chomage qu'un jeune actif ?"
    - "Les periodes de chomage sont-elles comptees pour la retraite ?"
    - "Vaut-il mieux faire une rupture conventionnelle a 57 ans ou attendre ?"
CTA : / + /chomage-seniors + /degressivite-chomage
Lien a ajouter : rupture-conventionnelle/page.tsx -> bandeau "Vous avez 55 ans et plus ?"
Lien a ajouter : chomage-seniors/page.tsx -> lien vers /rupture-conventionnelle-senior

---

## TÂCHE 9 — /licenciement-economique-senior
Fichier : src/app/licenciement-economique-senior/page.tsx
Meta title : "Licenciement economique senior 2025 : ARE 36 mois et droits"
Meta description : "Senior licencie pour motif economique apres 55 ans ? ARE jusqu'a 36 mois, conge de reclassement et impact retraite 2025."
H1 : "Licenciement economique senior : ARE 36 mois et droits apres 55 ans"
Sections :
1. Introduction : double specificite — duree ARE allongee + protections PSE renforcees seniors
2. Conditions ARE et duree allongee (55 ans+ : 36 mois max)
3. Calcul SJR : exemple 3 200 euros brut/mois, 18 ans anciennete
4. Indemnite legale licenciement eco senior :
   - Calcul tranche 1/4 + 1/3 pour 18 ans
   - Plafond franchise 75j (franchiseMaxLicenciementEco)
5. Conge de reclassement senior : duree jusqu'a 12 mois, specificites seniors dans PSE
6. Protections seniors dans le PSE :
   - Criteres ordre licenciements : anciennete protege les seniors
   - Conge de reclassement prioritaire
   - Cellule de reclassement dediee
7. Chronologie complete : fin contrat -> conge reclassement -> carence -> ARE 36 mois
8. Impact retraite : trimestres ARE, scenario retraite a 62 ans
9. Comparatif licenciement eco senior vs RC senior (tableau 6 criteres)
10. FAQ 3 questions JSON-LD :
    - "Un senior licencie economiquement a-t-il droit a 36 mois de chomage ?"
    - "Le conge de reclassement est-il obligatoire pour un senior ?"
    - "Comment le licenciement economique affecte-t-il la retraite d'un senior ?"
CTA : / + /chomage-seniors + /licenciement-economique-cadre
Lien a ajouter : licenciement-economique/page.tsx -> bandeau "Vous avez 55 ans et plus ?"
Lien a ajouter : chomage-seniors/page.tsx -> lien vers /licenciement-economique-senior

---

## TÂCHE 10 — /chomage-rqth (hub)
Fichier : src/app/chomage-rqth/page.tsx
Meta title : "Chomage RQTH 2025 : droits allonges et specificites travailleur handicape"
Meta description : "Travailleur handicape (RQTH) au chomage ? Duree ARE allongee, aides specifiques et calcul 2025. Guide complet avec exemples chiffres."
H1 : "Chomage RQTH : droits allonges et specificites 2025"
Sections :
1. Introduction : RQTH = Reconnaissance Qualite Travailleur Handicape — impact sur ARE
2. Duree ARE allongee RQTH :
   - Droit commun : max 24 mois (moins de 53 ans)
   - RQTH : +25% sur la duree calculee (verifier dans ARE_PARAMS, ajouter si absent)
   - Plafond : 36 mois pour les moins de 53 ans avec RQTH (a verifier et commenter)
3. Conditions acces ARE : identiques au droit commun (130j / 910h)
4. Calcul SJR et AJ : identiques, depuis ARE_PARAMS
   Exemple : travailleur RQTH, 2 200 euros brut/mois, 4 ans anciennete
5. Aides complementaires RQTH au chomage :
   - AAH (Allocation Adulte Handicape) : conditions de cumul avec ARE
   - AGEFIPH : aides a la reprise d'emploi
   - Cap Emploi : accompagnement dedie
6. Maintien RQTH pendant chomage : demarches de renouvellement
7. Rupture conventionnelle RQTH : specificites (pas de differences sur les droits ARE)
8. Licenciement pour inaptitude RQTH : cas frequent, droits specifiques
9. Tableau comparatif RQTH vs droit commun (duree, aides, accompagnement)
10. FAQ 3 questions JSON-LD :
    - "Un travailleur RQTH touche-t-il le chomage plus longtemps ?"
    - "Peut-on cumuler ARE et AAH ?"
    - "La RQTH doit-elle etre mentionnee a Pole Emploi ?"
CTA : / + /fin-de-cdd-rqth (page a venir)
Lien a ajouter : duree-indemnisation/page.tsx -> mention droits allonges RQTH

---

## TÂCHE 11 — /fin-de-cdd-rqth
Fichier : src/app/fin-de-cdd-rqth/page.tsx
Meta title : "Fin CDD RQTH chomage 2025 : duree allongee et droits"
Meta description : "Travailleur handicape (RQTH) en fin de CDD ? Calcul ARE, duree allongee et aides 2025. Exemples chiffres."
H1 : "Fin de CDD RQTH : ARE, duree allongee et droits 2025"
Sections :
1. Introduction : fin de CDD la situation la plus frequente pour les travailleurs RQTH
2. Conditions ARE : identiques droit commun
3. SJR et calcul ARE : depuis ARE_PARAMS, exemple 1 900 euros brut/mois, CDD 12 mois
4. Duree allongee RQTH : calcul comparatif avec/sans RQTH pour le meme profil
5. Delai de carence : carence CP uniquement (fin de CDD)
6. Demarches specifiques RQTH a Pole Emploi : mention handicap, accompagnement dedie
7. Aides au retour a l'emploi RQTH : AGEFIPH, Cap Emploi
8. Cas : CDD non renouvelee pour motif lie au handicap — recours possibles
9. Tableau : duree indemnisation CDD 6 mois / 12 mois / 18 mois avec et sans RQTH
10. FAQ 3 questions JSON-LD :
    - "Un CDD RQTH donne-t-il droit a plus de chomage ?"
    - "Faut-il declarer sa RQTH a Pole Emploi ?"
    - "Peut-on etre licencie a cause de sa RQTH ?"
CTA : / + /chomage-rqth + /fin-de-cdd
Lien a ajouter : chomage-rqth/page.tsx -> lien vers /fin-de-cdd-rqth

---

## TÂCHE 12 — /chomage-apres-conge-maternite
Fichier : src/app/chomage-apres-conge-maternite/page.tsx
Meta title : "Chomage apres conge maternite 2025 : calcul ARE et droits"
Meta description : "Au chomage apres un conge maternite ? Calcul SJR neutralise, droits ARE et demarches 2025. Guide complet avec exemples chiffres."
H1 : "Chomage apres conge maternite : ARE, SJR neutralise et droits 2025"
Sections :
1. Introduction : situation specifique — conge maternite puis rupture contrat ou non-renouvellement
2. Neutralisation de la periode de conge dans le calcul SJR :
   - Principe : periode de suspension (maladie, maternite) exclue du calcul
   - SJR base sur les periodes travaillees effectives uniquement
   - Exemple : CDI 3 ans, conge mat 4 mois, salaire 2 800 euros/mois
     -> SJR calcule sur 32 mois travailles, pas 36
3. Impact sur la duree de reference :
   - La periode de 24 mois est allongee de la duree du conge
   - Exemple : conge mat 4 mois -> fenetre de reference = 28 mois au lieu de 24
4. Motifs de rupture apres maternite :
   - Licenciement pendant ou apres conge : protections L.1225-4
   - Rupture conventionnelle apres conge : possible, delai de carence standard
   - Fin de CDD non renouvelee : motif valable ARE
   - Non-renouvellement pendant protection : illicite — recours possible
5. Calcul complet exemple :
   - CDI, 2 800 euros brut/mois, 5 ans anciennete, conge mat 16 semaines
   - SJR neutralise, AJ depuis ARE_PARAMS, duree indemnisation
6. Cumul ARE + AJPP (Allocation Journaliere Presence Parentale) : regles
7. Reprise emploi pendant ARE apres maternite : regles cumul
8. Tableau : impact duree conge maternite sur SJR (8 / 16 / 26 semaines)
9. FAQ 3 questions JSON-LD :
   - "Le conge maternite est-il inclus dans le calcul du chomage ?"
   - "Peut-on etre licenciee apres un conge maternite ?"
   - "Comment calculer son ARE si on a eu un conge maternite ?"
CTA : / + /licenciement-economique + /rupture-conventionnelle-conge-parental (page a venir)

---

## TÂCHE 13 — /rupture-conventionnelle-conge-parental
Fichier : src/app/rupture-conventionnelle-conge-parental/page.tsx
Meta title : "Rupture conventionnelle conge parental 2025 : ARE et droits"
Meta description : "Rupture conventionnelle pendant ou apres un conge parental ? Calcul ARE, SJR neutralise et droits 2025. Exemples chiffres."
H1 : "Rupture conventionnelle conge parental : ARE, SJR neutralise et droits 2025"
Sections :
1. Introduction : rupture conventionnelle pendant/apres conge parental — cas frequent,
   souvent mal compris
2. Neutralisation conge parental dans le SJR :
   - Meme principe que maternite : periodes de suspension exclues
   - Conge parental a temps plein ou partiel : regles differentes
   - Exemple : CDI 4 ans, conge parental 12 mois a 0%, salaire 2 500 euros/mois
3. Franchise RC avec neutralisation :
   - Indemnite legale calculee sur anciennete complete (conge parental compte)
   - Franchise sur part supra-legale / (90 x SJR neutralise)
   - Plafond franchiseMaxRC (150j)
4. Chronologie complete : fin conge parental -> RC -> carence CP -> franchise -> ARE
5. Calcul exemple complet :
   - 2 500 euros/mois, 4 ans anciennete, conge parental 12 mois, indemnite RC 10 000 euros
   - SJR neutralise, franchise, date 1er versement
6. Conge parental a temps partiel :
   - SJR base sur salaire partiel pendant la periode
   - Impact sur montant ARE
7. Protection pendant conge parental : rupture conventionnelle possible (pas de protection
   absolue contrairement a la maternite)
8. Complement PAJE et ARE : conditions de cumul
9. Tableau : impact duree conge parental sur SJR (6 / 12 / 24 mois)
10. FAQ 3 questions JSON-LD :
    - "Peut-on faire une rupture conventionnelle pendant un conge parental ?"
    - "Le conge parental est-il pris en compte dans le calcul du chomage ?"
    - "Comment est calcule l'ARE apres un conge parental d'un an ?"
CTA : / + /rupture-conventionnelle + /chomage-apres-conge-maternite
Lien a ajouter : rupture-conventionnelle/page.tsx -> mention neutralisation conge parental
Lien a ajouter : chomage-apres-conge-maternite/page.tsx -> lien vers cette page

---

## TÂCHE 14 — /chomage-fonctionnaire-reconversion (hub)
Fichier : src/app/chomage-fonctionnaire-reconversion/page.tsx
Meta title : "Chomage fonctionnaire demission reconversion 2025 : ARE et droits"
Meta description : "Fonctionnaire qui demissionne pour une reconversion ? Conditions ARE, CPF et droits 2025. Guide complet avec exemples chiffres."
H1 : "Chomage fonctionnaire en reconversion : ARE, demission et droits 2025"
Sections :
1. Introduction : specificite fonctionnaire — statut protege mais ARE possible sous conditions
2. Fonctionnaire et ARE :
   - Fonctionnaire titulaire : pas d'ARE (pris en charge par l'employeur public)
   - Fonctionnaire contractuel : ARE de droit commun si rupture involontaire
   - Demission fonctionnaire titulaire : ARE uniquement si reconversion (reforme 2019)
3. Demission fonctionnaire pour reconversion (loi 2019) :
   - Conditions : projet de reconversion professionnelle ou creation d'entreprise
   - Dossier a deposer avant la demission
   - Delai instruction : 2 a 4 mois
   - ARE versee si projet valide
4. CPF + ARE fonctionnaire :
   - Cumul possible pendant formation CPF
   - Droits CPF fonctionnaire (identiques secteur prive depuis 2020)
5. Calcul ARE fonctionnaire contractuel :
   - SJR base sur traitement indiciaire brut + supplements (SFT, etc.)
   - Exemple : fonctionnaire contractuel, indice 450, traitement 2 400 euros brut/mois
   - Calcul AJ depuis ARE_PARAMS
6. Fonctionnaire contractuel fin de CDD :
   - Memes regles qu'un CDD prive (130j / 910h)
7. Tableau : fonctionnaire titulaire vs contractuel vs demission reconversion
8. Demarches specifiques : dossier reconversion, validation projet, inscription PE
9. FAQ 3 questions JSON-LD :
   - "Un fonctionnaire peut-il toucher le chomage apres une demission ?"
   - "Comment un fonctionnaire peut-il beneficier de l'ARE pour une reconversion ?"
   - "Un fonctionnaire contractuel a-t-il les memes droits ARE qu'un salarie prive ?"
CTA : / + /demission-reconversion-cpf + /demission-legitime
Lien a ajouter : demission-reconversion-cpf/page.tsx -> mention fonctionnaires

---

## FIN DES TÂCHES SESSION 6
