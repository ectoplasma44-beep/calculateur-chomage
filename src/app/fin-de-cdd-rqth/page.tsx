import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Fin de CDD RQTH 2026 : duree ARE allongee automatiquement",
  description: "CDD termine avec une RQTH ? Duree ARE allongee de 25 %, aides AGEFIPH et demarches Pole Emploi expliquees. Verifiez vos droits.",
  alternates: { canonical: 'https://www.monchomage.fr/fin-de-cdd-rqth' },
}

const DELAI_ATTENTE = 7

// ── Exemple : travailleur RQTH, 1 900 €/mois, CDD 12 mois ───────────────────
const EX_SALAIRE = 1_900
const EX_MOIS = 12
const EX_JOURS = EX_MOIS * ARE_PARAMS.joursParMoisSJR

const exSjr = Number((EX_SALAIRE / ARE_PARAMS.joursParMoisSJR).toFixed(2))
const exF1 = Number((ARE_PARAMS.tauxFormule1 * exSjr + ARE_PARAMS.partieFix).toFixed(2))
const exF2 = Number((ARE_PARAMS.tauxFormule2 * exSjr).toFixed(2))
const exAj = Number(
  Math.max(Math.min(Math.max(exF1, exF2), ARE_PARAMS.plafondTauxSJR * exSjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const exAjMensuelle = Number((exAj * ARE_PARAMS.joursParMois).toFixed(2))

const exDureeSansRQTH = Math.min(EX_JOURS, ARE_PARAMS.dureeMaxMoins50ansJours)
const exDureeAvecRQTH = Math.min(
  Math.round(exDureeSansRQTH * ARE_PARAMS.tauxAllongementRQTH),
  ARE_PARAMS.dureeMax55ansEtPlusJours
)

// ── Tableau durée CDD 6 / 12 / 18 mois avec et sans RQTH ────────────────────
const DUREES_CDD = [6, 12, 18]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chomage RQTH', item: 'https://www.monchomage.fr/chomage-rqth' },
    { '@type': 'ListItem', position: 3, name: 'Fin de CDD RQTH', item: 'https://www.monchomage.fr/fin-de-cdd-rqth' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Un CDD RQTH donne-t-il droit a plus de chomage ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui. Le montant de l'ARE est identique, mais la duree est majoree de ${Math.round((ARE_PARAMS.tauxAllongementRQTH - 1) * 100)} % pour les beneficiaires de la RQTH. Pour un CDD de ${EX_MOIS} mois, la duree passe de ${exDureeSansRQTH} jours (sans RQTH) a ${exDureeAvecRQTH} jours (avec RQTH).`,
      },
    },
    {
      '@type': 'Question',
      name: "Faut-il declarer sa RQTH a Pole Emploi ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. La declaration de la RQTH a France Travail est volontaire mais indispensable pour beneficier de l'allongement de la duree d'ARE et de l'accompagnement specifique (conseiller TH dedie, Cap Emploi). La RQTH n'apparait pas dans le dossier de demande d'emploi visible des employeurs.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on etre licencie a cause de sa RQTH ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Le licenciement fonde sur le handicap est illicite et constitue une discrimination au sens de l'article L.1132-1 du Code du travail. Si un CDD n'est pas renouvelee pour un motif lie au handicap, le salarie peut saisir le Conseil de Prud'hommes ou le Defenseur des droits. Les dommages-interets accordes peuvent etre substantiels.",
      },
    },
  ],
}

export default function FinDeCDDRQTH() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}
        <Link href="/chomage-rqth" className="hover:underline">Ch&ocirc;mage RQTH</Link>
        {' '}&rsaquo;{' '}Fin de CDD RQTH
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Fin de CDD RQTH&nbsp;: ARE, dur&eacute;e all&ocirc;ng&eacute;e et droits 2026
      </h1>

      <div className="mt-8 space-y-10 text-slate-700">

        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Fin de CDD&nbsp;: la situation la plus fr&eacute;quente pour les travailleurs RQTH
          </h2>
          <p className="mt-3">
            Les travailleurs handicap&eacute;s (b&eacute;n&eacute;ficiaires RQTH) sont
            proportionnellement plus souvent en CDD que l&apos;ensemble de la population active.
            La fin d&apos;un CDD ouvre les m&ecirc;mes droits ARE que pour tout salari&eacute;,
            avec un avantage notable&nbsp;: la dur&eacute;e d&apos;indemnisation est major&eacute;e
            de {Math.round((ARE_PARAMS.tauxAllongementRQTH - 1) * 100)}&nbsp;% (multiplicateur de{' '}
            {ARE_PARAMS.tauxAllongementRQTH}).
          </p>
        </section>

        {/* 2. Conditions */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Conditions d&apos;acc&egrave;s &agrave; l&apos;ARE
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li><strong>Identiques au droit commun&nbsp;:</strong> 130&nbsp;jours (910&nbsp;heures) sur les {ARE_PARAMS.moisRefMoins55ans}&nbsp;derniers mois.</li>
            <li>Fin de CDD = perte involontaire d&apos;emploi ouvrant droit automatiquement &agrave; l&apos;ARE.</li>
            <li>Inscription &agrave; France Travail dans les 12&nbsp;mois.</li>
            <li><strong>D&eacute;clarer la RQTH</strong> &agrave; France Travail pour b&eacute;n&eacute;ficier de l&apos;allongement de dur&eacute;e.</li>
          </ul>
        </section>

        {/* 3. SJR et calcul ARE */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul ARE RQTH&nbsp;: {euros(EX_SALAIRE)}/mois, CDD {EX_MOIS}&nbsp;mois
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">SJR = {euros(EX_SALAIRE)} &divide; {ARE_PARAMS.joursParMoisSJR}</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{euros(exSjr)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule&nbsp;1&nbsp;: {ARE_PARAMS.tauxFormule1} &times; SJR + {euros(ARE_PARAMS.partieFix)}</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exF1)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule&nbsp;2&nbsp;: {ARE_PARAMS.tauxFormule2} &times; SJR (retenue)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exF2)}/j</td>
                </tr>
                <tr className="bg-purple-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-purple-900">ARE journali&egrave;re</td>
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
                  <td className="border border-slate-200 px-4 py-2 font-bold text-purple-900">{exDureeAvecRQTH}&nbsp;j (+{exDureeAvecRQTH - exDureeSansRQTH}&nbsp;j)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Tableau comparatif CDD selon durée */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Dur&eacute;e d&apos;ARE selon la dur&eacute;e du CDD&nbsp;: avec et sans RQTH
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Dur&eacute;e CDD</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Jours</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">ARE sans RQTH</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">ARE avec RQTH</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Gain</th>
                </tr>
              </thead>
              <tbody>
                {DUREES_CDD.map((mois) => {
                  const j = mois * ARE_PARAMS.joursParMoisSJR
                  const sans = Math.min(j, ARE_PARAMS.dureeMaxMoins50ansJours)
                  const avecBrut = Math.round(sans * ARE_PARAMS.tauxAllongementRQTH)
                  const avec = Math.min(avecBrut, ARE_PARAMS.dureeMax55ansEtPlusJours)
                  return (
                    <tr key={mois} className="odd:bg-white even:bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium">{mois}&nbsp;mois</td>
                      <td className="border border-slate-200 px-4 py-2">{j}&nbsp;j</td>
                      <td className="border border-slate-200 px-4 py-2">{sans}&nbsp;j</td>
                      <td className="border border-slate-200 px-4 py-2 font-semibold text-purple-700">{avec}&nbsp;j</td>
                      <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">+{avec - sans}&nbsp;j</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* 5. Délai de carence */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            D&eacute;lai de carence apr&egrave;s une fin de CDD
          </h2>
          <p className="mt-3">
            Identique au droit commun&nbsp;: d&eacute;lai d&apos;attente de {DELAI_ATTENTE}&nbsp;jours
            + diff&eacute;r&eacute; CP (variable selon les cong&eacute;s pay&eacute;s non pris).
            La RQTH n&apos;a pas d&apos;impact sur le d&eacute;lai de carence.
          </p>
        </section>

        {/* 6. Démarches spécifiques */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            D&eacute;marches sp&eacute;cifiques RQTH &agrave; France Travail
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>Mentionner la RQTH lors de l&apos;inscription</strong> pour &ecirc;tre
              orient&eacute; vers un conseiller sp&eacute;cialis&eacute; TH (Travailleur Handicap&eacute;).
            </li>
            <li>
              <strong>Fournir l&apos;attestation RQTH</strong> en cours de validit&eacute; (d&eacute;livr&eacute;e
              par la MDPH).
            </li>
            <li>
              Demander l&apos;orientation vers <strong>Cap Emploi</strong> pour un accompagnement
              d&eacute;di&eacute; au placement des travailleurs handicap&eacute;s.
            </li>
            <li>
              V&eacute;rifier les aides AGEFIPH disponibles pour la formation et la reprise d&apos;emploi.
            </li>
          </ul>
        </section>

        {/* 7. Aides au retour à l'emploi */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Aides au retour &agrave; l&apos;emploi RQTH
          </h2>
          <div className="mt-3 space-y-3">
            <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 text-sm text-purple-800">
              <strong>AGEFIPH&nbsp;:</strong> aides &agrave; la formation, &agrave; la mobilit&eacute;
              et &agrave; l&apos;am&eacute;nagement du poste de travail. Montants variables selon
              le projet professionnel. Renseignements sur agefiph.fr.
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
              <strong>Cap Emploi&nbsp;:</strong> r&eacute;seau de services sp&eacute;cialis&eacute;s
              gratuits pour les demandeurs d&apos;emploi TH. Accompagnement &agrave; la recherche
              d&apos;emploi, mise en relation avec des employeurs sensibilis&eacute;s au handicap,
              suivi personnalis&eacute;.
            </div>
          </div>
        </section>

        {/* 8. CDD non renouvelé pour motif lié au handicap */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            CDD non renouvel&eacute; pour motif li&eacute; au handicap
          </h2>
          <p className="mt-3">
            Le refus de renouveler un CDD en raison du handicap du salari&eacute; constitue une
            discrimination ill&eacute;gale (art. L.1132-1 C.trav.). Si vous suspectez un tel
            motif, vous pouvez saisir&nbsp;:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Le <strong>D&eacute;fenseur des droits</strong> (d&eacute;marche gratuite, confidentielle).</li>
            <li>Le <strong>Conseil de Prud&apos;hommes</strong> pour demander des dommages-int&eacute;r&ecirc;ts.</li>
            <li>L&apos;<strong>inspection du travail</strong> pour signalement.</li>
          </ul>
        </section>

        {/* 9. FAQ */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">Questions fr&eacute;quentes</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900">Un CDD RQTH donne-t-il droit &agrave; plus de ch&ocirc;mage&nbsp;?</h3>
              <p className="mt-1">
                Oui, en dur&eacute;e. Pour un CDD de {EX_MOIS}&nbsp;mois, la dur&eacute;e passe
                de {exDureeSansRQTH}&nbsp;j (sans RQTH) &agrave; {exDureeAvecRQTH}&nbsp;j (avec RQTH),
                soit +{exDureeAvecRQTH - exDureeSansRQTH}&nbsp;j suppl&eacute;mentaires. Le montant
                de l&apos;ARE reste identique.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Faut-il d&eacute;clarer sa RQTH &agrave; France Travail&nbsp;?</h3>
              <p className="mt-1">
                Oui, pour b&eacute;n&eacute;ficier de l&apos;allongement de la dur&eacute;e ARE
                et de l&apos;accompagnement d&eacute;di&eacute;. La d&eacute;claration est volontaire
                et confidentielle vis-&agrave;-vis des employeurs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Peut-on &ecirc;tre licenci&eacute; &agrave; cause de sa RQTH&nbsp;?</h3>
              <p className="mt-1">
                Non. Tout licenciement ou non-renouvellement motiv&eacute; par le handicap est
                ill&eacute;gal. Des recours existent&nbsp;: D&eacute;fenseur des droits, Conseil
                de Prud&apos;hommes, inspection du travail.
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="mt-12 rounded-2xl border border-purple-200 bg-purple-50 p-6 text-center">
        <h2 className="text-xl font-bold text-purple-900">Calculez votre ARE RQTH</h2>
        <p className="mt-2 text-purple-700">Estimez votre ARE et votre dur&eacute;e all&ocirc;ng&eacute;e.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-purple-700">
            Calculateur ARE
          </Link>
          <Link href="/chomage-rqth" className="rounded-lg border border-purple-300 bg-white px-6 py-3 text-sm font-semibold text-purple-700 hover:border-purple-400">
            Ch&ocirc;mage RQTH
          </Link>
          <Link href="/fin-de-cdd" className="rounded-lg border border-purple-300 bg-white px-6 py-3 text-sm font-semibold text-purple-700 hover:border-purple-400">
            Fin de CDD
          </Link>
        </div>
      </div>
    </main>
  )
}
