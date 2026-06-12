import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Chomage RQTH 2025 : droits allonges et specificites travailleur handicape",
  description: "Travailleur handicape (RQTH) au chomage ? Duree ARE allongee, aides specifiques et calcul 2025. Guide complet avec exemples chiffres.",
  alternates: { canonical: 'https://www.monchomage.fr/chomage-rqth' },
}

// ── Exemple : travailleur RQTH, 2 200 €/mois, 4 ans ancienneté ──────────────
const EX_SALAIRE = 2_200
const EX_JOURS_REF = 12 * ARE_PARAMS.joursParMoisSJR // 12 mois de CDD (exemple)
const exSjr = Number((EX_SALAIRE / ARE_PARAMS.joursParMoisSJR).toFixed(2))
const exF1 = Number((ARE_PARAMS.tauxFormule1 * exSjr + ARE_PARAMS.partieFix).toFixed(2))
const exF2 = Number((ARE_PARAMS.tauxFormule2 * exSjr).toFixed(2))
const exAj = Number(
  Math.max(Math.min(Math.max(exF1, exF2), ARE_PARAMS.plafondTauxSJR * exSjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const exAjMensuelle = Number((exAj * ARE_PARAMS.joursParMois).toFixed(2))

// Durée standard vs RQTH (exemple : 12 mois de cotisations)
const exDureeSansRQTH = Math.min(EX_JOURS_REF, ARE_PARAMS.dureeMaxMoins50ansJours)
const exDureeAvecRQTHBrute = Math.round(exDureeSansRQTH * ARE_PARAMS.tauxAllongementRQTH)
const exDureeAvecRQTH = Math.min(exDureeAvecRQTHBrute, ARE_PARAMS.dureeMax55ansEtPlusJours)

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chomage RQTH', item: 'https://www.monchomage.fr/chomage-rqth' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Un travailleur RQTH touche-t-il le chomage plus longtemps ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui. Les beneficiaires de la Reconnaissance de la Qualite de Travailleur Handicape (RQTH) ont droit a une duree d'ARE allongee de ${Math.round((ARE_PARAMS.tauxAllongementRQTH - 1) * 100)} %. La duree calculee (1 jour cotise = 1 jour indemnise) est multipliee par ${ARE_PARAMS.tauxAllongementRQTH}, dans la limite de ${ARE_PARAMS.dureeMax55ansEtPlusJours} jours (${Math.round(ARE_PARAMS.dureeMax55ansEtPlusJours / 30)} mois) maximum.`,
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on cumuler ARE et AAH ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "L'ARE et l'Allocation aux Adultes Handicapes (AAH) peuvent etre cumulees sous conditions. Si le montant de l'ARE est superieur a l'AAH, l'AAH est suspendue. Si l'ARE est inferieure a l'AAH, la CAF peut verser un complement d'AAH correspondant a la difference. Il convient de declarer le versement de l'ARE a la CAF des l'ouverture des droits.",
      },
    },
    {
      '@type': 'Question',
      name: "La RQTH doit-elle etre mentionnee a Pole Emploi ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, pour beneficier des droits allonges et de l'accompagnement specifique. La declaration est volontaire mais indispensable pour l'allongement de la duree ARE. France Travail propose un suivi dedie via les conseillers specialises en insertion des travailleurs handicapes (TH). La RQTH n'a pas d'impact sur le montant de l'ARE.",
      },
    },
  ],
}

export default function ChomageRQTH() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}Ch&ocirc;mage RQTH
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Ch&ocirc;mage RQTH&nbsp;: droits all&ocirc;ng&eacute;s et sp&eacute;cificit&eacute;s 2025
      </h1>

      <div className="mt-8 space-y-10 text-slate-700">

        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            RQTH et ARE&nbsp;: un avantage m&eacute;connu
          </h2>
          <p className="mt-3">
            La Reconnaissance de la Qualit&eacute; de Travailleur Handicap&eacute; (RQTH) est
            attribu&eacute;e par la MDPH (Maison D&eacute;partementale des Personnes Handicap&eacute;es).
            Elle n&apos;impacte pas le montant de l&apos;ARE — calcul&eacute; de la m&ecirc;me
            mani&egrave;re que pour tout salari&eacute; — mais elle all&ocirc;nge significativement
            la <strong>dur&eacute;e d&apos;indemnisation</strong> de{' '}
            {Math.round((ARE_PARAMS.tauxAllongementRQTH - 1) * 100)}&nbsp;%. Elle ouvre
            &eacute;galement acc&egrave;s &agrave; un accompagnement d&eacute;di&eacute; et &agrave;
            des aides sp&eacute;cifiques au retour &agrave; l&apos;emploi.
          </p>
        </section>

        {/* 2. Durée allongée */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Dur&eacute;e ARE all&ocirc;ng&eacute;e&nbsp;: +{Math.round((ARE_PARAMS.tauxAllongementRQTH - 1) * 100)}&nbsp;% avec RQTH
          </h2>
          <p className="mt-3">
            La dur&eacute;e calcul&eacute;e (1 jour cotis&eacute; = 1 jour indemnis&eacute;) est
            multipli&eacute;e par <strong>{ARE_PARAMS.tauxAllongementRQTH}</strong> pour les
            b&eacute;n&eacute;ficiaires de la RQTH, dans la limite de{' '}
            {ARE_PARAMS.dureeMax55ansEtPlusJours}&nbsp;jours ({Math.round(ARE_PARAMS.dureeMax55ansEtPlusJours / 30)}&nbsp;mois).
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Dur&eacute;e cotis&eacute;e</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Dur&eacute;e sans RQTH</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Dur&eacute;e avec RQTH (x{ARE_PARAMS.tauxAllongementRQTH})</th>
                </tr>
              </thead>
              <tbody>
                {[6, 12, 18, 24].map((moisCotises) => {
                  const jC = moisCotises * ARE_PARAMS.joursParMoisSJR
                  const sansCap = Math.min(jC, ARE_PARAMS.dureeMaxMoins50ansJours)
                  const avecBrut = Math.round(sansCap * ARE_PARAMS.tauxAllongementRQTH)
                  const avecCap = Math.min(avecBrut, ARE_PARAMS.dureeMax55ansEtPlusJours)
                  return (
                    <tr key={moisCotises} className="odd:bg-white even:bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium">{moisCotises}&nbsp;mois</td>
                      <td className="border border-slate-200 px-4 py-2">{sansCap}&nbsp;j ({Math.round(sansCap / 30)}&nbsp;mois)</td>
                      <td className="border border-slate-200 px-4 py-2 font-semibold text-purple-700">{avecCap}&nbsp;j ({Math.round(avecCap / 30)}&nbsp;mois)</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Conditions */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Conditions d&apos;acc&egrave;s &agrave; l&apos;ARE
          </h2>
          <p className="mt-3">
            Les conditions sont identiques au droit commun&nbsp;:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li><strong>130&nbsp;jours (910&nbsp;heures)</strong> travaill&eacute;s sur les {ARE_PARAMS.moisRefMoins55ans}&nbsp;derniers mois ({ARE_PARAMS.moisRefPlus55ans}&nbsp;mois pour les 55+).</li>
            <li>Perte involontaire d&apos;emploi (fin de CDD, licenciement, RC, etc.).</li>
            <li>Inscription &agrave; France Travail dans les 12&nbsp;mois.</li>
            <li>Recherche active d&apos;emploi, aptitude au travail, r&eacute;sidence en France.</li>
            <li><strong>D&eacute;clarer la RQTH</strong> &agrave; France Travail pour b&eacute;n&eacute;ficier de l&apos;allongement.</li>
          </ul>
        </section>

        {/* 4. Calcul SJR et AJ */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul ARE RQTH&nbsp;: exemple {euros(EX_SALAIRE)}/mois, CDD 12 mois
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Salaire brut mensuel</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(EX_SALAIRE)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">SJR = {euros(EX_SALAIRE)} &divide; {ARE_PARAMS.joursParMoisSJR}</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{euros(exSjr)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule&nbsp;1</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exF1)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule&nbsp;2</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exF2)}/j</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-purple-900">ARE journali&egrave;re (identique RQTH ou non)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-purple-900">{euros(exAj)}/j</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-purple-900">ARE mensuelle</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-purple-900">{euros(exAjMensuelle)}/mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Dur&eacute;e sans RQTH</td>
                  <td className="border border-slate-200 px-4 py-2">{exDureeSansRQTH}&nbsp;j</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-purple-900">Dur&eacute;e avec RQTH (x{ARE_PARAMS.tauxAllongementRQTH})</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-purple-900">{exDureeAvecRQTH}&nbsp;j</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Aides complémentaires */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Aides compl&eacute;mentaires RQTH pendant le ch&ocirc;mage
          </h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
              <h3 className="font-semibold text-purple-900">AAH (Allocation aux Adultes Handicap&eacute;s)</h3>
              <p className="mt-1 text-sm text-purple-800">
                Peut &ecirc;tre cumul&eacute;e avec l&apos;ARE sous conditions. Si l&apos;ARE est
                sup&eacute;rieure &agrave; l&apos;AAH, cette derni&egrave;re est suspendue. Si
                l&apos;ARE est inf&eacute;rieure, la CAF peut verser un compl&eacute;ment. D&eacute;clarer
                l&apos;ARE &agrave; la CAF d&egrave;s l&apos;ouverture des droits.
              </p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <h3 className="font-semibold text-blue-900">AGEFIPH — Aides &agrave; l&apos;emploi</h3>
              <p className="mt-1 text-sm text-blue-800">
                L&apos;AGEFIPH finance des aides &agrave; la formation, &agrave; la mobilit&eacute;,
                aux &eacute;quipements sp&eacute;cifiques et &agrave; l&apos;am&eacute;nagement du
                poste de travail pour le prochain emploi. Renseignements aupr&egrave;s de France Travail.
              </p>
            </div>
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <h3 className="font-semibold text-green-900">Cap Emploi</h3>
              <p className="mt-1 text-sm text-green-800">
                R&eacute;seau sp&eacute;cialis&eacute; dans le placement et le maintien en emploi des
                travailleurs handicap&eacute;s. Accompagnement gratuit, compl&eacute;mentaire &agrave;
                France Travail, pour aider &agrave; trouver un emploi adapt&eacute;.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Maintien RQTH pendant chômage */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Maintien de la RQTH pendant le ch&ocirc;mage
          </h2>
          <p className="mt-3">
            La RQTH est attribu&eacute;e pour une dur&eacute;e d&eacute;termin&eacute;e (en g&eacute;n&eacute;ral
            1 &agrave; 5 ans). Un renouvellement doit &ecirc;tre demand&eacute; avant l&apos;expiration,
            y compris pendant une p&eacute;riode de ch&ocirc;mage. La MDPH (Maison D&eacute;partementale
            des Personnes Handicap&eacute;es) instruit le dossier, ind&eacute;pendamment de la situation
            d&apos;emploi.
          </p>
        </section>

        {/* 7. RC RQTH */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Rupture conventionnelle RQTH
          </h2>
          <p className="mt-3">
            La RQTH n&apos;a pas d&apos;impact sur les r&egrave;gles de la rupture conventionnelle.
            Les conditions (d&eacute;lai de r&eacute;flexion, homologation, indemnit&eacute; l&eacute;gale)
            sont identiques. En revanche, apr&egrave;s une RC, les droits ARE b&eacute;n&eacute;ficient
            de l&apos;allongement RQTH : la dur&eacute;e est major&eacute;e de{' '}
            {Math.round((ARE_PARAMS.tauxAllongementRQTH - 1) * 100)}&nbsp;%.
          </p>
        </section>

        {/* 8. Licenciement pour inaptitude RQTH */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Licenciement pour inaptitude RQTH
          </h2>
          <p className="mt-3">
            Le licenciement pour inaptitude (apr&egrave;s avis du m&eacute;decin du travail) est
            un motif valable d&apos;ARE. En cas d&apos;inaptitude d&apos;origine professionnelle
            (accident du travail, maladie professionnelle), l&apos;indemnit&eacute; de licenciement
            est doubl&eacute;e (art. L.1226-14). Ces indemnit&eacute;s suppl&eacute;mentaires peuvent
            g&eacute;n&eacute;rer une franchise, plafonn&eacute;e selon le motif.
          </p>
        </section>

        {/* 9. Comparatif */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Comparatif RQTH vs droit commun
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Avec RQTH</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Sans RQTH</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Montant ARE</td>
                  <td className="border border-slate-200 px-4 py-2">Identique</td>
                  <td className="border border-slate-200 px-4 py-2">Identique</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Dur&eacute;e ARE</td>
                  <td className="border border-slate-200 px-4 py-2 text-purple-700 font-medium">+{Math.round((ARE_PARAMS.tauxAllongementRQTH - 1) * 100)}&nbsp;% (plafond {Math.round(ARE_PARAMS.dureeMax55ansEtPlusJours / 30)}&nbsp;mois)</td>
                  <td className="border border-slate-200 px-4 py-2">Droit commun</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Accompagnement</td>
                  <td className="border border-slate-200 px-4 py-2 text-purple-700 font-medium">Cap Emploi + conseiller TH d&eacute;di&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2">Conseiller France Travail</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Aides financi&egrave;res</td>
                  <td className="border border-slate-200 px-4 py-2 text-purple-700 font-medium">AGEFIPH + AAH (sous cond.)</td>
                  <td className="border border-slate-200 px-4 py-2">ARE uniquement</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Conditions ARE</td>
                  <td className="border border-slate-200 px-4 py-2">Identiques (130 j / 910 h)</td>
                  <td className="border border-slate-200 px-4 py-2">Identiques</td>
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
              <h3 className="font-semibold text-slate-900">Un travailleur RQTH touche-t-il le ch&ocirc;mage plus longtemps&nbsp;?</h3>
              <p className="mt-1">
                Oui. La dur&eacute;e calcul&eacute;e est major&eacute;e de{' '}
                {Math.round((ARE_PARAMS.tauxAllongementRQTH - 1) * 100)}&nbsp;% (multipli&eacute;e
                par {ARE_PARAMS.tauxAllongementRQTH}), dans la limite de{' '}
                {ARE_PARAMS.dureeMax55ansEtPlusJours}&nbsp;j ({Math.round(ARE_PARAMS.dureeMax55ansEtPlusJours / 30)}&nbsp;mois).
                Le montant est identique au droit commun.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Peut-on cumuler ARE et AAH&nbsp;?</h3>
              <p className="mt-1">
                Oui, sous conditions. Si l&apos;ARE est sup&eacute;rieure &agrave; l&apos;AAH,
                l&apos;AAH est suspendue. Si l&apos;ARE est inf&eacute;rieure, la CAF peut verser
                un compl&eacute;ment. D&eacute;claration obligatoire &agrave; la CAF.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">La RQTH doit-elle &ecirc;tre mention&eacute;e &agrave; France Travail&nbsp;?</h3>
              <p className="mt-1">
                Oui, pour b&eacute;n&eacute;ficier des droits all&ocirc;ng&eacute;s et de
                l&apos;accompagnement d&eacute;di&eacute;. La d&eacute;claration est volontaire
                mais indispensable pour l&apos;allongement de la dur&eacute;e d&apos;ARE.
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="mt-12 rounded-2xl border border-purple-200 bg-purple-50 p-6 text-center">
        <h2 className="text-xl font-bold text-purple-900">Calculez votre ARE RQTH</h2>
        <p className="mt-2 text-purple-700">Estimez votre allocation et votre dur&eacute;e all&ocirc;ng&eacute;e avec votre salaire.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-purple-700">
            Calculateur ARE
          </Link>
          <Link href="/fin-de-cdd-rqth" className="rounded-lg border border-purple-300 bg-white px-6 py-3 text-sm font-semibold text-purple-700 hover:border-purple-400">
            Fin de CDD RQTH
          </Link>
        </div>
      </div>
    </main>
  )
}
