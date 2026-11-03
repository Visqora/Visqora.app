import type { Metadata } from 'next'

const siteUrl = 'https://www.visqora.app'

// OG/Twitter images come from the opengraph-image.tsx file conventions (generated per route).
export function createPageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'Visqora Technologies',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export { siteUrl }