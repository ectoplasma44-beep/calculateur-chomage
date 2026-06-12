import type { Metadata } from 'next'
import CalculateurARE from '@/components/CalculateurARE'

export const metadata: Metadata = {
  title: "Délai de Carence Chômage 2026 — Différé d'Indemnisation Expliqué",
  description: "Combien de temps avant de toucher le chômage ? Délai de 7 jours, différé congés payés, différé spécifique. Calcul et exemples 2026.",
  alternates: { canonical: "https://www.monchomage.fr/delai-carence-chomage" },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Combien de temps faut-il attendre avant de toucher le chômage ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Au minimum 7 jours (délai d'attente incompressible). S'y ajoutent un différé lié aux congés payés non pris (jusqu'à 30 jours) et un différé spécifique si vos indemnités de rupture dépassent le minimum légal (jusqu'à 150 jours). Dans le cas le plus favorable (aucun CP, aucune indemnité supra-légale), le premier versement intervient 7 jours après la fin du contrat.",
      },
    },
    {
      '@type': 'Question',
      name: "Comment est calculé le différé d'indemnisation pour les congés payés ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Le différé CP est égal au nombre de jours de congés payés non pris multiplié par votre SJR, le tout divisé par 91. Il est plafonné à 30 jours. Par exemple, avec 10 jours de CP non pris et un SJR de 80 euros : (10 × 80) / 91 = 8,8 jours de différé, soit environ 9 jours supplémentaires avant le premier versement.",
      },
    },
    {
      '@type': 'Question',
      name: "Le différé spécifique s'applique-t-il à tous les modes de rupture ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Il s'applique uniquement quand les indemnités de rupture versées (licenciement, rupture conventionnelle) dépassent le minimum légal. Pour une fin de CDD normale, la prime de précarité (10%) n'entre pas dans ce calcul. Pour un licenciement économique avec indemnité conventionnelle supérieure au légal, le différé spécifique s'applique.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on percevoir des revenus pendant le délai de carence ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Le délai de carence est une période de non-indemnisation par France Travail, mais rien n'interdit de travailler pendant cette période. Si vous reprenez une activité pendant le différé, vous devez la déclarer à France Travail. Le différé continue de s'écouler indépendamment de votre activité éventuelle.",
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: "Délai de carence chômage", item: 'https://www.monchomage.fr/delai-carence-chomage' },
  ],
}

const DIVISEUR_CP = 91
const PLAFOND_DIFFERE_CP_JOURS = 30
const DIVISEUR_SPECIFIQUE = 91.25
const PLAFOND_DIFFERE_SPECIFIQUE_JOURS = 150

export default function PageDelaiCarence() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <nav className="mb-4 text-sm text-gray-500">
          <a href="/" className="hover:underline">Accueil</a>
          <span className="mx-2">&rsaquo;</span>
          <span>Délai de carence chômage</span>
        </nav>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Délai de Carence Chômage 2026 : Quand Touche-t-on la Première Allocation ?
        </h1>

        <p className="mb-6 text-gray-600">
          Le premier versement de l&apos;ARE n&apos;intervient pas le lendemain de l&apos;inscription
          à France Travail. Trois éléments peuvent s&apos;additionner pour former un délai
          plus ou moins long. Comprendre ces mécanismes permet d&apos;anticiper sa trésorerie.
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Les trois composantes du délai avant le premier versement
        </h2>
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-3xl font-bold text-blue-700">7 j</p>
            <p className="mt-1 text-sm font-medium text-slate-700">Délai d&apos;attente fixe</p>
            <p className="mt-1 text-xs text-slate-500">Systématique, incompressible</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-3xl font-bold text-amber-600">≤ {PLAFOND_DIFFERE_CP_JOURS} j</p>
            <p className="mt-1 text-sm font-medium text-slate-700">Différé congés payés</p>
            <p className="mt-1 text-xs text-slate-500">Si CP non pris</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
            <p className="text-3xl font-bold text-red-600">≤ {PLAFOND_DIFFERE_SPECIFIQUE_JOURS} j</p>
            <p className="mt-1 text-sm font-medium text-slate-700">Différé spécifique</p>
            <p className="mt-1 text-xs text-slate-500">Si indemnité supra-légale</p>
          </div>
        </div>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          1. Le délai d&apos;attente de 7 jours
        </h2>
        <p className="mb-4 text-gray-700">
          Ce délai est <strong>systématique et incompressible</strong>. Il s&apos;applique à
          tous les demandeurs d&apos;emploi sans exception, quel que soit le motif de rupture
          du contrat (licenciement, rupture conventionnelle, fin de CDD, etc.).
        </p>
        <p className="mb-4 text-gray-700">
          Il court à compter du lendemain de la fin du contrat de travail, ou de la date
          d&apos;inscription à France Travail si celle-ci est postérieure. En pratique, il est
          conseillé de s&apos;inscrire dès le lendemain de la fin du contrat pour éviter de
          repousser inutilement ce délai.
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          2. Le différé congés payés
        </h2>
        <p className="mb-4 text-gray-700">
          Si vous n&apos;avez pas pris l&apos;intégralité de vos congés payés avant la fin du
          contrat, un différé supplémentaire s&apos;applique, même si l&apos;employeur a versé
          l&apos;indemnité compensatrice de congés payés dans le solde de tout compte.
        </p>
        <div className="mb-4 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-800">
          <p>Différé CP = (jours CP non pris × SJR) / {DIVISEUR_CP}</p>
          <p className="mt-1">Plafonné à {PLAFOND_DIFFERE_CP_JOURS} jours calendaires</p>
        </div>
        <p className="mb-4 text-gray-700">
          <strong>Exemple :</strong> 15 jours de CP non pris, SJR = 80 €<br />
          Différé CP = (15 × 80) / {DIVISEUR_CP} = {((15 * 80) / DIVISEUR_CP).toFixed(2)} jours → 13 jours de différé
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          3. Le différé spécifique (indemnités supra-légales)
        </h2>
        <p className="mb-4 text-gray-700">
          Ce différé s&apos;applique si les indemnités de rupture versées (licenciement,
          rupture conventionnelle) dépassent le minimum légal. Il vise à éviter que
          des salariés bien indemnisés à la rupture bénéficient immédiatement de l&apos;ARE
          en plus de leurs indemnités.
        </p>
        <div className="mb-4 rounded-lg bg-gray-50 p-4 font-mono text-sm text-gray-800">
          <p>Différé spécifique = (indemnités perçues − indemnité légale minimale) / {DIVISEUR_SPECIFIQUE}</p>
          <p className="mt-1">Plafonné à {PLAFOND_DIFFERE_SPECIFIQUE_JOURS} jours calendaires (~5 mois)</p>
        </div>
        <p className="mb-4 text-gray-700">
          <strong>Exemple :</strong> rupture conventionnelle avec indemnité de 15 000 €,
          indemnité légale minimale = 8 000 €<br />
          Différé spécifique = (15 000 − 8 000) / {DIVISEUR_SPECIFIQUE} = {((15000 - 8000) / DIVISEUR_SPECIFIQUE).toFixed(1)} jours → 76 jours de différé spécifique
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Calcul du délai total et exemples
        </h2>
        <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-4 font-mono text-sm">
          Délai total = 7 jours + différé CP + différé spécifique
        </div>

        <div className="mb-6 space-y-4">
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="font-semibold text-gray-900">
              Exemple 1 — Licenciement sans indemnité supra-légale, 5 jours CP non pris, SJR = 66,67 €
            </p>
            <ul className="mt-2 space-y-1 text-sm text-gray-700">
              <li>Différé CP = (5 × 66,67) / {DIVISEUR_CP} = {((5 * 66.67) / DIVISEUR_CP).toFixed(2)} → 3 jours</li>
              <li>Différé spécifique = 0 jours</li>
              <li className="font-semibold text-blue-700">Total = 7 + 3 = 10 jours → premier versement après ~10 jours</li>
            </ul>
          </div>

          <div className="rounded-lg border border-amber-100 p-4">
            <p className="font-semibold text-gray-900">
              Exemple 2 — Rupture conventionnelle avec indemnité supra-légale de 20 000 € (légale = 5 000 €),
              20 jours CP non pris, SJR = 100 €
            </p>
            <ul className="mt-2 space-y-1 text-sm text-gray-700">
              <li>Différé CP = (20 × 100) / {DIVISEUR_CP} = {((20 * 100) / DIVISEUR_CP).toFixed(2)} → plafonné à {PLAFOND_DIFFERE_CP_JOURS} jours</li>
              <li>Différé spécifique = (20 000 − 5 000) / {DIVISEUR_SPECIFIQUE} = {((20000 - 5000) / DIVISEUR_SPECIFIQUE).toFixed(1)} → plafonné à {PLAFOND_DIFFERE_SPECIFIQUE_JOURS} jours</li>
              <li className="font-semibold text-amber-700">
                Total = 7 + {PLAFOND_DIFFERE_CP_JOURS} + {PLAFOND_DIFFERE_SPECIFIQUE_JOURS} = {7 + PLAFOND_DIFFERE_CP_JOURS + PLAFOND_DIFFERE_SPECIFIQUE_JOURS} jours → environ 6 mois avant le premier versement
              </li>
            </ul>
          </div>
        </div>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Estimez votre allocation une fois le délai écoulé
        </h2>
        <p className="mb-4 text-gray-700">
          Pendant le délai de carence, aucune ARE n&apos;est versée. Mais une fois ce délai
          écoulé, votre allocation est calculée normalement. Simulez votre montant
          ci-dessous pour anticiper votre budget :
        </p>

        <CalculateurARE />

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Questions fréquentes
        </h2>
        <div className="space-y-5">
          {faqJsonLd.mainEntity.map((faq, i) => (
            <div key={i} className="border-b border-gray-200 pb-4">
              <h3 className="mb-2 font-semibold text-gray-900">{faq.name}</h3>
              <p className="text-gray-600">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="mb-3 text-sm text-gray-500">Voir aussi :</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a href="/rupture-conventionnelle" className="text-blue-600 hover:underline">Rupture conventionnelle</a>
            <a href="/fin-de-cdd" className="text-blue-600 hover:underline">Fin de CDD</a>
            <a href="/" className="text-blue-600 hover:underline">Calculateur ARE</a>
          </div>
        </div>
      </main>
    </>
  )
}
