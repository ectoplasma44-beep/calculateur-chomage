import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.monchomage.fr"),
  title: {
    default: "MonChomage.fr — Calculateur d'allocation chômage (ARE)",
    template: "%s",
  },
  description:
    "Calculateur gratuit d'allocation chômage (ARE) et guides pour comprendre vos droits. Paramètres officiels Unédic, outil indépendant.",
  openGraph: {
    siteName: "MonChomage.fr",
    locale: "fr_FR",
    type: "website",
  },
};

const NAV_SITUATIONS = [
  { href: "/rupture-conventionnelle", label: "Rupture conv." },
  { href: "/fin-de-cdd", label: "Fin de CDD" },
  { href: "/licenciement-economique", label: "Licenciement éco." },
  { href: "/salaire-journalier-reference", label: "SJR" },
  { href: "/duree-indemnisation", label: "Durée" },
  { href: "/demission-legitime", label: "Démission" },
  { href: "/abandon-de-poste", label: "Abandon poste" },
  { href: "/cumul-emploi-chomage", label: "Cumul emploi" },
  { href: "/degressivite-chomage", label: "Dégressivité" },
  { href: "/chomage-seniors", label: "Seniors" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
            <div className="flex h-14 items-center">
              <Link
                href="/"
                className="shrink-0 text-lg font-bold text-blue-700 hover:text-blue-800"
              >
                MonCh&ocirc;mage.fr
              </Link>
            </div>
            {/* Navigation desktop — deux rangées wrappées */}
            <nav
              aria-label="Navigation principale"
              className="hidden flex-wrap gap-x-0.5 gap-y-0.5 pb-2 sm:flex"
            >
              {NAV_SITUATIONS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="whitespace-nowrap rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                >
                  {label}
                </Link>
              ))}
            </nav>
            {/* Navigation mobile — chips défilantes */}
            <nav
              aria-label="Navigation situations"
              className="flex gap-2 overflow-x-auto pb-2 pt-1 sm:hidden"
            >
              {NAV_SITUATIONS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600 hover:border-blue-300 hover:text-blue-700"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
            <p className="text-sm text-slate-600">
              &copy; 2026 MonChomage.fr &mdash; Outil ind&eacute;pendant, non affili&eacute;
              &agrave; France Travail
            </p>
            <nav
              aria-label="Liens de pied de page"
              className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm"
            >
              <Link href="/" className="text-slate-600 hover:text-blue-700 hover:underline">
                Accueil
              </Link>
              <Link
                href="/rupture-conventionnelle"
                className="text-slate-600 hover:text-blue-700 hover:underline"
              >
                Rupture conventionnelle
              </Link>
              <Link
                href="/fin-de-cdd"
                className="text-slate-600 hover:text-blue-700 hover:underline"
              >
                Fin de CDD
              </Link>
              <Link
                href="/licenciement-economique"
                className="text-slate-600 hover:text-blue-700 hover:underline"
              >
                Licenciement &eacute;conomique
              </Link>
              <Link
                href="/salaire-journalier-reference"
                className="text-slate-600 hover:text-blue-700 hover:underline"
              >
                SJR
              </Link>
              <Link
                href="/duree-indemnisation"
                className="text-slate-600 hover:text-blue-700 hover:underline"
              >
                Dur&eacute;e
              </Link>
              <Link
                href="/demission-legitime"
                className="text-slate-600 hover:text-blue-700 hover:underline"
              >
                D&eacute;mission l&eacute;gitime
              </Link>
              <Link
                href="/abandon-de-poste"
                className="text-slate-600 hover:text-blue-700 hover:underline"
              >
                Abandon de poste
              </Link>
              <Link
                href="/cumul-emploi-chomage"
                className="text-slate-600 hover:text-blue-700 hover:underline"
              >
                Cumul emploi-ch&ocirc;mage
              </Link>
              <Link
                href="/degressivite-chomage"
                className="text-slate-600 hover:text-blue-700 hover:underline"
              >
                D&eacute;gressivit&eacute;
              </Link>
              <Link
                href="/chomage-seniors"
                className="text-slate-600 hover:text-blue-700 hover:underline"
              >
                S&eacute;niors
              </Link>
              <Link
                href="/comprendre-assurance-chomage"
                className="text-slate-600 hover:text-blue-700 hover:underline"
              >
                Guide
              </Link>
              <Link
                href="/methodologie"
                className="text-slate-600 hover:text-blue-700 hover:underline"
              >
                M&eacute;thodologie
              </Link>
              <Link
                href="/mentions-legales"
                className="text-slate-600 hover:text-blue-700 hover:underline"
              >
                Mentions l&eacute;gales
              </Link>
              <Link
                href="/a-propos"
                className="text-slate-600 hover:text-blue-700 hover:underline"
              >
                &Agrave; propos
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
