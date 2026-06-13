import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Chomage interimaire 2025 : calcul ARE apres mission",
  description: "Fin de mission d'interim ? Votre ARE calculee sur vos missions effectives + primes de precarite. Exemple complet avec montants.",
  alternates: {
    canonical: 'https://www.monchomage.fr/chomage-interimaire',
  },
}

// ── Constantes spécifiques intérim — Annexe 4 Unédic ─────────────────────────
// Ces valeurs ne figurent pas dans ARE_PARAMS (propres à l'Annexe 4).
// Toutes les formules de calcul de l'AJ restent celles d'ARE_PARAMS.
const INTERIM_JOURS_MIN = 130           // jours travaillés minimum sur 24 mois (Annexe 4)
const INTERIM_HEURES_MIN = 910          // équivalent heures du seuil minimum
const INTERIM_HEURES_88J = 88           // seuil de rechargement sur 28 jours consécutifs
const INTERIM_TAUX_PRECARITE = 0.10     // indemnité de fin de mission (art. L.1251-32 C.trav.)
const INTERIM_TAUX_CP = 0.10            // indemnité compensatrice de congés payés (art. L.3141-28)
const INTERIM_JOURS_RECHARGEMENT = 130  // jours minimum pour recharger des droits

// ── Exemple section 3 : 6 mois de missions à 2 000 €/mois ───────────────────
const EX3_SALAIRE_MENSUEL = 2_000
const EX3_MOIS = 6
const EX3_JOURS_TRAVAILLES = 182 // ~6 mois de missions effectives
const ex3TotalBrut = EX3_SALAIRE_MENSUEL * EX3_MOIS
const ex3Precarite = ex3TotalBrut * INTERIM_TAUX_PRECARITE
const ex3CP = ex3TotalBrut * INTERIM_TAUX_CP
const ex3Assiette = ex3TotalBrut + ex3Precarite + ex3CP
const ex3Sjr = Number((ex3Assiette / EX3_JOURS_TRAVAILLES).toFixed(2))
const ex3F1 = ARE_PARAMS.tauxFormule1 * ex3Sjr + ARE_PARAMS.partieFix
const ex3F2 = ARE_PARAMS.tauxFormule2 * ex3Sjr
const ex3AjBrut = Math.max(ex3F1, ex3F2)
const ex3Aj = Number(
  Math.max(Math.min(ex3AjBrut, ARE_PARAMS.plafondTauxSJR * ex3Sjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const ex3AjMensuelle = Number((ex3Aj * ARE_PARAMS.joursParMois).toFixed(2))

// ── Tableau durée d'indemnisation selon jours travaillés ─────────────────────
const DUREES_TABLEAU = [INTERIM_JOURS_MIN, ARE_PARAMS.dureeMinJours, 365, 546, 730]
const tableauDuree = DUREES_TABLEAU.map((jours) => ({
  jours,
  dureeMoins50: Math.min(jours, ARE_PARAMS.dureeMaxMoins50ansJours),
  duree50Plus: Math.min(jours, ARE_PARAMS.dureeMax50ansEtPlusJours),
}))

// ── Exemple complet section 7 : 8 mois (244 j), 2 200 €/mois ────────────────
const EX7_SALAIRE_MENSUEL = 2_200
const EX7_MOIS = 8
const EX7_JOURS_TRAVAILLES = 244
const ex7TotalBrut = EX7_SALAIRE_MENSUEL * EX7_MOIS
const ex7Precarite = ex7TotalBrut * INTERIM_TAUX_PRECARITE
const ex7CP = ex7TotalBrut * INTERIM_TAUX_CP
const ex7Assiette = ex7TotalBrut + ex7Precarite + ex7CP
const ex7Sjr = Number((ex7Assiette / EX7_JOURS_TRAVAILLES).toFixed(2))
const ex7F1 = ARE_PARAMS.tauxFormule1 * ex7Sjr + ARE_PARAMS.partieFix
const ex7F2 = ARE_PARAMS.tauxFormule2 * ex7Sjr
const ex7AjBrut = Math.max(ex7F1, ex7F2)
const ex7Aj = Number(
  Math.max(Math.min(ex7AjBrut, ARE_PARAMS.plafondTauxSJR * ex7Sjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const ex7AjMensuelle = Number((ex7Aj * ARE_PARAMS.joursParMois).toFixed(2))

// ── JSON-LD ──────────────────────────────────────────────────────────────────
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chomage interimaire', item: 'https://www.monchomage.fr/chomage-interimaire' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Un interimaire a-t-il droit au chomage entre deux missions ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui, sous conditions. L'interimaire doit avoir travaille au moins ${INTERIM_JOURS_MIN} jours (${INTERIM_HEURES_MIN} heures) sur les ${ARE_PARAMS.moisRefMoins55ans} derniers mois et s'inscrire a France Travail. L'ARE est versee uniquement pendant les periodes sans mission. Des qu'une nouvelle mission debute, l'ARE est suspendue.`,
      },
    },
    {
      '@type': 'Question',
      name: "Comment est calcule le SJR d'un interimaire ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Le SJR d'un interimaire est calcule en divisant le total de l'assiette (salaires bruts des missions + indemnite de fin de mission ${Math.round(INTERIM_TAUX_PRECARITE * 100)} % + indemnite de conges payes ${Math.round(INTERIM_TAUX_CP * 100)} %) par le nombre de jours effectivement travailles sur la periode de reference. C'est la specificite de l'Annexe 4 Unedic : on divise par les jours travailles et non par les jours calendaires.`,
      },
    },
    {
      '@type': 'Question',
      name: "Que se passe-t-il si un interimaire refuse un CDI apres sa mission ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Depuis la reforme de 2023, refuser un CDI propose par l'entreprise utilisatrice a l'issue d'une mission, aux memes conditions de poste et de remuneration, prive du droit a l'ARE. L'employeur (agence d'interim) doit en informer France Travail. Si les conditions du CDI propose sont differentes (salaire inferieur, poste different), le refus n'entraine pas la perte des droits.`,
      },
    },
  ],
}

export default function ChomageInterimaire() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}Ch&ocirc;mage int&eacute;rimaire
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Ch&ocirc;mage int&eacute;rimaire&nbsp;: calcul ARE et droits apr&egrave;s mission 2025
      </h1>

      <div className="mt-8 space-y-10 text-slate-700">

        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Le statut int&eacute;rimaire face au ch&ocirc;mage
          </h2>
          <p className="mt-3">
            Les int&eacute;rimaires rel&egrave;vent de l&apos;<strong>Annexe&nbsp;4 de la convention
            Unédic</strong>, qui adapte les r&egrave;gles g&eacute;n&eacute;rales de l&apos;assurance
            ch&ocirc;mage &agrave; leur statut&nbsp;: missions courtes et discontinues, alternance
            fr&eacute;quente entre p&eacute;riodes d&apos;emploi et de non-emploi, r&eacute;mun&eacute;ration
            incluant des indemnit&eacute;s sp&eacute;cifiques (fin de mission, cong&eacute;s pay&eacute;s).
            Les formules de calcul de l&apos;ARE sont identiques &agrave; celles des autres salari&eacute;s,
            mais le <strong>SJR est calcul&eacute; sur les jours effectivement travaill&eacute;s</strong>{' '}
            et non sur les jours calendaires. Les droits sont ouverts d&egrave;s{' '}
            <strong>{INTERIM_HEURES_88J}&nbsp;heures travaill&eacute;es sur 28&nbsp;jours
            cons&eacute;cutifs</strong> pour un rechargement, et l&apos;affiliation minimale est de{' '}
            {INTERIM_JOURS_MIN}&nbsp;jours ({INTERIM_HEURES_MIN}&nbsp;heures) sur les{' '}
            {ARE_PARAMS.moisRefMoins55ans}&nbsp;derniers mois. L&apos;ARE est vers&eacute;e pendant
            chaque p&eacute;riode de non-emploi, suspendue d&egrave;s la reprise d&apos;une mission.
          </p>
        </section>

        {/* 2. Conditions d'accès */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Conditions d&apos;acc&egrave;s &agrave; l&apos;ARE pour un int&eacute;rimaire
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Affiliation minimale</td>
                  <td className="border border-slate-200 px-4 py-2">
                    {INTERIM_JOURS_MIN}&nbsp;jours ({INTERIM_HEURES_MIN}&nbsp;heures) travaill&eacute;s
                    sur les {ARE_PARAMS.moisRefMoins55ans}&nbsp;derniers mois
                    ({ARE_PARAMS.moisRefPlus55ans}&nbsp;mois pour les 55 ans et plus)
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Motif d&apos;ouverture</td>
                  <td className="border border-slate-200 px-4 py-2">
                    Fin de mission (terme &eacute;chu), fin anticip&eacute;e par l&apos;entreprise
                    utilisatrice, refus de renouvellement
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">D&eacute;lai d&apos;inscription</td>
                  <td className="border border-slate-200 px-4 py-2">
                    12&nbsp;mois maximum apr&egrave;s la fin de la derni&egrave;re mission
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">D&eacute;lai de carence</td>
                  <td className="border border-slate-200 px-4 py-2">
                    7&nbsp;jours d&apos;attente + diff&eacute;r&eacute; CP non pris (variable)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-5 text-lg font-semibold text-slate-900">
            Cas particulier&nbsp;: refus de CDI apr&egrave;s une mission
          </h3>
          <p className="mt-2">
            Depuis la r&eacute;forme de 2023, refuser un CDI propos&eacute; par l&apos;entreprise
            utilisatrice &agrave; l&apos;issue d&apos;une mission — aux <em>m&ecirc;mes conditions
            de poste et de r&eacute;mun&eacute;ration</em> — prive du droit &agrave; l&apos;ARE.
            L&apos;agence d&apos;int&eacute;rim doit en informer France Travail. Si les conditions
            propos&eacute;es sont moins favorables (salaire r&eacute;duit, poste diff&eacute;rent,
            lieu de travail &eacute;loign&eacute;), le refus ne fait pas obstacle &agrave; l&apos;ARE.
          </p>
        </section>

        {/* 3. Calcul SJR intérimaire */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul du SJR int&eacute;rimaire&nbsp;: exemple {EX3_MOIS}&nbsp;mois &agrave;{' '}
            {euros(EX3_SALAIRE_MENSUEL)}/mois
          </h2>
          <p className="mt-3">
            La sp&eacute;cificit&eacute; de l&apos;Annexe&nbsp;4&nbsp;: le SJR est calcul&eacute;
            en divisant l&apos;assiette totale (salaires + indemnit&eacute;s) par le nombre de
            <strong> jours effectivement travaill&eacute;s</strong>, et non par les jours
            calendaires. L&apos;assiette inclut&nbsp;:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Les salaires bruts des missions ;</li>
            <li>
              L&apos;indemnit&eacute; de fin de mission (prime de pr&eacute;carit&eacute;)&nbsp;:
              {' '}{Math.round(INTERIM_TAUX_PRECARITE * 100)}&nbsp;% des salaires bruts ;</li>
            <li>
              L&apos;indemnit&eacute; compensatrice de cong&eacute;s pay&eacute;s&nbsp;:
              {' '}{Math.round(INTERIM_TAUX_CP * 100)}&nbsp;% des salaires bruts.
            </li>
          </ul>

          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Salaires bruts missions</td>
                  <td className="border border-slate-200 px-4 py-2">
                    {EX3_MOIS} &times; {euros(EX3_SALAIRE_MENSUEL)} = {euros(ex3TotalBrut)}
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    + Ind. fin de mission ({Math.round(INTERIM_TAUX_PRECARITE * 100)}&nbsp;%)
                  </td>
                  <td className="border border-slate-200 px-4 py-2">{euros(ex3Precarite)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    + Ind. cong&eacute;s pay&eacute;s ({Math.round(INTERIM_TAUX_CP * 100)}&nbsp;%)
                  </td>
                  <td className="border border-slate-200 px-4 py-2">{euros(ex3CP)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Assiette totale</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{euros(ex3Assiette)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Jours travaill&eacute;s</td>
                  <td className="border border-slate-200 px-4 py-2">{EX3_JOURS_TRAVAILLES}&nbsp;j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    SJR = {euros(ex3Assiette)} &divide; {EX3_JOURS_TRAVAILLES}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{euros(ex3Sjr)}/jour</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    Formule 1&nbsp;: {ARE_PARAMS.tauxFormule1} &times; SJR + {euros(ARE_PARAMS.partieFix)}
                  </td>
                  <td className="border border-slate-200 px-4 py-2">{euros(ex3F1)}/jour</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    Formule 2&nbsp;: {ARE_PARAMS.tauxFormule2} &times; SJR
                  </td>
                  <td className="border border-slate-200 px-4 py-2">{euros(ex3F2)}/jour</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE journali&egrave;re</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(ex3Aj)}/jour</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE mensuelle</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">
                    {euros(ex3AjMensuelle)}/mois
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Param&egrave;tres Unédic en vigueur au 01/07/2025.
            Taux {ARE_PARAMS.tauxFormule1}/{ARE_PARAMS.tauxFormule2},
            partie fixe {euros(ARE_PARAMS.partieFix)},
            plancher {euros(ARE_PARAMS.allocationMinimale)}/jour.
          </p>
        </section>

        {/* 4. Durée d'indemnisation */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Dur&eacute;e d&apos;indemnisation et rechargement des droits
          </h2>
          <p className="mt-3">
            La r&egrave;gle est identique &agrave; celle des autres salari&eacute;s&nbsp;: 1 jour
            travaill&eacute; = 1 jour indemnis&eacute;, dans la limite des plafonds l&eacute;gaux.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-3 py-2 text-left">Jours travaill&eacute;s</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">Dur&eacute;e ARE (&lt;&nbsp;50 ans)</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">Dur&eacute;e ARE (50 ans et +)</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">Note</th>
                </tr>
              </thead>
              <tbody>
                {tableauDuree.map(({ jours, dureeMoins50, duree50Plus }) => (
                  <tr key={jours} className="odd:bg-white even:bg-slate-50">
                    <td className="border border-slate-200 px-3 py-2 font-medium">{jours}&nbsp;j</td>
                    <td className="border border-slate-200 px-3 py-2 font-semibold text-blue-700">
                      {dureeMoins50}&nbsp;j
                      {dureeMoins50 < jours ? ' (plafonn&eacute;)' : ''}
                    </td>
                    <td className="border border-slate-200 px-3 py-2 font-semibold text-blue-700">
                      {duree50Plus}&nbsp;j
                    </td>
                    <td className="border border-slate-200 px-3 py-2 text-slate-500 text-xs">
                      {jours === INTERIM_JOURS_MIN && 'Seuil minimum Annexe 4'}
                      {jours === ARE_PARAMS.dureeMinJours && 'Seuil g&eacute;n&eacute;ral ARE'}
                      {jours === ARE_PARAMS.dureeMaxMoins50ansJours && 'Plafond &lt; 50 ans atteint'}
                      {jours > ARE_PARAMS.dureeMaxMoins50ansJours && jours <= ARE_PARAMS.dureeMax50ansEtPlusJours && '&lt; 50 ans plafonn&eacute; — 50+ non plafonn&eacute;'}
                      {jours === ARE_PARAMS.dureeMax50ansEtPlusJours && 'Plafond max (50 ans et plus)'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-5 text-lg font-semibold text-slate-900">
            Rechargement des droits
          </h3>
          <p className="mt-2">
            Le rechargement permet d&apos;allonger les droits sans attendre leur &eacute;puisement&nbsp;:
            toute nouvelle p&eacute;riode de travail d&apos;au moins{' '}
            <strong>{INTERIM_JOURS_RECHARGEMENT}&nbsp;jours</strong> entre deux ouvertures de
            droits recharge le compteur. Pour les int&eacute;rimaires, m&ecirc;me une mission de
            quelques semaines cumule des jours qui viendront s&apos;ajouter aux droits restants.
            Un rechargement minimal n&eacute;cessite au moins{' '}
            <strong>{INTERIM_HEURES_88J}&nbsp;heures sur 28&nbsp;jours cons&eacute;cutifs</strong>.
          </p>
        </section>

        {/* 5. Périodes de non-emploi */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            ARE pendant les p&eacute;riodes de non-emploi
          </h2>
          <p className="mt-3">
            L&apos;ARE est vers&eacute;e <strong>uniquement pendant les p&eacute;riodes sans
            mission</strong>. D&egrave;s la reprise d&apos;une mission — m&ecirc;me &agrave;
            temps partiel — l&apos;ARE est suspendue ou r&eacute;duite selon les r&egrave;gles
            d&apos;activit&eacute; r&eacute;duite.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Cumul ARE + salaire mission&nbsp;:</strong> si la mission est &agrave; temps
              partiel ou de courte dur&eacute;e, il est possible de cumuler partiellement l&apos;ARE
              avec les revenus de la mission. Le total (ARE r&eacute;duite + salaire) est
              g&eacute;n&eacute;ralement sup&eacute;rieur &agrave; l&apos;ARE seule.{' '}
              <Link href="/cumul-emploi-chomage" className="text-blue-700 underline hover:text-blue-900">
                Voir les r&egrave;gles de cumul &rarr;
              </Link>
            </li>
            <li>
              <strong>Actualisation mensuelle obligatoire&nbsp;:</strong> l&apos;int&eacute;rimaire
              doit d&eacute;clarer chaque mois ses heures travaill&eacute;es et ses revenus de
              mission via l&apos;espace personnel France Travail. L&apos;ARE est alors recalcul&eacute;e
              en cons&eacute;quence.
            </li>
            <li>
              <strong>Jours indemnis&eacute;s conserv&eacute;s&nbsp;:</strong> les jours
              d&apos;ARE non utilis&eacute;s pendant une mission sont conserv&eacute;s et
              reportent la fin des droits d&apos;autant.
            </li>
          </ul>
        </section>

        {/* 6. Cas particuliers */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Cas particuliers int&eacute;rimaires
          </h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Fin de mission anticip&eacute;e par l&apos;entreprise utilisatrice
              </h3>
              <p className="mt-1 text-sm">
                Si l&apos;entreprise met fin &agrave; la mission avant le terme pr&eacute;vu,
                l&apos;int&eacute;rimaire b&eacute;n&eacute;ficie des droits ARE (si l&apos;affiliation
                minimale est atteinte). L&apos;agence d&apos;int&eacute;rim peut &ecirc;tre tenue
                de rechercher une nouvelle mission compatible.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Refus de renouvellement de mission
              </h3>
              <p className="mt-1 text-sm">
                Le refus de renouvellement par l&apos;entreprise utilisatrice est assimil&eacute;
                &agrave; une fin de mission normale&nbsp;: droits ARE pr&eacute;serv&eacute;s si
                les conditions d&apos;affiliation sont remplies.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-amber-50 p-4 border-amber-200">
              <h3 className="font-semibold text-amber-900">
                Rupture du contrat de mission par l&apos;int&eacute;rimaire
              </h3>
              <p className="mt-1 text-sm text-amber-800">
                Si c&apos;est l&apos;int&eacute;rimaire qui met fin &agrave; la mission avant le
                terme, c&apos;est assimil&eacute; &agrave; une d&eacute;mission. <strong>Aucun
                droit ARE</strong> sauf cas de d&eacute;mission l&eacute;gitime (d&eacute;m&eacute;nagement
                pour suivre un conjoint, victime de discrimination, etc.).
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Mission transform&eacute;e en CDI puis licenciement
              </h3>
              <p className="mt-1 text-sm">
                Si l&apos;int&eacute;rimaire est embauch&eacute; en CDI par l&apos;entreprise
                utilisatrice et est ensuite licenci&eacute;, les r&egrave;gles de droit commun
                s&apos;appliquent&nbsp;: indemnit&eacute; de licenciement, ARE calcul&eacute;e sur
                les salaires du CDI (et &eacute;ventuellement les missions ant&eacute;rieures si
                dans la p&eacute;riode de r&eacute;f&eacute;rence).
              </p>
            </div>
          </div>
        </section>

        {/* 7. Exemple complet */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Exemple complet&nbsp;: {EX7_MOIS}&nbsp;mois de missions ({EX7_JOURS_TRAVAILLES}&nbsp;j),
            {' '}{euros(EX7_SALAIRE_MENSUEL)}/mois
          </h2>

          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Salaires bruts missions</td>
                  <td className="border border-slate-200 px-4 py-2">
                    {EX7_MOIS} &times; {euros(EX7_SALAIRE_MENSUEL)} = {euros(ex7TotalBrut)}
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    + Ind. fin de mission ({Math.round(INTERIM_TAUX_PRECARITE * 100)}&nbsp;%)
                  </td>
                  <td className="border border-slate-200 px-4 py-2">{euros(ex7Precarite)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    + Ind. cong&eacute;s pay&eacute;s ({Math.round(INTERIM_TAUX_CP * 100)}&nbsp;%)
                  </td>
                  <td className="border border-slate-200 px-4 py-2">{euros(ex7CP)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Assiette totale</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{euros(ex7Assiette)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">SJR = assiette &divide; {EX7_JOURS_TRAVAILLES}&nbsp;j</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{euros(ex7Sjr)}/jour</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE journali&egrave;re</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(ex7Aj)}/jour</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE mensuelle</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(ex7AjMensuelle)}/mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Dur&eacute;e d&apos;indemnisation</td>
                  <td className="border border-slate-200 px-4 py-2">
                    {EX7_JOURS_TRAVAILLES}&nbsp;jours ({EX7_MOIS}&nbsp;mois)
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Rechargement possible si</td>
                  <td className="border border-slate-200 px-4 py-2">
                    Nouvelle mission d&apos;au moins {INTERIM_JOURS_RECHARGEMENT}&nbsp;j pendant les droits
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            D&eacute;gressivit&eacute;&nbsp;: avec un SJR de {euros(ex7Sjr)}/jour, l&apos;AJ de{' '}
            {euros(ex7Aj)}/jour est inf&eacute;rieure au seuil de{' '}
            {euros(ARE_PARAMS.seuilDegressiviteAJ)}/jour&nbsp;:{' '}
            <strong>pas de d&eacute;gressivit&eacute;</strong> dans cet exemple.
          </p>
        </section>

        {/* 8. Tableau comparatif */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Comparatif int&eacute;rimaire, CDI et CDD
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-3 py-2 text-left">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">Int&eacute;rimaire</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">CDD</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">CDI</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-3 py-2 font-medium">Base calcul SJR</td>
                  <td className="border border-slate-200 px-3 py-2">
                    Assiette (salaires + primes) &divide; jours <em>travaill&eacute;s</em>
                  </td>
                  <td className="border border-slate-200 px-3 py-2">
                    Salaires bruts &divide; jours calendaires p&eacute;riode
                  </td>
                  <td className="border border-slate-200 px-3 py-2">
                    Salaires bruts &divide; jours calendaires p&eacute;riode
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-3 py-2 font-medium">Affiliation minimale</td>
                  <td className="border border-slate-200 px-3 py-2">
                    {INTERIM_JOURS_MIN}&nbsp;j ({INTERIM_HEURES_MIN}&nbsp;h) / {ARE_PARAMS.moisRefMoins55ans}&nbsp;mois
                  </td>
                  <td className="border border-slate-200 px-3 py-2">
                    {ARE_PARAMS.dureeMinJours}&nbsp;j / {ARE_PARAMS.moisRefMoins55ans}&nbsp;mois
                  </td>
                  <td className="border border-slate-200 px-3 py-2">
                    {ARE_PARAMS.dureeMinJours}&nbsp;j / {ARE_PARAMS.moisRefMoins55ans}&nbsp;mois
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-3 py-2 font-medium">Dur&eacute;e droits</td>
                  <td className="border border-slate-200 px-3 py-2">
                    = jours travaill&eacute;s, plafonn&eacute;s &agrave;{' '}
                    {ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;j (&lt;&nbsp;50 ans)
                  </td>
                  <td className="border border-slate-200 px-3 py-2">
                    Idem — plafonn&eacute;s &agrave; {ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;j
                  </td>
                  <td className="border border-slate-200 px-3 py-2">
                    Idem — plafonn&eacute;s &agrave; {ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;j
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-3 py-2 font-medium">Rechargement droits</td>
                  <td className="border border-slate-200 px-3 py-2 text-green-700 font-medium">
                    D&egrave;s {INTERIM_JOURS_RECHARGEMENT}&nbsp;j de mission
                  </td>
                  <td className="border border-slate-200 px-3 py-2">
                    D&egrave;s {ARE_PARAMS.dureeMinJours}&nbsp;j travaill&eacute;s
                  </td>
                  <td className="border border-slate-200 px-3 py-2">
                    D&egrave;s {ARE_PARAMS.dureeMinJours}&nbsp;j travaill&eacute;s
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-3 py-2 font-medium">D&eacute;lai de carence</td>
                  <td className="border border-slate-200 px-3 py-2">7&nbsp;j + diff&eacute;r&eacute; CP</td>
                  <td className="border border-slate-200 px-3 py-2">7&nbsp;j + diff&eacute;r&eacute; CP</td>
                  <td className="border border-slate-200 px-3 py-2">7&nbsp;j + diff&eacute;r&eacute;s</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-3 py-2 font-medium">Cas sans ARE</td>
                  <td className="border border-slate-200 px-3 py-2">
                    Rupture volontaire de mission, refus CDI &agrave; conditions identiques
                  </td>
                  <td className="border border-slate-200 px-3 py-2">
                    Rupture avant terme par le salari&eacute;, refus CDI identique
                  </td>
                  <td className="border border-slate-200 px-3 py-2">
                    D&eacute;mission (hors cas l&eacute;gitimes)
                  </td>
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
                Un int&eacute;rimaire a-t-il droit au ch&ocirc;mage entre deux missions&nbsp;?
              </h3>
              <p className="mt-1 text-slate-700">
                Oui, sous conditions d&apos;affiliation ({INTERIM_JOURS_MIN}&nbsp;jours /{' '}
                {INTERIM_HEURES_MIN}&nbsp;heures sur {ARE_PARAMS.moisRefMoins55ans}&nbsp;mois).
                L&apos;ARE est vers&eacute;e pendant chaque p&eacute;riode sans mission et suspendue
                d&egrave;s la reprise d&apos;un contrat.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Comment est calcul&eacute; le SJR d&apos;un int&eacute;rimaire&nbsp;?
              </h3>
              <p className="mt-1 text-slate-700">
                Le SJR est calcul&eacute; sur l&apos;assiette totale (salaires bruts + indemnit&eacute;
                de fin de mission {Math.round(INTERIM_TAUX_PRECARITE * 100)}&nbsp;% + ind. CP{' '}
                {Math.round(INTERIM_TAUX_CP * 100)}&nbsp;%) divis&eacute;e par les jours effectivement
                travaill&eacute;s (et non les jours calendaires). C&apos;est la sp&eacute;cificit&eacute;
                de l&apos;Annexe&nbsp;4 Unédic.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Que se passe-t-il si un int&eacute;rimaire refuse un CDI apr&egrave;s sa mission&nbsp;?
              </h3>
              <p className="mt-1 text-slate-700">
                Depuis 2023, refuser un CDI propos&eacute; aux m&ecirc;mes conditions prive du droit
                &agrave; l&apos;ARE. Si les conditions propos&eacute;es sont moins favorables, le
                refus ne fait pas obstacle &agrave; l&apos;ARE. En cas de doute, se rapprocher de
                France Travail avant de refuser.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* 10. CTA */}
      <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
        <h2 className="text-xl font-bold text-blue-900">
          Estimez votre ARE apr&egrave;s une mission d&apos;int&eacute;rim
        </h2>
        <p className="mt-2 text-blue-700">
          Renseignez votre salaire brut moyen sur vos missions pour obtenir une estimation
          de votre allocation journali&egrave;re et mensuelle.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700"
          >
            Calculateur ARE
          </Link>
          <Link
            href="/cumul-emploi-chomage"
            className="rounded-lg border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400"
          >
            Cumul emploi-ch&ocirc;mage
          </Link>
          <Link
            href="/fin-de-cdd-interimaire"
            className="rounded-lg border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400"
          >
            Fin de mission int&eacute;rim (bient&ocirc;t)
          </Link>
        </div>
      </div>

      <nav className="mt-10 border-t border-slate-200 pt-6">
        <p className="mb-3 text-sm font-medium text-slate-600">Pages li&eacute;es</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/fin-de-cdd" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Ch&ocirc;mage apr&egrave;s fin de CDD
          </Link>
          <Link href="/cumul-emploi-chomage" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Cumul emploi-ch&ocirc;mage
          </Link>
          <Link href="/" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Calculateur ARE
          </Link>
        </div>
      </nav>
    </main>
  )
}
