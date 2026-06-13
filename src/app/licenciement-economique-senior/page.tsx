import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Licenciement eco senior 2025 : 36 mois d'ARE et PSE",
  description: "Senior licencie pour motif economique ? Droits ARE allonges, conge de reclassement et protections PSE renforcees expliques avec exemples.",
  alternates: { canonical: 'https://www.monchomage.fr/licenciement-economique-senior' },
}

const DELAI_ATTENTE = 7
const CONGE_RECLASSEMENT_TAUX_MIN = 0.65 // 65% du salaire brut minimum
const TRIMESTRES_PAR_50J = 1

// ── Exemple : senior 58 ans, 3 200 €/mois, 18 ans ancienneté ────────────────
const EX_SALAIRE = 3_200
const EX_ANCIENNETE = 18
const exSjr = Number((EX_SALAIRE / ARE_PARAMS.joursParMoisSJR).toFixed(2))
const exF1 = Number((ARE_PARAMS.tauxFormule1 * exSjr + ARE_PARAMS.partieFix).toFixed(2))
const exF2 = Number((ARE_PARAMS.tauxFormule2 * exSjr).toFixed(2))
const exAj = Number(
  Math.max(Math.min(Math.max(exF1, exF2), ARE_PARAMS.plafondTauxSJR * exSjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const exAjMensuelle = Number((exAj * ARE_PARAMS.joursParMois).toFixed(2))

// Indemnité légale licenciement éco
const exIndT1 = Math.min(EX_ANCIENNETE, 10) * (EX_SALAIRE / 4)
const exIndT2 = Math.max(0, EX_ANCIENNETE - 10) * (EX_SALAIRE / 3)
const exIndLegale = Number((exIndT1 + exIndT2).toFixed(2))
// Franchise = 0 si indemnité = légale (pas de supra-légale)
// Franchise plafonnée à franchiseMaxLicenciementEco (75 j) si supra-légale
const exFranchise = 0 // indemnité légale pure → franchise = 0

function trimestresPourJours(jours: number): number {
  return Math.floor(jours / 50)
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Licenciement economique', item: 'https://www.monchomage.fr/licenciement-economique' },
    { '@type': 'ListItem', position: 3, name: 'Licenciement eco senior', item: 'https://www.monchomage.fr/licenciement-economique-senior' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Un senior licencie economiquement a-t-il droit a 36 mois de chomage ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui. Les salaries de 55 ans et plus ont droit a une duree maximale d'ARE de ${ARE_PARAMS.dureeMax55ansEtPlusJours} jours (${Math.round(ARE_PARAMS.dureeMax55ansEtPlusJours / 30)} mois), contre ${ARE_PARAMS.dureeMaxMoins50ansJours} jours pour les moins de 50 ans. Cette duree est calculee selon le principe 1 jour cotise = 1 jour indemnise, dans la limite du plafond.`,
      },
    },
    {
      '@type': 'Question',
      name: "Le conge de reclassement est-il obligatoire pour un senior ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Le conge de reclassement est obligatoire dans les entreprises de 1 000 salaries et plus lorsqu'elles procedent a un licenciement economique. Il n'est pas specifiquement obligatoire pour les seniors, mais le PSE (Plan de Sauvegarde de l'Emploi) doit prevoir des mesures adaptees a l'age des salaries, notamment des cellules de reclassement dediees. Durant le conge de reclassement, le salarie percoit au minimum ${Math.round(CONGE_RECLASSEMENT_TAUX_MIN * 100)} % de son salaire brut.`,
      },
    },
    {
      '@type': 'Question',
      name: "Comment le licenciement economique affecte-t-il la retraite d'un senior ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Chaque 50 jours d'ARE valident 1 trimestre de retraite. Un senior indemnise pendant ${ARE_PARAMS.dureeMax55ansEtPlusJours} jours valide ${trimestresPourJours(ARE_PARAMS.dureeMax55ansEtPlusJours)} trimestres supplementaires, ce qui peut l'aider a atteindre le nombre de trimestres necessaires pour la retraite a taux plein. Ces trimestres comptent pour la duree d'assurance mais pas pour le salaire de reference (25 meilleures annees).`,
      },
    },
  ],
}

export default function LicenciementEconomiqueSenior() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}
        <Link href="/licenciement-economique" className="hover:underline">Licenciement &eacute;conomique</Link>
        {' '}&rsaquo;{' '}Senior
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Licenciement &eacute;conomique senior&nbsp;: ARE 36 mois et droits apr&egrave;s 55 ans
      </h1>

      <div className="mt-8 space-y-10 text-slate-700">

        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Double sp&eacute;cificit&eacute;&nbsp;: ARE all&ocirc;ng&eacute;e et protections PSE
          </h2>
          <p className="mt-3">
            Pour un salari&eacute; senior touch&eacute; par un licenciement &eacute;conomique, la
            situation pr&eacute;sente deux dimensions&nbsp;: des droits ARE all&ocirc;ng&eacute;s
            pouvant aller jusqu&apos;&agrave; {Math.round(ARE_PARAMS.dureeMax55ansEtPlusJours / 30)}&nbsp;mois
            pour les 55 ans et plus, et des protections sp&eacute;cifiques dans le Plan de Sauvegarde
            de l&apos;Emploi (PSE) qui reconnaissent la difficult&eacute; de retrouver un emploi
            apr&egrave;s 55 ans. S&apos;ajoutent &agrave; cela des mesures favorables sur la franchise
            (plafonn&eacute;e &agrave; {ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;j contre
            {' '}{ARE_PARAMS.franchiseMaxRC}&nbsp;j pour une rupture conventionnelle) et un impact
            positif sur les trimestres de retraite.
          </p>
        </section>

        {/* 2. Conditions et durée */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Dur&eacute;e ARE all&ocirc;ng&eacute;e pour les seniors
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Tranche d&apos;&acirc;ge</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Dur&eacute;e ARE max</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Plafond franchise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Moins de 50 ans</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;j</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">50 &agrave; 52 ans</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.dureeMax50ansEtPlusJours}&nbsp;j</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">53 &agrave; 54 ans</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.dureeMax53a54ansJours}&nbsp;j</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;j</td>
                </tr>
                <tr className="bg-amber-50 font-bold">
                  <td className="border border-slate-200 px-4 py-2 text-amber-900">55 ans et plus</td>
                  <td className="border border-slate-200 px-4 py-2 text-amber-900">{ARE_PARAMS.dureeMax55ansEtPlusJours}&nbsp;j ({Math.round(ARE_PARAMS.dureeMax55ansEtPlusJours / 30)}&nbsp;mois)</td>
                  <td className="border border-slate-200 px-4 py-2 text-amber-900">{ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;j</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Calcul SJR */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul ARE&nbsp;: senior 58 ans, {euros(EX_SALAIRE)}/mois, {EX_ANCIENNETE}&nbsp;ans d&apos;anciennet&eacute;
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">SJR = {euros(EX_SALAIRE)} &divide; {ARE_PARAMS.joursParMoisSJR}</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{euros(exSjr)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule&nbsp;1</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exF1)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule&nbsp;2 (retenue)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exF2)}/j</td>
                </tr>
                <tr className="bg-amber-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">ARE journali&egrave;re</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">{euros(exAj)}/j</td>
                </tr>
                <tr className="bg-amber-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">ARE mensuelle</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">{euros(exAjMensuelle)}/mois</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Indemnité et franchise */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Indemnit&eacute; l&eacute;gale et franchise (plafond {ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;j)
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Tranche 1&nbsp;: {Math.min(EX_ANCIENNETE, 10)}&nbsp;ans &times; ({euros(EX_SALAIRE)}&nbsp;&divide;&nbsp;4)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exIndT1)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Tranche 2&nbsp;: {Math.max(0, EX_ANCIENNETE - 10)}&nbsp;ans &times; ({euros(EX_SALAIRE)}&nbsp;&divide;&nbsp;3)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exIndT2)}</td>
                </tr>
                <tr className="bg-amber-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">Indemnit&eacute; l&eacute;gale totale</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">{euros(exIndLegale)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Part supra-l&eacute;gale (si aucune)</td>
                  <td className="border border-slate-200 px-4 py-2">0&nbsp;&euro;</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-green-900">Franchise diff&eacute;r&eacute; sp&eacute;cifique</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-green-900">{exFranchise}&nbsp;j (indemnit&eacute; = l&eacute;gale)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Carence totale (hors CP)</td>
                  <td className="border border-slate-200 px-4 py-2">{DELAI_ATTENTE}&nbsp;j seulement</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Avantage licenciement &eacute;co&nbsp;: le plafond de franchise est limit&eacute; &agrave;{' '}
            {ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;j (contre {ARE_PARAMS.franchiseMaxRC}&nbsp;j
            pour une RC), et toute part supra-l&eacute;gale reste modeste dans les licenciements &eacute;co
            classiques.
          </p>
        </section>

        {/* 5. Congé de reclassement senior */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Cong&eacute; de reclassement senior&nbsp;: jusqu&apos;&agrave; 12&nbsp;mois
          </h2>
          <p className="mt-3">
            Dans les entreprises de 1&nbsp;000 salari&eacute;s et plus, le cong&eacute; de reclassement
            peut durer jusqu&apos;&agrave; <strong>12&nbsp;mois</strong> pour les seniors. Pendant
            cette p&eacute;riode, le salari&eacute; per&ccedil;oit une allocation au minimum &eacute;gale
            &agrave; {Math.round(CONGE_RECLASSEMENT_TAUX_MIN * 100)}&nbsp;% de son salaire brut
            ({euros(EX_SALAIRE * CONGE_RECLASSEMENT_TAUX_MIN)}/mois dans l&apos;exemple).
            L&apos;ARE ne commence qu&apos;<strong>apr&egrave;s la fin du cong&eacute; de reclassement</strong>&nbsp;:
            les {ARE_PARAMS.dureeMax55ansEtPlusJours}&nbsp;j d&apos;ARE se d&eacute;comptent &agrave; partir
            de ce moment-l&agrave;, pas de la fin du contrat.
          </p>
        </section>

        {/* 6. Protections PSE seniors */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Protections sp&eacute;cifiques seniors dans le PSE
          </h2>
          <ul className="mt-3 list-disc space-y-3 pl-6">
            <li>
              <strong>Crit&egrave;res d&apos;ordre de licenciement&nbsp;:</strong> l&apos;anciennet&eacute;
              est un crit&egrave;re l&eacute;gal (art. L.1233-5) qui peut prot&eacute;ger les seniors
              tr&egrave;s anciens. En revanche, les salari&eacute;s avec de fortes charges de famille
              ou des difficult&eacute;s de r&eacute;insertion peuvent &ecirc;tre prioritaires au
              licenciement selon l&apos;accord collectif.
            </li>
            <li>
              <strong>Cong&eacute; de reclassement prioritaire&nbsp;:</strong> le PSE doit pr&eacute;voir
              des modalit&eacute;s adapt&eacute;es aux salari&eacute;s seniors, notamment des durables
              plus longues de cong&eacute; de reclassement.
            </li>
            <li>
              <strong>Cellule de reclassement d&eacute;di&eacute;e&nbsp;:</strong> certains PSE pr&eacute;voient
              un accompagnement sp&eacute;cifique pour les seniors (bilan de comp&eacute;tences,
              validation des acquis, acc&egrave;s aux aides &agrave; la cr&eacute;ation d&apos;entreprise).
            </li>
          </ul>
        </section>

        {/* 7. Chronologie */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Chronologie compl&egrave;te
          </h2>
          <div className="mt-4 space-y-2">
            {[
              { etape: '1', label: 'Notification du licenciement &eacute;conomique', detail: 'Pr&eacute;avis (pay&eacute; ou non selon l&apos;accord)' },
              { etape: '2', label: 'D&eacute;but cong&eacute; de reclassement (si applicable)', detail: `Jusqu&apos;${12} mois, ${Math.round(CONGE_RECLASSEMENT_TAUX_MIN * 100)} % du salaire minimum` },
              { etape: '3', label: 'Fin du cong&eacute; de reclassement / fin du contrat', detail: 'Inscription &agrave; France Travail recommand&eacute;e imm&eacute;diatement' },
              { etape: '4', label: `Carence ${DELAI_ATTENTE} jours (+ diff&eacute;r&eacute; CP)`, detail: 'Pas de franchise si indemnit&eacute; = l&eacute;gale' },
              { etape: '5', label: 'D&eacute;but versement ARE', detail: `${euros(exAjMensuelle)}/mois pendant ${Math.round(ARE_PARAMS.dureeMax55ansEtPlusJours / 30)} mois maximum` },
            ].map(({ etape, label, detail }) => (
              <div key={etape} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">{etape}</div>
                <div>
                  <p className="font-semibold text-slate-900" dangerouslySetInnerHTML={{ __html: label }} />
                  <p className="text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: detail }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Impact retraite */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Impact retraite&nbsp;: trimestres valid&eacute;s pendant l&apos;ARE
          </h2>
          <p className="mt-3">
            Chaque 50&nbsp;jours indemnis&eacute;s valident 1&nbsp;trimestre. Un senior de 58 ans
            indemnis&eacute; pendant {ARE_PARAMS.dureeMax55ansEtPlusJours}&nbsp;j (soit{' '}
            {Math.round(ARE_PARAMS.dureeMax55ansEtPlusJours / 30)}&nbsp;mois) valide{' '}
            <strong>{trimestresPourJours(ARE_PARAMS.dureeMax55ansEtPlusJours)}&nbsp;trimestres</strong>,
            ce qui peut lui permettre d&apos;atteindre la dur&eacute;e n&eacute;cessaire pour une
            retraite &agrave; taux plein &agrave; 62 ou 64 ans.
          </p>
        </section>

        {/* 9. Comparatif licenciement éco senior vs RC senior */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Comparatif licenciement &eacute;co senior vs RC senior
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Licenciement &eacute;co senior</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">RC senior</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Dur&eacute;e ARE max (55+)</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.dureeMax55ansEtPlusJours}&nbsp;j</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.dureeMax55ansEtPlusJours}&nbsp;j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Plafond franchise</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">{ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;j (favorable)</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.franchiseMaxRC}&nbsp;j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Initiative</td>
                  <td className="border border-slate-200 px-4 py-2">Employeur (contrainte)</td>
                  <td className="border border-slate-200 px-4 py-2">N&eacute;goci&eacute;e (accord)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemnit&eacute; potentielle</td>
                  <td className="border border-slate-200 px-4 py-2">L&eacute;gale (+ PSE parfois)</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">N&eacute;gociable (souvent plus &eacute;lev&eacute;e)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Cong&eacute; de reclassement</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">Oui (jusqu&apos;&agrave; 12 mois)</td>
                  <td className="border border-slate-200 px-4 py-2 text-slate-500">Non</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">D&eacute;gressivit&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">Exon&eacute;r&eacute; (55+)</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">Exon&eacute;r&eacute; (55+)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 10. FAQ */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">Questions fr&eacute;quentes</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900">Un senior licenci&eacute; &eacute;conomiquement a-t-il droit &agrave; 36 mois de ch&ocirc;mage&nbsp;?</h3>
              <p className="mt-1">
                Oui, pour les 55 ans et plus&nbsp;: {ARE_PARAMS.dureeMax55ansEtPlusJours}&nbsp;j
                ({Math.round(ARE_PARAMS.dureeMax55ansEtPlusJours / 30)}&nbsp;mois) maximum, calcul&eacute;
                selon la r&egrave;gle 1 jour cotis&eacute; = 1 jour indemnis&eacute;.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Le cong&eacute; de reclassement est-il obligatoire pour un senior&nbsp;?</h3>
              <p className="mt-1">
                Il est obligatoire dans les entreprises de 1&nbsp;000 salari&eacute;s et plus. Il dure
                jusqu&apos;&agrave; 12&nbsp;mois pour les seniors, avec une allocation minimum de{' '}
                {Math.round(CONGE_RECLASSEMENT_TAUX_MIN * 100)}&nbsp;% du salaire brut.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Comment le licenciement &eacute;co affecte-t-il la retraite&nbsp;?</h3>
              <p className="mt-1">
                Chaque 50&nbsp;jours d&apos;ARE valident 1 trimestre de retraite.
                {ARE_PARAMS.dureeMax55ansEtPlusJours}&nbsp;j d&apos;ARE donnent{' '}
                {trimestresPourJours(ARE_PARAMS.dureeMax55ansEtPlusJours)}&nbsp;trimestres suppl&eacute;mentaires
                pour la dur&eacute;e d&apos;assurance (pas pour le salaire de r&eacute;f&eacute;rence).
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
        <h2 className="text-xl font-bold text-amber-900">Calculez votre ARE senior</h2>
        <p className="mt-2 text-amber-700">Simulez votre ARE avec votre salaire r&eacute;el et v&eacute;rifiez votre dur&eacute;e maximale.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-lg bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-amber-700">
            Calculateur ARE
          </Link>
          <Link href="/chomage-seniors" className="rounded-lg border border-amber-300 bg-white px-6 py-3 text-sm font-semibold text-amber-700 hover:border-amber-400">
            Ch&ocirc;mage seniors
          </Link>
          <Link href="/licenciement-economique-cadre" className="rounded-lg border border-amber-300 bg-white px-6 py-3 text-sm font-semibold text-amber-700 hover:border-amber-400">
            Licenciement &eacute;co cadre
          </Link>
        </div>
      </div>
    </main>
  )
}
