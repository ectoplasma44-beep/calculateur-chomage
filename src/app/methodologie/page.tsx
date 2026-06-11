import type { Metadata } from 'next'
import Link from 'next/link'
import { ARE_PARAMS } from '@/lib/are-parametres'
import { euros, eurosEntiers, pourcent, dateFr } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Méthodologie de calcul | MonChomage.fr',
  description:
    'Sources officielles, formules exactes, simplifications et limites du calculateur ARE de MonChomage.fr. Transparence complète sur la méthode de calcul.',
  alternates: {
    canonical: 'https://www.monchomage.fr/methodologie',
  },
}

export default function Methodologie() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        M&eacute;thodologie de calcul
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Derni&egrave;re mise &agrave; jour des param&egrave;tres&nbsp;: 1er juillet 2025
      </p>

      <div className="mt-6 space-y-6 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Sources officielles</h2>
          <p className="mt-2">
            L&apos;int&eacute;gralit&eacute; des param&egrave;tres utilis&eacute;s par le
            calculateur provient de trois sources officielles, et uniquement de celles-ci&nbsp;:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong>Un&eacute;dic</strong> &mdash; document &laquo;&nbsp;Param&egrave;tres
              utiles&nbsp;&raquo;, &eacute;dition janvier 2026 (unedic.org). C&apos;est la
              r&eacute;f&eacute;rence principale pour les taux, montants et seuils.
            </li>
            <li>
              <strong>France Travail</strong> (francetravail.fr) &mdash; pour les r&egrave;gles
              d&apos;ouverture de droits, la dur&eacute;e d&apos;indemnisation et les modalit&eacute;s
              pratiques.
            </li>
            <li>
              <strong>service-public.fr</strong> &mdash; le site officiel de l&apos;administration
              fran&ccedil;aise, pour les fiches de synth&egrave;se r&eacute;glementaires.
            </li>
          </ul>
          <p className="mt-2">
            Les valeurs actuelles sont en vigueur depuis le {dateFr(ARE_PARAMS.dateValeur)}{' '}
            (revalorisation annuelle de +0,5&nbsp;%).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Formules exactes</h2>
          <p className="mt-2">
            <strong>1. Salaire journalier de r&eacute;f&eacute;rence (SJR).</strong> Le salaire
            mensuel brut saisi est plafonn&eacute; &agrave;{' '}
            {eurosEntiers(ARE_PARAMS.plafondSalaireRefMensuel)} (plafond de l&apos;assiette des
            contributions d&apos;assurance ch&ocirc;mage). La p&eacute;riode de
            r&eacute;f&eacute;rence est limit&eacute;e &agrave; {ARE_PARAMS.moisRefMoins55ans} mois
            (ou {ARE_PARAMS.moisRefPlus55ans} mois &agrave; partir de 55 ans). Le SJR est obtenu en
            divisant le total des salaires de la p&eacute;riode par le nombre de jours calendaires,
            soit {ARE_PARAMS.joursParMoisSJR} jours par mois dans notre simplification.
          </p>
          <p className="mt-2">
            <strong>2. Allocation journali&egrave;re (AJ).</strong> Deux formules sont
            compar&eacute;es et la plus &eacute;lev&eacute;e est retenue&nbsp;:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              Formule 1&nbsp;: {pourcent(ARE_PARAMS.tauxFormule1)} &times; SJR +{' '}
              {euros(ARE_PARAMS.partieFix)} par jour
            </li>
            <li>Formule 2&nbsp;: {pourcent(ARE_PARAMS.tauxFormule2)} &times; SJR</li>
          </ul>
          <p className="mt-2">
            Le r&eacute;sultat est plafonn&eacute; &agrave; {pourcent(ARE_PARAMS.plafondTauxSJR)} du
            SJR, puis le plancher de {euros(ARE_PARAMS.allocationMinimale)} par jour est
            appliqu&eacute; (le plancher pr&eacute;vaut sur le plafond). L&apos;allocation mensuelle
            correspond &agrave; AJ &times; {ARE_PARAMS.joursParMois} jours, quel que soit le mois
            civil.
          </p>
          <p className="mt-2">
            <strong>3. D&eacute;gressivit&eacute;.</strong> Si l&apos;allocataire a moins de{' '}
            {ARE_PARAMS.ageLimiteDegressivite} ans &agrave; la fin de son contrat et que son AJ
            d&eacute;passe {euros(ARE_PARAMS.seuilDegressiviteAJ)}, un coefficient de{' '}
            {ARE_PARAMS.coeffDegressivite.toLocaleString('fr-FR')} est appliqu&eacute; (soit une
            r&eacute;duction de {pourcent(1 - ARE_PARAMS.coeffDegressivite)}) &agrave; partir du{' '}
            {ARE_PARAMS.joursAvantDegressivite + 1}e jour indemnis&eacute;, sans pouvoir descendre
            sous {euros(ARE_PARAMS.seuilDegressiviteAJ)} par jour.
          </p>
          <p className="mt-2">
            <strong>4. Dur&eacute;e d&apos;indemnisation.</strong> Un jour cotis&eacute; = un jour
            indemnis&eacute;, avec un minimum de {ARE_PARAMS.dureeMinJours} jours d&apos;affiliation
            requis et un maximum de {ARE_PARAMS.dureeMaxMoins50ansJours} jours avant 50 ans ou{' '}
            {ARE_PARAMS.dureeMax50ansEtPlusJours} jours &agrave; partir de 50 ans.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            Simplifications et limites du calculateur
          </h2>
          <p className="mt-2">
            Notre calculateur applique des hypoth&egrave;ses simplificatrices qu&apos;il est
            important de conna&icirc;tre&nbsp;:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong>SJR approxim&eacute;</strong>&nbsp;: nous supposons un emploi continu &agrave;
              salaire constant (SJR = salaire mensuel / {ARE_PARAMS.joursParMoisSJR}). Le calcul
              r&eacute;el de France Travail repose sur les attestations employeur, jour par jour, et
              int&egrave;gre les p&eacute;riodes non travaill&eacute;es dans la limite de{' '}
              {pourcent(ARE_PARAMS.tauxMaxJoursNonTravailles)} des jours travaill&eacute;s
              (d&eacute;cret de 2021).
            </li>
            <li>
              Les primes, indemnit&eacute;s de fin de contrat et variations de salaire ne sont pas
              mod&eacute;lis&eacute;es&nbsp;: saisissez votre salaire brut moyen pour une estimation
              plus fid&egrave;le.
            </li>
            <li>
              Les diff&eacute;r&eacute;s d&apos;indemnisation (cong&eacute;s pay&eacute;s,
              indemnit&eacute;s supral&eacute;gales) et le d&eacute;lai d&apos;attente de 7 jours ne
              sont pas calcul&eacute;s.
            </li>
            <li>
              Les pr&eacute;l&egrave;vements sociaux (retraite compl&eacute;mentaire, CSG, CRDS) ne
              sont pas d&eacute;duits&nbsp;: les montants affich&eacute;s sont bruts.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Cas non couverts</h2>
          <p className="mt-2">
            Le calculateur ne couvre pas les situations suivantes, qui ob&eacute;issent &agrave;
            des r&egrave;gles sp&eacute;cifiques&nbsp;:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>
              <strong>Temps partiel</strong> et coefficient temps partiel sur la partie fixe et le
              plancher&nbsp;;
            </li>
            <li>
              <strong>Intermittents du spectacle</strong> (annexes 8 et 10) et autres r&eacute;gimes
              particuliers (dockers, expatri&eacute;s&hellip;)&nbsp;;
            </li>
            <li>
              <strong>Contrat de s&eacute;curisation professionnelle (CSP)</strong> apr&egrave;s
              licenciement &eacute;conomique&nbsp;;
            </li>
            <li>
              <strong>Multiactivit&eacute;</strong> (plusieurs employeurs simultan&eacute;s) et
              activit&eacute;s conserv&eacute;es&nbsp;;
            </li>
            <li>
              <strong>Mois incomplets</strong>, p&eacute;riodes de maladie, maternit&eacute; ou
              activit&eacute; partielle au cours de la p&eacute;riode de
              r&eacute;f&eacute;rence&nbsp;;
            </li>
            <li>
              Le cumul allocation / salaire en cas de reprise d&apos;activit&eacute;
              r&eacute;duite.
            </li>
          </ul>
          <p className="mt-2">
            Dans ces situations, l&apos;estimation affich&eacute;e peut s&apos;&eacute;carter
            sensiblement de vos droits r&eacute;els&nbsp;: rapprochez-vous de France Travail.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">
            Engagement de mise &agrave; jour
          </h2>
          <p className="mt-2">
            Les param&egrave;tres sont centralis&eacute;s dans un fichier unique de notre code,
            dat&eacute; et sourc&eacute;, afin d&apos;&eacute;viter toute incoh&eacute;rence entre
            les pages du site. La prochaine r&eacute;vision est pr&eacute;vue pour le{' '}
            {dateFr(ARE_PARAMS.prochaineRevalo)}, date de la prochaine revalorisation annuelle
            attendue. En cas de r&eacute;forme adopt&eacute;e avant cette date (des
            n&eacute;gociations sont en cours sur l&apos;assurance ch&ocirc;mage), la mise &agrave;
            jour sera effectu&eacute;e d&egrave;s publication des textes. Si vous constatez un
            &eacute;cart avec une source officielle, signalez-le &agrave;
            contact@monchomage.fr&nbsp;: voir notre page{' '}
            <Link href="/a-propos" className="text-blue-700 underline">
              &Agrave; propos
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
