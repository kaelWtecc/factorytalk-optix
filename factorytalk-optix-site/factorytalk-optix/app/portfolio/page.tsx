'use client'
import { useState } from 'react'
import { PRODUCTS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { X, ArrowRight } from 'lucide-react'

export default function PortfolioPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [compare, setCompare] = useState<string[]>([])

  const selectedProduct = PRODUCTS.find(p => p.id === selected)
  const compareProducts = PRODUCTS.filter(p => compare.includes(p.id))

  const icons: Record<string, string> = {
    software: '💻', panel: '🖥️', edge: '📡', remote: '🔐', dataready: '📊'
  }

  const toggleCompare = (id: string) => {
    setCompare(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 2 ? [...prev, id] : [prev[1], id]
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-16 px-6 bg-secondary border-b border-subtle relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative max-w-7xl mx-auto">
          <p className="section-label mb-3">
            <span className="w-8 h-px bg-[var(--accent-cyan)] inline-block" />
            Suite completa
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-2">Produtos</h1>
          <p className="text-muted text-sm">
            Selecione até 2 produtos para comparar lado a lado.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Product cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {PRODUCTS.map(product => {
            const inCompare = compare.includes(product.id)
            return (
              <div
                key={product.id}
                className={cn(
                  'glass-card rounded-xl p-5 cursor-pointer transition-all duration-200 group relative',
                  selected === product.id
                    ? 'border-[var(--accent-cyan)] shadow-glow-cyan'
                    : 'hover:border-[var(--foreground-subtle)]'
                )}
                onClick={() => setSelected(selected === product.id ? null : product.id)}
                style={{ borderTopColor: product.color, borderTopWidth: '2px' }}
              >
                <div className="text-3xl mb-3">{icons[product.id]}</div>
                <div className="font-display font-bold text-foreground text-sm mb-0.5">{product.name}</div>
                <div className="text-[10px] font-mono text-subtle mb-3">{product.type}</div>
                <p className="text-xs text-muted leading-relaxed mb-4 line-clamp-3">{product.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {product.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                      style={{ background: `${product.color}15`, color: product.color, border: `1px solid ${product.color}25` }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={e => { e.stopPropagation(); toggleCompare(product.id) }}
                  className={cn(
                    'w-full text-[10px] font-mono py-1.5 rounded-md transition-all border',
                    inCompare
                      ? 'border-[var(--accent-cyan)] text-cyan bg-[var(--accent-cyan-dim)]'
                      : 'border-subtle text-subtle hover:text-foreground'
                  )}
                >
                  {inCompare ? '✓ Comparando' : '+ Comparar'}
                </button>
              </div>
            )
          })}
        </div>

        {/* Detail panel */}
        {selectedProduct && (
          <div className="glass-card rounded-xl p-6 relative" style={{ borderTopColor: selectedProduct.color, borderTopWidth: '2px' }}>
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-subtle hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{icons[selectedProduct.id]}</div>
                  <div>
                    <div className="font-display font-bold text-foreground text-lg">{selectedProduct.name}</div>
                    <div className="text-xs font-mono" style={{ color: selectedProduct.color }}>{selectedProduct.type}</div>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed mb-4">{selectedProduct.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono px-2 py-1 rounded-full"
                      style={{ background: `${selectedProduct.color}15`, color: selectedProduct.color, border: `1px solid ${selectedProduct.color}25` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-3">Especificações técnicas</div>
                <div className="space-y-2">
                  {Object.entries(selectedProduct.specs).map(([k, v]) => (
                    <div key={k} className="flex items-start justify-between gap-4 py-2 border-b border-subtle last:border-0">
                      <span className="text-xs text-subtle font-mono shrink-0">{k}</span>
                      <span className="text-xs text-foreground font-mono text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comparison table */}
        {compareProducts.length === 2 && (
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-subtle">
              <span className="font-mono text-xs text-cyan uppercase tracking-widest">Comparativo</span>
              <button onClick={() => setCompare([])} className="text-subtle hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--surface-elevated)]">
                    <th className="text-left px-5 py-3 font-mono text-[11px] text-subtle uppercase">Especificação</th>
                    {compareProducts.map(p => (
                      <th key={p.id} className="text-left px-5 py-3 font-mono text-xs" style={{ color: p.color }}>
                        {icons[p.id]} {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(compareProducts[0].specs).map(k => (
                    <tr key={k} className="border-t border-subtle hover:bg-[var(--surface-elevated)]">
                      <td className="px-5 py-2.5 font-mono text-[11px] text-subtle">{k}</td>
                      {compareProducts.map(p => (
                        <td key={p.id} className="px-5 py-2.5 font-mono text-xs text-foreground">
                          {p.specs[k] || <span className="text-subtle">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
