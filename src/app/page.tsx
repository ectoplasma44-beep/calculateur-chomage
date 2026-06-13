import type { Metadata } from 'next'
import Link from 'next/link'
import CalculateurARE from '@/components/CalculateurARE'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros, eurosEntiers, pourcent, dateFr } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Calculateur Chômage 2026 — Estimez votre ARE | MonChomage.fr',
  description:
    'Simulateur gratuit allocation chômage (ARE) 2026. Calculez votre indemnité selon votre salaire, durée de travail et situation. Formules officielles Unédic.',
  alternates: {
    canonical: 'https://www.monchomage.fr',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment est calculée l’allocation chômage (ARE) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `France Travail compare deux formules et retient la plus favorable : ${pourcent(ARE_PARAMS.tauxFormule1)} de votre salaire journalier de référence (SJR) + ${euros(ARE_PARAMS.partieFix)} par jour, ou ${pourcent(ARE_PARAMS.tauxFormule2)} de votre SJR. Le résultat ne peut être ni inférieur à ${euros(ARE_PARAMS.allocationMinimale)} par jour (allocation minimale), ni supérieur à ${pourcent(ARE_PARAMS.plafondTauxSJR)} de votre SJR. L'allocation mensuelle correspond à l'allocation journalière multipliée par ${ARE_PARAMS.joursParMois} jours.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Qu’est-ce que le salaire journalier de référence (SJR) ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Le SJR est la base de calcul de votre allocation. Il correspond à la somme de vos salaires bruts perçus pendant la période de référence (${ARE_PARAMS.moisRefMoins55ans} derniers mois, ou ${ARE_PARAMS.moisRefPlus55ans} mois pour les 55 ans et plus), divisée par le nombre de jours calendaires de cette période. Pour un emploi continu à salaire constant, le SJR équivaut approximativement à votre salaire mensuel brut divisé par ${ARE_PARAMS.joursParMoisSJR}.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le montant minimum du chômage en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `L'allocation minimale (plancher) est de ${euros(ARE_PARAMS.allocationMinimale)} par jour depuis le ${dateFr(ARE_PARAMS.dateValeur)}, soit environ ${euros(ARE_PARAMS.allocationMinimale * ARE_PARAMS.joursParMois)} par mois. En cas de formation, l'allocation minimale AREF est de ${euros(ARE_PARAMS.allocationMinimaAREF)} par jour. La prochaine revalorisation est attendue au ${dateFr(ARE_PARAMS.prochaineRevalo)}.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Qu’est-ce que la dégressivité de l’allocation chômage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Les allocataires de moins de ${ARE_PARAMS.ageLimiteDegressivite} ans dont l'allocation journalière dépasse ${euros(ARE_PARAMS.seuilDegressiviteAJ)} voient leur allocation réduite de ${pourcent(1 - ARE_PARAMS.coeffDegressivite)} à partir du ${ARE_PARAMS.joursAvantDegressivite + 1}e jour indemnisé (environ le 7e mois). L'allocation réduite ne peut toutefois pas descendre sous ${euros(ARE_PARAMS.seuilDegressiviteAJ)} par jour.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps peut-on toucher le chômage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Le principe est : un jour travaillé (cotisé) ouvre droit à un jour indemnisé. Il faut au minimum ${ARE_PARAMS.dureeMinJours} jours d'affiliation (6 mois). La durée maximale est de ${ARE_PARAMS.dureeMaxMoins50ansJours} jours (environ 12 mois) pour les moins de 50 ans et de ${ARE_PARAMS.dureeMax50ansEtPlusJours} jours (environ 24 mois) à partir de 50 ans, selon les paramètres Unédic de janvier 2026.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la différence entre ARE brute et nette ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `L'ARE affichée par les simulateurs est un montant brut. Des prélèvements peuvent s'y appliquer : participation retraite complémentaire (3 % du SJR), CSG et CRDS au-delà de certains seuils, et prélèvement à la source de l'impôt sur le revenu. Les petites allocations sont exonérées de CSG/CRDS. Le montant net perçu est donc généralement inférieur de 0 à 10 % au montant brut estimé.`,
      },
    },
  ],
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Calculateur Ch&ocirc;mage (ARE) 2026 &mdash; Estimation Gratuite
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Estimez en quelques secondes le montant et la dur&eacute;e de votre allocation
          d&apos;aide au retour &agrave; l&apos;emploi (ARE) &agrave; partir des formules
          officielles Un&eacute;dic en vigueur. Le r&eacute;sultat est une estimation
          indicative&nbsp;: seul France Travail peut calculer vos droits exacts.
        </p>
      </header>

      <CalculateurARE />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Votre situation est particuli&egrave;re&nbsp;?</h2>
        <p className="mt-2 text-slate-600">Certains profils b&eacute;n&eacute;ficient de r&egrave;gles ARE sp&eacute;cifiques. Choisissez votre situation&nbsp;:</p>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          <Link href="/chomage-cadre" className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-blue-300 hover:shadow">
            <span className="text-2xl">💼</span>
            <span className="mt-2 font-semibold text-slate-800">Vous etes cadre</span>
          </Link>
          <Link href="/chomage-interimaire" className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-blue-300 hover:shadow">
            <span className="text-2xl">🏭</span>
            <span className="mt-2 font-semibold text-slate-800">Vous etes int&eacute;rimaire</span>
          </Link>
          <Link href="/chomage-alternant-apprenti" className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-blue-300 hover:shadow">
            <span className="text-2xl">🎓</span>
            <span className="mt-2 font-semibold text-slate-800">Vous etes alternant</span>
          </Link>
          <Link href="/chomage-seniors" className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-blue-300 hover:shadow">
            <span className="text-2xl">🧓</span>
            <span className="mt-2 font-semibold text-slate-800">Vous avez 55 ans ou plus</span>
          </Link>
          <Link href="/chomage-rqth" className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-blue-300 hover:shadow">
            <span className="text-2xl">♿</span>
            <span className="mt-2 font-semibold text-slate-800">Vous etes reconnu RQTH</span>
          </Link>
          <Link href="/chomage-fonctionnaire-reconversion" className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:border-blue-300 hover:shadow">
            <span className="text-2xl">🏛️</span>
            <span className="mt-2 font-semibold text-slate-800">Vous etes fonctionnaire</span>
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Comment fonctionne le calcul&nbsp;?</h2>

        <div className="prose-slate mt-4 space-y-4 text-slate-700">
          <h3 className="text-xl font-semibold text-slate-900">
            Le salaire journalier de r&eacute;f&eacute;rence (SJR)
          </h3>
          <p>
            Tout le calcul de l&apos;allocation ch&ocirc;mage repose sur le{' '}
            <strong>salaire journalier de r&eacute;f&eacute;rence</strong>. France Travail
            additionne l&apos;ensemble de vos salaires bruts per&ccedil;us pendant la
            p&eacute;riode de r&eacute;f&eacute;rence &mdash; les {ARE_PARAMS.moisRefMoins55ans}{' '}
            derniers mois pr&eacute;c&eacute;dant la fin de votre contrat, ou les{' '}
            {ARE_PARAMS.moisRefPlus55ans} derniers mois si vous avez 55 ans ou plus &mdash; puis
            divise ce total par le nombre de jours calendaires de la p&eacute;riode, y compris
            certains jours non travaill&eacute;s (dans la limite de{' '}
            {pourcent(ARE_PARAMS.tauxMaxJoursNonTravailles)} des jours travaill&eacute;s). Pour un
            emploi continu &agrave; salaire constant, cela revient approximativement &agrave;
            diviser votre salaire mensuel brut par {ARE_PARAMS.joursParMoisSJR}. C&apos;est la
            simplification retenue par notre calculateur. Les salaires pris en compte sont
            plafonn&eacute;s &agrave; {eurosEntiers(ARE_PARAMS.plafondSalaireRefMensuel)} par mois,
            le plafond de l&apos;assiette des contributions d&apos;assurance ch&ocirc;mage.
          </p>

          <h3 className="text-xl font-semibold text-slate-900">Les deux formules de calcul</h3>
          <p>
            &Agrave; partir du SJR, deux formules sont calcul&eacute;es et{' '}
            <strong>la plus favorable est retenue</strong>. La premi&egrave;re&nbsp;:{' '}
            {pourcent(ARE_PARAMS.tauxFormule1)} du SJR auxquels s&apos;ajoute une partie fixe de{' '}
            {euros(ARE_PARAMS.partieFix)} par jour. La seconde&nbsp;:{' '}
            {pourcent(ARE_PARAMS.tauxFormule2)} du SJR, sans partie fixe. M&eacute;caniquement, la
            premi&egrave;re formule avantage les salaires modestes (la partie fixe p&egrave;se
            proportionnellement plus lourd), tandis que la seconde devient plus favorable au-dessus
            d&apos;environ 2&nbsp;400&nbsp;&euro; brut par mois. L&apos;allocation mensuelle
            vers&eacute;e correspond &agrave; l&apos;allocation journali&egrave;re multipli&eacute;e
            par {ARE_PARAMS.joursParMois} jours, quel que soit le mois civil (mensualisation en
            vigueur depuis avril 2025).
          </p>

          <h3 className="text-xl font-semibold text-slate-900">Le plancher et le plafond</h3>
          <p>
            Le r&eacute;sultat est ensuite encadr&eacute;. Il ne peut pas descendre sous
            l&apos;<strong>allocation minimale</strong> de {euros(ARE_PARAMS.allocationMinimale)}{' '}
            par jour (environ {euros(ARE_PARAMS.allocationMinimale * ARE_PARAMS.joursParMois)} par
            mois), ni d&eacute;passer <strong>{pourcent(ARE_PARAMS.plafondTauxSJR)} du SJR</strong>.
            Si vous suivez une formation valid&eacute;e par France Travail, l&apos;allocation
            minimale sp&eacute;cifique (AREF) est de {euros(ARE_PARAMS.allocationMinimaAREF)} par
            jour. Ces montants sont revaloris&eacute;s chaque ann&eacute;e, en principe au 1er
            juillet&nbsp;: les valeurs actuelles s&apos;appliquent depuis le{' '}
            {dateFr(ARE_PARAMS.dateValeur)}.
          </p>

          <h3 className="text-xl font-semibold text-slate-900">La d&eacute;gressivit&eacute;</h3>
          <p>
            Les allocataires de <strong>moins de {ARE_PARAMS.ageLimiteDegressivite} ans</strong> (à
            la date de fin de contrat) dont l&apos;allocation journali&egrave;re d&eacute;passe{' '}
            {euros(ARE_PARAMS.seuilDegressiviteAJ)} &mdash; soit environ 4&nbsp;900&nbsp;&euro; de
            salaire brut mensuel &mdash; voient leur allocation r&eacute;duite de{' '}
            {pourcent(1 - ARE_PARAMS.coeffDegressivite)} &agrave; partir du{' '}
            {ARE_PARAMS.joursAvantDegressivite + 1}e jour indemnis&eacute;, c&apos;est-&agrave;-dire
            au d&eacute;but du 7e mois. L&apos;allocation r&eacute;duite ne peut toutefois pas
            tomber sous {euros(ARE_PARAMS.seuilDegressiviteAJ)} par jour. Notre calculateur vous
            signale automatiquement si vous &ecirc;tes concern&eacute; et affiche le montant
            apr&egrave;s r&eacute;duction.
          </p>

          <h3 className="text-xl font-semibold text-slate-900">
            La dur&eacute;e d&apos;indemnisation
          </h3>
          <p>
            Le principe g&eacute;n&eacute;ral est simple&nbsp;:{' '}
            <strong>un jour cotis&eacute; ouvre droit &agrave; un jour indemnis&eacute;</strong>.
            Pour ouvrir des droits, il faut avoir travaill&eacute; au moins{' '}
            {ARE_PARAMS.dureeMinJours} jours (6 mois) au cours de la p&eacute;riode de
            r&eacute;f&eacute;rence. La dur&eacute;e d&apos;indemnisation est ensuite
            plafonn&eacute;e&nbsp;: {ARE_PARAMS.dureeMaxMoins50ansJours} jours (environ 12 mois)
            pour les moins de 50 ans, {ARE_PARAMS.dureeMax50ansEtPlusJours} jours (environ 24 mois)
            &agrave; partir de 50 ans, selon les param&egrave;tres Un&eacute;dic de janvier 2026.
            Attention&nbsp;: des r&eacute;formes sont en cours de n&eacute;gociation et ces bornes
            peuvent &eacute;voluer&nbsp;; v&eacute;rifiez toujours votre situation
            aupr&egrave;s de France Travail. Pour comprendre l&apos;ensemble du syst&egrave;me,
            consultez notre{' '}
            <Link href="/comprendre-assurance-chomage" className="text-blue-700 underline">
              guide de l&apos;assurance ch&ocirc;mage
            </Link>{' '}
            et notre{' '}
            <Link href="/methodologie" className="text-blue-700 underline">
              m&eacute;thodologie de calcul
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  )
}
