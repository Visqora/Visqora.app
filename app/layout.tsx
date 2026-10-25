import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.visqora.app'),
  title: { default: 'Visqora Technologies — Vision at the Core', template: '%s — Visqora Technologies' },
  description: 'Visqora designs and builds custom software, AI solutions and automations for growing businesses.',
  alternates: { canonical: '/' },
  icons: { icon: '/visqora-emblem.png', shortcut: '/visqora-emblem.png', apple: '/visqora-emblem.png' },
  openGraph: {
    title: 'Visqora Technologies — Vision at the Core',
    description: 'We turn your business problems into working technology.',
    url: 'https://www.visqora.app',
    siteName: 'Visqora Technologies',
    images: [{ url: '/visqora-emblem.png', width: 512, height: 512, alt: 'Visqora eye and globe emblem' }],
    type: 'website',
  },
}

export const viewport: Viewport = { themeColor: '#0b1437', colorScheme: 'light', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${montserrat.variable}`}>{children}</body></html>
}
