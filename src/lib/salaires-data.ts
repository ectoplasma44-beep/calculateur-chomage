import { calculerARE } from './calcul-are'

export interface SalaireConfig {
  slug: string
  montant: number
  label: string
  contexte: string
  tranche: 'smic' | 'median' | 'intermediaire' | 'cadre' | 'haut'
}

export const SALAIRES_CONFIG: SalaireConfig[] = [
  {
    slug: '1500',
    montant: 1500,
    label: '1 500 €',
    contexte: "proche du SMIC (1 823 € brut en 2026), temps partiel ou début de carrière",
    tranche: 'smic',
  },
  {
    slug: '1800',
    montant: 1800,
    label: '1 800 €',
    contexte: "salaire légèrement au-dessus du SMIC, employé ou ouvrier qualifié",
    tranche: 'smic',
  },
  {
    slug: '2000',
    montant: 2000,
    label: '2 000 €',
    contexte: "proche du salaire médian français (~2 300 € brut), technicien ou employé",
    tranche: 'median',
  },
  {
    slug: '2500',
    montant: 2500,
    label: '2 500 €',
    contexte: "salaire médian supérieur, technicien confirmé ou agent de maîtrise",
    tranche: 'median',
  },
  {
    slug: '3000',
    montant: 3000,
    label: '3 000 €',
    contexte: "cadre débutant ou profession intermédiaire confirmée",
    tranche: 'intermediaire',
  },
  {
    slug: '3500',
    montant: 3500,
    label: '3 500 €',
    contexte: "cadre confirmé, ingénieur ou manager intermédiaire",
    tranche: 'intermediaire',
  },
  {
    slug: '4000',
    montant: 4000,
    label: '4 000 €',
    contexte: "cadre supérieur ou expert technique senior",
    tranche: 'cadre',
  },
  {
    slug: '5000',
    montant: 5000,
    label: '5 000 €',
    contexte: "cadre dirigeant ou profil senior avec forte expérience",
    tranche: 'haut',
  },
]

export function getResultatsARE(montant: number) {
  const resultat = calculerARE({
    salaireBrutMensuel: montant,
    moisTravailles: 24,
    age: 35,
  })
  if ('code' in resultat) return null
  return resultat
}

export function formatEuros(n: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)
}
