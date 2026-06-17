import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Licenciement faute grave cadre 2026 : avez-vous droit a l'ARE ?",
  description: "Cadre licencie pour faute grave ou lourde ? Conditions ARE, perte des indemnites et recours expliques. Ce que peu de cadres savent.",
  alternates: { canonical: 'https://www.monchomage.fr/licenciement-faute-cadre' },
}

// ── Exemple : cadre 5 000 €/mois, 8 ans ancienneté ──────────────────────────
const EX_SALAIRE = 5_000
const EX_ANCIENNETE = 8

const exSjr = Number((EX_SALAIRE / ARE_PARAMS.joursParMoisSJR).toFixed(2))
const exF1 = Number((ARE_PARAMS.tauxFormule1 * exSjr + ARE_PARAMS.partieFix).toFixed(2))
const exF2 = Number((ARE_PARAMS.tauxFormule2 * exSjr).toFixed(2))
const exAjBrute = Math.max(exF1, exF2)
const exAj = Number(
  Math.max(Math.min(exAjBrute, ARE_PARAMS.plafondTauxSJR * exSjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const exAjMensuelle = Number((exAj * ARE_PARAMS.joursParMois).toFixed(2))
const exAjApresDegressivite = Number(
  Math.max(exAj * ARE_PARAMS.coeffDegressivite, ARE_PARAMS.seuilDegressiviteAJ).toFixed(2)
)
const exAjMensuelleApres = Number((exAjApresDegressivite * ARE_PARAMS.joursParMois).toFixed(2))
const exDegressivite = exAj > ARE_PARAMS.seuilDegressiviteAJ
const tauxReduction = Math.round((1 - ARE_PARAMS.coeffDegressivite) * 100)

// Indemnité légale perdue (calcul pour comparaison)
const exIndT1 = Math.min(EX_ANCIENNETE, 10) * (EX_SALAIRE / 4)
const exIndLegale = Number(exIndT1.toFixed(2))
// Indemnité de préavis cadre perdue (3 mois conventionnels en général)
const exPreavisMois = 3
const exPreavis = Number((EX_SALAIRE * exPreavisMois).toFixed(2))

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chomage cadre', item: 'https://www.monchomage.fr/chomage-cadre' },
    { '@type': 'ListItem', position: 3, name: 'Licenciement faute grave cadre', item: 'https://www.monchomage.fr/licenciement-faute-cadre' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Un cadre licencie pour faute grave a-t-il droit au chomage ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui. Le licenciement pour faute grave prive le cadre de son indemnite legale de licenciement et de son indemnite de preavis, mais n'affecte pas le droit a l'ARE. Des lors que le cadre totalise au moins ${ARE_PARAMS.dureeMinJours} jours d'affiliation sur les ${ARE_PARAMS.moisRefMoins55ans} derniers mois et s'inscrit a France Travail, il percoit l'ARE normalement. Un cadre a ${euros(EX_SALAIRE)}/mois percevra environ ${euros(exAjMensuelle)}/mois d'ARE.`,
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on contester un licenciement pour faute grave aux prud'hommes ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, dans un delai de 12 mois a compter de la notification du licenciement. Si le conseil de prud'hommes requalifie la faute grave en licenciement sans cause reelle et serieuse, le cadre peut recuperer son indemnite de licenciement, son indemnite de preavis et des dommages et interets. L'ARE percue entre temps n'est pas remise en cause — seul un trop-percu eventuel apres versement de dommages et interets peut etre recalcule par France Travail.",
      },
    },
    {
      '@type': 'Question',
      name: "La clause de non-concurrence s'applique-t-elle apres une faute grave cadre ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, le licenciement pour faute grave ne dispense pas automatiquement de la clause de non-concurrence. L'employeur doit expressement lever la clause dans la lettre de licenciement ou dans un document distinct remis a la date de rupture. Si la clause est maintenue, l'employeur reste tenu de verser la contrepartie financiere prevue, meme en cas de faute grave.",
      },
    },
  ],
}

export default function LicenciementFauteCadre() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}
        <Link href="/chomage-cadre" className="hover:underline">Ch&ocirc;mage cadre</Link>
        {' '}&rsaquo;{' '}Licenciement faute grave cadre
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Licenciement faute grave cadre&nbsp;: ARE, indemnit&eacute;s et recours 2026
      </h1>

      <div className="mt-8 space-y-10 text-slate-700">

        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Enjeux sp&eacute;cifiques pour un cadre licenci&eacute; pour faute
          </h2>
          <p className="mt-3">
            Pour un cadre, un licenciement pour faute grave ou lourde a des cons&eacute;quences
            financi&egrave;res plus lourdes que pour un salari&eacute; non-cadre&nbsp;: l&apos;indemnit&eacute;
            l&eacute;gale de licenciement est plus &eacute;lev&eacute;e (et donc davantage perdue), le pr&eacute;avis
            conventionnel est souvent de 3 mois, et une <strong>clause de non-concurrence</strong> est
            fr&eacute;quente dans les contrats cadres. Pourtant, un point essentiel est souvent
            ignor&eacute;&nbsp;: <strong>le droit &agrave; l&apos;ARE est maintenu</strong>, que la faute
            soit grave ou lourde. Les seules pertes certaines concernent les indemnit&eacute;s contractuelles
            — et encore, elles peuvent &ecirc;tre r&eacute;cup&eacute;r&eacute;es aux prud&apos;hommes si
            la qualification est contest&eacute;e avec succ&egrave;s.
          </p>
        </section>

        {/* 2. Faute grave vs faute lourde */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Faute grave vs faute lourde&nbsp;: tableau comparatif
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Faute grave</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Faute lourde</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">D&eacute;finition</td>
                  <td className="border border-slate-200 px-4 py-2">Manquement rendant impossible le maintien dans l&apos;entreprise, sans intention de nuire</td>
                  <td className="border border-slate-200 px-4 py-2">Intention d&eacute;lib&eacute;r&eacute;e de causer un pr&eacute;judice &agrave; l&apos;employeur</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Exemples cadre</td>
                  <td className="border border-slate-200 px-4 py-2">Abus de confiance, concurrence d&eacute;loyale, violation de confidentialit&eacute;, harc&egrave;lement</td>
                  <td className="border border-slate-200 px-4 py-2">Sabotage d&eacute;lib&eacute;r&eacute;, d&eacute;tournement de clients avec intention, divulgation de secrets en vue de nuire</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemnit&eacute; l&eacute;gale</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700 font-medium">Perdue</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700 font-medium">Perdue</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemnit&eacute; de pr&eacute;avis</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700 font-medium">Perdue</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700 font-medium">Perdue</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemnit&eacute;s cong&eacute;s pay&eacute;s</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">Conserv&eacute;e</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700 font-medium">Perdue (sauf jurisprudence)</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium text-green-900">ARE (ch&ocirc;mage)</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-bold">Ouverte</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-bold">Ouverte</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. ARE après faute grave */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            ARE apr&egrave;s licenciement faute grave cadre&nbsp;: calcul
          </h2>
          <p className="mt-3">
            Le licenciement pour faute grave ou lourde n&apos;a <strong>aucun impact sur le droit
            &agrave; l&apos;ARE</strong>. Seule la carence congés payés s&apos;applique (différé CP),
            pas de délai de carence motif supplémentaire. Le calcul de l&apos;ARE est strictement
            identique à celui d&apos;un licenciement classique.
          </p>
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
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule&nbsp;1 ({Math.round(ARE_PARAMS.tauxFormule1 * 100)}&nbsp;% SJR + {euros(ARE_PARAMS.partieFix)})</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exF1)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule&nbsp;2 ({Math.round(ARE_PARAMS.tauxFormule2 * 100)}&nbsp;% SJR — retenue)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exF2)}/j</td>
                </tr>
                <tr className="bg-amber-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">ARE journali&egrave;re (mois 1-6)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">{euros(exAj)}/j</td>
                </tr>
                <tr className="bg-amber-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">ARE mensuelle (mois 1-6)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">{euros(exAjMensuelle)}/mois</td>
                </tr>
                {exDegressivite && (
                  <>
                    <tr className="odd:bg-white even:bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium">D&eacute;gressivit&eacute; &agrave; partir du {ARE_PARAMS.joursAvantDegressivite + 1}e jour (-{tauxReduction}&nbsp;%)</td>
                      <td className="border border-slate-200 px-4 py-2">{euros(exAjApresDegressivite)}/j</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="border border-slate-200 px-4 py-2 font-bold text-orange-900">ARE mensuelle apr&egrave;s d&eacute;gressivit&eacute;</td>
                      <td className="border border-slate-200 px-4 py-2 font-bold text-orange-900">{euros(exAjMensuelleApres)}/mois</td>
                    </tr>
                  </>
                )}
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Dur&eacute;e maximale (si affiliation = {ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;j cotis&eacute;s)</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;j (12 mois)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Carence applicable&nbsp;: uniquement le diff&eacute;r&eacute; cong&eacute;s pay&eacute;s
            (variable selon les CP acquis) et le d&eacute;lai d&apos;attente de 7 jours. Pas de
            franchise motif suppl&eacute;mentaire pour licenciement pour faute.
          </p>
        </section>

        {/* 4. Indemnités perdues vs conservées */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Indemnit&eacute;s perdues vs conserv&eacute;es — cadre {EX_ANCIENNETE}&nbsp;ans, {euros(EX_SALAIRE)}/mois
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Indemnit&eacute; / droit</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Faute grave</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Montant indicatif</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemnit&eacute; l&eacute;gale de licenciement</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700 font-semibold">Perdue</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">{euros(exIndLegale)} (calcul l&eacute;gal {EX_ANCIENNETE}&nbsp;ans)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemnit&eacute; compensatrice de pr&eacute;avis</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700 font-semibold">Perdue</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">{euros(exPreavis)} ({exPreavisMois}&nbsp;mois conventionnels)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemnit&eacute; cong&eacute;s pay&eacute;s acquis</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-semibold">Conserv&eacute;e</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Variable (selon CP restants)</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium text-green-900">ARE (allocation ch&ocirc;mage)</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-bold">Conserv&eacute;e</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-bold">{euros(exAjMensuelle)}/mois</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium text-green-900">Mutuelle (portabilit&eacute; 12 mois)</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-semibold">Conserv&eacute;e</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Si affiliation &ge; 1 mois</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium text-green-900">Epargne salariale (PEE, PERCO)</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-semibold">Conserv&eacute;e</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">D&eacute;blocage possible (cas l&eacute;gaux)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Clause de non-concurrence */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Clause de non-concurrence cadre apr&egrave;s faute grave
          </h2>
          <p className="mt-3">
            Contrairement &agrave; une id&eacute;e r&eacute;pandue, le licenciement pour faute
            grave <strong>ne dispense pas automatiquement</strong> de la clause de non-concurrence.
            L&apos;employeur doit expressement lever la clause dans la lettre de licenciement
            ou dans un document distinct remis au cadre &agrave; la date de rupture du contrat.
          </p>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm">
              <strong className="text-red-900">Si la clause est maintenue&nbsp;:</strong>
              <p className="mt-1 text-red-800">
                L&apos;employeur est tenu de verser la <strong>contrepartie financi&egrave;re</strong>
                pr&eacute;vue dans le contrat, m&ecirc;me en cas de faute grave. Cette contrepartie
                est g&eacute;n&eacute;ralement de 25 &agrave; 50&nbsp;% du salaire mensuel pour la
                dur&eacute;e de la clause. Elle est cumulable avec l&apos;ARE.
              </p>
            </div>
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm">
              <strong className="text-green-900">Si la clause est lev&eacute;e dans la lettre&nbsp;:</strong>
              <p className="mt-1 text-green-800">
                Le cadre est libre de travailler chez un concurrent imm&eacute;diatement et
                ne per&ccedil;oit pas la contrepartie financi&egrave;re. V&eacute;rifiez toujours
                la formulation exacte de la lettre de licenciement.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Contester aux prud'hommes */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Contester le licenciement pour faute grave aux prud&apos;hommes
          </h2>
          <p className="mt-3">
            La requalification d&apos;une faute grave en licenciement sans cause r&eacute;elle et
            s&eacute;rieuse est fr&eacute;quente en conseil de prud&apos;hommes&nbsp;: les juges
            v&eacute;rifient que les faits invoqu&eacute;s sont r&eacute;els, imputables au salari&eacute;
            et suffisamment graves pour justifier un d&eacute;part imm&eacute;diat sans indemnit&eacute;.
          </p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">1</div>
              <div>
                <p className="font-semibold text-slate-900">D&eacute;lai de recours&nbsp;: 12 mois</p>
                <p className="text-slate-600">A compter de la notification du licenciement (art. L.1471-1 C. trav.).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">2</div>
              <div>
                <p className="font-semibold text-slate-900">Si requalification r&eacute;ussie</p>
                <p className="text-slate-600">
                  R&eacute;cup&eacute;ration de l&apos;indemnit&eacute; de licenciement, l&apos;indemnit&eacute;
                  de pr&eacute;avis et &eacute;ventuellement des dommages et int&eacute;r&ecirc;ts
                  (min. 1 mois de salaire si anciennet&eacute; &ge; 2 ans, plafond barème Macron).
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">3</div>
              <div>
                <p className="font-semibold text-slate-900">Impact sur l&apos;ARE apr&egrave;s victoire</p>
                <p className="text-slate-600">
                  L&apos;ARE per&ccedil;ue n&apos;est pas remise en cause. Si des dommages et
                  int&eacute;r&ecirc;ts sont vers&eacute;s, France Travail peut recalculer un
                  diff&eacute;r&eacute; sp&eacute;cifique sur la p&eacute;riode restante, mais
                  les versements d&eacute;j&agrave; re&ccedil;us ne sont pas r&eacute;clam&eacute;s.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Calcul exemple complet */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Ce que perd un cadre licenci&eacute; pour faute grave vs licenciement classique
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Poste</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Licenciement classique</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Faute grave</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemnit&eacute; l&eacute;gale ({EX_ANCIENNETE}&nbsp;ans)</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">{euros(exIndLegale)}</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">0 &euro;</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Pr&eacute;avis ({exPreavisMois} mois)</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">{euros(exPreavis)}</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">0 &euro;</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Franchise ARE (diff&eacute;r&eacute; indemnit&eacute; RC)</td>
                  <td className="border border-slate-200 px-4 py-2">Possible (si RC)</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Aucune (licenciement)</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium text-green-900">ARE mensuelle</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-bold">{euros(exAjMensuelle)}/mois</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-bold">{euros(exAjMensuelle)}/mois</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium text-red-900">Perte brute vs licenciement classique</td>
                  <td className="border border-slate-200 px-4 py-2">—</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-red-900">{euros(exIndLegale + exPreavis)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Indemnit&eacute; l&eacute;gale calcul&eacute;e sur la base de {EX_ANCIENNETE}&nbsp;ans d&apos;anciennet&eacute;
            &times; (salaire &divide; 4). Pr&eacute;avis&nbsp;: {exPreavisMois}&nbsp;mois conventionnels SYNTEC / accord de branche cadres.
            Ces montants peuvent &ecirc;tre r&eacute;cup&eacute;r&eacute;s aux prud&apos;hommes en cas de requalification.
          </p>
        </section>

        {/* 8. Comparatif faute grave vs licenciement éco vs RC */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Comparatif&nbsp;: faute grave vs licenciement &eacute;co vs rupture conventionnelle
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Faute grave</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Licenciement &eacute;co</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Rupture conv.</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemnit&eacute; l&eacute;gale</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">Perdue</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Vers&eacute;e</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">N&eacute;goci&eacute;e</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Pr&eacute;avis</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">Perdu</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Vers&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2 text-slate-500">Non applicable</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">ARE</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-semibold">Ouverte</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-semibold">Ouverte</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-semibold">Ouverte</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Franchise ARE</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Diff&eacute;r&eacute; CP uniquement</td>
                  <td className="border border-slate-200 px-4 py-2">Diff&eacute;r&eacute; CP (plafond {ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;j supra-l&eacute;gale)</td>
                  <td className="border border-slate-200 px-4 py-2">Diff&eacute;r&eacute; CP + franchise (plafond {ARE_PARAMS.franchiseMaxRC}&nbsp;j)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Non-concurrence</td>
                  <td className="border border-slate-200 px-4 py-2">Si maintenue dans la lettre</td>
                  <td className="border border-slate-200 px-4 py-2">Si maintenue</td>
                  <td className="border border-slate-200 px-4 py-2">Si maintenue dans la convention</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Recours</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Prud&apos;hommes 12 mois</td>
                  <td className="border border-slate-200 px-4 py-2">Prud&apos;hommes 12 mois</td>
                  <td className="border border-slate-200 px-4 py-2">Contestation convention 12 mois</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 9. FAQ */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">Questions fr&eacute;quentes</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900">
                Un cadre licenci&eacute; pour faute grave a-t-il droit au ch&ocirc;mage&nbsp;?
              </h3>
              <p className="mt-1">
                Oui. Le licenciement pour faute grave ouvre le droit &agrave; l&apos;ARE d&egrave;s lors que
                le cadre totalise au moins {ARE_PARAMS.dureeMinJours}&nbsp;jours d&apos;affiliation. Un cadre
                &agrave; {euros(EX_SALAIRE)}/mois percevra {euros(exAjMensuelle)}/mois d&apos;ARE, identiquement
                &agrave; un licenciement ordinaire.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Peut-on contester un licenciement pour faute grave aux prud&apos;hommes&nbsp;?
              </h3>
              <p className="mt-1">
                Oui, dans les 12 mois suivant la notification. En cas de requalification, le cadre
                r&eacute;cup&egrave;re l&apos;indemnit&eacute; l&eacute;gale, le pr&eacute;avis et
                &eacute;ventuellement des dommages et int&eacute;r&ecirc;ts selon le bar&egrave;me Macron.
                L&apos;ARE per&ccedil;ue entre temps est conserv&eacute;e.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                La clause de non-concurrence s&apos;applique-t-elle apr&egrave;s une faute grave cadre&nbsp;?
              </h3>
              <p className="mt-1">
                Oui, sauf si l&apos;employeur la l&egrave;ve express&eacute;ment dans la lettre de
                licenciement. Si elle est maintenue, la contrepartie financi&egrave;re est obligatoire
                et cumulable avec l&apos;ARE.
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
        <h2 className="text-xl font-bold text-amber-900">Calculez votre ARE de cadre</h2>
        <p className="mt-2 text-amber-700">
          Estimez votre allocation et votre d&eacute;gressivit&eacute; avec votre salaire r&eacute;el.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-lg bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-amber-700">
            Calculateur ARE
          </Link>
          <Link href="/chomage-cadre" className="rounded-lg border border-amber-300 bg-white px-6 py-3 text-sm font-semibold text-amber-700 hover:border-amber-400">
            Ch&ocirc;mage cadre
          </Link>
          <Link href="/licenciement-faute" className="rounded-lg border border-amber-300 bg-white px-6 py-3 text-sm font-semibold text-amber-700 hover:border-amber-400">
            Licenciement pour faute
          </Link>
        </div>
      </div>
    </main>
  )
}
