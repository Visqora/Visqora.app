import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Inter, Instrument_Serif, Montserrat } from 'next/font/google'
import { Cursor } from '@/components/motion'
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
    images: [{ url: '/visqora-hero.png', width: 1376, height: 768, alt: 'Visqora Technologies eye artwork' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visqora Technologies — Vision at the Core',
    description: 'We turn your business problems into working technology.',
    images: ['/visqora-hero.png'],
  },
}

export const viewport: Viewport = { themeColor: '#0b1437', colorScheme: 'light', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${montserrat.variable} ${serif.variable}`}>{children}<Cursor />{process.env.VERCEL === '1' && <Analytics />}</body></html>
}
