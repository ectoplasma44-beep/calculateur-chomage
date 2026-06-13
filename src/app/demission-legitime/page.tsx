import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurARE from '@/components/CalculateurARE'
import { ARE_PARAMS } from '@/lib/are-parametres'

export const metadata: Metadata = {
  title: "Chômage après Démission 2026 — Cas de Démission Légitime",
  description: "Peut-on toucher le chômage après une démission ? Oui dans certains cas. Découvrez les cas de démission légitime reconnus par l'Unédic, les conditions et le calcul ARE 2026.",
  alternates: {
    canonical: 'https://www.monchomage.fr/demission-legitime',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Peut-on toucher le chômage après une démission ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `En principe non : la démission volontaire n'ouvre pas droit à l'ARE. Cependant, il existe des cas de démission dite légitime (suivi du conjoint, non-paiement de salaire, modification unilatérale du contrat, violences conjugales…) reconnus par le règlement d'assurance chômage, qui donnent accès à l'ARE dans les mêmes conditions qu'un licenciement. Il faut avoir travaillé au moins ${ARE_PARAMS.dureeMinJours} jours au cours des ${ARE_PARAMS.moisRefMoins55ans} derniers mois.`,
      },
    },
    {
      '@type': 'Question',
      name: "Comment prouver que sa démission est légitime ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Chaque cas légitime nécessite des justificatifs spécifiques : acte de mariage ou PACS et preuve du déménagement pour le suivi de conjoint, décision de justice pour le non-paiement de salaire, plainte ou attestation médicale pour le harcèlement moral ou sexuel. Ces documents sont à fournir lors de l'inscription à France Travail.",
      },
    },
    {
      '@type': 'Question',
      name: "Que se passe-t-il si France Travail refuse ma demande après une démission ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "En cas de refus initial, vous pouvez demander un réexamen de votre dossier après 121 jours de chômage non indemnisé. Une commission paritaire régionale (IPR) examinera votre situation et pourra accorder l'ARE à titre exceptionnel si vous avez activement cherché un emploi pendant ces 4 mois.",
      },
    },
    {
      '@type': 'Question',
      name: "La démission pour création d'entreprise donne-t-elle droit au chômage ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pas directement. Si vous démissionnez pour créer une entreprise et que le projet n'aboutit pas dans les 3 ans, vous pouvez alors demander l'ARE à condition de vous inscrire à France Travail dans les 3 mois suivant la fin de l'activité. Vous devrez justifier de la création et de la cessation de l'activité.",
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: "Démission légitime et chômage", item: 'https://www.monchomage.fr/demission-legitime' },
  ],
}

export default function DemissionLegitime() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}D&eacute;mission l&eacute;gitime et ch&ocirc;mage
      </nav>

      <div className="mt-4 mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
        <span className="font-semibold text-amber-900">Vous avez 55&nbsp;ans et plus&nbsp;?</span>{' '}
        <Link href="/demission-legitime-senior" className="text-amber-700 underline hover:text-amber-900">
          Voir les sp&eacute;cificit&eacute;s senior (ARE 36&nbsp;mois, exemples chiffr&eacute;s) &rarr;
        </Link>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Ch&ocirc;mage apr&egrave;s D&eacute;mission 2026&nbsp;: Les Cas de D&eacute;mission
        L&eacute;gitime
      </h1>

      <div className="mt-8 space-y-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            La r&egrave;gle g&eacute;n&eacute;rale&nbsp;: la d&eacute;mission ne donne pas
            droit au ch&ocirc;mage
          </h2>
          <p className="mt-3">
            En principe, la d&eacute;mission est une rupture <em>volontaire</em> du contrat
            de travail &agrave; l&apos;initiative du salari&eacute;. Elle n&apos;est donc pas
            assimil&eacute;e &agrave; une perte involontaire d&apos;emploi et n&apos;ouvre
            pas droit &agrave; l&apos;allocation d&apos;aide au retour &agrave;
            l&apos;emploi (ARE). France Travail refusera la demande d&apos;indemnisation
            d&apos;un d&eacute;missionnaire classique, quel que soit son niveau de salaire
            ant&eacute;rieur ou le nombre d&apos;ann&eacute;es de cotisation.
          </p>
          <p className="mt-3">
            Il existe n&eacute;anmoins deux exceptions importantes&nbsp;: les{' '}
            <strong>cas de d&eacute;mission l&eacute;gitime</strong> list&eacute;s par le
            r&egrave;glement d&apos;assurance ch&ocirc;mage (trait&eacute;s sur cette page),
            et la <strong>d&eacute;mission pour reconversion professionnelle</strong>{' '}
            valid&eacute;e par une commission paritaire interprofessionnelle r&eacute;gionale
            (CPIR), qui fait l&apos;objet d&apos;une page d&eacute;di&eacute;e.
          </p>
          <p className="mt-3">
            Dans tous les cas, les conditions g&eacute;n&eacute;rales d&apos;&eacute;ligibilit&eacute;
            s&apos;appliquent&nbsp;: avoir travaill&eacute; au moins{' '}
            <strong>{ARE_PARAMS.dureeMinJours} jours (6 mois)</strong> au cours des{' '}
            {ARE_PARAMS.moisRefMoins55ans} derniers mois, &ecirc;tre inscrit &agrave; France
            Travail et rechercher activement un emploi.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Les cas de d&eacute;mission l&eacute;gitime reconnus par l&apos;Un&eacute;dic
          </h2>
          <p className="mt-3">
            Le r&egrave;glement d&apos;assurance ch&ocirc;mage (articles 2 et annexes) liste
            des situations pr&eacute;cises dans lesquelles la d&eacute;mission est
            consid&eacute;r&eacute;e comme l&eacute;gitime et ouvre droit &agrave; l&apos;ARE
            dans les m&ecirc;mes conditions qu&apos;un licenciement.
          </p>

          <h3 className="mt-5 text-xl font-semibold text-slate-900">
            Suivi du conjoint ou partenaire de PACS
          </h3>
          <p className="mt-2">
            Vous d&eacute;missionnez pour suivre votre conjoint (mari&eacute;, pacs&eacute;
            ou concubin stable) qui change de lieu de r&eacute;sidence pour des raisons
            professionnelles (mutation, nouvel emploi). Le d&eacute;m&eacute;nagement doit
            avoir &eacute;t&eacute; r&eacute;alis&eacute; et la r&eacute;sidence commune
            &eacute;tablie. Justificatif&nbsp;: acte de mariage ou PACS, preuve du
            d&eacute;m&eacute;nagement (contrat de bail, facture EDF), document prouvant
            le changement de situation professionnelle du conjoint.
          </p>

          <h3 className="mt-5 text-xl font-semibold text-slate-900">
            Non-paiement du salaire
          </h3>
          <p className="mt-2">
            L&apos;employeur n&apos;a pas pay&eacute; les salaires d&ucirc;s. La d&eacute;mission
            est l&eacute;gitime si le non-paiement est attest&eacute; par une d&eacute;cision
            du conseil de prud&apos;hommes ou un proc&egrave;s-verbal d&apos;huissier. Une
            simple lettre de relance ne suffit pas&nbsp;: une d&eacute;marche juridique est
            n&eacute;cessaire pour constituer le dossier.
          </p>

          <h3 className="mt-5 text-xl font-semibold text-slate-900">
            Actes d&eacute;lictueux de l&apos;employeur
          </h3>
          <p className="mt-2">
            Harc&egrave;lement moral ou sexuel attest&eacute; (plainte d&eacute;pos&eacute;e
            aupr&egrave;s du parquet ou d&eacute;cision de justice), violences physiques ou
            discriminations caract&eacute;ris&eacute;es li&eacute;es &agrave; l&apos;origine,
            au sexe, au handicap ou &agrave; toute autre caract&eacute;ristique prot&eacute;g&eacute;e.
            Depuis 2020, les victimes de <strong>violences conjugales</strong> contraintes
            de quitter leur emploi pour assurer leur s&eacute;curit&eacute; peuvent
            &eacute;galement b&eacute;n&eacute;ficier de l&apos;ARE.
          </p>

          <h3 className="mt-5 text-xl font-semibold text-slate-900">
            Modification unilat&eacute;rale du contrat de travail
          </h3>
          <p className="mt-2">
            L&apos;employeur a impos&eacute; une modification d&apos;un &eacute;l&eacute;ment
            <em> essentiel</em> du contrat sans l&apos;accord du salari&eacute;&nbsp;: baisse
            de salaire, r&eacute;trogradation de qualification, changement de lieu de travail
            impliquant une mobilit&eacute; g&eacute;ographique significative non pr&eacute;vue
            au contrat. Le refus du salari&eacute; d&apos;accepter cette modification et sa
            d&eacute;mission cons&eacute;cutive sont alors consid&eacute;r&eacute;s comme
            une d&eacute;mission l&eacute;gitime.
          </p>

          <h3 className="mt-5 text-xl font-semibold text-slate-900">
            Retour &agrave; l&apos;emploi apr&egrave;s une longue absence et d&eacute;mission
            rapide
          </h3>
          <p className="mt-2">
            Si vous avez repris un emploi apr&egrave;s une p&eacute;riode de formation ou
            d&apos;inactivit&eacute; et que vous d&eacute;missionnez de ce poste dans les
            65 jours suivant la reprise, la d&eacute;mission peut &ecirc;tre reconnue
            l&eacute;gitime. Ce cas vise notamment les salari&eacute;s qui ont accept&eacute;
            un emploi par urgence et qui ne trouvaient pas les conditions de travail
            conformes &agrave; ce qui avait &eacute;t&eacute; convenu.
          </p>

          <h3 className="mt-5 text-xl font-semibold text-slate-900">
            Cr&eacute;ation ou reprise d&apos;entreprise
          </h3>
          <p className="mt-2">
            Vous d&eacute;missionnez pour cr&eacute;er ou reprendre une entreprise. Si le
            projet &eacute;choue dans les 3 ans et que vous vous inscrivez &agrave; France
            Travail dans les 3 mois suivant la cessation d&apos;activit&eacute;, l&apos;ARE
            peut &ecirc;tre accord&eacute;e. Justificatifs&nbsp;: extrait Kbis ou d&eacute;claration
            au CFE, preuves de cessation d&apos;activit&eacute;.
          </p>

          <h3 className="mt-5 text-xl font-semibold text-slate-900">
            D&eacute;mission pour suivre une formation CPF
          </h3>
          <p className="mt-2">
            Depuis 2019, un salari&eacute; qui d&eacute;missionne pour suivre une formation
            inscrite dans son Compte Personnel de Formation (CPF) peut, sous certaines
            conditions, pr&eacute;tendre &agrave; l&apos;ARE. Le projet de formation doit
            &ecirc;tre valid&eacute; au pr&eacute;alable par une commission paritaire
            interprofessionnelle r&eacute;gionale (CPIR). C&apos;est un dispositif distinct
            des d&eacute;missions l&eacute;gitimes classiques.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            La proc&eacute;dure en cas de d&eacute;mission non l&eacute;gitime&nbsp;: le
            r&eacute;examen
          </h2>
          <p className="mt-3">
            Si votre d&eacute;mission ne correspond pas &agrave; l&apos;un des cas
            l&eacute;gitimes reconnus, France Travail refusera l&apos;ARE. Ce refus
            n&apos;est pas d&eacute;finitif. Apr&egrave;s{' '}
            <strong>121 jours (4 mois) de ch&ocirc;mage non indemnis&eacute;</strong>, vous
            pouvez soumettre votre dossier &agrave; une instance paritaire
            r&eacute;gionale (IPR) pour r&eacute;examen.
          </p>
          <p className="mt-3">
            La commission peut accorder l&apos;ARE &agrave; titre exceptionnel si deux
            conditions sont r&eacute;unies&nbsp;: vous avez activement recherch&eacute; un
            emploi pendant ces 4 mois (justificatifs &agrave; apporter&nbsp;: candidatures,
            r&eacute;ponses d&apos;employeurs, etc.) et vous vous trouvez dans une situation
            de pr&eacute;carit&eacute; av&eacute;r&eacute;e. Ce r&eacute;examen n&apos;est
            pas automatique&nbsp;: vous devez en faire la demande explicitement aupr&egrave;s
            de votre conseiller France Travail. M&ecirc;me sans allocation, inscrivez-vous
            d&egrave;s le premier jour pour ne pas perdre le b&eacute;n&eacute;fice de
            l&apos;accompagnement et ne pas retarder le d&eacute;but des 121 jours.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul de l&apos;ARE en cas de d&eacute;mission l&eacute;gitime
          </h2>
          <p className="mt-3">
            Une fois la d&eacute;mission l&eacute;gitime reconnue, le calcul de l&apos;ARE
            est <strong>strictement identique</strong> &agrave; celui d&apos;un licenciement
            ou d&apos;une rupture conventionnelle&nbsp;: aucune p&eacute;nalit&eacute; sur
            le montant ni sur la dur&eacute;e. France Travail d&eacute;termine votre salaire
            journalier de r&eacute;f&eacute;rence (SJR) sur les{' '}
            {ARE_PARAMS.moisRefMoins55ans} derniers mois ({ARE_PARAMS.moisRefPlus55ans} mois
            pour les 55 ans et plus) et applique les m&ecirc;mes formules&nbsp;: la plus
            &eacute;lev&eacute;e entre {Math.round(ARE_PARAMS.tauxFormule1 * 100)}&nbsp;% du
            SJR + partie fixe et {Math.round(ARE_PARAMS.tauxFormule2 * 100)}&nbsp;% du SJR,
            dans les m&ecirc;mes limites de plancher et de plafond.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Estimez votre ARE</h2>
        <p className="mt-2 text-slate-600">
          Si votre d&eacute;mission est reconnue l&eacute;gitime, le calcul est identique &agrave;
          celui d&apos;un licenciement. Renseignez votre salaire brut mensuel, vos mois
          travaill&eacute;s et votre &acirc;ge.
        </p>
        <div className="mt-4">
          <CalculateurARE />
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-900">Questions fr&eacute;quentes</h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900">
              Peut-on toucher le ch&ocirc;mage apr&egrave;s une d&eacute;mission&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              En principe non. Mais les cas de d&eacute;mission l&eacute;gitime (suivi du
              conjoint, non-paiement de salaire, modification unilat&eacute;rale du contrat,
              violences conjugales&hellip;) donnent acc&egrave;s &agrave; l&apos;ARE dans les
              m&ecirc;mes conditions qu&apos;un licenciement.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Comment prouver que sa d&eacute;mission est l&eacute;gitime&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Chaque cas n&eacute;cessite des justificatifs sp&eacute;cifiques&nbsp;: acte de
              mariage ou PACS et preuve du d&eacute;m&eacute;nagement pour le suivi de
              conjoint, d&eacute;cision de justice pour le non-paiement de salaire, plainte ou
              attestation m&eacute;dicale pour le harc&egrave;lement. &Agrave; fournir lors de
              l&apos;inscription &agrave; France Travail.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Que se passe-t-il si France Travail refuse ma demande&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Apr&egrave;s 121 jours de ch&ocirc;mage non indemnis&eacute;, vous pouvez
              demander un r&eacute;examen &agrave; l&apos;IPR (instance paritaire
              r&eacute;gionale). L&apos;ARE peut &ecirc;tre accord&eacute;e &agrave; titre
              exceptionnel si vous avez activement cherch&eacute; un emploi pendant ces
              4 mois.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              La d&eacute;mission pour cr&eacute;ation d&apos;entreprise donne-t-elle droit
              au ch&ocirc;mage&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Pas directement. Si le projet &eacute;choue dans les 3 ans, vous pouvez demander
              l&apos;ARE &agrave; condition de vous inscrire &agrave; France Travail dans les
              3 mois suivant la fin de l&apos;activit&eacute;.
            </p>
          </div>
        </div>
      </section>

      <nav className="mt-12 border-t border-slate-200 pt-6">
        <p className="mb-3 text-sm font-medium text-slate-600">Pages li&eacute;es</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/rupture-conventionnelle" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Rupture conventionnelle
          </Link>
          <Link href="/abandon-de-poste" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Abandon de poste
          </Link>
          <Link href="/" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Calculateur ARE
          </Link>
        </div>
      </nav>
    </main>
  )
}
