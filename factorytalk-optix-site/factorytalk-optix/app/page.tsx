import { Hero } from '@/components/sections/Hero'
import { Overview } from '@/components/sections/Overview'
import { Pillars } from '@/components/sections/Pillars'
import { UseCases } from '@/components/sections/UseCases'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Overview />
      <Pillars />
      <UseCases />

      {/* CTA band */}
      <section className="py-20 px-6 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono text-cyan uppercase tracking-widest">
            <span className="w-8 h-px bg-[var(--accent-cyan)]" />
            Próximo passo
            <span className="w-8 h-px bg-[var(--accent-cyan)]" />
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Explore a plataforma em detalhes
          </h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Funcionalidades técnicas, arquitetura de referência, suite de produtos e demo HMI ao vivo com dados simulados em tempo real.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/features" className="hmi-btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-mono font-semibold">
              Funcionalidades <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/architecture" className="hmi-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-mono">
              Arquitetura <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/demo" className="hmi-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-mono">
              Demo HMI Live <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
