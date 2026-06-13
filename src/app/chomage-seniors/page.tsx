import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurARE from '@/components/CalculateurARE'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Chomage senior 2025 : jusqu'a 36 mois d'ARE apres 55 ans",
  description: "55 ans et plus au chomage ? Duree ARE allongee, impact retraite et arbitrage RC expliques. Calculez vos droits avec exemples.",
  alternates: {
    canonical: 'https://www.monchomage.fr/chomage-seniors',
  },
}

// Tous les seuils et durées viennent de ARE_PARAMS
const dureeMaxSeniorsMois = Math.round(ARE_PARAMS.dureeMax50ansEtPlusJours / ARE_PARAMS.joursParMois)
const dureeMaxJeunesMois = Math.round(ARE_PARAMS.dureeMaxMoins50ansJours / ARE_PARAMS.joursParMois)
const periodeRefSeniorsMois = ARE_PARAMS.moisRefPlus55ans
const periodeRefNormaleMois = ARE_PARAMS.moisRefMoins55ans

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Quelle est la durée maximale de chômage après 50 ans ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Les demandeurs d'emploi de 50 ans et plus au moment de la rupture de leur contrat bénéficient d'une durée d'indemnisation maximale de ${dureeMaxSeniorsMois} mois (${ARE_PARAMS.dureeMax50ansEtPlusJours} jours), contre ${dureeMaxJeunesMois} mois pour les moins de 50 ans. Cette durée est conditionnée à avoir travaillé au moins ${dureeMaxSeniorsMois} mois au cours des ${ARE_PARAMS.moisRefPlus55ans} derniers mois.`,
      },
    },
    {
      '@type': 'Question',
      name: "La dégressivité s'applique-t-elle aux chômeurs seniors ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Non pour les 55 ans et plus. Les allocataires qui ont atteint 55 ans au moment où la dégressivité se déclencherait (au ${ARE_PARAMS.joursAvantDegressivite + 1}e jour) sont totalement exonérés de la réduction de ${Math.round((1 - ARE_PARAMS.coeffDegressivite) * 100)}%. Pour les 50-54 ans, la dégressivité s'applique dans les conditions normales si l'allocation journalière dépasse ${euros(ARE_PARAMS.seuilDegressiviteAJ)}.`,
      },
    },
    {
      '@type': 'Question',
      name: "Comment est calculé le SJR pour un senior de plus de 55 ans ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Pour les allocataires de 55 ans et plus, la période de référence pour calculer le salaire journalier de référence (SJR) est étendue à ${periodeRefSeniorsMois} mois (3 ans), contre ${periodeRefNormaleMois} mois pour les moins de 55 ans. Cette extension permet de lisser les éventuelles périodes d'activité réduite ou de temps partiel en fin de carrière.`,
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on cumuler retraite progressive et ARE ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, l'ARE et la retraite progressive ne sont pas cumulables. En revanche, vous pouvez cumuler ARE et pension de réversion, ou ARE et invalidité de 1er groupe sous conditions. Si vous percevez une retraite complète (base + complémentaire), le droit à l'ARE cesse.",
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: "Chômage seniors", item: 'https://www.monchomage.fr/chomage-seniors' },
  ],
}

export default function ChomagesSeniors() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}Ch&ocirc;mage s&eacute;niors
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Ch&ocirc;mage S&eacute;niors 2026&nbsp;: Droits ARE &agrave; 50, 55 et 57&nbsp;Ans
      </h1>

      <div className="mt-8 space-y-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Les s&eacute;niors b&eacute;n&eacute;ficient de droits renforc&eacute;s
          </h2>
          <p className="mt-3">
            Le r&egrave;glement d&apos;assurance ch&ocirc;mage pr&eacute;voit des dispositions
            sp&eacute;cifiques pour les demandeurs d&apos;emploi plus &acirc;g&eacute;s,
            refl&eacute;tant la difficult&eacute; structurellement plus grande du retour
            &agrave; l&apos;emploi apr&egrave;s 50 ans. Ces dispositions favorables jouent
            sur trois leviers principaux&nbsp;: la <strong>dur&eacute;e
            d&apos;indemnisation</strong>, la <strong>p&eacute;riode de
            r&eacute;f&eacute;rence</strong> pour le calcul du SJR, et
            l&apos;<strong>exon&eacute;ration de d&eacute;gressivit&eacute;</strong>.
          </p>
          <p className="mt-3">
            Ces avantages s&apos;appuient sur deux seuils d&apos;&acirc;ge cl&eacute;s,
            d&eacute;termin&eacute;s &agrave; la date de rupture du contrat de
            travail&nbsp;: <strong>50 ans</strong> (dur&eacute;e maximale &eacute;tendue)
            et <strong>{ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans</strong> (p&eacute;riode
            de r&eacute;f&eacute;rence &eacute;tendue et exon&eacute;ration de
            d&eacute;gressivit&eacute;).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Tableau r&eacute;capitulatif des droits par &acirc;ge
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">&Acirc;ge &agrave; la rupture</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">P&eacute;riode de r&eacute;f&eacute;rence SJR</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Dur&eacute;e max</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">D&eacute;gressivit&eacute;</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Moins de 50 ans</td>
                  <td className="border border-slate-200 px-4 py-2">{periodeRefNormaleMois} mois</td>
                  <td className="border border-slate-200 px-4 py-2">{dureeMaxJeunesMois} mois ({ARE_PARAMS.dureeMaxMoins50ansJours} j)</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">Oui si AJ &gt; {euros(ARE_PARAMS.seuilDegressiviteAJ)}/j</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">50 &agrave; 54 ans</td>
                  <td className="border border-slate-200 px-4 py-2">{periodeRefNormaleMois} mois</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold text-blue-800">{dureeMaxSeniorsMois} mois ({ARE_PARAMS.dureeMax50ansEtPlusJours} j)</td>
                  <td className="border border-slate-200 px-4 py-2 text-red-700">Oui si AJ &gt; {euros(ARE_PARAMS.seuilDegressiviteAJ)}/j</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-semibold text-blue-900">{ARE_PARAMS.ageLimiteDegressivite} ans et plus</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold text-blue-900">{periodeRefSeniorsMois} mois (&eacute;tendu)</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold text-blue-900">{dureeMaxSeniorsMois} mois ({ARE_PARAMS.dureeMax50ansEtPlusJours} j)</td>
                  <td className="border border-slate-200 px-4 py-2 font-semibold text-green-700">Exon&eacute;r&eacute;</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            L&apos;&acirc;ge est appr&eacute;ci&eacute; &agrave; la date de fin du contrat
            de travail. La dur&eacute;e maximale ne peut exceder la dur&eacute;e cotis&eacute;e
            (ex&nbsp;: 18 mois cotis&eacute;s = 18 mois d&apos;indemnisation, m&ecirc;me si
            le plafond est {dureeMaxSeniorsMois} mois).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Dur&eacute;e maximale &eacute;tendue d&egrave;s 50 ans
          </h2>
          <p className="mt-3">
            D&egrave;s lors que vous avez au moins <strong>50 ans &agrave; la date de fin
            de votre contrat</strong>, la dur&eacute;e maximale d&apos;indemnisation passe
            de {dureeMaxJeunesMois}&nbsp;mois &agrave;{' '}
            <strong>{dureeMaxSeniorsMois}&nbsp;mois ({ARE_PARAMS.dureeMax50ansEtPlusJours}
            &nbsp;jours)</strong>.
          </p>
          <p className="mt-3">
            Pour atteindre ce plafond, il faut avoir cotis&eacute;{' '}
            {dureeMaxSeniorsMois}&nbsp;mois (c&apos;est-&agrave;-dire avoir travaill&eacute;
            au moins {ARE_PARAMS.dureeMax50ansEtPlusJours}&nbsp;jours) au cours des{' '}
            {periodeRefNormaleMois}&nbsp;derniers mois si vous avez entre 50 et
            54&nbsp;ans, ou au cours des {periodeRefSeniorsMois}&nbsp;derniers mois si
            vous avez {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans ou plus.
          </p>
          <p className="mt-3">
            <strong>Exemple&nbsp;:</strong> un demandeur d&apos;emploi de 52 ans avec
            20&nbsp;mois de cotisations sera indemnis&eacute; 20&nbsp;mois (pas
            {' '}{dureeMaxSeniorsMois}). Ce n&apos;est que s&apos;il justifie d&apos;au moins
            {' '}{dureeMaxSeniorsMois}&nbsp;mois de travail qu&apos;il atteint le plafond.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            P&eacute;riode de r&eacute;f&eacute;rence &eacute;tendue &agrave; 55 ans
          </h2>
          <p className="mt-3">
            Pour les allocataires de {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans et plus, la
            p&eacute;riode de r&eacute;f&eacute;rence servant au calcul du salaire journalier
            de r&eacute;f&eacute;rence (SJR) est &eacute;tendue &agrave;{' '}
            <strong>{periodeRefSeniorsMois}&nbsp;mois (3 ans)</strong>, contre{' '}
            {periodeRefNormaleMois}&nbsp;mois pour les moins de 55&nbsp;ans.
          </p>
          <p className="mt-3">
            Cet allongement r&eacute;pond &agrave; une r&eacute;alit&eacute; de la
            fin de carri&egrave;re&nbsp;: de nombreux seniors ont accept&eacute; un temps
            partiel, un poste moins bien r&eacute;mun&eacute;r&eacute; ou des conges
            partiels dans les ann&eacute;es pr&eacute;c&eacute;dant la rupture. En
            &eacute;tendant la fen&ecirc;tre de calcul, France Travail peut capturer des
            ann&eacute;es o&ugrave; le salaire &eacute;tait plus &eacute;lev&eacute; et
            proposer un SJR plus repr&eacute;sentatif de la v&eacute;ritable carri&egrave;re.
          </p>
          <p className="mt-3">
            <strong>Attention&nbsp;:</strong> la p&eacute;riode de r&eacute;f&eacute;rence
            &eacute;tendue joue dans les deux sens. Si vous avez eu une promotion et
            une hausse de salaire dans les {periodeRefNormaleMois} derniers mois, la
            p&eacute;riode &eacute;tendue diluera cette hausse avec des ann&eacute;es
            ant&eacute;rieures o&ugrave; vous &eacute;tiez moins bien pay&eacute;. Dans
            ce cas sp&eacute;cifique, la p&eacute;riode de r&eacute;f&eacute;rence
            standard &eacute;tait plus favorable, mais elle ne s&apos;applique plus
            automatiquement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Exon&eacute;ration totale de d&eacute;gressivit&eacute; &agrave;{' '}
            {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans
          </h2>
          <p className="mt-3">
            Les allocataires qui ont atteint <strong>{ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans
            au moment o&ugrave; la d&eacute;gressivit&eacute; se d&eacute;clencherait</strong>{' '}
            (c&apos;est-&agrave;-dire au {ARE_PARAMS.joursAvantDegressivite + 1}e jour
            d&apos;indemnisation) sont totalement exon&eacute;r&eacute;s de la
            r&eacute;duction de{' '}
            {Math.round((1 - ARE_PARAMS.coeffDegressivite) * 100)}&nbsp;%. Ils per&ccedil;oivent
            leur allocation initiale int&eacute;gralement jusqu&apos;&agrave; la fin de
            leurs droits.
          </p>
          <p className="mt-3">
            <strong>Cas particulier de l&apos;&acirc;ge charniere&nbsp;:</strong> si vous
            avez {ARE_PARAMS.ageLimiteDegressivite - 1}&nbsp;ans au d&eacute;but de
            l&apos;indemnisation et que vous atteignez {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans
            avant le {ARE_PARAMS.joursAvantDegressivite + 1}e jour (soit environ en cours
            du 7e mois), vous &ecirc;tes exon&eacute;r&eacute;. En pratique, si votre
            anniversaire est dans les 6 premiers mois de votre p&eacute;riode de
            ch&ocirc;mage, renseignez-vous aupr&egrave;s de France Travail qui
            recalculera votre situation &agrave; votre date d&apos;anniversaire.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Cumul ARE et retraite&nbsp;: ce qu&apos;il faut savoir
          </h2>
          <p className="mt-3">
            Le cumul ARE et pension de retraite est strictement encadr&eacute;&nbsp;:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>
              <strong>Retraite compl&egrave;te liquidée (base + compl&eacute;mentaire)&nbsp;:</strong>{' '}
              le droit &agrave; l&apos;ARE cesse imm&eacute;diatement. Vous ne pouvez
              pas pr&eacute;tendre &agrave; l&apos;ARE si vous avez liquid&eacute; vos
              retraites de base et compl&eacute;mentaire.
            </li>
            <li>
              <strong>Retraite progressive&nbsp;:</strong> incompatible avec l&apos;ARE.
              La retraite progressive est une forme de transition entre activit&eacute;
              &agrave; temps partiel et retraite totale. Elle ne se cumule pas avec
              l&apos;ARE.
            </li>
            <li>
              <strong>Pension de r&eacute;version&nbsp;:</strong> cumulable avec l&apos;ARE
              sous conditions de ressources fix&eacute;es par chaque caisse de retraite.
            </li>
            <li>
              <strong>Invalidit&eacute; 1er groupe&nbsp;:</strong> cumulable avec l&apos;ARE
              si vous &ecirc;tes reconnu apte &agrave; l&apos;emploi &agrave; temps partiel.
              L&apos;invalidit&eacute; 2e et 3e groupes est en revanche incompatible avec
              l&apos;ARE (inapte au travail pr&eacute;sum&eacute;).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Ce qu&apos;il se passe &agrave; 62 ans&nbsp;: la prorogation des droits
          </h2>
          <p className="mt-3">
            Si vos droits ARE arrivent &agrave; expiration et que vous avez atteint
            <strong> 62 ans</strong> sans avoir rempli les conditions de la retraite &agrave;
            taux plein, France Travail peut maintenir l&apos;indemnisation jusqu&apos;
            &agrave; ce que vous atteigniez l&apos;&acirc;ge l&eacute;gal de la retraite
            &agrave; taux plein (conditions li&eacute;es &agrave; la dur&eacute;e de
            cotisation). Cette prorogation exige d&apos;avoir cotis&eacute; au moins
            12 ans et d&apos;&ecirc;tre indemnis&eacute; depuis au moins un an.
          </p>
          <p className="mt-3">
            Cette mesure &mdash; parfois appel&eacute;e &laquo;&nbsp;maintien pour
            raisons d&apos;&acirc;ge&nbsp;&raquo; &mdash; est distincte des droits
            habituels&nbsp;: elle est octroy&eacute;e sur demande et n&eacute;cessite
            une instruction sp&eacute;cifique de France Travail. Anticipez cette
            d&eacute;marche plusieurs mois avant l&apos;&eacute;puisement de vos droits.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Calculez votre ARE senior
        </h2>
        <p className="mt-2 text-slate-600">
          Renseignez votre &acirc;ge, votre salaire et vos mois cotis&eacute;s&nbsp;:
          le calculateur applique automatiquement les r&egrave;gles seniors
          (p&eacute;riode de r&eacute;f&eacute;rence &eacute;tendue, dur&eacute;e
          maximale et exon&eacute;ration de d&eacute;gressivit&eacute;).
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
              Quelle est la dur&eacute;e maximale de ch&ocirc;mage apr&egrave;s 50 ans&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              {dureeMaxSeniorsMois}&nbsp;mois ({ARE_PARAMS.dureeMax50ansEtPlusJours}
              &nbsp;jours), contre {dureeMaxJeunesMois}&nbsp;mois pour les moins de
              50&nbsp;ans. Condition&nbsp;: avoir cotiis&eacute; au moins {dureeMaxSeniorsMois}
              &nbsp;mois au cours des {periodeRefNormaleMois} derniers mois (ou{' '}
              {periodeRefSeniorsMois} mois pour les 55&nbsp;ans et plus).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              La d&eacute;gressivit&eacute; s&apos;applique-t-elle aux s&eacute;niors&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Non pour les {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans et plus au jour{' '}
              {ARE_PARAMS.joursAvantDegressivite + 1}. Les 50-54 ans sont soumis &agrave;
              la d&eacute;gressivit&eacute; dans les m&ecirc;mes conditions que les moins
              de 50 ans si leur AJ d&eacute;passe {euros(ARE_PARAMS.seuilDegressiviteAJ)}/jour.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Comment est calcul&eacute; le SJR pour un senior de plus de 55&nbsp;ans&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Sur une p&eacute;riode de r&eacute;f&eacute;rence &eacute;tendue &agrave;{' '}
              {periodeRefSeniorsMois}&nbsp;mois (3 ans), contre {periodeRefNormaleMois}&nbsp;mois
              pour les moins de 55&nbsp;ans. Cela permet de lisser les r&eacute;ductions
              de temps de travail en fin de carri&egrave;re.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Peut-on cumuler retraite progressive et ARE&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Non. La retraite progressive est incompatible avec l&apos;ARE. La retraite
              compl&egrave;te liquid&eacute;e (base + compl&eacute;mentaire) met fin au
              droit ARE. En revanche, pension de r&eacute;version et invalidit&eacute;
              1er groupe sont cumulables sous conditions.
            </p>
          </div>
        </div>
      </section>

      <nav className="mt-12 border-t border-slate-200 pt-6">
        <p className="mb-3 text-sm font-medium text-slate-600">Pages li&eacute;es</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/degressivite-chomage" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            D&eacute;gressivit&eacute; du ch&ocirc;mage
          </Link>
          <Link href="/duree-indemnisation" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Dur&eacute;e d&apos;indemnisation
          </Link>
          <Link href="/rupture-conventionnelle" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Rupture conventionnelle
          </Link>
          <Link href="/rupture-conventionnelle-senior" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            RC senior
          </Link>
          <Link href="/licenciement-economique-senior" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Licenciement &eacute;co senior
          </Link>
          <Link href="/" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Calculateur ARE
          </Link>
        </div>
      </nav>
    </main>
  )
}
