# Session 9 — Optimisation CTR title tags + meta descriptions

## RÈGLES GLOBALES
- Branche main, push après chaque tâche
- Modifier uniquement les balises title, metadata title et metadata description
- Ne pas toucher au contenu des pages
- Apostrophes françaises → guillemets doubles ou backticks dans JSX
- Respecter les limites : title ≤ 60 caractères, meta description ≤ 155 caractères

---

## TÂCHE 1 — Hubs profils (6 pages)

Pour chaque page listée ci-dessous, remplace le title et la meta description
par les valeurs exactes indiquées.

### /chomage-cadre
Title : Chômage cadre 2025 : combien touchez-vous vraiment ?
Meta : Cadre licencié ou en RC ? Calculez votre ARE exacte : SJR, dégressivité à 7 mois, plafond. Exemple chiffré pour 5 000 €/mois.

### /chomage-interimaire
Title : Chômage intérimaire 2025 : calcul ARE après mission
Meta : Fin de mission d'intérim ? Votre ARE calculée sur vos missions effectives + primes de précarité. Exemple complet avec montants.

### /chomage-alternant-apprenti
Title : Chômage alternant 2025 : avez-vous droit à l'ARE ?
Meta : Fin de contrat d'alternance ou d'apprentissage ? Conditions, montant ARE et durée expliqués. Droits souvent ignorés — vérifiez les vôtres.

### /chomage-rqth
Title : Chômage RQTH 2025 : +25 % de durée, comment en profiter
Meta : Travailleur handicapé au chômage ? Durée ARE allongée, cumul AAH et aides AGEFIPH expliqués avec exemples chiffrés 2025.

### /chomage-fonctionnaire-reconversion
Title : Fonctionnaire démissionnaire : l'ARE est possible en 2025
Meta : Fonctionnaire qui démissionne pour une reconversion ? Conditions ARE, dossier à déposer et droits CPF expliqués étape par étape.

### /chomage-seniors (page existante — mettre à jour aussi)
Title : Chômage senior 2025 : jusqu'à 36 mois d'ARE après 55 ans
Meta : 55 ans et plus au chômage ? Durée ARE allongée, impact retraite et arbitrage RC expliqués. Calculez vos droits avec exemples.

---

## TÂCHE 2 — Pages combo cadre (3 pages)

### /rupture-conventionnelle-cadre
Title : RC cadre 2025 : ARE, franchise et délai de carence réels
Meta : Rupture conventionnelle en tant que cadre ? Calcul franchise sur indemnité supra-légale, délai de carence exact. Exemple pour 5 000 €/mois.

### /licenciement-economique-cadre
Title : Licenciement éco cadre 2025 : ARE, PSE et congé reclassement
Meta : Cadre licencié pour motif économique ? Indemnité légale, congé de reclassement et chronologie complète jusqu'au 1er versement ARE.

### /licenciement-faute-cadre (si la page existe, sinon ignorer)
Title : Licenciement faute grave cadre 2025 : avez-vous droit à l'ARE ?
Meta : Cadre licencié pour faute grave ou lourde ? Conditions ARE, perte indemnités et recours expliqués. Ce que peu de cadres savent.

---

## TÂCHE 3 — Pages combo senior (2 pages)

### /rupture-conventionnelle-senior
Title : RC senior 55 ans 2025 : ARE 36 mois et impact retraite
Meta : Rupture conventionnelle après 55 ans ? ARE jusqu'à 36 mois, trimestres retraite et arbitrage RC vs maintien poste. Simulez votre cas.

### /licenciement-economique-senior
Title : Licenciement éco senior 2025 : 36 mois d'ARE et PSE
Meta : Senior licencié pour motif économique ? Droits ARE allongés, congé de reclassement et protections PSE renforcées expliqués avec exemples.

---

## TÂCHE 4 — Pages combo intérimaire et alternant (4 pages)

### /fin-de-cdd-interimaire
Title : Fin de mission intérim 2025 : ARE dès la fin du contrat
Meta : Fin de mission d'intérim ? ARE ouverte sans délai de carence motif. SJR calculé sur missions + primes. Montants et durée expliqués.

### /fin-de-cdd-alternant
Title : Fin d'alternance 2025 : vos droits ARE en détail
Meta : Contrat d'alternance terminé ? Montant ARE, durée selon ancienneté et demarches Pôle Emploi. Droits souvent ignorés des alternants.

---

## TÂCHE 5 — Pages spécifiques (4 pages)

### /chomage-apres-conge-maternite
Title : Chômage après congé maternité 2025 : SJR neutralisé
Meta : Au chômage après un congé maternité ? Votre SJR est calculé sans la période de congé — souvent plus favorable. Exemple chiffré.

### /rupture-conventionnelle-conge-parental
Title : RC pendant congé parental 2025 : ARE et SJR neutralisé
Meta : Rupture conventionnelle pendant ou après un congé parental ? SJR neutralisé, franchise recalculée. Ce que votre employeur ne vous dit pas.

### /chomage-rqth (déjà traité en tâche 1 — ignorer)

### /fin-de-cdd-rqth
Title : Fin de CDD RQTH 2025 : durée ARE allongée automatiquement
Meta : CDD terminé avec une RQTH ? Durée ARE allongée de 25 %, aides AGEFIPH et démarches Pôle Emploi expliquées. Vérifiez vos droits.

---

## TÂCHE 6 — Pages situations existantes à fort trafic potentiel

Mettre à jour aussi ces pages existantes pour cohérence avec la nouvelle ligne éditoriale :

### /rupture-conventionnelle
Title : Rupture conventionnelle 2025 : calcul ARE et délai de carence
Meta : Combien touchez-vous en ARE après une rupture conventionnelle ? Calcul SJR, franchise et 1er versement. Simulateur + exemple chiffré.

### /licenciement-economique
Title : Licenciement économique 2025 : ARE, indemnités et PSE
Meta : Licencié pour motif économique ? Calcul indemnité légale, ARE et congé de reclassement expliqués. Exemple chiffré selon ancienneté.

### /fin-de-cdd
Title : Fin de CDD 2025 : ARE, montant et délai de carence
Meta : CDD terminé ? Calculez votre ARE, durée d'indemnisation et carence en 2 minutes. Exemple chiffré inclus.

### /licenciement-faute
Title : Licenciement faute grave 2025 : perdez-vous vraiment l'ARE ?
Meta : Licencié pour faute grave ou lourde ? Conditions ARE, perte des indemnités et recours aux prud'hommes expliqués clairement.

---

## RÈGLE FINALE
Après toutes les modifications :
git add . && git commit -m "feat: optimisation CTR title+meta session 9" && git push origin main

Un seul commit pour toutes les tâches 1 à 6.

---

## FIN SESSION 9

Étape 2 — Prompt maître
Lis le fichier SESSION9_TASKS.md à la racine du projet.

Exécute les tâches 1 à 6 dans l'ordre.
Pour chaque page : modifie uniquement le title et la meta description,
ne touche pas au contenu.
Un seul commit final comme indiqué.
Ne demande pas de confirmation entre les tâches.
