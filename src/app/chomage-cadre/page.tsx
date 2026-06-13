import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Chomage cadre 2025 : combien touchez-vous vraiment ?",
  description: "Cadre licencie ou en RC ? Calculez votre ARE exacte : SJR, degressivite a 7 mois, plafond. Exemple chiffre pour 5 000 euros/mois.",
  alternates: {
    canonical: 'https://www.monchomage.fr/chomage-cadre',
  },
}

// ── Calculs dérivés uniquement de ARE_PARAMS ────────────────────────────────
const SALAIRE_EXEMPLE = 5000
const sjrExemple = SALAIRE_EXEMPLE / ARE_PARAMS.joursParMoisSJR
const f1 = ARE_PARAMS.tauxFormule1 * sjrExemple + ARE_PARAMS.partieFix
const f2 = ARE_PARAMS.tauxFormule2 * sjrExemple
const ajBrut = Math.max(f1, f2)
const ajPlafonnee = Math.min(ajBrut, ARE_PARAMS.plafondTauxSJR * sjrExemple)
const ajExemple = Number(Math.max(ajPlafonnee, ARE_PARAMS.allocationMinimale).toFixed(2))
const ajMensuelleExemple = Number((ajExemple * ARE_PARAMS.joursParMois).toFixed(2))

const ajApresDegressivite = Number(
  Math.max(ajExemple * ARE_PARAMS.coeffDegressivite, ARE_PARAMS.seuilDegressiviteAJ).toFixed(2)
)
const ajMensuelleApres = Number((ajApresDegressivite * ARE_PARAMS.joursParMois).toFixed(2))
const joursDebutDegressivite = ARE_PARAMS.joursAvantDegressivite + 1
const tauxReduction = Math.round((1 - ARE_PARAMS.coeffDegressivite) * 100)

// Tableau mois par mois (12 mois) pour le cadre à 5000 €/mois
const tableauMois = Array.from({ length: 12 }, (_, i) => {
  const mois = i + 1
  const joursDepuis = mois * ARE_PARAMS.joursParMois
  const degressif = joursDepuis > ARE_PARAMS.joursAvantDegressivite
  const aj = degressif ? ajApresDegressivite : ajExemple
  const mensuel = Number((aj * ARE_PARAMS.joursParMois).toFixed(2))
  return { mois, aj, mensuel, degressif }
})

// Tableau comparatif cadre vs non-cadre
const SALAIRE_NON_CADRE = 2500
const sjrNonCadre = SALAIRE_NON_CADRE / ARE_PARAMS.joursParMoisSJR
const f1Nc = ARE_PARAMS.tauxFormule1 * sjrNonCadre + ARE_PARAMS.partieFix
const f2Nc = ARE_PARAMS.tauxFormule2 * sjrNonCadre
const ajBrutNc = Math.max(f1Nc, f2Nc)
const ajNonCadre = Number(
  Math.max(Math.min(ajBrutNc, ARE_PARAMS.plafondTauxSJR * sjrNonCadre), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const ajMensuelleNonCadre = Number((ajNonCadre * ARE_PARAMS.joursParMois).toFixed(2))
const degressiviteNonCadre = ajNonCadre > ARE_PARAMS.seuilDegressiviteAJ

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chomage cadre', item: 'https://www.monchomage.fr/chomage-cadre' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Un cadre touche-t-il plus de chomage qu'un non-cadre ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui, dans la quasi-totalite des cas, car l'ARE est proportionnelle au salaire anterieur. Un cadre gagnant ${euros(SALAIRE_EXEMPLE)}/mois brut percoit environ ${euros(ajMensuelleExemple)}/mois, contre ${euros(ajMensuelleNonCadre)}/mois pour un salaire de ${euros(SALAIRE_NON_CADRE)}/mois. Le plafond de l'assiette est fixe a ${euros(ARE_PARAMS.plafondSalaireRefMensuel)}/mois, soit ${ARE_PARAMS.plafondSalaireRefMensuel / ARE_PARAMS.joursParMoisSJR} euros de SJR maximum.`,
      },
    },
    {
      '@type': 'Question',
      name: "La degressivite s'applique-t-elle a tous les cadres ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Non. La degressivite s'applique uniquement si deux conditions sont reunies : avoir moins de ${ARE_PARAMS.ageLimiteDegressivite} ans et avoir une allocation journaliere superieure a ${euros(ARE_PARAMS.seuilDegressiviteAJ)}/jour. Un cadre de ${ARE_PARAMS.ageLimiteDegressivite} ans ou plus est totalement exonere. Un cadre plus jeune dont l'AJ est inferieure au seuil n'est pas non plus reduit effectivement.`,
      },
    },
    {
      '@type': 'Question',
      name: "Comment est calcule le plafond ARE pour un cadre ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Le SJR (salaire journalier de reference) est calcule sur les salaires bruts des ${ARE_PARAMS.moisRefMoins55ans} derniers mois (${ARE_PARAMS.moisRefPlus55ans} mois pour les 55 ans et plus), plafonnes a ${euros(ARE_PARAMS.plafondSalaireRefMensuel)}/mois. L'allocation est ensuite plafonnee a ${Math.round(ARE_PARAMS.plafondTauxSJR * 100)}% du SJR. Ainsi, meme pour un cadre a tres haut salaire, l'ARE ne peut exceder ce ratio du SJR.`,
      },
    },
  ],
}

export default function ChomageCADRE() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}Ch&ocirc;mage cadre
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Ch&ocirc;mage des cadres&nbsp;: calcul ARE, d&eacute;gressivit&eacute; et sp&eacute;cificit&eacute;s 2025
      </h1>

      <div className="mt-8 space-y-10 text-slate-700">

        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Sp&eacute;cificit&eacute;s de l&apos;ARE pour les cadres
          </h2>
          <p className="mt-3">
            Les cadres b&eacute;n&eacute;ficient du m&ecirc;me r&eacute;gime d&apos;assurance ch&ocirc;mage
            que les autres salari&eacute;s&nbsp;: les r&egrave;gles de calcul de l&apos;ARE sont
            identiques. La diff&eacute;rence r&eacute;side dans le niveau de salaire&nbsp;: un SJR
            (salaire journalier de r&eacute;f&eacute;rence) plus &eacute;lev&eacute; produit une
            allocation plus haute, qui d&eacute;passe fr&eacute;quemment le seuil de d&eacute;gressivit&eacute;
            de {euros(ARE_PARAMS.seuilDegressiviteAJ)}/jour.
          </p>
          <p className="mt-3">
            Deux points cl&eacute;s distinguent en pratique la situation des cadres&nbsp;:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>
              <strong>Plafond de l&apos;assiette&nbsp;:</strong> les salaires pris en compte sont
              plafonn&eacute;s &agrave; {euros(ARE_PARAMS.plafondSalaireRefMensuel)}/mois, soit
              environ 4 fois le Plafond de la S&eacute;curit&eacute; Sociale (PSS). Un cadre
              gagnant davantage ne cotise et ne per&ccedil;oit des droits que sur cette base.
            </li>
            <li>
              <strong>D&eacute;gressivit&eacute; fr&eacute;quente&nbsp;:</strong> en raison de
              salaires plus &eacute;lev&eacute;s, la quasi-totalit&eacute; des cadres indemnises
              d&eacute;passent le seuil de d&eacute;gressivit&eacute;. L&apos;allocation est r&eacute;duite
              de {tauxReduction}&nbsp;% au {joursDebutDegressivite}e jour d&apos;indemnisation.
            </li>
          </ul>
        </section>

        {/* 2. Conditions d'accès */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Conditions d&apos;acc&egrave;s &agrave; l&apos;ARE pour un cadre
          </h2>
          <p className="mt-3">
            Les conditions sont les m&ecirc;mes que pour tout salari&eacute;&nbsp;:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Perte involontaire d&apos;emploi</strong> (licenciement, rupture conventionnelle,
              fin de CDD, d&eacute;mission pour motif l&eacute;gitime).{' '}
              <Link href="/rupture-conventionnelle-cadre" className="text-blue-700 underline hover:text-blue-900">
                Rupture conventionnelle cadre &rarr;
              </Link>
              {' '}&mdash;{' '}
              <Link href="/licenciement-economique-cadre" className="text-blue-700 underline hover:text-blue-900">
                Licenciement &eacute;conomique cadre &rarr;
              </Link>
              {' '}&mdash;{' '}
              <Link href="/licenciement-faute-cadre" className="text-blue-700 underline hover:text-blue-900">
                Licenciement faute grave cadre &rarr;
              </Link>
            </li>
            <li>
              <strong>Affiliation minimale</strong> de {ARE_PARAMS.dureeMinJours}&nbsp;jours (6&nbsp;mois)
              sur les {ARE_PARAMS.moisRefMoins55ans}&nbsp;derniers mois ({ARE_PARAMS.moisRefPlus55ans}
              &nbsp;mois pour les 55 ans et plus).
            </li>
            <li>
              <strong>Inscription comme demandeur d&apos;emploi</strong> aupr&egrave;s de France Travail
              dans les 12&nbsp;mois suivant la fin du contrat.
            </li>
            <li>
              Ne pas avoir atteint l&apos;&acirc;ge de la retraite &agrave; taux plein.
            </li>
          </ul>
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Plafond d&apos;assiette&nbsp;:</strong> si le salaire brut mensuel d&eacute;passe{' '}
            {euros(ARE_PARAMS.plafondSalaireRefMensuel)}, seule cette tranche est retenue pour calculer
            le SJR. L&apos;ARE ne sera donc pas proportionnelle au-del&agrave; de ce plafond.
          </div>
        </section>

        {/* 3. Calcul SJR cadre */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul du SJR et de l&apos;ARE&nbsp;: exemple &agrave; {euros(SALAIRE_EXEMPLE)}/mois brut
          </h2>
          <p className="mt-3">
            Voici le d&eacute;tail du calcul pour un cadre percevant {euros(SALAIRE_EXEMPLE)}&nbsp;&euro;
            brut mensuel de fa&ccedil;on continue sur 24 mois&nbsp;:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Salaire brut mensuel</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(SALAIRE_EXEMPLE)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    SJR = {euros(SALAIRE_EXEMPLE)} &divide; {ARE_PARAMS.joursParMoisSJR} jours
                  </td>
                  <td className="border border-slate-200 px-4 py-2">{euros(sjrExemple)}/jour</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    Formule 1&nbsp;: {ARE_PARAMS.tauxFormule1}&nbsp;&times;&nbsp;SJR + {euros(ARE_PARAMS.partieFix)}
                  </td>
                  <td className="border border-slate-200 px-4 py-2">{euros(f1)}/jour</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    Formule 2&nbsp;: {ARE_PARAMS.tauxFormule2}&nbsp;&times;&nbsp;SJR
                  </td>
                  <td className="border border-slate-200 px-4 py-2">{euros(f2)}/jour</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    AJ retenue (max des deux formules)
                  </td>
                  <td className="border border-slate-200 px-4 py-2">{euros(ajBrut)}/jour</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    Plafond {Math.round(ARE_PARAMS.plafondTauxSJR * 100)}&nbsp;% du SJR
                  </td>
                  <td className="border border-slate-200 px-4 py-2">
                    {euros(ARE_PARAMS.plafondTauxSJR * sjrExemple)}/jour (non actif)
                  </td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">
                    ARE journali&egrave;re brute
                  </td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">
                    {euros(ajExemple)}/jour
                  </td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">
                    ARE mensuelle brute (x {ARE_PARAMS.joursParMois} jours)
                  </td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">
                    {euros(ajMensuelleExemple)}/mois
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Param&egrave;tres Unédic en vigueur au 01/07/2025. Taux&nbsp;: {ARE_PARAMS.tauxFormule1}
            /{ARE_PARAMS.tauxFormule2}, partie fixe {euros(ARE_PARAMS.partieFix)},
            plancher {euros(ARE_PARAMS.allocationMinimale)}/jour.
          </p>
        </section>

        {/* 4. Dégressivité cadre */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            D&eacute;gressivit&eacute; des cadres&nbsp;: tableau mois par mois
          </h2>
          <p className="mt-3">
            La d&eacute;gressivit&eacute; s&apos;applique au {joursDebutDegressivite}e jour
            d&apos;indemnisation si l&apos;allocation journali&egrave;re d&eacute;passe{' '}
            {euros(ARE_PARAMS.seuilDegressiviteAJ)}/jour et que le b&eacute;n&eacute;ficiaire a
            moins de {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans. Pour un cadre &agrave;{' '}
            {euros(SALAIRE_EXEMPLE)}/mois, l&apos;AJ de {euros(ajExemple)}/jour d&eacute;passe
            ce seuil&nbsp;; la r&eacute;duction de {tauxReduction}&nbsp;% s&apos;applique, mais
            l&apos;allocation est maintenue au plancher de {euros(ARE_PARAMS.seuilDegressiviteAJ)}/jour.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Mois</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">AJ brute</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">ARE mensuelle</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">D&eacute;gressivit&eacute;</th>
                </tr>
              </thead>
              <tbody>
                {tableauMois.map(({ mois, aj, mensuel, degressif }) => (
                  <tr key={mois} className={degressif ? 'bg-red-50' : 'odd:bg-white even:bg-slate-50'}>
                    <td className="border border-slate-200 px-4 py-2 font-medium">Mois {mois}</td>
                    <td className="border border-slate-200 px-4 py-2">{euros(aj)}/j</td>
                    <td className={`border border-slate-200 px-4 py-2 font-bold ${degressif ? 'text-red-700' : 'text-blue-700'}`}>
                      {euros(mensuel)}
                    </td>
                    <td className="border border-slate-200 px-4 py-2 text-slate-600">
                      {degressif ? `Oui — plancher ${euros(ARE_PARAMS.seuilDegressiviteAJ)}/j` : 'Non'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Exemple pour un cadre &agrave; {euros(SALAIRE_EXEMPLE)}/mois brut, de moins de{' '}
            {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans. La d&eacute;gressivit&eacute; d&eacute;marre
            au jour {joursDebutDegressivite} (= mois 7 avec {ARE_PARAMS.joursParMois} jours/mois).
          </p>
        </section>

        {/* 5. Durée d'indemnisation */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Dur&eacute;e d&apos;indemnisation selon l&apos;anciennet&eacute;
          </h2>
          <p className="mt-3">
            La r&egrave;gle est simple&nbsp;: 1 jour cotis&eacute; = 1 jour indemnis&eacute;,
            dans les limites ci-dessous&nbsp;:
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Anciennet&eacute; cotis&eacute;e</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Dur&eacute;e d&apos;indemnisation</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Condition d&apos;&acirc;ge</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2">6&nbsp;mois (minimum requis)</td>
                  <td className="border border-slate-200 px-4 py-2">6&nbsp;mois ({ARE_PARAMS.dureeMinJours}&nbsp;jours)</td>
                  <td className="border border-slate-200 px-4 py-2">Tous &acirc;ges</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2">12&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2">12&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2">Tous &acirc;ges</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2">18&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2">18&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2">Tous &acirc;ges</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2">
                    24&nbsp;mois (plafond &lt;&nbsp;50&nbsp;ans)
                  </td>
                  <td className="border border-slate-200 px-4 py-2 font-bold">
                    24&nbsp;mois max ({ARE_PARAMS.dureeMax50ansEtPlusJours}&nbsp;jours)
                  </td>
                  <td className="border border-slate-200 px-4 py-2">
                    &lt;&nbsp;50&nbsp;ans&nbsp;&mdash; mais plafonn&eacute; &agrave; 12&nbsp;mois
                  </td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold">
                    24&nbsp;mois (50&nbsp;ans et plus)
                  </td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">
                    24&nbsp;mois ({ARE_PARAMS.dureeMax50ansEtPlusJours}&nbsp;jours)
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-blue-900">
                    &ge;&nbsp;50&nbsp;ans
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-slate-600">
            Pour les moins de 50&nbsp;ans, la dur&eacute;e maximale est de{' '}
            {ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;jours (12&nbsp;mois), quelle que soit
            l&apos;anciennet&eacute;. Pour les 50&nbsp;ans et plus, le plafond monte &agrave;{' '}
            {ARE_PARAMS.dureeMax50ansEtPlusJours}&nbsp;jours (24&nbsp;mois).
          </p>
        </section>

        {/* 6. Cumul emploi-chômage */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Cumul emploi-ch&ocirc;mage pour les cadres en reconversion
          </h2>
          <p className="mt-3">
            Un cadre qui reprend une activit&eacute; salari&eacute;e ou cr&eacute;&eacute; son
            entreprise peut cumuler partiellement son ARE avec ses nouveaux revenus. Le m&eacute;canisme,
            appel&eacute; <strong>activit&eacute; r&eacute;duite</strong>, fonctionne ainsi&nbsp;:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              France Travail verse une fraction de l&apos;ARE en d&eacute;duisant une partie des
              revenus d&apos;activit&eacute;.
            </li>
            <li>
              Le total (ARE r&eacute;duite + nouveaux revenus) est g&eacute;n&eacute;ralement
              sup&eacute;rieur &agrave; l&apos;ARE seule, ce qui rend la reprise d&apos;activit&eacute;
              toujours financi&egrave;rement int&eacute;ressante.
            </li>
            <li>
              Les droits restants sont conserv&eacute;s&nbsp;: les jours non indemnis&eacute;s
              pendant l&apos;activit&eacute; r&eacute;duite s&apos;ajoutent &agrave; la dur&eacute;e
              restante.
            </li>
            <li>
              <strong>Attention&nbsp;:</strong> les jours indemnis&eacute;s en activit&eacute;
              r&eacute;duite comptent dans le d&eacute;compte de la d&eacute;gressivit&eacute;.
              La d&eacute;gressivit&eacute; intervient au {joursDebutDegressivite}e jour
              indemnis&eacute;, m&ecirc;me s&apos;ils sont &eacute;tal&eacute;s dans le temps.
            </li>
          </ul>
        </section>

        {/* 7. Tableau comparatif cadre vs non-cadre */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Comparatif cadre vs non-cadre
          </h2>
          <p className="mt-3">
            Illustration avec deux exemples repr&eacute;sentatifs&nbsp;:
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">
                    Non-cadre ({euros(SALAIRE_NON_CADRE)}/mois)
                  </th>
                  <th className="border border-slate-200 px-4 py-2 text-left">
                    Cadre ({euros(SALAIRE_EXEMPLE)}/mois)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">SJR</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(sjrNonCadre)}/jour</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(sjrExemple)}/jour</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">ARE journali&egrave;re</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(ajNonCadre)}/jour</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(ajExemple)}/jour</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">ARE mensuelle (mois 1-6)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-700">
                    {euros(ajMensuelleNonCadre)}/mois
                  </td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-700">
                    {euros(ajMensuelleExemple)}/mois
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    D&eacute;gressivit&eacute; applicable
                  </td>
                  <td className="border border-slate-200 px-4 py-2">
                    {degressiviteNonCadre
                      ? `Oui (AJ > ${euros(ARE_PARAMS.seuilDegressiviteAJ)}/j)`
                      : `Non (AJ ≤ ${euros(ARE_PARAMS.seuilDegressiviteAJ)}/j)`}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700 font-medium">
                    Oui &mdash; plancher {euros(ARE_PARAMS.seuilDegressiviteAJ)}/j actif
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">ARE mensuelle (mois 7+)</td>
                  <td className="border border-slate-200 px-4 py-2">
                    {euros(ajMensuelleNonCadre)}/mois (inchang&eacute;)
                  </td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-red-700">
                    {euros(ajMensuelleApres)}/mois
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Plafond mensuel assiette</td>
                  <td className="border border-slate-200 px-4 py-2" colSpan={2}>
                    {euros(ARE_PARAMS.plafondSalaireRefMensuel)}/mois (identique pour tous)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. FAQ */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">Questions fr&eacute;quentes</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900">
                Un cadre touche-t-il plus de ch&ocirc;mage qu&apos;un non-cadre&nbsp;?
              </h3>
              <p className="mt-1 text-slate-700">
                Oui, dans la quasi-totalit&eacute; des cas. L&apos;ARE &eacute;tant proportionnelle
                au salaire ant&eacute;rieur, un cadre &agrave; {euros(SALAIRE_EXEMPLE)}/mois per&ccedil;oit
                environ {euros(ajMensuelleExemple)}/mois, contre {euros(ajMensuelleNonCadre)}/mois pour
                un salaire de {euros(SALAIRE_NON_CADRE)}/mois. La limite est le plafond d&apos;assiette
                &agrave; {euros(ARE_PARAMS.plafondSalaireRefMensuel)}/mois.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                La d&eacute;gressivit&eacute; s&apos;applique-t-elle &agrave; tous les cadres&nbsp;?
              </h3>
              <p className="mt-1 text-slate-700">
                Non. Il faut avoir moins de {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans ET une
                allocation journali&egrave;re sup&eacute;rieure &agrave;{' '}
                {euros(ARE_PARAMS.seuilDegressiviteAJ)}/jour. Un cadre senior de{' '}
                {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans ou plus est totalement exon&eacute;r&eacute;.
                Un cadre plus jeune dont l&apos;AJ est inf&eacute;rieure au seuil ne subit pas de
                r&eacute;duction effective.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Comment est calcul&eacute; le plafond ARE pour un cadre&nbsp;?
              </h3>
              <p className="mt-1 text-slate-700">
                Le SJR est calcul&eacute; sur les salaires bruts des {ARE_PARAMS.moisRefMoins55ans}
                &nbsp;derniers mois ({ARE_PARAMS.moisRefPlus55ans}&nbsp;mois pour les 55 ans et plus),
                plafonn&eacute;s &agrave; {euros(ARE_PARAMS.plafondSalaireRefMensuel)}/mois. L&apos;ARE
                est ensuite plafonn&eacute;e &agrave; {Math.round(ARE_PARAMS.plafondTauxSJR * 100)}&nbsp;%
                du SJR. Pour un salaire sup&eacute;rieur au plafond, les droits sont calcul&eacute;s
                uniquement sur la base plafonn&eacute;e.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* 9. CTA */}
      <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
        <h2 className="text-xl font-bold text-blue-900">
          Calculez votre ARE de cadre en quelques secondes
        </h2>
        <p className="mt-2 text-blue-700">
          Renseignez votre salaire et obtenez votre allocation journali&egrave;re, mensuelle
          et la date de votre d&eacute;gressivit&eacute; si elle s&apos;applique.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700"
          >
            Calculateur ARE
          </Link>
          <Link
            href="/degressivite-chomage"
            className="rounded-lg border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400"
          >
            D&eacute;gressivit&eacute; du ch&ocirc;mage
          </Link>
        </div>
      </div>

      <nav className="mt-10 border-t border-slate-200 pt-6">
        <p className="mb-3 text-sm font-medium text-slate-600">Pages li&eacute;es</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/degressivite-chomage" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            D&eacute;gressivit&eacute; ARE
          </Link>
          <Link href="/chomage-seniors" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Ch&ocirc;mage seniors
          </Link>
          <Link href="/" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Calculateur ARE
          </Link>
        </div>
      </nav>
    </main>
  )
}
