import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Visqora Technologies',
    short_name: 'Visqora Technologies',
    description: 'Custom software, AI solutions and automation for growing businesses.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0b1437',
    icons: [
      { src: '/visqora-emblem.png', sizes: '474x527', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}