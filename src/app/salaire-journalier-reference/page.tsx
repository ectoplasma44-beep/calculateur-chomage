import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurARE from '@/components/CalculateurARE'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros, eurosEntiers, pourcent } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Salaire Journalier de Référence (SJR) : Calcul et Formule 2026',
  description:
    'Comment calculer votre SJR pour le chômage ? Formule officielle Unédic, exemples concrets et simulateur ARE 2026. Tout comprendre en 5 minutes.',
  alternates: {
    canonical: 'https://www.monchomage.fr/salaire-journalier-reference',
  },
}

// Exemples de calcul de SJR (logique documentaire, pas des paramètres réglementaires)
const EXEMPLES_SJR = [
  {
    label: 'CDI 24 mois, salaire stable',
    salaireMensuel: 2500,
    moisTravailles: 24,
    joursCalendaires: 730,
    sjr: Math.round((2500 * 24) / 730 * 100) / 100,
  },
  {
    label: 'CDI 12 mois, salaire stable',
    salaireMensuel: 3500,
    moisTravailles: 12,
    joursCalendaires: 365,
    sjr: Math.round((3500 * 12) / 365 * 100) / 100,
  },
  {
    label: 'Salarié 55+ ans, 36 mois',
    salaireMensuel: 2000,
    moisTravailles: 36,
    joursCalendaires: 1095,
    sjr: Math.round((2000 * 36) / 1095 * 100) / 100,
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment France Travail calcule-t-il le salaire journalier de référence ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `France Travail additionne tous vos salaires bruts des ${ARE_PARAMS.moisRefMoins55ans} derniers mois (${ARE_PARAMS.moisRefPlus55ans} mois pour les 55 ans et plus), en excluant les indemnités de rupture et les frais professionnels. Il divise ce total par le nombre de jours calendaires de la même période. Le résultat est votre SJR, base de calcul de votre allocation chômage. Les salaires sont plafonnés à ${eurosEntiers(ARE_PARAMS.plafondSalaireRefMensuel)} par mois.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Les primes sont-elles prises en compte dans le calcul du SJR ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui, les primes soumises à cotisations sociales (prime de vacances, 13e mois, prime d'objectif) sont intégrées dans le salaire de référence. En revanche, les remboursements de frais, l'intéressement non soumis à cotisations et les indemnités de rupture sont exclus.`,
      },
    },
    {
      '@type': 'Question',
      name: "Mon SJR change-t-il si j'ai travaillé à temps partiel ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui. Si vous avez travaillé à temps partiel, votre SJR sera plus faible car il reflète votre rémunération réelle. Un coefficient de temps partiel est aussi appliqué sur le plancher et le plafond de l'ARE pour ne pas vous pénaliser par rapport à la proportion travaillée.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la différence entre le SJR et le salaire mensuel brut ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Le SJR est une moyenne journalière sur ${ARE_PARAMS.moisRefMoins55ans} mois, alors que le salaire mensuel brut est votre rémunération d'un mois donné. Pour un emploi stable à temps plein, le SJR correspond approximativement à votre salaire mensuel divisé par ${ARE_PARAMS.joursParMoisSJR}. Mais il tient compte de toutes les variations (primes, absences, temps partiel) sur 2 ans.`,
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
      item: 'https://www.monchomage.fr',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Salaire Journalier de Référence (SJR)',
      item: 'https://www.monchomage.fr/salaire-journalier-reference',
    },
  ],
}

export default function SalaireJournalierReference() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}Salaire Journalier de R&eacute;f&eacute;rence (SJR)
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Salaire Journalier de R&eacute;f&eacute;rence (SJR)&nbsp;: Comment le Calculer en
        2026&nbsp;?
      </h1>

      <div className="mt-8 space-y-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Qu&apos;est-ce que le SJR&nbsp;?
          </h2>
          <p className="mt-3">
            Le <strong>salaire journalier de r&eacute;f&eacute;rence</strong> (SJR) est la
            pierre angulaire du calcul de l&apos;allocation ch&ocirc;mage. Aucune estimation
            d&apos;ARE n&apos;est possible sans lui&nbsp;: c&apos;est &agrave; partir de ce
            montant journalier que France Travail applique les formules pour d&eacute;terminer
            votre allocation. Concr&egrave;tement, le SJR repr&eacute;sente la moyenne de
            votre r&eacute;mun&eacute;ration <em>par jour calendaire</em> sur l&apos;ensemble
            de la p&eacute;riode de r&eacute;f&eacute;rence, primes incluses.
          </p>
          <p className="mt-3">
            Contrairement &agrave; ce que l&apos;on pourrait croire, il ne s&apos;agit pas
            d&apos;une simple division du dernier salaire mensuel par 30. Il int&egrave;gre
            toutes les variations de votre r&eacute;mun&eacute;ration sur les{' '}
            {ARE_PARAMS.moisRefMoins55ans} derniers mois&nbsp;: changements de poste,
            augmentations, primes variables, p&eacute;riodes &agrave; temps partiel ou de
            maladie. C&apos;est pourquoi le calcul officiel de France Travail, fond&eacute;
            sur vos attestations employeur, diff&egrave;re souvent du r&eacute;sultat d&apos;un
            simulateur utilisant un salaire mensuel moyen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            La formule officielle du SJR
          </h2>
          <div className="mt-3 rounded-xl bg-blue-50 p-5 font-mono text-blue-900">
            SJR = Salaire de r&eacute;f&eacute;rence total &divide; Nombre de jours calendaires
            de la p&eacute;riode
          </div>

          <h3 className="mt-5 text-xl font-semibold text-slate-900">
            Le salaire de r&eacute;f&eacute;rence
          </h3>
          <p className="mt-2">
            Il correspond &agrave; la somme de tous vos salaires bruts (y compris les primes
            soumises &agrave; cotisations&nbsp;: 13e mois, prime d&apos;objectif, prime de
            vacances, etc.) per&ccedil;us pendant la p&eacute;riode de r&eacute;f&eacute;rence&nbsp;:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              Les <strong>{ARE_PARAMS.moisRefMoins55ans} derniers mois</strong> pr&eacute;c&eacute;dant
              la fin du contrat pour les moins de 55 ans&nbsp;;
            </li>
            <li>
              Les <strong>{ARE_PARAMS.moisRefPlus55ans} derniers mois</strong> pour les 55 ans
              et plus, ce qui permet de prendre en compte une p&eacute;riode de carri&egrave;re
              plus longue.
            </li>
          </ul>
          <p className="mt-2">
            Les salaires mensuels sont plafonn&eacute;s &agrave;{' '}
            <strong>{eurosEntiers(ARE_PARAMS.plafondSalaireRefMensuel)}</strong> par mois
            (plafond de l&apos;assiette des contributions d&apos;assurance ch&ocirc;mage 2026).
            Au-del&agrave; de ce montant, le surplus n&apos;est pas pris en compte.
          </p>

          <h3 className="mt-5 text-xl font-semibold text-slate-900">
            Les jours calendaires
          </h3>
          <p className="mt-2">
            France Travail compte tous les jours calendaires de la p&eacute;riode, y compris
            les week-ends, jours f&eacute;ri&eacute;s et certaines p&eacute;riodes de
            suspension du contrat (maladie, maternit&eacute;, etc.). Pour &eacute;viter que
            les p&eacute;riodes non travaill&eacute;es ne gonflent artificiellement le
            d&eacute;nominateur, une r&egrave;gle limite les jours non travaill&eacute;s &agrave;
            un maximum de{' '}
            <strong>{pourcent(ARE_PARAMS.tauxMaxJoursNonTravailles)} des jours
            travaill&eacute;s</strong> (d&eacute;cret de 2021). Cela prot&egrave;ge les
            salari&eacute;s qui ont eu de courtes p&eacute;riodes d&apos;inactivit&eacute;
            au sein d&apos;une longue p&eacute;riode de r&eacute;f&eacute;rence.
          </p>
          <p className="mt-2">
            Notre calculateur utilise une <strong>simplification</strong>&nbsp;:{' '}
            {ARE_PARAMS.joursParMoisSJR} jours par mois, ce qui correspond &agrave; une
            p&eacute;riode de 24 mois = 720 jours. Le calcul exact de France Travail utilise
            les jours r&eacute;els du calendrier (environ 730 jours pour 24 mois), d&apos;o&ugrave;
            de l&eacute;g&egrave;res diff&eacute;rences.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Exemples concrets de calcul du SJR
          </h2>
          <p className="mt-3">
            Ces exemples utilisent les jours calendaires r&eacute;els (m&eacute;thode France
            Travail), en supposant un salaire mensuel constant et une p&eacute;riode d&apos;emploi
            continu. Les r&eacute;sultats diff&egrave;rent l&eacute;g&egrave;rement de notre
            simulateur qui utilise la simplification des {ARE_PARAMS.joursParMoisSJR} jours par mois.
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold">Situation</th>
                  <th className="border border-slate-200 px-4 py-2 text-right font-semibold">Salaire mensuel</th>
                  <th className="border border-slate-200 px-4 py-2 text-right font-semibold">Salaire total</th>
                  <th className="border border-slate-200 px-4 py-2 text-right font-semibold">Jours calendaires</th>
                  <th className="border border-slate-200 px-4 py-2 text-right font-semibold">SJR</th>
                </tr>
              </thead>
              <tbody>
                {EXEMPLES_SJR.map((ex, i) => (
                  <tr key={i} className={i % 2 === 1 ? 'bg-slate-50' : ''}>
                    <td className="border border-slate-200 px-4 py-2">{ex.label}</td>
                    <td className="border border-slate-200 px-4 py-2 text-right">
                      {eurosEntiers(ex.salaireMensuel)}
                    </td>
                    <td className="border border-slate-200 px-4 py-2 text-right">
                      {eurosEntiers(ex.salaireMensuel * ex.moisTravailles)}
                    </td>
                    <td className="border border-slate-200 px-4 py-2 text-right">
                      {ex.joursCalendaires}
                    </td>
                    <td className="border border-slate-200 px-4 py-2 text-right font-semibold text-blue-700">
                      {euros(ex.sjr)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Ce qui est exclu du salaire de r&eacute;f&eacute;rence
          </h2>
          <p className="mt-3">
            Tous les &eacute;l&eacute;ments de r&eacute;mun&eacute;ration ne sont pas
            int&eacute;gr&eacute;s dans le calcul du SJR. Sont notamment exclus&nbsp;:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              Les <strong>indemnit&eacute;s de rupture</strong>&nbsp;: indemnit&eacute; de
              licenciement, indemnit&eacute; de rupture conventionnelle, prime de
              pr&eacute;carit&eacute; de fin de CDD&nbsp;;
            </li>
            <li>
              Les <strong>remboursements de frais professionnels</strong> (frais de
              d&eacute;placement, tickets-restaurant au-del&agrave; du seuil de cotisations,
              etc.)&nbsp;;
            </li>
            <li>
              <strong>L&apos;int&eacute;ressement et la participation</strong> lorsqu&apos;ils
              ne sont pas soumis aux cotisations sociales&nbsp;;
            </li>
            <li>
              Les <strong>r&eacute;mun&eacute;rations d&eacute;passant{' '}
              {eurosEntiers(ARE_PARAMS.plafondSalaireRefMensuel)}&nbsp;/mois</strong> (plafond
              de l&apos;assiette des contributions).
            </li>
          </ul>
          <p className="mt-3">
            En revanche, les primes <em>soumises &agrave; cotisations</em> font bien partie
            du salaire de r&eacute;f&eacute;rence&nbsp;: prime annuelle, 13e mois, prime
            d&apos;anciennet&eacute;, prime d&apos;objectif. Si votre r&eacute;mun&eacute;ration
            comprend une part variable significative, votre SJR r&eacute;el calcul&eacute; par
            France Travail peut diff&eacute;rer sensiblement de la valeur affich&eacute;e par
            notre simulateur. Saisissez votre salaire brut <em>moyen</em> charges incluses
            pour une estimation plus proche de la r&eacute;alit&eacute;.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Du SJR &agrave; l&apos;ARE&nbsp;: le lien avec le calcul de l&apos;allocation
          </h2>
          <p className="mt-3">
            Une fois votre SJR d&eacute;termin&eacute;, France Travail calcule votre allocation
            journali&egrave;re en retenant la plus &eacute;lev&eacute;e des deux formules&nbsp;:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong>Formule 1</strong>&nbsp;: {pourcent(ARE_PARAMS.tauxFormule1)} &times;
              SJR + {euros(ARE_PARAMS.partieFix)} (avantageuse pour les bas et moyens
              salaires gr&acirc;ce &agrave; la partie fixe)
            </li>
            <li>
              <strong>Formule 2</strong>&nbsp;: {pourcent(ARE_PARAMS.tauxFormule2)} &times;
              SJR (avantageuse pour les hauts salaires)
            </li>
          </ul>
          <p className="mt-3">
            Le r&eacute;sultat ne peut &ecirc;tre ni inf&eacute;rieur &agrave;{' '}
            {euros(ARE_PARAMS.allocationMinimale)} par jour (plancher), ni sup&eacute;rieur
            &agrave; {pourcent(ARE_PARAMS.plafondTauxSJR)} du SJR (plafond).
            L&apos;allocation mensuelle = allocation journali&egrave;re &times;{' '}
            {ARE_PARAMS.joursParMois} jours. Si votre allocation journali&egrave;re
            d&eacute;passe {euros(ARE_PARAMS.seuilDegressiviteAJ)} et que vous avez moins de{' '}
            {ARE_PARAMS.ageLimiteDegressivite} ans, la d&eacute;gressivit&eacute; de{' '}
            {Math.round((1 - ARE_PARAMS.coeffDegressivite) * 100)}&nbsp;% s&apos;appliquera
            &agrave; partir du {ARE_PARAMS.joursAvantDegressivite + 1}e jour indemnis&eacute;.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Simulez votre SJR et votre ARE
        </h2>
        <p className="mt-2 text-slate-600">
          Le calculateur utilise une simplification ({ARE_PARAMS.joursParMoisSJR} jours/mois)
          pour estimer votre SJR &agrave; partir de votre salaire mensuel brut moyen. Saisissez
          votre salaire <em>moyen</em> charges incluses pour une estimation plus fid&egrave;le.
        </p>
        <div className="mt-4">
          <CalculateurARE />
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-900">
          Questions fr&eacute;quentes sur le SJR
        </h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900">
              Comment France Travail calcule-t-il le salaire journalier de
              r&eacute;f&eacute;rence&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              France Travail additionne tous vos salaires bruts des{' '}
              {ARE_PARAMS.moisRefMoins55ans} derniers mois ({ARE_PARAMS.moisRefPlus55ans} mois
              pour les 55 ans et plus), en excluant les indemnit&eacute;s de rupture et les
              frais professionnels. Il divise ce total par le nombre de jours calendaires de
              la p&eacute;riode. Les salaires sont plafonn&eacute;s &agrave;{' '}
              {eurosEntiers(ARE_PARAMS.plafondSalaireRefMensuel)}&nbsp;/mois.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Les primes sont-elles prises en compte dans le calcul du SJR&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Oui, les primes soumises &agrave; cotisations sociales (13e mois, prime
              d&apos;objectif, prime de vacances) sont int&eacute;gr&eacute;es. En revanche,
              les remboursements de frais, l&apos;int&eacute;ressement non cotis&eacute; et
              les indemnit&eacute;s de rupture sont exclus.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Mon SJR change-t-il si j&apos;ai travaill&eacute; &agrave; temps partiel&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Oui. Un SJR calcul&eacute; sur des p&eacute;riodes &agrave; temps partiel est
              proportionnellement plus faible. Un coefficient sp&eacute;cifique est
              appliqu&eacute; sur le plancher et le plafond pour ne pas p&eacute;naliser les
              salari&eacute;s &agrave; temps partiel.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Quelle est la diff&eacute;rence entre le SJR et le salaire mensuel brut&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Le SJR est une moyenne journali&egrave;re sur {ARE_PARAMS.moisRefMoins55ans} mois,
              tenant compte de toutes les variations (primes, absences, temps partiel). Pour
              un emploi stable &agrave; temps plein, il &eacute;quivaut approximativement au
              salaire mensuel divis&eacute; par {ARE_PARAMS.joursParMoisSJR}.
            </p>
          </div>
        </div>
      </section>

      <nav className="mt-12 border-t border-slate-200 pt-6">
        <p className="mb-3 text-sm font-medium text-slate-600">Pages li&eacute;es</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700"
          >
            Calculateur ARE
          </Link>
          <Link
            href="/duree-indemnisation"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700"
          >
            Dur&eacute;e d&apos;indemnisation
          </Link>
          <Link
            href="/rupture-conventionnelle"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700"
          >
            Rupture conventionnelle
          </Link>
        </div>
      </nav>
    </main>
  )
}
