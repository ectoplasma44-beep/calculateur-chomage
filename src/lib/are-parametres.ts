/**
 * PARAMÈTRES ARE — SOURCE UNIQUE DE VÉRITÉ
 * Source officielle : Unédic "Paramètres utiles Janvier 2026"
 * https://www.unedic.org/storage/uploads/2026/01/27/unedic_parametres_utiles_janvier2026_vf_uid_6978f8f8f058c.pdf
 * Valeurs en vigueur depuis : 01/07/2025 (revalorisation +0,5%)
 * Prochaine revalorisation : 01/07/2026 — surveiller https://www.unedic.org/actualites
 * ⚠️ Négociations assurance chômage en cours (contrats courts, ruptures conventionnelles)
 */

export const ARE_PARAMS = {
  // ── Métadonnées réglementaires ──────────────────────────────────────
  dateValeur: '2025-07-01',
  prochaineRevalo: '2026-07-01',
  hypotheseRevalo2026: 0.006, // +0,6% — hypothèse Unédic, NON officiel à ce jour

  // ── Formule de calcul de l'allocation journalière ───────────────────
  // AJ = MAX(formule1, formule2, allocationMinimale)
  // Formule 1 : tauxFormule1 * SJR + partieFix
  // Formule 2 : tauxFormule2 * SJR
  tauxFormule1: 0.404,
  partieFix: 13.18,          // €/jour — depuis 01/07/2025
  tauxFormule2: 0.57,
  allocationMinimale: 32.13, // €/jour — plancher absolu — depuis 01/07/2025
  plafondTauxSJR: 0.75,      // AJ ≤ 75% du SJR (sauf si plancher > 75% SJR)

  // ── Dégressivité ────────────────────────────────────────────────────
  // S'applique si : AJ > seuilDegressiviteAJ ET âge < ageLimiteDegressivite
  // Équivalent SJR > ~162,40 €/j soit ~4 939 €/mois brut
  seuilDegressiviteAJ: 92.57,    // €/jour — seuil déclencheur ET plancher post-réduction
  coeffDegressivite: 0.70,       // coefficient appliqué (= réduction de 30%)
  joursAvantDegressivite: 182,   // après 182 jours indemnisés effectifs (183e jour)
  ageLimiteDegressivite: 55,     // < 55 ans à la date de fin de contrat (depuis 01/04/2025)
  // Note : était < 57 ans avant le 01/04/2025

  // ── Mensualisation ──────────────────────────────────────────────────
  joursParMois: 30, // base fixe depuis 01/04/2025, quel que soit le mois

  // ── Période de référence ────────────────────────────────────────────
  moisRefMoins55ans: 24, // 24 derniers mois
  moisRefPlus55ans: 36,  // 36 derniers mois (55 ans et plus)

  // ── Calcul du SJR ───────────────────────────────────────────────────
  // SJR = salaire_référence / nombre_jours_calendaires_période
  // Jours non travaillés : max 70% des jours travaillés (décret 2021)
  tauxMaxJoursNonTravailles: 0.70,
  // Simplification calculateur : pour emploi continu → SJR ≈ salaire_mensuel / 30
  joursParMoisSJR: 30,

  // ── Plafond assiette ────────────────────────────────────────────────
  plafondSalaireRefMensuel: 16020, // €/mois — assiette cotisations AC 2026

  // ── Durée d'indemnisation ───────────────────────────────────────────
  // Règle : 1 jour cotisé = 1 jour indemnisé
  // ⚠️ Valeurs Unédic doc jan 2026 — à vérifier sur France Travail (réformes en cours)
  dureeMinJours: 182,               // 6 mois minimum d'affiliation requis
  dureeMaxMoins50ansJours: 365,    // 12 mois max (< 50 ans)
  dureeMax50ansEtPlusJours: 730,   // 24 mois max (50 ans et plus)
  dureeMax53a54ansJours: 900,      // 30 mois max (53 et 54 ans)
  dureeMax55ansEtPlusJours: 1080,  // 36 mois max (55 ans et plus)

  // ── RQTH — Reconnaissance Qualité Travailleur Handicapé ────────────
  // Durée allongée : +25% sur la durée calculée (R.5212-1 et suivants)
  // Plafond : 36 mois pour les moins de 53 ans avec RQTH
  tauxAllongementRQTH: 1.25, // multiplicateur durée ARE pour les bénéficiaires RQTH

  // ── ARE Formation (AREF) ────────────────────────────────────────────
  allocationMinimaAREF: 22.99, // €/jour — depuis 01/07/2025

  // ── Différé spécifique (franchise indemnités) — plafonds par motif ──
  // Source : Unédic — Règlement d'assurance chômage
  franchiseMaxRC: 150,                  // jours — rupture conventionnelle & autres motifs
  franchiseMaxLicenciementEco: 75,      // jours — licenciement économique (mesure favorable)

} as const

export type AreParamsType = typeof ARE_PARAMS
