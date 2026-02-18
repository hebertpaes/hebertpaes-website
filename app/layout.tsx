import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://hebertpaes.com'),
  title: {
    default: 'Hebert Paes | Full Stack Developer & Cloud Architect',
    template: '%s | Hebert Paes',
  },
  description:
    'Portfólio de Hebert Paes — soluções em Next.js, automação em Azure, dados e experiências digitais de alta performance.',
  keywords: [
    'Hebert Paes',
    'Next.js 14',
    'Azure Static Web Apps',
    'Cloud Architect',
    'Full Stack',
    'Consultoria Tech',
  ],
  openGraph: {
    type: 'website',
    url: 'https://hebertpaes.com',
    title: 'Hebert Paes | Full Stack Developer & Cloud Architect',
    description:
      'Experiências digitais modernas, pipelines automatizados e arquitetura cloud pronta para escala.',
    siteName: 'Hebert Paes',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hebert Paes Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@hebertpaes',
    title: 'Hebert Paes | Full Stack Developer & Cloud Architect',
    description:
      'Criação de produtos digitais com Next.js, automação de dados e cloud Azure.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  )
}
