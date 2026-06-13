import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Licenciement eco cadre 2025 : ARE, PSE et conge reclassement",
  description: "Cadre licencie pour motif economique ? Indemnite legale, conge de reclassement et chronologie complete jusqu'au 1er versement ARE.",
  alternates: {
    canonical: 'https://www.monchomage.fr/licenciement-economique-cadre',
  },
}

// ── Paramètres de l'exemple ──────────────────────────────────────────────────
const SALAIRE_EXEMPLE = 5000
const ANCIENNETE_A = 8   // exemple A
const ANCIENNETE_B = 15  // exemple B

// ── SJR et ARE ───────────────────────────────────────────────────────────────
const sjr = SALAIRE_EXEMPLE / ARE_PARAMS.joursParMoisSJR
const f1 = ARE_PARAMS.tauxFormule1 * sjr + ARE_PARAMS.partieFix
const f2 = ARE_PARAMS.tauxFormule2 * sjr
const ajBrut = Math.max(f1, f2)
const ajExemple = Number(
  Math.max(Math.min(ajBrut, ARE_PARAMS.plafondTauxSJR * sjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const ajMensuelle = Number((ajExemple * ARE_PARAMS.joursParMois).toFixed(2))
const ajApresDegressivite = Number(
  Math.max(ajExemple * ARE_PARAMS.coeffDegressivite, ARE_PARAMS.seuilDegressiviteAJ).toFixed(2)
)
const ajMensuelleApres = Number((ajApresDegressivite * ARE_PARAMS.joursParMois).toFixed(2))
const joursDebutDegressivite = ARE_PARAMS.joursAvantDegressivite + 1
const tauxReduction = Math.round((1 - ARE_PARAMS.coeffDegressivite) * 100)

// ── Calcul indemnité légale (L.1234-9 Code du travail) ───────────────────────
// 1/4 mois/an pour les 10 premières années, 1/3 mois/an au-delà
function indemniteLegale(salaire: number, anciennete: number): number {
  const tranche1 = Math.min(anciennete, 10) * (salaire / 4)
  const tranche2 = Math.max(0, anciennete - 10) * (salaire / 3)
  return Number((tranche1 + tranche2).toFixed(2))
}

const indemniteLegaleA = indemniteLegale(SALAIRE_EXEMPLE, ANCIENNETE_A)
const indemniteLegaleB = indemniteLegale(SALAIRE_EXEMPLE, ANCIENNETE_B)

// ── Franchise (différé spécifique) ───────────────────────────────────────────
// Seule la part SUPRA-légale génère une franchise, plafonnée à FRANCHISE_MAX_LICENCIEMENT_ECO
// Si indemnité = légale minimale → franchise = 0
// (règle plus favorable au licencié éco qu'à la RC : plafond 75 j vs 150 j)
function calculFranchise(indemniteTotale: number, indemniteMin: number): number {
  const supraLegale = Math.max(0, indemniteTotale - indemniteMin)
  return Math.min(ARE_PARAMS.franchiseMaxLicenciementEco, Math.round(supraLegale / sjr))
}

// Carence minimale = 7 j attente + franchise (+ CP variable)
const DELAI_ATTENTE = 7

// ── Tableau franchise selon ancienneté ────────────────────────────────────────
const ANCIENNETES_TABLEAU = [5, 8, 10, 15, 20]
const tableauAnciennete = ANCIENNETES_TABLEAU.map((anc) => {
  const legal = indemniteLegale(SALAIRE_EXEMPLE, anc)
  const franchise = calculFranchise(legal, legal) // indemnité = légale → franchise = 0
  const carenceMin = DELAI_ATTENTE + franchise
  return { anc, legal, franchise, carenceMin }
})

// ── JSON-LD ──────────────────────────────────────────────────────────────────
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chomage cadre', item: 'https://www.monchomage.fr/chomage-cadre' },
    { '@type': 'ListItem', position: 3, name: 'Licenciement economique cadre', item: 'https://www.monchomage.fr/licenciement-economique-cadre' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Un cadre licencie pour motif economique touche-t-il plus de chomage ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Non. Le montant de l'ARE depend uniquement du salaire anterieur, pas du motif de rupture. Un cadre a ${euros(SALAIRE_EXEMPLE)}/mois percoit ${euros(ajExemple)}/jour (${euros(ajMensuelle)}/mois) quelle que soit la nature du licenciement. L'avantage du licenciement economique est un plafond de franchise reduit a ${ARE_PARAMS.franchiseMaxLicenciementEco} jours (vs ${ARE_PARAMS.franchiseMaxRC} jours en rupture conventionnelle), ce qui accelere l'acces a l'ARE si une indemnite supra-legale est versee.`,
      },
    },
    {
      '@type': 'Question',
      name: "Le conge de reclassement retarde-t-il le versement de l'ARE ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui. Le conge de reclassement prolonge la duree du contrat de travail. L'ARE ne demarre qu'a l'issue du conge. Pour un cadre beneficiant d'un conge de reclassement de 6 mois, le premier versement ARE intervient environ 7 mois apres la fin effective du travail, en ajoutant le delai d'attente de ${DELAI_ATTENTE} jours et le differe conges payes.`,
      },
    },
    {
      '@type': 'Question',
      name: "Quelle difference entre licenciement economique et rupture conventionnelle pour un cadre ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Le montant ARE est identique dans les deux cas. Les differences portent sur : (1) le plafond de franchise reduit a ${ARE_PARAMS.franchiseMaxLicenciementEco} jours en licenciement eco (vs ${ARE_PARAMS.franchiseMaxRC} jours en RC), (2) la priorite de reembauche de 12 mois propre au licenciement eco, (3) le conge de reclassement offert au cadre (absent en RC), (4) la negociabilite de l'indemnite : libre en RC, encadree par la CCN en licenciement eco.`,
      },
    },
  ],
}

export default function LicenciementEconomiqueCadre() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}
        <Link href="/chomage-cadre" className="hover:underline">Ch&ocirc;mage cadre</Link>
        {' '}&rsaquo;{' '}Licenciement &eacute;conomique cadre
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Licenciement &eacute;conomique cadre&nbsp;: ARE, indemnit&eacute;s et droits 2025
      </h1>

      <div className="mt-8 space-y-10 text-slate-700">

        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Sp&eacute;cificit&eacute;s du licenciement &eacute;conomique pour les cadres
          </h2>
          <p className="mt-3">
            Pour un cadre, le licenciement &eacute;conomique (art. L.1233-3 du Code du travail)
            enclenche des m&eacute;canismes sp&eacute;cifiques absents de la rupture conventionnelle.
            D&egrave;s 10&nbsp;licenciements sur 30&nbsp;jours, un Plan de Sauvegarde de
            l&apos;Emploi (PSE) est obligatoire dans les entreprises de plus de 50 salari&eacute;s&nbsp;:
            il pr&eacute;voit souvent un <strong>cong&eacute; de reclassement</strong> de 4 &agrave;
            12&nbsp;mois, mant&eacute;nu avec un salaire partiel (65&nbsp;% minimum). Pour le cadre,
            c&apos;est une p&eacute;riode pr&eacute;cieuse pour repositionnement professionnel, mais
            elle <strong>retarde le d&eacute;marrage de l&apos;ARE</strong> d&apos;autant. Autre
            avantage propre au licenciement &eacute;co&nbsp;: la <strong>priorit&eacute; de
            r&eacute;embauche</strong> pendant 12&nbsp;mois et un <strong>plafond de franchise
            r&eacute;duit &agrave; {ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;jours</strong>{' '}
            (contre {ARE_PARAMS.franchiseMaxRC}&nbsp;jours en rupture conventionnelle), ce qui
            acc&eacute;l&egrave;re l&apos;acc&egrave;s &agrave; l&apos;ARE si une indemnit&eacute;
            supra-l&eacute;gale est vers&eacute;e.
          </p>
        </section>

        {/* 2. Conditions ARE et franchise */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Conditions ARE et d&eacute;lai de carence
          </h2>
          <p className="mt-3">
            Les conditions d&apos;acc&egrave;s &agrave; l&apos;ARE sont identiques aux autres
            motifs&nbsp;: {ARE_PARAMS.dureeMinJours}&nbsp;jours (6&nbsp;mois) d&apos;affiliation
            sur les {ARE_PARAMS.moisRefMoins55ans}&nbsp;derniers mois, inscription &agrave; France
            Travail dans les 12&nbsp;mois.
          </p>

          <h3 className="mt-5 text-lg font-semibold text-slate-900">
            Les trois composantes du d&eacute;lai de carence
          </h3>
          <ol className="mt-3 list-decimal space-y-3 pl-6">
            <li>
              <strong>D&eacute;lai d&apos;attente&nbsp;: {DELAI_ATTENTE}&nbsp;jours</strong> —
              incompressible, universel.
            </li>
            <li>
              <strong>Diff&eacute;r&eacute; cong&eacute;s pay&eacute;s</strong> — bas&eacute; sur
              l&apos;indemnit&eacute; compensatrice de CP divis&eacute;e par le SJR. Variable selon
              les jours non pris. Non concern&eacute; si le cong&eacute; de reclassement a
              &eacute;puis&eacute; les CP.
            </li>
            <li>
              <strong>Franchise indemnit&eacute;s (diff&eacute;r&eacute; sp&eacute;cifique)</strong> —
              calcul&eacute;e uniquement sur la <em>part supra-l&eacute;gale</em> de
              l&apos;indemnit&eacute; de licenciement. Si l&apos;indemnit&eacute; vers&eacute;e
              &eacute;gale le minimum l&eacute;gal, la franchise est nulle.
              <div className="mt-2 rounded-lg bg-slate-100 px-4 py-3 font-mono text-sm text-slate-900">
                Franchise = (indemnit&eacute; totale &minus; minimum l&eacute;gal) &divide; SJR
                <br />
                Plafonn&eacute;e &agrave; {ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;jours
                (vs {ARE_PARAMS.franchiseMaxRC}&nbsp;j en rupture conventionnelle)
              </div>
            </li>
          </ol>

          <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
            <strong>Avantage licenciement &eacute;co&nbsp;:</strong> m&ecirc;me avec une indemnit&eacute;
            supra-l&eacute;gale &eacute;lev&eacute;e, la franchise est plafonn&eacute;e &agrave;{' '}
            {ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;jours, soit deux fois moins qu&apos;en
            rupture conventionnelle ({ARE_PARAMS.franchiseMaxRC}&nbsp;jours).
          </div>
        </section>

        {/* 3. Calcul indemnité légale */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul de l&apos;indemnit&eacute; l&eacute;gale de licenciement &eacute;conomique
          </h2>
          <p className="mt-3">
            La formule (art. L.1234-9 du Code du travail) est identique &agrave; celle de la
            rupture conventionnelle&nbsp;:
          </p>
          <div className="mt-3 rounded-lg bg-slate-100 px-4 py-3 font-mono text-sm text-slate-900">
            Jusqu&apos;&agrave; 10&nbsp;ans&nbsp;: 1/4 mois de salaire &times; nombre d&apos;ann&eacute;es
            <br />
            Au-del&agrave; de 10&nbsp;ans&nbsp;: 1/3 mois de salaire &times; ann&eacute;es suppl&eacute;mentaires
          </div>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Exemple</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Salaire</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Anciennet&eacute;</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Calcul</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Indemnit&eacute; l&eacute;gale min.</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Exemple A</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(SALAIRE_EXEMPLE)}/mois</td>
                  <td className="border border-slate-200 px-4 py-2">{ANCIENNETE_A}&nbsp;ans</td>
                  <td className="border border-slate-200 px-4 py-2 text-sm text-slate-600">
                    {euros(SALAIRE_EXEMPLE / 4)} &times; {ANCIENNETE_A}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(indemniteLegaleA)}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Exemple B</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(SALAIRE_EXEMPLE)}/mois</td>
                  <td className="border border-slate-200 px-4 py-2">{ANCIENNETE_B}&nbsp;ans</td>
                  <td className="border border-slate-200 px-4 py-2 text-sm text-slate-600">
                    ({euros(SALAIRE_EXEMPLE / 4)} &times; 10) + ({euros(SALAIRE_EXEMPLE / 3)} &times; 5)
                  </td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(indemniteLegaleB)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Certaines conventions collectives (notamment cadres SYNTEC, UIMM, bancaire) pr&eacute;voient
            des indemnit&eacute;s conventionnelles plus favorables. Le montant retenu est toujours le plus
            &eacute;lev&eacute; entre l&eacute;gal et conventionnel.
          </p>
        </section>

        {/* 4. Tableau franchise selon ancienneté */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            D&eacute;lai de carence selon l&apos;anciennet&eacute;
          </h2>
          <p className="mt-3">
            Si l&apos;indemnit&eacute; vers&eacute;e correspond au <strong>minimum l&eacute;gal</strong>,
            la franchise est nulle&nbsp;: seuls le d&eacute;lai d&apos;attente de {DELAI_ATTENTE}&nbsp;jours
            et le diff&eacute;r&eacute; cong&eacute;s pay&eacute;s s&apos;appliquent.
            Si la convention collective pr&eacute;voit plus, la part supra-l&eacute;gale g&eacute;n&egrave;re
            une franchise plafonn&eacute;e &agrave; {ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;jours.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-3 py-2 text-left">Anciennet&eacute;</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">Indemnit&eacute; l&eacute;gale min.</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">Franchise (au l&eacute;gal)</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">Carence min. (hors CP)</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">Plafond franchise si supra</th>
                </tr>
              </thead>
              <tbody>
                {tableauAnciennete.map(({ anc, legal, franchise, carenceMin }) => (
                  <tr key={anc} className="odd:bg-white even:bg-slate-50">
                    <td className="border border-slate-200 px-3 py-2 font-medium">{anc}&nbsp;ans</td>
                    <td className="border border-slate-200 px-3 py-2">{euros(legal)}</td>
                    <td className="border border-slate-200 px-3 py-2 text-green-700 font-medium">
                      {franchise}&nbsp;j (nulle)
                    </td>
                    <td className="border border-slate-200 px-3 py-2 font-semibold">{carenceMin}&nbsp;j</td>
                    <td className="border border-slate-200 px-3 py-2 text-slate-600">
                      {ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;j max
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Base&nbsp;: {euros(SALAIRE_EXEMPLE)}/mois brut, SJR {euros(sjr)}/jour.
            En rupture conventionnelle, le plafond est de {ARE_PARAMS.franchiseMaxRC}&nbsp;jours pour la m&ecirc;me supra-l&eacute;gale.
          </p>
        </section>

        {/* 5. Congé de reclassement */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Cong&eacute; de reclassement&nbsp;: impact sur la chronologie ARE
          </h2>
          <p className="mt-3">
            Le cong&eacute; de reclassement est un droit offert par l&apos;employeur (et obligatoire
            dans les entreprises de 1&nbsp;000 salari&eacute;s et plus) dans le cadre d&apos;un PSE.
            Il permet au cadre de b&eacute;n&eacute;ficier d&apos;un accompagnement renforc&eacute;
            (bilan de comp&eacute;tences, formation, cellule de reclassement) tout en restant
            techniquement sous contrat.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Dur&eacute;e</td>
                  <td className="border border-slate-200 px-4 py-2">4 &agrave; 12&nbsp;mois selon l&apos;accord PSE</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">R&eacute;mun&eacute;ration</td>
                  <td className="border border-slate-200 px-4 py-2">
                    65&nbsp;% de la r&eacute;mun&eacute;ration brute minimum (certains PSE pr&eacute;voient plus)
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Statut</td>
                  <td className="border border-slate-200 px-4 py-2">
                    Salari&eacute; sous contrat — l&apos;ARE ne peut pas d&eacute;marrer pendant cette p&eacute;riode
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Fin de contrat effective</td>
                  <td className="border border-slate-200 px-4 py-2">
                    &Agrave; l&apos;issue du cong&eacute; — les d&eacute;lais de carence d&eacute;marrent alors
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            Le cong&eacute; de reclassement inclut g&eacute;n&eacute;ralement les cong&eacute;s pay&eacute;s,
            ce qui peut r&eacute;duire ou annuler le diff&eacute;r&eacute; CP. En revanche, la
            d&eacute;gressivit&eacute; de l&apos;ARE commence &agrave; courir seulement &agrave; partir
            du premier jour d&apos;indemnisation effective.
          </p>
        </section>

        {/* 6. Exemple complet chiffré */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Exemple complet chiffr&eacute;&nbsp;: cadre {euros(SALAIRE_EXEMPLE)}/mois,
            {' '}{ANCIENNETE_A}&nbsp;ans, cong&eacute; reclassement 6&nbsp;mois
          </h2>

          <h3 className="mt-4 text-lg font-semibold text-slate-900">Chronologie</h3>
          <ol className="mt-3 list-decimal space-y-3 pl-6">
            <li>
              <strong>Fin du travail effectif</strong> — d&eacute;but du cong&eacute; de
              reclassement. R&eacute;mun&eacute;ration&nbsp;: 65&nbsp;% de {euros(SALAIRE_EXEMPLE)}
              &nbsp;= {euros(SALAIRE_EXEMPLE * 0.65)}/mois.
            </li>
            <li>
              <strong>Mois 6</strong> — fin du cong&eacute; de reclassement. Fin du contrat de
              travail. Les d&eacute;lais de carence d&eacute;marrent.
            </li>
            <li>
              <strong>Mois 6 + {DELAI_ATTENTE}&nbsp;j</strong> — fin du d&eacute;lai d&apos;attente.
            </li>
            <li>
              <strong>Mois 6 + {DELAI_ATTENTE + 30}&nbsp;j</strong> — diff&eacute;r&eacute; CP
              (ici 30&nbsp;j d&apos;exemple — variable selon les CP non pris).
            </li>
            <li>
              <strong>~Mois 7&ndash;8</strong> — <strong>premier versement ARE&nbsp;:
              {' '}{euros(ajMensuelle)}/mois</strong>.
              Indemnit&eacute; l&eacute;gale = minimum l&eacute;gal &rarr; franchise nulle.
            </li>
            <li>
              <strong>~Mois 13&ndash;14</strong> — d&eacute;gressivit&eacute; au {joursDebutDegressivite}e
              jour indemnis&eacute;. ARE r&eacute;duite &agrave; {euros(ajApresDegressivite)}/jour
              ({euros(ajMensuelleApres)}/mois), sous r&eacute;serve d&apos;avoir moins de{' '}
              {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans.
            </li>
          </ol>

          <h3 className="mt-5 text-lg font-semibold text-slate-900">R&eacute;capitulation financ&egrave;re</h3>
          <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">SJR</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(sjr)}/jour</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">ARE journali&egrave;re</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(ajExemple)}/jour</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE mensuelle (mois 1&ndash;6 d&apos;indemnisation)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(ajMensuelle)}/mois</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-red-900">ARE mensuelle apr&egrave;s d&eacute;gressivit&eacute; (mois 7+)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-red-900">{euros(ajMensuelleApres)}/mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Dur&eacute;e indemnisation max. (&lt; 50 ans)</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;jours (12 mois)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Dur&eacute;e indemnisation max. (50 ans et plus)</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.dureeMax50ansEtPlusJours}&nbsp;jours (24 mois)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Param&egrave;tres Unédic en vigueur au 01/07/2025.
            Taux {ARE_PARAMS.tauxFormule2}, partie fixe {euros(ARE_PARAMS.partieFix)},
            seuil d&eacute;gressivit&eacute; {euros(ARE_PARAMS.seuilDegressiviteAJ)}/jour.
          </p>
        </section>

        {/* 7. Priorité de réembauche */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Priorit&eacute; de r&eacute;embauche&nbsp;: 1&nbsp;an pour les cadres
          </h2>
          <p className="mt-3">
            Tout salari&eacute; licenci&eacute; pour motif &eacute;conomique b&eacute;n&eacute;ficie
            d&apos;une <strong>priorit&eacute; de r&eacute;embauche pendant 12&nbsp;mois</strong>{' '}
            (art. L.1233-45 du Code du travail). L&apos;employeur doit informer le salari&eacute;
            de tout emploi compatible avec sa qualification, aussi bien &agrave; l&apos;identique
            qu&apos;&agrave; un niveau &eacute;quivalent ou inf&eacute;rieur (avec accord de
            l&apos;int&eacute;ress&eacute;).
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Cumul possible avec l&apos;ARE&nbsp;:</strong> si le cadre reprend un emploi
              en activit&eacute; r&eacute;duite, il peut cumuler partiellement ARE et revenus
              d&apos;activit&eacute; (activit&eacute; r&eacute;duite).
            </li>
            <li>
              <strong>D&eacute;lai de 12&nbsp;mois&nbsp;:</strong> la priorit&eacute; court &agrave;
              compter de la date de rupture du contrat (fin du cong&eacute; de reclassement, le
              cas &eacute;ch&eacute;ant).
            </li>
            <li>
              <strong>Obligation d&apos;information&nbsp;:</strong> l&apos;employeur doit notifier
              par &eacute;crit. Le cadre dispose d&apos;un d&eacute;lai r&eacute;asonnable pour
              r&eacute;pondre.
            </li>
          </ul>
        </section>

        {/* 8. Comparatif licenciement éco vs RC */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Comparatif licenciement &eacute;conomique vs rupture conventionnelle
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Licenciement &eacute;conomique</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Rupture conventionnelle</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemnit&eacute; l&eacute;gale</td>
                  <td className="border border-slate-200 px-4 py-2">1/4 mois/an (idem RC)</td>
                  <td className="border border-slate-200 px-4 py-2">1/4 mois/an (idem)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Plafond franchise supra-l&eacute;gale</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">
                    {ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;jours (favorable)
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700 font-medium">
                    {ARE_PARAMS.franchiseMaxRC}&nbsp;jours
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Cong&eacute; de reclassement</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Oui (PSE) — 4 &agrave; 12 mois</td>
                  <td className="border border-slate-200 px-4 py-2 text-slate-500">Non</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Priorit&eacute; r&eacute;embauche</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Oui — 12 mois</td>
                  <td className="border border-slate-200 px-4 py-2 text-slate-500">Non</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Montant ARE</td>
                  <td className="border border-slate-200 px-4 py-2" colSpan={2}>
                    Identique — bas&eacute; sur le SJR, ind&eacute;pendant du motif
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Impact retraite</td>
                  <td className="border border-slate-200 px-4 py-2" colSpan={2}>
                    Identique — trimestres ch&ocirc;mage valid&eacute;s de la m&ecirc;me fa&ccedil;on
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">N&eacute;gociabilit&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2">Encadr&eacute;e par la CCN</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Libre, sans limite</td>
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
                Un cadre licenci&eacute; pour motif &eacute;conomique touche-t-il plus de ch&ocirc;mage&nbsp;?
              </h3>
              <p className="mt-1 text-slate-700">
                Non. Le montant de l&apos;ARE d&eacute;pend uniquement du salaire ant&eacute;rieur.
                Un cadre &agrave; {euros(SALAIRE_EXEMPLE)}/mois per&ccedil;oit {euros(ajExemple)}/jour
                ({euros(ajMensuelle)}/mois) quel que soit le motif. L&apos;avantage du licenciement
                &eacute;co est un plafond de franchise r&eacute;duit &agrave;{' '}
                {ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;jours (vs {ARE_PARAMS.franchiseMaxRC}
                &nbsp;j en RC).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Le cong&eacute; de reclassement retarde-t-il le versement de l&apos;ARE&nbsp;?
              </h3>
              <p className="mt-1 text-slate-700">
                Oui. Pendant le cong&eacute; de reclassement, le cadre est encore sous contrat
                et ne peut pas percevoir l&apos;ARE. Le premier versement intervient &agrave;
                l&apos;issue du cong&eacute;, apr&egrave;s le d&eacute;lai d&apos;attente de{' '}
                {DELAI_ATTENTE}&nbsp;jours et le diff&eacute;r&eacute; CP.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Quelle diff&eacute;rence entre licenciement &eacute;conomique et rupture conventionnelle
                pour un cadre&nbsp;?
              </h3>
              <p className="mt-1 text-slate-700">
                L&apos;ARE est identique dans les deux cas. Les diff&eacute;rences sont&nbsp;: plafond de
                franchise r&eacute;duit ({ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;j vs{' '}
                {ARE_PARAMS.franchiseMaxRC}&nbsp;j), priorit&eacute; de r&eacute;embauche 12&nbsp;mois
                et cong&eacute; de reclassement, propres au licenciement &eacute;co&nbsp;; n&eacute;gociabilit&eacute;
                libre de l&apos;indemnit&eacute;, propre &agrave; la RC.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* 10. CTA */}
      <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
        <h2 className="text-xl font-bold text-blue-900">
          Calculez votre ARE apr&egrave;s licenciement &eacute;conomique
        </h2>
        <p className="mt-2 text-blue-700">
          Renseignez votre salaire brut et obtenez votre allocation journali&egrave;re, mensuelle
          et la date pr&eacute;visible de votre d&eacute;gressivit&eacute;.
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
            href="/rupture-conventionnelle-cadre"
            className="rounded-lg border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400"
          >
            Rupture conventionnelle cadre
          </Link>
        </div>
      </div>

      <nav className="mt-10 border-t border-slate-200 pt-6">
        <p className="mb-3 text-sm font-medium text-slate-600">Pages li&eacute;es</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/licenciement-economique" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Licenciement &eacute;conomique (toutes situations)
          </Link>
          <Link href="/degressivite-chomage" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            D&eacute;gressivit&eacute; ARE
          </Link>
          <Link href="/rupture-conventionnelle-cadre" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Rupture conventionnelle cadre
          </Link>
        </div>
      </nav>
    </main>
  )
}
