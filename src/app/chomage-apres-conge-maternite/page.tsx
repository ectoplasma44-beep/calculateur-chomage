import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Chomage apres conge maternite 2025 : calcul ARE et droits",
  description: "Au chomage apres un conge maternite ? Calcul SJR neutralise, droits ARE et demarches 2025. Guide complet avec exemples chiffres.",
  alternates: { canonical: 'https://www.monchomage.fr/chomage-apres-conge-maternite' },
}

const DELAI_ATTENTE = 7

// ── Exemple : CDI 3 ans, congé mat 4 mois, salaire 2 800 €/mois ─────────────
// Neutralisation : on exclut les 4 mois de congé du calcul SJR
// Fenêtre référence = 24 mois + 4 mois = 28 mois
const EX_SALAIRE = 2_800
const EX_ANCIENNETE_MOIS = 36     // 3 ans en CDI
const EX_CONGE_MAT_MOIS = 4
const EX_MOIS_TRAVAILLES = EX_ANCIENNETE_MOIS - EX_CONGE_MAT_MOIS
const EX_JOURS_TRAVAILLES = EX_MOIS_TRAVAILLES * ARE_PARAMS.joursParMoisSJR
const exTotalBrut = EX_SALAIRE * EX_MOIS_TRAVAILLES
const exSjr = Number((exTotalBrut / EX_JOURS_TRAVAILLES).toFixed(2)) // = salaire / 30 = 2800/30
const exF1 = Number((ARE_PARAMS.tauxFormule1 * exSjr + ARE_PARAMS.partieFix).toFixed(2))
const exF2 = Number((ARE_PARAMS.tauxFormule2 * exSjr).toFixed(2))
const exAj = Number(
  Math.max(Math.min(Math.max(exF1, exF2), ARE_PARAMS.plafondTauxSJR * exSjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const exAjMensuelle = Number((exAj * ARE_PARAMS.joursParMois).toFixed(2))

// Exemple calcul complet : CDI 5 ans, congé mat 16 semaines (~4 mois), 2 800€
const EX2_ANCIENNETE_MOIS = 60
const EX2_CONGE_SEMAINES = 16
const EX2_CONGE_MOIS = Math.round(EX2_CONGE_SEMAINES / 4.33)
const EX2_MOIS_TRAVAILLES = EX2_ANCIENNETE_MOIS - EX2_CONGE_MOIS
const EX2_JOURS_TRAVAILLES = EX2_MOIS_TRAVAILLES * ARE_PARAMS.joursParMoisSJR
const ex2Sjr = Number((EX_SALAIRE / ARE_PARAMS.joursParMoisSJR).toFixed(2))
const ex2Aj = exAj // identique (même salaire)
const ex2AjMensuelle = exAjMensuelle
const ex2Duree = Math.min(EX2_JOURS_TRAVAILLES, ARE_PARAMS.dureeMaxMoins50ansJours)

// Tableau : impact durée congé maternite sur SJR (8 / 16 / 26 semaines)
// Principe : le SJR ne change pas car neutralisation exclut aussi les jours du congé
// La durée change avec le nombre de mois restants à cotiser
const CONGES_SEMAINES = [8, 16, 26]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chomage apres conge maternite', item: 'https://www.monchomage.fr/chomage-apres-conge-maternite' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Le conge maternite est-il inclus dans le calcul du chomage ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. La periode de conge maternite est exclue (neutralisee) du calcul du SJR. Seules les periodes effectivement travaillees et remunerees entrent dans l'assiette. En contrepartie, la fenetre de reference de 24 mois est allongee de la duree du conge, ce qui permet de prendre en compte plus de periodes travaillees.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on etre licenciee apres un conge maternite ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, pas pendant le conge maternite ni dans les 10 semaines suivant le retour (protection L.1225-4 du Code du travail). Seule une faute grave non liee a la grossesse ou une impossibilite de maintenir le contrat peut justifier un licenciement. Tout licenciement en dehors de ces cas est nul.",
      },
    },
    {
      '@type': 'Question',
      name: "Comment calculer son ARE si on a eu un conge maternite ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Le SJR est calcule sur les salaires des periodes travaillees uniquement. La periode de conge maternite est neutralisee et la fenetre de 24 mois est etendue d'autant. Le montant de l'ARE reste donc identique a ce qu'il aurait ete sans le conge, car le SJR reflete le salaire habituel (${euros(EX_SALAIRE)}/mois dans l'exemple → SJR ${euros(exSjr)}/j → ARE ${euros(exAj)}/j).`,
      },
    },
  ],
}

export default function ChomageApresCongeMaternite() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}Ch&ocirc;mage apr&egrave;s cong&eacute; maternit&eacute;
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Ch&ocirc;mage apr&egrave;s cong&eacute; maternit&eacute;&nbsp;: ARE, SJR neutralis&eacute; et droits 2025
      </h1>

      <div className="mt-8 space-y-10 text-slate-700">

        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Une situation sp&eacute;cifique avec une r&egrave;gle de neutralisation protectrice
          </h2>
          <p className="mt-3">
            La fin du cong&eacute; maternit&eacute; peut coand&eacute;cider avec une perte
            d&apos;emploi (non-renouvellement de CDD, licenciement autoris&eacute;, rupture
            conventionnelle). La r&egrave;gle de <strong>neutralisation</strong> pr&eacute;vue
            par la convention Unédic prot&egrave;ge les droits&nbsp;: la p&eacute;riode de cong&eacute;
            est exclue du calcul du SJR et la fen&ecirc;tre de r&eacute;f&eacute;rence est all&ocirc;ng&eacute;e
            en proportion. Cela &eacute;vite que l&apos;ARE soit calcul&eacute;e sur des p&eacute;riodes
            d&apos;indemnit&eacute;s journ&egrave;res maternit&eacute; moins &eacute;lev&eacute;es
            que le salaire r&eacute;el.
          </p>
        </section>

        {/* 2. Neutralisation SJR */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Neutralisation du cong&eacute; dans le calcul du SJR
          </h2>
          <div className="mt-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
            <strong>Principe&nbsp;:</strong> Les p&eacute;riodes de suspension du contrat (maladie,
            maternit&eacute;, accident) sont exclues de l&apos;assiette de calcul du SJR. La fen&ecirc;tre
            de r&eacute;f&eacute;rence de {ARE_PARAMS.moisRefMoins55ans}&nbsp;mois est all&ocirc;ng&eacute;e
            de la dur&eacute;e de la suspension pour retrouver {ARE_PARAMS.moisRefMoins55ans}&nbsp;mois
            de travail effectif.
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-slate-900">Exemple&nbsp;: CDI {EX_ANCIENNETE_MOIS / 12}&nbsp;ans, cong&eacute; mat {EX_CONGE_MAT_MOIS}&nbsp;mois, {euros(EX_SALAIRE)}/mois</h3>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Fen&ecirc;tre th&eacute;orique&nbsp;: {ARE_PARAMS.moisRefMoins55ans}&nbsp;mois</li>
              <li>Fen&ecirc;tre &eacute;largie&nbsp;: {ARE_PARAMS.moisRefMoins55ans + EX_CONGE_MAT_MOIS}&nbsp;mois (+ {EX_CONGE_MAT_MOIS}&nbsp;mois de cong&eacute; neutralis&eacute;)</li>
              <li>Mois de travail effectif pris en compte&nbsp;: {EX_MOIS_TRAVAILLES}&nbsp;mois</li>
              <li>SJR = {euros(exTotalBrut)} &divide; {EX_JOURS_TRAVAILLES}&nbsp;j = <strong>{euros(exSjr)}/j</strong></li>
            </ul>
            <p className="mt-2 text-sm text-slate-600">
              Le SJR reste identique au salaire divis&eacute; par 30&nbsp;: la neutralisation
              pr&eacute;serve le niveau de l&apos;allocation comme si le cong&eacute; n&apos;avait
              pas eu lieu.
            </p>
          </div>
        </section>

        {/* 3. Impact durée de référence */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Impact sur la dur&eacute;e de r&eacute;f&eacute;rence
          </h2>
          <p className="mt-3">
            La p&eacute;riode de {ARE_PARAMS.moisRefMoins55ans}&nbsp;mois est all&ocirc;ng&eacute;e
            de la dur&eacute;e du cong&eacute; maternit&eacute;. Cela permet de retrouver suffisamment
            de jours cotis&eacute;s pour ouvrir les droits ARE (130 jours minimum), m&ecirc;me
            apr&egrave;s un cong&eacute; long.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Dur&eacute;e cong&eacute; mat</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Fen&ecirc;tre r&eacute;f&eacute;rence</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">SJR (salaire r&eacute;el, neutralis&eacute;)</th>
                </tr>
              </thead>
              <tbody>
                {CONGES_SEMAINES.map((semaines) => {
                  const moisConge = Math.round(semaines / 4.33)
                  const fenetreElargie = ARE_PARAMS.moisRefMoins55ans + moisConge
                  return (
                    <tr key={semaines} className="odd:bg-white even:bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium">{semaines}&nbsp;semaines (~{moisConge}&nbsp;mois)</td>
                      <td className="border border-slate-200 px-4 py-2">{fenetreElargie}&nbsp;mois</td>
                      <td className="border border-slate-200 px-4 py-2 text-blue-700 font-medium">Identique au salaire / {ARE_PARAMS.joursParMoisSJR}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Motifs de rupture après maternité */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Motifs de rupture apr&egrave;s un cong&eacute; maternit&eacute;
          </h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <h3 className="font-semibold">Licenciement pendant ou juste apr&egrave;s le cong&eacute;</h3>
              <p className="mt-1">
                Interdit pendant le cong&eacute; et dans les 10&nbsp;semaines suivant le retour
                (art. L.1225-4 C.trav.). Sauf faute grave non li&eacute;e &agrave; la grossesse
                ou impossibilit&eacute; de maintenir le contrat pour un motif &eacute;tranger &agrave;
                la grossesse.
              </p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
              <h3 className="font-semibold">Rupture conventionnelle apr&egrave;s le cong&eacute;</h3>
              <p className="mt-1">
                Possible apr&egrave;s la fin de la protection. D&eacute;lai de carence standard
                ({DELAI_ATTENTE}&nbsp;j + diff&eacute;r&eacute; CP + franchise supra-l&eacute;gale
                si applicable). SJR neutralis&eacute; si la RC intervient peu apr&egrave;s le
                cong&eacute;.
              </p>
            </div>
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              <h3 className="font-semibold">Fin de CDD non renouvel&eacute;e</h3>
              <p className="mt-1">
                Motif valable ARE automatiquement. La neutralisation s&apos;applique&nbsp;: le
                SJR est calcul&eacute; sur les p&eacute;riodes travaill&eacute;es effectives.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Calcul complet exemple */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul complet&nbsp;: CDI {EX2_ANCIENNETE_MOIS / 12}&nbsp;ans, cong&eacute; mat {EX2_CONGE_SEMAINES}&nbsp;semaines, {euros(EX_SALAIRE)}/mois
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Salaire brut mensuel</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(EX_SALAIRE)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Cong&eacute; maternit&eacute; neutralis&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2">{EX2_CONGE_SEMAINES}&nbsp;semaines ({EX2_CONGE_MOIS}&nbsp;mois)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Fen&ecirc;tre r&eacute;f&eacute;rence &eacute;largie</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.moisRefMoins55ans + EX2_CONGE_MOIS}&nbsp;mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Mois travaill&eacute;s effectifs</td>
                  <td className="border border-slate-200 px-4 py-2">{EX2_MOIS_TRAVAILLES}&nbsp;mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">SJR neutralis&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{euros(ex2Sjr)}/j</td>
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
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(ex2Aj)}/j</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE mensuelle</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(ex2AjMensuelle)}/mois</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">Dur&eacute;e indemnisation</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{ex2Duree}&nbsp;j ({Math.round(ex2Duree / 30)}&nbsp;mois)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Cumul ARE + AJPP */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Cumul ARE + AJPP (Allocation Journ&eacute;li&egrave;re de Pr&eacute;sence Parentale)
          </h2>
          <p className="mt-3">
            L&apos;AJPP est r&eacute;serv&eacute;e aux parents d&apos;un enfant gravement malade.
            Elle ne peut pas &ecirc;tre cumul&eacute;e avec l&apos;ARE si le b&eacute;n&eacute;ficiaire
            est indemnis&eacute; au titre du ch&ocirc;mage. En revanche, l&apos;allocation
            de base de la PAJE (Prestation d&apos;Accueil du Jeune Enfant) est cumulable avec
            l&apos;ARE sous conditions de ressources.
          </p>
        </section>

        {/* 7. Reprise emploi pendant ARE */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Reprise d&apos;emploi pendant l&apos;ARE apr&egrave;s maternit&eacute;
          </h2>
          <p className="mt-3">
            La reprise d&apos;un emploi (CDI, CDD, temps partiel) suspend l&apos;ARE. Les droits
            restants sont conserv&eacute;s et peuvent &ecirc;tre utilis&eacute;s en cas de nouvelle
            p&eacute;riode sans emploi (dans un d&eacute;lai de 3 ans sauf d&eacute;rogation).
            Le cumul ARE + activit&eacute; &agrave; temps partiel est possible avec une formule
            d&eacute;gressive.
          </p>
        </section>

        {/* 8. Tableau impact durée congé mat */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Impact de la dur&eacute;e du cong&eacute; sur le SJR et l&apos;ARE
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Cong&eacute; maternit&eacute;</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Fen&ecirc;tre r&eacute;f&eacute;rence</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">SJR ({euros(EX_SALAIRE)}/mois)</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">ARE mensuelle</th>
                </tr>
              </thead>
              <tbody>
                {CONGES_SEMAINES.map((semaines) => {
                  const moisConge = Math.round(semaines / 4.33)
                  const fenetreElargie = ARE_PARAMS.moisRefMoins55ans + moisConge
                  const sjr = Number((EX_SALAIRE / ARE_PARAMS.joursParMoisSJR).toFixed(2))
                  const f1 = Number((ARE_PARAMS.tauxFormule1 * sjr + ARE_PARAMS.partieFix).toFixed(2))
                  const f2 = Number((ARE_PARAMS.tauxFormule2 * sjr).toFixed(2))
                  const aj = Number(Math.max(Math.min(Math.max(f1, f2), ARE_PARAMS.plafondTauxSJR * sjr), ARE_PARAMS.allocationMinimale).toFixed(2))
                  const mensuelle = Number((aj * ARE_PARAMS.joursParMois).toFixed(2))
                  return (
                    <tr key={semaines} className="odd:bg-white even:bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium">{semaines}&nbsp;sem. (~{moisConge}&nbsp;mois)</td>
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
            Le SJR est pr&eacute;serv&eacute; quelle que soit la dur&eacute;e du cong&eacute; gr&acirc;ce &agrave; la neutralisation.
          </p>
        </section>

        {/* 9. FAQ */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">Questions fr&eacute;quentes</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900">Le cong&eacute; maternit&eacute; est-il inclus dans le calcul du ch&ocirc;mage&nbsp;?</h3>
              <p className="mt-1">
                Non. Il est neutralis&eacute;&nbsp;: exclu du SJR et la fen&ecirc;tre de r&eacute;f&eacute;rence
                est &eacute;largie d&apos;autant. Cela pr&eacute;serve le montant de l&apos;ARE au
                niveau du salaire r&eacute;el.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Peut-on &ecirc;tre licenci&eacute;e apr&egrave;s un cong&eacute; maternit&eacute;&nbsp;?</h3>
              <p className="mt-1">
                Non, pendant le cong&eacute; ni dans les 10&nbsp;semaines suivant le retour
                (art. L.1225-4). Sauf faute grave ou impossibilit&eacute; &eacute;trang&egrave;re
                &agrave; la grossesse.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Comment calculer son ARE si on a eu un cong&eacute; maternit&eacute;&nbsp;?</h3>
              <p className="mt-1">
                Le SJR est calcul&eacute; sur les salaires des p&eacute;riodes travaill&eacute;es
                effectives uniquement. Pour un salaire de {euros(EX_SALAIRE)}/mois&nbsp;:
                SJR = {euros(exSjr)}/j, ARE = {euros(exAj)}/j, soit {euros(exAjMensuelle)}/mois.
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
        <h2 className="text-xl font-bold text-blue-900">Calculez votre ARE apr&egrave;s un cong&eacute; maternit&eacute;</h2>
        <p className="mt-2 text-blue-700">Estimez votre allocation avec neutralisation automatique.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700">
            Calculateur ARE
          </Link>
          <Link href="/licenciement-economique" className="rounded-lg border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400">
            Licenciement &eacute;conomique
          </Link>
          <Link href="/rupture-conventionnelle-conge-parental" className="rounded-lg border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400">
            RC cong&eacute; parental
          </Link>
        </div>
      </div>
    </main>
  )
}
