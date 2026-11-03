import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Inter, Instrument_Serif, Montserrat } from 'next/font/google'
import { Cursor } from '@/components/motion'
import { JsonLd } from '@/components/json-ld'
import { siteUrl } from '@/lib/metadata'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: 'italic', variable: '--font-serif' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.visqora.app'),
  title: { default: 'Visqora Technologies', template: '%s — Visqora Technologies' },
  description: 'Visqora designs and builds custom software, AI solutions and automations for growing businesses.',
  icons: { icon: '/icon-dark-32x32.png', shortcut: '/icon-dark-32x32.png', apple: '/apple-icon.png' },
  openGraph: {
    title: 'Visqora Technologies — Vision at the Core',
    description: 'We turn your business problems into working technology.',
    url: 'https://www.visqora.app',
    siteName: 'Visqora Technologies',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visqora Technologies — Vision at the Core',
    description: 'We turn your business problems into working technology.',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Visqora Technologies',
      url: siteUrl,
      logo: `${siteUrl}/visqora-logo.png`,
      description: 'Visqora designs and builds custom software, AI solutions and automations for growing businesses.',
      email: 'visqora@gmail.com',
      slogan: 'Vision at the core.',
      address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
      sameAs: ['https://linkedin.com/company/visqora-technologies', 'https://github.com/Visqora'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'Visqora Technologies',
      url: siteUrl,
      publisher: { '@id': `${siteUrl}/#organization` },
    },
  ],
}

export const viewport: Viewport = { themeColor: '#0b1437', colorScheme: 'light', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${montserrat.variable} ${serif.variable}`}><JsonLd data={organizationJsonLd} />{children}<Cursor />{process.env.VERCEL === '1' && <Analytics />}</body></html>
}
