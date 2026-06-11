import type { MetadataRoute } from 'next'

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
  ]
}
