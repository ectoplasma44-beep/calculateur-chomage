import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales | MonChomage.fr',
  description:
    'Mentions légales du site MonChomage.fr : éditeur, hébergement, données personnelles, cookies et limitation de responsabilité.',
  alternates: {
    canonical: 'https://www.monchomage.fr/mentions-legales',
  },
}

export default function MentionsLegales() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Mentions l&eacute;gales</h1>

      <div className="mt-6 space-y-6 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">&Eacute;diteur du site</h2>
          <p className="mt-2">
            Le site MonChomage.fr est un site d&apos;information &eacute;dit&eacute; &agrave; titre
            ind&eacute;pendant. Il a pour unique vocation d&apos;aider les internautes &agrave;
            comprendre le fonctionnement de l&apos;assurance ch&ocirc;mage fran&ccedil;aise et
            &agrave; obtenir une estimation indicative de leur allocation d&apos;aide au retour
            &agrave; l&apos;emploi (ARE). Pour toute question relative au site, vous pouvez
            &eacute;crire &agrave;&nbsp;: contact@monchomage.fr. Le directeur de la publication est
            l&apos;&eacute;diteur du site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">H&eacute;bergement</h2>
          <p className="mt-2">
            Le site est h&eacute;berg&eacute; par Vercel Inc., 440 N Barranca Ave, Calhoun, CA
            91723, USA. Site web&nbsp;: vercel.com. L&apos;h&eacute;bergeur assure le stockage et la
            diffusion technique des pages du site&nbsp;; il n&apos;intervient pas dans leur contenu
            &eacute;ditorial.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Donn&eacute;es personnelles</h2>
          <p className="mt-2">
            MonChomage.fr ne collecte <strong>aucune donn&eacute;e personnelle</strong>. Les
            informations que vous saisissez dans le calculateur (salaire, dur&eacute;e
            d&apos;activit&eacute;, &acirc;ge) sont trait&eacute;es exclusivement dans votre
            navigateur&nbsp;: elles ne sont ni transmises &agrave; un serveur, ni
            enregistr&eacute;es, ni partag&eacute;es avec des tiers. Aucun compte n&apos;est
            n&eacute;cessaire pour utiliser le site. Si un formulaire de contact venait &agrave;
            &ecirc;tre mis en place, les donn&eacute;es transmises (adresse e-mail, message) ne
            seraient utilis&eacute;es que pour r&eacute;pondre &agrave; votre demande et seraient
            supprim&eacute;es ensuite. Conform&eacute;ment au R&egrave;glement
            g&eacute;n&eacute;ral sur la protection des donn&eacute;es (RGPD), vous disposez
            d&apos;un droit d&apos;acc&egrave;s, de rectification et de suppression des
            donn&eacute;es vous concernant, que vous pouvez exercer &agrave; l&apos;adresse
            contact@monchomage.fr.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Cookies et publicit&eacute;</h2>
          <p className="mt-2">
            Ce site utilise <strong>Google AdSense</strong> pour diffuser des annonces publicitaires.
            Google AdSense d&eacute;pose des cookies afin de personnaliser les annonces affich&eacute;es
            en fonction de vos visites ant&eacute;rieures. Votre consentement est recueilli via notre
            banni&egrave;re de cookies conform&eacute;ment aux recommandations de la CNIL. Vous pouvez
            &agrave; tout moment refuser les cookies publicitaires ou en savoir plus sur notre{' '}
            <a href="/politique-confidentialite" className="text-blue-700 underline">politique de confidentialit&eacute;</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            Limitation de responsabilit&eacute;
          </h2>
          <p className="mt-2">
            Les r&eacute;sultats fournis par le calculateur sont des{' '}
            <strong>estimations indicatives</strong>, fond&eacute;es sur les param&egrave;tres
            publi&eacute;s par l&apos;Un&eacute;dic et sur des hypoth&egrave;ses simplificatrices
            d&eacute;crites dans notre page M&eacute;thodologie. Ils ne constituent ni une
            d&eacute;cision d&apos;ouverture de droits, ni un engagement, ni un conseil juridique.
            Seul France Travail est habilit&eacute; &agrave; calculer et &agrave; notifier vos
            droits exacts, sur la base de vos attestations employeur et de votre situation
            personnelle compl&egrave;te. L&apos;&eacute;diteur ne saurait &ecirc;tre tenu
            responsable des d&eacute;cisions prises sur le fondement des estimations
            affich&eacute;es, ni des cons&eacute;quences d&apos;&eacute;ventuelles erreurs ou
            d&apos;&eacute;volutions r&eacute;glementaires post&eacute;rieures &agrave; la
            derni&egrave;re mise &agrave; jour du site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Sources utilis&eacute;es</h2>
          <p className="mt-2">
            Les param&egrave;tres de calcul proviennent exclusivement de sources officielles&nbsp;:
            l&apos;Un&eacute;dic (document &laquo;&nbsp;Param&egrave;tres utiles&nbsp;&raquo;,
            &eacute;dition janvier 2026), France Travail (francetravail.fr) et le site officiel de
            l&apos;administration fran&ccedil;aise service-public.fr. Les dates de valeur et les
            r&eacute;f&eacute;rences pr&eacute;cises sont d&eacute;taill&eacute;es sur la page
            M&eacute;thodologie. MonChomage.fr n&apos;est affili&eacute; ni &agrave; France
            Travail, ni &agrave; l&apos;Un&eacute;dic, ni &agrave; aucun organisme public.
          </p>
        </section>
      </div>
    </main>
  )
}
