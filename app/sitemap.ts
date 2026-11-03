import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/metadata'
import { projects } from '@/lib/projects'
import { serviceSlugs } from '@/lib/services'

const routes = ['', '/about', '/careers', '/contact', '/privacy', '/services', '/terms', '/work']

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const staticRoutes: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }))
  const services: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({ url: `${siteUrl}/services/${slug}`, lastModified, changeFrequency: 'monthly', priority: 0.8 }))
  const work: MetadataRoute.Sitemap = projects.map(({ slug }) => ({ url: `${siteUrl}/work/${slug}`, lastModified, changeFrequency: 'monthly', priority: 0.8 }))

  return [...staticRoutes, ...services, ...work]
}