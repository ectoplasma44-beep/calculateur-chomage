/**
 * Helpers de formatage français (montants, pourcentages, dates)
 * Aucune valeur réglementaire ici — uniquement de la mise en forme.
 */

export function euros(montant: number): string {
  return montant.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' €'
}

export function eurosEntiers(montant: number): string {
  return montant.toLocaleString('fr-FR', { maximumFractionDigits: 0 }) + ' €'
}

export function pourcent(taux: number): string {
  return (taux * 100).toLocaleString('fr-FR', { maximumFractionDigits: 1 }) + ' %'
}

/** Convertit une date ISO (AAAA-MM-JJ) en format français JJ/MM/AAAA */
export function dateFr(dateIso: string): string {
  const [annee, mois, jour] = dateIso.split('-')
  return `${jour}/${mois}/${annee}`
}
