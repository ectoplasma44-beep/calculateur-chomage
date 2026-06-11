import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurARE from '@/components/CalculateurARE'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Dégressivité du Chômage 2026 — Qui est Concerné et Quand ?",
  description: "La dégressivité de l'ARE réduit l'allocation de 30% à partir du 7e mois. Qui est concerné, quel seuil, quelle date exacte ? Réponses et exemples chiffrés 2026.",
  alternates: {
    canonical: 'https://www.monchomage.fr/degressivite-chomage',
  },
}

// Calcul du tableau de dégressivité dérivé uniquement de ARE_PARAMS
const tauxReduction = Math.round((1 - ARE_PARAMS.coeffDegressivite) * 100)
const joursDebutDegressivite = ARE_PARAMS.joursAvantDegressivite + 1 // jour 183

function calculerAJ(salaireMensuel: number): number {
  const sjr = salaireMensuel / ARE_PARAMS.joursParMoisSJR
  const f1 = ARE_PARAMS.tauxFormule1 * sjr + ARE_PARAMS.partieFix
  const f2 = ARE_PARAMS.tauxFormule2 * sjr
  const ajBrut = Math.max(f1, f2)
  const ajPlafonne = Math.min(ajBrut, ARE_PARAMS.plafondTauxSJR * sjr)
  return Math.max(ajPlafonne, ARE_PARAMS.allocationMinimale)
}

function calculerAJApres(aj: number): number {
  const ajReduit = aj * ARE_PARAMS.coeffDegressivite
  return Math.max(ajReduit, ARE_PARAMS.seuilDegressiviteAJ)
}

const EXEMPLES_DEGRESSIVITE = [5000, 6000, 7000, 8000, 10000].map((salaire) => {
  const aj = Number(calculerAJ(salaire).toFixed(2))
  const ajApres = Number(calculerAJApres(aj).toFixed(2))
  const plancher = ajApres === ARE_PARAMS.seuilDegressiviteAJ
  return { salaire, aj, ajApres, plancher }
})

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Qu'est-ce que la dégressivité de l'ARE ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `La dégressivité est une réduction de ${tauxReduction}% de l'allocation chômage qui s'applique à partir du ${joursDebutDegressivite}e jour d'indemnisation (après ${ARE_PARAMS.joursAvantDegressivite} jours, soit environ 6 mois). Elle ne s'applique qu'aux allocataires de moins de ${ARE_PARAMS.ageLimiteDegressivite} ans dont l'allocation journalière brute dépasse ${ARE_PARAMS.seuilDegressiviteAJ} €/jour. L'allocation ne descend jamais en dessous de ${ARE_PARAMS.seuilDegressiviteAJ} €/jour.`,
      },
    },
    {
      '@type': 'Question',
      name: `À partir de quel salaire est-on concerné par la dégressivité ?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Vous êtes concerné par la dégressivité si votre allocation journalière brute dépasse ${ARE_PARAMS.seuilDegressiviteAJ} €/jour et que vous avez moins de ${ARE_PARAMS.ageLimiteDegressivite} ans. En 2026, cela correspond approximativement à un ancien salaire brut mensuel supérieur à 5 200 € environ. En dessous de ce niveau, la réduction s'applique mais l'allocation est ramenée au plancher de ${ARE_PARAMS.seuilDegressiviteAJ} €/jour.`,
      },
    },
    {
      '@type': 'Question',
      name: "La dégressivité s'applique-t-elle à tout le monde ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Non. Les allocataires âgés de ${ARE_PARAMS.ageLimiteDegressivite} ans ou plus au moment où la dégressivité serait déclenchée sont totalement exemptés. Les personnes dont l'allocation journalière est inférieure ou égale à ${ARE_PARAMS.seuilDegressiviteAJ} €/jour ne subissent aucune réduction (elles sont déjà au plancher).`,
      },
    },
    {
      '@type': 'Question',
      name: "La dégressivité est-elle suspendue si on retrouve un emploi en activité réduite ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, l'activité réduite ne suspend pas le compteur des jours d'indemnisation. Si vous cumulez activité réduite et ARE, les jours indemnisés continuent de s'accumuler. La dégressivité s'applique dès que le compteur dépasse 182 jours indemnisés, quel que soit l'échelonnement dans le temps.",
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: "Dégressivité du chômage", item: 'https://www.monchomage.fr/degressivite-chomage' },
  ],
}

export default function DegressiviteChomage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}D&eacute;gressivit&eacute; du ch&ocirc;mage
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        D&eacute;gressivit&eacute; du Ch&ocirc;mage 2026&nbsp;: Qui Est
        Concern&eacute;&nbsp;? Quand&nbsp;? Combien&nbsp;?
      </h1>

      <div className="mt-8 space-y-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Qu&apos;est-ce que la d&eacute;gressivit&eacute; de l&apos;ARE&nbsp;?
          </h2>
          <p className="mt-3">
            La d&eacute;gressivit&eacute; est un m&eacute;canisme qui r&eacute;duit
            automatiquement le montant de l&apos;ARE apr&egrave;s une certaine dur&eacute;e
            d&apos;indemnisation. Elle a &eacute;t&eacute; introduite pour inciter les
            demandeurs d&apos;emploi &agrave; accepter plus rapidement une offre
            d&apos;emploi, en particulier ceux qui per&ccedil;oivent des allocations
            &eacute;lev&eacute;es.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  D&eacute;clenchement
                </dt>
                <dd className="mt-1 text-lg font-bold text-slate-900">
                  Jour {joursDebutDegressivite}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  R&eacute;duction
                </dt>
                <dd className="mt-1 text-lg font-bold text-slate-900">
                  &minus;{tauxReduction}&nbsp;%
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Seuil + plancher
                </dt>
                <dd className="mt-1 text-lg font-bold text-slate-900">
                  {euros(ARE_PARAMS.seuilDegressiviteAJ)}/jour
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  &Acirc;ge exon&eacute;r&eacute;
                </dt>
                <dd className="mt-1 text-lg font-bold text-slate-900">
                  &ge; {ARE_PARAMS.ageLimiteDegressivite} ans
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Les deux conditions pour &ecirc;tre concern&eacute;
          </h2>
          <p className="mt-3">
            La d&eacute;gressivit&eacute; ne s&apos;applique que si <strong>les deux
            conditions suivantes sont remplies simultan&eacute;ment</strong>&nbsp;:
          </p>
          <ol className="mt-3 list-decimal space-y-3 pl-6">
            <li>
              <strong>Vous avez moins de {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans</strong>{' '}
              &agrave; la date de d&eacute;clenchement de la d&eacute;gressivit&eacute;
              (c&apos;est-&agrave;-dire au {joursDebutDegressivite}e jour). Si vous
              f&ecirc;tez vos {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans entre le
              d&eacute;but de l&apos;indemnisation et le {joursDebutDegressivite}e jour,
              vous b&eacute;n&eacute;ficiez de l&apos;exon&eacute;ration.
            </li>
            <li>
              <strong>
                Votre allocation journali&egrave;re brute initiale d&eacute;passe{' '}
                {euros(ARE_PARAMS.seuilDegressiviteAJ)}/jour
              </strong>{' '}
              (seuil en vigueur depuis le 01/07/2025, apr&egrave;s la revalorisaton de
              +0,5&nbsp;%). Si votre AJ est inf&eacute;rieure ou &eacute;gale &agrave; ce
              seuil, la r&eacute;duction s&apos;appliquerait mais l&apos;allocation serait
              maintenue &agrave; ce plancher, donc sans r&eacute;duction effective.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Le calcul de la r&eacute;duction
          </h2>
          <p className="mt-3">
            &Agrave; partir du {joursDebutDegressivite}e jour d&apos;indemnisation, la
            formule appliqu&eacute;e est&nbsp;:
          </p>
          <div className="mt-4 rounded-xl bg-red-50 p-4 font-mono text-red-900">
            <p>AJ apr&egrave;s = AJ initiale &times; {ARE_PARAMS.coeffDegressivite}</p>
            <p className="mt-1">
              Si AJ apr&egrave;s &lt; {euros(ARE_PARAMS.seuilDegressiviteAJ)}&nbsp;:
              AJ apr&egrave;s = {euros(ARE_PARAMS.seuilDegressiviteAJ)} (plancher)
            </p>
          </div>
          <p className="mt-3">
            Le plancher de {euros(ARE_PARAMS.seuilDegressiviteAJ)}/jour joue un
            r&ocirc;le important pour les allocations moyennes&nbsp;: une AJ
            l&eacute;g&egrave;rement sup&eacute;rieure au seuil sera ramen&eacute;e
            au plancher plut&ocirc;t que r&eacute;duite de {tauxReduction}&nbsp;%. Pour
            les tr&egrave;s hautes allocations, la r&eacute;duction de {tauxReduction}&nbsp;%
            s&apos;applique pleinement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Tableau d&apos;impact selon le salaire
          </h2>
          <p className="mt-3">
            Les valeurs ci-dessous sont calcul&eacute;es &agrave; partir des param&egrave;tres
            Unédic en vigueur au 01/07/2025&nbsp;: taux {ARE_PARAMS.tauxFormule1}/{ARE_PARAMS.tauxFormule2},
            partie fixe {euros(ARE_PARAMS.partieFix)}, coefficient de d&eacute;gressivit&eacute;{' '}
            {ARE_PARAMS.coeffDegressivite}, plancher {euros(ARE_PARAMS.seuilDegressiviteAJ)}.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-slate-200 px-4 py-2 text-left">Salaire brut / mois</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">AJ initiale</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">AJ apr&egrave;s j.{joursDebutDegressivite}</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">R&eacute;duction effective</th>
                  <th className="border border-slate-200 px-4 py-2 text-left">Plancher</th>
                </tr>
              </thead>
              <tbody>
                {EXEMPLES_DEGRESSIVITE.map(({ salaire, aj, ajApres, plancher }) => {
                  const reduction = Number(((1 - ajApres / aj) * 100).toFixed(1))
                  return (
                    <tr key={salaire} className="odd:bg-white even:bg-slate-50">
                      <td className="border border-slate-200 px-4 py-2 font-medium">{euros(salaire)}</td>
                      <td className="border border-slate-200 px-4 py-2">{euros(aj)}/j</td>
                      <td className="border border-slate-200 px-4 py-2 font-bold text-red-700">{euros(ajApres)}/j</td>
                      <td className="border border-slate-200 px-4 py-2">&minus;{reduction}&nbsp;%</td>
                      <td className="border border-slate-200 px-4 py-2 text-slate-600">
                        {plancher ? "Oui (plancher actif)" : "Non"}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Calculs arrondis au centime. SJR = salaire &divide; {ARE_PARAMS.joursParMoisSJR} jours.
            Plafond SJR : {Math.round(ARE_PARAMS.plafondTauxSJR * 100)}&nbsp;% du SJR.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Quand commence exactement le d&eacute;compte des {ARE_PARAMS.joursAvantDegressivite}
            &nbsp;jours&nbsp;?
          </h2>
          <p className="mt-3">
            Le compteur d&eacute;marre au <strong>premier jour d&apos;indemnisation
            effective</strong>, c&apos;est-&agrave;-dire apr&egrave;s le diff&eacute;r&eacute;
            d&apos;attente obligatoire de 7 jours, le diff&eacute;r&eacute; indemnis&eacute;
            li&eacute; aux indemnit&eacute;s de d&eacute;part et le cas &eacute;ch&eacute;ant
            le diff&eacute;r&eacute; sp&eacute;cifique (jusqu&apos;&agrave; 150 jours pour
            les ruptures conventionnelles avec indemnit&eacute;s sup&eacute;rieures au
            minimum l&eacute;gal).
          </p>
          <p className="mt-3">
            Les jours d&apos;activit&eacute; r&eacute;duite comptent dans le d&eacute;compte,
            m&ecirc;me s&apos;ils ne sont pas tous indemnis&eacute;s. La d&eacute;gressivit&eacute;
            n&apos;est donc pas report&eacute;e par l&apos;activit&eacute; r&eacute;duite.
            En revanche, une <strong>maladie ou maternit&eacute;</strong> suspend
            temporairement le d&eacute;compte&nbsp;: les jours d&apos;arr&ecirc;t ne sont
            pas comptabilis&eacute;s dans les {ARE_PARAMS.joursAvantDegressivite} jours,
            repoussant d&apos;autant la date de d&eacute;gressivit&eacute;.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Strat&eacute;gies face &agrave; la d&eacute;gressivit&eacute;
          </h2>
          <p className="mt-3">
            Plusieurs options permettent de r&eacute;duire l&apos;impact de la
            d&eacute;gressivit&eacute;&nbsp;:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>
              <strong>Reprendre une activit&eacute; r&eacute;duite</strong> avant le
              {' '}({joursDebutDegressivite}e jour) n&apos;emp&ecirc;che pas la
              d&eacute;gressivit&eacute; mais permet de cumuler des revenus
              suppl&eacute;mentaires.
            </li>
            <li>
              <strong>Formation longue</strong>&nbsp;: si vous entrez en formation
              pr&eacute;scrite par France Travail, vous pouvez percevoir l&apos;Aide au
              retour &agrave; l&apos;emploi-formation (AREF), qui peut dans certains cas
              &ecirc;tre calcul&eacute;e sur une base diff&eacute;rente.
            </li>
            <li>
              <strong>Contr&ocirc;ler l&apos;&acirc;ge au {joursDebutDegressivite}e
              jour</strong>&nbsp;: si vous avez {ARE_PARAMS.ageLimiteDegressivite - 1}
              &nbsp;ans au d&eacute;but de votre indemnisation et que vous f&ecirc;tez vos{' '}
              {ARE_PARAMS.ageLimiteDegressivite} ans avant le {joursDebutDegressivite}e
              jour, vous &ecirc;tes exon&eacute;r&eacute;.
            </li>
          </ul>
        </section>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Calculez votre ARE et anticipez la d&eacute;gressivit&eacute;
        </h2>
        <p className="mt-2 text-slate-600">
          Le calculateur indique votre allocation journali&egrave;re initiale et,
          si vous &ecirc;tes concern&eacute;, le montant r&eacute;duit apr&egrave;s le
          jour {joursDebutDegressivite}.
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
              Qu&apos;est-ce que la d&eacute;gressivit&eacute; de l&apos;ARE&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Une r&eacute;duction de {tauxReduction}&nbsp;% de l&apos;allocation appliqu&eacute;e
              &agrave; partir du {joursDebutDegressivite}e jour pour les moins de{' '}
              {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans dont l&apos;AJ initiale d&eacute;passe{' '}
              {euros(ARE_PARAMS.seuilDegressiviteAJ)}/jour. L&apos;allocation ne descend jamais
              sous ce plancher.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              &Agrave; partir de quel salaire est-on concern&eacute;&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Lorsque l&apos;AJ initiale d&eacute;passe {euros(ARE_PARAMS.seuilDegressiviteAJ)}/jour.
              En pratique, cela correspond &agrave; un ancien salaire brut mensuel de l&apos;ordre
              de 5&nbsp;200&nbsp;&euro; ou plus.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              La d&eacute;gressivit&eacute; s&apos;applique-t-elle &agrave; tout le monde&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Non. Les allocataires de {ARE_PARAMS.ageLimiteDegressivite}&nbsp;ans ou plus au
              jour {joursDebutDegressivite} sont totalement exon&eacute;r&eacute;s. Les moins
              de 55 ans dont l&apos;AJ est &eacute;gale ou inf&eacute;rieure au plancher ne
              subissent pas de r&eacute;duction effective.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              L&apos;activit&eacute; r&eacute;duite suspend-elle la d&eacute;gressivit&eacute;&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Non. Les jours indemnis&eacute;s en activit&eacute; r&eacute;duite s&apos;accumulent
              dans le d&eacute;compte. Seule une maladie ou maternit&eacute; suspend le
              compteur.
            </p>
          </div>
        </div>
      </section>

      <nav className="mt-12 border-t border-slate-200 pt-6">
        <p className="mb-3 text-sm font-medium text-slate-600">Pages li&eacute;es</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/chomage-seniors" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Ch&ocirc;mage et s&eacute;niors
          </Link>
          <Link href="/duree-indemnisation" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Dur&eacute;e d&apos;indemnisation
          </Link>
          <Link href="/" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Calculateur ARE
          </Link>
        </div>
      </nav>
    </main>
  )
}
