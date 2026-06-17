import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "RC intérimaire 2025 : possible ? Conditions et ARE",
  description: "Un intérimaire peut-il signer une rupture conventionnelle ? Conditions, calcul ARE et alternatives expliqués avec exemples chiffrés 2025.",
  alternates: { canonical: 'https://www.monchomage.fr/rupture-conventionnelle-interimaire' },
}

// ── Constantes Annexe 4 ───────────────────────────────────────────────────────
const INTERIM_TAUX_PRECARITE = 0.10
const INTERIM_TAUX_CP = 0.10

// ── Exemple RC CDI-I : 4 ans ancienneté, 2 000 €/mois ────────────────────────
const EX_SALAIRE = 2_000
const EX_ANCIENNETE = 4

// SJR CDI-I en RC : base salaire mensuel moyen / 30 (règle générale)
const exSjr = Number((EX_SALAIRE / ARE_PARAMS.joursParMoisSJR).toFixed(2))
const exF1 = Number((ARE_PARAMS.tauxFormule1 * exSjr + ARE_PARAMS.partieFix).toFixed(2))
const exF2 = Number((ARE_PARAMS.tauxFormule2 * exSjr).toFixed(2))
const exAjBrute = Math.max(exF1, exF2)
const exAj = Number(
  Math.max(Math.min(exAjBrute, ARE_PARAMS.plafondTauxSJR * exSjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const exAjMensuelle = Number((exAj * ARE_PARAMS.joursParMois).toFixed(2))

// Indemnité minimale RC (1/4 mois par année jusqu'à 10 ans)
const exIndemniteMiniRC = Number((EX_ANCIENNETE * EX_SALAIRE * 0.25).toFixed(2))

// Durée
const exDureeMoins50 = Math.min(ARE_PARAMS.dureeMinJours * 2, ARE_PARAMS.dureeMaxMoins50ansJours)

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chomage interimaire', item: 'https://www.monchomage.fr/chomage-interimaire' },
    { '@type': 'ListItem', position: 3, name: 'Rupture conventionnelle interimaire', item: 'https://www.monchomage.fr/rupture-conventionnelle-interimaire' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Un interimaire peut-il signer une rupture conventionnelle ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Un interimaire en contrat de mission (CDD) ne peut pas signer de rupture conventionnelle : la RC est reservee aux CDI. En revanche, un interimaire embauche en CDI interimaire (CDI-I) par une agence de travail temporaire peut signer une RC dans les memes conditions qu'un salarie en CDI classique.",
      },
    },
    {
      '@type': 'Question',
      name: "Quelle difference entre CDI interimaire et contrat de mission ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Le CDI interimaire (CDI-I) est un contrat a duree indeterminee lie a l'agence d'interim (ETT), qui garantit une remuneration minimale meme entre les missions. Le contrat de mission est un CDD lie a une mission specifique chez une entreprise utilisatrice. Seul le CDI-I permet une rupture conventionnelle.",
      },
    },
    {
      '@type': 'Question',
      name: "Comment calculer l'ARE apres une RC en CDI interimaire ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Pour un CDI-I en RC, le SJR est calcule sur le salaire mensuel moyen divise par ${ARE_PARAMS.joursParMoisSJR} jours. Pour un salaire de ${euros(EX_SALAIRE)}/mois, le SJR est de ${euros(exSjr)}/j et l'ARE est de ${euros(exAjMensuelle)}/mois. Un differe specifique s'applique sur la part d'indemnite RC superieure au minimum legal, plafonne a ${ARE_PARAMS.franchiseMaxRC} jours.`,
      },
    },
  ],
}

export default function PageRCInterimaire() {
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
          <span>Rupture conventionnelle int&eacute;rimaire</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900">
          Rupture conventionnelle int&eacute;rimaire&nbsp;: conditions et ARE 2025
        </h1>

        {/* 1. Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">RC et int&eacute;rim&nbsp;: un cas possible mais encadr&eacute;</h2>
          <p className="text-slate-700">
            La rupture conventionnelle suppose un <strong>contrat &agrave; dur&eacute;e ind&eacute;termin&eacute;e
            (CDI)</strong>. Pour un int&eacute;rimaire en contrat de mission classique — qui est un CDD —
            la RC est donc impossible. Cependant, depuis 2008, les agences d&apos;emploi temporaire (ETT)
            peuvent proposer un <strong>CDI int&eacute;rimaire (CDI-I)</strong>, qui s&apos;apparente &agrave;
            un CDI classique avec l&apos;agence comme employeur. Dans ce cas sp&eacute;cifique, une rupture
            conventionnelle devient possible, selon la m&ecirc;me proc&eacute;dure qu&apos;un CDI ordinaire.
            Cette page explique les conditions, la proc&eacute;dure et le calcul de l&apos;ARE pour les
            int&eacute;rimaires concern&eacute;s par ce dispositif relativement rare mais en d&eacute;veloppement.
          </p>
        </section>

        {/* 2. CDI-I vs contrat de mission */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">CDI int&eacute;rimaire vs contrat de mission</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">CDI int&eacute;rimaire (CDI-I)</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Contrat de mission (CDD)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Type de contrat</td>
                  <td className="border border-slate-200 px-4 py-2">CDI avec l&apos;agence (ETT)</td>
                  <td className="border border-slate-200 px-4 py-2">CDD li&eacute; &agrave; chaque mission</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">RC possible ?</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">Oui — m&ecirc;me proc&eacute;dure qu&apos;un CDI</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700 font-medium">Non — impossible sur un CDD</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Employeur</td>
                  <td className="border border-slate-200 px-4 py-2">Agence de travail temporaire</td>
                  <td className="border border-slate-200 px-4 py-2">Agence (mais mission chez l&apos;entreprise utilisatrice)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Prime de pr&eacute;carit&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">Non vers&eacute;e entre les missions</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">
                    {Math.round(INTERIM_TAUX_PRECARITE * 100)}&nbsp;% du salaire brut &agrave; chaque fin de mission
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Alternative &agrave; la RC</td>
                  <td className="border border-slate-200 px-4 py-2">Licenciement, d&eacute;mission</td>
                  <td className="border border-slate-200 px-4 py-2">Rupture anticip&eacute;e (accord des 3 parties)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. RC pour un CDI-I */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">RC pour un salari&eacute; en CDI int&eacute;rimaire</h2>
          <p className="text-slate-700">
            La proc&eacute;dure de RC pour un CDI-I est identique &agrave; celle d&apos;un CDI classique&nbsp;:
            entretien(s) de n&eacute;gociation avec l&apos;ETT, signature du formulaire CERFA homologu&eacute;
            par la DREETS, respect du d&eacute;lai de r&eacute;tractation de 15 jours calendaires.
          </p>
          <ul className="ml-4 space-y-2 text-slate-700 list-disc">
            <li>
              <strong>Indemnit&eacute; minimale l&eacute;gale&nbsp;:</strong> identique &agrave; un CDI —
              1/4 de mois de salaire par ann&eacute;e d&apos;anciennet&eacute; jusqu&apos;&agrave; 10&nbsp;ans,
              1/3 au-del&agrave;. Le salaire de r&eacute;f&eacute;rence est la r&eacute;mun&eacute;ration
              moyenne mens&uuml;elle per&ccedil;ue (incluant les p&eacute;riodes de mission).
            </li>
            <li>
              <strong>Convention collective ETT&nbsp;:</strong> certaines conventions d&apos;ETT pr&eacute;voient
              une indemnit&eacute; supra-l&eacute;gale. V&eacute;rifiez votre convention.
            </li>
          </ul>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="font-semibold text-blue-900">
              Exemple&nbsp;: CDI-I, {EX_ANCIENNETE}&nbsp;ans d&apos;anciennet&eacute;, {euros(EX_SALAIRE)}&nbsp;brut/mois
            </p>
            <p className="mt-1 text-blue-800 text-sm">
              Indemnit&eacute; minimale RC&nbsp;: {EX_ANCIENNETE}&nbsp;ans &times; (1/4 &times; {euros(EX_SALAIRE)}) = <strong>{euros(exIndemniteMiniRC)}</strong>
            </p>
          </div>
        </section>

        {/* 4. Calcul SJR et ARE */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul SJR et ARE pour un CDI-I en RC
          </h2>
          <p className="text-slate-700">
            Pour un CDI-I, le SJR est calcul&eacute; sur la base du salaire mensuel moyen des missions
            divis&eacute; par {ARE_PARAMS.joursParMoisSJR}&nbsp;jours (r&egrave;gle g&eacute;n&eacute;rale
            CDI). Les formules de l&apos;ARE sont ensuite appliqu&eacute;es depuis ARE_PARAMS.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Salaire mensuel moyen (CDI-I)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(EX_SALAIRE)}/mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    SJR = {euros(EX_SALAIRE)} &divide; {ARE_PARAMS.joursParMoisSJR}
                  </td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{euros(exSjr)}/jour</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    Formule 1&nbsp;: {ARE_PARAMS.tauxFormule1} &times; SJR + {euros(ARE_PARAMS.partieFix)}
                  </td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exF1)}/jour</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    Formule 2&nbsp;: {ARE_PARAMS.tauxFormule2} &times; SJR
                  </td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exF2)}/jour</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE journali&egrave;re</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(exAj)}/jour</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE mensuelle</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(exAjMensuelle)}/mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    Diff&eacute;r&eacute; sp&eacute;cifique RC (si indemnit&eacute; = minimum l&eacute;gal)
                  </td>
                  <td className="border border-slate-200 px-4 py-2">
                    0 jour (pas de supra-l&eacute;gale) — seul le carence 7&nbsp;j s&apos;applique
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    D&eacute;gressivit&eacute;
                  </td>
                  <td className="border border-slate-200 px-4 py-2">
                    Non applicable (AJ {euros(exAj)}/j &lt; seuil {euros(ARE_PARAMS.seuilDegressiviteAJ)}/j)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            Param&egrave;tres Unédic au 01/07/2025. Diff&eacute;r&eacute; sp&eacute;cifique RC plafonn&eacute;
            &agrave; {ARE_PARAMS.franchiseMaxRC}&nbsp;jours si indemnit&eacute; supra-l&eacute;gale.
          </p>
        </section>

        {/* 5. Alternative : rupture anticipée */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibent text-slate-900">Alternative pour un contrat de mission&nbsp;: la rupture anticip&eacute;e</h2>
          <p className="text-slate-700">
            Pour un int&eacute;rimaire en contrat de mission classique (CDD), la RC est impossible.
            La seule alternative amiable est la <strong>rupture anticip&eacute;e d&apos;un commun accord</strong>,
            qui n&eacute;cessite l&apos;accord des trois parties&nbsp;: l&apos;int&eacute;rimaire, l&apos;agence
            d&apos;int&eacute;rim (ETT) et l&apos;entreprise utilisatrice.
          </p>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Attention&nbsp;:</strong> contrairement &agrave; la RC, la rupture anticip&eacute;e
            d&apos;un contrat de mission ne donne pas toujours les m&ecirc;mes droits ARE. Voir la page
            d&eacute;di&eacute;e sur la{' '}
            <Link href="/fin-de-cdd-interimaire" className="underline hover:text-amber-700">
              fin de mission int&eacute;rimaire
            </Link>{' '}
            pour les d&eacute;tails.
          </div>
        </section>

        {/* 6. Comparatif RC CDI-I vs fin de mission */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Comparatif RC (CDI-I) vs fin de mission classique</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">RC CDI-I</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Fin de mission (CDD)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Conditions</td>
                  <td className="border border-slate-200 px-4 py-2">CDI-I uniquement, accord mutuel</td>
                  <td className="border border-slate-200 px-4 py-2">Terme du contrat de mission</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemnit&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2">ISRC (minimum 1/4 mois/an)</td>
                  <td className="border border-slate-200 px-4 py-2">Prime de pr&eacute;carit&eacute; {Math.round(INTERIM_TAUX_PRECARITE * 100)}&nbsp;%</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Calcul SJR</td>
                  <td className="border border-slate-200 px-4 py-2">Salaire mensuel &divide; {ARE_PARAMS.joursParMoisSJR}</td>
                  <td className="border border-slate-200 px-4 py-2">Assiette (salaire + pr&eacute;carit&eacute; + CP) &divide; jours travaill&eacute;s</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Diff&eacute;r&eacute; sp&eacute;cifique ARE</td>
                  <td className="border border-slate-200 px-4 py-2">
                    Max {ARE_PARAMS.franchiseMaxRC}&nbsp;j si supra-l&eacute;gale
                  </td>
                  <td className="border border-slate-200 px-4 py-2">Diff&eacute;r&eacute; CP uniquement</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Homologation DREETS</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Oui — s&eacute;curisation juridique</td>
                  <td className="border border-slate-200 px-4 py-2">Non</td>
                </tr>
              </tbody>
            </table>
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
          <h2 className="text-xl font-semibold text-slate-900">Estimer votre ARE apr&egrave;s une RC</h2>
          <p className="text-slate-600 text-sm">
            Calculez votre ARE exacte en fonction de votre salaire moyen en CDI int&eacute;rimaire.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Calculateur ARE
            </Link>
            <Link href="/chomage-interimaire" className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
              Ch&ocirc;mage int&eacute;rimaire
            </Link>
            <Link href="/fin-de-cdd-interimaire" className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
              Fin de mission int&eacute;rimaire
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
