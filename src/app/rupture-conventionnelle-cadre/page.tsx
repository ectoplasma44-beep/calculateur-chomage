import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Rupture conventionnelle cadre 2025 : calcul ARE et indemnites",
  description: "Cadre en rupture conventionnelle ? Calculez votre ARE, indemnite de rupture et delai de carence en 2025. Exemple chiffre pour 5000 euros brut.",
  alternates: {
    canonical: 'https://www.monchomage.fr/rupture-conventionnelle-cadre',
  },
}

// ── Paramètres de l'exemple ─────────────────────────────────────────────────
const SALAIRE_EXEMPLE = 5000
const ANCIENNETE_EXEMPLE = 8       // années
const INDEMNITE_EXEMPLE = 20_000   // € — montant négocié

// ── SJR et ARE ──────────────────────────────────────────────────────────────
const sjr = SALAIRE_EXEMPLE / ARE_PARAMS.joursParMoisSJR
const f1 = ARE_PARAMS.tauxFormule1 * sjr + ARE_PARAMS.partieFix
const f2 = ARE_PARAMS.tauxFormule2 * sjr
const ajBrut = Math.max(f1, f2)
const ajExemple = Number(
  Math.max(Math.min(ajBrut, ARE_PARAMS.plafondTauxSJR * sjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const ajMensuelle = Number((ajExemple * ARE_PARAMS.joursParMois).toFixed(2))

// ── Dégressivité ─────────────────────────────────────────────────────────────
const ajApresDegressivite = Number(
  Math.max(ajExemple * ARE_PARAMS.coeffDegressivite, ARE_PARAMS.seuilDegressiviteAJ).toFixed(2)
)
const ajMensuelleApres = Number((ajApresDegressivite * ARE_PARAMS.joursParMois).toFixed(2))
const joursDebutDegressivite = ARE_PARAMS.joursAvantDegressivite + 1
const tauxReduction = Math.round((1 - ARE_PARAMS.coeffDegressivite) * 100)

// ── Indemnité légale minimale (Code du travail L.1234-9) ────────────────────
// 1/4 de mois de salaire par année pour les 10 premières années
// 1/3 de mois par année au-delà — applicable aux ruptures conventionnelles
const indemniteMinParAn = SALAIRE_EXEMPLE / 4   // = 1/4 mois
const indemniteLegale = Number((indemniteMinParAn * ANCIENNETE_EXEMPLE).toFixed(2))

// ── Différé spécifique (franchise indemnités) ────────────────────────────────
// Formule Unédic : (indemnité totale − minimum légal) / SJR, plafonnée à 150 j
const PLAFOND_DIFFERE = 150  // jours — règle Unédic rupture conventionnelle
const DELAI_ATTENTE = 7      // jours — délai d'attente universel
const partSupraLegale = Math.max(0, INDEMNITE_EXEMPLE - indemniteLegale)
const franchiseExemple = Math.min(PLAFOND_DIFFERE, Math.round(partSupraLegale / sjr))
const carenceTotale = DELAI_ATTENTE + franchiseExemple

// ── Tableau selon montant d'indemnité ────────────────────────────────────────
const MONTANTS_INDEMNITE = [10_000, 20_000, 30_000, 50_000]
const tableauCarence = MONTANTS_INDEMNITE.map((montant) => {
  const supra = Math.max(0, montant - indemniteLegale)
  const franchise = Math.min(PLAFOND_DIFFERE, Math.round(supra / sjr))
  const carence = DELAI_ATTENTE + franchise
  // date indicative de premier versement (+ délai CP variable, ici non inclus)
  const semainesApprox = Math.round(carence / 7)
  return { montant, indemniteLegale, supra, franchise, carence, semainesApprox }
})

// ── JSON-LD ──────────────────────────────────────────────────────────────────
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chomage cadre', item: 'https://www.monchomage.fr/chomage-cadre' },
    { '@type': 'ListItem', position: 3, name: 'Rupture conventionnelle cadre', item: 'https://www.monchomage.fr/rupture-conventionnelle-cadre' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Combien de temps apres une rupture conventionnelle touche-t-on le chomage ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Le premier versement intervient apres un delai de carence compose de trois elements : 7 jours d'attente incompressibles, un differe conges payes (variable selon les jours non pris) et, si l'indemnite depasse le minimum legal, un differe specifique calcule en divisant la part supra-legale par le SJR, plafonne a ${PLAFOND_DIFFERE} jours. Pour un cadre a ${euros(SALAIRE_EXEMPLE)}/mois avec une indemnite de ${euros(INDEMNITE_EXEMPLE)}, le delai total est d'environ ${carenceTotale} jours (hors differe CP).`,
      },
    },
    {
      '@type': 'Question',
      name: "L'indemnite de rupture conventionnelle est-elle deductible du chomage ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `L'indemnite de rupture conventionnelle n'est pas dedutte de l'ARE et n'entre pas dans le calcul du SJR. En revanche, la part supra-legale (au-dela du minimum legal de 1/4 de mois par annee d'anciennete) genere un differe d'indemnisation : nombre de jours = part supra-legale divise par le SJR, dans la limite de ${PLAFOND_DIFFERE} jours.`,
      },
    },
    {
      '@type': 'Question',
      name: "Un cadre peut-il negocier son indemnite de rupture sans perdre l'ARE ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui. Negocier une indemnite superieure au minimum legal n'entraine pas la perte de l'ARE. Cela allonge uniquement le delai avant le premier versement (differe specifique plafonné a ${PLAFOND_DIFFERE} jours). L'ARE reste integrale une fois le delai ecoule.`,
      },
    },
  ],
}

export default function RuptureConventionnelleCadre() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}
        <Link href="/chomage-cadre" className="hover:underline">Ch&ocirc;mage cadre</Link>
        {' '}&rsaquo;{' '}Rupture conventionnelle cadre
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Rupture conventionnelle cadre&nbsp;: ARE, indemnit&eacute;s et d&eacute;lai de carence 2025
      </h1>

      <div className="mt-8 space-y-10 text-slate-700">

        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Rupture conventionnelle cadre vs licenciement&nbsp;: un choix strat&eacute;gique
          </h2>
          <p className="mt-3">
            Pour un cadre, la rupture conventionnelle pr&eacute;sente des avantages pr&eacute;cis par
            rapport au licenciement. Les deux modes de rupture ouvrent droit &agrave; la m&ecirc;me
            ARE, calcul&eacute;e de mani&egrave;re identique. La diff&eacute;rence tient dans la
            <strong> n&eacute;gociation de l&apos;indemnit&eacute;</strong>&nbsp;: un cadre peut
            obtenir une indemnit&eacute; sup&eacute;rieure au minimum l&eacute;gal, sans perdre ses
            droits &agrave; l&apos;ARE. En contrepartie, chaque euro supra-l&eacute;gal all&egrave;ge
            le premier versement d&apos;autant de jours (diff&eacute;r&eacute; sp&eacute;cifique,
            plafonn&eacute; &agrave; {PLAFOND_DIFFERE}&nbsp;jours). Le licenciement &eacute;conomique,
            lui, limite ce m&ecirc;me diff&eacute;r&eacute; &agrave; 75&nbsp;jours. C&apos;est le
            principal arbitrage financi&egrave;r pour un cadre qui n&eacute;gocie son d&eacute;part.
          </p>
        </section>

        {/* 2. Conditions ARE */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Conditions d&apos;acc&egrave;s &agrave; l&apos;ARE apr&egrave;s rupture conventionnelle
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              Rupture conventionnelle <strong>homologu&eacute;e</strong> par la DREETS
              (15 jours ouvrables apr&egrave;s signature de la convention).
            </li>
            <li>
              <strong>Affiliation minimale</strong> de {ARE_PARAMS.dureeMinJours}&nbsp;jours (6 mois)
              sur les {ARE_PARAMS.moisRefMoins55ans}&nbsp;derniers mois ({ARE_PARAMS.moisRefPlus55ans}
              &nbsp;mois pour les 55 ans et plus).
            </li>
            <li>
              <strong>Inscription &agrave; France Travail</strong> dans les 12&nbsp;mois suivant la
              date de rupture.
            </li>
            <li>
              &Ecirc;tre apte &agrave; travailler, rechercher activement un emploi, ne pas
              avoir atteint l&apos;&acirc;ge de la retraite &agrave; taux plein.
            </li>
          </ul>

          <h3 className="mt-6 text-xl font-semibold text-slate-900">
            D&eacute;lai de carence&nbsp;: les trois composantes
          </h3>
          <p className="mt-2">
            L&apos;indemnisation ne d&eacute;marre pas le lendemain de la rupture. Trois p&eacute;riodes
            s&apos;enchainent&nbsp;:
          </p>
          <ol className="mt-3 list-decimal space-y-3 pl-6">
            <li>
              <strong>D&eacute;lai d&apos;attente&nbsp;: {DELAI_ATTENTE}&nbsp;jours</strong> —
              incompressible, applicable &agrave; tous les allocataires.
            </li>
            <li>
              <strong>Diff&eacute;r&eacute; cong&eacute;s pay&eacute;s</strong> — calcul&eacute; sur
              l&apos;indemnit&eacute; compensatrice de cong&eacute;s pay&eacute;s (ICCP) divis&eacute;e
              par le SJR. Variable selon les jours de CP non pris &agrave; la date de rupture.
            </li>
            <li>
              <strong>Diff&eacute;r&eacute; sp&eacute;cifique (franchise indemnit&eacute;s)</strong> —
              calcul&eacute; sur la part supra-l&eacute;gale de l&apos;indemnit&eacute; de rupture&nbsp;:
              <div className="mt-2 rounded-lg bg-slate-100 px-4 py-3 font-mono text-sm text-slate-900">
                Franchise = (indemnit&eacute; re&ccedil;ue &minus; indemnit&eacute; l&eacute;gale) &divide; SJR
                <br />
                Plafonn&eacute;e &agrave; {PLAFOND_DIFFERE}&nbsp;jours
              </div>
            </li>
          </ol>
          <p className="mt-3 text-sm text-slate-500">
            L&apos;indemnit&eacute; l&eacute;gale minimale est calcul&eacute;e selon l&apos;article
            L.1234-9 du Code du travail&nbsp;: 1/4 de mois de salaire par ann&eacute;e d&apos;anciennet&eacute;
            pour les 10 premi&egrave;res ann&eacute;es, 1/3 au-del&agrave;.
          </p>
        </section>

        {/* 3. Calcul SJR */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul du SJR pour un cadre &agrave; {euros(SALAIRE_EXEMPLE)}/mois
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Salaire brut mensuel</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(SALAIRE_EXEMPLE)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    SJR = {euros(SALAIRE_EXEMPLE)} &divide; {ARE_PARAMS.joursParMoisSJR}&nbsp;jours
                  </td>
                  <td className="border border-slate-200 px-4 py-2">{euros(sjr)}/jour</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    Formule 1&nbsp;: {ARE_PARAMS.tauxFormule1} &times; SJR + {euros(ARE_PARAMS.partieFix)}
                  </td>
                  <td className="border border-slate-200 px-4 py-2">{euros(f1)}/jour</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    Formule 2&nbsp;: {ARE_PARAMS.tauxFormule2} &times; SJR
                  </td>
                  <td className="border border-slate-200 px-4 py-2">{euros(f2)}/jour</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE journali&egrave;re</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(ajExemple)}/jour</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE mensuelle</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(ajMensuelle)}/mois</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Exemple complet chiffré */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Exemple complet&nbsp;: cadre &agrave; {euros(SALAIRE_EXEMPLE)}/mois,
            {' '}{ANCIENNETE_EXEMPLE}&nbsp;ans d&apos;anciennet&eacute;,
            indemnit&eacute; {euros(INDEMNITE_EXEMPLE)}
          </h2>

          <h3 className="mt-5 text-lg font-semibold text-slate-900">
            1. Indemnit&eacute; l&eacute;gale minimale
          </h3>
          <div className="mt-2 rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 text-sm">
            <p>
              1/4 de mois &times; {ANCIENNETE_EXEMPLE}&nbsp;ann&eacute;es = {euros(SALAIRE_EXEMPLE / 4)}
              &nbsp;&times;&nbsp;{ANCIENNETE_EXEMPLE} = <strong>{euros(indemniteLegale)}</strong>
            </p>
          </div>

          <h3 className="mt-5 text-lg font-semibold text-slate-900">
            2. Calcul de la franchise indemnit&eacute;s
          </h3>
          <div className="mt-2 rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 text-sm space-y-1">
            <p>Part supra-l&eacute;gale = {euros(INDEMNITE_EXEMPLE)} &minus; {euros(indemniteLegale)} = <strong>{euros(partSupraLegale)}</strong></p>
            <p>SJR = {euros(sjr)}/jour</p>
            <p>Franchise = {euros(partSupraLegale)} &divide; {euros(sjr)} = <strong>{Math.round(partSupraLegale / sjr)}&nbsp;jours</strong>
              {franchiseExemple === PLAFOND_DIFFERE ? ` (plafonn&eacute; &agrave; ${PLAFOND_DIFFERE}&nbsp;jours)` : ''}
            </p>
          </div>

          <h3 className="mt-5 text-lg font-semibold text-slate-900">
            3. D&eacute;lai de carence total
          </h3>
          <div className="mt-2 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">D&eacute;lai d&apos;attente</td>
                  <td className="border border-slate-200 px-4 py-2">{DELAI_ATTENTE}&nbsp;jours</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Diff&eacute;r&eacute; cong&eacute;s pay&eacute;s</td>
                  <td className="border border-slate-200 px-4 py-2 text-slate-500">Variable (selon CP non pris)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Franchise indemnit&eacute;s</td>
                  <td className="border border-slate-200 px-4 py-2">{franchiseExemple}&nbsp;jours</td>
                </tr>
                <tr className="bg-amber-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">Carence minimale totale (hors CP)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-amber-900">{carenceTotale}&nbsp;jours</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">Premier versement ARE</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">
                    ~{Math.round(carenceTotale / 30)}&nbsp;mois apr&egrave;s la rupture (+ diff&eacute;r&eacute; CP)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Tableau selon montant indemnité */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            D&eacute;lai de carence selon le montant de l&apos;indemnit&eacute;
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Base&nbsp;: cadre &agrave; {euros(SALAIRE_EXEMPLE)}/mois, {ANCIENNETE_EXEMPLE}&nbsp;ans d&apos;anciennet&eacute;
            &mdash; indemnit&eacute; l&eacute;gale&nbsp;: {euros(indemniteLegale)}. D&eacute;lai CP non inclus.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-3 py-2 text-left">Indemnit&eacute; totale</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">Part supra-l&eacute;gale</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">Franchise (jours)</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">Carence min. totale</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">1er versement ARE</th>
                </tr>
              </thead>
              <tbody>
                {tableauCarence.map(({ montant, supra, franchise, carence, semainesApprox }) => (
                  <tr key={montant} className={franchise >= PLAFOND_DIFFERE ? 'bg-red-50' : 'odd:bg-white even:bg-slate-50'}>
                    <td className="border border-slate-200 px-3 py-2 font-medium">{euros(montant)}</td>
                    <td className="border border-slate-200 px-3 py-2">{euros(supra)}</td>
                    <td className="border border-slate-200 px-3 py-2">
                      {franchise}&nbsp;j{franchise >= PLAFOND_DIFFERE ? ' (plafond)' : ''}
                    </td>
                    <td className="border border-slate-200 px-3 py-2 font-semibold">{carence}&nbsp;jours</td>
                    <td className="border border-slate-200 px-3 py-2 text-slate-600">
                      ~{semainesApprox}&nbsp;semaines apres rupture
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            SJR de r&eacute;f&eacute;rence&nbsp;: {euros(sjr)}/jour. Ligne rouge = plafond {PLAFOND_DIFFERE}&nbsp;jours atteint.
            Diff&eacute;r&eacute; CP non inclus (variable selon jours non pris).
          </p>
        </section>

        {/* 6. Dégressivité */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            D&eacute;gressivit&eacute; &agrave; partir du mois 7
          </h2>
          <p className="mt-3">
            Pour un cadre &agrave; {euros(SALAIRE_EXEMPLE)}/mois de moins de{' '}
            {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans, l&apos;ARE de {euros(ajExemple)}/jour
            d&eacute;passe le seuil de {euros(ARE_PARAMS.seuilDegressiviteAJ)}/jour&nbsp;: la
            d&eacute;gressivit&eacute; s&apos;applique au {joursDebutDegressivite}e jour
            indemnis&eacute; (environ 6&nbsp;mois apr&egrave;s le premier versement).
          </p>
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
            <dl className="grid grid-cols-3 gap-4 text-center">
              <div>
                <dt className="text-xs font-semibold uppercase text-red-700">AJ mois 1&ndash;6</dt>
                <dd className="mt-1 text-xl font-bold text-slate-900">{euros(ajExemple)}/j</dd>
                <dd className="text-sm text-slate-600">{euros(ajMensuelle)}/mois</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-red-700">R&eacute;duction</dt>
                <dd className="mt-1 text-xl font-bold text-red-700">&minus;{tauxReduction}&nbsp;%</dd>
                <dd className="text-sm text-slate-600">au jour {joursDebutDegressivite}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-red-700">AJ mois 7+</dt>
                <dd className="mt-1 text-xl font-bold text-slate-900">{euros(ajApresDegressivite)}/j</dd>
                <dd className="text-sm text-slate-600">{euros(ajMensuelleApres)}/mois</dd>
              </div>
            </dl>
          </div>
          <p className="mt-3">
            <Link href="/degressivite-chomage" className="text-blue-700 underline hover:text-blue-900">
              D&eacute;tail complet de la d&eacute;gressivit&eacute; ARE &rarr;
            </Link>
          </p>
        </section>

        {/* 7. Points d'attention */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Points d&apos;attention sp&eacute;cifiques aux cadres
          </h2>

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            N&eacute;gocier une indemnit&eacute; sup&eacute;rieure allonge la carence
          </h3>
          <p className="mt-2">
            Chaque euro supra-l&eacute;gal g&eacute;n&egrave;re environ{' '}
            {(1 / sjr).toFixed(3)}&nbsp;jour de franchise suppl&eacute;mentaire. Au-del&agrave;
            de {euros(indemniteLegale + PLAFOND_DIFFERE * sjr)} d&apos;indemnit&eacute; totale,
            le plafond de {PLAFOND_DIFFERE}&nbsp;jours est atteint et toute indemnit&eacute;
            suppl&eacute;mentaire n&apos;allonge plus la carence.
          </p>

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            P&eacute;riode de pr&eacute;avis non effectu&eacute;e
          </h3>
          <p className="mt-2">
            Dans une rupture conventionnelle, il n&apos;y a pas de pr&eacute;avis &agrave;
            effectuer. La date de fin de contrat est librement fix&eacute;e d&apos;un commun accord
            (au plus t&ocirc;t le lendemain de l&apos;homologation). Une indemnit&eacute;
            compensatrice de pr&eacute;avis vers&eacute;e volontairement par l&apos;employeur serait
            int&eacute;gr&eacute;e dans la base de calcul du diff&eacute;r&eacute;&nbsp;: v&eacute;rifier
            la qualification exacte des sommes sur le bulletin de sortie.
          </p>

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Rupture conventionnelle pendant un arr&ecirc;t maladie
          </h3>
          <p className="mt-2">
            Un employeur ne peut pas imposer une rupture conventionnelle pendant un arr&ecirc;t
            maladie, mais les deux parties peuvent y consentir librement. La rupture ne peut
            prendre effet qu&apos;apr&egrave;s la fin de l&apos;arr&ecirc;t. En pratique, France
            Travail ne verse l&apos;ARE qu&apos;une fois les indemnit&eacute;s journali&egrave;res
            de la S&eacute;curit&eacute; sociale termin&eacute;es (pas de double versement). Le
            d&eacute;lai de carence commence &agrave; courir &agrave; partir de la date effective
            de fin de contrat, pas de la date de signature.
          </p>
        </section>

        {/* 8. Comparatif RC vs licenciement éco */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Comparatif rupture conventionnelle vs licenciement &eacute;conomique
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Rupture conventionnelle</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Licenciement &eacute;co</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemnit&eacute; l&eacute;gale minimale</td>
                  <td className="border border-slate-200 px-4 py-2">1/4 mois/an (10 premi&egrave;res ann&eacute;es)</td>
                  <td className="border border-slate-200 px-4 py-2">1/4 mois/an (idem depuis 2017)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">N&eacute;gociation indemnit&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">Libre, sans limite</td>
                  <td className="border border-slate-200 px-4 py-2">Convention collective applicable</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    Plafond diff&eacute;r&eacute; sp&eacute;cifique
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700 font-medium">
                    {PLAFOND_DIFFERE}&nbsp;jours max
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">
                    75&nbsp;jours max
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Montant ARE</td>
                  <td className="border border-slate-200 px-4 py-2" colSpan={2}>
                    Identique dans les deux cas &mdash; bas&eacute; sur le SJR
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Dur&eacute;e ARE</td>
                  <td className="border border-slate-200 px-4 py-2" colSpan={2}>
                    Identique &mdash; d&eacute;pend des jours cotis&eacute;s, pas du motif
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Impact retraite</td>
                  <td className="border border-slate-200 px-4 py-2" colSpan={2}>
                    Trimestres ch&ocirc;mage valid&eacute;s identiquement pour les deux modes de rupture
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Accord mutuel requis</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Oui &mdash; choix des deux parties</td>
                  <td className="border border-slate-200 px-4 py-2 text-slate-600">Non &mdash; motif &eacute;conomique exig&eacute;</td>
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
                Combien de temps apr&egrave;s une rupture conventionnelle touche-t-on le ch&ocirc;mage&nbsp;?
              </h3>
              <p className="mt-1 text-slate-700">
                Le premier versement intervient apr&egrave;s le d&eacute;lai d&apos;attente de{' '}
                {DELAI_ATTENTE}&nbsp;jours, le diff&eacute;r&eacute; cong&eacute;s pay&eacute;s
                (variable) et la franchise indemnit&eacute;s. Pour un cadre &agrave;{' '}
                {euros(SALAIRE_EXEMPLE)}/mois avec une indemnit&eacute; de {euros(INDEMNITE_EXEMPLE)},
                la carence minimale est de {carenceTotale}&nbsp;jours hors CP.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                L&apos;indemnit&eacute; de rupture conventionnelle est-elle d&eacute;ductible du ch&ocirc;mage&nbsp;?
              </h3>
              <p className="mt-1 text-slate-700">
                Non. L&apos;indemnit&eacute; n&apos;est pas d&eacute;duite de l&apos;ARE et
                n&apos;entre pas dans le calcul du SJR. Seule la part supra-l&eacute;gale
                g&eacute;n&egrave;re un diff&eacute;r&eacute; d&apos;indemnisation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Un cadre peut-il n&eacute;gocier son indemnit&eacute; sans perdre l&apos;ARE&nbsp;?
              </h3>
              <p className="mt-1 text-slate-700">
                Oui. N&eacute;gocier une indemnit&eacute; sup&eacute;rieure au minimum l&eacute;gal
                n&apos;entraine pas la perte de l&apos;ARE. Cela allonge uniquement le d&eacute;lai
                avant le premier versement, dans la limite de {PLAFOND_DIFFERE}&nbsp;jours de
                diff&eacute;r&eacute; sp&eacute;cifique.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* 10. CTA */}
      <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
        <h2 className="text-xl font-bold text-blue-900">
          Calculez votre ARE et v&eacute;rifiez votre d&eacute;lai de carence
        </h2>
        <p className="mt-2 text-blue-700">
          Renseignez votre salaire brut et obtenez votre allocation journali&egrave;re, mensuelle
          et l&apos;impact de la d&eacute;gressivit&eacute; si elle s&apos;applique.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700"
          >
            Calculateur ARE
          </Link>
          <Link
            href="/chomage-cadre"
            className="rounded-lg border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400"
          >
            Ch&ocirc;mage cadre
          </Link>
          <Link
            href="/delai-carence-chomage"
            className="rounded-lg border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400"
          >
            D&eacute;lai de carence
          </Link>
        </div>
      </div>

      <nav className="mt-10 border-t border-slate-200 pt-6">
        <p className="mb-3 text-sm font-medium text-slate-600">Pages li&eacute;es</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/rupture-conventionnelle" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Rupture conventionnelle (toutes situations)
          </Link>
          <Link href="/degressivite-chomage" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            D&eacute;gressivit&eacute; ARE
          </Link>
          <Link href="/chomage-cadre" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Ch&ocirc;mage cadre
          </Link>
        </div>
      </nav>
    </main>
  )
}
