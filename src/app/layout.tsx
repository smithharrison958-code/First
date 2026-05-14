import type { Metadata } from 'next'
import { Oswald, Inter } from 'next/font/google'
import './globals.css'
import { RaceDayProvider } from '@/lib/context'
import { SmoothScrollProvider } from '@/lib/SmoothScroll'

/* ─────────────────────────────────────────────
   Fonts
   next/font self-hosts these — no browser
   request to Google at runtime.
───────────────────────────────────────────── */

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

/* ─────────────────────────────────────────────
   Metadata
───────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: 'Dillon Smith | Elite 800m Runner',
    template: '%s | Dillon Smith',
  },
  description:
    'Dillon Smith is an elite NCAA 800m runner competing for Corpus Christi University — pushing the limits of middle-distance running with speed, discipline, and drive.',
  keywords: [
    '800m runner',
    'NCAA track and field',
    'Dillon Smith athlete',
    'Corpus Christi University track',
    'middle distance runner',
    'elite sprinter',
    'college track athlete',
    '800 meters',
  ],
  authors: [{ name: 'Dillon Smith' }],
  creator: 'Dillon Smith',
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    siteName: 'Dillon Smith | Elite 800m Runner',
    title: 'Dillon Smith | Elite 800m Runner',
    description:
      'Elite NCAA 800m runner at Corpus Christi University. Speed. Discipline. Drive.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dillon Smith | Elite 800m Runner',
    description: 'Elite NCAA 800m runner at Corpus Christi University.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

/* ─────────────────────────────────────────────
   Root Layout  (Server Component — no "use client")
───────────────────────────────────────────── */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} h-full`}
    >
      <body
        className="min-h-full antialiased font-sans"
        style={{ backgroundColor: '#050505', color: '#E8E8F0' }}
      >
        <RaceDayProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </RaceDayProvider>
      </body>
    </html>
  )
}
