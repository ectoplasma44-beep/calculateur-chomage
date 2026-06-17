# AUDIT — Pages sans CTR optimization identifiable

**Date :** 2026-06-17  
**Méthode :** Analyse des commits "feat:" depuis session 11 (après commit `3143407 feat: sitemap session 11`). Comparaison title/meta avec le pattern session 9 (question/bénéfice + année courante).

---

## Pages créées depuis la session 11 (11 pages)

Commits retenus (du plus ancien au plus récent) :
1. `dbb3494` — licenciement-faute-cadre
2. `6a7ddd7` — licenciement-faute-senior
3. `07848b4` — abandon-de-poste-senior
4. `b0016ff` — demission-legitime-senior
5. `f653872` — chomage-cadre-5000-euros
6. `5cc7136` — chomage-cadre-4000-euros
7. `c211d87` — chomage-interimaire-2000-euros
8. `6d4c1d6` — rupture-conventionnelle-interimaire
9. `824502f` — licenciement-interimaire
10. `b938c28` — chomage-cadre-3000-euros
11. `9209ce4` — chomage-interimaire-1500-euros

---

## Problème systémique : année "2025" dans les titles (11/11 pages)

L'ensemble des 11 pages créées depuis la session 11 affiche **2025** dans leur title, alors que la date actuelle est **2026**. Les pages optimisées en session 9 avaient déjà été mises à jour en **2026**.

Ce décalage d'année est visible dans les SERPs et peut dégrader le CTR, les utilisateurs percevant les résultats comme outdatés.

| Page | Title actuel | Problème |
|---|---|---|
| /licenciement-faute-cadre | "Licenciement faute grave cadre 2025 : avez-vous droit a l'ARE ?" | Année 2025 |
| /licenciement-faute-senior | "Licenciement faute grave senior 2025 : ARE 36 mois et recours" | Année 2025 |
| /abandon-de-poste-senior | "Abandon de poste senior 2025 : ARE possible après 55 ans ?" | Année 2025 |
| /demission-legitime-senior | "Démission légitime senior 2025 : ARE après 55 ans possible" | Année 2025 |
| /chomage-cadre-5000-euros | "Chômage cadre 5 000 €/mois 2025 : combien touchez-vous ?" | Année 2025 |
| /chomage-cadre-4000-euros | "Chômage cadre 4 000 €/mois 2025 : montant ARE exact" | Année 2025 |
| /chomage-cadre-3000-euros | "Chômage cadre 3 000 €/mois 2025 : montant ARE exact" | Année 2025 |
| /chomage-interimaire-2000-euros | "Chômage intérimaire 2 000 €/mois 2025 : ARE calculée" | Année 2025 |
| /chomage-interimaire-1500-euros | "Chômage intérimaire 1 500 €/mois 2025 : ARE calculée" | Année 2025 |
| /rupture-conventionnelle-interimaire | "RC intérimaire 2025 : possible ? Conditions et ARE" | Année 2025 + voir ci-dessous |
| /licenciement-interimaire | "Licenciement intérimaire 2025 : CDI-I, motifs et ARE" | Année 2025 + voir ci-dessous |

---

## Problèmes CTR additionnels (indépendants de l'année)

### `/rupture-conventionnelle-interimaire`
- **Title actuel :** "RC intérimaire 2025 : possible ? Conditions et ARE"
- **Problème :** "RC" est une abréviation technique. Les utilisateurs cherchent "rupture conventionnelle intérimaire" (volume de recherche supérieur). Title peu accrocheur comparé au pattern session 9.
- **Suggestion :** "Rupture conventionnelle intérimaire 2026 : c'est possible ? Conditions et ARE"

### `/licenciement-interimaire`
- **Title actuel :** "Licenciement intérimaire 2025 : CDI-I, motifs et ARE"
- **Problème :** "CDI-I" est du jargon RH. L'utilisateur moyen cherche "licenciement intérimaire" et ne sait pas ce qu'est un CDI-I. Ce terme réducteur réduit la compréhension et le CTR.
- **Suggestion :** "Licenciement intérimaire 2026 : avez-vous droit à l'ARE ?"

---

## Pages avec pattern CTR satisfaisant (à conserver)

Ces pages depuis session 11 suivent déjà le pattern question/bénéfice de la session 9 — seule la mise à jour de l'année est nécessaire :

| Page | Point fort |
|---|---|
| /licenciement-faute-cadre | Question directe "avez-vous droit a l'ARE ?" |
| /abandon-de-poste-senior | Question "ARE possible après 55 ans ?" |
| /chomage-cadre-5000-euros | Question "combien touchez-vous ?" |
| /demission-legitime-senior | Bénéfice "ARE après 55 ans possible" |
| /licenciement-faute-senior | Bénéfice "ARE 36 mois et recours" |

---

## Pages antérieures à session 9 également candidates (hors scope session 11 mais signalées)

Ces pages pré-session-9 semblent avoir échappé à l'optimisation CTR de la session 9 :

| Page | Title actuel | Problème |
|---|---|---|
| /chomage-apres-conge-maternite | "Chomage apres conge maternite 2025 : SJR neutralise" | Pas d'accents, 2025, pas de question/bénéfice fort |

---

## Priorité de correction suggérée

1. **Urgent (11 pages)** — Remplacer "2025" par "2026" dans les titles et meta descriptions
2. **Moyen terme (2 pages)** — Réécriture title de `/rupture-conventionnelle-interimaire` et `/licenciement-interimaire`
3. **Optionnel (1 page)** — `/chomage-apres-conge-maternite` (hors scope session 11)
