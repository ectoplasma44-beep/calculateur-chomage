import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SALAIRES_CONFIG, getResultatsARE, formatEuros } from '@/lib/salaires-data'
import { ARE_PARAMS } from '@/lib/are-parametres'
import CalculateurARE from '@/components/CalculateurARE'

interface Props {
  params: Promise<{ montant: string }>
}

// Seuls les slugs salaires déclarés dans SALAIRES_CONFIG sont servis ;
// toutes les autres URLs retournent 404.
export const dynamicParams = false

export async function generateStaticParams() {
  return SALAIRES_CONFIG.map((s) => ({ montant: `chomage-salaire-${s.slug}-euros` }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { montant } = await params
  const slug = montant?.replace(/^chomage-salaire-(.+)-euros$/, '$1') ?? ''
  const config = SALAIRES_CONFIG.find((s) => s.slug === slug)
  if (!config) return {}

  const resultats = getResultatsARE(config.montant)
  const areEstimee = resultats
    ? `environ ${Math.round(resultats.allocationMensuelleBrute)} €/mois`
    : 'à calculer'

  return {
    title: `Chômage avec ${config.label} de Salaire — ARE 2026 (${areEstimee})`,
    description: `Combien touche-t-on au chômage avec un salaire de ${config.label} brut par mois ? Calcul ARE 2026 : montant journalier, mensuel, durée et dégressivité. Simulation gratuite.`,
    alternates: {
      canonical: `https://www.monchomage.fr/chomage-salaire-${config.slug}-euros`,
    },
  }
}

export default async function PageSalaire({ params }: Props) {
  const { montant } = await params
  const slug = montant?.replace(/^chomage-salaire-(.+)-euros$/, '$1') ?? ''
  const config = SALAIRES_CONFIG.find((s) => s.slug === slug)
  if (!config) notFound()

  const resultats = getResultatsARE(config.montant)

  const tauxDegressivitePct = Math.round((1 - ARE_PARAMS.coeffDegressivite) * 100)
  const jourDegressivite = ARE_PARAMS.joursAvantDegressivite + 1

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Combien touche-t-on au chômage avec un salaire de ${config.label} ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: resultats
            ? `Avec un salaire brut de ${config.label} par mois et 24 mois de travail, l'allocation journalière brute est d'environ ${formatEuros(resultats.allocationJournaliereBrute)}, soit ${formatEuros(resultats.allocationMensuelleBrute)} par mois. Ce montant est calculé sur la base des formules Unédic en vigueur depuis le 1er juillet 2025. Il s'agit d'une estimation indicative ; France Travail calcule sur la base de vos attestations employeur.`
            : `Le montant dépend de votre SJR exact. Utilisez le calculateur pour une estimation personnalisée.`,
        },
      },
      {
        '@type': 'Question',
        name: `Quelle est la durée d'indemnisation avec un salaire de ${config.label} ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: resultats
            ? `Avec 24 mois de travail, la durée d'indemnisation est de ${resultats.dureeIndemnisationJours} jours (environ ${resultats.dureeIndemnisationMois} mois). Pour les moins de 50 ans, la durée maximale est de ${ARE_PARAMS.dureeMaxMoins50ansJours} jours (12 mois), quelle que soit la durée travaillée au-delà de 12 mois.`
            : `La durée dépend du nombre de mois travaillés. Règle générale : 1 jour cotisé = 1 jour indemnisé.`,
        },
      },
      {
        '@type': 'Question',
        name: "Comment est calculée l'allocation chômage (ARE) ?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: `France Travail applique deux formules et retient la plus favorable : Formule 1 : ${Math.round(ARE_PARAMS.tauxFormule1 * 1000) / 10}% du SJR + ${ARE_PARAMS.partieFix} euros par jour. Formule 2 : ${Math.round(ARE_PARAMS.tauxFormule2 * 100)}% du SJR. Le montant retenu ne peut être inférieur à ${ARE_PARAMS.allocationMinimale} euros par jour (plancher) ni supérieur à ${Math.round(ARE_PARAMS.plafondTauxSJR * 100)}% du SJR (plafond). Ces paramètres sont en vigueur depuis le 1er juillet 2025.`,
        },
      },
      {
        '@type': 'Question',
        name: `La dégressivité s'applique-t-elle avec un salaire de ${config.label} ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: resultats?.degressivite.applicable
            ? `Oui. Avec un salaire de ${config.label}, votre allocation journalière dépasse le seuil de ${ARE_PARAMS.seuilDegressiviteAJ} euros par jour. Si vous avez moins de ${ARE_PARAMS.ageLimiteDegressivite} ans, une réduction de ${tauxDegressivitePct}% s'appliquera à partir du ${jourDegressivite}e jour indemnisé. Votre allocation passera de ${formatEuros(resultats.allocationJournaliereBrute)} à environ ${formatEuros(resultats.degressivite.ajJournaliereApres ?? 0)} par jour.`
            : `Non. Avec un salaire de ${config.label}, votre allocation journalière est inférieure au seuil de ${ARE_PARAMS.seuilDegressiviteAJ} euros par jour qui déclenche la dégressivité. Votre ARE reste identique du premier au dernier jour d'indemnisation.`,
        },
      },
    ],
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://www.monchomage.fr',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Chômage avec ${config.label} de salaire`,
        item: `https://www.monchomage.fr/chomage-salaire-${config.slug}-euros`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:underline">Accueil</a>
          <span className="mx-2">&rsaquo;</span>
          <span>Chômage avec {config.label} de salaire</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Chômage avec {config.label} de Salaire : Combien Touche-t-on en 2026 ?
        </h1>

        <p className="text-gray-600 mb-6">
          Vous êtes {config.contexte} et vous souhaitez estimer votre allocation chômage
          (ARE) en cas de perte d&apos;emploi. Voici le calcul détaillé basé sur les
          formules officielles Unédic en vigueur depuis le 1er juillet 2025.
        </p>

        {resultats && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">
              Estimation rapide pour {config.label} brut/mois
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-700">ARE journalière brute</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatEuros(resultats.allocationJournaliereBrute)}/jour
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-700">ARE mensuelle brute</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatEuros(resultats.allocationMensuelleBrute)}/mois
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-700">Durée (24 mois travaillés)</p>
                <p className="text-2xl font-bold text-blue-900">
                  {resultats.dureeIndemnisationMois} mois
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-700">Dégressivité au 7e mois</p>
                <p className="text-2xl font-bold text-blue-900">
                  {resultats.degressivite.applicable ? 'Applicable' : 'Non applicable'}
                </p>
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-4">
              Hypothèse : 24 mois travaillés, âge 35 ans, temps plein, emploi continu.
              Estimation indicative — France Travail calcule sur vos attestations employeur.
            </p>
          </div>
        )}

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Détail du calcul de l&apos;ARE pour {config.label} de salaire
        </h2>

        {resultats && (
          <div className="prose prose-gray max-w-none mb-8">
            <p>
              Avec un salaire brut mensuel de {config.label}, votre salaire journalier de
              référence (SJR) est d&apos;environ {formatEuros(resultats.sjr)} par jour
              (calculé sur 24 mois de travail continu, soit {config.montant * 24}
              {' '}€ divisé par 720 jours calendaires).
            </p>

            <p>
              France Travail applique ensuite les deux formules réglementaires et retient
              la plus favorable :
            </p>
            <ul>
              <li>
                Formule 1 : {Math.round(ARE_PARAMS.tauxFormule1 * 1000) / 10}%
                {' '}&times; {formatEuros(resultats.sjr)} + {ARE_PARAMS.partieFix} € ={' '}
                {formatEuros(resultats.sjr * ARE_PARAMS.tauxFormule1 + ARE_PARAMS.partieFix)}/jour
              </li>
              <li>
                Formule 2 : {Math.round(ARE_PARAMS.tauxFormule2 * 100)}%
                {' '}&times; {formatEuros(resultats.sjr)} ={' '}
                {formatEuros(resultats.sjr * ARE_PARAMS.tauxFormule2)}/jour
              </li>
            </ul>
            <p>
              <strong>Formule retenue :{' '}
              {resultats.formuleRetenue === 'formule1'
                ? 'Formule 1 (plus favorable)'
                : resultats.formuleRetenue === 'formule2'
                ? 'Formule 2 (plus favorable)'
                : 'Plancher réglementaire'}
              </strong>{' '}→ allocation journalière de{' '}
              {formatEuros(resultats.allocationJournaliereBrute)}/jour.
            </p>

            <p>
              Sur la base de {ARE_PARAMS.joursParMois} jours par mois (mensualisation depuis le
              1er avril 2025), le versement mensuel brut est de{' '}
              <strong>{formatEuros(resultats.allocationMensuelleBrute)}</strong>.
            </p>

            {resultats.degressivite.applicable && resultats.degressivite.ajJournaliereApres && (
              <div className="bg-amber-50 border border-amber-200 rounded p-4 my-4">
                <p className="font-semibold text-amber-900">
                  ⚠️ Dégressivité applicable à partir du {jourDegressivite}e mois d&apos;indemnisation
                </p>
                <p className="text-amber-800">
                  Avec un salaire de {config.label}, votre allocation journalière initiale
                  ({formatEuros(resultats.allocationJournaliereBrute)}) dépasse le seuil de{' '}
                  {ARE_PARAMS.seuilDegressiviteAJ} €/jour. Si vous avez moins de{' '}
                  {ARE_PARAMS.ageLimiteDegressivite} ans, une réduction de {tauxDegressivitePct}%
                  sera appliquée à partir du {jourDegressivite}e jour indemnisé. Votre ARE passera
                  à{' '}
                  <strong>{formatEuros(resultats.degressivite.ajJournaliereApres)}/jour</strong>
                  {' '}({formatEuros(resultats.degressivite.ajMensuelleApres ?? 0)}/mois).
                </p>
              </div>
            )}
          </div>
        )}

        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Personnalisez votre simulation
        </h2>
        <p className="text-gray-600 mb-4">
          L&apos;estimation ci-dessus est basée sur 24 mois de travail et un âge de 35 ans.
          Ajustez les paramètres selon votre situation réelle :
        </p>

        <CalculateurARE
          defaultSalaire={config.montant}
          defaultMois={24}
          defaultAge={35}
        />

        <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
          Questions fréquentes
        </h2>
        <div className="space-y-6">
          {faqJsonLd.mainEntity.map((faq, i) => (
            <div key={i} className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.name}</h3>
              <p className="text-gray-600">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Voir aussi :</p>
          <div className="flex flex-wrap gap-2">
            <a href="/rupture-conventionnelle" className="text-blue-600 hover:underline text-sm">
              Rupture conventionnelle
            </a>
            <span className="text-gray-300">|</span>
            <a href="/fin-de-cdd" className="text-blue-600 hover:underline text-sm">
              Fin de CDD
            </a>
            <span className="text-gray-300">|</span>
            <a href="/duree-indemnisation" className="text-blue-600 hover:underline text-sm">
              Durée d&apos;indemnisation
            </a>
            <span className="text-gray-300">|</span>
            <a href="/degressivite-chomage" className="text-blue-600 hover:underline text-sm">
              Dégressivité
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
