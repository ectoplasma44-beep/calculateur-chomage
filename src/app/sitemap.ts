import type { MetadataRoute } from 'next'
import { SALAIRES_CONFIG } from '@/lib/salaires-data'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.monchomage.fr',
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://www.monchomage.fr/rupture-conventionnelle',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.monchomage.fr/fin-de-cdd',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.monchomage.fr/licenciement-economique',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.monchomage.fr/salaire-journalier-reference',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.monchomage.fr/duree-indemnisation',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.monchomage.fr/demission-legitime',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.monchomage.fr/abandon-de-poste',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.monchomage.fr/cumul-emploi-chomage',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.monchomage.fr/degressivite-chomage',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.monchomage.fr/chomage-seniors',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.monchomage.fr/comprendre-assurance-chomage',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.monchomage.fr/methodologie',
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://www.monchomage.fr/a-propos',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://www.monchomage.fr/mentions-legales',
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: 'https://www.monchomage.fr/demission-reconversion-cpf',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.monchomage.fr/licenciement-faute',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://www.monchomage.fr/temps-partiel',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.monchomage.fr/delai-carence-chomage',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.monchomage.fr/chomage-net-brut',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.monchomage.fr/chomage-cadre',
      lastModified: '2026-06-13',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.monchomage.fr/rupture-conventionnelle-cadre',
      lastModified: '2026-06-13',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.monchomage.fr/licenciement-economique-cadre',
      lastModified: '2026-06-13',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.monchomage.fr/chomage-interimaire',
      lastModified: '2026-06-13',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.monchomage.fr/fin-de-cdd-interimaire',
      lastModified: '2026-06-13',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.monchomage.fr/chomage-alternant-apprenti',
      lastModified: '2026-06-13',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.monchomage.fr/fin-de-cdd-alternant',
      lastModified: '2026-06-13',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.monchomage.fr/rupture-conventionnelle-senior',
      lastModified: '2026-06-13',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.monchomage.fr/licenciement-economique-senior',
      lastModified: '2026-06-13',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.monchomage.fr/chomage-rqth',
      lastModified: '2026-06-13',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.monchomage.fr/fin-de-cdd-rqth',
      lastModified: '2026-06-13',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.monchomage.fr/chomage-apres-conge-maternite',
      lastModified: '2026-06-13',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.monchomage.fr/rupture-conventionnelle-conge-parental',
      lastModified: '2026-06-13',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.monchomage.fr/chomage-fonctionnaire-reconversion',
      lastModified: '2026-06-13',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...SALAIRES_CONFIG.map((s) => ({
      url: `https://www.monchomage.fr/chomage-salaire-${s.slug}-euros`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
