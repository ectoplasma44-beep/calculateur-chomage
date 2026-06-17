import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurARE from '@/components/CalculateurARE'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros } from '@/lib/format'

export const metadata: Metadata = {
  title: "Cumul Emploi Chômage 2026 — Activité Réduite et ARE",
  description: "Travailler tout en touchant le chômage en 2026 : règles du cumul ARE et activité réduite, calcul des jours non indemnisés et exemple concret.",
  alternates: {
    canonical: 'https://www.monchomage.fr/cumul-emploi-chomage',
  },
}

// Le coefficient 0,70 provient de ARE_PARAMS.tauxMaxJoursNonTravailles
// Il est réutilisé ici car c'est le même coefficient que dans le calcul réglementaire
// Exemple illustratif avec des valeurs pédagogiques
const EXEMPLE = {
  aj: 45,
  salaireMensuel: 900,
  joursParMois: ARE_PARAMS.joursParMois,
  coeff: ARE_PARAMS.tauxMaxJoursNonTravailles,
}
const joursNonIndemnis = Math.ceil((EXEMPLE.salaireMensuel * EXEMPLE.coeff) / EXEMPLE.aj)
const joursIndemnis = EXEMPLE.joursParMois - joursNonIndemnis
const areVersee = joursIndemnis * EXEMPLE.aj
const totalMensuel = areVersee + EXEMPLE.salaireMensuel
const areSansActivite = EXEMPLE.aj * EXEMPLE.joursParMois

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Peut-on travailler et toucher le chômage en même temps ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Oui, grâce au dispositif d'activité réduite. Vous pouvez cumuler une activité salariée ou non salariée avec l'ARE, à condition de déclarer cette activité à France Travail lors de votre actualisation mensuelle. Les jours travaillés réduisent proportionnellement le nombre de jours indemnisés, mais le cumul total (ARE + salaire) est toujours supérieur à l'ARE seule.`,
      },
    },
    {
      '@type': 'Question',
      name: "Comment est calculée l'ARE quand on travaille en même temps ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `France Travail calcule les jours non indemnisables avec la formule : (rémunération brute × ${ARE_PARAMS.tauxMaxJoursNonTravailles}) ÷ allocation journalière. Ces jours sont déduits des ${ARE_PARAMS.joursParMois} jours du mois. Vous touchez l'ARE pour les jours restants. Le cumul total (ARE + salaire) ne peut pas dépasser 70% de votre ancien salaire de référence.`,
      },
    },
    {
      '@type': 'Question',
      name: "Le cumul emploi-chômage réduit-il la durée de mes droits ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Partiellement. Vous consommez moins de jours d'ARE chaque mois (car vous n'êtes pas indemnisé les jours travaillés), donc vos droits s'étendent sur une période plus longue. Votre capital de jours diminue moins vite, ce qui est un avantage si vous cherchez un emploi à temps plein.`,
      },
    },
    {
      '@type': 'Question',
      name: "Faut-il déclarer son activité à France Travail même pour un seul jour travaillé ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, obligatoirement. Toute heure ou jour de travail, même occasionnel, doit être déclaré lors de l'actualisation mensuelle sur l'espace personnel France Travail. Une activité non déclarée est considérée comme une fraude et peut entraîner un remboursement des allocations indûment perçues et des sanctions.",
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: "Cumul emploi et chômage", item: 'https://www.monchomage.fr/cumul-emploi-chomage' },
  ],
}

export default function CumulEmploiChomage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">Accueil</Link>
        {' '}&rsaquo;{' '}Cumul emploi et ch&ocirc;mage
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Cumul Emploi et Ch&ocirc;mage 2026&nbsp;: Comment Fonctionne l&apos;Activit&eacute;
        R&eacute;duite&nbsp;?
      </h1>

      <div className="mt-8 space-y-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Peut-on travailler tout en touchant le ch&ocirc;mage&nbsp;?
          </h2>
          <p className="mt-3">
            Oui. Le dispositif d&apos;<strong>activit&eacute; r&eacute;duite</strong> permet
            de cumuler une activit&eacute; professionnelle &mdash; salari&eacute;e ou
            ind&eacute;pendante &mdash; avec l&apos;ARE. France Travail encourage ce
            dispositif comme tremplin vers un retour &agrave; l&apos;emploi progressif&nbsp;:
            vous maintenez un lien avec le march&eacute; du travail tout en conservant une
            partie de votre indemnisation.
          </p>
          <p className="mt-3">
            La condition absolue est la <strong>d&eacute;claration</strong>&nbsp;: toute
            activit&eacute; professionnelle, m&ecirc;me d&apos;une seule heure ou d&apos;un
            seul jour, doit &ecirc;tre signal&eacute;e &agrave; France Travail lors de
            l&apos;actualisation mensuelle (en ligne sur votre espace personnel). Omettre
            une activit&eacute; est consid&eacute;r&eacute; comme une fraude, passible de
            remboursement des allocations indûment per&ccedil;ues et de sanctions
            administratives.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Le principe du calcul en jours non indemnisables
          </h2>
          <p className="mt-3">
            France Travail ne verse pas l&apos;ARE pour les jours o&ugrave; vous avez
            travaill&eacute;. Mais le calcul ne se fait pas en comptant directement les jours
            travaill&eacute;s&nbsp;: il repose sur une formule qui neutralise une partie
            seulement de la r&eacute;mun&eacute;ration.
          </p>
          <div className="mt-4 rounded-xl bg-blue-50 p-5">
            <p className="font-mono text-blue-900">
              Jours non indemnisables = (R&eacute;mun&eacute;ration brute du mois &times;{' '}
              {ARE_PARAMS.tauxMaxJoursNonTravailles}) &divide; Allocation journali&egrave;re
            </p>
            <p className="mt-2 font-mono text-blue-900">
              Arrondi &agrave; l&apos;entier sup&eacute;rieur
            </p>
          </div>
          <p className="mt-3">
            Le coefficient {ARE_PARAMS.tauxMaxJoursNonTravailles} signifie que seulement{' '}
            {Math.round(ARE_PARAMS.tauxMaxJoursNonTravailles * 100)}&nbsp;% de votre
            r&eacute;mun&eacute;ration est &laquo;&nbsp;neutralis&eacute;e&nbsp;&raquo;
            vis-&agrave;-vis de l&apos;ARE. Les{' '}
            {Math.round((1 - ARE_PARAMS.tauxMaxJoursNonTravailles) * 100)}&nbsp;% restants
            constituent un cumul pur non d&eacute;duit&nbsp;: c&apos;est ce qui rend
            l&apos;activit&eacute; r&eacute;duite toujours financi&egrave;rement avantageuse
            par rapport &agrave; l&apos;inactivit&eacute; totale. Le nombre de jours indemnis&eacute;s
            dans le mois est ensuite&nbsp;: {ARE_PARAMS.joursParMois} jours &minus; jours non
            indemnisables.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Exemple concret de cumul
          </h2>
          <p className="mt-3">
            Prenons un demandeur d&apos;emploi dont l&apos;allocation journali&egrave;re brute
            est de {euros(EXEMPLE.aj)} et qui reprend un emploi &agrave; mi-temps
            r&eacute;mun&eacute;r&eacute; {euros(EXEMPLE.salaireMensuel)} brut par mois&nbsp;:
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">Jours non indemnisables</td>
                  <td className="border border-slate-200 px-4 py-2 font-mono">
                    ({EXEMPLE.salaireMensuel} &times; {EXEMPLE.coeff}) &divide; {EXEMPLE.aj} = {joursNonIndemnis} jours
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-2 font-medium">Jours indemnis&eacute;s</td>
                  <td className="border border-slate-200 px-4 py-2 font-mono">
                    {EXEMPLE.joursParMois} &minus; {joursNonIndemnis} = {joursIndemnis} jours
                  </td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium">ARE vers&eacute;e</td>
                  <td className="border border-slate-200 px-4 py-2">
                    {joursIndemnis} &times; {euros(EXEMPLE.aj)} = <strong>{euros(areVersee)}</strong>
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-2 font-medium">Salaire per&ccedil;u</td>
                  <td className="border border-slate-200 px-4 py-2"><strong>{euros(EXEMPLE.salaireMensuel)}</strong></td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="border border-slate-200 px-4 py-2 font-semibold text-blue-900">Total mensuel</td>
                  <td className="border border-slate-200 px-4 py-2 font-bold text-blue-700">{euros(totalMensuel)}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="border border-slate-200 px-4 py-2 font-medium text-slate-500">Sans activit&eacute; (r&eacute;f&eacute;rence)</td>
                  <td className="border border-slate-200 px-4 py-2 text-slate-500">{euros(areSansActivite)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Le cumul apporte {euros(totalMensuel - areSansActivite)} de plus par mois
            par rapport &agrave; l&apos;ARE seule. Le cumul est toujours plus
            avantageux, jusqu&apos;au seuil du plafond.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            La limite&nbsp;: ne pas d&eacute;passer l&apos;ancien salaire
          </h2>
          <p className="mt-3">
            Le total cumul&eacute; (ARE + salaire de l&apos;activit&eacute; r&eacute;duite)
            ne peut pas d&eacute;passer{' '}
            <strong>
              {Math.round(ARE_PARAMS.tauxMaxJoursNonTravailles * 100)}&nbsp;% de
              l&apos;ancien salaire brut mensuel de r&eacute;f&eacute;rence
            </strong>{' '}
            (le salaire de base ayant servi au calcul de l&apos;ARE). Au-del&agrave; de ce
            seuil, le nombre de jours non indemnisables augmente automatiquement pour
            maintenir le total sous le plafond. En pratique, ce plafond est rarement
            atteint pour des activit&eacute;s &agrave; temps partiel, mais il peut jouer
            r&ocirc;le si vous reprenez un emploi bien r&eacute;mun&eacute;r&eacute; tout
            en ayant une ARE &eacute;lev&eacute;e.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Impact sur la dur&eacute;e des droits
          </h2>
          <p className="mt-3">
            L&apos;un des avantages m&eacute;connus de l&apos;activit&eacute; r&eacute;duite
            est son effet sur la <strong>dur&eacute;e d&apos;indemnisation</strong>. En
            activit&eacute; r&eacute;duite, vous consommez moins de jours d&apos;ARE chaque
            mois (car les jours non indemnisables ne sont pas d&eacute;bit&eacute;s de votre
            capital). R&eacute;sultat&nbsp;: votre stock de droits s&apos;&eacute;coule
            moins vite et votre indemnisation s&apos;&eacute;tire dans le temps.
          </p>
          <p className="mt-3">
            Dans l&apos;exemple pr&eacute;c&eacute;dent, avec un capital de{' '}
            {ARE_PARAMS.dureeMaxMoins50ansJours} jours consomm&eacute;s &agrave; raison de{' '}
            {joursIndemnis} jours par mois, la dur&eacute;e effective atteint environ{' '}
            {Math.round(ARE_PARAMS.dureeMaxMoins50ansJours / joursIndemnis)} mois, contre
            les {Math.round(ARE_PARAMS.dureeMaxMoins50ansJours / ARE_PARAMS.joursParMois)} mois
            th&eacute;oriques sans activit&eacute;. Cette extension peut repr&eacute;senter
            un filet de s&eacute;curit&eacute; pr&eacute;cieux si la recherche d&apos;emploi
            &agrave; temps plein prend du temps.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Calculez votre ARE de base
        </h2>
        <p className="mt-2 text-slate-600">
          Ce calculateur donne votre allocation journali&egrave;re brute. Pour estimer le
          cumul avec une activit&eacute; r&eacute;duite, appliquez ensuite la formule&nbsp;:
          ({'{'}r&eacute;mun&eacute;ration brute &times; {ARE_PARAMS.tauxMaxJoursNonTravailles}{'}'})
          &divide; AJ = jours non indemnisables.
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
              Peut-on travailler et toucher le ch&ocirc;mage en m&ecirc;me temps&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Oui, gr&acirc;ce au dispositif d&apos;activit&eacute; r&eacute;duite. La condition
              est de d&eacute;clarer toute activit&eacute; &agrave; France Travail lors de
              l&apos;actualisation mensuelle. Le cumul ARE + salaire est toujours
              financi&egrave;rement avantageux gr&acirc;ce au coefficient de{' '}
              {ARE_PARAMS.tauxMaxJoursNonTravailles} appliqu&eacute; &agrave; la
              r&eacute;mun&eacute;ration.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Comment est calcul&eacute;e l&apos;ARE quand on travaille en m&ecirc;me
              temps&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Jours non indemnisables = (r&eacute;mun&eacute;ration brute &times;{' '}
              {ARE_PARAMS.tauxMaxJoursNonTravailles}) &divide; allocation journali&egrave;re,
              arrondi &agrave; l&apos;entier sup&eacute;rieur. Vous touchez l&apos;ARE pour
              les {ARE_PARAMS.joursParMois} jours &minus; jours non indemnisables restants.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Le cumul emploi-ch&ocirc;mage r&eacute;duit-il la dur&eacute;e de mes
              droits&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Partiellement. Vous consommez moins de jours chaque mois, donc vos droits
              s&apos;&eacute;tendent sur une p&eacute;riode plus longue. C&apos;est un
              avantage si vous cherchez un emploi &agrave; temps plein.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">
              Faut-il d&eacute;clarer son activit&eacute; m&ecirc;me pour un seul jour
              travaill&eacute;&nbsp;?
            </h3>
            <p className="mt-1 text-slate-700">
              Oui, obligatoirement. Toute activit&eacute; non d&eacute;clar&eacute;e est
              consid&eacute;r&eacute;e comme une fraude et peut entra&icirc;ner le
              remboursement des allocations et des sanctions.
            </p>
          </div>
        </div>
      </section>

      <nav className="mt-12 border-t border-slate-200 pt-6">
        <p className="mb-3 text-sm font-medium text-slate-600">Pages li&eacute;es</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/duree-indemnisation" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Dur&eacute;e d&apos;indemnisation
          </Link>
          <Link href="/" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Calculateur ARE
          </Link>
          <Link href="/rupture-conventionnelle" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Rupture conventionnelle
          </Link>
          <Link href="/temps-partiel" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            ARE &agrave; temps partiel
          </Link>
          <Link href="/chomage-net-brut" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-blue-300 hover:text-blue-700">
            Ch&ocirc;mage net ou brut&nbsp;?
          </Link>
        </div>
      </nav>
    </main>
  )
}
