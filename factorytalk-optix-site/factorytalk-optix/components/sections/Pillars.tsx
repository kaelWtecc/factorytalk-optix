'use client'
import { useState } from 'react'
import { useInView } from '@/hooks/useTheme'
import { useTilt } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'
import { PRODUCTS } from '@/lib/constants'
import { RotateCw } from 'lucide-react'

function PillarCard({ product, index, inView }: {
  product: typeof PRODUCTS[0]
  index: number
  inView: boolean
}) {
  const [flipped, setFlipped] = useState(false)
  const tiltRef = useTilt(8)

  const icons: Record<string, string> = {
    software: '💻',
    panel: '🖥️',
    edge: '📡',
    remote: '🔐',
    dataready: '📊',
  }

  return (
    <div
      className="flip-card"
      style={{
        height: '320px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(32px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div
        ref={tiltRef}
        className={cn('flip-card-inner h-full', flipped && 'flipped')}
        style={{ height: '100%' }}
      >
        {/* FRONT */}
        <div className="flip-card-front glass-card rounded-xl p-5 flex flex-col h-full group">
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px rounded-t-xl"
            style={{ background: `linear-gradient(90deg, transparent, ${product.color}, transparent)` }}
          />

          <div className="flex items-start justify-between mb-4">
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center text-2xl"
              style={{ background: `${product.color}18`, border: `1px solid ${product.color}30` }}
            >
              {icons[product.id]}
            </div>
            <button
              onClick={() => setFlipped(true)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md text-subtle hover:text-foreground hover:bg-[var(--surface-elevated)]"
              title="Ver specs"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mb-3">
            <div className="font-display font-bold text-foreground text-base mb-0.5">{product.name}</div>
            <div className="text-xs font-mono text-subtle">{product.type}</div>
          </div>

          <p className="text-sm text-muted leading-relaxed flex-1 mb-4">{product.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-auto">
            {product.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                style={{
                  background: `${product.color}18`,
                  color: product.color,
                  border: `1px solid ${product.color}30`,
                }}
              >
                {tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full text-subtle border border-subtle">
                +{product.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* BACK */}
        <div className="flip-card-back glass-card rounded-xl p-5 flex flex-col h-full">
          <div
            className="absolute top-0 left-0 right-0 h-px rounded-t-xl"
            style={{ background: `linear-gradient(90deg, transparent, ${product.color}, transparent)` }}
          />

          <div className="flex items-center justify-between mb-4">
            <div className="font-display font-bold text-foreground text-sm">{product.name}</div>
            <button
              onClick={() => setFlipped(false)}
              className="p-1.5 rounded-md text-subtle hover:text-foreground hover:bg-[var(--surface-elevated)] transition-colors"
              title="Voltar"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 space-y-1.5 overflow-y-auto custom-scroll">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="flex items-start justify-between gap-2 py-1 border-b border-subtle last:border-0">
                <span className="text-xs text-subtle font-mono shrink-0">{key}</span>
                <span className="text-xs text-foreground font-mono text-right">{val}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            {product.tags.map(tag => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                style={{
                  background: `${product.color}15`,
                  color: product.color,
                  border: `1px solid ${product.color}25`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Pillars() {
  const { ref, inView } = useInView()

  return (
    <section className="py-24 px-6 bg-secondary relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className="mb-12 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)' }}
        >
          <p className="section-label mb-3">
            <span className="w-8 h-px bg-[var(--accent-cyan)] inline-block" />
            Suite de produtos
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Os 5 Pilares da Plataforma
          </h2>
          <p className="text-muted max-w-lg text-sm">
            Passe o mouse nos cards para interagir · Clique em{' '}
            <span className="text-cyan font-mono">↻</span> para ver as especificações técnicas
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {PRODUCTS.map((product, i) => (
            <PillarCard key={product.id} product={product} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
