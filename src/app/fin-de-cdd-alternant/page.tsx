import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Fin de contrat alternance chomage 2025 : ARE et demarches",
  description: "Contrat d'alternance termine ? Calcul ARE, demarches Pole Emploi et droits 2025. Guide complet avec exemples chiffres pour alternants.",
  alternates: { canonical: 'https://www.monchomage.fr/fin-de-cdd-alternant' },
}

const DELAI_ATTENTE = 7

// ── Exemple A : alternant 20 ans, 2 ans, 1 100 €/mois ────────────────────────
const EXA_SALAIRE_MENSUEL = 1_100
const EXA_DUREE_MOIS = 24
const EXA_JOURS = 730
const exaTotalBrut = EXA_SALAIRE_MENSUEL * EXA_DUREE_MOIS
const exaSjr = Number((exaTotalBrut / EXA_JOURS).toFixed(2))
const exaF1 = Number((ARE_PARAMS.tauxFormule1 * exaSjr + ARE_PARAMS.partieFix).toFixed(2))
const exaF2 = Number((ARE_PARAMS.tauxFormule2 * exaSjr).toFixed(2))
const exaAj = Number(
  Math.max(Math.min(Math.max(exaF1, exaF2), ARE_PARAMS.plafondTauxSJR * exaSjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const exaAjMensuelle = Number((exaAj * ARE_PARAMS.joursParMois).toFixed(2))

// ── Exemple B : alternant 25 ans, 1 an, 1 500 €/mois ────────────────────────
const EXB_SALAIRE_MENSUEL = 1_500
const EXB_DUREE_MOIS = 12
const EXB_JOURS = 365
const exbTotalBrut = EXB_SALAIRE_MENSUEL * EXB_DUREE_MOIS
const exbSjr = Number((exbTotalBrut / EXB_JOURS).toFixed(2))
const exbF1 = Number((ARE_PARAMS.tauxFormule1 * exbSjr + ARE_PARAMS.partieFix).toFixed(2))
const exbF2 = Number((ARE_PARAMS.tauxFormule2 * exbSjr).toFixed(2))
const exbAj = Number(
  Math.max(Math.min(Math.max(exbF1, exbF2), ARE_PARAMS.plafondTauxSJR * exbSjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const exbAjMensuelle = Number((exbAj * ARE_PARAMS.joursParMois).toFixed(2))

// ── Tableau durée selon durée contrat ────────────────────────────────────────
const DUREES = [
  { label: '1 an', jours: 365 },
  { label: '2 ans', jours: 730 },
  { label: '3 ans', jours: 1095 },
]

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chomage alternant apprenti', item: 'https://www.monchomage.fr/chomage-alternant-apprenti' },
    { '@type': 'ListItem', position: 3, name: 'Fin de contrat alternance', item: 'https://www.monchomage.fr/fin-de-cdd-alternant' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Combien touche-t-on de chomage apres une alternance de 2 ans ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Pour un alternant ayant percu ${euros(EXA_SALAIRE_MENSUEL)}/mois pendant 2 ans : SJR = ${euros(exaSjr)}/j. L'allocation journaliere minimale garantie de ${euros(ARE_PARAMS.allocationMinimale)}/j s'applique ici, soit ${euros(exaAjMensuelle)}/mois. La duree d'indemnisation est de ${Math.min(EXA_JOURS, ARE_PARAMS.dureeMaxMoins50ansJours)} jours (24 mois).`,
      },
    },
    {
      '@type': 'Question',
      name: "Faut-il attendre la fin du contrat pour s'inscrire a Pole Emploi ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. L'inscription a France Travail peut se faire jusqu'a 12 mois apres la fin du contrat d'alternance. En revanche, l'ARE ne court qu'a partir de la date d'inscription effective (apres le delai de carence). Il est conseille de s'inscrire le plus tot possible pour ne pas perdre de jours d'indemnisation.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on cumuler ARE et formation apres une alternance ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, sous conditions. Une formation financee par France Travail (POEI, CIF, Action de Formation) peut etre suivie pendant l'ARE. Le demandeur d'emploi percoit alors l'AREF (allocation d'aide au retour a l'emploi formation) a la place de l'ARE, au meme montant. En revanche, reprendre des etudes a temps plein (statut etudiant) est incompatible avec l'ARE.",
      },
    },
  ],
}

export default function FinDeCDDAlternant() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}
        <Link href="/chomage-alternant-apprenti" className="hover:underline">Ch&ocirc;mage alternant</Link>
        {' '}&rsaquo;{' '}Fin de contrat alternance
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Fin de contrat alternance&nbsp;: ARE, d&eacute;marches et droits 2025
      </h1>

      <div className="mt-8 space-y-10 text-slate-700">

        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Un droit souvent ignor&eacute; par les alternants
          </h2>
          <p className="mt-3">
            La fin d&apos;un contrat d&apos;alternance est un moment charnire&nbsp;: embauche en CDI
            id&eacute;alement, mais aussi fr&eacute;quemment p&eacute;riode de transition et de
            recherche d&apos;emploi. La grande majorit&eacute; des alternants ignorent qu&apos;ils
            ont droit &agrave; l&apos;ARE dans les m&ecirc;mes conditions qu&apos;apr&egrave;s un
            CDD classique. Ce droit existe depuis la r&eacute;forme 2019 qui a align&eacute; les
            r&egrave;gles des contrats d&apos;apprentissage sur celles du droit commun.
          </p>
        </section>

        {/* 2. Conditions */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Conditions d&apos;acc&egrave;s &agrave; l&apos;ARE
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              <strong>130&nbsp;jours (910&nbsp;heures)</strong> travaill&eacute;s sur les{' '}
              {ARE_PARAMS.moisRefMoins55ans}&nbsp;derniers mois (fen&ecirc;tre extended &agrave;{' '}
              {ARE_PARAMS.moisRefPlus55ans}&nbsp;mois pour les 55+).
            </li>
            <li>
              <strong>Inscription &agrave; France Travail</strong> dans les 12&nbsp;mois suivant la
              fin du contrat. Faire la d&eacute;marche d&egrave;s la fin du contrat pour &eacute;viter
              toute perte.
            </li>
            <li>
              Recherche active d&apos;emploi (PPAE), aptitude au travail, r&eacute;sidence en France.
            </li>
          </ul>
        </section>

        {/* 3. SJR */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Exemples de calcul ARE
          </h2>

          <h3 className="mt-6 text-xl font-semibold text-slate-800">
            Exemple A — alternant 20 ans, 2 ans de contrat, {euros(EXA_SALAIRE_MENSUEL)}/mois
          </h3>
          <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Total brut ({EXA_DUREE_MOIS}&nbsp;mois)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exaTotalBrut)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">SJR = {euros(exaTotalBrut)} &divide; {EXA_JOURS}&nbsp;j</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{euros(exaSjr)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule&nbsp;1</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exaF1)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule&nbsp;2</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exaF2)}/j</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE journali&egrave;re (plancher)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(exaAj)}/j</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE mensuelle</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(exaAjMensuelle)}/mois</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">Dur&eacute;e</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{Math.min(EXA_JOURS, ARE_PARAMS.dureeMaxMoins50ansJours)}&nbsp;j</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-8 text-xl font-semibold text-slate-800">
            Exemple B — alternant 25 ans, 1 an de contrat, {euros(EXB_SALAIRE_MENSUEL)}/mois
          </h3>
          <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Total brut ({EXB_DUREE_MOIS}&nbsp;mois)</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exbTotalBrut)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">SJR = {euros(exbTotalBrut)} &divide; {EXB_JOURS}&nbsp;j</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{euros(exbSjr)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule&nbsp;1</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exbF1)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule&nbsp;2</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exbF2)}/j</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE journali&egrave;re</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(exbAj)}/j</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE mensuelle</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(exbAjMensuelle)}/mois</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">Dur&eacute;e</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{Math.min(EXB_JOURS, ARE_PARAMS.dureeMaxMoins50ansJours)}&nbsp;j</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Délai de carence */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            D&eacute;lai de carence apr&egrave;s une fin de contrat d&apos;alternance
          </h2>
          <p className="mt-3">
            Les contrats d&apos;alternance ne g&eacute;n&egrave;rent pas d&apos;indemnit&eacute;
            de fin de contrat (pas de prime de pr&eacute;carit&eacute;, contrairement aux CDD
            classiques). La carence se compose donc uniquement&nbsp;:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li><strong>D&eacute;lai d&apos;attente&nbsp;: {DELAI_ATTENTE}&nbsp;jours</strong> (incompressible).</li>
            <li><strong>Diff&eacute;r&eacute; CP&nbsp;:</strong> variable selon les cong&eacute;s pay&eacute;s non pris. En alternance, les CP sont g&eacute;n&eacute;ralement pris pendant les vacances universitaires&nbsp;: le diff&eacute;r&eacute; r&eacute;siduel est souvent nul ou minime.</li>
          </ul>
        </section>

        {/* 5. Durée tableau */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Dur&eacute;e d&apos;indemnisation selon la dur&eacute;e du contrat
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Dur&eacute;e contrat</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Jours calendaires</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">ARE (&lt;&nbsp;50 ans)</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">ARE (50+ ans)</th>
                </tr>
              </thead>
              <tbody>
                {DUREES.map(({ label, jours }) => (
                  <tr key={label} className="odd:bg-white even:bg-slate-50">
                    <td className="border border-slate-200 px-4 py-2 font-medium">{label}</td>
                    <td className="border border-slate-200 px-4 py-2">{jours}&nbsp;j</td>
                    <td className="border border-slate-200 px-4 py-2 font-semibold text-blue-700">
                      {Math.min(jours, ARE_PARAMS.dureeMaxMoins50ansJours)}&nbsp;j
                    </td>
                    <td className="border border-slate-200 px-4 py-2 font-semibold text-blue-700">
                      {Math.min(jours, ARE_PARAMS.dureeMax50ansEtPlusJours)}&nbsp;j
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Démarches */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            D&eacute;marches &agrave; la fin du contrat
          </h2>
          <ol className="mt-3 list-decimal space-y-3 pl-6">
            <li>
              <strong>Demander l&apos;attestation employeur</strong> &agrave; l&apos;employeur
              (obligatoire pour l&apos;ouverture des droits) — le document mentionne les dates de
              contrat, les salaires et le motif de fin.
            </li>
            <li>
              <strong>S&apos;inscrire &agrave; France Travail</strong> en ligne (francetravail.fr)
              d&egrave;s la fin du contrat. Inutile d&apos;attendre la r&eacute;ception de
              l&apos;attestation.
            </li>
            <li>
              <strong>Valider le PPAE</strong> (projet personnalis&eacute; d&apos;acc&egrave;s &agrave;
              l&apos;emploi) lors du premier rendez-vous avec un conseiller France Travail.
            </li>
            <li>
              <strong>Actualiser mensuellement</strong> sur le compte France Travail (confirmer la
              situation&nbsp;: emploi, formation, maladie, etc.).
            </li>
          </ol>
        </section>

        {/* 7. Cumul ARE + formation */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Cumul ARE + formation courte post-alternance
          </h2>
          <p className="mt-3">
            L&apos;ancien alternant peut suivre une formation prescrite par France Travail tout en
            restant indemnis&eacute;. Il percevra l&apos;AREF (Allocation d&apos;aide au Retour &agrave;
            l&apos;Emploi Formation) au m&ecirc;me montant que l&apos;ARE. Le droit CPF
            (Compte Personnel de Formation) est utilisable en compl&eacute;ment du financement France
            Travail.
          </p>
          <p className="mt-2">
            Attention&nbsp;: reprendre des &eacute;tudes &agrave; temps plein (inscription dans un
            &eacute;tablissement en statut &eacute;tudiant) est incompatible avec l&apos;ARE.
          </p>
        </section>

        {/* 8. Non-renouvellement vs rupture */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Non-renouvellement vs rupture avant terme
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Situation</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Droit ARE</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Conditions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Fin normale du contrat</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">Oui</td>
                  <td className="border border-slate-200 px-4 py-2">130 j travaill&eacute;s minimum</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Rupture &agrave; l&apos;initiative employeur</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">Oui</td>
                  <td className="border border-slate-200 px-4 py-2">Droits calcul&eacute;s sur p&eacute;riode effectu&eacute;e</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Rupture &agrave; l&apos;initiative alternant</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-600">Non (sauf motif l&eacute;gitime)</td>
                  <td className="border border-slate-200 px-4 py-2">Assimil&eacute;e &agrave; une d&eacute;mission</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Rupture p&eacute;riode d&apos;essai (45 j)</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-600">Non</td>
                  <td className="border border-slate-200 px-4 py-2">Affiliation insuffisante</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 9. FAQ */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">Questions fr&eacute;quentes</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900">Combien touche-t-on apr&egrave;s une alternance de 2 ans&nbsp;?</h3>
              <p className="mt-1">
                Pour un salaire de {euros(EXA_SALAIRE_MENSUEL)}/mois&nbsp;: SJR = {euros(exaSjr)}/j,
                ARE = {euros(exaAj)}/j (allocation minimale garantie), soit {euros(exaAjMensuelle)}/mois
                pendant {Math.min(EXA_JOURS, ARE_PARAMS.dureeMaxMoins50ansJours)}&nbsp;jours.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Faut-il attendre la fin du contrat pour s&apos;inscrire&nbsp;?</h3>
              <p className="mt-1">
                L&apos;inscription peut se faire jusqu&apos;&agrave; 12&nbsp;mois apr&egrave;s la fin
                du contrat, mais l&apos;ARE ne court qu&apos;&agrave; partir de l&apos;inscription
                effective. S&apos;inscrire d&egrave;s la fin du contrat est fortement recommand&eacute;.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Peut-on cumuler ARE et formation apr&egrave;s une alternance&nbsp;?</h3>
              <p className="mt-1">
                Oui pour les formations prescrites par France Travail (POEI, formations financ&eacute;es)&nbsp;:
                l&apos;AREF est vers&eacute;e au m&ecirc;me montant que l&apos;ARE.
                Non pour des &eacute;tudes &agrave; temps plein en statut &eacute;tudiant.
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
        <h2 className="text-xl font-bold text-blue-900">Calculez votre ARE d&apos;alternant</h2>
        <p className="mt-2 text-blue-700">Saisissez votre salaire mensuel brut pour estimer votre allocation.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700">
            Calculateur ARE
          </Link>
          <Link href="/chomage-alternant-apprenti" className="rounded-lg border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400">
            Ch&ocirc;mage alternant
          </Link>
          <Link href="/delai-carence-chomage" className="rounded-lg border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400">
            D&eacute;lai de carence
          </Link>
        </div>
      </div>
    </main>
  )
}
