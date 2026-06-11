import { ARE_PARAMS } from './are-parametres'
import type { InputsCalculateurARE, ResultatARE, FormuleRetenue, ErreurCalcul } from '@/types/are'

/**
 * Arrondi à 2 décimales (comportement France Travail)
 */
function arrondir2(n: number): number {
  return Math.round(n * 100) / 100
}

/**
 * Calcule le Salaire Journalier de Référence (SJR)
 * Simplification : emploi continu → SJR = salaire_mensuel_cap / 30
 * Pour un calcul exact, France Travail utilise les attestations employeur
 */
export function calculerSJR(inputs: InputsCalculateurARE): number {
  const { salaireBrutMensuel, moisTravailles, age } = inputs
  // Cap du salaire mensuel à l'assiette AC
  const salaireMensuelCap = Math.min(salaireBrutMensuel, ARE_PARAMS.plafondSalaireRefMensuel)
  // Période de référence selon l'âge
  const moisPeriode = Math.min(
    moisTravailles,
    age >= 55 ? ARE_PARAMS.moisRefPlus55ans : ARE_PARAMS.moisRefMoins55ans
  )
  const salaireTotal = salaireMensuelCap * moisPeriode
  const joursCalendaires = moisPeriode * ARE_PARAMS.joursParMoisSJR
  return arrondir2(salaireTotal / joursCalendaires)
}

/**
 * Calcule l'allocation journalière brute à partir du SJR
 * AJ = MAX(formule1, formule2, plancher), dans la limite de 75% du SJR
 * Le plancher prévaut sur le plafond si plancher > 75% SJR
 */
export function calculerAllocationJournaliere(sjr: number): {
  allocation: number
  formule: FormuleRetenue
} {
  const f1 = arrondir2(ARE_PARAMS.tauxFormule1 * sjr + ARE_PARAMS.partieFix)
  const f2 = arrondir2(ARE_PARAMS.tauxFormule2 * sjr)
  const plafond75 = arrondir2(ARE_PARAMS.plafondTauxSJR * sjr)

  // Choisir la formule la plus favorable
  let aj = Math.max(f1, f2)
  let formule: FormuleRetenue = f1 >= f2 ? 'formule1' : 'formule2'

  // Appliquer le plafond 75% SJR (avant le plancher)
  aj = Math.min(aj, plafond75)

  // Appliquer le plancher absolu (prévaut sur le plafond)
  if (aj < ARE_PARAMS.allocationMinimale) {
    aj = ARE_PARAMS.allocationMinimale
    formule = 'plancher'
  }

  return { allocation: arrondir2(aj), formule }
}

/**
 * Calcule la dégressivité applicable au 7e mois
 * Conditions : âge < 55 ans ET AJ > 92,57 €/jour
 */
export function calculerDegressivite(aj: number, age: number): {
  applicable: boolean
  ajApres?: number
} {
  if (age >= ARE_PARAMS.ageLimiteDegressivite) {
    return { applicable: false }
  }
  if (aj <= ARE_PARAMS.seuilDegressiviteAJ) {
    return { applicable: false }
  }
  const ajReduite = aj * ARE_PARAMS.coeffDegressivite
  const ajApres = arrondir2(Math.max(ajReduite, ARE_PARAMS.seuilDegressiviteAJ))
  return { applicable: true, ajApres }
}

/**
 * Calcule la durée d'indemnisation en jours
 * Règle : 1 jour cotisé = 1 jour indemnisé, dans les bornes réglementaires
 */
export function calculerDureeIndemnisation(moisTravailles: number, age: number): number {
  const joursCotises = moisTravailles * ARE_PARAMS.joursParMoisSJR
  const joursMax = age >= 50
    ? ARE_PARAMS.dureeMax50ansEtPlusJours
    : ARE_PARAMS.dureeMaxMoins50ansJours
  return Math.min(Math.max(joursCotises, ARE_PARAMS.dureeMinJours), joursMax)
}

/**
 * Validation des inputs
 */
export function validerInputs(inputs: InputsCalculateurARE): ErreurCalcul | null {
  const { salaireBrutMensuel, moisTravailles, age } = inputs
  if (salaireBrutMensuel <= 0) {
    return { code: 'SALAIRE_INVALIDE', message: 'Le salaire brut mensuel doit être positif' }
  }
  if (moisTravailles < 6) {
    return { code: 'AFFILIATION_INSUFFISANTE', message: 'Durée minimale d\'affiliation : 6 mois' }
  }
  if (moisTravailles > 36) {
    return { code: 'DUREE_EXCESSIVE', message: 'La durée maximale prise en compte est 36 mois' }
  }
  if (age < 16 || age > 80) {
    return { code: 'AGE_INVALIDE', message: 'L\'âge doit être compris entre 16 et 80 ans' }
  }
  return null
}

/**
 * Fonction principale : calcul complet ARE
 */
export function calculerARE(inputs: InputsCalculateurARE): ResultatARE | ErreurCalcul {
  const erreur = validerInputs(inputs)
  if (erreur) return erreur

  const { age } = inputs
  const avertissements: string[] = []

  // 1. SJR
  const sjr = calculerSJR(inputs)

  // 2. Allocation journalière
  const { allocation: aj, formule } = calculerAllocationJournaliere(sjr)

  // 3. Dégressivité
  const degressiviteResult = calculerDegressivite(aj, age)
  const degressivite = degressiviteResult.applicable && degressiviteResult.ajApres !== undefined
    ? {
        applicable: true,
        ajJournaliereApres: degressiviteResult.ajApres,
        ajMensuelleApres: arrondir2(degressiviteResult.ajApres * ARE_PARAMS.joursParMois),
      }
    : { applicable: false }

  // 4. Durée d'indemnisation
  const dureeJours = calculerDureeIndemnisation(inputs.moisTravailles, age)

  // 5. Avertissements contextuels
  if (inputs.salaireBrutMensuel > ARE_PARAMS.plafondSalaireRefMensuel) {
    avertissements.push(
      `Salaire plafonné à ${ARE_PARAMS.plafondSalaireRefMensuel}€/mois pour le calcul`
    )
  }
  if (degressivite.applicable) {
    avertissements.push(
      `Dégressivité de ${Math.round((1 - ARE_PARAMS.coeffDegressivite) * 100)}% applicable à partir du ${ARE_PARAMS.joursAvantDegressivite + 1}e jour indemnisé`
    )
  }
  if (inputs.moisTravailles > (age >= 55 ? ARE_PARAMS.moisRefPlus55ans : ARE_PARAMS.moisRefMoins55ans)) {
    avertissements.push(
      `Seuls les ${age >= 55 ? ARE_PARAMS.moisRefPlus55ans : ARE_PARAMS.moisRefMoins55ans} derniers mois sont pris en compte`
    )
  }

  return {
    sjr,
    allocationJournaliereBrute: aj,
    allocationMensuelleBrute: arrondir2(aj * ARE_PARAMS.joursParMois),
    dureeIndemnisationJours: dureeJours,
    dureeIndemnisationMois: Math.round(dureeJours / 30),
    formuleRetenue: formule,
    degressivite,
    avertissements,
  }
}
