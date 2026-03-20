import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProgressBar } from '@/components/layout/ProgressBar'

export const metadata: Metadata = {
  title: 'FactoryTalk Optix | Plataforma HMI Industrial',
  description: 'Apresentação técnica da plataforma FactoryTalk Optix — HMI open-architecture com OPC UA nativo, scripting C#, deploy multi-plataforma e integração cloud.',
  keywords: ['FactoryTalk Optix', 'HMI industrial', 'OPC UA', 'IIoT', 'Indústria 4.0', 'Rockwell Automation'],
  openGraph: {
    title: 'FactoryTalk Optix — Plataforma HMI para Indústria 4.0',
    description: 'Plataforma de desenvolvimento HMI open-architecture com OPC UA nativo, scripting C#, e integração cloud.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('optix-theme');
                if (t === 'light') document.documentElement.classList.add('light');
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="bg-base text-foreground font-sans antialiased">
        <ProgressBar />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
