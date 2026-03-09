import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rinmo.ai'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Rinmo — AI Hiring Decision System',
    template: '%s | Rinmo',
  },
  description:
    'Rinmo screens candidates, runs structured evaluations, and produces ranked shortlists with reasoning and audit logs. Built for teams that hire with rigor.',
  keywords: ['AI hiring', 'candidate screening', 'structured interviews', 'hiring automation', 'ATS alternative'],
  authors: [{ name: 'Rinmo' }],
  creator: 'Rinmo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Rinmo',
    title: 'Rinmo — AI Hiring Decision System',
    description: 'Screen candidates, run structured evaluations, get ranked shortlists with reasoning. Early access open for hiring teams.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Rinmo — AI Hiring Decision System' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rinmo — AI Hiring Decision System',
    description: 'Screen candidates, run structured evaluations, get ranked shortlists with reasoning. Early access open.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
