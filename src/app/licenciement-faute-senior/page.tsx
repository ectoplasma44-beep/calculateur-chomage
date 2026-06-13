import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Licenciement faute grave senior 2025 : ARE 36 mois et recours",
  description: "Senior licencié pour faute grave après 55 ans ? ARE jusqu'à 36 mois maintenue, recours prud'hommes et impact retraite expliqués.",
  alternates: { canonical: 'https://www.monchomage.fr/licenciement-faute-senior' },
}

// ── Exemple : senior 3 500 €/mois, 20 ans ancienneté, 55 ans et plus ─────────
const EX_SALAIRE = 3_500
const EX_ANCIENNETE = 20

const exSjr = Number((EX_SALAIRE / ARE_PARAMS.joursParMoisSJR).toFixed(2))
const exF1 = Number((ARE_PARAMS.tauxFormule1 * exSjr + ARE_PARAMS.partieFix).toFixed(2))
const exF2 = Number((ARE_PARAMS.tauxFormule2 * exSjr).toFixed(2))
const exAjBrute = Math.max(exF1, exF2)
const exAj = Number(
  Math.max(Math.min(exAjBrute, ARE_PARAMS.plafondTauxSJR * exSjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const exAjMensuelle = Number((exAj * ARE_PARAMS.joursParMois).toFixed(2))

// Durée senior 55+ = 36 mois
const dureeJours = ARE_PARAMS.dureeMax55ansEtPlusJours
const dureeMois = Math.round(dureeJours / ARE_PARAMS.joursParMois)

// Indemnités perdues (la faute grave prive de l'indemnité légale et du préavis)
const exAncT1 = Math.min(EX_ANCIENNETE, 10)
const exAncT2 = Math.max(EX_ANCIENNETE - 10, 0)
const exIndLegale = Number((exAncT1 * (EX_SALAIRE / 4) + exAncT2 * (EX_SALAIRE / 3)).toFixed(2))
const exPreavisMois = 3
const exPreavis = Number((EX_SALAIRE * exPreavisMois).toFixed(2))

// Total ARE sur 36 mois
const totalAre = Number((exAjMensuelle * dureeMois).toFixed(2))

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chômage seniors', item: 'https://www.monchomage.fr/chomage-seniors' },
    { '@type': 'ListItem', position: 3, name: 'Licenciement faute grave senior', item: 'https://www.monchomage.fr/licenciement-faute-senior' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Un senior licencié pour faute grave a-t-il droit à 36 mois de chômage ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui. Un salarié de 55 ans et plus licencié pour faute grave conserve intégralement son droit à l'ARE sur ${dureeMois} mois (${dureeJours} jours). La faute grave ne prive pas du chômage — elle prive uniquement de l'indemnité de licenciement et de l'indemnité de préavis. Les règles de durée allongée pour les seniors s'appliquent normalement.`,
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on invoquer la discrimination par l'âge lors d'un licenciement pour faute grave ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, si la faute grave invoquée est disproportionnée ou a été tolérée chez des collègues plus jeunes. La discrimination par l'âge est prohibée par l'article L.1132-1 du Code du travail. Devant les prud'hommes, vous pouvez cumuler la contestation de la qualification de la faute (requalification) et la demande de dommages et intérêts pour discrimination. Le délai de prescription est de 5 ans pour la discrimination, contre 12 mois pour la contestation du licenciement.",
      },
    },
    {
      '@type': 'Question',
      name: "Le licenciement pour faute grave d'un senior impacte-t-il sa retraite ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Non, si vous percevez l'ARE. Pendant les ${dureeMois} mois d'indemnisation, France Travail valide automatiquement des trimestres de retraite (1 trimestre pour 50 jours d'ARE, soit jusqu'à ${Math.floor(dureeJours / 50)} trimestres sur la période). Le motif du licenciement n'a aucune incidence sur la validation des trimestres.`,
      },
    },
  ],
}

export default function PageLicenciementFauteSenior() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="mx-auto max-w-3xl px-4 py-8 space-y-10">
        <nav className="text-sm text-slate-500">
          <Link href="/" className="hover:underline">Accueil</Link>
          <span className="mx-2">&rsaquo;</span>
          <Link href="/chomage-seniors" className="hover:underline">Ch&ocirc;mage seniors</Link>
          <span className="mx-2">&rsaquo;</span>
          <span>Licenciement faute grave senior</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900">
          Licenciement faute grave senior&nbsp;: ARE 36&nbsp;mois et recours 2025
        </h1>

        {/* 1. Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Double enjeu&nbsp;: senior et faute grave</h2>
          <p className="text-slate-700">
            Un licenciement pour faute grave cumule deux inqui&eacute;tudes quand on est senior&nbsp;:
            la perte des indemni&eacute;s d&apos;une part, et l&apos;impact sur la retraite d&apos;autre part.
            La bonne nouvelle&nbsp;: <strong>l&apos;ARE est int&eacute;gralement maintenue</strong> apr&egrave;s une faute grave,
            et la dur&eacute;e d&apos;indemnisation allonge jusqu&apos;&agrave; <strong>{dureeMois}&nbsp;mois</strong> pour
            les 55&nbsp;ans et plus. Le motif du licenciement n&apos;a aucun effet sur ces droits.
          </p>
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
            <strong>Ce que vous perdez</strong>&nbsp;: l&apos;indemni&eacute; de licenciement et l&apos;indemni&eacute; de pr&eacute;avis.
            <br />
            <strong>Ce que vous conservez</strong>&nbsp;: l&apos;ARE sur {dureeMois}&nbsp;mois, les trimestres retraite valid&eacute;s, le droit aux prud&apos;hommes.
          </div>
        </section>

        {/* 2. ARE maintenue senior */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">ARE maintenue apr&egrave;s faute grave&nbsp;: {dureeMois}&nbsp;mois pour les 55&nbsp;ans et plus</h2>
          <p className="text-slate-700">
            L&apos;assurance ch&ocirc;mage est une protection collective ind&eacute;pendante du motif de rupture.
            Un licenciement pour faute grave ou lourde ouvre les m&ecirc;mes droits ARE qu&apos;un licenciement
            &eacute;conomique ou une rupture conventionnelle, sous r&eacute;serve des conditions d&apos;affiliation
            (6&nbsp;mois de travail sur les 24&nbsp;derniers mois).
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Tranche d&apos;&acirc;ge</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Dur&eacute;e maximale</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2">Moins de 50&nbsp;ans</td>
                  <td className="border border-slate-200 px-4 py-2">{Math.round(ARE_PARAMS.dureeMaxMoins50ansJours / ARE_PARAMS.joursParMois)}&nbsp;mois ({ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;j)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2">50&nbsp;ans et plus</td>
                  <td className="border border-slate-200 px-4 py-2">{Math.round(ARE_PARAMS.dureeMax50ansEtPlusJours / ARE_PARAMS.joursParMois)}&nbsp;mois ({ARE_PARAMS.dureeMax50ansEtPlusJours}&nbsp;j)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2">53&ndash;54&nbsp;ans</td>
                  <td className="border border-slate-200 px-4 py-2">{Math.round(ARE_PARAMS.dureeMax53a54ansJours / ARE_PARAMS.joursParMois)}&nbsp;mois ({ARE_PARAMS.dureeMax53a54ansJours}&nbsp;j)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50 font-bold text-blue-800">
                  <td className="border border-slate-200 px-4 py-2">55&nbsp;ans et plus</td>
                  <td className="border border-slate-200 px-4 py-2">{dureeMois}&nbsp;mois ({dureeJours}&nbsp;j) ← votre situation</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 text-sm">
            De plus, la d&eacute;gressivit&eacute; de l&apos;ARE (r&eacute;duction de 30&nbsp;% au 7&egrave;me mois) ne
            s&apos;applique pas aux assur&eacute;s de {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans et plus&nbsp;: votre
            mensualit&eacute; reste stable pendant toute la dur&eacute;e d&apos;indemnisation.
          </p>
        </section>

        {/* 3. Calcul SJR */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul ARE senior&nbsp;: exemple {euros(EX_SALAIRE)}/mois, {EX_ANCIENNETE}&nbsp;ans d&apos;anciennet&eacute;
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Salaire journalier de r&eacute;f&eacute;rence (SJR)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(EX_SALAIRE)} &divide; {ARE_PARAMS.joursParMoisSJR} = <strong>{euros(exSjr)}/j</strong></td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule 1 (40,4&nbsp;% SJR + partie fixe)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exSjr)} &times; {ARE_PARAMS.tauxFormule1} + {euros(ARE_PARAMS.partieFix)} = {euros(exF1)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule 2 (57&nbsp;% SJR)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exSjr)} &times; {ARE_PARAMS.tauxFormule2} = {euros(exF2)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">AJ retenue (maximum des deux formules)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-700">{euros(exAj)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">ARE mensuelle (stable — pas de d&eacute;gressivit&eacute; 55+)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-green-700">{euros(exAjMensuelle)}/mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Dur&eacute;e d&apos;indemnisation</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold">{dureeMois}&nbsp;mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Total ARE sur {dureeMois}&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-green-700">{euros(totalAre)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Ce que le senior perd */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Ce que le senior perd avec la faute grave</h2>
          <p className="text-slate-700">
            La faute grave prive de deux types d&apos;indemni&eacute;s. Voici le calcul pour notre exemple
            ({euros(EX_SALAIRE)}/mois, {EX_ANCIENNETE}&nbsp;ans d&apos;anciennet&eacute;)&nbsp;:
          </p>
          <div className="overflow-x-auto rounded-xl border border-red-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-red-50">
                <tr>
                  <th className="border border-red-200 px-4 py-2 text-left font-semibold text-red-800">Indemni&eacute;</th>
                  <th className="border border-red-200 px-4 py-2 text-left font-semibold text-red-800">Calcul</th>
                  <th className="border border-red-200 px-4 py-2 text-left font-semibold text-red-800">Montant perdu</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-red-50">
                  <td className="border border-red-200 px-4 py-2">Indemni&eacute; l&eacute;gale de licenciement</td>
                  <td className="border border-red-200 px-4 py-2">
                    ({Math.min(EX_ANCIENNETE, 10)}&nbsp;ans &times; {euros(EX_SALAIRE / 4)})
                    {' '}+ ({Math.max(EX_ANCIENNETE - 10, 0)}&nbsp;ans &times; {euros(Number((EX_SALAIRE / 3).toFixed(2)))})
                  </td>
                  <td className="border border-red-200 px-4 py-2 font-bold text-red-700">{euros(exIndLegale)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-red-50">
                  <td className="border border-red-200 px-4 py-2">Indemni&eacute; compensatrice de pr&eacute;avis ({exPreavisMois}&nbsp;mois convention cadre)</td>
                  <td className="border border-red-200 px-4 py-2">{exPreavisMois} &times; {euros(EX_SALAIRE)}</td>
                  <td className="border border-red-200 px-4 py-2 font-bold text-red-700">{euros(exPreavis)}</td>
                </tr>
                <tr className="bg-red-100">
                  <td className="border border-red-200 px-4 py-2 font-bold">Total perdu (faute grave vs faute simple)</td>
                  <td className="border border-red-200 px-4 py-2"></td>
                  <td className="border border-red-200 px-4 py-2 font-bold text-red-800">{euros(exIndLegale + exPreavis)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 text-sm">
            L&apos;indemni&eacute; compensatrice de cong&eacute;s pay&eacute;s (CP non pris) reste due m&ecirc;me en cas
            de faute grave. Seule la faute lourde (intention de nuire) prive &eacute;galement des CP.
          </p>
        </section>

        {/* 5. Recours prud'hommes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Recours prud&apos;hommes&nbsp;: double angle pour un senior</h2>
          <p className="text-slate-700">
            Face &agrave; un licenciement pour faute grave, un senior dispose de deux axes de contestation
            distincts devant le conseil de prud&apos;hommes&nbsp;:
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <h3 className="mb-2 font-semibold text-amber-900">Contestation de la faute grave</h3>
              <ul className="space-y-1 text-sm text-amber-800">
                <li>&bull; D&eacute;lai&nbsp;: <strong>12&nbsp;mois</strong> &agrave; compter de la notification</li>
                <li>&bull; Objectif&nbsp;: requalification en faute simple ou licenciement sans cause r&eacute;elle</li>
                <li>&bull; Gain possible&nbsp;: indemni&eacute; l&eacute;gale + pr&eacute;avis + D&amp;I</li>
                <li>&bull; L&apos;ARE peru en cours de proc&eacute;dure n&apos;est pas remise en cause</li>
              </ul>
            </div>
            <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
              <h3 className="mb-2 font-semibold text-purple-900">Discrimination par l&apos;&acirc;ge</h3>
              <ul className="space-y-1 text-sm text-purple-800">
                <li>&bull; D&eacute;lai&nbsp;: <strong>5&nbsp;ans</strong> (prescription discriminations)</li>
                <li>&bull; Conditions&nbsp;: faute non retenue chez des coll&egrave;gues plus jeunes, pression &agrave; la d&eacute;mission</li>
                <li>&bull; Gain possible&nbsp;: dommages et int&eacute;r&ecirc;ts suppl&eacute;mentaires</li>
                <li>&bull; Cumulable avec la contestation de la qualification</li>
              </ul>
            </div>
          </div>
          <p className="text-slate-700">
            En cas de requalification, les sommes obtenues (indemni&eacute; de licenciement, pr&eacute;avis,
            D&amp;I) peuvent &ecirc;tre cumul&eacute;es avec l&apos;ARE per&ccedil;ue. Certaines sommes seront d&eacute;duites
            des indemnit&eacute;s Unédic sur la p&eacute;riode concern&eacute;e — votre conseil vous pr&eacute;cisera le calcul.
          </p>
        </section>

        {/* 6. Impact retraite */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Impact retraite&nbsp;: {dureeMois}&nbsp;mois d&apos;ARE = trimestres valid&eacute;s</h2>
          <p className="text-slate-700">
            Pendant toute la dur&eacute;e d&apos;indemnisation, France Travail verse des cotisations
            vieillesse et valide automatiquement des trimestres de retraite.
            R&egrave;gle&nbsp;: <strong>50&nbsp;jours d&apos;ARE = 1&nbsp;trimestre valid&eacute;</strong>.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">D&eacute;part retraite vis&eacute;</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Mois d&apos;ARE restant</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Trimestres valid&eacute;s</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2">D&egrave;s la fin de l&apos;ARE ({dureeMois}&nbsp;mois)</td>
                  <td className="border border-slate-200 px-4 py-2">{dureeMois}&nbsp;mois complets</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold">{Math.floor(dureeJours / 50)}&nbsp;trimestres</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2">Apr&egrave;s 24&nbsp;mois d&apos;ARE</td>
                  <td className="border border-slate-200 px-4 py-2">24&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold">{Math.floor(24 * 30 / 50)}&nbsp;trimestres</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2">Apr&egrave;s 12&nbsp;mois d&apos;ARE</td>
                  <td className="border border-slate-200 px-4 py-2">12&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold">{Math.floor(12 * 30 / 50)}&nbsp;trimestres</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 text-sm">
            Ces trimestres s&apos;ajoutent &agrave; vos trimestres cotis&eacute;s. Le motif du licenciement
            (faute grave) n&apos;a aucune incidence sur la validation des trimestres.
          </p>
        </section>

        {/* 7. Clause de non-concurrence */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Clause de non-concurrence senior</h2>
          <p className="text-slate-700">
            M&ecirc;me en cas de licenciement pour faute grave, une clause de non-concurrence pr&eacute;vue
            au contrat ou &agrave; la convention collective reste valable — sauf si l&apos;employeur y
            renonce express&eacute;ment dans la lettre de licenciement ou dans les d&eacute;lais pr&eacute;vus
            par la convention.
          </p>
          <ul className="ml-4 space-y-2 text-slate-700 list-disc">
            <li>La contrepartie financi&egrave;re est due m&ecirc;me apr&egrave;s une faute grave (jurisprudence constante).</li>
            <li>
              Pour un senior, la contrepartie est souvent plus &eacute;lev&eacute;e (expertise m&eacute;tier reconnue,
              r&eacute;seau &agrave; fort impact) — v&eacute;rifiez votre contrat et votre convention collective.
            </li>
            <li>
              Si l&apos;employeur n&apos;a pas renforc&eacute; la clause, elle peut &ecirc;tre contest&eacute;e si la
              contrepartie est insuffisante ou si le p&eacute;rim&egrave;tre g&eacute;ographique est abusif.
            </li>
            <li>
              La contrepartie de non-concurrence est cumulable avec l&apos;ARE (pas de d&eacute;duction,
              sauf si elle exc&egrave;de certains seuils selon la convention).
            </li>
          </ul>
        </section>

        {/* 8. Comparatif faute grave vs licenciement éco */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Faute grave senior vs licenciement &eacute;conomique senior</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Faute grave</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Licenciement &eacute;conomique</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">ARE</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Maintenue, {dureeMois}&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Maintenue, {dureeMois}&nbsp;mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemni&eacute; de licenciement</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">&times; Non due</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">&check; Due (major&eacute;e 25&nbsp;%)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Pr&eacute;avis</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">&times; Non pay&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">&check; Pay&eacute; ou ex&eacute;cut&eacute;</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Diff&eacute;r&eacute; ARE</td>
                  <td className="border border-slate-200 px-4 py-2">CP uniquement (quelques jours)</td>
                  <td className="border border-slate-200 px-4 py-2">CP + diff&eacute;r&eacute; sp&eacute;cifique (max {ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;j)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Contestation possible</td>
                  <td className="border border-slate-200 px-4 py-2">Oui (12&nbsp;mois)</td>
                  <td className="border border-slate-200 px-4 py-2">Oui (12&nbsp;mois)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Impact retraite</td>
                  <td className="border border-slate-200 px-4 py-2">Identique</td>
                  <td className="border border-slate-200 px-4 py-2">Identique</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 text-sm">
            La principale diff&eacute;rence est la perte des indemni&eacute;s (licenciement + pr&eacute;avis),
            qui peut repr&eacute;senter une somme tr&egrave;s significative apr&egrave;s 20&nbsp;ans d&apos;anciennet&eacute;
            — raison suppl&eacute;mentaire de contester la qualification devant les prud&apos;hommes.
          </p>
        </section>

        {/* 9. FAQ */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Questions fr&eacute;quentes</h2>
          <div className="space-y-5">
            {faqJsonLd.mainEntity.map((faq, i) => (
              <div key={i} className="border-b border-slate-200 pb-4">
                <h3 className="mb-2 font-semibold text-slate-900">{faq.name}</h3>
                <p className="text-slate-600">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. CTA */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Calculer votre ARE en ligne</h2>
          <p className="text-slate-600 text-sm">
            Estimez votre indemnisation exacte en quelques secondes avec nos outils gratuits.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Calculateur ARE
            </Link>
            <Link href="/chomage-seniors" className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
              Ch&ocirc;mage seniors
            </Link>
            <Link href="/licenciement-faute-cadre" className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
              Licenciement faute grave cadre
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
