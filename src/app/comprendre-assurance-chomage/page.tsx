import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros, pourcent, dateFr } from '@/lib/format'

export const metadata: Metadata = {
  title: "Comprendre l'assurance chômage en France 2026 | MonChomage.fr",
  description:
    'Guide complet 2026 : qui gère l’assurance chômage, qui cotise, qui peut être indemnisé, les allocations (ARE, AREF, ASS), le parcours après une perte d’emploi et vos obligations.',
  alternates: {
    canonical: 'https://www.monchomage.fr/comprendre-assurance-chomage',
  },
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
      name: "Comprendre l'assurance chômage",
      item: 'https://www.monchomage.fr/comprendre-assurance-chomage',
    },
  ],
}

export default function ComprendreAssuranceChomage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Fil d'Ariane" className="text-sm text-slate-500">
        <Link href="/" className="hover:underline">
          Accueil
        </Link>{' '}
        &rsaquo; Comprendre l&apos;assurance ch&ocirc;mage
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
        Comprendre l&apos;assurance ch&ocirc;mage en France (2026)
      </h1>
      <p className="mt-3 text-lg text-slate-600">
        Qui g&egrave;re le r&eacute;gime, qui le finance, qui peut &ecirc;tre indemnis&eacute;,
        quelles allocations existent et quelles sont vos obligations&nbsp;: ce guide fait le tour
        complet du syst&egrave;me fran&ccedil;ais d&apos;assurance ch&ocirc;mage.
      </p>

      <div className="mt-8 space-y-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Qui g&egrave;re l&apos;assurance ch&ocirc;mage&nbsp;?
          </h2>
          <p className="mt-2">
            Le r&eacute;gime d&apos;assurance ch&ocirc;mage fran&ccedil;ais repose sur deux acteurs
            compl&eacute;mentaires. L&apos;<strong>Un&eacute;dic</strong>, association
            paritaire g&eacute;r&eacute;e par les organisations syndicales et patronales, fixe les
            r&egrave;gles d&apos;indemnisation (dans le cadre d&eacute;fini par l&apos;&Eacute;tat),
            pilote financi&egrave;rement le r&eacute;gime et publie chaque ann&eacute;e les
            param&egrave;tres de calcul. <strong>France Travail</strong> (anciennement
            P&ocirc;le emploi, renomm&eacute; au 1er janvier 2024) est l&apos;op&eacute;rateur
            public&nbsp;: c&apos;est lui qui inscrit les demandeurs d&apos;emploi, calcule et verse
            les allocations, et accompagne le retour &agrave; l&apos;emploi. En pratique, toutes
            vos d&eacute;marches se font aupr&egrave;s de France Travail&nbsp;; l&apos;Un&eacute;dic
            ne re&ccedil;oit pas le public.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">Qui cotise&nbsp;?</h2>
          <p className="mt-2">
            Le r&eacute;gime est financ&eacute; principalement par une{' '}
            <strong>contribution patronale</strong> assise sur les salaires (de l&apos;ordre de
            4&nbsp;% du salaire brut, avec des modulations de type bonus-malus dans certains
            secteurs &agrave; fort recours aux contrats courts), ainsi que par une fraction de la
            CSG activit&eacute; affect&eacute;e au r&eacute;gime depuis la suppression de la
            cotisation salariale en 2018. Les salaires sont pris en compte dans la limite de
            4&nbsp;fois le plafond de la S&eacute;curit&eacute; sociale. Les travailleurs
            ind&eacute;pendants ne cotisent pas au r&eacute;gime g&eacute;n&eacute;ral
            d&apos;assurance ch&ocirc;mage&nbsp;: ils rel&egrave;vent d&apos;un dispositif
            sp&eacute;cifique tr&egrave;s encadr&eacute; (l&apos;allocation des travailleurs
            ind&eacute;pendants, ATI).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Qui peut &ecirc;tre indemnis&eacute;&nbsp;?
          </h2>
          <p className="mt-2">
            Pour ouvrir des droits &agrave; l&apos;ARE, plusieurs conditions doivent &ecirc;tre
            r&eacute;unies&nbsp;:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              avoir travaill&eacute; au moins <strong>{ARE_PARAMS.dureeMinJours} jours</strong>{' '}
              (6&nbsp;mois) au cours des {ARE_PARAMS.moisRefMoins55ans} derniers mois (
              {ARE_PARAMS.moisRefPlus55ans} mois pour les 55 ans et plus)&nbsp;;
            </li>
            <li>
              avoir perdu son emploi <strong>involontairement</strong>&nbsp;: licenciement, fin de
              CDD, rupture conventionnelle, fin de mission d&apos;int&eacute;rim. La
              d&eacute;mission n&apos;ouvre pas de droits, sauf cas de d&eacute;mission
              l&eacute;gitime ou projet de reconversion valid&eacute;&nbsp;;
            </li>
            <li>&ecirc;tre inscrit comme demandeur d&apos;emploi et r&eacute;sider en France&nbsp;;</li>
            <li>
              &ecirc;tre physiquement apte &agrave; travailler et rechercher activement un
              emploi&nbsp;;
            </li>
            <li>ne pas avoir atteint l&apos;&acirc;ge de la retraite &agrave; taux plein.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Les diff&eacute;rentes allocations
          </h2>
          <p className="mt-2">
            <strong>L&apos;ARE (aide au retour &agrave; l&apos;emploi)</strong> est l&apos;allocation
            principale du r&eacute;gime. Son montant d&eacute;pend de votre salaire
            ant&eacute;rieur&nbsp;: la formule la plus favorable entre{' '}
            {pourcent(ARE_PARAMS.tauxFormule1)} du salaire journalier de r&eacute;f&eacute;rence +{' '}
            {euros(ARE_PARAMS.partieFix)} par jour et {pourcent(ARE_PARAMS.tauxFormule2)} du SJR,
            avec un plancher de {euros(ARE_PARAMS.allocationMinimale)} par jour et un plafond de{' '}
            {pourcent(ARE_PARAMS.plafondTauxSJR)} du SJR. Vous pouvez l&apos;estimer avec notre{' '}
            <Link href="/" className="text-blue-700 underline">
              calculateur ARE
            </Link>
            .
          </p>
          <p className="mt-2">
            <strong>L&apos;AREF (ARE formation)</strong> prend le relais lorsque vous suivez une
            formation valid&eacute;e par France Travail. Son montant est identique &agrave;
            l&apos;ARE, mais son minimum est sp&eacute;cifique&nbsp;:{' '}
            {euros(ARE_PARAMS.allocationMinimaAREF)} par jour. Elle est vers&eacute;e dans la
            limite de vos droits restants.
          </p>
          <p className="mt-2">
            <strong>L&apos;ASS (allocation de solidarit&eacute; sp&eacute;cifique)</strong> est une
            allocation d&apos;&Eacute;tat, sous conditions de ressources, destin&eacute;e aux
            demandeurs d&apos;emploi qui ont &eacute;puis&eacute; leurs droits &agrave; l&apos;ARE.
            Elle ne rel&egrave;ve pas de l&apos;assurance ch&ocirc;mage proprement dite mais du
            r&eacute;gime de solidarit&eacute;.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Le parcours type apr&egrave;s une perte d&apos;emploi
          </h2>
          <ol className="mt-2 list-decimal space-y-2 pl-6">
            <li>
              <strong>R&eacute;cup&eacute;rez vos documents de fin de contrat</strong>&nbsp;:
              certificat de travail, re&ccedil;u pour solde de tout compte et attestation
              employeur (transmise par l&apos;employeur &agrave; France Travail).
            </li>
            <li>
              <strong>Inscrivez-vous</strong> sur francetravail.fr, id&eacute;alement d&egrave;s le
              lendemain de la fin du contrat&nbsp;: les droits ne sont pas r&eacute;troactifs avant
              l&apos;inscription.
            </li>
            <li>
              <strong>D&eacute;lai d&apos;attente et diff&eacute;r&eacute;s</strong>&nbsp;: un
              d&eacute;lai d&apos;attente de 7 jours s&apos;applique syst&eacute;matiquement,
              auquel peuvent s&apos;ajouter des diff&eacute;r&eacute;s li&eacute;s aux
              indemnit&eacute;s de cong&eacute;s pay&eacute;s et aux indemnit&eacute;s de rupture
              supral&eacute;gales (jusqu&apos;&agrave; 150 jours, 75 jours en cas de licenciement
              &eacute;conomique).
            </li>
            <li>
              <strong>Notification des droits</strong>&nbsp;: France Travail calcule votre
              allocation sur la base des attestations employeur et vous notifie le montant et la
              dur&eacute;e.
            </li>
            <li>
              <strong>Actualisation mensuelle</strong>&nbsp;: chaque fin de mois, vous
              d&eacute;clarez votre situation (recherche d&apos;emploi, activit&eacute; reprise,
              formation&hellip;) pour d&eacute;clencher le paiement.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Les obligations du demandeur d&apos;emploi
          </h2>
          <p className="mt-2">
            L&apos;indemnisation s&apos;accompagne d&apos;obligations&nbsp;:
            <strong> s&apos;actualiser chaque mois</strong> (l&apos;oubli entra&icirc;ne la
            cessation d&apos;inscription), <strong>rechercher activement un emploi</strong> et
            pouvoir en justifier, r&eacute;pondre aux convocations de son conseiller, accepter les
            offres raisonnables d&apos;emploi au sens de son projet personnalis&eacute;, et
            d&eacute;clarer tout changement de situation (reprise d&apos;activit&eacute;, maladie,
            formation, d&eacute;m&eacute;nagement). Les manquements peuvent entra&icirc;ner une
            radiation temporaire et la suspension, voire la suppression, de l&apos;allocation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            La revalorisation annuelle
          </h2>
          <p className="mt-2">
            Chaque ann&eacute;e, en principe au <strong>1er juillet</strong>, le conseil
            d&apos;administration de l&apos;Un&eacute;dic revalorise les param&egrave;tres de
            l&apos;allocation&nbsp;: partie fixe, allocation minimale, seuil de
            d&eacute;gressivit&eacute; et allocation minimale de formation. Les valeurs actuelles
            sont en vigueur depuis le {dateFr(ARE_PARAMS.dateValeur)} (revalorisation de
            +0,5&nbsp;%)&nbsp;; la prochaine est attendue au {dateFr(ARE_PARAMS.prochaineRevalo)}.
            La revalorisation s&apos;applique aux allocations en cours de versement, pas seulement
            aux nouveaux droits. Notez que des n&eacute;gociations sur les r&egrave;gles de
            l&apos;assurance ch&ocirc;mage (contrats courts, ruptures conventionnelles) sont en
            cours en 2026&nbsp;: les r&egrave;gles d&eacute;crites ici peuvent &eacute;voluer.
            Notre <Link href="/methodologie" className="text-blue-700 underline">m&eacute;thodologie</Link>{' '}
            d&eacute;taille nos sources et notre calendrier de mise &agrave; jour.
          </p>
        </section>
      </div>
    </main>
  )
}
