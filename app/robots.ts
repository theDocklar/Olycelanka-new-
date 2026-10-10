import {MetadataRoute} from 'next'
import {headers} from 'next/headers'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get('host') ?? 'localhost:3000'
  return {rules: {userAgent: '*', allow: '/'}, sitemap: `https://${host}/sitemap.xml`}
}
