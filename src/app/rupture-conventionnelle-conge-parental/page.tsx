import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "RC pendant conge parental 2025 : ARE et SJR neutralise",
  description: "Rupture conventionnelle pendant ou apres un conge parental ? SJR neutralise, franchise recalculee. Ce que votre employeur ne vous dit pas.",
  alternates: { canonical: 'https://www.monchomage.fr/rupture-conventionnelle-conge-parental' },
}

const DELAI_ATTENTE = 7

// ── Exemple : CDI 4 ans, congé parental 12 mois à 0%, salaire 2 500 €/mois
// Neutralisation : 12 mois de congé neutralisés, SJR sur 36 mois effectifs
// Fenêtre de référence élargie = 24 + 12 = 36 mois
const EX_SALAIRE = 2_500
const EX_ANCIENNETE_ANS = 4
const EX_ANCIENNETE_MOIS = EX_ANCIENNETE_ANS * 12
const EX_CONGE_MOIS = 12
const EX_MOIS_TRAVAILLES = Math.min(EX_ANCIENNETE_MOIS - EX_CONGE_MOIS, ARE_PARAMS.moisRefMoins55ans)

const exSjr = Number((EX_SALAIRE / ARE_PARAMS.joursParMoisSJR).toFixed(2))
const exF1 = Number((ARE_PARAMS.tauxFormule1 * exSjr + ARE_PARAMS.partieFix).toFixed(2))
const exF2 = Number((ARE_PARAMS.tauxFormule2 * exSjr).toFixed(2))
const exAj = Number(
  Math.max(Math.min(Math.max(exF1, exF2), ARE_PARAMS.plafondTauxSJR * exSjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const exAjMensuelle = Number((exAj * ARE_PARAMS.joursParMois).toFixed(2))

// Franchise RC avec SJR neutralisé
const EX_INDEMNITE_RC = 10_000
const EX_ANCIENNETE_ANS_COMPL = EX_ANCIENNETE_ANS // congé parental compte pour ancienneté
const exIndLegaleT1 = Math.min(EX_ANCIENNETE_ANS_COMPL, 10) * (EX_SALAIRE / 4)
const exIndLegale = Number(exIndLegaleT1.toFixed(2))
const exSupraLegale = Number(Math.max(0, EX_INDEMNITE_RC - exIndLegale).toFixed(2))
const exFranchiseBrute = Number((exSupraLegale / exSjr).toFixed(1))
const exFranchise = Math.min(Math.round(exFranchiseBrute), ARE_PARAMS.franchiseMaxRC)
const exCarenceTotal = DELAI_ATTENTE + exFranchise

// Durée indemnisation : calculée sur les mois effectivement travaillés
const exDureeJours = Math.min(EX_MOIS_TRAVAILLES * ARE_PARAMS.joursParMoisSJR, ARE_PARAMS.dureeMaxMoins50ansJours)

// Tableau : impact durée congé parental sur SJR (6 / 12 / 24 mois)
const DUREES_CONGE = [6, 12, 24]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Rupture conventionnelle', item: 'https://www.monchomage.fr/rupture-conventionnelle' },
    { '@type': 'ListItem', position: 3, name: 'RC conge parental', item: 'https://www.monchomage.fr/rupture-conventionnelle-conge-parental' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Peut-on faire une rupture conventionnelle pendant un conge parental ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Contrairement au conge maternite, il n'existe pas de protection absolue contre la rupture du contrat pendant un conge parental. La rupture conventionnelle est possible avec l'accord des deux parties (L.1237-11 du Code du travail). L'employeur ne peut cependant pas exercer de pression abusive pour obtenir la signature.",
      },
    },
    {
      '@type': 'Question',
      name: "Le conge parental est-il pris en compte dans le calcul du chomage ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, le conge parental a temps plein est neutralise dans le calcul du SJR. La periode de suspension est exclue de l'assiette et la fenetre de reference de 24 mois est elargie d'autant. Le SJR reste donc base sur le salaire habituel, preservant le montant de l'ARE.",
      },
    },
    {
      '@type': 'Question',
      name: "Comment est calcule l'ARE apres un conge parental d'un an ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Pour un salaire de ${euros(EX_SALAIRE)}/mois et un conge parental de ${EX_CONGE_MOIS} mois : le SJR neutralise est de ${euros(exSjr)}/j. L'ARE journaliere est de ${euros(exAj)}/j, soit ${euros(exAjMensuelle)}/mois. La duree est calculee sur les ${EX_MOIS_TRAVAILLES} mois effectivement travailles (fenetre elargie a ${ARE_PARAMS.moisRefMoins55ans + EX_CONGE_MOIS} mois).`,
      },
    },
  ],
}

export default function RuptureConventionnelleCongeParental() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}
        <Link href="/rupture-conventionnelle" className="hover:underline">Rupture conventionnelle</Link>
        {' '}&rsaquo;{' '}RC cong&eacute; parental
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Rupture conventionnelle cong&eacute; parental&nbsp;: ARE, SJR neutralis&eacute; et droits 2025
      </h1>

      <div className="mt-8 space-y-10 text-slate-700">

        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            RC pendant ou apr&egrave;s un cong&eacute; parental&nbsp;: un cas fr&eacute;quent et mal compris
          </h2>
          <p className="mt-3">
            La rupture conventionnelle pendant ou apr&egrave;s un cong&eacute; parental est
            juridiquement possible et de plus en plus fr&eacute;quente. Le parent qui signe une
            RC dans ce contexte b&eacute;n&eacute;ficie de la <strong>neutralisation du cong&eacute;</strong>
            dans le calcul du SJR&nbsp;: le montant de l&apos;ARE est bas&eacute; sur le salaire
            ant&eacute;rieur au cong&eacute;, non sur les indemnit&eacute;s per&ccedil;ues pendant
            le cong&eacute; (g&eacute;n&eacute;ralement plus basses).
          </p>
        </section>

        {/* 2. Neutralisation congé parental */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Neutralisation du cong&eacute; parental dans le SJR
          </h2>
          <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
            <strong>Principe&nbsp;:</strong> Les p&eacute;riodes de suspension du contrat sont
            exclues du calcul du SJR. La fen&ecirc;tre de r&eacute;f&eacute;rence est &eacute;largie
            de la dur&eacute;e du cong&eacute;. Cela s&apos;applique aussi bien au cong&eacute;
            parental &agrave; temps plein (contrat suspendu) qu&apos;au cong&eacute; parental &agrave;
            temps partiel (assiette r&eacute;duite).
          </div>
          <p className="mt-3">
            <strong>Cong&eacute; parental &agrave; temps plein (0&nbsp;%)&nbsp;:</strong> la
            p&eacute;riode enti&egrave;re est neutralis&eacute;e. SJR = salaire avant cong&eacute;.
          </p>
          <p className="mt-2">
            <strong>Cong&eacute; parental &agrave; temps partiel&nbsp;:</strong> le SJR est calcul&eacute;
            sur les p&eacute;riodes effectives (salaire r&eacute;duit inclus). La neutralisation
            s&apos;applique si l&apos;activit&eacute; est inf&eacute;rieure &agrave; un seuil.
          </p>
        </section>

        {/* 3. Franchise RC avec neutralisation */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Franchise RC avec SJR neutralis&eacute;&nbsp;: exemple {euros(EX_SALAIRE)}/mois, {EX_ANCIENNETE_ANS}&nbsp;ans, cong&eacute; {EX_CONGE_MOIS}&nbsp;mois
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Anciennet&eacute; totale (cong&eacute; compte)</td>
                  <td className="border border-slate-200 px-4 py-2">{EX_ANCIENNETE_ANS}&nbsp;ans</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemnit&eacute; l&eacute;gale&nbsp;: {EX_ANCIENNETE_ANS}&nbsp;ans &times; ({euros(EX_SALAIRE)}&nbsp;&divide;&nbsp;4)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exIndLegale)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemnit&eacute; RC n&eacute;goci&eacute;e</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(EX_INDEMNITE_RC)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Part supra-l&eacute;gale</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exSupraLegale)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">SJR neutralis&eacute; (salaire ant&eacute;rieur au cong&eacute;)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exSjr)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Franchise brute = {euros(exSupraLegale)} &divide; {euros(exSjr)}</td>
                  <td className="border border-slate-200 px-4 py-2">{exFranchiseBrute}&nbsp;j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Plafond franchise RC</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.franchiseMaxRC}&nbsp;j</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">Franchise appliqu&eacute;e</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{exFranchise}&nbsp;j</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">Carence totale (hors CP)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{DELAI_ATTENTE}&nbsp;j + {exFranchise}&nbsp;j = {exCarenceTotal}&nbsp;j</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Chronologie */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Chronologie compl&egrave;te
          </h2>
          <div className="mt-4 space-y-2">
            {[
              { n: '1', titre: 'Fin du cong&eacute; parental', detail: 'ou RC sign&eacute;e pendant le cong&eacute; (possible avec accord mutuel)' },
              { n: '2', titre: 'Rupture conventionnelle homologu&eacute;e', detail: `Indemnit&eacute; RC de ${euros(EX_INDEMNITE_RC)} dans l&apos;exemple` },
              { n: '3', titre: `D&eacute;lai d&apos;attente ${DELAI_ATTENTE}&nbsp;j + diff&eacute;r&eacute; CP`, detail: 'Hors franchise supra-l&eacute;gale' },
              { n: '4', titre: `Franchise RC ${exFranchise}&nbsp;j`, detail: `SJR neutralis&eacute; ${euros(exSjr)}/j utilis&eacute; pour le calcul` },
              { n: '5', titre: 'D&eacute;but versement ARE', detail: `${euros(exAjMensuelle)}/mois pendant ${Math.round(exDureeJours / 30)}&nbsp;mois` },
            ].map(({ n, titre, detail }) => (
              <div key={n} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{n}</div>
                <div>
                  <p className="font-semibold text-slate-900" dangerouslySetInnerHTML={{ __html: titre }} />
                  <p className="text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: detail }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Calcul exemple complet */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            ARE calcul&eacute;e avec neutralisation
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">SJR neutralis&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{euros(exSjr)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule&nbsp;1</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exF1)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule&nbsp;2 (retenue)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exF2)}/j</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE journali&egrave;re</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(exAj)}/j</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE mensuelle</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(exAjMensuelle)}/mois</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">Dur&eacute;e ({EX_MOIS_TRAVAILLES}&nbsp;mois travail&eacute;s)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{exDureeJours}&nbsp;j</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Congé parental à temps partiel */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Cas particulier&nbsp;: cong&eacute; parental &agrave; temps partiel
          </h2>
          <p className="mt-3">
            En cong&eacute; parental &agrave; temps partiel (50&nbsp;%, 60&nbsp;% ou 80&nbsp;%),
            le salari&eacute; per&ccedil;oit un salaire r&eacute;duit. Le SJR est calcul&eacute;
            sur ce salaire r&eacute;duit pour les p&eacute;riodes concern&eacute;es, ce qui baisse
            m&eacute;caniquement l&apos;ARE. La neutralisation ne s&apos;applique qu&apos;en cas
            de suspension totale du contrat.
          </p>
          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <strong>Conseil&nbsp;:</strong> si vous envisagez une RC apr&egrave;s un cong&eacute;
            parental &agrave; temps partiel, negocier le retour &agrave; temps plein avant la
            signature peut am&eacute;liorer significativement le SJR et donc l&apos;ARE.
          </div>
        </section>

        {/* 7. Protection pendant congé parental */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Protection du salari&eacute; pendant le cong&eacute; parental
          </h2>
          <p className="mt-3">
            Contrairement au cong&eacute; maternit&eacute;, le cong&eacute; parental
            <strong> ne prot&egrave;ge pas absolument</strong> contre la rupture du contrat. Une
            rupture conventionnelle reste possible avec l&apos;accord mutuel des deux parties.
            L&apos;employeur ne peut cependant pas exercer de pression ou profiter de la vuln&eacute;rabilit&eacute;
            du parent pour obtenir la signature.
          </p>
        </section>

        {/* 8. Cumul PAJE et ARE */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Compl&eacute;ment PAJE et ARE
          </h2>
          <p className="mt-3">
            La Prestation d&apos;Accueil du Jeune Enfant (PAJE) et ses compl&eacute;ments (CMG,
            compl&eacute;ment de libre choix) peuvent &ecirc;tre cumul&eacute;s avec l&apos;ARE
            sous conditions de ressources. D&eacute;clarer l&apos;ARE &agrave; la CAF d&egrave;s
            l&apos;ouverture des droits pour recalcul du droit &agrave; la PAJE.
          </p>
        </section>

        {/* 9. Tableau durée congé parental */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Impact de la dur&eacute;e du cong&eacute; parental sur le SJR et l&apos;ARE
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Cong&eacute; parental (0&nbsp;%)</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Fen&ecirc;tre &eacute;largie</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">SJR neutralis&eacute;</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">ARE mensuelle</th>
                </tr>
              </thead>
              <tbody>
                {DUREES_CONGE.map((moisConge) => {
                  const fenetreElargie = ARE_PARAMS.moisRefMoins55ans + moisConge
                  const sjr = Number((EX_SALAIRE / ARE_PARAMS.joursParMoisSJR).toFixed(2))
                  const f1 = Number((ARE_PARAMS.tauxFormule1 * sjr + ARE_PARAMS.partieFix).toFixed(2))
                  const f2 = Number((ARE_PARAMS.tauxFormule2 * sjr).toFixed(2))
                  const aj = Number(Math.max(Math.min(Math.max(f1, f2), ARE_PARAMS.plafondTauxSJR * sjr), ARE_PARAMS.allocationMinimale).toFixed(2))
                  const mensuelle = Number((aj * ARE_PARAMS.joursParMois).toFixed(2))
                  return (
                    <tr key={moisConge} className="odd:bg-white even:bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium">{moisConge}&nbsp;mois</td>
                      <td className="border border-slate-200 px-4 py-2">{fenetreElargie}&nbsp;mois</td>
                      <td className="border border-slate-200 px-4 py-2">{euros(sjr)}/j</td>
                      <td className="border border-slate-200 px-4 py-2 font-semibold text-blue-700">{euros(mensuelle)}/mois</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Le SJR est pr&eacute;serv&eacute; quelle que soit la dur&eacute;e du cong&eacute; parental gr&acirc;ce &agrave; la neutralisation.
          </p>
        </section>

        {/* 10. FAQ */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">Questions fr&eacute;quentes</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900">Peut-on faire une RC pendant un cong&eacute; parental&nbsp;?</h3>
              <p className="mt-1">
                Oui. Il n&apos;existe pas de protection absolue contre la rupture pendant un cong&eacute;
                parental (contrairement &agrave; la maternit&eacute;). La RC est possible avec l&apos;accord
                mutuel.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Le cong&eacute; parental est-il pris en compte dans le calcul du ch&ocirc;mage&nbsp;?</h3>
              <p className="mt-1">
                Non (neutralisation). Le SJR est bas&eacute; sur le salaire avant cong&eacute;, et
                la fen&ecirc;tre de r&eacute;f&eacute;rence est &eacute;largie d&apos;autant.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Comment est calcul&eacute;e l&apos;ARE apr&egrave;s un cong&eacute; parental d&apos;un an&nbsp;?</h3>
              <p className="mt-1">
                SJR neutralis&eacute; = {euros(exSjr)}/j ({euros(EX_SALAIRE)}/mois &divide; {ARE_PARAMS.joursParMoisSJR}).
                ARE = {euros(exAj)}/j, soit {euros(exAjMensuelle)}/mois. La dur&eacute;e est
                calcul&eacute;e sur les {EX_MOIS_TRAVAILLES}&nbsp;mois travaill&eacute;s effectivement.
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
        <h2 className="text-xl font-bold text-blue-900">Calculez votre ARE apr&egrave;s une RC</h2>
        <p className="mt-2 text-blue-700">Simulez votre allocation avec la neutralisation du cong&eacute; parental.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700">
            Calculateur ARE
          </Link>
          <Link href="/rupture-conventionnelle" className="rounded-lg border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400">
            Rupture conventionnelle
          </Link>
          <Link href="/chomage-apres-conge-maternite" className="rounded-lg border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400">
            Ch&ocirc;mage apr&egrave;s maternit&eacute;
          </Link>
        </div>
      </div>
    </main>
  )
}
