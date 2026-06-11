import { ARE_PARAMS } from '@/lib/are-parametres'
import {
  calculerSJR,
  calculerAllocationJournaliere,
  calculerDegressivite,
  calculerDureeIndemnisation,
  validerInputs,
  calculerARE,
} from '@/lib/calcul-are'
import type { InputsCalculateurARE, ResultatARE, ErreurCalcul } from '@/types/are'

// ── Helpers de calcul attendu — dérivés exclusivement de ARE_PARAMS ──
const arrondir2 = (n: number): number => Math.round(n * 100) / 100

const formule1 = (sjr: number): number =>
  arrondir2(ARE_PARAMS.tauxFormule1 * sjr + ARE_PARAMS.partieFix)

const formule2 = (sjr: number): number =>
  arrondir2(ARE_PARAMS.tauxFormule2 * sjr)

const sjrAttendu = (salaireMensuel: number): number =>
  arrondir2(
    Math.min(salaireMensuel, ARE_PARAMS.plafondSalaireRefMensuel) /
      ARE_PARAMS.joursParMoisSJR
  )

const degressiviteAttendue = (aj: number): number =>
  arrondir2(Math.max(aj * ARE_PARAMS.coeffDegressivite, ARE_PARAMS.seuilDegressiviteAJ))

const inputs = (
  salaireBrutMensuel: number,
  moisTravailles: number,
  age: number
): InputsCalculateurARE => ({ salaireBrutMensuel, moisTravailles, age })

const estResultat = (r: ResultatARE | ErreurCalcul): r is ResultatARE => 'sjr' in r

// ════════════════════════════════════════════════════════════════════
// [A] calculerSJR — 12 tests
// ════════════════════════════════════════════════════════════════════
describe('calculerSJR', () => {
  it('salaire 2000€, 12 mois, âge 30 → 66.67', () => {
    expect(calculerSJR(inputs(2000, 12, 30))).toBe(sjrAttendu(2000))
    expect(calculerSJR(inputs(2000, 12, 30))).toBe(66.67)
  })

  it('salaire 2000€, 24 mois, âge 30 → identique à 12 mois (salaire constant)', () => {
    expect(calculerSJR(inputs(2000, 24, 30))).toBe(calculerSJR(inputs(2000, 12, 30)))
  })

  it('salaire 3000€, 24 mois, âge 40 → 100', () => {
    expect(calculerSJR(inputs(3000, 24, 40))).toBe(sjrAttendu(3000))
    expect(calculerSJR(inputs(3000, 24, 40))).toBe(100)
  })

  it('salaire 1700€, 6 mois, âge 25 → 56.67', () => {
    expect(calculerSJR(inputs(1700, 6, 25))).toBe(56.67)
  })

  it('salaire 1800€, 12 mois, âge 35 → 60', () => {
    expect(calculerSJR(inputs(1800, 12, 35))).toBe(60)
  })

  it('salaire 5000€, 36 mois, âge 60 → 166.67 (période 36 mois pour 55 ans et +)', () => {
    expect(calculerSJR(inputs(5000, 36, 60))).toBe(166.67)
  })

  it('salaire 5000€, 36 mois, âge 54 → 166.67 (période capée à 24 mois pour < 55 ans)', () => {
    expect(calculerSJR(inputs(5000, 36, 54))).toBe(166.67)
  })

  it('salaire 20000€, 24 mois, âge 40 → capé au plafond assiette', () => {
    const attendu = arrondir2(ARE_PARAMS.plafondSalaireRefMensuel / ARE_PARAMS.joursParMoisSJR)
    expect(calculerSJR(inputs(20000, 24, 40))).toBe(attendu)
    expect(calculerSJR(inputs(20000, 24, 40))).toBe(534)
  })

  it('salaire 1000€, 6 mois, âge 20 → 33.33', () => {
    expect(calculerSJR(inputs(1000, 6, 20))).toBe(33.33)
  })

  it('salaire 2500€, 18 mois, âge 45 → 83.33', () => {
    expect(calculerSJR(inputs(2500, 18, 45))).toBe(83.33)
  })

  it('salaire 4000€, 30 mois, âge 56 → 133.33 (30 mois < plafond 36 mois)', () => {
    expect(calculerSJR(inputs(4000, 30, 56))).toBe(133.33)
  })

  it('salaire 3500€, 24 mois, âge 55 → 116.67 (période 36 mois mais capée à 24 travaillés)', () => {
    expect(calculerSJR(inputs(3500, 24, 55))).toBe(116.67)
  })
})

// ════════════════════════════════════════════════════════════════════
// [B] calculerAllocationJournaliere — 20 tests
// ════════════════════════════════════════════════════════════════════
describe('calculerAllocationJournaliere', () => {
  it('SJR = 100 → formule2 retenue (57% SJR > 40,4% SJR + partie fixe)', () => {
    const { allocation, formule } = calculerAllocationJournaliere(100)
    expect(formule).toBe('formule2')
    expect(allocation).toBe(formule2(100))
    expect(allocation).toBe(57)
  })

  it('SJR = 66.67 → formule1 retenue', () => {
    const { allocation, formule } = calculerAllocationJournaliere(66.67)
    expect(formule).toBe('formule1')
    expect(allocation).toBe(formule1(66.67))
  })

  it('SJR = 60 → formule1 retenue', () => {
    const { allocation, formule } = calculerAllocationJournaliere(60)
    expect(formule).toBe('formule1')
    expect(allocation).toBe(formule1(60))
    expect(allocation).toBe(37.42)
  })

  it('SJR = 33.33 → plancher (formules sous le minimum)', () => {
    const { allocation, formule } = calculerAllocationJournaliere(33.33)
    expect(Math.max(formule1(33.33), formule2(33.33))).toBeLessThan(ARE_PARAMS.allocationMinimale)
    expect(formule).toBe('plancher')
    expect(allocation).toBe(ARE_PARAMS.allocationMinimale)
  })

  it('SJR = 56.67 → formule1 retenue', () => {
    const { allocation, formule } = calculerAllocationJournaliere(56.67)
    expect(formule).toBe('formule1')
    expect(allocation).toBe(formule1(56.67))
  })

  it('SJR = 83.33 → formule2 retenue', () => {
    const { allocation, formule } = calculerAllocationJournaliere(83.33)
    expect(formule).toBe('formule2')
    expect(allocation).toBe(formule2(83.33))
    expect(allocation).toBe(47.5)
  })

  it('SJR = 116.67 → formule2 retenue', () => {
    const { allocation, formule } = calculerAllocationJournaliere(116.67)
    expect(formule).toBe('formule2')
    expect(allocation).toBe(66.5)
  })

  it('SJR = 133.33 → formule2 retenue', () => {
    const { allocation, formule } = calculerAllocationJournaliere(133.33)
    expect(formule).toBe('formule2')
    expect(allocation).toBe(76)
  })

  it('SJR = 166.67 → formule2 retenue', () => {
    const { allocation, formule } = calculerAllocationJournaliere(166.67)
    expect(formule).toBe('formule2')
    expect(allocation).toBe(95)
  })

  it('SJR = 200 → formule2, sous le plafond 75% du SJR', () => {
    const { allocation, formule } = calculerAllocationJournaliere(200)
    expect(formule).toBe('formule2')
    expect(allocation).toBe(formule2(200))
    expect(allocation).toBeLessThan(arrondir2(ARE_PARAMS.plafondTauxSJR * 200))
    expect(allocation).toBe(114)
  })

  it('SJR = 42.84 → plancher (max des formules sous le minimum)', () => {
    const { allocation, formule } = calculerAllocationJournaliere(42.84)
    expect(Math.max(formule1(42.84), formule2(42.84))).toBeLessThan(ARE_PARAMS.allocationMinimale)
    expect(formule).toBe('plancher')
    expect(allocation).toBe(ARE_PARAMS.allocationMinimale)
  })

  it('SJR = 500 → formule2, plafond 75% non atteint', () => {
    const { allocation, formule } = calculerAllocationJournaliere(500)
    expect(formule).toBe('formule2')
    expect(allocation).toBe(formule2(500))
    expect(allocation).toBe(285)
    expect(allocation).toBeLessThanOrEqual(arrondir2(ARE_PARAMS.plafondTauxSJR * 500))
  })

  it('SJR = 44 → plancher (f1 et f2 sous le minimum)', () => {
    const { allocation, formule } = calculerAllocationJournaliere(44)
    expect(formule1(44)).toBeLessThan(ARE_PARAMS.allocationMinimale)
    expect(formule2(44)).toBeLessThan(ARE_PARAMS.allocationMinimale)
    expect(formule).toBe('plancher')
    expect(allocation).toBe(ARE_PARAMS.allocationMinimale)
  })

  it('SJR = 70 → formule1 retenue', () => {
    const { allocation, formule } = calculerAllocationJournaliere(70)
    expect(formule).toBe('formule1')
    expect(allocation).toBe(formule1(70))
    expect(allocation).toBe(41.46)
  })

  it('SJR = 50 → formule1, au-dessus du plancher', () => {
    const { allocation, formule } = calculerAllocationJournaliere(50)
    expect(formule).toBe('formule1')
    expect(allocation).toBe(formule1(50))
    expect(allocation).toBe(33.38)
    expect(allocation).toBeGreaterThan(ARE_PARAMS.allocationMinimale)
  })

  it('SJR = 40 → plancher', () => {
    const { allocation, formule } = calculerAllocationJournaliere(40)
    expect(formule).toBe('plancher')
    expect(allocation).toBe(ARE_PARAMS.allocationMinimale)
  })

  it('SJR = 0 → plancher', () => {
    const { allocation, formule } = calculerAllocationJournaliere(0)
    expect(formule).toBe('plancher')
    expect(allocation).toBe(ARE_PARAMS.allocationMinimale)
  })

  it('SJR = 300 → formule2, plafond 75% non atteint', () => {
    const { allocation, formule } = calculerAllocationJournaliere(300)
    expect(formule).toBe('formule2')
    expect(allocation).toBe(formule2(300))
    expect(allocation).toBe(171)
  })

  it('SJR = 180 → formule2 retenue', () => {
    const { allocation, formule } = calculerAllocationJournaliere(180)
    expect(formule).toBe('formule2')
    expect(allocation).toBe(102.6)
  })

  it('SJR = 162.40 → formule2, AJ au niveau du seuil de dégressivité', () => {
    const { allocation, formule } = calculerAllocationJournaliere(162.4)
    expect(formule).toBe('formule2')
    expect(allocation).toBe(formule2(162.4))
    expect(allocation).toBe(ARE_PARAMS.seuilDegressiviteAJ)
  })
})

// ════════════════════════════════════════════════════════════════════
// [C] calculerDegressivite — 15 tests
// ════════════════════════════════════════════════════════════════════
describe('calculerDegressivite', () => {
  it('AJ = 95, âge 40 → applicable, plancher post-réduction atteint', () => {
    const res = calculerDegressivite(95, 40)
    expect(res.applicable).toBe(true)
    expect(res.ajApres).toBe(degressiviteAttendue(95))
    expect(res.ajApres).toBe(ARE_PARAMS.seuilDegressiviteAJ)
  })

  it('AJ = 200, âge 40 → applicable, réduction de 30%', () => {
    const res = calculerDegressivite(200, 40)
    expect(res.applicable).toBe(true)
    expect(res.ajApres).toBe(arrondir2(200 * ARE_PARAMS.coeffDegressivite))
    expect(res.ajApres).toBe(140)
  })

  it('AJ = 150, âge 40 → applicable, réduction de 30%', () => {
    const res = calculerDegressivite(150, 40)
    expect(res.applicable).toBe(true)
    expect(res.ajApres).toBe(105)
  })

  it('AJ = seuil exact, âge 40 → NON applicable (il faut AJ strictement supérieure)', () => {
    const res = calculerDegressivite(ARE_PARAMS.seuilDegressiviteAJ, 40)
    expect(res.applicable).toBe(false)
    expect(res.ajApres).toBeUndefined()
  })

  it('AJ = seuil + 0.01, âge 40 → applicable, ramenée au plancher', () => {
    const res = calculerDegressivite(arrondir2(ARE_PARAMS.seuilDegressiviteAJ + 0.01), 40)
    expect(res.applicable).toBe(true)
    expect(res.ajApres).toBe(ARE_PARAMS.seuilDegressiviteAJ)
  })

  it('AJ = 85, âge 40 → NON applicable (AJ sous le seuil)', () => {
    const res = calculerDegressivite(85, 40)
    expect(res.applicable).toBe(false)
  })

  it('AJ = 200, âge 55 → NON applicable (âge limite atteint)', () => {
    const res = calculerDegressivite(200, ARE_PARAMS.ageLimiteDegressivite)
    expect(res.applicable).toBe(false)
  })

  it('AJ = 200, âge 56 → NON applicable (âge au-delà de la limite)', () => {
    const res = calculerDegressivite(200, 56)
    expect(res.applicable).toBe(false)
  })

  it('AJ = 200, âge 54 → applicable', () => {
    const res = calculerDegressivite(200, 54)
    expect(res.applicable).toBe(true)
    expect(res.ajApres).toBe(140)
  })

  it('AJ = 200, âge 0 → applicable (âge < limite)', () => {
    const res = calculerDegressivite(200, 0)
    expect(res.applicable).toBe(true)
    expect(res.ajApres).toBe(140)
  })

  it('AJ = 300, âge 40 → applicable, réduction de 30%', () => {
    const res = calculerDegressivite(300, 40)
    expect(res.applicable).toBe(true)
    expect(res.ajApres).toBe(arrondir2(300 * ARE_PARAMS.coeffDegressivite))
    expect(res.ajApres).toBe(210)
  })

  it('AJ = 130, âge 40 → applicable, ramenée au plancher post-réduction', () => {
    const res = calculerDegressivite(130, 40)
    expect(res.applicable).toBe(true)
    expect(130 * ARE_PARAMS.coeffDegressivite).toBeLessThan(ARE_PARAMS.seuilDegressiviteAJ)
    expect(res.ajApres).toBe(ARE_PARAMS.seuilDegressiviteAJ)
  })

  it('AJ = 131, âge 40 → applicable, ramenée au plancher post-réduction', () => {
    const res = calculerDegressivite(131, 40)
    expect(res.applicable).toBe(true)
    expect(res.ajApres).toBe(ARE_PARAMS.seuilDegressiviteAJ)
  })

  it('AJ = 133, âge 40 → applicable, réduction au-dessus du plancher', () => {
    const res = calculerDegressivite(133, 40)
    expect(res.applicable).toBe(true)
    expect(res.ajApres).toBe(arrondir2(133 * ARE_PARAMS.coeffDegressivite))
    expect(res.ajApres).toBe(93.1)
  })

  it('AJ = 100, âge 30 → applicable, ramenée au plancher post-réduction', () => {
    const res = calculerDegressivite(100, 30)
    expect(res.applicable).toBe(true)
    expect(res.ajApres).toBe(ARE_PARAMS.seuilDegressiviteAJ)
  })
})

// ════════════════════════════════════════════════════════════════════
// [D] calculerDureeIndemnisation — 10 tests
// ════════════════════════════════════════════════════════════════════
describe('calculerDureeIndemnisation', () => {
  it('6 mois, âge 30 → durée minimale', () => {
    expect(calculerDureeIndemnisation(6, 30)).toBe(ARE_PARAMS.dureeMinJours)
  })

  it('12 mois, âge 30 → 360 jours (sous le plafond < 50 ans)', () => {
    expect(calculerDureeIndemnisation(12, 30)).toBe(12 * ARE_PARAMS.joursParMoisSJR)
    expect(calculerDureeIndemnisation(12, 30)).toBe(360)
  })

  it('13 mois, âge 30 → plafonné au maximum < 50 ans', () => {
    expect(calculerDureeIndemnisation(13, 30)).toBe(ARE_PARAMS.dureeMaxMoins50ansJours)
  })

  it('24 mois, âge 30 → plafonné au maximum < 50 ans', () => {
    expect(calculerDureeIndemnisation(24, 30)).toBe(ARE_PARAMS.dureeMaxMoins50ansJours)
  })

  it('24 mois, âge 50 → 720 jours (sous le plafond 50 ans et +)', () => {
    expect(calculerDureeIndemnisation(24, 50)).toBe(24 * ARE_PARAMS.joursParMoisSJR)
    expect(calculerDureeIndemnisation(24, 50)).toBe(720)
  })

  it('25 mois, âge 50 → plafonné au maximum 50 ans et +', () => {
    expect(calculerDureeIndemnisation(25, 50)).toBe(ARE_PARAMS.dureeMax50ansEtPlusJours)
  })

  it('6 mois, âge 55 → durée minimale', () => {
    expect(calculerDureeIndemnisation(6, 55)).toBe(ARE_PARAMS.dureeMinJours)
  })

  it('36 mois, âge 56 → plafonné au maximum 50 ans et +', () => {
    expect(calculerDureeIndemnisation(36, 56)).toBe(ARE_PARAMS.dureeMax50ansEtPlusJours)
  })

  it('12 mois, âge 49 → 360 jours (plafond < 50 ans appliqué)', () => {
    expect(calculerDureeIndemnisation(12, 49)).toBe(360)
  })

  it('5 mois, âge 30 → remonté à la durée minimale', () => {
    expect(calculerDureeIndemnisation(5, 30)).toBe(ARE_PARAMS.dureeMinJours)
  })
})

// ════════════════════════════════════════════════════════════════════
// [E] validerInputs — 8 tests
// ════════════════════════════════════════════════════════════════════
describe('validerInputs', () => {
  it('inputs valides → null', () => {
    expect(validerInputs(inputs(2500, 24, 35))).toBeNull()
  })

  it('salaire = 0 → SALAIRE_INVALIDE', () => {
    const err = validerInputs(inputs(0, 24, 35))
    expect(err).not.toBeNull()
    expect(err?.code).toBe('SALAIRE_INVALIDE')
  })

  it('salaire = -100 → SALAIRE_INVALIDE', () => {
    expect(validerInputs(inputs(-100, 24, 35))?.code).toBe('SALAIRE_INVALIDE')
  })

  it('moisTravailles = 5 → AFFILIATION_INSUFFISANTE', () => {
    expect(validerInputs(inputs(2500, 5, 35))?.code).toBe('AFFILIATION_INSUFFISANTE')
  })

  it('moisTravailles = 37 → DUREE_EXCESSIVE', () => {
    expect(validerInputs(inputs(2500, 37, 35))?.code).toBe('DUREE_EXCESSIVE')
  })

  it('âge = 15 → AGE_INVALIDE', () => {
    expect(validerInputs(inputs(2500, 24, 15))?.code).toBe('AGE_INVALIDE')
  })

  it('âge = 81 → AGE_INVALIDE', () => {
    expect(validerInputs(inputs(2500, 24, 81))?.code).toBe('AGE_INVALIDE')
  })

  it('salaire = 0.01, 6 mois, âge 18 → valide', () => {
    expect(validerInputs(inputs(0.01, 6, 18))).toBeNull()
  })
})

// ════════════════════════════════════════════════════════════════════
// [F] calculerARE — intégration — 5 tests
// ════════════════════════════════════════════════════════════════════
describe('calculerARE (intégration)', () => {
  it('2500€, 24 mois, 30 ans → résultat complet cohérent, sans dégressivité', () => {
    const res = calculerARE(inputs(2500, 24, 30))
    expect(estResultat(res)).toBe(true)
    if (!estResultat(res)) return
    expect(res.sjr).toBe(sjrAttendu(2500))
    expect(res.allocationJournaliereBrute).toBe(formule2(res.sjr))
    expect(res.allocationMensuelleBrute).toBe(
      arrondir2(res.allocationJournaliereBrute * ARE_PARAMS.joursParMois)
    )
    expect(res.dureeIndemnisationJours).toBe(ARE_PARAMS.dureeMaxMoins50ansJours)
    expect(res.formuleRetenue).toBe('formule2')
    expect(res.degressivite.applicable).toBe(false)
  })

  it('8000€, 24 mois, 40 ans → dégressivité applicable avec avertissement', () => {
    const res = calculerARE(inputs(8000, 24, 40))
    expect(estResultat(res)).toBe(true)
    if (!estResultat(res)) return
    expect(res.allocationJournaliereBrute).toBeGreaterThan(ARE_PARAMS.seuilDegressiviteAJ)
    expect(res.degressivite.applicable).toBe(true)
    expect(res.degressivite.ajJournaliereApres).toBe(
      degressiviteAttendue(res.allocationJournaliereBrute)
    )
    expect(res.degressivite.ajMensuelleApres).toBe(
      arrondir2((res.degressivite.ajJournaliereApres as number) * ARE_PARAMS.joursParMois)
    )
    expect(res.avertissements.some((a) => a.includes('Dégressivité'))).toBe(true)
  })

  it('20000€, 24 mois, 40 ans → avertissement de plafonnement du salaire', () => {
    const res = calculerARE(inputs(20000, 24, 40))
    expect(estResultat(res)).toBe(true)
    if (!estResultat(res)) return
    expect(res.sjr).toBe(sjrAttendu(20000))
    expect(
      res.avertissements.some((a) =>
        a.includes(String(ARE_PARAMS.plafondSalaireRefMensuel))
      )
    ).toBe(true)
  })

  it('salaire 0 → erreur SALAIRE_INVALIDE', () => {
    const res = calculerARE(inputs(0, 24, 40))
    expect(estResultat(res)).toBe(false)
    if (estResultat(res)) return
    expect(res.code).toBe('SALAIRE_INVALIDE')
  })

  it('3000€, 30 mois, 40 ans → avertissement période de référence limitée à 24 mois', () => {
    const res = calculerARE(inputs(3000, 30, 40))
    expect(estResultat(res)).toBe(true)
    if (!estResultat(res)) return
    expect(res.sjr).toBe(sjrAttendu(3000))
    expect(
      res.avertissements.some((a) => a.includes(String(ARE_PARAMS.moisRefMoins55ans)))
    ).toBe(true)
  })
})
