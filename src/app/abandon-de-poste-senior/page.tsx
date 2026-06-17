import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Abandon de poste senior 2026 : ARE possible après 55 ans ?",
  description: "Senior qui abandonne son poste ? Depuis 2023, présomption de démission — mais des recours existent. ARE et impact retraite expliqués.",
  alternates: { canonical: 'https://www.monchomage.fr/abandon-de-poste-senior' },
}

// ── Exemple : senior 3 200 €/mois, 18 ans ancienneté ─────────────────────────
const EX_SALAIRE = 3_200
const EX_ANCIENNETE = 18

const exSjr = Number((EX_SALAIRE / ARE_PARAMS.joursParMoisSJR).toFixed(2))
const exF1 = Number((ARE_PARAMS.tauxFormule1 * exSjr + ARE_PARAMS.partieFix).toFixed(2))
const exF2 = Number((ARE_PARAMS.tauxFormule2 * exSjr).toFixed(2))
const exAjBrute = Math.max(exF1, exF2)
const exAj = Number(
  Math.max(Math.min(exAjBrute, ARE_PARAMS.plafondTauxSJR * exSjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const exAjMensuelle = Number((exAj * ARE_PARAMS.joursParMois).toFixed(2))
const dureeJours = ARE_PARAMS.dureeMax55ansEtPlusJours
const dureeMois = Math.round(dureeJours / ARE_PARAMS.joursParMois)
const totalAre = Number((exAjMensuelle * dureeMois).toFixed(2))

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chômage seniors', item: 'https://www.monchomage.fr/chomage-seniors' },
    { '@type': 'ListItem', position: 3, name: 'Abandon de poste senior', item: 'https://www.monchomage.fr/abandon-de-poste-senior' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Un senior peut-il toucher le chômage après un abandon de poste ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pas automatiquement depuis la loi d'avril 2023. L'abandon de poste entraîne une présomption de démission après mise en demeure de l'employeur. Le senior ne touche alors pas l'ARE. Toutefois, si l'abandon est causé par une situation légitime (harcèlement, inaptitude, modification unilatérale du contrat), les droits ARE peuvent être ouverts via une prise d'acte ou un licenciement pour inaptitude.",
      },
    },
    {
      '@type': 'Question',
      name: "Vaut-il mieux faire une RC ou abandonner son poste quand on est senior ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `La rupture conventionnelle est toujours préférable pour un senior. Elle garantit l'ARE (${dureeMois} mois à 55 ans et plus), l'indemnité spécifique de RC (au moins équivalente à l'indemnité légale), et évite toute période sans revenus. L'abandon de poste depuis 2023 risque de déclencher une présomption de démission et la perte de tous les droits. À ${EX_ANCIENNETE} ans d'ancienneté, la RC est la voie à privilégier.`,
      },
    },
    {
      '@type': 'Question',
      name: "L'abandon de poste d'un senior impacte-t-il sa retraite ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui fortement. En cas de présomption de démission, le senior ne perçoit pas l'ARE et ne valide donc pas de trimestres de retraite pendant cette période. À l'inverse, si les droits ARE sont ouverts (prise d'acte requalifiée en licenciement, inaptitude), France Travail valide automatiquement des trimestres : 1 trimestre pour 50 jours d'ARE indemnisés.",
      },
    },
  ],
}

export default function PageAbandonDePosteSenior() {
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
          <span>Abandon de poste senior</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900">
          Abandon de poste senior&nbsp;: ARE, pr&eacute;somption de d&eacute;mission et recours 2026
        </h1>

        {/* 1. Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Senior et abandon de poste&nbsp;: enjeux amplifi&eacute;s depuis 2023</h2>
          <p className="text-slate-700">
            Depuis la loi march&eacute; du travail d&apos;avril 2023, l&apos;abandon de poste ne permet
            plus d&apos;obtenir le ch&ocirc;mage automatiquement. Pour un senior, cet enjeu est encore
            plus critique&nbsp;: perdre les droits ARE signifie perdre jusqu&apos;&agrave; <strong>{dureeMois}&nbsp;mois
            d&apos;indemnisation</strong>, mais aussi perdre des <strong>trimestres de retraite</strong> essentiels
            &agrave; l&apos;approche de la fin de carri&egrave;re.
          </p>
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
            <strong>Avertissement&nbsp;:</strong> Depuis avril 2023, abandonner son poste = pr&eacute;somption de d&eacute;mission.
            Pas d&apos;ARE en cas de d&eacute;mission ordinaire. Pour un senior &agrave; {EX_ANCIENNETE}&nbsp;ans d&apos;anciennet&eacute;,
            les sommes en jeu peuvent d&eacute;passer {euros(totalAre)} d&apos;ARE et plusieurs trimestres de retraite.
          </div>
        </section>

        {/* 2. Présomption de démission */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">La pr&eacute;somption de d&eacute;mission (loi 2023) &mdash; m&eacute;canisme</h2>
          <p className="text-slate-700">
            La loi n&deg;&nbsp;2023-270 du 14 avril 2023 a cr&eacute;&eacute; un m&eacute;canisme en 3 &eacute;tapes&nbsp;:
          </p>
          <ol className="ml-4 space-y-3 text-slate-700 list-decimal">
            <li>
              Le salari&eacute; abandonne son poste (absence non justifi&eacute;e).
            </li>
            <li>
              L&apos;employeur envoie une mise en demeure de reprise du travail (lettre RAR ou remise en main propre).
              D&eacute;lai accord&eacute;&nbsp;: <strong>minimum 15&nbsp;jours</strong>.
            </li>
            <li>
              Sans reprise ni r&eacute;ponse&nbsp;: pr&eacute;somption de d&eacute;mission. Le salari&eacute; est consid&eacute;r&eacute;
              comme d&eacute;missionnaire — <strong>pas d&apos;ARE</strong>, pas d&apos;indemni&eacute; de licenciement.
            </li>
          </ol>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-700">
              <strong>Cas o&ugrave; la pr&eacute;somption peut &ecirc;tre renvers&eacute;e&nbsp;:</strong>
            </p>
            <ul className="mt-2 ml-4 space-y-1 text-sm text-slate-600 list-disc">
              <li>Probl&egrave;me de sant&eacute; d&ucirc;ment justifi&eacute; (arr&ecirc;t m&eacute;decin)</li>
              <li>Manquement grave de l&apos;employeur &agrave; ses obligations</li>
              <li>Situation de violence ou de danger</li>
              <li>Exercice d&apos;un mandat &eacute;lectif n&eacute;cessitant absence imm&eacute;diate</li>
            </ul>
          </div>
        </section>

        {/* 3. Cas où les droits ARE sont ouverts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Cas o&ugrave; l&apos;abandon de poste senior ouvre des droits ARE</h2>
          <p className="text-slate-700">
            Certaines situations permettent de transformer un abandon de poste en rupture
            ouvrant des droits &agrave; l&apos;ARE&nbsp;:
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">Harc&egrave;lement moral prouv&eacute;</h3>
              <p className="text-sm text-green-800">
                Si l&apos;abandon de poste r&eacute;sulte d&apos;un harc&egrave;lement moral, une <strong>prise
                d&apos;acte</strong> devant les prud&apos;hommes peut &ecirc;tre requalifi&eacute;e en
                licenciement sans cause r&eacute;elle — ARE + indemni&eacute;s.
              </p>
            </div>
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">Inaptitude m&eacute;dicale</h3>
              <p className="text-sm text-green-800">
                Si la m&eacute;decine du travail d&eacute;clare le salari&eacute; inapte, l&apos;employeur
                doit proposer un reclassement ou licencier pour inaptitude — <strong>ARE + indemni&eacute;
                de licenciement</strong> (major&eacute;e pour inaptitude).
              </p>
            </div>
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">Modification unilat&eacute;rale du contrat</h3>
              <p className="text-sm text-green-800">
                Si l&apos;employeur a modifi&eacute; un &eacute;l&eacute;ment essentiel du contrat sans accord
                (poste, salaire, lieu), la prise d&apos;acte peut aboutir &agrave; un licenciement
                sans cause r&eacute;elle.
              </p>
            </div>
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">Non-paiement du salaire</h3>
              <p className="text-sm text-green-800">
                Le non-paiement du salaire constitue un manquement grave de l&apos;employeur.
                La prise d&apos;acte est g&eacute;n&eacute;ralement requalifi&eacute;e en licenciement —
                ARE maintenue.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Stratégie alternative */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Strat&eacute;gie recommand&eacute;e pour un senior&nbsp;: ne pas abandonner son poste</h2>
          <p className="text-slate-700">
            Pour pr&eacute;server les {dureeMois}&nbsp;mois d&apos;ARE et les trimestres de retraite,
            les alternatives &agrave; l&apos;abandon de poste sont bien plus avantageuses&nbsp;:
          </p>
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 space-y-3">
            <div>
              <h3 className="font-semibold text-blue-900">Option 1 (pr&eacute;f&eacute;r&eacute;e)&nbsp;: Rupture conventionnelle</h3>
              <p className="mt-1 text-sm text-blue-800">
                N&eacute;gocier une RC avec l&apos;employeur. ARE garantie, indemni&eacute; sp&eacute;cifique RC,
                pas de conflit. Possible m&ecirc;me si les relations sont tendues.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Option 2 (situation intenable)&nbsp;: Prise d&apos;acte</h3>
              <p className="mt-1 text-sm text-blue-800">
                Si l&apos;employeur commet un manquement grave, prendre acte de la rupture par
                courrier RAR. Le juge prud&apos;homal tranche — si le manquement est prouv&eacute;,
                requalification en licenciement sans cause r&eacute;elle et ARE ouverte.
                D&eacute;lai de proc&eacute;dure&nbsp;: 18 &agrave; 24&nbsp;mois en moyenne.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Option 3 (inaptitude)&nbsp;: Arr&ecirc;t maladie + visite m&eacute;decine du travail</h3>
              <p className="mt-1 text-sm text-blue-800">
                En cas de probl&egrave;me de sant&eacute; li&eacute; au travail (burn-out, harc&egrave;lement),
                un arr&ecirc;t m&eacute;decin suivi d&apos;une d&eacute;claration d&apos;inaptitude par la
                m&eacute;decine du travail permet d&apos;obtenir un licenciement pour inaptitude avec ARE.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Calcul ARE si droits ouverts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            ARE si droits ouverts&nbsp;: exemple {euros(EX_SALAIRE)}/mois, {EX_ANCIENNETE}&nbsp;ans d&apos;anciennet&eacute;
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">SJR</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(EX_SALAIRE)} &divide; {ARE_PARAMS.joursParMoisSJR} = <strong>{euros(exSjr)}/j</strong></td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule 1</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exSjr)} &times; {ARE_PARAMS.tauxFormule1} + {euros(ARE_PARAMS.partieFix)} = {euros(exF1)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule 2</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exSjr)} &times; {ARE_PARAMS.tauxFormule2} = {euros(exF2)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">AJ retenue</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-700">{euros(exAj)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">ARE mensuelle (stable, pas de d&eacute;gressivit&eacute; 55+)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-green-700">{euros(exAjMensuelle)}/mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Dur&eacute;e maximale (55&nbsp;ans et plus)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold">{dureeMois}&nbsp;mois ({dureeJours}&nbsp;j)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Total ARE sur {dureeMois}&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-green-700">{euros(totalAre)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Impact retraite */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Impact retraite&nbsp;: abandon de poste vs ARE</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Situation</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Trimestres valid&eacute;s</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Revenus de remplacement</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2">Abandon de poste → pr&eacute;somption d&eacute;mission</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700 font-medium">0&nbsp;trimestre</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700 font-medium">0&nbsp;€</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2">Prise d&apos;acte → licenciement → ARE {dureeMois}&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">{Math.floor(dureeJours / 50)}&nbsp;trimestres</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">{euros(totalAre)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2">RC → ARE {dureeMois}&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">{Math.floor(dureeJours / 50)}&nbsp;trimestres</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">{euros(totalAre)} + indemni&eacute; RC</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Comparatif */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Comparatif pour un senior&nbsp;: abandon vs RC vs prise d&apos;acte</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Abandon de poste</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">RC</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Prise d&apos;acte</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">ARE</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">&times; Tr&egrave;s risqu&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">&check; Garantie</td>
                  <td className="border border-slate-200 px-4 py-2 text-amber-700">Si requalifi&eacute;e</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemni&eacute;s</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">&times; Aucune</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">&check; ISRC minimum</td>
                  <td className="border border-slate-200 px-4 py-2 text-amber-700">Si requalifi&eacute;e</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">D&eacute;lai avant ARE</td>
                  <td className="border border-slate-200 px-4 py-2">Imm&eacute;diat (si refus d&eacute;mission)</td>
                  <td className="border border-slate-200 px-4 py-2">D&eacute;lai carence + CP</td>
                  <td className="border border-slate-200 px-4 py-2">18&ndash;24&nbsp;mois (proc&eacute;dure)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Risque</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">Tr&egrave;s &eacute;lev&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Minimal</td>
                  <td className="border border-slate-200 px-4 py-2 text-amber-700">Moyen (al&eacute;a judiciaire)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Impact retraite</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">0&nbsp;trimestre</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">{Math.floor(dureeJours / 50)}&nbsp;trimestres</td>
                  <td className="border border-slate-200 px-4 py-2 text-amber-700">{Math.floor(dureeJours / 50)}&nbsp;trimestres si ARE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. FAQ */}
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

        {/* 9. CTA */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Calculer votre ARE en ligne</h2>
          <p className="text-slate-600 text-sm">
            Estimez votre indemnisation exacte selon votre situation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Calculateur ARE
            </Link>
            <Link href="/chomage-seniors" className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
              Ch&ocirc;mage seniors
            </Link>
            <Link href="/abandon-de-poste" className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
              Abandon de poste
            </Link>
            <Link href="/rupture-conventionnelle-senior" className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
              RC senior
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
