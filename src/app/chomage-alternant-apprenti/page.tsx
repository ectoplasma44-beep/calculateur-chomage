import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Chomage alternant 2026 : avez-vous droit a l'ARE ?",
  description: "Fin de contrat d'alternance ou d'apprentissage ? Conditions, montant ARE et duree expliques. Droits souvent ignores — verifiez les votres.",
  alternates: { canonical: 'https://www.monchomage.fr/chomage-alternant-apprenti' },
}

// ── Exemple : alternant 21 ans, 2 ans de contrat, 1 200 €/mois ───────────────
const EX_SALAIRE_MENSUEL = 1_200
const EX_DUREE_MOIS = 24
const EX_JOURS_CALENDAIRES = 730
const exTotalBrut = EX_SALAIRE_MENSUEL * EX_DUREE_MOIS
const exSjr = Number((exTotalBrut / EX_JOURS_CALENDAIRES).toFixed(2))
const exF1 = Number((ARE_PARAMS.tauxFormule1 * exSjr + ARE_PARAMS.partieFix).toFixed(2))
const exF2 = Number((ARE_PARAMS.tauxFormule2 * exSjr).toFixed(2))
const exAjBrute = Math.max(exF1, exF2)
const exAjCapSjr = ARE_PARAMS.plafondTauxSJR * exSjr
const exAj = Number(Math.max(Math.min(exAjBrute, exAjCapSjr), ARE_PARAMS.allocationMinimale).toFixed(2))
const exAjMensuelle = Number((exAj * ARE_PARAMS.joursParMois).toFixed(2))
const exDureeJours = Math.min(EX_JOURS_CALENDAIRES, ARE_PARAMS.dureeMaxMoins50ansJours)

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Chomage alternant apprenti', item: 'https://www.monchomage.fr/chomage-alternant-apprenti' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Un alternant a-t-il droit au chomage apres son contrat ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui, sous reserve d'avoir accompli au moins 130 jours (910 heures) de travail sur les ${ARE_PARAMS.moisRefMoins55ans} derniers mois. La fin d'un contrat d'alternance (contrat pro ou apprentissage) est assimilee a une perte involontaire d'emploi et ouvre droit a l'ARE, comme une fin de CDD classique.`,
      },
    },
    {
      '@type': 'Question',
      name: "Comment est calcule l'ARE d'un ancien alternant ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Le SJR est calcule sur la totalite des salaires bruts percus pendant le contrat d'alternance divises par le nombre de jours calendaires de la periode. Pour un contrat de 2 ans a ${euros(EX_SALAIRE_MENSUEL)}/mois, le SJR est de ${euros(exSjr)}/jour et l'ARE journaliere de ${euros(exAj)}/jour (${euros(exAjMensuelle)}/mois).`,
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on toucher l'ARE et reprendre des etudes en meme temps ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Le statut etudiant est incompatible avec l'inscription a France Travail et le benefice de l'ARE. Si l'ancien alternant reprend des etudes a temps plein, il ne peut pas percevoir l'ARE. En revanche, il peut reprendre des etudes en alternance ou en formation courte sous certaines conditions en maintenant son statut de demandeur d'emploi.",
      },
    },
  ],
}

export default function ChomageAlternantApprenti() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}Ch&ocirc;mage alternant et apprenti
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Ch&ocirc;mage alternant et apprenti&nbsp;: droits ARE 2026
      </h1>

      <div className="mt-8 space-y-10 text-slate-700">

        {/* 1. Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Alternant au ch&ocirc;mage&nbsp;: des droits souvent m&eacute;connus
          </h2>
          <p className="mt-3">
            La fin d&apos;un contrat d&apos;alternance — contrat de professionnalisation (CDD) ou
            contrat d&apos;apprentissage — ouvre droit &agrave; l&apos;ARE dans les m&ecirc;mes
            conditions qu&apos;une fin de CDD classique. Ces droits sont trop souvent ignor&eacute;s&nbsp;:
            de nombreux alternants ne s&apos;inscrivent pas &agrave; France Travail, faute de savoir
            qu&apos;ils y ont droit. Le statut d&apos;alternant (contrat pro ou apprentissage)
            n&apos;est pas un obstacle &agrave; l&apos;ARE&nbsp;: c&apos;est la nature du contrat
            (CDD) qui ouvre les droits &agrave; sa rupture.
          </p>
        </section>

        {/* 2. Conditions */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Conditions d&apos;ouverture des droits ARE
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Type de contrat</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Fen&ecirc;tre d&apos;affiliation</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Dur&eacute;e minimale</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Contrat de professionnalisation (CDD)</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.moisRefMoins55ans} derniers mois</td>
                  <td className="border border-slate-200 px-4 py-2">130 j / 910 h</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Contrat d&apos;apprentissage (depuis r&eacute;forme 2019)</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.moisRefMoins55ans} derniers mois</td>
                  <td className="border border-slate-200 px-4 py-2">130 j / 910 h</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li><strong>&Acirc;ge&nbsp;:</strong> pas de limite minimale. Le plafond de 29 ans s&apos;applique au contrat d&apos;alternance, pas aux droits ARE.</li>
            <li>Inscription &agrave; France Travail dans les 12&nbsp;mois suivant la fin du contrat.</li>
            <li>Recherche active d&apos;emploi, aptitude au travail, r&eacute;sidence en France.</li>
          </ul>
        </section>

        {/* 3. Calcul SJR */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul du SJR&nbsp;: alternant 21 ans, 2 ans de contrat, {euros(EX_SALAIRE_MENSUEL)}/mois
          </h2>
          <p className="mt-3">
            Le SJR se calcule sur la totalit&eacute; des salaires bruts per&ccedil;us pendant
            l&apos;alternance, divis&eacute;s par le nombre de jours calendaires du contrat. Le
            salaire d&apos;alternant varie selon l&apos;&acirc;ge et l&apos;ann&eacute;e de contrat
            (pourcentage du SMIC), mais le calcul du SJR reste identique quel que soit le salaire.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Salaire brut mensuel</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(EX_SALAIRE_MENSUEL)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Dur&eacute;e contrat</td>
                  <td className="border border-slate-200 px-4 py-2">{EX_DUREE_MOIS}&nbsp;mois ({EX_JOURS_CALENDAIRES}&nbsp;j calendaires)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Total salaires bruts</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{euros(exTotalBrut)}</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">SJR = {euros(exTotalBrut)} &divide; {EX_JOURS_CALENDAIRES}</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold">{euros(exSjr)}/jour</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule&nbsp;1&nbsp;: {ARE_PARAMS.tauxFormule1} &times; SJR + {euros(ARE_PARAMS.partieFix)}</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exF1)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Formule&nbsp;2&nbsp;: {ARE_PARAMS.tauxFormule2} &times; SJR</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(exF2)}/j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Allocation minimale garantie</td>
                  <td className="border border-slate-200 px-4 py-2">{euros(ARE_PARAMS.allocationMinimale)}/j</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE journali&egrave;re (plancher appliqu&eacute;)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(exAj)}/jour</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">ARE mensuelle ({ARE_PARAMS.joursParMois}&nbsp;j)</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{euros(exAjMensuelle)}/mois</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">Dur&eacute;e indemnisation</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-900">{exDureeJours}&nbsp;j ({Math.round(exDureeJours / ARE_PARAMS.joursParMois)}&nbsp;mois)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Le plancher de {euros(ARE_PARAMS.allocationMinimale)}/j s&apos;applique ici car le salaire d&apos;alternant
            g&eacute;n&egrave;re un SJR inf&eacute;rieur au seuil. Pour des salaires plus &eacute;lev&eacute;s,
            c&apos;est la formule qui s&apos;applique.
          </p>
        </section>

        {/* 4. Durée indemnisation */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Dur&eacute;e d&apos;indemnisation
          </h2>
          <p className="mt-3">
            Principe&nbsp;: 1 jour travaill&eacute; = 1 jour indemnis&eacute;, plafonn&eacute;
            &agrave; {ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;jours pour les moins de 50&nbsp;ans
            et {ARE_PARAMS.dureeMax50ansEtPlusJours}&nbsp;jours pour les 50&nbsp;ans et plus.
            Un contrat d&apos;alternance de 24&nbsp;mois donne droit &agrave; 24&nbsp;mois
            d&apos;indemnisation (plafonn&eacute;s &agrave; {ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;j).
          </p>
        </section>

        {/* 5. Rupture avant terme */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Rupture du contrat d&apos;alternance avant le terme
          </h2>
          <div className="mt-3 space-y-3">
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <h3 className="font-semibold text-green-900">A l&apos;initiative de l&apos;employeur</h3>
              <p className="mt-1 text-sm text-green-800">
                Assimil&eacute;e &agrave; un licenciement&nbsp;: l&apos;ARE est ouverte si les
                conditions d&apos;affiliation sont atteintes sur la p&eacute;riode d&eacute;j&agrave;
                effectu&eacute;e.
              </p>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <h3 className="font-semibold text-red-900">A l&apos;initiative de l&apos;alternant</h3>
              <p className="mt-1 text-sm text-red-800">
                Assimil&eacute;e &agrave; une d&eacute;mission&nbsp;: pas de droit &agrave; l&apos;ARE,
                sauf motifs l&eacute;gitimes de d&eacute;mission (situation &eacute;tablie par
                r&egrave;glement Unédic&nbsp;: mariage, s&eacute;curit&eacute; au travail, etc.).
              </p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <h3 className="font-semibold text-amber-900">Rupture pendant p&eacute;riode d&apos;essai</h3>
              <p className="mt-1 text-sm text-amber-800">
                Pour un contrat d&apos;apprentissage, la p&eacute;riode d&apos;essai est de
                45&nbsp;jours. Une rupture dans ce d&eacute;lai — quelle qu&apos;en soit l&apos;initiative —
                ne g&eacute;n&egrave;re pas de droits &agrave; l&apos;ARE faute d&apos;affiliation
                suffisante.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Poursuite études */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Fin d&apos;alternance + poursuite d&apos;&eacute;tudes
          </h2>
          <p className="mt-3">
            Le statut &eacute;tudiant &agrave; temps plein est <strong>incompatible</strong> avec
            l&apos;inscription &agrave; France Travail et le b&eacute;n&eacute;fice de l&apos;ARE.
            En revanche, une formation courte (POEI, formation Prot&eacute;gion sociale Professionnelle)
            ou une reprise d&apos;&eacute;tudes en alternance (nouveau contrat) n&apos;interdit pas
            l&apos;ARE si les conditions d&apos;ouverture des droits sont maintenues.
          </p>
        </section>

        {/* 7. Fin alternance + recherche emploi */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Fin d&apos;alternance + recherche d&apos;emploi
          </h2>
          <p className="mt-3">
            C&apos;est la situation id&eacute;ale&nbsp;: l&apos;ancien alternant s&apos;inscrit
            &agrave; France Travail apr&egrave;s la fin du contrat, cherche un emploi tout en
            b&eacute;n&eacute;ficiant de l&apos;ARE. L&apos;ARE est suspendue d&egrave;s la reprise
            d&apos;un emploi (CDI, CDD, int&eacute;rim) et les droits restants sont conserv&eacute;s
            pour une &eacute;ventuelle future p&eacute;riode sans emploi (rechargement des droits
            si nouveau contrat d&apos;au moins 130&nbsp;jours).
          </p>
        </section>

        {/* 8. Comparatif */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Comparatif alternant vs stagiaire vs CDD classique
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Crit&egrave;re</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Alternant</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Stagiaire</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">CDD classique</th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Droit &agrave; l&apos;ARE</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">Oui (si 130 j)</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-600">Non</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">Oui (si 130 j)</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Prime de pr&eacute;carit&eacute; (10&nbsp;%)</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-600">Non (statut sp&eacute;cial)</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-600">Non</td>
                  <td className="border border-slate-200 px-4 py-2 text-green-700 font-medium">Oui</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Dur&eacute;e ARE max (&lt;&nbsp;50 ans)</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;j</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-600">N/A</td>
                  <td className="border border-slate-200 px-4 py-2">{ARE_PARAMS.dureeMaxMoins50ansJours}&nbsp;j</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">D&eacute;lai de carence</td>
                  <td className="border border-slate-200 px-4 py-2">7 j + diff&eacute;r&eacute; CP</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-600">N/A</td>
                  <td className="border border-slate-200 px-4 py-2">7 j + diff&eacute;r&eacute; CP</td>
                </tr>
                <tr className="odd:bg-white even:bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Rupture &agrave; l&apos;initiative du salari&eacute;</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-600">Pas d&apos;ARE (sauf motif l&eacute;gitime)</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-600">N/A</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-600">Pas d&apos;ARE (sauf motif l&eacute;gitime)</td>
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
              <h3 className="font-semibold text-slate-900">Un alternant a-t-il droit au ch&ocirc;mage apr&egrave;s son contrat&nbsp;?</h3>
              <p className="mt-1">
                Oui, sous r&eacute;serve d&apos;avoir accompli au moins 130&nbsp;jours (910&nbsp;heures)
                de travail sur les {ARE_PARAMS.moisRefMoins55ans}&nbsp;derniers mois et de s&apos;inscrire
                &agrave; France Travail. La fin d&apos;un contrat d&apos;alternance est assimil&eacute;e
                &agrave; une perte involontaire d&apos;emploi.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Comment est calcul&eacute; l&apos;ARE d&apos;un ancien alternant&nbsp;?</h3>
              <p className="mt-1">
                Le SJR est calcul&eacute; sur la totalit&eacute; des salaires bruts per&ccedil;us
                divis&eacute;e par le nombre de jours calendaires du contrat. Pour un contrat de
                2&nbsp;ans &agrave; {euros(EX_SALAIRE_MENSUEL)}/mois&nbsp;: SJR&nbsp;= {euros(exSjr)}/j,
                ARE&nbsp;= {euros(exAj)}/j (plancher minimum garanti), soit {euros(exAjMensuelle)}/mois.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Peut-on toucher l&apos;ARE et reprendre des &eacute;tudes&nbsp;?</h3>
              <p className="mt-1">
                Non pour des &eacute;tudes &agrave; temps plein (statut &eacute;tudiant incompatible).
                Oui pour des formations courtes (type POEI) sans passer en statut &eacute;tudiant.
                Une reprise en alternance g&eacute;n&egrave;re un nouveau contrat qui suspend l&apos;ARE.
              </p>
            </div>
          </div>
        </section>

      </div>

      <div className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
        <h2 className="text-xl font-bold text-blue-900">Estimez votre ARE d&apos;alternant</h2>
        <p className="mt-2 text-blue-700">Calculez votre allocation avec votre salaire r&eacute;el d&apos;alternance.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <Link href="/" className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700">
            Calculateur ARE
          </Link>
          <Link href="/fin-de-cdd" className="rounded-lg border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400">
            Fin de CDD
          </Link>
          <Link href="/fin-de-cdd-alternant" className="rounded-lg border border-blue-300 bg-white px-6 py-3 text-sm font-semibold text-blue-700 hover:border-blue-400">
            Guide fin de contrat alternance
          </Link>
        </div>
      </div>
    </main>
  )
}
