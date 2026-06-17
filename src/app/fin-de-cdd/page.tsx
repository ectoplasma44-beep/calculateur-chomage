import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurARE from '@/components/CalculateurARE'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros, pourcent } from '@/lib/format'

export const metadata: Metadata = {
  title: "Fin de CDD 2026 : ARE, montant et delai de carence",
  description: "CDD termine ? Calculez votre ARE, duree d'indemnisation et carence en 2 minutes. Exemple chiffre inclus.",
  alternates: {
    canonical: 'https://www.monchomage.fr/fin-de-cdd',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "A-t-on droit au chômage après la fin d'un CDD ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui, sous conditions. Il faut avoir travaillé au moins 6 mois (${ARE_PARAMS.dureeMinJours} jours) au cours des ${ARE_PARAMS.moisRefMoins55ans} derniers mois, être involontairement privé d'emploi (terme du CDD échu), être inscrit à France Travail et être en recherche active d'emploi.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on cumuler plusieurs CDD courts pour ouvrir des droits au chômage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui. France Travail additionne toutes les périodes d'emploi (CDD successifs, temps partiel, missions d'intérim) sur les ${ARE_PARAMS.moisRefMoins55ans} derniers mois pour vérifier si le seuil de 6 mois est atteint.`,
      },
    },
    {
      '@type': 'Question',
      name: 'La prime de précarité (10%) est-elle prise en compte dans le calcul du chômage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Non. La prime de précarité est exclue du salaire de référence servant à calculer l'ARE. Elle n'allonge pas non plus le différé d'indemnisation. En revanche, les salaires bruts versés pendant le CDD sont bien intégrés dans le calcul.`,
      },
    },
    {
      '@type': 'Question',
      name: "Que se passe-t-il si on refuse la transformation d'un CDD en CDI ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Depuis la réforme de 2023, refuser un CDI proposé à l'issue d'un CDD aux mêmes conditions de poste et de rémunération prive du droit à l'ARE. France Travail doit en être informé par l'employeur.`,
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
      name: 'Chômage après fin de CDD',
      item: 'https://www.monchomage.fr/fin-de-cdd',
    },
  ],
}

export default function FinDeCDD() {
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
        {' '}&rsaquo;{' '}Ch&ocirc;mage apr&egrave;s fin de CDD
      </nav>

      <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
        Vous &ecirc;tes int&eacute;rimaire&nbsp;?{' '}
        <Link href="/chomage-interimaire" className="font-semibold underline hover:text-blue-900">
          Voir les sp&eacute;cificit&eacute;s int&eacute;rim&nbsp;&rarr;
        </Link>
      </div>

      <div className="mt-3 rounded-lg border border-purple-200 bg-purple-50 px-4 py-3 text-sm text-purple-800">
        Vous &ecirc;tes alternant ou apprenti&nbsp;?{' '}
        <Link href="/chomage-alternant-apprenti" className="font-semibold underline hover:text-purple-900">
          Voir les droits ARE pour les alternants&nbsp;&rarr;
        </Link>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Ch&ocirc;mage apr&egrave;s Fin de CDD&nbsp;: Vos Droits et le Calcul de l&apos;ARE 2026
      </h1>

      <div className="mt-8 space-y-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            La fin de CDD ouvre-t-elle droit au ch&ocirc;mage&nbsp;?
          </h2>
          <p className="mt-3">
            Oui. La fin normale d&apos;un contrat &agrave; dur&eacute;e d&eacute;termin&eacute;e
            (CDD) &mdash; c&apos;est-&agrave;-dire lorsque le terme &eacute;chu arrive sans que
            le contrat soit renouvel&eacute; ou transform&eacute; &mdash; est assimil&eacute;e
            &agrave; une perte involontaire d&apos;emploi. Elle ouvre droit &agrave; l&apos;ARE
            sous les conditions habituelles&nbsp;: avoir travaill&eacute; au moins{' '}
            <strong>{ARE_PARAMS.dureeMinJours} jours (6 mois)</strong> au cours des{' '}
            {ARE_PARAMS.moisRefMoins55ans} derniers mois (910 heures constituent une alternative
            &eacute;quivalente dans certains cas), &ecirc;tre inscrit &agrave; France Travail et
            rechercher activement un emploi.
          </p>
          <p className="mt-3">
            <strong>Cas particulier depuis 2023&nbsp;:</strong> si l&apos;employeur propose de
            transformer le CDD en CDI aux m&ecirc;mes conditions de poste et de
            r&eacute;mun&eacute;ration et que le salari&eacute; refuse, il perd son droit &agrave;
            l&apos;ARE. Cette r&egrave;gle s&apos;applique lorsque l&apos;employeur a
            pr&eacute;alablement inform&eacute; France Travail du refus. C&apos;est une
            &eacute;volution majeure par rapport &agrave; la r&egrave;glementation
            ant&eacute;rieure&nbsp;: renseignez-vous aupr&egrave;s de France Travail si vous
            &ecirc;tes dans cette situation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            La prime de pr&eacute;carit&eacute; (indemnit&eacute; de fin de contrat)
          </h2>
          <p className="mt-3">
            &Agrave; la fin d&apos;un CDD, l&apos;employeur verse g&eacute;n&eacute;ralement une
            prime de pr&eacute;carit&eacute; &eacute;gale &agrave; <strong>10&nbsp;%</strong> du
            total des salaires bruts per&ccedil;us pendant le CDD. Ce montant compense
            l&apos;absence de s&eacute;curit&eacute; de l&apos;emploi li&eacute;e au contrat
            temporaire. Il existe plusieurs exceptions &agrave; ce versement&nbsp;:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>CDD saisonnier ou usage constant dans le secteur&nbsp;;</li>
            <li>CDD suivi imm&eacute;diatement d&apos;un CDI avec le m&ecirc;me employeur&nbsp;;</li>
            <li>Contrat d&apos;apprentissage ou de professionnalisation&nbsp;;</li>
            <li>Contrats aid&eacute;s (PEC, emploi d&apos;avenir, etc.).</li>
          </ul>
          <p className="mt-3">
            Cette prime n&apos;entre pas dans le calcul du salaire journalier de
            r&eacute;f&eacute;rence (SJR) qui sert de base &agrave; votre ARE. Elle est
            consid&eacute;r&eacute;e comme une indemnit&eacute; de rupture et non comme un
            salaire.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Le d&eacute;lai de carence apr&egrave;s une fin de CDD
          </h2>
          <p className="mt-3">
            Comme pour tout d&eacute;marrage d&apos;indemnisation, un d&eacute;lai d&apos;attente
            incompressible de <strong>7 jours</strong> s&apos;applique. &Agrave; cela peut
            s&apos;ajouter un diff&eacute;r&eacute; li&eacute; aux jours de cong&eacute;s
            pay&eacute;s non pris&nbsp;: si vous n&apos;avez pas soldé tous vos CP avant la fin
            du CDD, France Travail calcule un diff&eacute;r&eacute; proportionnel.
          </p>
          <p className="mt-3">
            <strong>La prime de pr&eacute;carit&eacute; n&apos;allonge pas le
            diff&eacute;r&eacute;</strong>&nbsp;: contrairement &agrave; l&apos;indemnit&eacute;
            supra-l&eacute;gale d&apos;une rupture conventionnelle, elle est explicitement exclue
            du calcul du diff&eacute;r&eacute; sp&eacute;cifique. Dans la plupart des cas
            d&apos;une fin de CDD normale, le premier versement arrive donc environ 1 mois
            apr&egrave;s la fin du contrat (d&eacute;lai d&apos;attente + d&eacute;lai de
            traitement administratif).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Calcul de l&apos;ARE apr&egrave;s un CDD
          </h2>
          <p className="mt-3">
            Le calcul est identique &agrave; celui des autres motifs de rupture. France Travail
            additionne l&apos;ensemble de vos salaires bruts des{' '}
            {ARE_PARAMS.moisRefMoins55ans} derniers mois &mdash; y compris les salaires de
            CDD pr&eacute;c&eacute;dents, les missions d&apos;int&eacute;rim et m&ecirc;me les
            p&eacute;riodes en CDI si elles entrent dans la fen&ecirc;tre &mdash; puis divise
            par le nombre de jours calendaires de la p&eacute;riode pour obtenir le SJR. Les
            formules s&apos;appliquent ensuite&nbsp;:
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
            La formule la plus favorable est retenue, dans la limite du plancher de{' '}
            {euros(ARE_PARAMS.allocationMinimale)} par jour et du plafond de{' '}
            {pourcent(ARE_PARAMS.plafondTauxSJR)} du SJR. L&apos;allocation mensuelle
            est l&apos;allocation journali&egrave;re &times; {ARE_PARAMS.joursParMois} jours.
          </p>
          <p className="mt-3">
            <strong>Cas particulier des CDD courts&nbsp;:</strong> si votre dur&eacute;e
            totale de travail sur les {ARE_PARAMS.moisRefMoins55ans} derniers mois est
            inf&eacute;rieure &agrave; 6 mois, aucun droit n&apos;est ouvert. En cas de CDD
            successifs (m&ecirc;me employeur ou non), toutes les p&eacute;riodes travail&eacute;es
            s&apos;additionnent pour atteindre le seuil. Par exemple, deux CDD de 4 mois
            chacun &eacute;tal&eacute;s sur 20 mois permettent bien d&apos;atteindre les 6 mois
            requis.
          </p>
          <p className="mt-3">
            <strong>Note sur le plafond de salaire&nbsp;:</strong> les salaires pris en
            compte sont plafonn&eacute;s &agrave;{' '}
            {ARE_PARAMS.plafondSalaireRefMensuel.toLocaleString('fr-FR')}&nbsp;&euro; brut
            par mois, ce qui concerne tr&egrave;s peu de salari&eacute;s en CDD.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">Estimez votre ARE apr&egrave;s un CDD</h2>
        <p className="mt-2 text-slate-600">
          Indiquez votre salaire brut mensuel moyen sur la p&eacute;riode travaill&eacute;e,
          le nombre de mois cumul&eacute;s sur les {ARE_PARAMS.moisRefMoins55ans} derniers mois
          et votre &acirc;ge.
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
              A-t-on droit au ch&ocirc;mage apr&egrave;s la fin d&apos;un CDD&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Oui, sous conditions. Il faut avoir travaill&eacute; au moins 6 mois
              ({ARE_PARAMS.dureeMinJours} jours) au cours des {ARE_PARAMS.moisRefMoins55ans} derniers
              mois, &ecirc;tre involontairement priv&eacute; d&apos;emploi (terme du CDD
              &eacute;chu), &ecirc;tre inscrit &agrave; France Travail et &ecirc;tre en
              recherche active d&apos;emploi.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Peut-on cumuler plusieurs CDD courts pour ouvrir des droits au ch&ocirc;mage&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Oui. France Travail additionne toutes les p&eacute;riodes d&apos;emploi (CDD
              successifs, temps partiel, missions d&apos;int&eacute;rim) sur les{' '}
              {ARE_PARAMS.moisRefMoins55ans} derniers mois pour v&eacute;rifier si le seuil de
              6 mois est atteint.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              La prime de pr&eacute;carit&eacute; (10&nbsp;%) est-elle prise en compte dans le
              calcul du ch&ocirc;mage&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Non. La prime de pr&eacute;carit&eacute; est exclue du salaire de
              r&eacute;f&eacute;rence servant &agrave; calculer l&apos;ARE et n&apos;allonge
              pas le diff&eacute;r&eacute; d&apos;indemnisation. Les salaires bruts
              r&eacute;guliers sont bien int&eacute;gr&eacute;s dans le calcul.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Que se passe-t-il si on refuse la transformation d&apos;un CDD en CDI&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Depuis la r&eacute;forme de 2023, refuser un CDI propos&eacute; &agrave; l&apos;issue
              d&apos;un CDD aux m&ecirc;mes conditions de poste et de r&eacute;mun&eacute;ration
              prive du droit &agrave; l&apos;ARE. France Travail doit en &ecirc;tre inform&eacute;
              par l&apos;employeur.
            </p>
          </div>
        </div>
      </section>

      <nav className="mt-12 border-t border-slate-200 pt-6">
        <p className="mb-3 text-sm font-medium text-slate-600">Pages li&eacute;es</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/rupture-conventionnelle"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700"
          >
            Rupture conventionnelle
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
