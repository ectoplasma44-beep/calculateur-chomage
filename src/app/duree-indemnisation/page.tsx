import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurARE from '@/components/CalculateurARE'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros, dateFr } from '@/lib/format'

export const metadata: Metadata = {
  title: "Durée d'Indemnisation Chômage 2026 — Combien de Temps ?",
  description:
    "Combien de temps peut-on toucher le chômage ? Règle 1 jour = 1 jour, durées maximales selon l'âge, seniors 50+ ans. Tout comprendre en 2026.",
  alternates: {
    canonical: 'https://www.monchomage.fr/duree-indemnisation',
  },
}

// Exemples illustratifs de durée d'indemnisation
const EXEMPLES_DUREE = [
  { mois: 6,  age: 35, jours: ARE_PARAMS.dureeMinJours, note: 'durée minimale' },
  { mois: 12, age: 35, jours: 12 * ARE_PARAMS.joursParMoisSJR, note: '' },
  { mois: 18, age: 35, jours: ARE_PARAMS.dureeMaxMoins50ansJours, note: 'plafond atteint' },
  { mois: 24, age: 35, jours: ARE_PARAMS.dureeMaxMoins50ansJours, note: 'plafond atteint' },
  { mois: 12, age: 52, jours: 12 * ARE_PARAMS.joursParMoisSJR, note: '' },
  { mois: 24, age: 52, jours: 24 * ARE_PARAMS.joursParMoisSJR, note: '' },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Combien de temps peut-on toucher le chômage en 2026 ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `La durée d'indemnisation dépend du nombre de mois travaillés : 1 jour cotisé = 1 jour indemnisé. La durée minimale est de 6 mois (${ARE_PARAMS.dureeMinJours} jours). La durée maximale est de 12 mois (${ARE_PARAMS.dureeMaxMoins50ansJours} jours) pour les moins de 50 ans, et de 24 mois (${ARE_PARAMS.dureeMax50ansEtPlusJours} jours) pour les 50 ans et plus.`,
      },
    },
    {
      '@type': 'Question',
      name: "Avec 1 an de travail, combien de mois de chômage peut-on avoir ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Avec 12 mois de travail, vous avez droit à environ 12 mois d'indemnisation (${12 * ARE_PARAMS.joursParMoisSJR} jours), sous réserve d'être sous le plafond de ${ARE_PARAMS.dureeMaxMoins50ansJours} jours. Pour les moins de 50 ans, travailler plus de 12 mois ne prolonge pas les droits au-delà de ce plafond.`,
      },
    },
    {
      '@type': 'Question',
      name: "La durée d'indemnisation est-elle la même quel que soit le motif de rupture ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui, pour l'ARE classique. La durée dépend uniquement du nombre de jours travaillés, pas du motif (licenciement, rupture conventionnelle, fin de CDD). Exception : le CSP après licenciement économique est limité à 12 mois quels que soient les droits ouverts.`,
      },
    },
    {
      '@type': 'Question',
      name: "Que se passe-t-il si on retrouve un emploi avant la fin de ses droits ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Les droits sont conservés et peuvent être rechargés. Si vous reprenez un emploi et le perdez à nouveau, vous pouvez soit reprendre les droits restants (si plus avantageux), soit ouvrir de nouveaux droits avec votre nouvelle période d'affiliation.`,
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
      name: "Durée d'indemnisation chômage",
      item: 'https://www.monchomage.fr/duree-indemnisation',
    },
  ],
}

export default function DureeIndemnisation() {
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
        {' '}&rsaquo;{' '}Dur&eacute;e d&apos;indemnisation ch&ocirc;mage
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Dur&eacute;e d&apos;Indemnisation Ch&ocirc;mage 2026&nbsp;: Combien de Temps
        Pouvez-vous Toucher l&apos;ARE&nbsp;?
      </h1>

      <div className="mt-8 space-y-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            La r&egrave;gle fondamentale&nbsp;: 1 jour cotis&eacute; = 1 jour indemnis&eacute;
          </h2>
          <p className="mt-3">
            Depuis la r&eacute;forme de 2021 (maintenue en 2026), le principe de calcul de
            la dur&eacute;e d&apos;indemnisation est simple&nbsp;: chaque jour travaill&eacute;
            (et cotis&eacute; &agrave; l&apos;assurance ch&ocirc;mage) ouvre droit &agrave; un
            jour d&apos;indemnisation. Concr&egrave;tement, cela signifie que plus vous avez
            travaill&eacute; avant de perdre votre emploi, plus longtemps vous serez
            indemnis&eacute;&nbsp;&mdash; dans la limite des plafonds r&eacute;glementaires.
          </p>
          <p className="mt-3">
            Pour ouvrir des droits, il faut avoir travaill&eacute; au minimum{' '}
            <strong>{ARE_PARAMS.dureeMinJours} jours (6 mois)</strong> au cours de la
            p&eacute;riode de r&eacute;f&eacute;rence. En-dessous de ce seuil, aucun droit
            n&apos;est ouvert. Au-dessus, chaque jour suppl&eacute;mentaire allonge la
            dur&eacute;e d&apos;indemnisation jusqu&apos;au plafond applicable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Les dur&eacute;es maximales selon l&apos;&acirc;ge
          </h2>
          <p className="mt-3">
            La dur&eacute;e maximale d&apos;indemnisation diff&egrave;re selon votre &acirc;ge
            &agrave; la date de fin de contrat&nbsp;:
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border-2 border-slate-200 p-5">
              <p className="text-sm font-medium text-slate-600">Moins de 50 ans</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                {ARE_PARAMS.dureeMaxMoins50ansJours} jours
              </p>
              <p className="mt-1 text-sm text-slate-500">
                environ 12 mois &mdash; atteint avec{' '}
                {Math.ceil(ARE_PARAMS.dureeMaxMoins50ansJours / ARE_PARAMS.joursParMoisSJR)}&nbsp;mois de
                travail
              </p>
            </div>
            <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
              <p className="text-sm font-medium text-blue-700">50 ans et plus</p>
              <p className="mt-1 text-3xl font-bold text-blue-900">
                {ARE_PARAMS.dureeMax50ansEtPlusJours} jours
              </p>
              <p className="mt-1 text-sm text-blue-700">
                environ 24 mois &mdash; atteint avec{' '}
                {Math.ceil(ARE_PARAMS.dureeMax50ansEtPlusJours / ARE_PARAMS.joursParMoisSJR)}&nbsp;mois de
                travail
              </p>
            </div>
          </div>

          <p className="mt-4">
            Pour les <strong>55 ans et plus</strong>, la p&eacute;riode de
            r&eacute;f&eacute;rence est &eacute;largie &agrave;{' '}
            {ARE_PARAMS.moisRefPlus55ans} mois (au lieu de{' '}
            {ARE_PARAMS.moisRefMoins55ans} mois pour les moins de 55 ans). Cela permet
            d&apos;int&eacute;grer davantage de mois travaill&eacute;s dans le calcul et
            d&apos;atteindre plus facilement le plafond de{' '}
            {ARE_PARAMS.dureeMax50ansEtPlusJours} jours. L&apos;&acirc;ge pris en compte est
            celui &agrave; la <em>date de fin du contrat de travail</em>, pas celui de
            l&apos;inscription &agrave; France Travail.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Exemples concrets de dur&eacute;es d&apos;indemnisation
          </h2>
          <p className="mt-3">
            Le tableau ci-dessous illustre la r&egrave;gle 1 jour = 1 jour avec notre
            simplification de {ARE_PARAMS.joursParMoisSJR} jours par mois&nbsp;:
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold">Mois travaill&eacute;s</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold">&Acirc;ge</th>
                  <th className="border border-slate-200 px-4 py-2 text-right font-semibold">Jours indemnis&eacute;s</th>
                  <th className="border border-slate-200 px-4 py-2 text-right font-semibold">Mois (indicatif)</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold">Note</th>
                </tr>
              </thead>
              <tbody>
                {EXEMPLES_DUREE.map((ex, i) => (
                  <tr key={i} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                    <td className="border border-slate-200 px-4 py-2">{ex.mois} mois</td>
                    <td className="border border-slate-200 px-4 py-2">{ex.age} ans</td>
                    <td className="border border-slate-200 px-4 py-2 text-right font-semibold text-blue-700">
                      {ex.jours}
                    </td>
                    <td className="border border-slate-200 px-4 py-2 text-right">
                      ~{Math.round(ex.jours / 30)}
                    </td>
                    <td className="border border-slate-200 px-4 py-2 text-slate-500">
                      {ex.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            La mensualisation du paiement depuis avril 2025
          </h2>
          <p className="mt-3">
            Depuis le 1er avril 2025, France Travail verse l&apos;ARE mensuellement sur une
            base fixe de <strong>{ARE_PARAMS.joursParMois} jours calendaires</strong>, quel
            que soit le mois r&eacute;el (28, 30 ou 31 jours). Le montant mensuel
            vers&eacute; correspond donc &agrave;&nbsp;:
          </p>
          <div className="mt-3 rounded-xl bg-blue-50 p-4 font-mono text-blue-900">
            Montant mensuel = Allocation journali&egrave;re &times; {ARE_PARAMS.joursParMois} jours
          </div>
          <p className="mt-3">
            Ce syst&egrave;me homog&egrave;ne simplifie la pr&eacute;visibilit&eacute; de
            l&apos;indemnisation&nbsp;: vous touchez toujours le m&ecirc;me montant mensuel,
            ind&eacute;pendamment du calendrier. En contrepartie, les mois courts (f&eacute;vrier)
            ne donnent plus lieu &agrave; un versement r&eacute;duit, mais les mois longs (31
            jours) ne sont plus non plus sur-indemnis&eacute;s.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Que se passe-t-il &agrave; la fin des droits&nbsp;?
          </h2>
          <p className="mt-3">
            Lorsque votre dur&eacute;e d&apos;indemnisation est &eacute;puis&eacute;e, vous
            cessez de percevoir l&apos;ARE, mais vous n&apos;&ecirc;tes pas n&eacute;cessairement
            sans ressources ni accompagnement. Plusieurs dispositifs peuvent prendre le relais&nbsp;:
          </p>
          <p className="mt-3">
            <strong>L&apos;ASS (Allocation de Solidarit&eacute; Sp&eacute;cifique)</strong>{' '}
            est une aide de l&apos;&Eacute;tat, sous conditions de ressources, vers&eacute;e
            aux demandeurs d&apos;emploi ayant &eacute;puis&eacute; leurs droits &agrave;
            l&apos;ARE. Son montant est fix&eacute; par d&eacute;cret et est nettement
            inf&eacute;rieur &agrave; l&apos;ARE.
          </p>
          <p className="mt-3">
            <strong>Le rechargement des droits&nbsp;:</strong> si vous avez repris une
            activit&eacute; professionnelle pendant votre p&eacute;riode d&apos;indemnisation
            (m&ecirc;me partiellement), vous avez peut-&ecirc;tre accumul&eacute; de nouveaux
            jours cotis&eacute;s. &Agrave; la fin de vos droits initiaux, France Travail
            examinera si un rechargement est possible&nbsp;: il faut en g&eacute;n&eacute;ral
            avoir travaill&eacute; au moins 6 mois suppl&eacute;mentaires pour ouvrir de
            nouveaux droits.
          </p>
          <p className="mt-3">
            <strong>La formation professionnelle&nbsp;:</strong> si vous &ecirc;tes en
            formation valid&eacute;e par France Travail, l&apos;ARE peut se prolonger sous
            forme d&apos;AREF (ARE Formation, minimum {euros(ARE_PARAMS.allocationMinimaAREF)}/jour)
            dans la limite de vos droits restants. Il est donc int&eacute;ressant d&apos;initier
            un projet de formation avant l&apos;&eacute;puisement complet de vos droits.
          </p>
          <p className="mt-3">
            <strong>Important&nbsp;:</strong> la fin des droits ARE ne signifie pas la fin
            de votre inscription &agrave; France Travail. Vous pouvez continuer &agrave;
            &ecirc;tre accompagn&eacute; dans votre recherche d&apos;emploi m&ecirc;me sans
            indemnisation. Maintenir votre inscription pr&eacute;serve &eacute;galement
            d&apos;&eacute;ventuels droits &agrave; l&apos;ASS et facilite le rechargement
            en cas de nouvelle p&eacute;riode de travail.
          </p>
          <p className="mt-3">
            Les param&egrave;tres actuels sont en vigueur depuis le{' '}
            {dateFr(ARE_PARAMS.dateValeur)}. Des n&eacute;gociations sur les r&egrave;gles de
            l&apos;assurance ch&ocirc;mage sont en cours en 2026&nbsp;: les dur&eacute;es
            maximales pourraient &eacute;voluer. Consultez{' '}
            <Link href="/methodologie" className="text-blue-700 underline">
              notre page m&eacute;thodologie
            </Link>{' '}
            pour le calendrier de mise &agrave; jour de nos param&egrave;tres.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Estimez votre dur&eacute;e d&apos;indemnisation
        </h2>
        <p className="mt-2 text-slate-600">
          Le calculateur affiche la dur&eacute;e en jours et en mois en fonction de vos mois
          travaill&eacute;s et de votre &acirc;ge, ainsi que le montant mensuel estim&eacute;.
        </p>
        <div className="mt-4">
          <CalculateurARE />
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-900">
          Questions fr&eacute;quentes sur la dur&eacute;e du ch&ocirc;mage
        </h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900">
              Combien de temps peut-on toucher le ch&ocirc;mage en 2026&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              La dur&eacute;e minimale est de 6 mois ({ARE_PARAMS.dureeMinJours} jours). La
              dur&eacute;e maximale est de 12 mois ({ARE_PARAMS.dureeMaxMoins50ansJours} jours)
              pour les moins de 50 ans, et de 24 mois ({ARE_PARAMS.dureeMax50ansEtPlusJours} jours)
              pour les 50 ans et plus.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Avec 1 an de travail, combien de mois de ch&ocirc;mage peut-on avoir&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Avec 12 mois de travail, vous avez droit &agrave; environ 12 mois
              d&apos;indemnisation ({12 * ARE_PARAMS.joursParMoisSJR} jours). Pour les moins
              de 50 ans, travailler au-del&agrave; de 12 mois ne prolonge pas
              l&apos;indemnisation au-del&agrave; du plafond de{' '}
              {ARE_PARAMS.dureeMaxMoins50ansJours} jours.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              La dur&eacute;e d&apos;indemnisation est-elle la m&ecirc;me quel que soit le
              motif de rupture&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Oui, pour l&apos;ARE classique. La dur&eacute;e d&eacute;pend uniquement du
              nombre de jours travaill&eacute;s, pas du motif de rupture. Exception&nbsp;: le
              CSP apr&egrave;s licenciement &eacute;conomique est limit&eacute; &agrave;
              12 mois quels que soient vos droits.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Que se passe-t-il si on retrouve un emploi avant la fin de ses droits&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Les droits non consomm&eacute;s sont conserv&eacute;s. Si vous perdez votre
              emploi &agrave; nouveau, vous pouvez reprendre les droits restants ou ouvrir de
              nouveaux droits si la nouvelle p&eacute;riode travaill&eacute;e est plus
              avantageuse.
            </p>
          </div>
        </div>
      </section>

      <nav className="mt-12 border-t border-slate-200 pt-6">
        <p className="mb-3 text-sm font-medium text-slate-600">Pages li&eacute;es</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700"
          >
            Calculateur ARE
          </Link>
          <Link
            href="/rupture-conventionnelle"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700"
          >
            Rupture conventionnelle
          </Link>
          <Link
            href="/salaire-journalier-reference"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700"
          >
            Salaire Journalier de R&eacute;f&eacute;rence
          </Link>
        </div>
      </nav>
    </main>
  )
}
