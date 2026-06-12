import type { Metadata } from 'next'
import { ARE_PARAMS } from '@/lib/are-parametres'
import CalculateurARE from '@/components/CalculateurARE'

export const metadata: Metadata = {
  title: "Chômage Temps Partiel 2026 — Calcul ARE et Coefficient",
  description: "Comment est calculée l'ARE après un emploi à temps partiel ? Coefficient de modulation, SJR, plancher et plafond adaptés. Simulation gratuite 2026.",
  alternates: { canonical: "https://www.monchomage.fr/temps-partiel" },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Comment est calculée l'ARE après un emploi à temps partiel ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Le calcul est identique à celui d'un temps plein, mais basé sur le salaire réel perçu (plus faible). Le SJR reflète vos revenus effectifs. Le plancher de l'ARE (${ARE_PARAMS.allocationMinimale} euros par jour à temps plein) est proportionnellement réduit selon votre quotité de travail (coefficient = heures travaillées / 35h).`,
      },
    },
    {
      '@type': 'Question',
      name: "L'ARE est-elle toujours inférieure après un temps partiel ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Généralement oui, car elle est proportionnelle au salaire perçu. Cependant, le taux de remplacement (ARE / salaire) peut être plus favorable pour les bas salaires grâce à la partie fixe de ${ARE_PARAMS.partieFix} euros par jour dans la formule 1, qui représente une part plus importante du SJR lorsque celui-ci est faible.`,
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on cumuler une ARE calculée sur un temps partiel avec un nouveau temps partiel ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, via le dispositif d'activité réduite. Si vous retrouvez un emploi à temps partiel après avoir perdu un autre emploi (même à temps partiel), vous pouvez cumuler ce nouveau salaire avec une partie de votre ARE. Les jours non indemnisables sont calculés selon la formule : (salaire du mois × 0,70) divisé par l'allocation journalière.",
      },
    },
    {
      '@type': 'Question',
      name: "Un employeur peut-il imposer un passage à temps partiel ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, le passage à temps partiel est une modification du contrat de travail qui nécessite l'accord écrit du salarié. En cas de refus, l'employeur peut engager une procédure de licenciement pour motif personnel ou économique selon les circonstances, ce qui ouvre droit à l'ARE et aux indemnités de licenciement.",
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chômage temps partiel', item: 'https://www.monchomage.fr/temps-partiel' },
  ],
}

const HEURES_SEMAINE_REF = 35

export default function PageTempsPartiel() {
  const exempleCoeff = 0.5
  const exempleSalaire = 1200
  const exempleSJR = exempleSalaire / ARE_PARAMS.joursParMoisSJR
  const exempleF1 = exempleSJR * ARE_PARAMS.tauxFormule1 + ARE_PARAMS.partieFix
  const exempleF2 = exempleSJR * ARE_PARAMS.tauxFormule2
  const exempleAJ = Math.max(exempleF1, exempleF2)
  const exemplePlancherModule = ARE_PARAMS.allocationMinimale * exempleCoeff

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <nav className="mb-4 text-sm text-gray-500">
          <a href="/" className="hover:underline">Accueil</a>
          <span className="mx-2">&rsaquo;</span>
          <span>Chômage temps partiel</span>
        </nav>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Chômage après un Emploi à Temps Partiel 2026 : Calcul de l&apos;ARE
        </h1>

        <p className="mb-6 text-gray-600">
          Travailler à temps partiel implique un salaire proportionnellement réduit,
          ce qui affecte directement le calcul de l&apos;ARE. Voici comment France Travail
          calcule votre allocation, avec les spécificités liées à la quotité de travail.
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Le temps partiel et le calcul du SJR
        </h2>
        <p className="mb-4 text-gray-700">
          Le salaire journalier de référence (SJR) est calculé sur les salaires
          <strong> réels perçus</strong>, qui sont proportionnellement plus faibles
          qu&apos;à temps plein. Un mi-temps à {exempleSalaire.toLocaleString('fr-FR')} €/mois
          donne un SJR d&apos;environ {exempleSJR.toFixed(2)} €/jour (contre 66,67 € pour
          un temps plein à 2 000 €/mois).
        </p>
        <p className="mb-4 text-gray-700">
          France Travail ne reconstitue <strong>pas</strong> le salaire à temps plein :
          l&apos;ARE reflète fidèlement le salaire réellement perçu pendant la période de
          référence. Cela signifie qu&apos;une personne ayant travaillé à mi-temps toute sa
          vie percevra une ARE proportionnellement identique à un salarié à temps plein
          de même ancienneté, mais avec un montant absolu deux fois moins élevé.
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Le coefficient de temps partiel sur le plancher
        </h2>
        <p className="mb-4 text-gray-700">
          Le plancher de {ARE_PARAMS.allocationMinimale} €/jour (montant minimum de l&apos;ARE
          à temps plein) est <strong>modulé par un coefficient</strong> proportionnel au
          temps de travail pour éviter qu&apos;un salarié à temps très partiel perçoive une
          ARE disproportionnée par rapport à son salaire antérieur.
        </p>
        <div className="mb-4 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-800">
          <p>Coefficient = heures hebdomadaires travaillées / {HEURES_SEMAINE_REF}h</p>
          <p className="mt-2">Plancher modulé = {ARE_PARAMS.allocationMinimale} € × coefficient</p>
        </div>
        <p className="mb-4 text-gray-700">
          Exemple : mi-temps à {HEURES_SEMAINE_REF / 2}h/semaine → coefficient =
          {' '}{HEURES_SEMAINE_REF / 2}/{HEURES_SEMAINE_REF} = {exempleCoeff.toFixed(2)}
          → Plancher modulé = {ARE_PARAMS.allocationMinimale} × {exempleCoeff.toFixed(2)} =
          {' '}{exemplePlancherModule.toFixed(2)} €/jour
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Exemple concret : mi-temps à {exempleSalaire.toLocaleString('fr-FR')} €/mois pendant 24 mois
        </h2>
        <div className="mb-6 overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-2 font-medium text-gray-700">Salaire total de référence</td>
                <td className="px-4 py-2 text-gray-900">{(exempleSalaire * 24).toLocaleString('fr-FR')} € sur 720 jours</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-700">SJR</td>
                <td className="px-4 py-2 text-gray-900">{exempleSJR.toFixed(2)} €/jour</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-gray-700">
                  Formule 1 ({Math.round(ARE_PARAMS.tauxFormule1 * 1000) / 10}% × SJR + {ARE_PARAMS.partieFix} €)
                </td>
                <td className="px-4 py-2 text-gray-900">
                  {exempleSJR.toFixed(2)} × {ARE_PARAMS.tauxFormule1} + {ARE_PARAMS.partieFix} ={' '}
                  {exempleF1.toFixed(2)} €
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-700">
                  Formule 2 ({Math.round(ARE_PARAMS.tauxFormule2 * 100)}% × SJR)
                </td>
                <td className="px-4 py-2 text-gray-900">
                  {exempleSJR.toFixed(2)} × {ARE_PARAMS.tauxFormule2} = {exempleF2.toFixed(2)} €
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-gray-700">ARE journalière retenue</td>
                <td className="px-4 py-2 font-semibold text-blue-700">{exempleAJ.toFixed(2)} €/jour</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-700">Plancher modulé (mi-temps)</td>
                <td className="px-4 py-2 text-gray-900">{ARE_PARAMS.allocationMinimale} × {exempleCoeff} = {exemplePlancherModule.toFixed(2)} €/jour</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-gray-700">Vérification plancher</td>
                <td className="px-4 py-2 text-green-700">
                  {exempleAJ.toFixed(2)} &gt; {exemplePlancherModule.toFixed(2)} → formule 1 appliquée
                </td>
              </tr>
              <tr className="bg-blue-50">
                <td className="px-4 py-2 font-semibold text-blue-900">ARE mensuelle estimée</td>
                <td className="px-4 py-2 font-bold text-blue-900">
                  {exempleAJ.toFixed(2)} × {ARE_PARAMS.joursParMois} = {(exempleAJ * ARE_PARAMS.joursParMois).toFixed(2)} €/mois
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mb-3 mt-8 text-2xl font-semibond text-gray-900">
          Cumul temps partiel et ARE
        </h2>
        <p className="mb-4 text-gray-700">
          Si vous reprenez un emploi à temps partiel après une perte d&apos;emploi,
          le dispositif d&apos;activité réduite permet de cumuler ce nouveau salaire avec
          une partie de l&apos;ARE. France Travail calcule le nombre de jours non
          indemnisables selon la formule suivante : (salaire du mois × 0,70) / allocation
          journalière. Consultez la{' '}
          <a href="/cumul-emploi-chomage" className="text-blue-600 hover:underline">
            page dédiée au cumul emploi-chômage
          </a>{' '}pour le détail complet.
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Temps partiel imposé par l&apos;employeur
        </h2>
        <p className="mb-4 text-gray-700">
          Le passage à temps partiel est une <strong>modification du contrat de travail</strong>{' '}
          qui nécessite l&apos;accord écrit du salarié. Si l&apos;employeur impose ce changement et que
          le salarié le refuse, l&apos;employeur doit soit maintenir le contrat, soit engager une
          procédure de licenciement. Un licenciement consécutif au refus d&apos;un temps partiel
          ouvre droit à l&apos;ARE et aux indemnités de licenciement dans les conditions normales.
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Simulez votre ARE temps partiel
        </h2>
        <p className="mb-4 text-gray-700">
          Entrez votre salaire brut mensuel réel (temps partiel tel que perçu, pas un
          équivalent temps plein reconstitué). Le résultat reflétera votre ARE calculée
          sur vos revenus effectifs.
        </p>

        <CalculateurARE />

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Questions fréquentes
        </h2>
        <div className="space-y-5">
          {faqJsonLd.mainEntity.map((faq, i) => (
            <div key={i} className="border-b border-gray-200 pb-4">
              <h3 className="mb-2 font-semibold text-gray-900">{faq.name}</h3>
              <p className="text-gray-600">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="mb-3 text-sm text-gray-500">Voir aussi :</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a href="/cumul-emploi-chomage" className="text-blue-600 hover:underline">Cumul emploi-chômage</a>
            <a href="/salaire-journalier-reference" className="text-blue-600 hover:underline">Calcul du SJR</a>
            <a href="/" className="text-blue-600 hover:underline">Calculateur ARE</a>
          </div>
        </div>
      </main>
    </>
  )
}
