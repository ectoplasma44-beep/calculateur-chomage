import type { Metadata } from 'next'
import CalculateurARE from '@/components/CalculateurARE'

export const metadata: Metadata = {
  title: "Licenciement faute grave 2025 : perdez-vous vraiment l'ARE ?",
  description: "Licencie pour faute grave ou lourde ? Conditions ARE, perte des indemnites et recours aux prud'hommes expliques clairement.",
  alternates: { canonical: "https://www.monchomage.fr/licenciement-faute" },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "A-t-on droit au chômage après un licenciement pour faute grave ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Un licenciement pour faute grave prive le salarié de son indemnité de licenciement et de son indemnité de préavis, mais n'affecte pas son droit à l'ARE. Dès lors qu'il remplit les conditions d'affiliation (6 mois de travail sur 24 mois) et s'inscrit à France Travail, il peut percevoir l'allocation chômage normalement.",
      },
    },
    {
      '@type': 'Question',
      name: "La faute lourde supprime-t-elle le droit au chômage ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, c'est une idée reçue. La faute lourde (intention de nuire caractérisée) prive le salarié de son indemnité de licenciement, de préavis et de ses congés payés non pris, mais le droit à l'ARE est maintenu. L'assurance chômage est indépendante du motif de rupture du contrat.",
      },
    },
    {
      '@type': 'Question',
      name: "Quelle est la différence entre faute grave et faute lourde ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La faute grave rend impossible le maintien du salarié dans l'entreprise mais sans intention de nuire. La faute lourde implique une intention délibérée de causer un préjudice à l'employeur (sabotage, détournement). Conséquence principale : la faute lourde prive aussi des indemnités de congés payés non pris, contrairement à la faute grave.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on contester un licenciement pour faute grave devant les prud'hommes ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, dans un délai de 12 mois à compter de la notification du licenciement. Si le conseil de prud'hommes requalifie la faute grave en faute simple ou en licenciement sans cause réelle et sérieuse, le salarié peut récupérer son indemnité de licenciement, son indemnité de préavis, et éventuellement des dommages et intérêts. L'ARE perçue entre temps n'est pas remise en cause.",
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Licenciement pour faute et chômage', item: 'https://www.monchomage.fr/licenciement-faute' },
  ],
}

export default function PageLicenciementFaute() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm">
          <span className="font-semibold text-blue-900">Vous etes cadre&nbsp;?</span>{' '}
          <a href="/licenciement-faute-cadre" className="text-blue-700 underline hover:text-blue-900">
            Voir les sp&eacute;cificit&eacute;s cadre (clause non-concurrence, indemnit&eacute;s, prud&apos;hommes) &rarr;
          </a>
        </div>
        <nav className="mb-4 text-sm text-gray-500">
          <a href="/" className="hover:underline">Accueil</a>
          <span className="mx-2">&rsaquo;</span>
          <span>Licenciement pour faute et chômage</span>
        </nav>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Chômage après Licenciement pour Faute 2026 : Ce que vous Devez Savoir
        </h1>

        <p className="mb-6 text-gray-600">
          Licenciement pour faute simple, grave ou lourde : les trois qualifications
          n&apos;ont pas les mêmes conséquences sur les indemnités, mais elles ouvrent
          toutes droit à l&apos;ARE. Ce guide démystifie les idées reçues et explique
          ce que vous perdez — et ce que vous conservez — selon le type de faute.
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Les trois niveaux de faute et leurs conséquences
        </h2>

        <div className="mb-6 space-y-5">
          <div className="rounded-lg border border-green-100 bg-green-50 p-5">
            <h3 className="mb-2 font-semibold text-green-900">Faute simple</h3>
            <p className="text-green-800">
              Manquement aux obligations professionnelles sans gravité particulière :
              retards répétés, négligence légère, insuffisance de résultats. L&apos;employeur
              doit respecter la procédure complète de licenciement ET verser
              l&apos;indemnité légale de licenciement ainsi que l&apos;indemnité compensatrice
              de préavis. Le salarié perçoit l&apos;intégralité de ses droits et a droit
              à l&apos;ARE.
            </p>
          </div>

          <div className="rounded-lg border border-amber-100 bg-amber-50 p-5">
            <h3 className="mb-2 font-semibold text-amber-900">Faute grave</h3>
            <p className="text-amber-800">
              Manquement rendant impossible le maintien du salarié dans l&apos;entreprise :
              insubordination caractérisée, absences injustifiées répétées, violence
              sur le lieu de travail, harcèlement avéré. L&apos;employeur ne verse ni
              indemnité de licenciement ni indemnité de préavis. En revanche,
              l&apos;indemnité compensatrice de congés payés est due, et <strong>le salarié
              conserve son droit à l&apos;ARE</strong>.
            </p>
          </div>

          <div className="rounded-lg border border-red-100 bg-red-50 p-5">
            <h3 className="mb-2 font-semibold text-red-900">Faute lourde</h3>
            <p className="text-red-800">
              Intention délibérée de nuire à l&apos;employeur : sabotage d&apos;équipements,
              détournement de fonds, divulgation de secrets commerciaux, concurrence
              déloyale. Aucune indemnité de licenciement, aucun préavis, aucune
              indemnité compensatrice de congés payés. <strong>Mais le salarié conserve
              néanmoins son droit à l&apos;ARE</strong> — contrairement à une idée reçue
              très répandue.
            </p>
          </div>
        </div>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Idée reçue : la faute lourde ne prive pas du chômage
        </h2>
        <p className="mb-4 text-gray-700">
          Beaucoup de salariés croient à tort que la faute lourde supprime le droit
          au chômage. <strong>C&apos;est faux.</strong> L&apos;ARE est une assurance collective
          financée par les cotisations patronales et salariales. Elle n&apos;est pas une
          sanction ou une récompense : le motif de rupture du contrat — quelle que soit
          sa gravité — n&apos;affecte pas l&apos;éligibilité à l&apos;ARE.
        </p>
        <p className="mb-4 text-gray-700">
          La seule situation qui prive d&apos;ARE est la <strong>démission volontaire</strong>{' '}
          non justifiée par l&apos;un des cas légitimes reconnus (démission pour
          reconversion validée CEP, démission suite à un non-paiement de salaire,
          etc.). Un licenciement — quelle que soit la faute invoquée — ouvre toujours
          droit à l&apos;ARE dès lors que les conditions d&apos;affiliation sont remplies.
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Ce que perd le salarié selon le type de faute
        </h2>
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 font-semibold text-gray-700">Élément</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Faute simple</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Faute grave</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Faute lourde</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-gray-700">Indemnité de licenciement</td>
                <td className="px-4 py-2 text-green-600 font-medium">✅ Oui</td>
                <td className="px-4 py-2 text-red-600 font-medium">❌ Non</td>
                <td className="px-4 py-2 text-red-600 font-medium">❌ Non</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 text-gray-700">Indemnité de préavis</td>
                <td className="px-4 py-2 text-green-600 font-medium">✅ Oui</td>
                <td className="px-4 py-2 text-red-600 font-medium">❌ Non</td>
                <td className="px-4 py-2 text-red-600 font-medium">❌ Non</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-gray-700">Indemnité compensatrice CP</td>
                <td className="px-4 py-2 text-green-600 font-medium">✅ Oui</td>
                <td className="px-4 py-2 text-green-600 font-medium">✅ Oui</td>
                <td className="px-4 py-2 text-red-600 font-medium">❌ Non</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 text-gray-700">Droit à l&apos;ARE (chômage)</td>
                <td className="px-4 py-2 text-green-600 font-medium">✅ Oui</td>
                <td className="px-4 py-2 text-green-600 font-medium">✅ Oui</td>
                <td className="px-4 py-2 text-green-600 font-medium">✅ Oui</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Peut-on contester la qualification de la faute ?
        </h2>
        <p className="mb-4 text-gray-700">
          Oui, devant le conseil de prud&apos;hommes. La requalification d&apos;une faute grave
          en faute simple permet de récupérer l&apos;indemnité de licenciement et l&apos;indemnité
          de préavis. La requalification en licenciement sans cause réelle et sérieuse
          permet en plus d&apos;obtenir des dommages et intérêts.
        </p>
        <p className="mb-4 text-gray-700">
          Le délai de prescription est de <strong>12 mois</strong> à compter de la
          notification du licenciement (loi du 14 juin 2013, article L.1471-1 du Code
          du travail). Au-delà, l&apos;action devient irrecevable. L&apos;ARE éventuellement
          perçue pendant la procédure n&apos;est pas remise en cause en cas de requalification.
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Calcul de l&apos;ARE après licenciement pour faute
        </h2>
        <p className="mb-4 text-gray-700">
          Le montant de l&apos;ARE est identique quel que soit le type de faute : le SJR
          est calculé sur vos salaires des 24 derniers mois, puis les formules Unédic
          s&apos;appliquent. Si vous avez reçu une indemnité de licenciement (faute simple),
          la fraction dépassant le minimum légal peut créer un différé d&apos;indemnisation
          spécifique qui retardera le premier versement de quelques semaines.
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
            <a href="/licenciement-economique" className="text-blue-600 hover:underline">Licenciement économique</a>
            <a href="/abandon-de-poste" className="text-blue-600 hover:underline">Abandon de poste</a>
            <a href="/" className="text-blue-600 hover:underline">Calculateur ARE</a>
          </div>
        </div>
      </main>
    </>
  )
}
