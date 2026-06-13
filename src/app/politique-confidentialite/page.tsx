import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de confidentialite | MonChomage.fr',
  description:
    'Politique de confidentialite et de cookies de MonChomage.fr : donnees collectees, Google AdSense, droits RGPD.',
  alternates: {
    canonical: 'https://www.monchomage.fr/politique-confidentialite',
  },
}

export default function PolitiqueConfidentialite() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Politique de confidentialit&eacute;
      </h1>
      <p className="mt-3 text-slate-600">Derni&egrave;re mise &agrave; jour&nbsp;: 13 juin 2026</p>

      <div className="mt-6 space-y-8 text-slate-700">

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Responsable du traitement</h2>
          <p className="mt-2">
            Le site MonChomage.fr est &eacute;dit&eacute; &agrave; titre ind&eacute;pendant.
            Pour toute question relative &agrave; vos donn&eacute;es personnelles, vous pouvez
            nous contacter &agrave;&nbsp;: <strong>contact@monchomage.fr</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Donn&eacute;es collect&eacute;es</h2>
          <h3 className="mt-4 font-semibold text-slate-800">Donn&eacute;es de navigation (logs serveur)</h3>
          <p className="mt-2">
            Notre h&eacute;bergeur Vercel Inc. collecte automatiquement des donn&eacute;es techniques
            li&eacute;es &agrave; chaque requ&ecirc;te&nbsp;: adresse IP, navigateur, pages consult&eacute;es,
            date et heure de la visite. Ces donn&eacute;es sont conserv&eacute;es conform&eacute;ment
            &agrave; la politique de Vercel et servent uniquement &agrave; assurer le bon fonctionnement
            technique du site.
          </p>
          <h3 className="mt-4 font-semibold text-slate-800">Donn&eacute;es saisies dans le calculateur</h3>
          <p className="mt-2">
            Les informations que vous saisissez (salaire, dur&eacute;e d&apos;activit&eacute;,
            &acirc;ge) sont trait&eacute;es <strong>exclusivement dans votre navigateur</strong>&nbsp;:
            elles ne sont ni transmises &agrave; un serveur, ni enregistr&eacute;es, ni partag&eacute;es
            avec des tiers.
          </p>
          <h3 className="mt-4 font-semibold text-slate-800">Cookies analytiques</h3>
          <p className="mt-2">
            Si des outils d&apos;analyse d&apos;audience sont utilis&eacute;s, votre consentement
            est recueilli au pr&eacute;alable via notre banni&egrave;re de cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Publicit&eacute; et cookies (Google AdSense)</h2>
          <p className="mt-2">
            Ce site utilise <strong>Google AdSense</strong>, un service de publicit&eacute; de
            Google LLC (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA).
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>
              Google AdSense utilise des cookies pour diffuser des annonces personnalis&eacute;es
              bas&eacute;es sur les visites ant&eacute;rieures de l&apos;utilisateur sur ce site
              et sur d&apos;autres sites.
            </li>
            <li>
              Ces cookies permettent &agrave; Google et &agrave; ses partenaires de servir des
              annonces adapt&eacute;es &agrave; vos int&eacute;r&ecirc;ts.
            </li>
            <li>
              Vous pouvez d&eacute;sactiver la personnalisation des annonces &agrave; tout moment
              via les{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                param&egrave;tres publicitaires Google
              </a>
              .
            </li>
            <li>
              Google AdSense respecte le RGPD. Pour en savoir plus&nbsp;:{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                politique de confidentialit&eacute; Google
              </a>
              .
            </li>
            <li>
              Les cookies publicitaires ne sont d&eacute;pos&eacute;s qu&apos;avec votre
              consentement explicite, recueilli via notre banni&egrave;re de cookies. Vous pouvez
              retirer votre consentement &agrave; tout moment en effac&ccedil;ant les cookies de
              votre navigateur.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Base l&eacute;gale des traitements</h2>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li><strong>Int&eacute;r&ecirc;t l&eacute;gitime&nbsp;:</strong> logs serveur pour la s&eacute;curit&eacute; et le fonctionnement technique.</li>
            <li><strong>Consentement&nbsp;:</strong> cookies publicitaires Google AdSense et cookies analytiques.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Vos droits RGPD</h2>
          <p className="mt-2">
            Conform&eacute;ment au R&egrave;glement (UE) 2016/679 (RGPD) et &agrave; la loi
            Informatique et Libert&eacute;s, vous disposez des droits suivants&nbsp;:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li><strong>Droit d&apos;acc&egrave;s&nbsp;:</strong> obtenir une copie des donn&eacute;es vous concernant.</li>
            <li><strong>Droit de rectification&nbsp;:</strong> corriger des donn&eacute;es inexactes.</li>
            <li><strong>Droit &agrave; l&apos;effacement&nbsp;:</strong> demander la suppression de vos donn&eacute;es.</li>
            <li><strong>Droit d&apos;opposition&nbsp;:</strong> vous opposer au traitement de vos donn&eacute;es &agrave; des fins publicitaires.</li>
            <li><strong>Droit &agrave; la portabilit&eacute;&nbsp;:</strong> recevoir vos donn&eacute;es dans un format structur&eacute;.</li>
          </ul>
          <p className="mt-3">
            Pour exercer ces droits, contactez-nous &agrave;&nbsp;: <strong>contact@monchomage.fr</strong>.
            Vous disposez &eacute;galement du droit d&apos;introduire une r&eacute;clamation aupr&egrave;s
            de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">www.cnil.fr</a>).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Conservation des donn&eacute;es</h2>
          <p className="mt-2">
            Les logs serveur sont conserv&eacute;s conform&eacute;ment &agrave; la politique de
            Vercel (g&eacute;n&eacute;ralement 30 jours). Les cookies tiers (Google AdSense) ont
            une dur&eacute;e de conservation d&eacute;finie par Google, g&eacute;n&eacute;ralement
            13 mois. Votre choix de consentement (localStorage) est conserv&eacute; jusqu&apos;&agrave;
            ce que vous effaciez les donn&eacute;es de votre navigateur.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
          <p className="mt-2">
            Pour toute question relative &agrave; cette politique ou &agrave; vos donn&eacute;es
            personnelles&nbsp;: <strong>contact@monchomage.fr</strong>
          </p>
          <p className="mt-2">
            Voir aussi nos{' '}
            <Link href="/mentions-legales" className="text-blue-700 underline">
              mentions l&eacute;gales
            </Link>
            .
          </p>
        </section>

      </div>
    </main>
  )
}
