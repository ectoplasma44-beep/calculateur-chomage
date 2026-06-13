import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "RC senior 55 ans 2025 : ARE 36 mois et impact retraite",
  description: "Rupture conventionnelle apres 55 ans ? ARE jusqu'a 36 mois, trimestres retraite et arbitrage RC vs maintien poste. Simulez votre cas.",
  alternates: { canonical: 'https://www.monchomage.fr/rupture-conventionnelle-senior' },
}

const DELAI_ATTENTE = 7
const TRIMESTRES_PAR_50J = 1 // 1 trimestre retraite validé tous les 50 jours d'ARE

// ── Exemple : senior 57 ans, 3 500 €/mois, 20 ans ancienneté, RC 30 000 € ──
const EX_SALAIRE = 3_500
const EX_ANCIENNETE = 20
const EX_INDEMNITE_RC = 30_000
const exSjr = Number((EX_SALAIRE / ARE_PARAMS.joursParMoisSJR).toFixed(2))
const exF1 = Number((ARE_PARAMS.tauxFormule1 * exSjr + ARE_PARAMS.partieFix).toFixed(2))
const exF2 = Number((ARE_PARAMS.tauxFormule2 * exSjr).toFixed(2))
const exAjBrute = Math.max(exF1, exF2)
const exAjCapSjr = ARE_PARAMS.plafondTauxSJR * exSjr
const exAj = Number(
  Math.max(Math.min(exAjBrute, exAjCapSjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const exAjMensuelle = Number((exAj * ARE_PARAMS.joursParMois).toFixed(2))

// Indemnité légale RC — tranche 1 (≤ 10 ans) + tranche 2 (> 10 ans)
const exIndLegaleT1 = Math.min(EX_ANCIENNETE, 10) * (EX_SALAIRE / 4)
const exIndLegaleT2 = Math.max(0, EX_ANCIENNETE - 10) * (EX_SALAIRE / 3)
const exIndLegale = Number((exIndLegaleT1 + exIndLegaleT2).toFixed(2))
const exSupraLegale = Number(Math.max(0, EX_INDEMNITE_RC - exIndLegale).toFixed(2))
const exFranchiseBrute = Number((exSupraLegale / exSjr).toFixed(1))
const exFranchise = Math.min(Math.round(exFranchiseBrute), ARE_PARAMS.franchiseMaxRC)
const exCarenceTotal = DELAI_ATTENTE + exFranchise // hors CP

// Dégressivité : AJ = 66.50 < seuil 92.57 → non applicable dans cet exemple
const exDegressivite = exAj > ARE_PARAMS.seuilDegressiviteAJ

// Trimestres retraite par durée ARE
function trimestresPourJours(jours: number): number {
  return Math.floor(jours / 50)
}

const SCENARIOS_RETRAITE = [
  { label: '12 mois', jours: 360 },
  { label: '24 mois', jours: 720 },
  { label: '36 mois', jours: 1080 },
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Rupture conventionnelle', item: 'https://www.monchomage.fr/rupture-conventionnelle' },
    { '@type': 'ListItem', position: 3, name: 'RC senior', item: 'https://www.monchomage.fr/rupture-conventionnelle-senior' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Un senior de 57 ans a-t-il plus de chomage qu'un jeune actif ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui. Les 55 ans et plus beneficient d'une duree maximale d'ARE de ${ARE_PARAMS.dureeMax55ansEtPlusJours} jours (${Math.round(ARE_PARAMS.dureeMax55ansEtPlusJours / 30)} mois) contre ${ARE_PARAMS.dureeMaxMoins50ansJours} jours (${Math.round(ARE_PARAMS.dureeMaxMoins50ansJours / 30)} mois) pour les moins de 50 ans. La periode de reference pour l'affiliation est egalement allongee a ${ARE_PARAMS.moisRefPlus55ans} mois au lieu de ${ARE_PARAMS.moisRefMoins55ans} mois.`,
      },
    },
    {
      '@type': 'Question',
      name: "Les periodes de chomage sont-elles comptees pour la retraite ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui. Chaque periode de 50 jours indemnises par l'ARE valide 1 trimestre de retraite (art. R.351-12 CSS). Un senior de 57 ans indemnise pendant ${ARE_PARAMS.dureeMax55ansEtPlusJours} jours valide ${trimestresPourJours(ARE_PARAMS.dureeMax55ansEtPlusJours)} trimestres supplementaires. Attention : ces trimestres comptent pour la duree d'assurance (condition d'acces a la retraite) mais le salaire de reference de la pension reste calcule sur les 25 meilleures annees.`,
      },
    },
    {
      '@type': 'Question',
      name: "Vaut-il mieux faire une rupture conventionnelle a 57 ans ou attendre ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La decision depend de nombreux facteurs : le montant de l'indemnite RC negociee, votre ARE mensuelle, votre pension de retraite future et vos projets professionnels. En general, si vous pouvez negocier une indemnite supra-legale importante et que votre ARE est suffisante pour attendre sereinement la retraite, la RC a 57 ans est une option viable. Mais une simulation complete avec un conseiller retraite est recommandee.",
      },
    },
  ],
}

export default function RuptureConventionnelleSenior() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}
        <Link href="/rupture-conventionnelle" className="hover:underline">Rupture conventionnelle</Link>
        {' '}&rsaquo;{' '}RC senior
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Rupture conventionnelle senior&nbsp;: ARE, retraite et droits apr&egrave;s 55 ans
      </h1>

      <div className="mt-8 space-y-10 text-slate-700">

        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Senior et rupture conventionnelle&nbsp;: un arbitrage strat&eacute;gique
          </h2>
          <p className="mt-3">
            Pour un salari&eacute; de 55 ans et plus, la rupture conventionnelle (RC) n&apos;est pas
            qu&apos;une simple s&eacute;paration amiable&nbsp;: c&apos;est un choix strat&eacute;gique
            qui engage les droits ARE, l&apos;impact sur la pension de retraite et la trajectoire
            professionnelle des ann&eacute;es suivantes. Les seniors b&eacute;n&eacute;ficient
            de droits ARE sensiblement all&ocirc;ng&eacute;s ({Math.round(ARE_PARAMS.dureeMax55ansEtPlusJours / 30)}&nbsp;mois
            maximum) et d&apos;une p&eacute;riode de r&eacute;f&eacute;rence &eacute;largie pour
            l&apos;affiliation.
          </p>
        </section>

        {/* 2. Conditions et durée allongée */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Dur&eacute;e ARE all&ocirc;ng&eacute;e pour les seniors
          </h2>
          <p className="mt-3">
            La dur&eacute;e maximale d&apos;indemnisation varie selon l&apos;&acirc;ge au moment
            de la fin du contrat&nbsp;:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Tranche d&apos;&acirc;ge</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Dur&eacute;e max ARE</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">P&eacute;riode r&eacute;f&eacute;rence</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Moins de 50 ans</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;j ({Math.round(ARE_PARAMS.dureeMaxMoins50ansJours / 30)}&nbsp;mois)</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.moisRefMoins55ans}&nbsp;mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">50 &agrave; 52 ans</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.dureeMax50ansEtPlusJours}&nbsp;j ({Math.round(ARE_PARAMS.dureeMax50ansEtPlusJours / 30)}&nbsp;mois)</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.moisRefMoins55ans}&nbsp;mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">53 &agrave; 54 ans</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.dureeMax53a54ansJours}&nbsp;j ({Math.round(ARE_PARAMS.dureeMax53a54ansJours / 30)}&nbsp;mois)</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.moisRefMoins55ans}&nbsp;mois</td>
                </tr>
                <tr className="bg-amber-50 font-bold">
                  <td className="border border-slate-200 px-4 py-2 text-amber-900">55 ans et plus</td>
                  <td className="border border-slate-200 px-4 py-2 text-amber-900">{ARE_PARAMS.dureeMax55ansEtPlusJours}&nbsp;j ({Math.round(ARE_PARAMS.dureeMax55ansEtPlusJours / 30)}&nbsp;mois)</td>
                  <td className="border border-slate-200 px-4 py-2 text-amber-900">{ARE_PARAMS.moisRefPlus55ans}&nbsp;mois</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Calcul SJR senior */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul ARE&nbsp;: senior 57 ans, {euros(EX_SALAIRE)}/mois, {EX_ANCIENNETE}&nbsp;ans d&apos;anciennet&eacute;
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Salaire brut mensuel</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(EX_SALAIRE)}</td>
                </tr>
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
                <tr className="bg-amber-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">Dur&eacute;e maximale</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">{ARE_PARAMS.dureeMax55ansEtPlusJours}&nbsp;j ({Math.round(ARE_PARAMS.dureeMax55ansEtPlusJours / 30)}&nbsp;mois)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            D&eacute;gressivit&eacute;&nbsp;: {exDegressivite ? 'applicable' : 'non applicable'} ici — l&apos;ARE de {euros(exAj)}/j est {exDegressivite ? 'sup&eacute;rieure' : 'inf&eacute;rieure'} au seuil de {euros(ARE_PARAMS.seuilDegressiviteAJ)}/j.
            {!exDegressivite && ' La d&eacute;gressivit&eacute; ne s&apos;applique pas dans cet exemple.'}
          </p>
        </section>

        {/* 4. Franchise RC senior */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Franchise RC senior&nbsp;: calcul avec indemnit&eacute; de {euros(EX_INDEMNITE_RC)}
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Tranche 1&nbsp;: {Math.min(EX_ANCIENNETE, 10)}&nbsp;ans &times; ({euros(EX_SALAIRE)}&nbsp;&divide;&nbsp;4)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exIndLegaleT1)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Tranche 2&nbsp;: {Math.max(0, EX_ANCIENNETE - 10)}&nbsp;ans &times; ({euros(EX_SALAIRE)}&nbsp;&divide;&nbsp;3)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exIndLegaleT2)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemnit&eacute; l&eacute;gale totale</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{euros(exIndLegale)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemnit&eacute; RC n&eacute;goci&eacute;e</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(EX_INDEMNITE_RC)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Part supra-l&eacute;gale</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exSupraLegale)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Franchise brute = {euros(exSupraLegale)} &divide; {euros(exSjr)}</td>
                  <td className="border border-slate-200 px-4 py-2">{exFranchiseBrute}&nbsp;j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Plafond franchise RC</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.franchiseMaxRC}&nbsp;j</td>
                </tr>
                <tr className="bg-amber-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">Franchise appliqu&eacute;e</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">{exFranchise}&nbsp;j</td>
                </tr>
                <tr className="bg-amber-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">Carence totale (hors CP)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">{DELAI_ATTENTE}&nbsp;j + {exFranchise}&nbsp;j = {exCarenceTotal}&nbsp;j</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Dégressivité */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            D&eacute;gressivit&eacute;&nbsp;: les seniors sont-ils exon&eacute;r&eacute;s&nbsp;?
          </h2>
          <p className="mt-3">
            Depuis le 1er avril 2025, la d&eacute;gressivit&eacute; s&apos;applique aux demandeurs
            d&apos;emploi <strong>de moins de {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans</strong> dont
            l&apos;ARE journali&egrave;re d&eacute;passe {euros(ARE_PARAMS.seuilDegressiviteAJ)}/j,
            soit un salaire mensuel de referc d&apos;environ 4&nbsp;940&nbsp;&euro;/mois. Les seniors
            de 55 ans et plus sont donc <strong>exon&eacute;r&eacute;s de la d&eacute;gressivit&eacute;</strong>&nbsp;:
            leur ARE reste stable tout au long de la p&eacute;riode d&apos;indemnisation.
          </p>
        </section>

        {/* 6. Impact retraite */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Impact sur la retraite&nbsp;: trimestres valid&eacute;s pendant l&apos;ARE
          </h2>
          <p className="mt-3">
            Chaque p&eacute;riode de 50&nbsp;jours indemnis&eacute;s par l&apos;ARE valide{' '}
            {TRIMESTRES_PAR_50J}&nbsp;trimestre de retraite (assurance vieillesse, article R.351-12
            du Code de la S&eacute;curit&eacute; sociale). Ces trimestres comptent pour atteindre
            la dur&eacute;e n&eacute;cessaire &agrave; la retraite &agrave; taux plein, mais
            <strong> pas pour le calcul du salaire annuel moyen</strong> (25 meilleures ann&eacute;es).
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Dur&eacute;e ARE</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Jours indemnis&eacute;s</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Trimestres valid&eacute;s</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">ARE per&ccedil;ue ({euros(exAjMensuelle)}/mois)</th>
                </tr>
              </thead>
              <tbody>
                {SCENARIOS_RETRAITE.map(({ label, jours }) => (
                  <tr key={label} className="odd:bg-white even:bg-slate-50">
                    <td className="border border-slate-200 px-4 py-2 font-medium">{label}</td>
                    <td className="border border-slate-200 px-4 py-2">{jours}&nbsp;j</td>
                    <td className="border border-slate-200 px-4 py-2 font-semibold text-green-700">{trimestresPourJours(jours)}&nbsp;trimestres</td>
                    <td className="border border-slate-200 px-4 py-2">{euros(exAjMensuelle * (jours / ARE_PARAMS.joursParMois))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Arbitrage 57 ans vs maintien */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            RC &agrave; 57 ans vs maintien jusqu&apos;&agrave; 62 ans&nbsp;: comparaison
          </h2>
          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Avertissement&nbsp;:</strong> cette simulation est illustrative et ne constitue
            pas un conseil financier. Les calculs de pension de retraite d&eacute;pendent de la
            carri&egrave;re compl&egrave;te et n&eacute;cessitent une simulation aupr&egrave;s de
            votre caisse de retraite.
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Sc&eacute;nario</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Revenus 57-62 ans</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Trimestres suppl.</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Remarques</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">RC &agrave; 57 ans + ARE 36 mois</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exAjMensuelle)}/mois pendant 36 mois</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{trimestresPourJours(ARE_PARAMS.dureeMax55ansEtPlusJours)}&nbsp;trimestres</td>
                  <td className="border border-slate-200 px-4 py-2 text-slate-600">+ indemnit&eacute; RC {euros(EX_INDEMNITE_RC)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Maintien en poste jusqu&apos;&agrave; 62 ans</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(EX_SALAIRE)}/mois pendant 60 mois</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">20 trimestres cotis&eacute;s</td>
                  <td className="border border-slate-200 px-4 py-2 text-slate-600">Salaire plus &eacute;lev&eacute; mais pas d&apos;indemnit&eacute;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. Cumul ARE + activité réduite */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Cumul ARE + activit&eacute; r&eacute;duite pour les seniors
          </h2>
          <p className="mt-3">
            Les seniors en ARE peuvent exercer une activit&eacute; r&eacute;duite (emploi &agrave;
            temps partiel, missions, auto-entrepreunariat) tout en conservant une partie de leur ARE.
            Le dispositif d&apos;activit&eacute; r&eacute;duite permet de cumuler revenus d&apos;activit&eacute;
            et ARE, avec un calcul d&eacute;gressif selon les heures travaill&eacute;es. Cela peut
            constituer une transition douce vers la retraite.
          </p>
        </section>

        {/* 9. Comparatif senior vs non-senior */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Comparatif senior (55+) vs non-senior
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">55 ans et plus</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Moins de 50 ans</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Dur&eacute;e ARE maximale</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold text-amber-700">{ARE_PARAMS.dureeMax55ansEtPlusJours}&nbsp;j ({Math.round(ARE_PARAMS.dureeMax55ansEtPlusJours / 30)}&nbsp;mois)</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;j ({Math.round(ARE_PARAMS.dureeMaxMoins50ansJours / 30)}&nbsp;mois)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">P&eacute;riode de r&eacute;f&eacute;rence</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold text-amber-700">{ARE_PARAMS.moisRefPlus55ans}&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.moisRefMoins55ans}&nbsp;mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">D&eacute;gressivit&eacute; ARE</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold text-green-700">Exon&eacute;r&eacute; (55+)</td>
                  <td className="border border-slate-200 px-4 py-2">Applicable si AJ &gt; {euros(ARE_PARAMS.seuilDegressiviteAJ)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Trimestres retraite valid&eacute;s</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold text-amber-700">Jusqu&apos;&agrave; {trimestresPourJours(ARE_PARAMS.dureeMax55ansEtPlusJours)}&nbsp;trimestres</td>
                  <td className="border border-slate-200 px-4 py-2">Jusqu&apos;&agrave; {trimestresPourJours(ARE_PARAMS.dureeMaxMoins50ansJours)}&nbsp;trimestres</td>
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
              <h3 className="font-semibold text-slate-900">Un senior de 57 ans touche-t-il plus de ch&ocirc;mage&nbsp;?</h3>
              <p className="mt-1">
                Oui. Les 55 ans et plus ont droit &agrave; {ARE_PARAMS.dureeMax55ansEtPlusJours}&nbsp;j
                ({Math.round(ARE_PARAMS.dureeMax55ansEtPlusJours / 30)}&nbsp;mois) d&apos;ARE maximum,
                contre {ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;j ({Math.round(ARE_PARAMS.dureeMaxMoins50ansJours / 30)}&nbsp;mois)
                pour les moins de 50 ans. La p&eacute;riode de r&eacute;f&eacute;rence est &eacute;galement
                plus longue ({ARE_PARAMS.moisRefPlus55ans}&nbsp;mois).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Les p&eacute;riodes de ch&ocirc;mage comptent-elles pour la retraite&nbsp;?</h3>
              <p className="mt-1">
                Oui. Chaque 50&nbsp;jours indemnis&eacute;s valident 1 trimestre de retraite.
                36&nbsp;mois d&apos;ARE donnent droit &agrave;{' '}
                {trimestresPourJours(ARE_PARAMS.dureeMax55ansEtPlusJours)}&nbsp;trimestres suppl&eacute;mentaires
                pour la dur&eacute;e d&apos;assurance, sans impact sur le salaire de r&eacute;f&eacute;rence.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Vaut-il mieux faire une RC &agrave; 57 ans ou attendre&nbsp;?</h3>
              <p className="mt-1">
                La d&eacute;cision d&eacute;pend du montant de l&apos;indemnit&eacute; RC, de votre
                ARE, de votre pension future et de vos projets. Une simulation aupr&egrave;s de votre
                caisse de retraite (CNAV, Agirc-Arrco) est indispensable avant tout choix.
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
        <h2 className="text-xl font-bold text-amber-900">Calculez votre ARE senior</h2>
        <p className="mt-2 text-amber-700">Simulez votre ARE et votre franchise RC avec votre salaire r&eacute;el.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-lg bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-amber-700">
            Calculateur ARE
          </Link>
          <Link href="/chomage-seniors" className="rounded-lg border border-amber-300 bg-white px-6 py-3 text-sm font-semibold text-amber-700 hover:border-amber-400">
            Ch&ocirc;mage seniors
          </Link>
          <Link href="/degressivite-chomage" className="rounded-lg border border-amber-300 bg-white px-6 py-3 text-sm font-semibold text-amber-700 hover:border-amber-400">
            D&eacute;gressivit&eacute; ARE
          </Link>
        </div>
      </div>
    </main>
  )
}
