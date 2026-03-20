'use client'
import { useInView } from '@/hooks/useTheme'
import { USE_CASES } from '@/lib/constants'

export function UseCases() {
  const { ref, inView } = useInView()

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="mb-12 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)' }}
        >
          <p className="section-label mb-3">
            <span className="w-8 h-px bg-[var(--accent-cyan)] inline-block" />
            Aplicações
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Casos de Uso Técnicos
          </h2>
          <p className="text-muted max-w-lg text-sm">
            Padrões reais de implementação do FactoryTalk Optix em ambientes industriais.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {USE_CASES.map((uc, i) => (
            <div
              key={uc.title}
              className="glass-card rounded-xl p-6 group hover:border-[var(--accent-cyan)] hover:shadow-glow-cyan transition-all duration-300"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(24px)',
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s, border-color 0.3s, box-shadow 0.3s`,
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">{uc.icon}</div>
                <div>
                  <div className="font-display font-bold text-foreground mb-0.5">{uc.title}</div>
                  <div className="text-xs font-mono text-cyan">{uc.sector}</div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-1">Desafio</div>
                  <p className="text-sm text-muted">{uc.challenge}</p>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-1">Solução</div>
                  <p className="text-sm text-muted">{uc.solution}</p>
                </div>
                <div className="p-3 rounded-lg bg-[var(--accent-cyan-dim)] border border-[rgba(0,200,255,0.15)]">
                  <div className="text-[10px] font-mono text-cyan uppercase tracking-widest mb-1">Resultado</div>
                  <p className="text-sm text-foreground font-medium">{uc.result}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {uc.tags.map(tag => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
