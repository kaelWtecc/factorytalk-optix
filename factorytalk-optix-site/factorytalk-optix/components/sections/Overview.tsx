'use client'
import { useState } from 'react'
import { useInView } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

interface EcoNode {
  id: string
  label: string
  sublabel: string
  layer: string
  x: number
  y: number
  color: string
  description: string
  protocols: string[]
}

const nodes: EcoNode[] = [
  // Cloud
  { id: 'hub', label: 'FT Hub', sublabel: 'SaaS IDE', layer: 'cloud', x: 20, y: 10, color: '#00C8FF', description: 'IDE web colaborativo. Desenvolvimento multi-usuário, version control nativo e deploy sem instalação local.', protocols: ['HTTPS', 'WebSocket'] },
  { id: 'datamosaix', label: 'DataMosaix', sublabel: 'Analytics', layer: 'cloud', x: 50, y: 10, color: '#60a5fa', description: 'Plataforma de analytics industrial. OEE em tempo real, KPIs de produção e análise de paradas.', protocols: ['MQTT', 'REST'] },
  { id: 'plex', label: 'Plex', sublabel: 'MES Cloud', layer: 'cloud', x: 78, y: 10, color: '#a78bfa', description: 'Manufacturing Execution System (MES) cloud da Rockwell. Rastreabilidade de produção e qualidade.', protocols: ['REST API'] },
  // Edge
  { id: 'optixedge', label: 'OptixEdge', sublabel: 'DIN Rail', layer: 'edge', x: 25, y: 40, color: '#F97316', description: 'Hardware DIN Rail com Linux embarcado. Headless, edge computing sem display, gerenciado via browser.', protocols: ['OPC UA', 'MQTT', 'Modbus'] },
  { id: 'logixedge', label: 'Logix Edge', sublabel: 'No CLP', layer: 'edge', x: 65, y: 40, color: '#fb923c', description: 'Edge computing integrado no ControlLogix. Analytics direto no controlador, sem hardware adicional.', protocols: ['OPC UA', 'EtherNet/IP'] },
  // Machine
  { id: 'panel', label: 'OptixPanel', sublabel: 'HMI Selado', layer: 'machine', x: 15, y: 68, color: '#22C55E', description: 'Terminal HMI industrial IP66. Optix Runtime + Remote Access pré-instalados. Plug-and-play.', protocols: ['OPC UA', 'EtherNet/IP', 'Modbus'] },
  { id: 'pc', label: 'HMI PC', sublabel: 'Win / Linux', layer: 'machine', x: 45, y: 68, color: '#4ade80', description: 'PC industrial executando FT Optix Runtime. Suporta Windows 10/11, Ubuntu 20.04+.', protocols: ['OPC UA', 'Modbus', 'S7TCP', 'ODBC'] },
  { id: 'browser', label: 'Browser', sublabel: 'Sem instalação', layer: 'machine', x: 75, y: 68, color: '#86efac', description: 'Acesso via HTML5. Qualquer SO, qualquer dispositivo. Sem instalação de software.', protocols: ['HTTPS', 'WebSocket'] },
  // Field
  { id: 'clx', label: 'ControlLogix', sublabel: 'Allen-Bradley', layer: 'field', x: 12, y: 92, color: '#7ba3c4', description: 'CLP Allen-Bradley série ControlLogix. Comunicação nativa EtherNet/IP (CIP).', protocols: ['EtherNet/IP', 'OPC UA'] },
  { id: 'micro', label: 'Micro850', sublabel: 'Allen-Bradley', layer: 'field', x: 35, y: 92, color: '#7ba3c4', description: 'CLP compacto Micro800. Ideal para máquinas e aplicações OEM.', protocols: ['EtherNet/IP', 'Modbus'] },
  { id: 's7', label: 'S7-1500', sublabel: 'Siemens', layer: 'field', x: 60, y: 92, color: '#7ba3c4', description: 'CLP Siemens S7-1500. Suportado via driver S7TCP nativo no Optix.', protocols: ['S7TCP', 'OPC UA'] },
  { id: 'cds', label: 'CODESYS', sublabel: 'Multi-vendor', layer: 'field', x: 83, y: 92, color: '#7ba3c4', description: 'CLPs CODESYS (Wago, Beckhoff, etc). Suportados nativamente pelo Optix.', protocols: ['CODESYS', 'OPC UA'] },
]

const layerLabels = [
  { y: 10, label: 'CLOUD', color: '#00C8FF' },
  { y: 40, label: 'EDGE', color: '#F97316' },
  { y: 68, label: 'MACHINE', color: '#22C55E' },
  { y: 92, label: 'FIELD', color: '#7ba3c4' },
]

const features = [
  '→ Desenvolvimento colaborativo multi-usuário via browser',
  '→ Version control nativo: GitHub / FactoryTalk Vault',
  '→ Scripting C# em runtime com acesso total ao modelo de objetos',
  '→ Deploy único para Windows, Linux, browser e terminais dedicados',
  '→ Conectividade nativa: OPC UA, MQTT, Modbus, S7TCP, ControlLogix',
  '→ Edge computing com OptixEdge (DIN Rail)',
  '→ Integração cloud: DataMosaix, Plex, Fiix',
]

export function Overview() {
  const { ref, inView } = useInView()
  const [selected, setSelected] = useState<EcoNode | null>(null)

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className="mb-16 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)' }}
        >
          <p className="section-label mb-3">
            <span className="w-8 h-px bg-[var(--accent-cyan)] inline-block" />
            Visão Geral
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
            O que é o FactoryTalk Optix?
          </h2>
          <p className="text-muted max-w-xl">
            Plataforma HMI/IIoT de arquitetura aberta — não substitui sistemas legados, <span className="text-foreground font-medium">complementa e integra</span>.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Features list */}
          <div
            className="transition-all duration-700 delay-150"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(-24px)' }}
          >
            <div className="glass-card rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="led led-green" />
                <span className="font-mono text-xs text-cyan uppercase tracking-widest">Diferenciais técnicos</span>
              </div>
              <ul className="space-y-3">
                {features.map(f => (
                  <li key={f} className="text-sm text-muted font-mono leading-relaxed hover:text-foreground transition-colors cursor-default">
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Protocolo base', value: 'OPC UA', color: '#00C8FF' },
                { label: 'Scripting', value: 'C# / .NET', color: '#F97316' },
                { label: 'Deploy', value: 'Multi-target', color: '#22C55E' },
              ].map(item => (
                <div key={item.label} className="glass-card rounded-lg p-3 text-center">
                  <div className="font-mono text-sm font-bold mb-1" style={{ color: item.color }}>{item.value}</div>
                  <div className="text-xs text-subtle">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive ecosystem diagram */}
          <div
            className="relative transition-all duration-700 delay-300"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(24px)' }}
          >
            <div className="glass-card rounded-xl p-4 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-subtle uppercase tracking-widest">Ecossistema Optix</span>
                <span className="text-[10px] font-mono text-subtle">clique nos nós</span>
              </div>

              {/* SVG Diagram */}
              <svg viewBox="0 0 100 105" className="w-full" style={{ height: '380px' }}>
                {/* Layer bands */}
                {[
                  { y: 2, h: 22, color: '#00C8FF', label: 'CLOUD' },
                  { y: 30, h: 22, color: '#F97316', label: 'EDGE' },
                  { y: 57, h: 22, color: '#22C55E', label: 'MACHINE' },
                  { y: 82, h: 22, color: '#7ba3c4', label: 'FIELD' },
                ].map(band => (
                  <g key={band.label}>
                    <rect x="0" y={band.y} width="100" height={band.h} fill={band.color} fillOpacity="0.04" rx="1" />
                    <text x="2" y={band.y + 5} fontSize="2.5" fill={band.color} fillOpacity="0.6" fontFamily="monospace" fontWeight="bold">
                      {band.label}
                    </text>
                  </g>
                ))}

                {/* Connections */}
                {/* Cloud → Edge */}
                {[['hub', 'optixedge'], ['datamosaix', 'logixedge'], ['hub', 'logixedge']].map(([a, b]) => {
                  const na = nodes.find(n => n.id === a)!
                  const nb = nodes.find(n => n.id === b)!
                  return (
                    <line key={`${a}-${b}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                      stroke="#00C8FF" strokeOpacity="0.15" strokeWidth="0.3" strokeDasharray="1,1" />
                  )
                })}
                {/* Edge → Machine */}
                {[['optixedge', 'panel'], ['optixedge', 'pc'], ['logixedge', 'pc'], ['logixedge', 'browser']].map(([a, b]) => {
                  const na = nodes.find(n => n.id === a)!
                  const nb = nodes.find(n => n.id === b)!
                  return (
                    <line key={`${a}-${b}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                      stroke="#F97316" strokeOpacity="0.15" strokeWidth="0.3" strokeDasharray="1,1" />
                  )
                })}
                {/* Machine → Field */}
                {[['panel', 'clx'], ['panel', 'micro'], ['pc', 'clx'], ['pc', 's7'], ['pc', 'cds'], ['browser', 's7']].map(([a, b]) => {
                  const na = nodes.find(n => n.id === a)!
                  const nb = nodes.find(n => n.id === b)!
                  return (
                    <line key={`${a}-${b}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                      stroke="#22C55E" strokeOpacity="0.15" strokeWidth="0.3" strokeDasharray="1,1" />
                  )
                })}

                {/* Nodes */}
                {nodes.map(node => {
                  const isSelected = selected?.id === node.id
                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x},${node.y})`}
                      onClick={() => setSelected(isSelected ? null : node)}
                      className="cursor-pointer"
                    >
                      <circle
                        r={isSelected ? 5 : 3.5}
                        fill={node.color}
                        fillOpacity={isSelected ? 0.9 : 0.7}
                        stroke={node.color}
                        strokeWidth={isSelected ? 1 : 0.5}
                        strokeOpacity="0.8"
                      />
                      {isSelected && (
                        <circle r={8} fill={node.color} fillOpacity="0.1" stroke={node.color} strokeWidth="0.5" strokeOpacity="0.4" />
                      )}
                      <text y={-5} textAnchor="middle" fontSize="2.2" fill={node.color} fillOpacity="0.9" fontFamily="monospace" fontWeight="bold">
                        {node.label}
                      </text>
                      <text y={-2.5} textAnchor="middle" fontSize="1.8" fill={node.color} fillOpacity="0.55" fontFamily="monospace">
                        {node.sublabel}
                      </text>
                    </g>
                  )
                })}
              </svg>

              {/* Selected node info */}
              {selected && (
                <div className="mt-3 p-3 rounded-lg border border-subtle bg-[var(--surface-elevated)] relative">
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-2 right-2 text-subtle hover:text-foreground transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div className="font-mono text-sm font-bold mb-1" style={{ color: selected.color }}>
                    {selected.label} <span className="font-normal text-subtle">— {selected.sublabel}</span>
                  </div>
                  <p className="text-xs text-muted mb-2">{selected.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {selected.protocols.map(p => (
                      <span key={p} className="protocol-badge text-[10px]">{p}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
