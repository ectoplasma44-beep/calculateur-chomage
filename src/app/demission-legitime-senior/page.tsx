import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Démission légitime senior 2026 : ARE après 55 ans possible",
  description: "Senior qui démissionne pour motif légitime ? ARE maintenue jusqu'à 36 mois. Cas reconnus, dossier et calcul expliqués avec exemples.",
  alternates: { canonical: 'https://www.monchomage.fr/demission-legitime-senior' },
}

// ── Exemples : senior 3 000 €/mois ───────────────────────────────────────────
const EX_SALAIRE = 3_000

const exSjr = Number((EX_SALAIRE / ARE_PARAMS.joursParMoisSJR).toFixed(2))
const exF1 = Number((ARE_PARAMS.tauxFormule1 * exSjr + ARE_PARAMS.partieFix).toFixed(2))
const exF2 = Number((ARE_PARAMS.tauxFormule2 * exSjr).toFixed(2))
const exAjBrute = Math.max(exF1, exF2)
const exAj = Number(
  Math.max(Math.min(exAjBrute, ARE_PARAMS.plafondTauxSJR * exSjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const exAjMensuelle = Number((exAj * ARE_PARAMS.joursParMois).toFixed(2))

// Durée selon l'âge
const dureeJours52 = ARE_PARAMS.dureeMax50ansEtPlusJours
const dureeMois52 = Math.round(dureeJours52 / ARE_PARAMS.joursParMois)
const dureeJours57 = ARE_PARAMS.dureeMax55ansEtPlusJours
const dureeMois57 = Math.round(dureeJours57 / ARE_PARAMS.joursParMois)

const totalAre52 = Number((exAjMensuelle * dureeMois52).toFixed(2))
const totalAre57 = Number((exAjMensuelle * dureeMois57).toFixed(2))

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chômage seniors', item: 'https://www.monchomage.fr/chomage-seniors' },
    { '@type': 'ListItem', position: 3, name: 'Démission légitime senior', item: 'https://www.monchomage.fr/demission-legitime-senior' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Quels sont les motifs de démission légitime reconnus pour un senior ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Les motifs reconnus sont les mêmes pour tous les salariés : suivi du conjoint pour motif professionnel, victime de violences conjugales, non-paiement du salaire par l'employeur, modification unilatérale du contrat de travail, reconversion professionnelle validée par le CEP (loi 2019). La qualité de senior n'ouvre pas de motifs supplémentaires, mais allonge la durée d'indemnisation à 36 mois dès 55 ans.",
      },
    },
    {
      '@type': 'Question',
      name: "Un senior qui démissionne pour suivre son conjoint a-t-il droit à l'ARE ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Le suivi du conjoint (ou partenaire pacsé) pour motif professionnel est un motif légitime reconnu par la réglementation Unédic. Le dossier doit être déposé dans les 2 mois suivant la démission. Il faut justifier que le déménagement est lié à une nouvelle activité professionnelle du conjoint (mutation, nouvel emploi, création d'entreprise). Un senior de 55 ans dans cette situation peut prétendre à 36 mois d'ARE.",
      },
    },
    {
      '@type': 'Question',
      name: "Combien touche un senior de 57 ans en ARE après une démission légitime ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Pour un senior de 57 ans avec un salaire de ${euros(EX_SALAIRE)}/mois, le SJR est de ${euros(exSjr)}/j et l'ARE quotidienne de ${euros(exAj)}/j. La mensualité est de ${euros(exAjMensuelle)}/mois, stable sur ${dureeMois57} mois (pas de dégressivité à partir de ${ARE_PARAMS.ageLimiteDegressivite} ans). Le total sur la période est de ${euros(totalAre57)}.`,
      },
    },
  ],
}

export default function PageDemissionLegitimeSenior() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="mx-auto max-w-3xl px-4 py-8 space-y-10">
        <nav className="text-sm text-slate-500">
          <Link href="/" className="hover:underline">Accueil</Link>
          <span className="mx-2">&rsaquo;</span>
          <Link href="/chomage-seniors" className="hover:underline">Ch&ocirc;mage seniors</Link>
          <span className="mx-2">&rsaquo;</span>
          <span>D&eacute;mission l&eacute;gitime senior</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900">
          D&eacute;mission l&eacute;gitime senior&nbsp;: ARE {dureeMois57}&nbsp;mois et cas reconnus 2026
        </h1>

        {/* 1. Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">D&eacute;mission + motif l&eacute;gitime + senior&nbsp;: un cumul avantageux</h2>
          <p className="text-slate-700">
            En principe, une d&eacute;mission ne donne pas droit &agrave; l&apos;ARE. Mais si le motif
            est reconnu comme l&eacute;gitime par la r&eacute;glementation Unédic, les droits
            &agrave; l&apos;ARE sont int&eacute;gralement maintenus. Pour un senior, cet avantage
            est amplifi&eacute;&nbsp;: la dur&eacute;e d&apos;indemnisation atteint jusqu&apos;&agrave; <strong>{dureeMois57}&nbsp;mois</strong>
            {' '}apr&egrave;s {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans — sans d&eacute;gressivit&eacute;.
          </p>
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
            <strong>Condition cl&eacute;&nbsp;:</strong> Le dossier doit &ecirc;tre d&eacute;pos&eacute; &agrave; France Travail
            dans les <strong>2&nbsp;mois suivant la d&eacute;mission</strong>. Pass&eacute; ce d&eacute;lai, la demande sera refus&eacute;e.
          </div>
        </section>

        {/* 2. Motifs légitimes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Motifs l&eacute;gitimes reconnus (liste exhaustive Unédic)</h2>
          <div className="space-y-3">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="font-semibold text-slate-900">Suivi du conjoint</h3>
              <p className="mt-1 text-sm text-slate-700">
                D&eacute;m&eacute;nagement contraint par une nouvelle activit&eacute; professionnelle
                du conjoint ou partenaire pacsé (mutation, cr&eacute;ation entreprise, nouvel emploi).
                Justificatifs&nbsp;: contrat de travail conjoint + preuve de d&eacute;m&eacute;nagement.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="font-semibold text-slate-900">Violences conjugales</h3>
              <p className="mt-1 text-sm text-slate-700">
                Victime de violences au sein du couple ayant n&eacute;cessit&eacute; un changement
                de r&eacute;sidence et une d&eacute;mission. Justificatif&nbsp;: d&eacute;p&ocirc;t de plainte ou
                ordonnance de protection.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="font-semibold text-slate-900">Non-paiement du salaire</h3>
              <p className="mt-1 text-sm text-slate-700">
                Salaire non vers&eacute; par l&apos;employeur. Justificatif&nbsp;: mise en demeure rest&eacute;e
                sans r&eacute;ponse, bulletins de paie ou attestation de l&apos;inspecteur du travail.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="font-semibold text-slate-900">Modification unilat&eacute;rale du contrat</h3>
              <p className="mt-1 text-sm text-slate-700">
                L&apos;employeur a modifi&eacute; un &eacute;l&eacute;ment essentiel du contrat sans accord
                (poste, salaire, lieu de travail). La d&eacute;mission fait suite &agrave; un refus
                &eacute;crit et justifi&eacute; de cette modification.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h3 className="font-semibold text-slate-900">Reconversion professionnelle (loi 2019)</h3>
              <p className="mt-1 text-sm text-slate-700">
                D&eacute;mission pour suivre une formation qualifiante ou cr&eacute;er une entreprise,
                apr&egrave;s validation par le Conseil en &Eacute;volution Professionnelle (CEP).
                Justificatif&nbsp;: attestation CEP + projet valid&eacute;. Contr&ocirc;le &agrave; 6&nbsp;mois
                par France Travail.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Spécificité senior */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Sp&eacute;cificit&eacute; senior&nbsp;: dur&eacute;e allonge selon l&apos;&acirc;ge</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Tranche d&apos;&acirc;ge</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Dur&eacute;e maximale</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">D&eacute;gressivit&eacute;</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2">Moins de 50&nbsp;ans</td>
                  <td className="border border-slate-200 px-4 py-2">{Math.round(ARE_PARAMS.dureeMaxMoins50ansJours / ARE_PARAMS.joursParMois)}&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2">Oui (si AJ &gt; {euros(ARE_PARAMS.seuilDegressiviteAJ)}/j)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2">50&nbsp;ans et plus</td>
                  <td className="border border-slate-200 px-4 py-2">{dureeMois52}&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2">Oui (si AJ &gt; {euros(ARE_PARAMS.seuilDegressiviteAJ)}/j)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2">53&ndash;54&nbsp;ans</td>
                  <td className="border border-slate-200 px-4 py-2">{Math.round(ARE_PARAMS.dureeMax53a54ansJours / ARE_PARAMS.joursParMois)}&nbsp;mois</td>
                  <td className="border border-slate-200 px-4 py-2">Oui (si AJ &gt; {euros(ARE_PARAMS.seuilDegressiviteAJ)}/j)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50 font-bold text-blue-800">
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans et plus</td>
                  <td className="border border-slate-200 px-4 py-2">{dureeMois57}&nbsp;mois ← maximum</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Non exon&eacute;r&eacute;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Calcul SJR comparatif 52 ans vs 57 ans */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul ARE&nbsp;: {euros(EX_SALAIRE)}/mois — comparaison 52&nbsp;ans vs 57&nbsp;ans
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Calcul</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">52&nbsp;ans</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">57&nbsp;ans</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">SJR</td>
                  <td className="border border-slate-200 px-4 py-2" colSpan={2}>{euros(exSjr)}/j (identique)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">AJ quotidienne</td>
                  <td className="border border-slate-200 px-4 py-2" colSpan={2}>{euros(exAj)}/j (identique)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">ARE mensuelle</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-700">{euros(exAjMensuelle)}/mois</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-700">{euros(exAjMensuelle)}/mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">D&eacute;gressivit&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2">Non (AJ &lt; {euros(ARE_PARAMS.seuilDegressiviteAJ)}/j)</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Exon&eacute;r&eacute; ({ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans+)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Dur&eacute;e maximale</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold">{dureeMois52}&nbsp;mois ({dureeJours52}&nbsp;j)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-green-700">{dureeMois57}&nbsp;mois ({dureeJours57}&nbsp;j)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Total ARE</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold">{euros(totalAre52)}</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-green-700">{euros(totalAre57)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 text-sm">
            La diff&eacute;rence entre 52 et 57&nbsp;ans repr&eacute;sente {euros(totalAre57 - totalAre52)} d&apos;ARE
            suppl&eacute;mentaires — un enjeu consid&eacute;rable dans la strat&eacute;gie de fin de carri&egrave;re.
          </p>
        </section>

        {/* 5. Dossier */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Dossier &agrave; constituer</h2>
          <p className="text-slate-700">
            La reconnaissance du motif l&eacute;gitime n&apos;est pas automatique — France Travail instruit
            chaque dossier. Les &eacute;l&eacute;ments indispensables&nbsp;:
          </p>
          <ul className="ml-4 space-y-2 text-slate-700 list-disc">
            <li>Lettre de d&eacute;mission dat&eacute;e + accus&eacute; de r&eacute;ception</li>
            <li>Justificatif du motif l&eacute;gitime (selon le cas&nbsp;: mutation conjoint, plainte, courriers salaire...)</li>
            <li>Bulletins de paie des 24 derniers mois</li>
            <li>Attestation employeur (Cerfa n&deg;&nbsp;13909)</li>
            <li>Pi&egrave;ce d&apos;identit&eacute; + RIB</li>
          </ul>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>D&eacute;lai impératif&nbsp;:</strong> Le dossier doit &ecirc;tre d&eacute;pos&eacute; &agrave; France Travail dans les
            <strong> 2&nbsp;mois suivant la d&eacute;mission</strong>. Au-del&agrave;, le droit est prescrit.
          </div>
        </section>

        {/* 6. Délai de carence */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">D&eacute;lai de carence apr&egrave;s d&eacute;mission l&eacute;gitime</h2>
          <p className="text-slate-700">
            Contrairement &agrave; un licenciement ou une RC, la d&eacute;mission n&apos;entra&icirc;ne pas
            de <em>diff&eacute;r&eacute; sp&eacute;cifique</em> li&eacute; aux indemni&eacute;s (puisque vous ne
            percevez pas d&apos;indemni&eacute; de licenciement). Seul s&apos;applique le d&eacute;lai
            de carence au titre des cong&eacute;s pay&eacute;s non pris (quelques jours &agrave; quelques
            semaines selon votre solde de CP).
          </p>
          <p className="text-slate-700">
            Le d&eacute;lai d&apos;attente de 7&nbsp;jours s&apos;applique apr&egrave;s le d&eacute;lai CP, comme pour
            tout nouveau demandeur d&apos;emploi.
          </p>
        </section>

        {/* 7. Recours si refus */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Recours si France Travail refuse le motif l&eacute;gitime</h2>
          <p className="text-slate-700">
            En cas de refus, deux niveaux de recours sont disponibles&nbsp;:
          </p>
          <ol className="ml-4 space-y-3 text-slate-700 list-decimal">
            <li>
              <strong>Commission de recours amiable (CRA)</strong>&nbsp;: saisine dans les
              2&nbsp;mois suivant la d&eacute;cision de refus. Instruction en 4 &agrave; 6&nbsp;semaines.
              Taux de succ&egrave;s partiel&nbsp;: environ 30&nbsp;% des dossiers sont r&eacute;examin&eacute;s
              favorablement apr&egrave;s apport de pi&egrave;ces compl&eacute;mentaires.
            </li>
            <li>
              <strong>Recours contentieux</strong>&nbsp;: en cas d&apos;&eacute;chec de la CRA, saisine du
              tribunal judiciaire comp&eacute;tent. D&eacute;lai&nbsp;: 2 ans &agrave; compter de la d&eacute;cision
              contest&eacute;e. Un avocat sp&eacute;cialis&eacute; en droit du travail est conseill&eacute; pour
              ce stade.
            </li>
          </ol>
        </section>

        {/* 8. Comparatif */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Comparatif d&eacute;mission l&eacute;gitime vs RC vs abandon de poste (senior)</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-100">
                <tr>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">D&eacute;mission l&eacute;gitime</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">RC</th>
                  <th className="border border-slate-200 px-4 py-2 text-left font-semibold text-slate-700">Abandon de poste</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">ARE</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">&check; Si motif valid&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">&check; Garantie</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">&times; Tr&egrave;s risqu&eacute;</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Indemni&eacute;s</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">&times; Aucune</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">&check; ISRC minimum</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">&times; Aucune</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Diff&eacute;r&eacute; ARE</td>
                  <td className="border border-slate-200 px-4 py-2">CP uniquement</td>
                  <td className="border border-slate-200 px-4 py-2">CP + diff&eacute;r&eacute; sp&eacute;cifique</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">Sans ARE</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Risque</td>
                  <td className="border border-slate-200 px-4 py-2 text-amber-700">Moyen (instruction)</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700">Minimal</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">Tr&egrave;s &eacute;lev&eacute;</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Impact retraite</td>
                  <td className="border border-slate-200 px-4 py-2">{Math.floor(dureeJours57 / 50)}&nbsp;trimestres (57&nbsp;ans)</td>
                  <td className="border border-slate-200 px-4 py-2">{Math.floor(dureeJours57 / 50)}&nbsp;trimestres (57&nbsp;ans)</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">0&nbsp;trimestre</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 9. FAQ */}
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

        {/* 10. CTA */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Calculer votre ARE en ligne</h2>
          <p className="text-slate-600 text-sm">
            Estimez votre indemnisation exacte selon votre &acirc;ge et votre salaire.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Calculateur ARE
            </Link>
            <Link href="/chomage-seniors" className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
              Ch&ocirc;mage seniors
            </Link>
            <Link href="/demission-legitime" className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
              D&eacute;mission l&eacute;gitime
            </Link>
            <Link href="/rupture-conventionnelle-senior" className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">
              RC senior
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
