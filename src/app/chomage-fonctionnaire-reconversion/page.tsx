import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Fonctionnaire demissionnaire : l'ARE est possible en 2025",
  description: "Fonctionnaire qui demissionne pour une reconversion ? Conditions ARE, dossier a deposer et droits CPF expliques etape par etape.",
  alternates: { canonical: 'https://www.monchomage.fr/chomage-fonctionnaire-reconversion' },
}

// ── Exemple : fonctionnaire contractuel, 2 400 €/mois brut ──────────────────
const EX_SALAIRE_CONTRACTUEL = 2_400
const exSjr = Number((EX_SALAIRE_CONTRACTUEL / ARE_PARAMS.joursParMoisSJR).toFixed(2))
const exF1 = Number((ARE_PARAMS.tauxFormule1 * exSjr + ARE_PARAMS.partieFix).toFixed(2))
const exF2 = Number((ARE_PARAMS.tauxFormule2 * exSjr).toFixed(2))
const exAj = Number(
  Math.max(Math.min(Math.max(exF1, exF2), ARE_PARAMS.plafondTauxSJR * exSjr), ARE_PARAMS.allocationMinimale).toFixed(2)
)
const exAjMensuelle = Number((exAj * ARE_PARAMS.joursParMois).toFixed(2))

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chomage fonctionnaire reconversion', item: 'https://www.monchomage.fr/chomage-fonctionnaire-reconversion' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Un fonctionnaire peut-il toucher le chomage apres une demission ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Un fonctionnaire titulaire n'a pas droit a l'ARE apres une demission classique : il est pris en charge par son employeur public (disponibilite, prise en charge par le CNFPT). En revanche, depuis la loi du 6 aout 2019, un fonctionnaire titulaire peut beneficier de l'ARE s'il demissionne dans le cadre d'un projet de reconversion professionnelle valide par une commission.",
      },
    },
    {
      '@type': 'Question',
      name: "Comment un fonctionnaire peut-il beneficier de l'ARE pour une reconversion ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Le fonctionnaire titulaire doit constituer un dossier de reconversion avant sa demission, le soumettre a une commission administrative, et obtenir une validation de son projet (reconversion professionnelle ou creation/reprise d'entreprise). Ce n'est qu'apres validation que la demission ouvre droit a l'ARE. Le dossier doit etre depose 3 a 6 mois avant la date de demission souhaitee.",
      },
    },
    {
      '@type': 'Question',
      name: "Un fonctionnaire contractuel a-t-il les memes droits ARE qu'un salarie prive ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui. Les fonctionnaires contractuels (non titulaires) sont soumis au droit commun ARE : conditions identiques (130 jours sur ${ARE_PARAMS.moisRefMoins55ans} mois), calcul ARE identique (SJR = traitement / ${ARE_PARAMS.joursParMoisSJR}), duree identique. Ils beneficient de l'ARE en cas de fin de CDD, de licenciement ou de rupture conventionnelle.`,
      },
    },
  ],
}

export default function ChomagefonctionnaireReconversion() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}Ch&ocirc;mage fonctionnaire reconversion
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Ch&ocirc;mage fonctionnaire en reconversion&nbsp;: ARE, d&eacute;mission et droits 2025
      </h1>

      <div className="mt-8 space-y-10 text-slate-700">

        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Fonctionnaire et ARE&nbsp;: un statut sp&eacute;cifique avec des droits conditionn&eacute;s
          </h2>
          <p className="mt-3">
            Le statut de fonctionnaire n&apos;interdit pas l&apos;acc&egrave;s &agrave; l&apos;ARE,
            mais les conditions varient selon que le fonctionnaire est <strong>titulaire</strong>{' '}
            ou <strong>contractuel</strong>. La r&eacute;forme de 2019 a ouvert de nouvelles
            possibilit&eacute;s pour les fonctionnaires titulaires souhaitant se reconvertir.
          </p>
        </section>

        {/* 2. Fonctionnaire titulaire vs contractuel */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Fonctionnaire et ARE&nbsp;: trois situations distinctes
          </h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <h3 className="font-semibold text-red-900">Fonctionnaire titulaire — d&eacute;mission classique</h3>
              <p className="mt-1 text-sm text-red-800">
                <strong>Pas d&apos;ARE.</strong> Le fonctionnaire titulaire qui d&eacute;missionne sans
                projet de reconversion valid&eacute; ne cotise pas &agrave; l&apos;assurance ch&ocirc;mage.
                Il peut b&eacute;n&eacute;ficier d&apos;une disponibilit&eacute; ou d&apos;une mise en
                cong&eacute; selon les modalit&eacute;s de sa fonction publique (&eacute;tat, territoriale,
                hospitali&egrave;re).
              </p>
            </div>
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <h3 className="font-semibold text-green-900">Fonctionnaire contractuel — perte involontaire d&apos;emploi</h3>
              <p className="mt-1 text-sm text-green-800">
                <strong>ARE de droit commun.</strong> Fin de CDD, licenciement, rupture conventionnelle&nbsp;:
                m&ecirc;mes conditions que le secteur priv&eacute;. Les fonctionnaires contractuels
                sont affili&eacute;s &agrave; l&apos;assurance ch&ocirc;mage depuis leurs d&eacute;buts.
              </p>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <h3 className="font-semibold text-blue-900">Fonctionnaire titulaire — d&eacute;mission pour reconversion (loi 2019)</h3>
              <p className="mt-1 text-sm text-blue-800">
                <strong>ARE possible sous conditions.</strong> Le projet de reconversion doit &ecirc;tre
                valid&eacute; avant la d&eacute;mission par une commission administrative. Une fois
                valid&eacute;, la d&eacute;mission ouvre droit &agrave; l&apos;ARE.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Demission reconversion loi 2019 */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            D&eacute;mission fonctionnaire pour reconversion (loi du 6 ao&ucirc;t 2019)
          </h2>
          <p className="mt-3">
            Le fonctionnaire titulaire peut acc&eacute;der &agrave; l&apos;ARE apr&egrave;s sa
            d&eacute;mission si son <strong>projet de reconversion professionnelle ou de cr&eacute;ation
            d&apos;entreprise</strong> a &eacute;t&eacute; valid&eacute; avant la d&eacute;mission.
          </p>
          <ol className="mt-4 list-decimal space-y-3 pl-6">
            <li>
              <strong>Constituer le dossier</strong>&nbsp;: projet de reconversion (formation, cr&eacute;ation
              d&apos;entreprise, changement de secteur), motivations, plan d&apos;action.
            </li>
            <li>
              <strong>D&eacute;poser le dossier 3 &agrave; 6 mois avant</strong> la date de d&eacute;mission
              souhait&eacute;e. Selon la fonction publique&nbsp;: Instance Paritaire Comp&eacute;tente
              (FPE), Conseil Sup&eacute;rieur de la Fonction Publique Hospitalire (FPH), etc.
            </li>
            <li>
              <strong>Instruction&nbsp;: 2 &agrave; 4 mois.</strong> La commission &eacute;value la
              r&eacute;alit&eacute; et la viabilit&eacute; du projet.
            </li>
            <li>
              <strong>Validation&nbsp;:</strong> en cas d&apos;avis favorable, le fonctionnaire peut
              d&eacute;missionner et s&apos;inscrire &agrave; France Travail pour b&eacute;n&eacute;ficier
              de l&apos;ARE.
            </li>
          </ol>
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <strong>Attention&nbsp;:</strong> si le fonctionnaire d&eacute;missionne <em>sans</em> avoir
            obtenu la validation pr&eacute;alable, la d&eacute;mission n&apos;ouvre pas droit &agrave;
            l&apos;ARE, m&ecirc;me si le projet est r&eacute;el. La validation <strong>avant</strong> la
            d&eacute;mission est impJrative.
          </div>
        </section>

        {/* 4. CPF + ARE fonctionnaire */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            CPF + ARE&nbsp;: cumul pendant la reconversion
          </h2>
          <p className="mt-3">
            Depuis 2020, les fonctionnaires ont les m&ecirc;mes droits CPF (Compte Personnel de
            Formation) que les salari&eacute;s du priv&eacute; (500&nbsp;&euro;/an, plafonn&eacute;
            &agrave; 5&nbsp;000&nbsp;&euro; ou 8&nbsp;000&nbsp;&euro; pour les peu qualifi&eacute;s).
            Ces droits CPF sont cumulables avec l&apos;ARE&nbsp;: si la formation est prescrite ou
            approuv&eacute;e par France Travail, l&apos;AREF (ARE Formation) est vers&eacute;e en
            lieu et place de l&apos;ARE, au m&ecirc;me montant.
          </p>
        </section>

        {/* 5. Calcul ARE fonctionnaire contractuel */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul ARE fonctionnaire contractuel&nbsp;: {euros(EX_SALAIRE_CONTRACTUEL)}/mois brut
          </h2>
          <p className="mt-3">
            Le SJR est calcul&eacute; sur le traitement indiciaire brut, augment&eacute; des
            suppl&eacute;ments de traitement (SFT, prime de r&eacute;sidence, etc.). Identique
            au secteur priv&eacute; dans sa m&eacute;thode.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Traitement brut mensuel</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(EX_SALAIRE_CONTRACTUEL)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">SJR = {euros(EX_SALAIRE_CONTRACTUEL)} &divide; {ARE_PARAMS.joursParMoisSJR}</td>
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
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-slate-900">ARE journali&egrave;re</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-slate-900">{euros(exAj)}/j</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-slate-900">ARE mensuelle</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-slate-900">{euros(exAjMensuelle)}/mois</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. Fonctionnaire contractuel fin de CDD */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Fonctionnaire contractuel&nbsp;: fin de CDD
          </h2>
          <p className="mt-3">
            Identique au secteur priv&eacute;&nbsp;: la fin d&apos;un CDD de fonctionnaire contractuel
            ouvre automatiquement droit &agrave; l&apos;ARE, sous r&eacute;serve de 130&nbsp;jours
            (910&nbsp;heures) de travail sur les {ARE_PARAMS.moisRefMoins55ans}&nbsp;derniers mois.
            L&apos;inscription &agrave; France Travail doit &ecirc;tre faite dans les 12&nbsp;mois.
          </p>
        </section>

        {/* 7. Tableau comparatif */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Comparatif fonctionnaire titulaire vs contractuel vs d&eacute;mission reconversion
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Titulaire (d&eacute;mission classique)</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Contractuel (perte emploi)</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Titulaire (d&eacute;mission reconversion)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Droit ARE</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-600">Non</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">Oui (droit commun)</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">Oui (si projet valid&eacute;)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Conditions</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-600">N/A</td>
                  <td className="border border-slate-200 px-4 py-2">130 j / 910 h</td>
                  <td className="border border-slate-200 px-4 py-2">Projet valid&eacute; avant d&eacute;mission</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">D&eacute;lai d&apos;instruction</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-600">N/A</td>
                  <td className="border border-slate-200 px-4 py-2">Imm&eacute;diat</td>
                  <td className="border border-slate-200 px-4 py-2">2 &agrave; 4 mois</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Calcul ARE</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-600">N/A</td>
                  <td className="border border-slate-200 px-4 py-2">Traitement brut / {ARE_PARAMS.joursParMoisSJR}</td>
                  <td className="border border-slate-200 px-4 py-2">Traitement brut / {ARE_PARAMS.joursParMoisSJR}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">CPF cumulable</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-600">N/A</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">Oui (AREF)</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">Oui (AREF)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. Démarches */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            D&eacute;marches sp&eacute;cifiques
          </h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
              <strong>Fonctionnaire contractuel — fin de CDD ou licenciement&nbsp;:</strong> inscription
              &agrave; France Travail dans les 12 mois, attestation employeur (administration), dossier
              identique au secteur priv&eacute;.
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
              <strong>Fonctionnaire titulaire — reconversion&nbsp;:</strong> (1) constituer le dossier
              de reconversion, (2) saisir la commission comp&eacute;tente 3 &agrave; 6 mois avant la
              d&eacute;mission, (3) attendre la validation, (4) donner sa d&eacute;mission, (5) s&apos;inscrire
              &agrave; France Travail.
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">Questions fr&eacute;quentes</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900">Un fonctionnaire peut-il toucher le ch&ocirc;mage apr&egrave;s une d&eacute;mission&nbsp;?</h3>
              <p className="mt-1">
                Un titulaire&nbsp;: non, sauf s&apos;il a fait valider un projet de reconversion
                avant de d&eacute;missionner (loi 2019). Un contractuel&nbsp;: les m&ecirc;mes r&egrave;gles
                que le secteur priv&eacute; s&apos;appliquent.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Comment un fonctionnaire peut-il b&eacute;n&eacute;ficier de l&apos;ARE pour une reconversion&nbsp;?</h3>
              <p className="mt-1">
                Il doit d&eacute;poser un dossier de reconversion aupr&egrave;s de la commission
                comp&eacute;tente 3 &agrave; 6 mois avant sa d&eacute;mission, obtenir une validation,
                puis d&eacute;missionner et s&apos;inscrire &agrave; France Travail.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Un fonctionnaire contractuel a-t-il les m&ecirc;mes droits ARE qu&apos;un salari&eacute; priv&eacute;&nbsp;?</h3>
              <p className="mt-1">
                Oui. M&ecirc;mes conditions (130 j / 910 h), m&ecirc;me calcul (SJR = traitement
                brut &divide; {ARE_PARAMS.joursParMoisSJR}), m&ecirc;me dur&eacute;e. Pour{' '}
                {euros(EX_SALAIRE_CONTRACTUEL)}/mois&nbsp;: ARE = {euros(exAj)}/j ({euros(exAjMensuelle)}/mois).
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
        <h2 className="text-xl font-bold text-slate-900">Calculez votre ARE</h2>
        <p className="mt-2 text-slate-700">Estimez votre allocation sur la base de votre traitement brut.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-lg bg-slate-700 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800">
            Calculateur ARE
          </Link>
          <Link href="/demission-reconversion-cpf" className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400">
            D&eacute;mission reconversion CPF
          </Link>
          <Link href="/demission-legitime" className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400">
            D&eacute;mission l&eacute;gitime
          </Link>
        </div>
      </div>
    </main>
  )
}
