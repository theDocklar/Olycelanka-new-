import {MetadataRoute} from 'next'
import {headers} from 'next/headers'
import {getPackages} from '../lib/data'

type Entry = MetadataRoute.Sitemap[number]

const PAGES: {path: string; changeFrequency: Entry['changeFrequency']; priority: number}[] = [
  {path: '', changeFrequency: 'daily', priority: 1},
  {path: '/tours', changeFrequency: 'weekly', priority: 0.9},
  {path: '/gallery', changeFrequency: 'monthly', priority: 0.5},
  {path: '/about', changeFrequency: 'monthly', priority: 0.7},
  {path: '/enquiry', changeFrequency: 'monthly', priority: 0.8},
  {path: '/contact-us', changeFrequency: 'monthly', priority: 0.7},
  {path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3},
  {path: '/terms', changeFrequency: 'yearly', priority: 0.3},
  {path: '/refund-policy', changeFrequency: 'yearly', priority: 0.3},
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers()
  const host = headersList.get('host') ?? 'localhost:3000'
  const baseUrl = `https://${host}`

  const packages = await getPackages()

  const pageEntries: MetadataRoute.Sitemap = PAGES.map(({path, changeFrequency, priority}) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))

  const tourEntries: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: `${baseUrl}/tour/${pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...pageEntries, ...tourEntries]
}
