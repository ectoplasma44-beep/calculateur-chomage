import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Chômage cadre 3 000 €/mois 2025 : montant ARE exact",
  description: "Cadre à 3 000 €/mois au chômage ? ARE mensuelle, dégressivité et durée calculées depuis les paramètres officiels. Exemple complet.",
  alternates: { canonical: 'https://www.monchomage.fr/chomage-cadre-3000-euros' },
}

// ── Cadre 3 000 €/mois ────────────────────────────────────────────────────────
const SALAIRE = 3_000

const sjr = Number((SALAIRE / ARE_PARAMS.joursParMoisSJR).toFixed(2))
const f1 = Number((ARE_PARAMS.tauxFormule1 * sjr + ARE_PARAMS.partieFix).toFixed(2))
const f2 = Number((ARE_PARAMS.tauxFormule2 * sjr).toFixed(2))
const ajBrute = Math.max(f1, f2)
const aj = Number(
  Math.max(Math.min(ajBrute, ARE_PARAMS.plafondTauxSJR * sjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const ajMensuelle = Number((aj * ARE_PARAMS.joursParMois).toFixed(2))

const degressiviteActive = aj > ARE_PARAMS.seuilDegressiviteAJ
const ajApresDegressivite = Number(
  Math.max(aj * ARE_PARAMS.coeffDegressivite, ARE_PARAMS.seuilDegressiviteAJ).toFixed(2)
)
const ajMensuelleApres = Number((ajApresDegressivite * ARE_PARAMS.joursParMois).toFixed(2))
const tauxReduction = Math.round((1 - ARE_PARAMS.coeffDegressivite) * 100)

// Tableau 24 mois
const tableau24 = Array.from({ length: 24 }, (_, i) => {
  const mois = i + 1
  const joursDepuis = mois * ARE_PARAMS.joursParMois
  const degressif = degressiviteActive && joursDepuis > ARE_PARAMS.joursAvantDegressivite
  const ajMois = degressif ? ajApresDegressivite : aj
  const mensuel = Number((ajMois * ARE_PARAMS.joursParMois).toFixed(2))
  return { mois, ajMois, mensuel, degressif }
})

const totalSur24 = tableau24.reduce((sum, m) => sum + m.mensuel, 0)

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chomage cadre', item: 'https://www.monchomage.fr/chomage-cadre' },
    { '@type': 'ListItem', position: 3, name: 'Chomage cadre 3 000 euros/mois', item: 'https://www.monchomage.fr/chomage-cadre-3000-euros' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Combien touche un cadre à 3 000 €/mois au chômage ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Un cadre avec un salaire brut de ${euros(SALAIRE)}/mois touche ${euros(ajMensuelle)}/mois au chomage (AJ = ${euros(aj)}/j, SJR = ${euros(sjr)}/j). La degressivite ne s'applique pas car l'AJ (${euros(aj)}/j) est inferieure au seuil de ${euros(ARE_PARAMS.seuilDegressiviteAJ)}/j. L'ARE reste stable pendant toute la duree de l'indemnisation.`,
      },
    },
    {
      '@type': 'Question',
      name: "La dégressivité s'applique-t-elle à un cadre à 3 000 € ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Non. La degressivite ne s'applique que si l'allocation journaliere depasse ${euros(ARE_PARAMS.seuilDegressiviteAJ)}/jour, ce qui correspond a un salaire d'environ 4 939 euros/mois. Pour un cadre a ${euros(SALAIRE)}/mois, l'AJ est de ${euros(aj)}/j, en dessous du seuil. L'ARE reste a ${euros(ajMensuelle)}/mois pendant toute la duree des droits.`,
      },
    },
    {
      '@type': 'Question',
      name: "Un cadre à 3 000 €/mois peut-il cumuler ARE et activité réduite ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui. Un cadre qui reprend une activite partielle peut cumuler ses revenus d'activite avec une partie de son ARE. France Travail calcule un nombre de jours non indemnises proportionnel aux revenus perçus, ce qui allonge d'autant la duree des droits. Le cumul est possible tant que les revenus d'activite ne depassent pas le salaire anterieur (${euros(SALAIRE)}/mois).`,
      },
    },
  ],
}

export default function PageChomoCadre3000() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="mx-auto max-w-3xl px-4 py-8 space-y-10">
        <nav className="text-sm text-slate-500">
          <Link href="/" className="hover:underline">Accueil</Link>
          <span className="mx-2">&rsaquo;</span>
          <Link href="/chomage-cadre" className="hover:underline">Ch&ocirc;mage cadre</Link>
          <span className="mx-2">&rsaquo;</span>
          <span>Cadre {euros(SALAIRE)}/mois</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900">
          Ch&ocirc;mage cadre {euros(SALAIRE)}&nbsp;brut&nbsp;: ARE, d&eacute;gressivit&eacute; et dur&eacute;e 2025
        </h1>

        {/* 1. Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Les chiffres exacts pour un cadre &agrave; {euros(SALAIRE)}/mois</h2>
          <p className="text-slate-700">
            Avec un salaire brut de <strong>{euros(SALAIRE)}/mois</strong>, votre ARE s&apos;&eacute;l&egrave;ve
            &agrave; <strong>{euros(ajMensuelle)}/mois</strong> pendant toute la dur&eacute;e de votre
            indemnisation. Contrairement aux cadres &agrave; salaires plus &eacute;lev&eacute;s,
            la <strong>d&eacute;gressivit&eacute; ne s&apos;applique pas</strong> &agrave; ce niveau de
            salaire&nbsp;: votre AJ de {euros(aj)}/j est inf&eacute;rieure au seuil de{' '}
            {euros(ARE_PARAMS.seuilDegressiviteAJ)}/j.
          </p>
        </section>

        {/* 2. Calcul SJR */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Calcul du SJR et de l&apos;ARE</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Salaire journalier de r&eacute;f&eacute;rence (SJR)</td>
                  <td className="border border-slate-200 px-4 py-2">
                    {euros(SALAIRE)} &divide; {ARE_PARAMS.joursParMoisSJR} = <strong>{euros(sjr)}/j</strong>
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    Formule 1 ({Math.round(ARE_PARAMS.tauxFormule1 * 100)}&nbsp;% SJR + {euros(ARE_PARAMS.partieFix)})
                  </td>
                  <td className="border border-slate-200 px-4 py-2">
                    {euros(sjr)} &times; {ARE_PARAMS.tauxFormule1} + {euros(ARE_PARAMS.partieFix)} = {euros(f1)}/j
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    Formule 2 ({Math.round(ARE_PARAMS.tauxFormule2 * 100)}&nbsp;% SJR)
                  </td>
                  <td className="border border-slate-200 px-4 py-2">
                    {euros(sjr)} &times; {ARE_PARAMS.tauxFormule2} = {euros(f2)}/j
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">AJ retenue (maximum des deux formules)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-700">{euros(aj)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">
                    Plafond {Math.round(ARE_PARAMS.plafondTauxSJR * 100)}&nbsp;% SJR
                  </td>
                  <td className="border border-slate-200 px-4 py-2">
                    {euros(ARE_PARAMS.plafondTauxSJR * sjr)}/j (non actif)
                  </td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-green-900">ARE mensuelle</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-green-900">{euros(ajMensuelle)}/mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">D&eacute;gressivit&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">
                    Non applicable &mdash; AJ {euros(aj)}/j &lt; seuil {euros(ARE_PARAMS.seuilDegressiviteAJ)}/j
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 text-sm">
            La d&eacute;gressivit&eacute; (r&eacute;duction de {tauxReduction}&nbsp;%) s&apos;applique
            uniquement si l&apos;AJ d&eacute;passe {euros(ARE_PARAMS.seuilDegressiviteAJ)}/j, soit
            un salaire d&apos;environ 4&nbsp;939&nbsp;€/mois. Votre ARE reste stable toute la dur&eacute;e.
          </p>
        </section>

        {/* 3. ARE mensuelle stable */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">ARE mensuelle stable tout au long de l&apos;indemnisation</h2>
          <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center max-w-xs">
            <p className="text-sm text-green-700 font-medium">ARE mensuelle (mois 1 &agrave; 12)</p>
            <p className="text-4xl font-bold text-green-800 mt-1">{euros(ajMensuelle)}</p>
            <p className="text-xs text-green-600 mt-1">soit {euros(aj)}/j &times; {ARE_PARAMS.joursParMois}&nbsp;j</p>
            <p className="text-xs text-green-600 mt-1">Pas de d&eacute;gressivit&eacute;</p>
          </div>
        </section>

        {/* 4. Tableau mois par mois 24 mois */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Tableau mois par mois sur 24&nbsp;mois</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-3 py-2 text-left font-semibold text-slate-700">Mois</th>
                  <th className="border border-slate-200 px-3 py-2 text-left font-semibold text-slate-700">Phase</th>
                  <th className="border border-slate-200 px-3 py-2 text-left font-semibold text-slate-700">AJ/j</th>
                  <th className="border border-slate-200 px-3 py-2 text-left font-semibold text-slate-700">Mensuel</th>
                </tr>
              </thead>
              <tbody>
                {tableau24.map(({ mois, ajMois, mensuel, degressif }) => (
                  <tr key={mois} className={degressif ? 'bg-orange-50' : 'odd:bg-white even:bg-slate-50'}>
                    <td className="border border-slate-200 px-3 py-2 font-medium">{mois}</td>
                    <td className="border border-slate-200 px-3 py-2">
                      {degressif
                        ? <span className="text-orange-700">D&eacute;gressivit&eacute;</span>
                        : <span className="text-green-700">Taux plein</span>}
                    </td>
                    <td className="border border-slate-200 px-3 py-2">{euros(ajMois)}/j</td>
                    <td className="border border-slate-200 px-3 py-2 font-semibold">{euros(mensuel)}</td>
                  </tr>
                ))}
                <tr className="bg-slate-200 font-bold">
                  <td className="border border-slate-300 px-3 py-2" colSpan={3}>Total sur 24&nbsp;mois</td>
                  <td className="border border-slate-300 px-3 py-2 text-blue-800">{euros(Math.round(totalSur24))}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 text-sm">
            Tableau pour un cadre de moins de {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans.
            La d&eacute;gressivit&eacute; ne s&apos;applique pas &agrave; ce niveau de salaire.
            L&apos;ARE reste &agrave; {euros(ajMensuelle)}/mois pendant toute la dur&eacute;e.
          </p>
        </section>

        {/* 5. Durée selon ancienneté */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Dur&eacute;e selon l&apos;anciennet&eacute;</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Anciennet&eacute;</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Dur&eacute;e (- de 50 ans)</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Dur&eacute;e (50&ndash;54 ans)</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Dur&eacute;e (55 ans+)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">6&nbsp;mois (minimum)</td>
                  <td className="border border-slate-200 px-4 py-2">6&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2">6&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2">6&nbsp;mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">12&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2">12&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2">12&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2">12&nbsp;mois</td>
                </tr>
                <tr className="bg-blue-50 font-bold">
                  <td className="border border-slate-200 px-4 py-2">24&nbsp;mois (&lt;&nbsp;50&nbsp;ans)</td>
                  <td className="border border-slate-200 px-4 py-2 text-blue-900">
                    12&nbsp;mois max ({ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;j)
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-blue-900">
                    24&nbsp;mois ({ARE_PARAMS.dureeMax50ansEtPlusJours}&nbsp;j)
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-blue-900">
                    36&nbsp;mois ({ARE_PARAMS.dureeMax55ansEtPlusJours}&nbsp;j)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 text-sm">
            La dur&eacute;e d&apos;indemnisation d&eacute;pend des jours travaill&eacute;s dans la p&eacute;riode
            de r&eacute;f&eacute;rence ({ARE_PARAMS.moisRefMoins55ans}&nbsp;mois avant 55&nbsp;ans,
            {' '}{ARE_PARAMS.moisRefPlus55ans}&nbsp;mois apr&egrave;s 55&nbsp;ans).
          </p>
        </section>

        {/* 6. Impact selon type de rupture */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Impact selon le type de rupture</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Type de rupture</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Diff&eacute;r&eacute; ARE</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Indemnit&eacute;s</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Rupture conventionnelle (RC)</td>
                  <td className="border border-slate-200 px-4 py-2">
                    CP + diff&eacute;r&eacute; sp&eacute;cifique (max {ARE_PARAMS.franchiseMaxRC}&nbsp;j)
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">ISRC + pr&eacute;avis (selon accord)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Licenciement &eacute;conomique</td>
                  <td className="border border-slate-200 px-4 py-2">
                    CP + diff&eacute;r&eacute; sp&eacute;cifique (max {ARE_PARAMS.franchiseMaxLicenciementEco}&nbsp;j)
                  </td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Indemni&eacute; l&eacute;gale + pr&eacute;avis</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Licenciement personnel</td>
                  <td className="border border-slate-200 px-4 py-2">CP + diff&eacute;r&eacute; sp&eacute;cifique</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Indemni&eacute; l&eacute;gale + pr&eacute;avis</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Faute grave</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">CP uniquement (quelques jours)</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">Pas d&apos;indemnit&eacute; ni pr&eacute;avis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Cumul ARE + activité réduite */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Cumul ARE + activit&eacute; r&eacute;duite</h2>
          <p className="text-slate-700">
            Un cadre qui reprend une activit&eacute; partielle peut cumuler l&apos;ARE avec ses nouveaux
            revenus, dans la limite du salaire ant&eacute;rieur ({euros(SALAIRE)}/mois).
            France Travail calcule un nombre de jours non indemnisables proportionnel aux
            revenus d&apos;activit&eacute;, ce qui <strong>allonge la dur&eacute;e des droits</strong>.
          </p>
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
            Exemple&nbsp;: si vous percevez 1&nbsp;200&nbsp;€ de revenus d&apos;activit&eacute; r&eacute;duite,
            France Travail d&eacute;duit environ 10&ndash;12 jours non indemnisables par mois, mais vous
            continuez &agrave; percevoir une partie de l&apos;ARE. Vos droits s&apos;&eacute;puisent plus lentement.
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
            Entrez votre salaire exact dans le calculateur pour obtenir votre indemnisation personnalis&eacute;e.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Calculateur ARE
            </Link>
            <Link href="/chomage-cadre" className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
              Ch&ocirc;mage cadre
            </Link>
            <Link href="/degressivite-chomage" className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
              D&eacute;gressivit&eacute; du ch&ocirc;mage
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
