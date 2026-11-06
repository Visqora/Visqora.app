import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Inter, Instrument_Serif, Montserrat } from 'next/font/google'
import { Cursor } from '@/components/motion'
import { siteUrl } from '@/lib/metadata'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: 'italic', variable: '--font-serif' })

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Visqora Technologies | Vision at the core', template: '%s | Visqora Technologies' },
  description: 'Vision at the core. Visqora Technologies builds AI-powered solutions, custom software, web and mobile applications, and intelligent business automation systems.',
  applicationName: 'Visqora Technologies',
  alternates: { canonical: '/' },
  icons: { icon: '/icon-dark-32x32.png', shortcut: '/icon-dark-32x32.png', apple: '/apple-icon.png' },
  openGraph: {
    title: 'Visqora Technologies | Vision at the core',
    description: 'AI solutions, custom software and intelligent automation. Vision at the core.',
    url: '/',
    siteName: 'Visqora Technologies',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visqora Technologies | Vision at the core',
    description: 'AI solutions, custom software and intelligent automation. Vision at the core.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = { themeColor: '#0b1437', colorScheme: 'light', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${montserrat.variable} ${serif.variable}`}>{children}<Cursor />{process.env.VERCEL === '1' && <Analytics />}</body></html>
}
