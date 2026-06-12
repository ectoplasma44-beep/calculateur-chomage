import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Fin de mission interim chomage 2025 : calcul ARE et droits",
  description: "Fin de mission d'interim ? Calcul ARE, SJR sur missions effectives, delai de carence et droits 2025. Exemples chiffres pour interimaires.",
  alternates: { canonical: 'https://www.monchomage.fr/fin-de-cdd-interimaire' },
}

// ── Constantes Annexe 4 Unédic — non dans ARE_PARAMS ────────────────────────
const INTERIM_JOURS_MIN = 130
const INTERIM_HEURES_MIN = 910
const INTERIM_TAUX_PRECARITE = 0.10
const INTERIM_TAUX_CP = 0.10
const INTERIM_JOURS_RECHARGEMENT = 130
const DELAI_ATTENTE = 7

// ── Exemple : 4 missions sur 6 mois, total 11 000 € brut ────────────────────
const EX_TOTAL_BRUT = 11_000
const EX_JOURS_TRAVAILLES = 182
const exPrecarite = EX_TOTAL_BRUT * INTERIM_TAUX_PRECARITE
const exCP = EX_TOTAL_BRUT * INTERIM_TAUX_CP
const exAssiette = EX_TOTAL_BRUT + exPrecarite + exCP
const exSjr = Number((exAssiette / EX_JOURS_TRAVAILLES).toFixed(2))
const exF1 = ARE_PARAMS.tauxFormule1 * exSjr + ARE_PARAMS.partieFix
const exF2 = ARE_PARAMS.tauxFormule2 * exSjr
const exAj = Number(
  Math.max(Math.min(Math.max(exF1, exF2), ARE_PARAMS.plafondTauxSJR * exSjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const exAjMensuelle = Number((exAj * ARE_PARAMS.joursParMois).toFixed(2))

// ── Tableau carence selon durée de missions ──────────────────────────────────
// Pour les intérimaires : ICP (10%) payée à chaque fin de mission
// => pas de différé CP résiduel => carence = uniquement délai d'attente 7j
const DUREES_MISSIONS_MOIS = [3, 6, 9, 12]
const tableauCarence = DUREES_MISSIONS_MOIS.map((mois) => {
  const joursT = Math.round(mois * ARE_PARAMS.joursParMoisSJR)
  const dureeMoins50 = Math.min(joursT, ARE_PARAMS.dureeMaxMoins50ansJours)
  const duree50Plus = Math.min(joursT, ARE_PARAMS.dureeMax50ansEtPlusJours)
  // ICP versée avec chaque mission → pas de différé CP → carence = 7j
  return { mois, joursT, carence: DELAI_ATTENTE, dureeMoins50, duree50Plus }
})

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chomage interimaire', item: 'https://www.monchomage.fr/chomage-interimaire' },
    { '@type': 'ListItem', position: 3, name: 'Fin de mission interim', item: 'https://www.monchomage.fr/fin-de-cdd-interimaire' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Peut-on toucher le chomage apres chaque fin de mission ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui, a condition d'avoir accumule au moins ${INTERIM_JOURS_MIN} jours (${INTERIM_HEURES_MIN} heures) de missions sur les ${ARE_PARAMS.moisRefMoins55ans} derniers mois et d'etre inscrit a France Travail. L'ARE est versee pendant chaque periode sans mission et suspendue des la reprise d'un contrat d'interim.`,
      },
    },
    {
      '@type': 'Question',
      name: "La prime de precarite est-elle incluse dans le calcul de l'ARE ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui, pour les interimaires. L'indemnite de fin de mission (${Math.round(INTERIM_TAUX_PRECARITE * 100)} % des salaires bruts) et l'indemnite compensatrice de conges payes (${Math.round(INTERIM_TAUX_CP * 100)} %) sont integrees dans l'assiette servant a calculer le SJR, conformement a l'Annexe 4 de la convention Unedic. C'est une specificite par rapport aux CDD classiques.`,
      },
    },
    {
      '@type': 'Question',
      name: "Combien de temps apres une fin de mission recoit-on l'ARE ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Le delai de carence est de ${DELAI_ATTENTE} jours (delai d'attente incompressible). Pour les interimaires, l'indemnite compensatrice de conges payes etant versee avec chaque mission, il n'y a generalement pas de differe CP supplementaire. Le premier versement intervient donc environ ${DELAI_ATTENTE + 14} a 21 jours apres la fin de la derniere mission (delai de traitement administratif inclus).`,
      },
    },
  ],
}

export default function FinDeCDDInterimaire() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}
        <Link href="/chomage-interimaire" className="hover:underline">Ch&ocirc;mage int&eacute;rimaire</Link>
        {' '}&rsaquo;{' '}Fin de mission int&eacute;rim
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Fin de mission int&eacute;rim&nbsp;: ARE, droits et calcul 2025
      </h1>

      <div className="mt-8 space-y-10 text-slate-700">

        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Fin de mission&nbsp;: un motif valable d&apos;ARE automatique
          </h2>
          <p className="mt-3">
            Contrairement &agrave; la d&eacute;mission, la fin d&apos;un contrat de mission
            d&apos;int&eacute;rim est assimil&eacute;e &agrave; une perte involontaire d&apos;emploi.
            Elle ouvre droit &agrave; l&apos;ARE <strong>sans avoir &agrave; justifier d&apos;un
            motif sp&eacute;cifique</strong>&nbsp;: le seul fait que la mission arrive &agrave; son
            terme suffit. L&apos;Annexe&nbsp;4 de la convention Unédic organise sp&eacute;cifiquement
            l&apos;indemnisation des int&eacute;rimaires&nbsp;: m&ecirc;me r&egrave;gles g&eacute;n&eacute;rales
            de calcul de l&apos;ARE, mais SJR calcul&eacute; sur les jours effectivement travaill&eacute;s,
            et indemnit&eacute;s de mission (pr&eacute;carit&eacute; + CP) int&eacute;gr&eacute;es dans
            l&apos;assiette. L&apos;ARE est vers&eacute;e pendant chaque p&eacute;riode sans mission
            et suspendue automatiquement &agrave; la reprise d&apos;un contrat.
          </p>
        </section>

        {/* 2. Conditions */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Conditions d&apos;ouverture des droits
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Affiliation minimale&nbsp;: {INTERIM_JOURS_MIN}&nbsp;jours ({INTERIM_HEURES_MIN}&nbsp;heures)</strong>{' '}
              travaill&eacute;s sur les {ARE_PARAMS.moisRefMoins55ans}&nbsp;derniers mois
              ({ARE_PARAMS.moisRefPlus55ans}&nbsp;mois pour les 55 ans et plus). Les missions
              pour diff&eacute;rentes agences s&apos;additionnent.
            </li>
            <li>
              <strong>Inscription &agrave; France Travail</strong> dans les 12&nbsp;mois suivant
              la fin de la derni&egrave;re mission.
            </li>
            <li>
              Recherche active d&apos;emploi, aptitude au travail, r&eacute;sidence en France.
            </li>
            <li>
              Ne pas avoir refus&eacute; un CDI propos&eacute; aux m&ecirc;mes conditions de poste
              et de r&eacute;mun&eacute;ration &agrave; l&apos;issue de la mission.
            </li>
          </ul>
        </section>

        {/* 3. SJR */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul du SJR&nbsp;: 4 missions sur 6 mois, {euros(EX_TOTAL_BRUT)} brut total
          </h2>
          <p className="mt-3">
            L&apos;assiette int&eacute;rimaire inclut les salaires bruts des missions,
            l&apos;indemnit&eacute; de fin de mission ({Math.round(INTERIM_TAUX_PRECARITE * 100)}&nbsp;%)
            et l&apos;indemnit&eacute; compensatrice de cong&eacute;s pay&eacute;s
            ({Math.round(INTERIM_TAUX_CP * 100)}&nbsp;%). Le SJR est divis&eacute; par les jours
            effectivement travaill&eacute;s (Annexe&nbsp;4), non par les jours calendaires.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Total salaires bruts missions</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(EX_TOTAL_BRUT)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">+ Ind. fin de mission ({Math.round(INTERIM_TAUX_PRECARITE * 100)}&nbsp;%)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exPrecarite)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">+ Ind. CP ({Math.round(INTERIM_TAUX_CP * 100)}&nbsp;%)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exCP)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Assiette totale</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{euros(exAssiette)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Jours travaill&eacute;s</td>
                  <td className="border border-slate-200 px-4 py-2">{EX_JOURS_TRAVAILLES}&nbsp;j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">SJR = {euros(exAssiette)} &divide; {EX_JOURS_TRAVAILLES}</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{euros(exSjr)}/jour</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule 1&nbsp;: {ARE_PARAMS.tauxFormule1} &times; SJR + {euros(ARE_PARAMS.partieFix)}</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exF1)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule 2&nbsp;: {ARE_PARAMS.tauxFormule2} &times; SJR</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exF2)}/j</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE journali&egrave;re</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(exAj)}/jour</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE mensuelle</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(exAjMensuelle)}/mois</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Délai de carence */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            D&eacute;lai de carence apr&egrave;s une fin de mission
          </h2>
          <p className="mt-3">
            Pour un int&eacute;rimaire, l&apos;indemnit&eacute; compensatrice de cong&eacute;s
            pay&eacute;s (ICP, {Math.round(INTERIM_TAUX_CP * 100)}&nbsp;%) est vers&eacute;e avec
            chaque mission. Il n&apos;y a donc g&eacute;n&eacute;ralement <strong>pas de diff&eacute;r&eacute;
            CP</strong> &agrave; l&apos;issue des missions&nbsp;: la carence se r&eacute;duit au
            seul <strong>d&eacute;lai d&apos;attente de {DELAI_ATTENTE}&nbsp;jours</strong>.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-3 py-2 text-left">Dur&eacute;e missions</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">Jours travaill&eacute;s</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">Carence (ICP pay&eacute;e)</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">Dur&eacute;e ARE (&lt;&nbsp;50 ans)</th>
                  <th className="border border-slate-200 px-3 py-2 text-left">Dur&eacute;e ARE (50+ ans)</th>
                </tr>
              </thead>
              <tbody>
                {tableauCarence.map(({ mois, joursT, carence, dureeMoins50, duree50Plus }) => (
                  <tr key={mois} className="odd:bg-white even:bg-slate-50">
                    <td className="border border-slate-200 px-3 py-2 font-medium">{mois}&nbsp;mois</td>
                    <td className="border border-slate-200 px-3 py-2">{joursT}&nbsp;j</td>
                    <td className="border border-slate-200 px-3 py-2 text-green-700 font-medium">{carence}&nbsp;j seulement</td>
                    <td className="border border-slate-200 px-3 py-2 font-semibold text-blue-700">{dureeMoins50}&nbsp;j</td>
                    <td className="border border-slate-200 px-3 py-2 font-semibold text-blue-700">{duree50Plus}&nbsp;j</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Si des jours de CP n&apos;ont pas &eacute;t&eacute; int&eacute;gr&eacute;s dans les missions (cas rares),
            un diff&eacute;r&eacute; CP r&eacute;siduel peut s&apos;appliquer. V&eacute;rifier les bulletins de mission.
          </p>
        </section>

        {/* 5. Durée */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Dur&eacute;e d&apos;indemnisation
          </h2>
          <p className="mt-3">
            La r&egrave;gle est identique &agrave; celle des autres salari&eacute;s&nbsp;: 1 jour
            travaill&eacute; = 1 jour indemnis&eacute;. La dur&eacute;e est plafonn&eacute;e &agrave;{' '}
            {ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;jours pour les moins de 50 ans et{' '}
            {ARE_PARAMS.dureeMax50ansEtPlusJours}&nbsp;jours pour les 50 ans et plus. Le seuil
            minimal est de {INTERIM_JOURS_MIN}&nbsp;jours travaill&eacute;s (seuil Annexe&nbsp;4,
            inf&eacute;rieur aux {ARE_PARAMS.dureeMinJours}&nbsp;jours du droit commun).
          </p>
        </section>

        {/* 6. Rechargement */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Rechargement des droits
          </h2>
          <p className="mt-3">
            Toute nouvelle mission d&apos;au moins <strong>{INTERIM_JOURS_RECHARGEMENT}&nbsp;jours</strong>{' '}
            effectu&eacute;e pendant la p&eacute;riode d&apos;indemnisation recharge les droits&nbsp;:
            les jours travaill&eacute;s s&apos;ajoutent aux droits restants. Cela permet aux
            int&eacute;rimaires de maintenir et d&apos;allonger leurs droits &agrave; mesure qu&apos;ils
            alternent missions et p&eacute;riodes de non-emploi.
          </p>
        </section>

        {/* 7. Fin anticipée */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Fin de mission anticip&eacute;e par l&apos;entreprise utilisatrice
          </h2>
          <p className="mt-3">
            Si l&apos;entreprise utilisatrice met fin &agrave; la mission avant le terme pr&eacute;vu,
            l&apos;int&eacute;rimaire conserve ses droits &agrave; l&apos;ARE dans les m&ecirc;mes
            conditions qu&apos;une fin de mission normale. L&apos;agence d&apos;int&eacute;rim peut
            &ecirc;tre tenue, selon le contrat, de proposer une mission de remplacement ou de verser
            une indemnit&eacute; compensatrice. Ces &eacute;ventuelles indemnit&eacute;s
            compl&eacute;mentaires n&apos;allongent pas le diff&eacute;r&eacute; d&apos;indemnisation
            (aucune part supra-l&eacute;gale g&eacute;n&eacute;rant une franchise pour les int&eacute;rimaires).
          </p>
        </section>

        {/* 8. CDI refusé */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Fin de mission + CDI refus&eacute;
          </h2>
          <p className="mt-3">
            Depuis la r&eacute;forme de 2023, refuser un CDI propos&eacute; par l&apos;entreprise
            utilisatrice &agrave; l&apos;issue d&apos;une mission — aux <em>m&ecirc;mes conditions
            de poste et de r&eacute;mun&eacute;ration</em> — prive du droit &agrave; l&apos;ARE.
            L&apos;agence d&apos;int&eacute;rim est tenue d&apos;informer France Travail de ce refus.
          </p>
          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Conditions du CDI doivent &ecirc;tre identiques&nbsp;:</strong> m&ecirc;me poste,
            m&ecirc;me niveau de r&eacute;mun&eacute;ration, m&ecirc;me lieu de travail. Si l&apos;une
            de ces conditions diff&egrave;re, le refus ne fait pas obstacle &agrave; l&apos;ARE.
          </div>
        </section>

        {/* 9. Comparatif */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Comparatif fin de mission vs fin de CDD classique
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Fin de mission int&eacute;rim</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Fin de CDD classique</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Base calcul SJR</td>
                  <td className="border border-slate-200 px-4 py-2">Assiette &divide; jours <em>travaill&eacute;s</em></td>
                  <td className="border border-slate-200 px-4 py-2">Salaires &divide; jours calendaires</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Prime pr&eacute;carit&eacute; dans assiette</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">Oui ({Math.round(INTERIM_TAUX_PRECARITE * 100)}&nbsp;% inclus)</td>
                  <td className="border border-slate-200 px-4 py-2 text-slate-500">Non (exclue du SJR)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">ICP dans assiette</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">Oui ({Math.round(INTERIM_TAUX_CP * 100)}&nbsp;% inclus)</td>
                  <td className="border border-slate-200 px-4 py-2 text-slate-500">Non (exclue)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">D&eacute;lai de carence CP</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">{DELAI_ATTENTE}&nbsp;j seulement (ICP d&eacute;j&agrave; pay&eacute;e)</td>
                  <td className="border border-slate-200 px-4 py-2">{DELAI_ATTENTE}&nbsp;j + diff&eacute;r&eacute; CP variable</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Seuil affiliation</td>
                  <td className="border border-slate-200 px-4 py-2">{INTERIM_JOURS_MIN}&nbsp;j ({INTERIM_HEURES_MIN}&nbsp;h) — Annexe 4</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.dureeMinJours}&nbsp;j — droit commun</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Refus CDI = perte ARE</td>
                  <td className="border border-slate-200 px-4 py-2">Oui (depuis 2023)</td>
                  <td className="border border-slate-200 px-4 py-2">Oui (depuis 2023)</td>
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
              <h3 className="font-semibold text-slate-900">
                Peut-on toucher le ch&ocirc;mage apr&egrave;s chaque fin de mission&nbsp;?
              </h3>
              <p className="mt-1 text-slate-700">
                Oui, &agrave; condition d&apos;avoir accumul&eacute; {INTERIM_JOURS_MIN}&nbsp;jours
                ({INTERIM_HEURES_MIN}&nbsp;heures) sur les {ARE_PARAMS.moisRefMoins55ans}&nbsp;derniers
                mois et d&apos;&ecirc;tre inscrit &agrave; France Travail. L&apos;ARE est vers&eacute;e
                uniquement pendant les p&eacute;riodes sans contrat de mission.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                La prime de pr&eacute;carit&eacute; est-elle incluse dans le calcul de l&apos;ARE&nbsp;?
              </h3>
              <p className="mt-1 text-slate-700">
                Oui, pour les int&eacute;rimaires. L&apos;indemnit&eacute; de fin de mission
                ({Math.round(INTERIM_TAUX_PRECARITE * 100)}&nbsp;%) et l&apos;ICP
                ({Math.round(INTERIM_TAUX_CP * 100)}&nbsp;%) sont int&eacute;gr&eacute;es dans
                l&apos;assiette de calcul du SJR selon l&apos;Annexe&nbsp;4 Unédic.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Combien de temps apr&egrave;s une fin de mission re&ccedil;oit-on l&apos;ARE&nbsp;?
              </h3>
              <p className="mt-1 text-slate-700">
                Le d&eacute;lai de carence est de {DELAI_ATTENTE}&nbsp;jours (d&eacute;lai
                d&apos;attente incompressible). L&apos;ICP &eacute;tant pay&eacute;e avec chaque
                mission, il n&apos;y a g&eacute;n&eacute;ralement pas de diff&eacute;r&eacute; CP
                suppl&eacute;mentaire. Le premier versement intervient environ 3 semaines apr&egrave;s
                la fin de la mission.
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
        <h2 className="text-xl font-bold text-blue-900">Calculez votre ARE apr&egrave;s votre mission</h2>
        <p className="mt-2 text-blue-700">
          Renseignez le total de vos salaires de missions pour estimer votre allocation.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700">
            Calculateur ARE
          </Link>
          <Link href="/chomage-interimaire" className="rounded-lg border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400">
            Ch&ocirc;mage int&eacute;rimaire
          </Link>
          <Link href="/delai-carence-chomage" className="rounded-lg border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400">
            D&eacute;lai de carence
          </Link>
        </div>
      </div>

      <nav className="mt-10 border-t border-slate-200 pt-6">
        <p className="mb-3 text-sm font-medium text-slate-600">Pages li&eacute;es</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/chomage-interimaire" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Ch&ocirc;mage int&eacute;rimaire
          </Link>
          <Link href="/fin-de-cdd" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Fin de CDD
          </Link>
          <Link href="/" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Calculateur ARE
          </Link>
        </div>
      </nav>
    </main>
  )
}
