'use client'
import { useState } from 'react'
import { ARCHITECTURE_NODES } from '@/lib/constants'
import type { ArchitectureNode } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { X, Layers, Zap } from 'lucide-react'

const LAYER_CONFIG = {
  cloud:   { label: 'CLOUD LAYER',   color: '#00C8FF', y: 0,   h: 22 },
  edge:    { label: 'EDGE LAYER',    color: '#F97316', y: 26,  h: 22 },
  machine: { label: 'MACHINE LAYER', color: '#22C55E', y: 52,  h: 22 },
  field:   { label: 'FIELD LAYER',   color: '#7ba3c4', y: 78,  h: 22 },
}

const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  'ft-hub':       { x: 15, y: 11 },
  'datamosaix':   { x: 40, y: 11 },
  'plex':         { x: 62, y: 11 },
  'fiix':         { x: 83, y: 11 },
  'optix-edge':   { x: 28, y: 37 },
  'logix-edge':   { x: 68, y: 37 },
  'optix-panel':  { x: 18, y: 63 },
  'hmi-pc':       { x: 45, y: 63 },
  'web-client':   { x: 73, y: 63 },
  'controllogix': { x: 15, y: 89 },
  'micro850':     { x: 35, y: 89 },
  's7-1500':      { x: 58, y: 89 },
  'codesys':      { x: 80, y: 89 },
}

const CONNECTIONS = [
  // Cloud ↔ Edge
  ['ft-hub', 'optix-edge'], ['ft-hub', 'logix-edge'],
  ['datamosaix', 'optix-edge'], ['datamosaix', 'logix-edge'],
  // Edge ↔ Machine
  ['optix-edge', 'optix-panel'], ['optix-edge', 'hmi-pc'], ['optix-edge', 'web-client'],
  ['logix-edge', 'hmi-pc'], ['logix-edge', 'web-client'],
  // Machine ↔ Field
  ['optix-panel', 'controllogix'], ['optix-panel', 'micro850'],
  ['hmi-pc', 'controllogix'], ['hmi-pc', 'micro850'], ['hmi-pc', 's7-1500'], ['hmi-pc', 'codesys'],
  ['web-client', 's7-1500'],
]

const LAYER_COLORS = { cloud: '#00C8FF', edge: '#F97316', machine: '#22C55E', field: '#7ba3c4' }

export default function ArchitecturePage() {
  const [selected, setSelected] = useState<ArchitectureNode | null>(null)
  const [mode, setMode] = useState<'greenfield' | 'brownfield'>('greenfield')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const getConnectedIds = (nodeId: string) => {
    const connected = new Set<string>([nodeId])
    CONNECTIONS.forEach(([a, b]) => {
      if (a === nodeId) connected.add(b)
      if (b === nodeId) connected.add(a)
    })
    return connected
  }

  const connectedIds = hoveredId ? getConnectedIds(hoveredId) : null

  const brownfieldHide = ['ft-hub', 'datamosaix', 'plex', 'fiix']
  const visibleNodes = mode === 'brownfield'
    ? ARCHITECTURE_NODES.filter(n => !brownfieldHide.includes(n.id))
    : ARCHITECTURE_NODES

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-16 px-6 bg-secondary border-b border-subtle relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="section-label mb-3">
              <span className="w-8 h-px bg-[var(--accent-cyan)] inline-block" />
              Referência técnica
            </p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-2">
              Arquitetura
            </h1>
            <p className="text-muted text-sm max-w-md">
              Diagrama interativo de referência. Clique nos nós para detalhes técnicos.
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex items-center gap-1 glass-card rounded-lg p-1">
            {(['greenfield', 'brownfield'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all capitalize',
                  mode === m
                    ? 'bg-[var(--accent-cyan)] text-[#050d1a]'
                    : 'text-muted hover:text-foreground'
                )}
              >
                {m === 'greenfield' ? '🟢 Greenfield' : '🏗️ Brownfield'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Diagram */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-subtle">
                  {mode === 'greenfield' ? 'Arquitetura completa (Greenfield)' : 'Integração com sistemas legados (Brownfield)'}
                </span>
                <div className="flex items-center gap-3">
                  {Object.entries(LAYER_CONFIG).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: v.color }} />
                      <span className="text-[10px] font-mono text-subtle">{k}</span>
                    </div>
                  ))}
                </div>
              </div>

              <svg viewBox="0 0 100 102" className="w-full" style={{ height: '520px' }}>
                {/* Layer backgrounds */}
                {Object.entries(LAYER_CONFIG).map(([layer, cfg]) => (
                  <g key={layer}>
                    <rect x="0" y={cfg.y} width="100" height={cfg.h} fill={cfg.color} fillOpacity="0.04" rx="1" />
                    <rect x="0" y={cfg.y} width="1" height={cfg.h} fill={cfg.color} fillOpacity="0.3" />
                    <text x="2" y={cfg.y + 4} fontSize="2.5" fill={cfg.color} fillOpacity="0.7" fontFamily="monospace" fontWeight="bold">
                      {cfg.label}
                    </text>
                  </g>
                ))}

                {/* Connections */}
                {CONNECTIONS.map(([a, b]) => {
                  const pa = NODE_POSITIONS[a]
                  const pb = NODE_POSITIONS[b]
                  const naNode = ARCHITECTURE_NODES.find(n => n.id === a)
                  const nbNode = ARCHITECTURE_NODES.find(n => n.id === b)
                  if (!pa || !pb || !naNode || !nbNode) return null

                  const visibleA = visibleNodes.find(n => n.id === a)
                  const visibleB = visibleNodes.find(n => n.id === b)
                  if (!visibleA || !visibleB) return null

                  const isHighlighted = connectedIds
                    ? (connectedIds.has(a) && connectedIds.has(b))
                    : false

                  const layerColor = LAYER_COLORS[naNode.layer as keyof typeof LAYER_COLORS]

                  return (
                    <line
                      key={`${a}-${b}`}
                      x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                      stroke={isHighlighted ? layerColor : layerColor}
                      strokeOpacity={isHighlighted ? 0.6 : connectedIds ? 0.05 : 0.2}
                      strokeWidth={isHighlighted ? 0.6 : 0.3}
                      strokeDasharray={isHighlighted ? 'none' : '1,1'}
                    />
                  )
                })}

                {/* Nodes */}
                {visibleNodes.map(node => {
                  const pos = NODE_POSITIONS[node.id]
                  if (!pos) return null
                  const color = LAYER_COLORS[node.layer as keyof typeof LAYER_COLORS]
                  const isSelected = selected?.id === node.id
                  const isHovered = hoveredId === node.id
                  const isDimmed = connectedIds && !connectedIds.has(node.id)
                  const r = isSelected || isHovered ? 4 : 3

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${pos.x},${pos.y})`}
                      className="cursor-pointer"
                      onClick={() => setSelected(selected?.id === node.id ? null : node)}
                      onMouseEnter={() => setHoveredId(node.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ opacity: isDimmed ? 0.2 : 1, transition: 'opacity 0.2s' }}
                    >
                      {(isSelected || isHovered) && (
                        <circle r={r + 4} fill={color} fillOpacity="0.08" />
                      )}
                      <circle r={r} fill={color} fillOpacity={isSelected ? 0.9 : 0.65} stroke={color} strokeWidth="0.5" />
                      <text y={-5} textAnchor="middle" fontSize="2.3" fill={color} fillOpacity="0.9" fontFamily="monospace" fontWeight="bold">
                        {node.label}
                      </text>
                      {node.sublabel && (
                        <text y={-2.5} textAnchor="middle" fontSize="1.8" fill={color} fillOpacity="0.55" fontFamily="monospace">
                          {node.sublabel}
                        </text>
                      )}
                    </g>
                  )
                })}
              </svg>

              <p className="text-[10px] font-mono text-subtle text-center mt-2">
                Passe o mouse sobre um nó para destacar conexões · Clique para detalhes técnicos
              </p>
            </div>
          </div>

          {/* Side panel */}
          <div>
            {selected ? (
              <div className="glass-card rounded-xl p-5 sticky top-20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div
                      className="font-display font-bold text-base mb-0.5"
                      style={{ color: LAYER_COLORS[selected.layer as keyof typeof LAYER_COLORS] }}
                    >
                      {selected.label}
                    </div>
                    <div className="text-xs font-mono text-subtle">{selected.sublabel}</div>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-subtle hover:text-foreground transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-4 p-2.5 rounded-lg" style={{
                  background: `${LAYER_COLORS[selected.layer as keyof typeof LAYER_COLORS]}12`,
                  border: `1px solid ${LAYER_COLORS[selected.layer as keyof typeof LAYER_COLORS]}25`
                }}>
                  <div className="text-[10px] font-mono uppercase tracking-widest mb-1"
                    style={{ color: LAYER_COLORS[selected.layer as keyof typeof LAYER_COLORS] }}>
                    {selected.layer} layer
                  </div>
                </div>

                <p className="text-sm text-muted mb-4 leading-relaxed">{selected.description}</p>

                <div className="mb-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Zap className="w-3 h-3 text-cyan" />
                    <span className="text-[10px] font-mono text-subtle uppercase tracking-widest">Protocolos</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.protocols.map(p => (
                      <span key={p} className="protocol-badge">{p}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Layers className="w-3 h-3 text-cyan" />
                    <span className="text-[10px] font-mono text-subtle uppercase tracking-widest">Caso de uso típico</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{selected.usecase}</p>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-xl p-5 sticky top-20">
                <div className="text-center py-8">
                  <Layers className="w-8 h-8 text-subtle mx-auto mb-3" />
                  <p className="text-sm text-muted font-mono">
                    Clique em um nó do diagrama para ver os detalhes técnicos
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-3">Layers</div>
                  {Object.entries(LAYER_CONFIG).map(([layer, cfg]) => (
                    <div key={layer} className="flex items-center justify-between py-1.5 border-b border-subtle last:border-0">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
                        <span className="text-xs font-mono text-foreground">{cfg.label}</span>
                      </div>
                      <span className="text-[10px] text-subtle font-mono">
                        {ARCHITECTURE_NODES.filter(n => n.layer === layer).length} nós
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-lg bg-[var(--accent-cyan-dim)] border border-[rgba(0,200,255,0.15)]">
                  <p className="text-[11px] font-mono text-cyan leading-relaxed">
                    Modo <span className="font-bold">{mode === 'greenfield' ? 'Greenfield' : 'Brownfield'}</span>:{' '}
                    {mode === 'greenfield'
                      ? 'Arquitetura completa com todos os componentes cloud e edge.'
                      : 'Integração com automação existente. Componentes cloud ocultos.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
