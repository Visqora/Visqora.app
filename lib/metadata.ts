import type { Metadata } from 'next'

const siteUrl = 'https://www.visqora.app'
const shareImage = {
  url: '/visqora-hero.png',
  width: 1376,
  height: 768,
  alt: 'Visqora Technologies eye artwork',
}

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
      images: [shareImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [shareImage.url],
    },
  }
}

export { siteUrl }