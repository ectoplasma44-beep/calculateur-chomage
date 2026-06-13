import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Chômage intérimaire 2 000 €/mois 2025 : ARE calculée",
  description: "Intérimaire avec un salaire moyen de 2 000 €/mois ? ARE calculée avec primes de précarité et CP inclus. Montant exact et durée.",
  alternates: { canonical: 'https://www.monchomage.fr/chomage-interimaire-2000-euros' },
}

// ── Constantes Annexe 4 Unédic ───────────────────────────────────────────────
const INTERIM_TAUX_PRECARITE = 0.10
const INTERIM_TAUX_CP = 0.10
const INTERIM_JOURS_MIN = 130
const INTERIM_JOURS_RECHARGEMENT = 130

// ── Exemple principal : 2 000 €/mois, 12 mois de missions (365 j) ────────────
const EX_SALAIRE_MENSUEL = 2_000
const EX_MOIS = 12
const EX_JOURS_TRAVAILLES = 365

const exTotalBrut = EX_SALAIRE_MENSUEL * EX_MOIS
const exPrecarite = exTotalBrut * INTERIM_TAUX_PRECARITE
const exCP = exTotalBrut * INTERIM_TAUX_CP
const exAssiette = exTotalBrut + exPrecarite + exCP
const exAssietteMensuelle = Number((EX_SALAIRE_MENSUEL * (1 + INTERIM_TAUX_PRECARITE + INTERIM_TAUX_CP)).toFixed(2))

const exSjr = Number((exAssiette / EX_JOURS_TRAVAILLES).toFixed(2))
const exF1 = Number((ARE_PARAMS.tauxFormule1 * exSjr + ARE_PARAMS.partieFix).toFixed(2))
const exF2 = Number((ARE_PARAMS.tauxFormule2 * exSjr).toFixed(2))
const exAjBrute = Math.max(exF1, exF2)
const exAj = Number(
  Math.max(Math.min(exAjBrute, ARE_PARAMS.plafondTauxSJR * exSjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const exAjMensuelle = Number((exAj * ARE_PARAMS.joursParMois).toFixed(2))
const exDegressif = exAj > ARE_PARAMS.seuilDegressiviteAJ

// Durée selon jours travaillés (même SJR, durée change)
const TRANCHES = [INTERIM_JOURS_MIN, ARE_PARAMS.dureeMinJours, EX_JOURS_TRAVAILLES]
const tableauDuree = TRANCHES.map(jours => {
  const dureeMoins50 = Math.min(jours, ARE_PARAMS.dureeMaxMoins50ansJours)
  const duree50Plus = Math.min(jours, ARE_PARAMS.dureeMax50ansEtPlusJours)
  const duree55Plus = Math.min(jours, ARE_PARAMS.dureeMax55ansEtPlusJours)
  // SJR constant si même taux mensuel
  return {
    jours,
    dureeMoins50,
    dureeMois50: Math.round(dureeMoins50 / ARE_PARAMS.joursParMois * 10) / 10,
    duree50Plus,
    dureeMois50Plus: Math.round(duree50Plus / ARE_PARAMS.joursParMois * 10) / 10,
    duree55Plus,
    dureeMois55Plus: Math.round(duree55Plus / ARE_PARAMS.joursParMois * 10) / 10,
  }
})

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chômage intérimaire', item: 'https://www.monchomage.fr/chomage-interimaire' },
    { '@type': 'ListItem', position: 3, name: 'Intérimaire 2 000 €/mois', item: 'https://www.monchomage.fr/chomage-interimaire-2000-euros' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Combien touche un intérimaire à 2 000 €/mois au chômage ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Un intérimaire avec un salaire moyen de ${euros(EX_SALAIRE_MENSUEL)}/mois touche ${euros(exAjMensuelle)}/mois au chômage, après 12 mois de missions (${EX_JOURS_TRAVAILLES} jours travaillés). L'assiette de calcul est de ${euros(exAssietteMensuelle)}/mois car elle intègre la prime de précarité (${Math.round(INTERIM_TAUX_PRECARITE * 100)} %) et l'indemnité de congés payés (${Math.round(INTERIM_TAUX_CP * 100)} %). Le SJR est de ${euros(exSjr)}/j.`,
      },
    },
    {
      '@type': 'Question',
      name: "La prime de précarité est-elle incluse dans le calcul de l'ARE intérimaire ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui. Pour un intérimaire, l'assiette de calcul du SJR intègre le salaire brut, la prime de précarité (${Math.round(INTERIM_TAUX_PRECARITE * 100)} % du salaire brut) et l'indemnité compensatrice de congés payés (${Math.round(INTERIM_TAUX_CP * 100)} %). Pour un salaire de ${euros(EX_SALAIRE_MENSUEL)}/mois, l'assiette mensuelle est donc de ${euros(exAssietteMensuelle)}/mois.`,
      },
    },
    {
      '@type': 'Question',
      name: "Combien de temps un intérimaire à 2 000 €/mois est-il indemnisé ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `La durée d'indemnisation correspond aux jours travaillés en missions, dans la limite du plafond d'âge. Avec ${EX_JOURS_TRAVAILLES} jours travaillés (12 mois de missions), un intérimaire de moins de 50 ans est indemnisé jusqu'à ${Math.round(ARE_PARAMS.dureeMaxMoins50ansJours / ARE_PARAMS.joursParMois)} mois. Le minimum pour ouvrir des droits est de ${INTERIM_JOURS_MIN} jours travaillés sur les 24 derniers mois.`,
      },
    },
  ],
}

export default function PageCHomoInterimaire2000() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="mx-auto max-w-3xl px-4 py-8 space-y-10">
        <nav className="text-sm text-slate-500">
          <Link href="/" className="hover:underline">Accueil</Link>
          <span className="mx-2">&rsaquo;</span>
          <Link href="/chomage-interimaire" className="hover:underline">Ch&ocirc;mage int&eacute;rimaire</Link>
          <span className="mx-2">&rsaquo;</span>
          <span>Int&eacute;rimaire {euros(EX_SALAIRE_MENSUEL)}/mois</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900">
          Ch&ocirc;mage int&eacute;rimaire {euros(EX_SALAIRE_MENSUEL)}&nbsp;brut&nbsp;: ARE, SJR et dur&eacute;e 2025
        </h1>

        {/* 1. Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Cas concret&nbsp;: int&eacute;rimaire &agrave; {euros(EX_SALAIRE_MENSUEL)}/mois</h2>
          <p className="text-slate-700">
            En tant qu&apos;int&eacute;rimaire, votre ARE est calcul&eacute;e sur une assiette
            <strong> &eacute;largie</strong>&nbsp;: salaire brut + prime de pr&eacute;carit&eacute;
            ({Math.round(INTERIM_TAUX_PRECARITE * 100)}&nbsp;%) + indemnit&eacute; compensatrice de cong&eacute;s pay&eacute;s
            ({Math.round(INTERIM_TAUX_CP * 100)}&nbsp;%). Pour {euros(EX_SALAIRE_MENSUEL)}/mois brut,
            l&apos;assiette r&eacute;elle est de <strong>{euros(exAssietteMensuelle)}/mois</strong>, ce qui
            augmente significativement l&apos;ARE.
          </p>
        </section>

        {/* 2. Calcul SJR intérimaire */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Calcul SJR int&eacute;rimaire&nbsp;: pr&eacute;carit&eacute; + CP inclus</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Salaires bruts missions ({EX_MOIS}&nbsp;mois)</td>
                  <td className="border border-slate-200 px-4 py-2">{EX_MOIS} &times; {euros(EX_SALAIRE_MENSUEL)} = {euros(exTotalBrut)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">+ Prime de pr&eacute;carit&eacute; ({Math.round(INTERIM_TAUX_PRECARITE * 100)}&nbsp;%)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exTotalBrut)} &times; {INTERIM_TAUX_PRECARITE} = {euros(exPrecarite)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">+ Indemn. cong&eacute;s pay&eacute;s ({Math.round(INTERIM_TAUX_CP * 100)}&nbsp;%)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exTotalBrut)} &times; {INTERIM_TAUX_CP} = {euros(exCP)}</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-semibold text-blue-900">Assiette totale de calcul</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-800">{euros(exAssiette)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. SJR = assiette / jours travaillés */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            SJR&nbsp;: assiette totale &divide; jours travaill&eacute;s
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Jours travaill&eacute;s en missions</td>
                  <td className="border border-slate-200 px-4 py-2">{EX_JOURS_TRAVAILLES}&nbsp;j ({EX_MOIS}&nbsp;mois de missions)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">SJR</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exAssiette)} &divide; {EX_JOURS_TRAVAILLES} = <strong>{euros(exSjr)}/j</strong></td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule 1 ({Math.round(ARE_PARAMS.tauxFormule1 * 100)}&nbsp;% SJR + {euros(ARE_PARAMS.partieFix)})</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exSjr)} &times; {ARE_PARAMS.tauxFormule1} + {euros(ARE_PARAMS.partieFix)} = {euros(exF1)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule 2 ({Math.round(ARE_PARAMS.tauxFormule2 * 100)}&nbsp;% SJR)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exSjr)} &times; {ARE_PARAMS.tauxFormule2} = {euros(exF2)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">AJ retenue</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-700">{euros(exAj)}/j</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Montant ARE mensuel */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Montant ARE mensuel</h2>
          <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center max-w-xs">
            <p className="text-sm text-green-700 font-medium">ARE mensuelle</p>
            <p className="text-4xl font-bold text-green-800 mt-1">{euros(exAjMensuelle)}</p>
            <p className="text-xs text-green-600 mt-1">soit {euros(exAj)}/j &times; {ARE_PARAMS.joursParMois}&nbsp;j</p>
            {!exDegressif && (
              <p className="text-xs text-green-600 mt-1">
                Pas de d&eacute;gressivit&eacute; (AJ &lt; {euros(ARE_PARAMS.seuilDegressiviteAJ)}/j)
              </p>
            )}
          </div>
          <p className="text-slate-700">
            Votre assiette int&eacute;gre la prime de pr&eacute;carit&eacute; et les CP, ce qui porte l&apos;ARE
            &agrave; {euros(exAjMensuelle)}/mois contre <strong>{euros(Number((Number((EX_SALAIRE_MENSUEL / ARE_PARAMS.joursParMoisSJR).toFixed(2)) * ARE_PARAMS.tauxFormule2 * ARE_PARAMS.joursParMois).toFixed(2)))}/mois</strong>{' '}
            si ces primes n&apos;&eacute;taient pas int&eacute;gr&eacute;es.
          </p>
        </section>

        {/* 5. Durée selon jours travaillés */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Dur&eacute;e selon les jours travaill&eacute;s</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Jours travaill&eacute;s</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Dur&eacute;e (- de 50 ans)</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Dur&eacute;e (50&ndash;54 ans)</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Dur&eacute;e (55 ans+)</th>
                </tr>
              </thead>
              <tbody>
                {tableauDuree.map(({ jours, dureeMoins50, dureeMois50, duree50Plus, dureeMois50Plus, duree55Plus, dureeMois55Plus }) => (
                  <tr key={jours} className={jours === EX_JOURS_TRAVAILLES ? 'bg-blue-50 font-bold' : 'odd:bg-white even:bg-slate-50'}>
                    <td className="border border-slate-200 px-4 py-2">
                      {jours}&nbsp;j
                      {jours === INTERIM_JOURS_MIN && ' (minimum)'}
                      {jours === ARE_PARAMS.dureeMinJours && ' (6 mois)'}
                      {jours === EX_JOURS_TRAVAILLES && ' (12 mois) ←'}
                    </td>
                    <td className="border border-slate-200 px-4 py-2">{dureeMoins50}&nbsp;j (~{dureeMois50}&nbsp;mois)</td>
                    <td className="border border-slate-200 px-4 py-2">{duree50Plus}&nbsp;j (~{dureeMois50Plus}&nbsp;mois)</td>
                    <td className="border border-slate-200 px-4 py-2">{duree55Plus}&nbsp;j (~{dureeMois55Plus}&nbsp;mois)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 text-sm">
            Minimum requis&nbsp;: {INTERIM_JOURS_MIN}&nbsp;jours travaill&eacute;s en missions sur les
            24 derniers mois (Annexe 4 Unédic).
          </p>
        </section>

        {/* 6. Rechargement des droits */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Rechargement des droits</h2>
          <p className="text-slate-700">
            Si vous reprenez des missions d&apos;int&eacute;rim pendant votre indemnisation, vous pouvez
            recharger vos droits ARE. Condition&nbsp;: avoir accumul&eacute; au moins
            <strong> {INTERIM_JOURS_RECHARGEMENT}&nbsp;jours travaill&eacute;s</strong> depuis votre
            ouverture de droits.
          </p>
          <ul className="ml-4 space-y-2 text-slate-700 list-disc">
            <li>
              Le rechargement allonge la dur&eacute;e de vos droits ou augmente votre AJ si le
              nouveau SJR est plus favorable.
            </li>
            <li>
              Il n&apos;est pas n&eacute;cessaire d&apos;avoir &eacute;puis&eacute; tous vos droits pour recharger.
            </li>
            <li>
              En cas de cumul ARE + missions (activit&eacute; r&eacute;duite), chaque jour de mission
              est pris en compte pour le rechargement.
            </li>
          </ul>
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
            Pour {euros(EX_SALAIRE_MENSUEL)}/mois de missions&nbsp;: {INTERIM_JOURS_RECHARGEMENT}&nbsp;jours
            repr&eacute;sentent environ {Math.ceil(INTERIM_JOURS_RECHARGEMENT / 22)}&nbsp;mois de missions
            &agrave; temps plein. Une fois ce seuil atteint, vous pouvez signaler le rechargement
            &agrave; France Travail.
          </div>
        </section>

        {/* 7. FAQ */}
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

        {/* 8. CTA */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Calculer votre ARE en ligne</h2>
          <p className="text-slate-600 text-sm">
            Estimez votre ARE exacte en tenant compte de vos missions et primes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Calculateur ARE
            </Link>
            <Link href="/chomage-interimaire" className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
              Ch&ocirc;mage int&eacute;rimaire
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
