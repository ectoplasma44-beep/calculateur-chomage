import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Licenciement intérimaire 2025 : CDI-I, motifs et ARE",
  description: "Intérimaire en CDI licencié ? Motifs possibles, indemnités et calcul ARE expliqués. Distinction avec la fin de mission classique.",
  alternates: { canonical: 'https://www.monchomage.fr/licenciement-interimaire' },
}

// ── Exemple licenciement CDI-I : 5 ans, 2 100 €/mois ────────────────────────
const EX_SALAIRE = 2_100
const EX_ANCIENNETE = 5

const exSjr = Number((EX_SALAIRE / ARE_PARAMS.joursParMoisSJR).toFixed(2))
const exF1 = Number((ARE_PARAMS.tauxFormule1 * exSjr + ARE_PARAMS.partieFix).toFixed(2))
const exF2 = Number((ARE_PARAMS.tauxFormule2 * exSjr).toFixed(2))
const exAjBrute = Math.max(exF1, exF2)
const exAj = Number(
  Math.max(Math.min(exAjBrute, ARE_PARAMS.plafondTauxSJR * exSjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const exAjMensuelle = Number((exAj * ARE_PARAMS.joursParMois).toFixed(2))

// Indemnité légale de licenciement (1/4 mois par année jusqu'à 10 ans)
const exIndemniteMin = Number((EX_ANCIENNETE * EX_SALAIRE * 0.25).toFixed(2))

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chomage interimaire', item: 'https://www.monchomage.fr/chomage-interimaire' },
    { '@type': 'ListItem', position: 3, name: 'Licenciement interimaire', item: 'https://www.monchomage.fr/licenciement-interimaire' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Une ETT peut-elle licencier un CDI interimaire faute de missions ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, mais sous conditions strictes. L'ETT doit d'abord prouver qu'elle a cherche activement des missions compatibles avec le profil du salarie et que le manque de missions est durable. Un licenciement economique immediat sans recherche prealable de missions est contestable aux prud'hommes.",
      },
    },
    {
      '@type': 'Question',
      name: "Quelle indemnite pour un licenciement en CDI interimaire ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `L'indemnite legale de licenciement pour un CDI-I est calculee comme pour tout CDI : 1/4 de mois de salaire par annee d'anciennete jusqu'a 10 ans, 1/3 au-dela. Pour ${EX_ANCIENNETE} ans d'anciennete a ${euros(EX_SALAIRE)}/mois, l'indemnite minimale est de ${euros(exIndemniteMin)}. Le salaire de reference est la remuneration moyenne des missions.`,
      },
    },
    {
      '@type': 'Question',
      name: "Le licenciement d'un CDI-I ouvre-t-il les memes droits ARE qu'un CDI classique ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui. Un CDI-I licencie ouvre les memes droits ARE qu'un salarie en CDI : pas de carence specifique pour un licenciement personnel ou economique (hors indemnites supra-legales). Pour un salaire de ${euros(EX_SALAIRE)}/mois, l'ARE est de ${euros(exAjMensuelle)}/mois. La duree d'indemnisation depend des jours cotises, plafonnee a ${ARE_PARAMS.dureeMaxMoins50ansJours} jours pour les moins de 50 ans.`,
      },
    },
  ],
}

export default function PageLicenciementInterimaire() {
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
          <span>Licenciement int&eacute;rimaire</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900">
          Licenciement int&eacute;rimaire&nbsp;: CDI-I, motifs et ARE 2025
        </h1>

        {/* 1. Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Licenciement et int&eacute;rim&nbsp;: uniquement pour les CDI int&eacute;rimaires</h2>
          <p className="text-slate-700">
            Le <strong>licenciement n&apos;existe que dans le cadre d&apos;un CDI</strong>. Un int&eacute;rimaire
            en contrat de mission classique (CDD) ne peut pas &ecirc;tre licenci&eacute;&nbsp;: son contrat
            prend fin au terme pr&eacute;vu. En revanche, l&apos;int&eacute;rimaire embauch&eacute; en
            <strong> CDI int&eacute;rimaire (CDI-I)</strong> par une agence de travail temporaire (ETT)
            peut faire l&apos;objet d&apos;un licenciement. Les r&egrave;gles sont globalement identiques
            &agrave; celles d&apos;un CDI ordinaire, avec quelques sp&eacute;cificit&eacute;s li&eacute;es
            au caract&egrave;re particulier du CDI-I.
          </p>
        </section>

        {/* 2. Motifs de licenciement */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Motifs de licenciement d&apos;un CDI-I</h2>
          <div className="space-y-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">Licenciement &eacute;conomique</h3>
              <p className="mt-1 text-sm text-slate-700">
                Si l&apos;ETT manque durablement de missions &agrave; proposer, elle peut invoquer un motif
                &eacute;conomique. Condition&nbsp;: l&apos;ETT doit prouver qu&apos;elle a cherch&eacute;
                activement des missions compatibles avant d&apos;&eacute;voquer le licenciement. La jurisprudence
                exige une p&eacute;riode de recherche s&eacute;rieuse avant tout licenciement pour absence
                de missions.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">Licenciement pour motif personnel</h3>
              <p className="mt-1 text-sm text-slate-700">
                Faute (simple, grave ou lourde), inaptitude constat&eacute;e par le m&eacute;decin du travail,
                insuffisance professionnelle. La proc&eacute;dure est identique &agrave; celle d&apos;un CDI
                classique&nbsp;: convocation, entretien pr&eacute;alable, notification &eacute;crite.
              </p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h3 className="font-semibold text-amber-900">Particularit&eacute; CDI-I&nbsp;: obligation de proposition de missions</h3>
              <p className="mt-1 text-sm text-amber-800">
                L&apos;ETT est tenue de proposer des missions correspondant aux qualifications du salari&eacute;
                avant d&apos;engager un licenciement. Un licenciement prononc&eacute; sans cette recherche
                pr&eacute;alable est contestable devant le conseil de prud&apos;hommes.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Indemnité de licenciement */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Indemnit&eacute; l&eacute;gale de licenciement CDI-I
          </h2>
          <p className="text-slate-700">
            L&apos;indemnit&eacute; l&eacute;gale est calcul&eacute;e sur la r&eacute;mun&eacute;ration
            mensuelle moyenne per&ccedil;ue (incluant les p&eacute;riodes de mission).
          </p>
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="font-semibold text-blue-900">
              Exemple&nbsp;: CDI-I, {EX_ANCIENNETE}&nbsp;ans, {euros(EX_SALAIRE)}&nbsp;brut/mois
            </p>
            <p className="mt-1 text-blue-800 text-sm">
              Indemnit&eacute; minimale&nbsp;: {EX_ANCIENNETE}&nbsp;ans &times; (1/4 &times; {euros(EX_SALAIRE)}) = <strong>{euros(exIndemniteMin)}</strong>
            </p>
            <p className="mt-1 text-blue-700 text-xs">
              Formule 1/4 mois par ann&eacute;e (tranche jusqu&apos;&agrave; 10&nbsp;ans).
              Convention collective ETT peut pr&eacute;voir un taux sup&eacute;rieur.
            </p>
          </div>
        </section>

        {/* 4. ARE après licenciement CDI-I */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">ARE apr&egrave;s licenciement CDI-I</h2>
          <p className="text-slate-700">
            Pour un licenciement personnel ou &eacute;conomique, aucun diff&eacute;r&eacute; sp&eacute;cifique
            suppl&eacute;mentaire ne s&apos;ajoute sauf si l&apos;indemnit&eacute; per&ccedil;ue d&eacute;passe
            le minimum l&eacute;gal. Le SJR est bas&eacute; sur le salaire mensuel moyen des missions.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Salaire mensuel moyen (missions)</td>
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
                  <td className="border border-slate-200 px-4 py-2 font-medium">Diff&eacute;r&eacute; sp&eacute;cifique</td>
                  <td className="border border-slate-200 px-4 py-2">
                    Aucun si indemnit&eacute; = minimum l&eacute;gal. Plafonn&eacute; &agrave;{' '}
                    {ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;j (licenciement &eacute;co) ou{' '}
                    {ARE_PARAMS.franchiseMaxRC}&nbsp;j (autres cas) si supra-l&eacute;gale.
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">D&eacute;gressivit&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2">
                    Non (AJ {euros(exAj)}/j &lt; seuil {euros(ARE_PARAMS.seuilDegressiviteAJ)}/j)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            Param&egrave;tres Unédic au 01/07/2025. Dur&eacute;e maximale&nbsp;:
            {ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;j (&lt;&nbsp;50&nbsp;ans),
            {ARE_PARAMS.dureeMax50ansEtPlusJours}&nbsp;j (50&nbsp;ans et +).
          </p>
        </section>

        {/* 5. Licenciement pour absence de mission prolongée */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Licenciement pour absence de mission prolong&eacute;e</h2>
          <p className="text-slate-700">
            C&apos;est le motif le plus fr&eacute;quent en CDI-I. L&apos;ETT doit d&eacute;montrer&nbsp;:
          </p>
          <ul className="ml-4 space-y-2 text-slate-700 list-disc">
            <li>
              Que les recherches de missions ont &eacute;t&eacute; actives et doc\tement&eacute;es
              (secteur g&eacute;ographique raisonnable, qualification correspondante).
            </li>
            <li>
              Que l&apos;absence de mission est durable et non conjoncturelle.
            </li>
            <li>
              Que les obligations de reclassement ont &eacute;t&eacute; remplies si licenciement &eacute;conomique.
            </li>
          </ul>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
            <strong>Recours possible&nbsp;:</strong> si le salari&eacute; peut prouver que l&apos;ETT n&apos;a
            pas cherch&eacute; s&eacute;rieusement de missions, le licenciement peut &ecirc;tre jug&eacute;
            sans cause r&eacute;elle et s&eacute;rieuse. Des dommages et int&eacute;r&ecirc;ts peuvent
            s&apos;ajouter &agrave; l&apos;indemnit&eacute; de licenciement.
          </div>
        </section>

        {/* 6. Comparatif licenciement CDI-I vs fin de mission */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Comparatif licenciement CDI-I vs fin de mission classique</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Licenciement CDI-I</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Fin de mission (contrat CDD)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Contrat concern&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2">CDI-I uniquement</td>
                  <td className="border border-slate-200 px-4 py-2">Contrat de mission (CDD)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Proc&eacute;dure</td>
                  <td className="border border-slate-200 px-4 py-2">Entretien pr&eacute;alable, notification &eacute;crite, pr&eacute;avis</td>
                  <td className="border border-slate-200 px-4 py-2">Terme du contrat ou rupture anticip&eacute;e</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemnit&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2">Indemnit&eacute; l&eacute;gale licenciement + pr&eacute;avis</td>
                  <td className="border border-slate-200 px-4 py-2">Prime de pr&eacute;carit&eacute; {Math.round(0.10 * 100)}&nbsp;% + CP</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Calcul SJR ARE</td>
                  <td className="border border-slate-200 px-4 py-2">Salaire mensuel &divide; {ARE_PARAMS.joursParMoisSJR}&nbsp;j</td>
                  <td className="border border-slate-200 px-4 py-2">Assiette (salaires + pr&eacute;carit&eacute; + CP) &divide; jours travaill&eacute;s</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Recours possibles</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Prud&apos;hommes si proc&eacute;dure irréguli&egrave;re</td>
                  <td className="border border-slate-200 px-4 py-2">Limit&eacute;s</td>
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
          <h2 className="text-xl font-semibold text-slate-900">Calculer votre ARE apr&egrave;s licenciement</h2>
          <p className="text-slate-600 text-sm">
            Estimez votre ARE en fonction de votre salaire moyen en CDI int&eacute;rimaire.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Calculateur ARE
            </Link>
            <Link href="/chomage-interimaire" className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
              Ch&ocirc;mage int&eacute;rimaire
            </Link>
            <Link href="/rupture-conventionnelle-interimaire" className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
              RC int&eacute;rimaire
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
