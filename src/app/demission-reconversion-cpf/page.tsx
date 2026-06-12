import type { Metadata } from 'next'
import CalculateurARE from '@/components/CalculateurARE'

export const metadata: Metadata = {
  title: "Chômage Démission Reconversion CPF 2026 — ARE et Conditions",
  description: "Démissionner pour se reconvertir et toucher le chômage : conditions, projet de reconversion validé, CPF, calcul ARE 2026. Tout comprendre.",
  alternates: { canonical: "https://www.monchomage.fr/demission-reconversion-cpf" },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Peut-on toucher le chômage en démissionnant pour se reconvertir ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, depuis le 1er novembre 2019. Un salarié peut démissionner pour réaliser un projet de reconversion professionnelle (formation certifiante ou création d'entreprise) et percevoir l'ARE, à condition d'avoir fait valider son projet par un Conseil en Evolution Professionnelle (CEP) AVANT de démissionner et de justifier de 5 ans d'ancienneté continue chez le même employeur.",
      },
    },
    {
      '@type': 'Question',
      name: "Quelle est la différence entre démission reconversion et démission classique ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La démission classique ne donne pas droit au chômage. La démission pour reconversion validée par un CEP ouvre droit à l'ARE dans les mêmes conditions qu'un licenciement. La différence clé est la validation préalable obligatoire du projet : sans attestation CEP avant la démission, France Travail refuse l'ARE.",
      },
    },
    {
      '@type': 'Question',
      name: "Faut-il obligatoirement utiliser son CPF pour bénéficier de ce dispositif ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non, le CPF est une option de financement parmi d'autres (OPCO, fonds propres, cofinancement). Ce qui est obligatoire, c'est que le projet de formation soit certifiant ou qualifiant (inscrit au RNCP ou Répertoire Spécifique). Le financement via CPF est simplement le plus courant car disponible pour tous les salariés.",
      },
    },
    {
      '@type': 'Question',
      name: "Que se passe-t-il si le projet de reconversion ne se réalise pas ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Si le projet validé par le CEP n'est pas mis en oeuvre dans les 6 mois suivant la démission (formation non commencée, démarches entreprise inexistantes), France Travail peut suspendre le versement de l'ARE. Le salarié devra justifier de l'avancement de son projet à chaque actualisation.",
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.monchomage.fr' },
    { '@type': 'ListItem', position: 2, name: 'Démission reconversion CPF', item: 'https://www.monchomage.fr/demission-reconversion-cpf' },
  ],
}

export default function PageDemissionReconversion() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <nav className="mb-4 text-sm text-gray-500">
          <a href="/" className="hover:underline">Accueil</a>
          <span className="mx-2">&rsaquo;</span>
          <span>Démission reconversion CPF</span>
        </nav>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Démission pour Reconversion : Chômage et CPF en 2026
        </h1>

        <p className="mb-6 text-gray-600">
          Depuis le 1er novembre 2019, il est possible de démissionner pour se reconvertir
          et percevoir l&apos;allocation chômage (ARE) — à condition de respecter une procédure
          stricte. Ce guide détaille les conditions, les étapes et le calcul de l&apos;ARE
          dans ce dispositif.
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          La démission pour reconversion professionnelle : une exception depuis 2019
        </h2>
        <p className="mb-4 text-gray-700">
          Créée par la loi Avenir professionnel du 5 septembre 2018 et applicable depuis le
          1er novembre 2019, cette mesure permet à un salarié de démissionner pour se
          reconvertir tout en bénéficiant de l&apos;ARE. C&apos;est une exception majeure au principe
          selon lequel la démission ne donne pas droit au chômage.
        </p>
        <p className="mb-4 text-gray-700">
          La condition préalable <strong>OBLIGATOIRE</strong> est que le projet de reconversion
          soit validé par le Conseil en Evolution Professionnelle (CEP) <strong>AVANT</strong>{' '}
          la démission. Démissionner d&apos;abord puis demander la validation entraîne un refus
          automatique de l&apos;ARE par France Travail. L&apos;ordre des étapes est impératif.
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Les deux cas éligibles
        </h2>
        <div className="mb-4 space-y-4">
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
            <p className="font-semibold text-blue-900">Cas 1 — Formation certifiante ou qualifiante</p>
            <p className="mt-1 text-blue-800">
              Le salarié suit une formation inscrite au RNCP (Répertoire National des
              Certifications Professionnelles) ou au Répertoire Spécifique. Le financement
              peut être assuré par le CPF, l&apos;OPCO de la branche professionnelle, des fonds
              propres, ou un cofinancement combinant plusieurs sources.
            </p>
          </div>
          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
            <p className="font-semibold text-blue-900">Cas 2 — Création ou reprise d&apos;entreprise</p>
            <p className="mt-1 text-blue-800">
              Le salarié a un projet sérieux de création ou reprise d&apos;entreprise, attesté
              par des démarches concrètes : étude de marché réalisée, business plan formalisé,
              accompagnement par une structure reconnue (BGE, CCI, couveuse d&apos;entreprises, etc.).
            </p>
          </div>
        </div>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          La procédure étape par étape
        </h2>
        <ol className="mb-4 space-y-3 text-gray-700">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">1</span>
            <div>
              <strong>Contacter un CEP</strong> — Opérateurs habilités : France Travail,
              Apec (pour les cadres), Cap emploi (personnes en situation de handicap),
              et les opérateurs régionaux agréés.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">2</span>
            <div>
              <strong>Construire le dossier</strong> avec le conseiller CEP : description
              précise du projet, plan de financement, calendrier prévisionnel de formation
              ou de création.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">3</span>
            <div>
              <strong>Obtenir l&apos;attestation de validation</strong> du CEP — document
              indispensable à présenter à France Travail lors de l&apos;inscription.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">4</span>
            <div>
              <strong>Démissionner</strong> en respectant le préavis prévu par la
              convention collective ou le contrat de travail.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">5</span>
            <div>
              <strong>S&apos;inscrire à France Travail</strong> dans les 6 mois suivant la
              démission, en présentant l&apos;attestation CEP.
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">6</span>
            <div>
              <strong>Justifier du suivi effectif du projet</strong> sous 6 mois :
              formation commencée, démarches de création d&apos;entreprise documentées.
              Sans justification, France Travail peut suspendre l&apos;ARE.
            </div>
          </li>
        </ol>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Condition d&apos;ancienneté : 5 ans continus chez le même employeur
        </h2>
        <p className="mb-4 text-gray-700">
          Le salarié doit justifier d&apos;au moins <strong>5 ans d&apos;activité salariée continue</strong>{' '}
          chez le même employeur au moment de la démission. Cette condition est stricte et
          non négociable : 4 ans et 11 mois d&apos;ancienneté entraînent un refus automatique.
        </p>
        <p className="mb-4 text-gray-700">
          En pratique, cela signifie que les salariés qui ont changé d&apos;employeur récemment,
          même pour une durée courte, ne peuvent pas bénéficier de ce dispositif, sauf à
          attendre d&apos;atteindre les 5 ans chez leur employeur actuel.
        </p>

        <h2 className="mb-3 mt-8 text-2xl font-semibold text-gray-900">
          Calcul de l&apos;ARE pour démission reconversion
        </h2>
        <p className="mb-4 text-gray-700">
          Le calcul de l&apos;ARE est <strong>identique au calcul standard</strong> : le salaire
          journalier de référence (SJR) est calculé sur les 24 derniers mois, puis les
          formules Unédic s&apos;appliquent normalement. Il n&apos;y a aucune pénalité sur le montant
          ni sur la durée d&apos;indemnisation par rapport à un licenciement classique.
        </p>
        <p className="mb-4 text-gray-700">
          Un délai de carence de 7 jours s&apos;applique, auquel peut s&apos;ajouter un différé
          d&apos;indemnisation au titre des congés payés non pris. Utilisez le calculateur
          ci-dessous pour estimer votre allocation :
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
            <a href="/demission-legitime" className="text-blue-600 hover:underline">Démission légitime</a>
            <a href="/rupture-conventionnelle" className="text-blue-600 hover:underline">Rupture conventionnelle</a>
            <a href="/" className="text-blue-600 hover:underline">Calculateur ARE</a>
            <a href="/chomage-fonctionnaire-reconversion" className="text-blue-600 hover:underline">Fonctionnaire en reconversion</a>
          </div>
        </div>
      </main>
    </>
  )
}
