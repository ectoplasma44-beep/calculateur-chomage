import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos | MonChomage.fr',
  description:
    'MonChomage.fr est un outil indépendant d’aide à la compréhension des droits chômage : calculateur ARE gratuit, guides et méthodologie transparente.',
  alternates: {
    canonical: 'https://www.monchomage.fr/a-propos',
  },
}

export default function APropos() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        &Agrave; propos de MonChomage.fr
      </h1>

      <div className="mt-6 space-y-6 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Notre mission</h2>
          <p className="mt-2">
            MonChomage.fr est un <strong>outil ind&eacute;pendant</strong> d&apos;aide &agrave; la
            compr&eacute;hension des droits &agrave; l&apos;assurance ch&ocirc;mage en France. La
            r&eacute;glementation de l&apos;assurance ch&ocirc;mage est complexe, change
            r&eacute;guli&egrave;rement, et il est souvent difficile de savoir &agrave; quoi
            s&apos;attendre au moment o&ugrave; l&apos;on perd son emploi. Notre objectif est
            simple&nbsp;: vous permettre d&apos;obtenir, en quelques secondes et gratuitement, une
            estimation claire du montant et de la dur&eacute;e de votre allocation d&apos;aide au
            retour &agrave; l&apos;emploi (ARE), accompagn&eacute;e d&apos;explications
            p&eacute;dagogiques sur la fa&ccedil;on dont ce montant est calcul&eacute;.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            Ind&eacute;pendance &eacute;ditoriale
          </h2>
          <p className="mt-2">
            MonChomage.fr n&apos;a <strong>aucune affiliation</strong> avec France Travail,
            l&apos;Un&eacute;dic ou tout autre organisme public ou priv&eacute; intervenant dans la
            gestion de l&apos;assurance ch&ocirc;mage. Nous ne sommes ni un service officiel, ni un
            interm&eacute;diaire&nbsp;: les d&eacute;marches d&apos;inscription, d&apos;actualisation
            et d&apos;indemnisation se font exclusivement aupr&egrave;s de France Travail. Cette
            ind&eacute;pendance nous permet d&apos;expliquer les r&egrave;gles telles qu&apos;elles
            sont, sans autre objectif que de les rendre compr&eacute;hensibles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            Mise &agrave; jour des param&egrave;tres
          </h2>
          <p className="mt-2">
            Les montants, taux et seuils utilis&eacute;s par notre calculateur proviennent
            exclusivement des publications officielles de l&apos;Un&eacute;dic et de France
            Travail. Nous nous engageons &agrave; les mettre &agrave; jour
            r&eacute;guli&egrave;rement, en particulier lors de la revalorisation annuelle du 1er
            juillet et &agrave; chaque &eacute;volution r&eacute;glementaire notable. La liste des
            sources, les formules exactes et les limites de notre simulateur sont
            d&eacute;taill&eacute;es en toute transparence sur notre page{' '}
            <Link href="/methodologie" className="text-blue-700 underline">
              M&eacute;thodologie
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Nous contacter</h2>
          <p className="mt-2">
            Une question, une erreur &agrave; signaler, une suggestion d&apos;am&eacute;lioration&nbsp;?
            &Eacute;crivez-nous &agrave;&nbsp;:{' '}
            <a href="mailto:contact@monchomage.fr" className="text-blue-700 underline">
              contact@monchomage.fr
            </a>
            . Nous lisons tous les messages et corrigeons rapidement toute inexactitude
            signal&eacute;e.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Questions fr&eacute;quentes</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900">
                MonChomage.fr remplace-t-il France Travail pour calculer mes droits&nbsp;?
              </h3>
              <p className="mt-1">
                Non. Notre simulateur produit une <strong>estimation indicative</strong> bas&eacute;e
                sur les formules officielles Un&eacute;dic. Seul France Travail peut calculer et
                notifier vos droits exacts &agrave; partir de vos attestations employeur, de votre
                historique de cotisations et de votre situation personnelle compl&egrave;te. Notre
                outil vous permet de comprendre le m&eacute;canisme, d&apos;anticiper un ordre de
                grandeur et de poser les bonnes questions avant votre rendez-vous avec un conseiller.
                Il ne se substitue en aucun cas &agrave; une d&eacute;marche officielle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                &Agrave; quelle fr&eacute;quence les param&egrave;tres sont-ils mis &agrave; jour&nbsp;?
              </h3>
              <p className="mt-1">
                Les param&egrave;tres de l&apos;assurance ch&ocirc;mage &eacute;voluent principalement
                lors de la revalorisation annuelle du <strong>1er juillet</strong> (montants plancher,
                plafond, partie fixe) et lors des grandes r&eacute;formes n&eacute;goci&eacute;es par
                les partenaires sociaux (dur&eacute;es d&apos;indemnisation, r&egrave;gles de
                d&eacute;gressivit&eacute;). Nous mettons &agrave; jour notre calculateur d&egrave;s
                la publication des nouveaux param&egrave;tres par l&apos;Un&eacute;dic, g&eacute;n&eacute;ralement
                dans les 48 heures. La date de valeur des donn&eacute;es en cours est
                visible sur notre page{' '}
                <Link href="/methodologie" className="text-blue-700 underline">
                  M&eacute;thodologie
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
