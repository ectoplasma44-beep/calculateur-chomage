import type { Metadata } from 'next'
import CalculateurARE from '@/components/CalculateurARE'

export const metadata: Metadata = {
  title: "ARE Nette vs Brute 2026 — CSG, CRDS et Impôt sur le Chômage",
  description: "Quelle est la différence entre l'ARE brute et nette ? CSG, CRDS, impôt sur le revenu : tout comprendre sur les prélèvements sur le chômage 2026.",
  alternates: { canonical: "https://www.monchomage.fr/chomage-net-brut" },
}

const SEUIL_PRELEVEMENT_AJ = 61
const TAUX_CSG_NORMAL_BRUT = 0.062
const TAUX_CSG_REDUIT = 0.038
const TAUX_CRDS = 0.005
const ABATTEMENT = 0.0175
const TAUX_CSG_EFFECTIF = TAUX_CSG_NORMAL_BRUT * (1 - ABATTEMENT)
const TAUX_CRDS_EFFECTIF = TAUX_CRDS * (1 - ABATTEMENT)
const TAUX_TOTAL_EFFECTIF = TAUX_CSG_EFFECTIF + TAUX_CRDS_EFFECTIF

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Quelle est la différence entre ARE brute et ARE nette ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `L'ARE brute est le montant calculé par France Travail selon les formules Unédic, avant tout prélèvement. L'ARE nette est ce que vous recevez sur votre compte après déduction de la CSG (${(TAUX_CSG_EFFECTIF * 100).toFixed(2)}% effectif) et de la CRDS (${(TAUX_CRDS_EFFECTIF * 100).toFixed(2)}%), soit environ ${(TAUX_TOTAL_EFFECTIF * 100).toFixed(2)}% de moins. Ces prélèvements ne s'appliquent que si votre allocation journalière dépasse ${SEUIL_PRELEVEMENT_AJ} euros.`,
      },
    },
    {
      '@type': 'Question',
      name: "Le chômage est-il imposable ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, l'ARE est un revenu imposable soumis à l'impôt sur le revenu. France Travail applique le prélèvement à la source (PAS) directement sur vos versements mensuels, selon votre taux personnalisé. L'ARE apparaît dans votre déclaration annuelle de revenus dans la case 1AP (allocations chômage).",
      },
    },
    {
      '@type': 'Question',
      name: "Comment connaître son ARE nette exacte ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `France Travail communique le montant net sur la notification de droits envoyée après l'ouverture du dossier. Vous pouvez aussi le consulter dans votre espace personnel sur francetravail.fr. Pour une estimation, appliquez un abattement de ${(TAUX_TOTAL_EFFECTIF * 100).toFixed(2)}% sur l'ARE brute calculée (si votre allocation journalière dépasse ${SEUIL_PRELEVEMENT_AJ} euros).`,
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on être exonéré de CSG sur le chômage ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, sous conditions de ressources. Les allocataires dont le revenu fiscal de référence est inférieur à certains seuils bénéficient d'un taux réduit de CSG (3,8%) ou d'une exonération totale. France Travail applique automatiquement le bon taux sur la base de votre dernière déclaration de revenus transmise par l'administration fiscale.",
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'ARE nette vs brute', item: 'https://www.monchomage.fr/chomage-net-brut' },
  ],
}

export default function PageChomagNetBrut() {
  const exempleAREBrute1 = 1200
  const exempleAREBrute2 = 800
  const exempleAJ1 = exempleAREBrute1 / 30
  const exempleAJ2 = exempleAREBrute2 / 30

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <nav className="mb-4 text-sm text-gray-500">
          <a href="/" className="hover:underline">Accueil</a>
          <span className="mx-2">&rsaquo;</span>
          <span>ARE nette vs brute</span>
        </nav>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          ARE Nette vs Brute 2026 : Combien Touche-t-on Vraiment ?
        </h1>

        <p className="mb-6 text-gray-600">
          Le calculateur affiche l&apos;ARE brute — le montant avant prélèvements sociaux.
          Pour connaître ce que vous recevrez réellement sur votre compte, il faut
          déduire la CSG, la CRDS, et le prélèvement à la source. Ce guide explique
          chaque composante avec des exemples chiffrés.
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          L&apos;ARE brute : ce que calcule France Travail
        </h2>
        <p className="mb-4 text-gray-700">
          Les formules Unédic — et donc notre calculateur — produisent l&apos;<strong>ARE brute</strong>.
          C&apos;est la base de tous les calculs officiels : Salaire Journalier de Référence (SJR),
          application des formules, vérification du plancher et du plafond. Le résultat
          avant toute déduction est l&apos;ARE journalière brute, multipliée par 30 pour
          obtenir l&apos;ARE mensuelle brute.
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Les prélèvements sur l&apos;ARE
        </h2>
        <p className="mb-4 text-gray-700">
          Deux contributions sociales s&apos;appliquent sur l&apos;ARE brute, sous réserve que
          l&apos;allocation journalière dépasse {SEUIL_PRELEVEMENT_AJ} €/jour :
        </p>

        <div className="mb-6 space-y-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-2 font-semibold text-gray-900">CSG — Contribution Sociale Généralisée</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>
                <strong>Taux normal :</strong> {(TAUX_CSG_NORMAL_BRUT * 100).toFixed(1)}% appliqué sur
                {' '}{((1 - ABATTEMENT) * 100).toFixed(2)}% de l&apos;ARE brute (abattement de {(ABATTEMENT * 100).toFixed(2)}%)
                → taux effectif : {(TAUX_CSG_EFFECTIF * 100).toFixed(2)}%
              </li>
              <li>
                <strong>Taux réduit :</strong> {(TAUX_CSG_REDUIT * 100).toFixed(1)}% pour les allocataires
                dont le revenu fiscal de référence est inférieur aux seuils fixés annuellement
              </li>
              <li>
                <strong>Taux zéro :</strong> exonération totale pour les allocataires les plus modestes
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-2 font-semibold text-gray-900">CRDS — Contribution au Remboursement de la Dette Sociale</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>
                <strong>Taux :</strong> {(TAUX_CRDS * 100).toFixed(1)}% sur
                {' '}{((1 - ABATTEMENT) * 100).toFixed(2)}% de l&apos;ARE brute
                → taux effectif : {(TAUX_CRDS_EFFECTIF * 100).toFixed(2)}%
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-4">
          <p className="font-semibold text-blue-900">
            Prélèvement total au taux normal : {(TAUX_TOTAL_EFFECTIF * 100).toFixed(2)}% de l&apos;ARE brute
          </p>
          <p className="mt-1 text-sm text-blue-800">
            Seuil de déclenchement : {SEUIL_PRELEVEMENT_AJ} €/jour d&apos;allocation journalière brute.
            En dessous : exonération totale de CSG et CRDS.
          </p>
        </div>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Calcul de l&apos;ARE nette : deux exemples
        </h2>

        <div className="mb-6 space-y-4">
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="font-semibold text-gray-900">
              Exemple 1 — ARE brute {exempleAREBrute1} €/mois (AJ = {exempleAJ1.toFixed(2)} €/jour)
            </p>
            <p className="mt-1 text-sm text-gray-600">
              AJ = {exempleAJ1.toFixed(2)} € &gt; {SEUIL_PRELEVEMENT_AJ} € → prélèvements applicables
            </p>
            <p className="mt-2 text-sm text-gray-700">
              ARE nette = {exempleAREBrute1} × (1 − {(TAUX_TOTAL_EFFECTIF * 100).toFixed(2)}%) ={' '}
              <strong className="text-blue-700">
                {(exempleAREBrute1 * (1 - TAUX_TOTAL_EFFECTIF)).toFixed(0)} €/mois
              </strong>
              {' '}(avant impôt sur le revenu)
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <p className="font-semibold text-gray-900">
              Exemple 2 — ARE brute {exempleAREBrute2} €/mois (AJ = {exempleAJ2.toFixed(2)} €/jour)
            </p>
            <p className="mt-1 text-sm text-gray-600">
              AJ = {exempleAJ2.toFixed(2)} € &lt; {SEUIL_PRELEVEMENT_AJ} € → exonération totale
            </p>
            <p className="mt-2 text-sm text-gray-700">
              ARE nette = ARE brute ={' '}
              <strong className="text-blue-700">{exempleAREBrute2} €/mois</strong>
              {' '}(aucun prélèvement social)
            </p>
          </div>
        </div>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          L&apos;ARE est-elle imposable ?
        </h2>
        <p className="mb-4 text-gray-700">
          Oui. L&apos;ARE est soumise à l&apos;<strong>impôt sur le revenu</strong>, au même titre
          qu&apos;un salaire. France Travail applique le prélèvement à la source (PAS)
          directement sur l&apos;ARE mensuelle, selon le taux personnalisé communiqué par
          l&apos;administration fiscale (le même taux que celui appliqué sur votre dernier
          salaire si vous étiez salarié).
        </p>
        <p className="mb-4 text-gray-700">
          Si votre situation fiscale a évolué (première année de chômage avec revenus
          plus faibles que l&apos;année précédente), vous pouvez moduler votre taux de
          prélèvement à la source via votre espace personnel sur impots.gouv.fr. Cela
          permet d&apos;éviter une retenue trop importante pendant la période de chômage.
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Récapitulatif : de l&apos;ARE brute à l&apos;ARE réellement perçue
        </h2>
        <div className="mb-6 overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100">
              <tr className="bg-blue-50">
                <td className="px-4 py-2 font-semibold text-blue-900">ARE brute</td>
                <td className="px-4 py-2 text-blue-800">Calculée par les formules Unédic</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-700">− CSG ({(TAUX_CSG_EFFECTIF * 100).toFixed(2)}% effectif)</td>
                <td className="px-4 py-2 text-red-600">Si AJ ≥ {SEUIL_PRELEVEMENT_AJ} €</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 text-gray-700">− CRDS ({(TAUX_CRDS_EFFECTIF * 100).toFixed(2)}% effectif)</td>
                <td className="px-4 py-2 text-red-600">Si AJ ≥ {SEUIL_PRELEVEMENT_AJ} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-700">− Impôt sur le revenu (PAS)</td>
                <td className="px-4 py-2 text-red-600">Selon taux personnalisé</td>
              </tr>
              <tr className="bg-green-50">
                <td className="px-4 py-2 font-semibold text-green-900">= ARE nette versée</td>
                <td className="px-4 py-2 text-green-800">Montant réel sur votre compte</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Estimez votre ARE brute
        </h2>
        <p className="mb-4 text-gray-700">
          Ce calculateur donne l&apos;ARE brute. Pour obtenir une estimation nette,
          déduisez environ {(TAUX_TOTAL_EFFECTIF * 100).toFixed(2)}% si votre allocation
          journalière dépasse {SEUIL_PRELEVEMENT_AJ} €/jour.
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
            <a href="/salaire-journalier-reference" className="text-blue-600 hover:underline">Calcul du SJR</a>
            <a href="/degressivite-chomage" className="text-blue-600 hover:underline">Dégressivité ARE</a>
            <a href="/" className="text-blue-600 hover:underline">Calculateur ARE</a>
          </div>
        </div>
      </main>
    </>
  )
}
