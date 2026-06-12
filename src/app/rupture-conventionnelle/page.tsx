import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurARE from '@/components/CalculateurARE'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros, pourcent, dateFr } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Chômage après Rupture Conventionnelle 2026 — Calculez votre ARE',
  description:
    "Calculez votre allocation chômage après une rupture conventionnelle. Conditions, délai de carence, montant ARE et durée d'indemnisation. Formules officielles Unédic 2026.",
  alternates: {
    canonical: 'https://www.monchomage.fr/rupture-conventionnelle',
  },
}

const sjrSeuilDegressivite = Math.round(
  (ARE_PARAMS.seuilDegressiviteAJ / ARE_PARAMS.tauxFormule2) * 100
) / 100

const salaireMensuelSeuilDegressivite = Math.round(
  sjrSeuilDegressivite * ARE_PARAMS.joursParMoisSJR
)

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Peut-on toucher le chômage après une rupture conventionnelle ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui. La rupture conventionnelle homologuée ouvre droit à l'ARE (allocation chômage) dans les mêmes conditions qu'un licenciement, à condition d'avoir travaillé au moins 6 mois au cours des ${ARE_PARAMS.moisRefMoins55ans} derniers mois et de s'inscrire à France Travail.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le délai avant de toucher le chômage après une rupture conventionnelle ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Un délai minimum de 7 jours s'applique toujours. S'y ajoutent un différé lié aux congés payés non pris et, si l'indemnité de rupture dépasse le minimum légal, un différé spécifique pouvant aller jusqu'à 150 jours. Au total, le premier versement intervient souvent 1 à 6 mois après la fin du contrat.`,
      },
    },
    {
      '@type': 'Question',
      name: "L'indemnité de rupture conventionnelle est-elle prise en compte dans le calcul du chômage ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Non. L'indemnité de rupture conventionnelle n'entre pas dans le calcul du salaire journalier de référence (SJR), qui sert de base au calcul de l'ARE. En revanche, la partie supra-légale de cette indemnité peut allonger le différé d'indemnisation.`,
      },
    },
    {
      '@type': 'Question',
      name: 'La rupture conventionnelle donne-t-elle droit à une durée de chômage plus longue ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Non. La durée d'indemnisation est identique quel que soit le motif de rupture : elle dépend uniquement du nombre de mois travaillés au cours de la période de référence, dans la limite de ${ARE_PARAMS.dureeMaxMoins50ansJours} jours pour les moins de 50 ans et ${ARE_PARAMS.dureeMax50ansEtPlusJours} jours pour les 50 ans et plus.`,
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Accueil',
      item: 'https://www.monchomage.fr',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Rupture conventionnelle et chômage',
      item: 'https://www.monchomage.fr/rupture-conventionnelle',
    },
  ],
}

export default function RuptureConventionnelle() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}Rupture conventionnelle et ch&ocirc;mage
      </nav>

      <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
        Vous &ecirc;tes cadre&nbsp;?{' '}
        <Link href="/rupture-conventionnelle-cadre" className="font-semibold underline hover:text-blue-900">
          Voir les sp&eacute;cificit&eacute;s cadre&nbsp;&rarr;
        </Link>
      </div>

      <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Vous avez 55 ans et plus&nbsp;?{' '}
        <Link href="/rupture-conventionnelle-senior" className="font-semibold underline hover:text-amber-900">
          Voir les droits ARE senior et l&apos;impact retraite&nbsp;&rarr;
        </Link>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Ch&ocirc;mage apr&egrave;s Rupture Conventionnelle&nbsp;: Calcul de l&apos;ARE 2026
      </h1>

      <div className="mt-8 space-y-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            La rupture conventionnelle ouvre-t-elle droit au ch&ocirc;mage&nbsp;?
          </h2>
          <p className="mt-3">
            Oui&nbsp;: la rupture conventionnelle (article L.1237-11 du Code du travail)
            est l&apos;une des rares formes de s&eacute;paration o&ugrave; le salari&eacute; part
            d&apos;un commun accord avec son employeur <em>sans perdre</em> ses droits &agrave;
            l&apos;assurance ch&ocirc;mage. Une fois l&apos;accord homologu&eacute; par la DREETS,
            la rupture est assimil&eacute;e &agrave; une perte involontaire d&apos;emploi et ouvre
            droit &agrave; l&apos;allocation d&apos;aide au retour &agrave; l&apos;emploi (ARE).
          </p>
          <p className="mt-3">
            Pour en b&eacute;n&eacute;ficier, il faut&nbsp;:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              avoir travaill&eacute; au moins{' '}
              <strong>{ARE_PARAMS.dureeMinJours} jours (6 mois)</strong> au cours des{' '}
              {ARE_PARAMS.moisRefMoins55ans} derniers mois pr&eacute;c&eacute;dant la fin du
              contrat (ou des {ARE_PARAMS.moisRefPlus55ans} derniers mois si vous avez 55 ans ou
              plus)&nbsp;;
            </li>
            <li>
              s&apos;inscrire comme demandeur d&apos;emploi aupr&egrave;s de France Travail dans
              les 12 mois suivant la date de rupture&nbsp;;
            </li>
            <li>
              r&eacute;sider en France, &ecirc;tre apte &agrave; travailler et rechercher
              activement un emploi.
            </li>
          </ul>
          <p className="mt-3">
            La d&eacute;mission volontaire, elle, ne permet pas en g&eacute;n&eacute;ral d&apos;obtenir
            l&apos;ARE (sauf cas de d&eacute;mission l&eacute;gitime list&eacute;s par
            l&apos;Un&eacute;dic). C&apos;est pourquoi la rupture conventionnelle est souvent
            privil&eacute;gi&eacute;e lorsque les deux parties souhaitent mettre fin au contrat
            &agrave; l&apos;amiable.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Le d&eacute;lai de carence apr&egrave;s une rupture conventionnelle
          </h2>
          <p className="mt-3">
            L&apos;indemnisation ne d&eacute;marre pas imm&eacute;diatement apr&egrave;s la fin du
            contrat. Trois composantes s&apos;appliquent successivement avant le premier versement&nbsp;:
          </p>

          <h3 className="mt-4 text-xl font-semibold text-slate-900">
            1. Le d&eacute;lai d&apos;attente de 7 jours
          </h3>
          <p className="mt-2">
            Il s&apos;applique <strong>syst&eacute;matiquement</strong> &agrave; toutes les
            ouvertures de droits, quel que soit le motif de rupture. Il n&apos;est pas
            r&eacute;cup&eacute;rable.
          </p>

          <h3 className="mt-4 text-xl font-semibold text-slate-900">
            2. Le diff&eacute;r&eacute; d&apos;indemnisation cong&eacute;s pay&eacute;s
          </h3>
          <p className="mt-2">
            Si vous avez des jours de cong&eacute;s pay&eacute;s non pris au moment de la rupture,
            France Travail calcule un diff&eacute;r&eacute;&nbsp;: nombre de jours de CP non pris
            &times; votre r&eacute;mun&eacute;ration journ&apos;ali&egrave;re, divis&eacute; par
            91. Ce diff&eacute;r&eacute; peut repr&eacute;senter plusieurs semaines
            suppl&eacute;mentaires.
          </p>

          <h3 className="mt-4 text-xl font-semibold text-slate-900">
            3. Le diff&eacute;r&eacute; sp&eacute;cifique li&eacute; &agrave; l&apos;indemnit&eacute;
            supra-l&eacute;gale
          </h3>
          <p className="mt-2">
            L&apos;indemnit&eacute; l&eacute;gale de rupture conventionnelle est calcul&eacute;e
            comme l&apos;indemnit&eacute; l&eacute;gale de licenciement (1/4 de mois par ann&eacute;e
            d&apos;anc&ienneté pour les 10 premi&egrave;res ann&eacute;es, 1/3 au-del&agrave;).
            Si l&apos;indemnit&eacute; n&eacute;goci&eacute;e d&eacute;passe ce montant l&eacute;gal,
            l&apos;exc&eacute;dent g&eacute;n&egrave;re un diff&eacute;r&eacute;&nbsp;: exc&eacute;dent
            divis&eacute; par 91,25 = nombre de jours de diff&eacute;r&eacute;,{' '}
            <strong>plafonn&eacute; &agrave; 150 jours</strong> (75 jours en cas de licenciement
            &eacute;conomique). Ce plafond de 150 jours repr&eacute;sente environ 5 mois d&apos;attente
            suppl&eacute;mentaire dans les cas les plus extr&ecirc;mes.
          </p>
          <p className="mt-2">
            En pratique, pour une rupture conventionnelle avec indemnit&eacute; proche du minimum
            l&eacute;gal, le d&eacute;lai total avant le premier versement est g&eacute;n&eacute;ralement
            de 1 &agrave; 2 mois (7 jours + diff&eacute;r&eacute; CP). Pour des indemnit&eacute;s
            n&eacute;goci&eacute;es &eacute;lev&eacute;es, il peut atteindre 6 mois.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Comment est calcul&eacute;e votre allocation ch&ocirc;mage apr&egrave;s une rupture
            conventionnelle&nbsp;?
          </h2>
          <p className="mt-3">
            Le calcul de l&apos;ARE est <strong>identique quel que soit le motif de rupture</strong>.
            France Travail d&eacute;termine votre salaire journalier de r&eacute;f&eacute;rence
            (SJR) &agrave; partir de l&apos;ensemble de vos salaires bruts des{' '}
            {ARE_PARAMS.moisRefMoins55ans} derniers mois (hors indemnit&eacute;s de rupture, hors
            remboursements de frais), puis applique la formule la plus favorable entre&nbsp;:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong>Formule 1</strong>&nbsp;: {pourcent(ARE_PARAMS.tauxFormule1)} du SJR +{' '}
              {euros(ARE_PARAMS.partieFix)} par jour
            </li>
            <li>
              <strong>Formule 2</strong>&nbsp;: {pourcent(ARE_PARAMS.tauxFormule2)} du SJR
            </li>
          </ul>
          <p className="mt-3">
            Le r&eacute;sultat est encadr&eacute; par un plancher de{' '}
            {euros(ARE_PARAMS.allocationMinimale)} par jour et un plafond de{' '}
            {pourcent(ARE_PARAMS.plafondTauxSJR)} du SJR. L&apos;allocation mensuelle correspond
            &agrave; l&apos;allocation journali&egrave;re multipli&eacute;e par{' '}
            {ARE_PARAMS.joursParMois} jours fixes, depuis la mensualisation d&apos;avril 2025.
          </p>
          <p className="mt-3">
            <strong>Important&nbsp;:</strong> l&apos;indemnit&eacute; de rupture conventionnelle
            elle-m&ecirc;me n&apos;est <em>pas</em> int&eacute;gr&eacute;e au calcul du SJR,
            car il s&apos;agit d&apos;une indemnit&eacute; de rupture et non d&apos;un salaire.
            Utilisez le calculateur ci-dessous avec votre salaire brut mensuel habituel.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Quelle est la dur&eacute;e d&apos;indemnisation&nbsp;?
          </h2>
          <p className="mt-3">
            La r&egrave;gle est la m&ecirc;me quel que soit le motif de rupture&nbsp;: un jour
            cotis&eacute; ouvre droit &agrave; un jour indemnis&eacute;. La dur&eacute;e
            minimale est de{' '}
            <strong>{ARE_PARAMS.dureeMinJours} jours (6 mois)</strong> et la dur&eacute;e
            maximale est de&nbsp;:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong>{ARE_PARAMS.dureeMaxMoins50ansJours} jours (12 mois)</strong> pour les
              moins de 50 ans&nbsp;;
            </li>
            <li>
              <strong>{ARE_PARAMS.dureeMax50ansEtPlusJours} jours (24 mois)</strong> pour les
              50 ans et plus.
            </li>
          </ul>
          <p className="mt-3">
            Pour les 55 ans et plus, la p&eacute;riode de r&eacute;f&eacute;rence s&apos;allonge
            &agrave; {ARE_PARAMS.moisRefPlus55ans} mois au lieu de{' '}
            {ARE_PARAMS.moisRefMoins55ans}, ce qui permet d&apos;accumuler davantage de jours
            cotis&eacute;s et d&apos;atteindre plus facilement le plafond de{' '}
            {ARE_PARAMS.dureeMax50ansEtPlusJours} jours.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Rupture conventionnelle et d&eacute;gressivit&eacute;
          </h2>
          <p className="mt-3">
            Si votre ancien salaire &eacute;tait &eacute;lev&eacute;&nbsp;&mdash; au-del&agrave;
            d&apos;environ{' '}
            {salaireMensuelSeuilDegressivite.toLocaleString('fr-FR')}&nbsp;&euro; brut par mois,
            ce qui correspond &agrave; un SJR sup&eacute;rieur &agrave;{' '}
            {euros(sjrSeuilDegressivite)}&nbsp;&mdash; et que vous avez moins de{' '}
            {ARE_PARAMS.ageLimiteDegressivite} ans, votre allocation journali&egrave;re sera
            r&eacute;duite de{' '}
            {Math.round((1 - ARE_PARAMS.coeffDegressivite) * 100)}&nbsp;% &agrave; partir du{' '}
            {ARE_PARAMS.joursAvantDegressivite + 1}e jour indemnis&eacute; (d&eacute;but du 7e
            mois). L&apos;allocation r&eacute;duite ne peut toutefois pas descendre sous{' '}
            {euros(ARE_PARAMS.seuilDegressiviteAJ)} par jour. Le calculateur ci-dessous
            indique automatiquement si vous &ecirc;tes concern&eacute; et affiche le montant
            apr&egrave;s d&eacute;gressivit&eacute;.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Simulez votre ARE</h2>
        <p className="mt-2 text-slate-600">
          Renseignez votre salaire brut mensuel habituel (hors indemnit&eacute; de rupture),
          le nombre de mois travaill&eacute;s sur la p&eacute;riode de r&eacute;f&eacute;rence
          et votre &acirc;ge &agrave; la date de fin de contrat.
        </p>
        <div className="mt-4">
          <CalculateurARE />
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-900">
          Questions fr&eacute;quentes sur le ch&ocirc;mage apr&egrave;s rupture
          conventionnelle
        </h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900">
              Peut-on toucher le ch&ocirc;mage apr&egrave;s une rupture conventionnelle&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Oui. La rupture conventionnelle homologu&eacute;e ouvre droit &agrave; l&apos;ARE
              dans les m&ecirc;mes conditions qu&apos;un licenciement, &agrave; condition
              d&apos;avoir travaill&eacute; au moins 6 mois au cours des{' '}
              {ARE_PARAMS.moisRefMoins55ans} derniers mois et de s&apos;inscrire &agrave; France
              Travail.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Quel est le d&eacute;lai avant de toucher le ch&ocirc;mage apr&egrave;s une rupture
              conventionnelle&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Un d&eacute;lai minimum de 7 jours s&apos;applique toujours. S&apos;y ajoutent un
              diff&eacute;r&eacute; li&eacute; aux cong&eacute;s pay&eacute;s non pris et, si
              l&apos;indemnit&eacute; de rupture d&eacute;passe le minimum l&eacute;gal, un
              diff&eacute;r&eacute; sp&eacute;cifique pouvant aller jusqu&apos;&agrave; 150 jours.
              Au total, le premier versement intervient souvent 1 &agrave; 6 mois apr&egrave;s la
              fin du contrat.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              L&apos;indemnit&eacute; de rupture conventionnelle est-elle prise en compte dans le
              calcul du ch&ocirc;mage&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Non. L&apos;indemnit&eacute; de rupture conventionnelle n&apos;entre pas dans le
              calcul du SJR. En revanche, la partie supra-l&eacute;gale peut allonger le
              diff&eacute;r&eacute; d&apos;indemnisation jusqu&apos;&agrave; 150 jours.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              La rupture conventionnelle donne-t-elle droit &agrave; une dur&eacute;e de
              ch&ocirc;mage plus longue&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Non. La dur&eacute;e d&apos;indemnisation d&eacute;pend uniquement du nombre de
              mois travaill&eacute;s, pas du motif de rupture. Maximum {ARE_PARAMS.dureeMaxMoins50ansJours}{' '}
              jours pour les moins de 50 ans, {ARE_PARAMS.dureeMax50ansEtPlusJours} jours pour les
              50 ans et plus.
            </p>
          </div>
        </div>
      </section>

      <nav className="mt-12 border-t border-slate-200 pt-6">
        <p className="mb-3 text-sm font-medium text-slate-600">Pages li&eacute;es</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/fin-de-cdd"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700"
          >
            Ch&ocirc;mage apr&egrave;s fin de CDD
          </Link>
          <Link
            href="/licenciement-economique"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700"
          >
            Licenciement &eacute;conomique
          </Link>
          <Link
            href="/duree-indemnisation"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700"
          >
            Dur&eacute;e d&apos;indemnisation
          </Link>
        </div>
      </nav>
    </main>
  )
}
