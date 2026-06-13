import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurARE from '@/components/CalculateurARE'
import { ARE_PARAMS } from '@/lib/are-parametres'

export const metadata: Metadata = {
  title: "Chômage après Abandon de Poste 2026 — Ce qui a Changé",
  description: "Abandon de poste et chômage en 2026 : la réforme de 2023 a tout changé. Présomption de démission, procédure de 15 jours et droits ARE. Tout comprendre.",
  alternates: {
    canonical: 'https://www.monchomage.fr/abandon-de-poste',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "L'abandon de poste donne-t-il encore droit au chômage en 2026 ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, depuis la réforme du 17 avril 2023. Un salarié qui abandonne son poste sans justification et ne répond pas à la mise en demeure de son employeur sous 15 jours est désormais présumé avoir démissionné. Comme une démission classique, cela ne donne pas droit à l'ARE, sauf cas de démission légitime reconnu.",
      },
    },
    {
      '@type': 'Question',
      name: "Quelle est la procédure exacte de l'employeur en cas d'abandon de poste ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "L'employeur doit envoyer une lettre recommandée avec accusé de réception mettant le salarié en demeure de reprendre son poste ou de justifier son absence. Le salarié dispose de 15 jours calendaires pour répondre. Sans réponse, la présomption de démission s'applique automatiquement, sans procédure de licenciement nécessaire.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on contester une présomption de démission ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, devant le conseil de prud'hommes. Le salarié peut faire valoir que l'abandon de poste était justifié (danger grave et imminent, arrêt maladie, manquement grave de l'employeur). En cas de succès, la rupture est requalifiée en licenciement, ce qui ouvre droit à l'ARE et à des indemnités.",
      },
    },
    {
      '@type': 'Question',
      name: "Que faire si j'ai abandonné mon poste et que je n'ai pas droit au chômage ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Inscrivez-vous quand même à France Travail pour bénéficier de l'accompagnement. Après 121 jours de chômage non indemnisé, vous pouvez demander un réexamen de votre situation à une commission paritaire régionale (IPR), qui peut accorder l'ARE à titre exceptionnel si vous avez activement cherché un emploi.",
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: "Abandon de poste et chômage", item: 'https://www.monchomage.fr/abandon-de-poste' },
  ],
}

export default function AbandonDePoste() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}Abandon de poste et ch&ocirc;mage
      </nav>

      <div className="mt-4 mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
        <span className="font-semibold text-amber-900">Vous avez 55&nbsp;ans et plus&nbsp;?</span>{' '}
        <Link href="/abandon-de-poste-senior" className="text-amber-700 underline hover:text-amber-900">
          Voir les sp&eacute;cificit&eacute;s senior (ARE 36&nbsp;mois, retraite, alternatives &agrave; l&apos;abandon) &rarr;
        </Link>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Abandon de Poste et Ch&ocirc;mage 2026&nbsp;: La R&eacute;forme qui a Tout Chang&eacute;
      </h1>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-900">
          Attention&nbsp;: changement majeur depuis avril 2023
        </p>
        <p className="mt-1 text-sm text-amber-800">
          Depuis la loi n&deg;&nbsp;2023-270 du 14 avril 2023, l&apos;abandon de poste
          ne permet plus d&apos;obtenir le ch&ocirc;mage automatiquement. Un salarié qui
          abandonne son poste sans justification est d&eacute;sormais pr&eacute;sum&eacute;
          avoir d&eacute;missionn&eacute;.
        </p>
      </div>

      <div className="mt-8 space-y-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Qu&apos;est-ce que l&apos;abandon de poste&nbsp;?
          </h2>
          <p className="mt-3">
            L&apos;abandon de poste d&eacute;signe la situation d&apos;un salari&eacute; qui
            cesse de se pr&eacute;senter &agrave; son poste de travail sans autorisation
            pr&eacute;alable ni justification valable (arr&ecirc;t maladie, motif l&eacute;gitime),
            et qui ne r&eacute;pond pas aux mises en demeure de son employeur. Il se
            distingue d&apos;une absence pour maladie ou cong&eacute;, qui sont des cas
            pr&eacute;vus et r&eacute;glement&eacute;s par le droit du travail.
          </p>
          <p className="mt-3">
            <strong>Avant la r&eacute;forme de 2023</strong>, l&apos;abandon de poste
            pla&ccedil;ait l&apos;employeur dans une situation inconfortable&nbsp;: il
            devait engager une proc&eacute;dure de licenciement pour faute grave ou
            s&eacute;rieuse pour rompre officiellement le contrat. Or, tout licenciement
            &mdash; m&ecirc;me pour faute grave &mdash; ouvrait automatiquement droit &agrave;
            l&apos;ARE pour le salari&eacute;. Certains salari&eacute;s utilisaient donc
            l&apos;abandon de poste comme une voie d&eacute;tourn&eacute;e pour quitter
            leur emploi tout en pr&eacute;servant leur droit au ch&ocirc;mage.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            La r&eacute;forme du 17 avril 2023&nbsp;: pr&eacute;somption de d&eacute;mission
          </h2>
          <p className="mt-3">
            La loi n&deg;&nbsp;2023-270 du 14 avril 2023 relative au march&eacute; du travail
            a cr&eacute;&eacute; un nouvel article L.1237-19-1 dans le Code du travail,
            instaurant une <strong>pr&eacute;somption de d&eacute;mission</strong> en cas
            d&apos;abandon de poste. La proc&eacute;dure est strictement encadr&eacute;e&nbsp;:
          </p>

          <ol className="mt-3 list-decimal space-y-3 pl-6">
            <li>
              <strong>&Eacute;tape 1 &mdash; Mise en demeure</strong>&nbsp;: l&apos;employeur
              adresse une lettre recommand&eacute;e avec accusé de r&eacute;ception (ou remise
              en main propre contre d&eacute;charge) au salari&eacute;, lui demandant de
              reprendre son poste ou de justifier son absence.
            </li>
            <li>
              <strong>&Eacute;tape 2 &mdash; D&eacute;lai de r&eacute;ponse</strong>&nbsp;: le
              salari&eacute; dispose de <strong>15 jours calendaires</strong> &agrave; compter
              de la r&eacute;ception de la mise en demeure pour r&eacute;pondre.
            </li>
            <li>
              <strong>&Eacute;tape 3 &mdash; Pr&eacute;somption automatique</strong>&nbsp;: sans
              r&eacute;ponse dans ce d&eacute;lai, le salari&eacute; est pr&eacute;sum&eacute;
              avoir d&eacute;missionn&eacute;. L&apos;employeur n&apos;a pas &agrave; engager
              de proc&eacute;dure disciplinaire.
            </li>
          </ol>

          <p className="mt-3">
            <strong>Cons&eacute;quence directe&nbsp;:</strong> la pr&eacute;somption de
            d&eacute;mission est assimil&eacute;e &agrave; une d&eacute;mission volontaire.
            Elle ne donne <em>pas</em> droit &agrave; l&apos;ARE, contrairement au
            licenciement pour faute qui s&apos;appliquait avant 2023.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Peut-on contester la pr&eacute;somption de d&eacute;mission&nbsp;?
          </h2>
          <p className="mt-3">
            Oui, devant le <strong>conseil de prud&apos;hommes</strong>. Le salari&eacute;
            peut renverser la pr&eacute;somption en prouvant que l&apos;abandon de poste
            &eacute;tait justifi&eacute; par l&apos;un des motifs suivants&nbsp;:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>
              <strong>Situation de danger grave et imminent</strong> (article L.4131-1 du Code
              du travail)&nbsp;: le salari&eacute; avait un motif raisonnable de penser que sa
              vie ou sa sant&eacute; &eacute;tait en danger imm&eacute;diat sur son lieu de
              travail.
            </li>
            <li>
              <strong>Motif m&eacute;dical</strong>&nbsp;: un arr&ecirc;t maladie existait mais
              n&apos;avait pas &eacute;t&eacute; transmis &agrave; l&apos;employeur par
              erreur ou omission involontaire.
            </li>
            <li>
              <strong>Manquement grave de l&apos;employeur</strong>&nbsp;: non-paiement du
              salaire, harc&egrave;lement moral ou sexuel, modification unilat&eacute;rale
              d&apos;un &eacute;l&eacute;ment essentiel du contrat.
            </li>
          </ul>
          <p className="mt-3">
            En cas de succ&egrave;s devant les prud&apos;hommes, la rupture est
            requalifi&eacute;e en <strong>licenciement sans cause r&eacute;elle et
            s&eacute;rieuse</strong>, ce qui ouvre droit &agrave; l&apos;ARE et peut
            donner lieu &agrave; des dommages et int&eacute;r&ecirc;ts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Abandon de poste pour raison m&eacute;dicale ou &eacute;tat de sant&eacute;
          </h2>
          <p className="mt-3">
            Si l&apos;absence est li&eacute;e &agrave; un <strong>arr&ecirc;t de
            travail</strong> d&ucirc;ment prescrit par un m&eacute;decin, ou &agrave; une
            proc&eacute;dure d&apos;inaptitude en cours de reconnaissance par le m&eacute;decin
            du travail, l&apos;employeur ne peut pas d&eacute;clencher la proc&eacute;dure de
            pr&eacute;somption de d&eacute;mission pendant la dur&eacute;e de l&apos;arr&ecirc;t
            ou tant que la proc&eacute;dure d&apos;inaptitude est en cours.
          </p>
          <p className="mt-3">
            <strong>Conseil pratique&nbsp;:</strong> transmettez imm&eacute;diatement votre
            arr&ecirc;t de travail &agrave; votre employeur (id&eacute;alement dans les
            48&nbsp;heures), de pr&eacute;f&eacute;rence par lettre recommand&eacute;e pour
            en garder la trace. Un arr&ecirc;t maladie correctement transmis bloque toute
            proc&eacute;dure de pr&eacute;somption de d&eacute;mission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Que faire si vous avez &eacute;t&eacute; pr&eacute;sum&eacute;
            d&eacute;missionnaire&nbsp;?
          </h2>
          <p className="mt-3">
            M&ecirc;me sans droit imm&eacute;diat &agrave; l&apos;ARE, plusieurs options
            s&apos;offrent &agrave; vous&nbsp;:
          </p>
          <p className="mt-3">
            <strong>Option 1 &mdash; Contestation prud&apos;homale&nbsp;:</strong> si vous
            estimez avoir un motif valable justifiant l&apos;abandon (danger, maladie, faute
            de l&apos;employeur), saisissez le conseil de prud&apos;hommes dans les d&eacute;lais
            (12 mois pour une rupture du contrat de travail). Une r&eacute;orientation en
            licenciement sans cause r&eacute;elle ouvre les droits ARE.
          </p>
          <p className="mt-3">
            <strong>Option 2 &mdash; R&eacute;examen apr&egrave;s 121 jours&nbsp;:</strong>{' '}
            si vous ne contestez pas, inscrivez-vous &agrave; France Travail d&egrave;s que
            possible. Apr&egrave;s 121 jours de ch&ocirc;mage non indemnis&eacute;,
            vous pouvez demander le r&eacute;examen de votre dossier &agrave; une instance
            paritaire r&eacute;gionale (IPR). L&apos;ARE peut &ecirc;tre accord&eacute;e &agrave;
            titre exceptionnel si vous avez activement recherch&eacute; un emploi.
          </p>
          <p className="mt-3">
            <strong>Important&nbsp;:</strong> inscrivez-vous &agrave; France Travail{' '}
            <em>m&ecirc;me sans allocation</em> pour b&eacute;n&eacute;ficier de
            l&apos;accompagnement, et pour d&eacute;buter le d&eacute;compte des 121 jours
            le plus t&ocirc;t possible.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Quelle allocation si les droits sont ouverts&nbsp;?
          </h2>
          <p className="mt-3">
            Si la pr&eacute;somption de d&eacute;mission est contest&eacute;e avec succ&egrave;s
            ou si l&apos;IPR accorde l&apos;ARE apr&egrave;s r&eacute;examen, le calcul de
            l&apos;allocation est identique &agrave; tout autre cas&nbsp;: SJR calcul&eacute;
            sur les {ARE_PARAMS.moisRefMoins55ans} derniers mois, formules Unédic appliqu&eacute;es,
            dur&eacute;e en fonction des mois cotis&eacute;s. Utilisez le calculateur
            ci-dessous pour obtenir une estimation.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Estimez votre ARE si les droits sont ouverts
        </h2>
        <div className="mt-4">
          <CalculateurARE />
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-slate-900">Questions fr&eacute;quentes</h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900">
              L&apos;abandon de poste donne-t-il encore droit au ch&ocirc;mage en 2026&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Non depuis la r&eacute;forme du 17 avril 2023. Sans r&eacute;ponse &agrave; la
              mise en demeure sous 15 jours, le salari&eacute; est pr&eacute;sum&eacute;
              d&eacute;missionnaire et perd son droit &agrave; l&apos;ARE, sauf cas
              l&eacute;gitime reconnu ou d&eacute;cision prud&apos;homale favorable.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Quelle est la proc&eacute;dure exacte en cas d&apos;abandon de poste&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              L&apos;employeur envoie une lettre recommand&eacute;e mettant en demeure le
              salari&eacute; de reprendre son poste ou de justifier son absence. Sans
              r&eacute;ponse dans les 15 jours calendaires, la pr&eacute;somption de
              d&eacute;mission s&apos;applique automatiquement.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Peut-on contester une pr&eacute;somption de d&eacute;mission&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Oui, devant les prud&apos;hommes. Si le motif de l&apos;abandon &eacute;tait
              l&eacute;gitime (danger, maladie, faute de l&apos;employeur), la rupture peut
              &ecirc;tre requalifi&eacute;e en licenciement, ouvrant droit &agrave;
              l&apos;ARE et &agrave; des indemnit&eacute;s.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Que faire si je n&apos;ai pas droit au ch&ocirc;mage apr&egrave;s un abandon de
              poste&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Inscrivez-vous &agrave; France Travail sans attendre pour b&eacute;n&eacute;ficier
              de l&apos;accompagnement et d&eacute;buter le d&eacute;compte des 121 jours.
              Apr&egrave;s ce d&eacute;lai, une instance paritaire r&eacute;gionale peut
              accorder l&apos;ARE &agrave; titre exceptionnel.
            </p>
          </div>
        </div>
      </section>

      <nav className="mt-12 border-t border-slate-200 pt-6">
        <p className="mb-3 text-sm font-medium text-slate-600">Pages li&eacute;es</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/demission-legitime" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            D&eacute;mission l&eacute;gitime
          </Link>
          <Link href="/rupture-conventionnelle" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Rupture conventionnelle
          </Link>
          <Link href="/" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Calculateur ARE
          </Link>
        </div>
      </nav>
    </main>
  )
}
