import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurARE from '@/components/CalculateurARE'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros, pourcent } from '@/lib/format'

export const metadata: Metadata = {
  title: "Licenciement economique 2025 : ARE, indemnites et PSE",
  description: "Licencie pour motif economique ? Calcul indemnite legale, ARE et conge de reclassement expliques. Exemple chiffre selon anciennete.",
  alternates: {
    canonical: 'https://www.monchomage.fr/licenciement-economique',
  },
}

const tauxCSP = 0.75

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Quelle est la différence entre l'ARE et le CSP après un licenciement économique ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `L'ARE est l'allocation chômage classique, calculée selon les formules Unédic (${pourcent(ARE_PARAMS.tauxFormule1)} du SJR + ${euros(ARE_PARAMS.partieFix)} ou ${pourcent(ARE_PARAMS.tauxFormule2)} du SJR). Le CSP offre une allocation de ${pourcent(tauxCSP)} du SJR pendant 12 mois maximum, avec un accompagnement renforcé. Le CSP est souvent plus avantageux pour les hauts salaires sur sa durée.`,
      },
    },
    {
      '@type': 'Question',
      name: "Le CSP est-il obligatoire après un licenciement économique ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Non, il est optionnel. L'employeur a l'obligation de le proposer dans les entreprises de moins de 1 000 salariés. Le salarié dispose de 21 jours pour accepter ou refuser. En cas de refus, il bascule sur l'ARE classique.`,
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on cumuler l'ARE et une indemnité de licenciement économique ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Les deux sont indépendants : l'indemnité de licenciement est versée par l'employeur et n'est pas déduite de l'ARE. Elle peut néanmoins créer un différé d'indemnisation si elle dépasse le montant légal.`,
      },
    },
    {
      '@type': 'Question',
      name: "Quelle est la durée du chômage après un licenciement économique ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `En ARE classique, la durée est identique aux autres motifs : 1 jour indemnisé par jour cotisé, dans la limite de ${ARE_PARAMS.dureeMaxMoins50ansJours} jours pour les moins de 50 ans et ${ARE_PARAMS.dureeMax50ansEtPlusJours} jours pour les 50 ans et plus. En CSP, la durée est plafonnée à 12 mois.`,
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
      name: 'Licenciement économique et chômage',
      item: 'https://www.monchomage.fr/licenciement-economique',
    },
  ],
}

export default function LicenciementEconomique() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}Licenciement &eacute;conomique et ch&ocirc;mage
      </nav>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Vous avez 55 ans et plus&nbsp;?{' '}
        <Link href="/licenciement-economique-senior" className="font-semibold underline hover:text-amber-900">
          Voir les droits ARE senior (36 mois) et impact retraite&nbsp;&rarr;
        </Link>
      </div>

      <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
        Vous &ecirc;tes cadre&nbsp;?{' '}
        <Link href="/licenciement-economique-cadre" className="font-semibold underline hover:text-blue-900">
          Voir les sp&eacute;cificit&eacute;s cadre&nbsp;&rarr;
        </Link>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Ch&ocirc;mage apr&egrave;s Licenciement &Eacute;conomique 2026&nbsp;: ARE ou CSP&nbsp;?
      </h1>

      <div className="mt-8 space-y-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Le licenciement &eacute;conomique et le droit au ch&ocirc;mage
          </h2>
          <p className="mt-3">
            Le licenciement pour motif &eacute;conomique (art. L.1233-3 du Code du travail) est
            prononc&eacute; lorsque la suppression ou la transformation de poste r&eacute;sulte
            de difficult&eacute;s &eacute;conomiques, d&apos;une mutation technologique,
            d&apos;une r&eacute;organisation de l&apos;entreprise ou d&apos;une cessation
            d&apos;activit&eacute;. Il constitue une perte involontaire d&apos;emploi qui ouvre
            droit &agrave; l&apos;ARE dans les conditions habituelles&nbsp;: au moins{' '}
            <strong>{ARE_PARAMS.dureeMinJours} jours (6 mois)</strong> travaill&eacute;s au
            cours des {ARE_PARAMS.moisRefMoins55ans} derniers mois, inscription &agrave; France
            Travail et recherche active d&apos;emploi.
          </p>
          <p className="mt-3">
            <strong>Particularit&eacute; majeure&nbsp;:</strong> dans les entreprises de moins
            de 1&nbsp;000 salari&eacute;s (ainsi qu&apos;en cas de redressement ou de
            liquidation judiciaire, quelle que soit la taille), l&apos;employeur a
            l&apos;obligation de proposer le{' '}
            <strong>Contrat de S&eacute;curisation Professionnelle (CSP)</strong> avant la
            notification du licenciement. Le salari&eacute; dispose alors de 21 jours calendaires
            pour accepter ou refuser ce dispositif, qui constitue une alternative souvent plus
            favorable &agrave; l&apos;ARE classique.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            ARE classique vs Contrat de S&eacute;curisation Professionnelle (CSP)
          </h2>
          <p className="mt-3">
            Ces deux dispositifs r&eacute;pondent au m&ecirc;me objectif &mdash; vous
            indemniser pendant votre p&eacute;riode de recherche d&apos;emploi &mdash; mais
            pr&eacute;sentent des diff&eacute;rences substantielles&nbsp;:
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold">ARE classique</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold">CSP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-200 px-4 py-2 font-medium">Taux d&apos;indemnisation</td>
                  <td className="border border-slate-200 px-4 py-2">
                    Formules Unédic ({pourcent(ARE_PARAMS.tauxFormule1)}&nbsp;SJR +{' '}
                    {euros(ARE_PARAMS.partieFix)} ou {pourcent(ARE_PARAMS.tauxFormule2)}&nbsp;SJR)
                  </td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold text-blue-700">
                    {pourcent(tauxCSP)} du SJR (plus &eacute;lev&eacute; pour les hauts salaires)
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Dur&eacute;e maximale</td>
                  <td className="border border-slate-200 px-4 py-2">
                    {ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;j (&lt;&nbsp;50 ans) /{' '}
                    {ARE_PARAMS.dureeMax50ansEtPlusJours}&nbsp;j (50+ ans)
                  </td>
                  <td className="border border-slate-200 px-4 py-2">12 mois maximum</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-2 font-medium">D&eacute;lai de carence</td>
                  <td className="border border-slate-200 px-4 py-2">
                    7 jours + diff&eacute;r&eacute;s (jusqu&apos;&agrave; 75 jours max pour licenciement &eacute;co)
                  </td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold text-blue-700">Aucun d&eacute;lai d&apos;attente</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Accompagnement</td>
                  <td className="border border-slate-200 px-4 py-2">Standard France Travail</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold text-blue-700">Renforc&eacute; (formation, bilan de comp&eacute;tences)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Quand choisir le CSP&nbsp;?
          </h2>
          <p className="mt-3">
            Le choix entre ARE et CSP d&eacute;pend principalement de deux facteurs&nbsp;:
          </p>
          <p className="mt-3">
            <strong>Si votre salaire &eacute;tait &eacute;lev&eacute;</strong>, le CSP est
            g&eacute;n&eacute;ralement plus avantageux&nbsp;: {pourcent(tauxCSP)} du SJR
            d&eacute;passe souvent le r&eacute;sultat des formules ARE classiques. Par exemple,
            pour un SJR de 120&nbsp;&euro;, le CSP donne {euros(120 * tauxCSP)}/jour contre{' '}
            {euros(Math.max(ARE_PARAMS.tauxFormule1 * 120 + ARE_PARAMS.partieFix, ARE_PARAMS.tauxFormule2 * 120)).replace(/\.(\d)$/, '.$10')}/jour
            en ARE.
          </p>
          <p className="mt-3">
            <strong>Si vos droits d&eacute;passent 12 mois</strong> (plus de{' '}
            {Math.ceil(ARE_PARAMS.dureeMaxMoins50ansJours / ARE_PARAMS.joursParMoisSJR)} mois
            travaill&eacute;s pour les moins de 50 ans), l&apos;ARE classique peut &ecirc;tre
            pr&eacute;f&eacute;rable&nbsp;: le CSP ne peut exc&eacute;der 12 mois, tandis que
            l&apos;ARE vous indemnise jusqu&apos;&agrave;{' '}
            {ARE_PARAMS.dureeMaxMoins50ansJours} jours. Si vous pensez retrouver rapidement un
            emploi, le CSP sans d&eacute;lai de carence et avec un taux plus &eacute;lev&eacute;
            reste int&eacute;ressant.
          </p>
          <p className="mt-3">
            Le d&eacute;lai de r&eacute;ponse est de <strong>21 jours calendaires</strong>{' '}
            apr&egrave;s la remise de la proposition par l&apos;employeur. Pass&eacute; ce
            d&eacute;lai sans r&eacute;ponse, le CSP est r&eacute;put&eacute; refus&eacute;.
            N&apos;h&eacute;sitez pas &agrave; consulter un conseiller France Travail pour
            &eacute;valuer quelle option vous est la plus favorable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul de l&apos;ARE apr&egrave;s licenciement &eacute;conomique (hors CSP)
          </h2>
          <p className="mt-3">
            En dehors du CSP, le calcul est identique &agrave; celui d&apos;une rupture
            conventionnelle ou d&apos;une fin de CDD. France Travail calcule votre SJR sur la
            base des salaires des {ARE_PARAMS.moisRefMoins55ans} derniers mois (
            {ARE_PARAMS.moisRefPlus55ans} mois pour les 55 ans et plus), plafonn&eacute;s &agrave;{' '}
            {ARE_PARAMS.plafondSalaireRefMensuel.toLocaleString('fr-FR')}&nbsp;&euro;/mois, puis
            applique les formules ARE. L&apos;allocation mensuelle correspond &agrave;
            l&apos;allocation journali&egrave;re &times; {ARE_PARAMS.joursParMois} jours. Le
            calculateur ci-dessous vous donne une estimation imm&eacute;diate.
          </p>
          <p className="mt-3">
            <strong>Note sur le diff&eacute;r&eacute;&nbsp;:</strong> en cas de licenciement
            &eacute;conomique, le diff&eacute;r&eacute; sp&eacute;cifique li&eacute; &agrave;
            l&apos;indemnit&eacute; supra-l&eacute;gale est plafonn&eacute; &agrave;
            <strong> 75 jours</strong> (au lieu de 150 jours pour les autres motifs de rupture).
            Ce plafond r&eacute;duit l&apos;attente avant le premier versement, ce qui constitue
            une mesure favorable aux salari&eacute;s licenci&eacute;s pour motif &eacute;conomique.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Estimez votre ARE apr&egrave;s licenciement &eacute;conomique
        </h2>
        <p className="mt-2 text-slate-600">
          Renseignez votre salaire brut mensuel moyen (hors indemnit&eacute; de
          licenciement), le nombre de mois travaill&eacute;s et votre &acirc;ge &agrave; la
          date de fin de contrat.
        </p>
        <div className="mt-4">
          <CalculateurARE />
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-900">Questions fr&eacute;quentes</h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900">
              Quelle est la diff&eacute;rence entre l&apos;ARE et le CSP apr&egrave;s un
              licenciement &eacute;conomique&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              L&apos;ARE est l&apos;allocation classique ({pourcent(ARE_PARAMS.tauxFormule1)}{' '}
              du SJR + {euros(ARE_PARAMS.partieFix)} ou {pourcent(ARE_PARAMS.tauxFormule2)}{' '}
              du SJR). Le CSP offre {pourcent(tauxCSP)} du SJR pendant 12 mois maximum, sans
              d&eacute;lai d&apos;attente, avec un accompagnement renforc&eacute;. Il est souvent
              plus avantageux pour les hauts salaires sur sa dur&eacute;e.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Le CSP est-il obligatoire apr&egrave;s un licenciement &eacute;conomique&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Non, il est optionnel. L&apos;employeur a l&apos;obligation de le proposer dans
              les entreprises de moins de 1&nbsp;000 salari&eacute;s. Le salari&eacute; dispose
              de 21 jours pour accepter ou refuser. En cas de refus, il bascule sur
              l&apos;ARE classique.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Peut-on cumuler l&apos;ARE et une indemnit&eacute; de licenciement
              &eacute;conomique&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Les deux sont ind&eacute;pendants. L&apos;indemnit&eacute; de licenciement est
              vers&eacute;e par l&apos;employeur et n&apos;est pas d&eacute;duite de l&apos;ARE.
              La partie supra-l&eacute;gale peut toutefois cr&eacute;er un diff&eacute;r&eacute;
              d&apos;indemnisation plafonn&eacute; &agrave; 75 jours.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Quelle est la dur&eacute;e du ch&ocirc;mage apr&egrave;s un licenciement
              &eacute;conomique&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              En ARE classique&nbsp;: {ARE_PARAMS.dureeMaxMoins50ansJours} jours maximum pour
              les moins de 50 ans, {ARE_PARAMS.dureeMax50ansEtPlusJours} jours pour les 50 ans
              et plus. En CSP&nbsp;: plafonn&eacute; &agrave; 12 mois quels que soient vos
              droits.
            </p>
          </div>
        </div>
      </section>

      <nav className="mt-12 border-t border-slate-200 pt-6">
        <p className="mb-3 text-sm font-medium text-slate-600">Pages li&eacute;es</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/rupture-conventionnelle"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700"
          >
            Rupture conventionnelle
          </Link>
          <Link
            href="/fin-de-cdd"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700"
          >
            Fin de CDD
          </Link>
          <Link
            href="/duree-indemnisation"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700"
          >
            Dur&eacute;e d&apos;indemnisation
          </Link>
        </div>
      </nav>
    </main>
  )
}
