export interface InputsCalculateurARE {
  salaireBrutMensuel: number   // €/mois brut
  moisTravailles: number       // nombre de mois travaillés (6 à 36)
  age: number                  // âge au terme du contrat de travail
}

export type FormuleRetenue = 'formule1' | 'formule2' | 'plancher'

export interface ResultatARE {
  sjr: number                         // Salaire Journalier de Référence (€)
  allocationJournaliereBrute: number  // AJ brute avant dégressivité (€/jour)
  allocationMensuelleBrute: number    // AJ × 30 (€/mois)
  dureeIndemnisationJours: number     // durée en jours
  dureeIndemnisationMois: number      // durée arrondie en mois (indicatif)
  formuleRetenue: FormuleRetenue
  degressivite: {
    applicable: boolean
    ajJournaliereApres?: number      // AJ après réduction (€/jour)
    ajMensuelleApres?: number        // AJ mensuelle après réduction (€/mois)
  }
  avertissements: string[]
}

export interface ErreurCalcul {
  code: string
  message: string
}
