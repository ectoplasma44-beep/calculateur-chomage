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
        <div className="flex-1">{children}</div>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
            <p className="text-sm text-slate-600">
              &copy; 2026 MonChomage.fr &mdash; Outil ind&eacute;pendant, non affili&eacute;
              &agrave; France Travail
            </p>
            <nav aria-label="Liens de pied de page" className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link href="/" className="text-slate-600 hover:text-blue-700 hover:underline">
                Accueil
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
