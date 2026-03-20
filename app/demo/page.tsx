'use client'
import { useState } from 'react'
import { useHMIData } from '@/hooks/useHMIData'
import { cn, statusLabel, statusClass, ledClass, severityColor, severityLabel, formatTime, formatValue } from '@/lib/utils'
import { getTrendData } from '@/lib/supabase'
import { NETLOGIC_CODE } from '@/lib/constants'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { CheckCheck, Check } from 'lucide-react'

const TABS = [
  { id: 'hmi', label: '🖥 HMI Operacional' },
  { id: 'opc', label: '🔌 OPC UA Browser' },
  { id: 'alarms', label: '🔔 Alarmes' },
  { id: 'netlogic', label: '</> NetLogic' },
]

function GaugeMeter({ value, min, max, unit, label, color }: {
  value: number, min: number, max: number, unit: string, label: string, color: string
}) {
  const pct = Math.min(1, Math.max(0, (value - min) / (max - min)))
  const angle = -135 + pct * 270
  const r = 36
  const cx = 50, cy = 52

  const describeArc = (startA: number, endA: number) => {
    const toRad = (d: number) => (d * Math.PI) / 180
    const x1 = cx + r * Math.cos(toRad(startA))
    const y1 = cy + r * Math.sin(toRad(startA))
    const x2 = cx + r * Math.cos(toRad(endA))
    const y2 = cy + r * Math.sin(toRad(endA))
    return `M ${x1} ${y1} A ${r} ${r} 0 ${endA - startA > 180 ? 1 : 0} 1 ${x2} ${y2}`
  }

  return (
    <div className="glass-card rounded-xl p-3 text-center">
      <svg viewBox="0 0 100 70" className="w-full" style={{ height: '90px' }}>
        {/* Track */}
        <path d={describeArc(-135, 135)} stroke="var(--surface-elevated)" strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* Fill */}
        <path d={describeArc(-135, -135 + pct * 270)} stroke={color} strokeWidth="6" fill="none" strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color}88)` }} />
        {/* Needle */}
        <line
          x1={cx} y1={cy}
          x2={cx + (r - 10) * Math.cos(((-135 + pct * 270) * Math.PI) / 180)}
          y2={cy + (r - 10) * Math.sin(((-135 + pct * 270) * Math.PI) / 180)}
          stroke={color} strokeWidth="1.5" strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="3" fill={color} />
        {/* Value */}
        <text x={cx} y={cy + 16} textAnchor="middle" fontSize="10" fill="var(--foreground)" fontFamily="monospace" fontWeight="bold">
          {value.toFixed(1)}
        </text>
        <text x={cx} y={cy + 24} textAnchor="middle" fontSize="6" fill="var(--foreground-muted)" fontFamily="monospace">
          {unit}
        </text>
      </svg>
      <div className="text-[10px] font-mono text-subtle mt-1">{label}</div>
    </div>
  )
}

function HMITab() {
  const { machines, alarms, tick } = useHMIData()
  const m01 = machines[0]
  const now = new Date()
  const timeStr = now.toLocaleTimeString('pt-BR', { hour12: false })
  const dateStr = now.toLocaleDateString('pt-BR')

  const trendPoints = m01 ? getTrendData('M01', 'temp').map((p, i) => ({
    t: i, temp: p.value,
    speed: (getTrendData('M01', 'speed')[i]?.value || 0)
  })) : []

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="glass-card rounded-xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="led led-green" />
          <span className="font-mono text-sm font-bold text-foreground">LINHA DE ENVASE — LN-01</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="status-running">RODANDO</span>
          <span className="font-mono text-xs text-subtle">{dateStr} {timeStr}</span>
        </div>
      </div>

      {/* Gauges */}
      {m01 && (
        <div className="grid grid-cols-3 gap-3">
          <GaugeMeter value={m01.speed_rpm} min={0} max={1500} unit="RPM" label="Velocidade" color="#00C8FF" />
          <GaugeMeter value={m01.temperature_c} min={0} max={100} unit="°C" label="Temperatura" color="#F97316" />
          <GaugeMeter value={m01.pressure_bar} min={0} max={8} unit="bar" label="Pressão" color="#22C55E" />
        </div>
      )}

      {/* Machine status */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {machines.map(m => (
          <div key={m.id} className={cn(
            'glass-card rounded-xl p-4 transition-all duration-300',
            m.status === 'fault' && 'border-[var(--accent-red)] shadow-glow-red',
            m.status === 'warning' && 'border-[var(--accent-orange)]',
          )}>
            <div className="flex items-center gap-2 mb-3">
              <span className={cn('led', ledClass(m.status))} />
              <span className="font-mono text-[10px] text-subtle font-bold">{m.id}</span>
            </div>
            <div className="font-mono text-xs text-foreground font-semibold mb-2">{m.name}</div>
            <div className={statusClass(m.status)}>
              {statusLabel(m.status)}
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-subtle">Velocidade</span>
                <span className="text-foreground">{m.speed_rpm.toFixed(0)} rpm</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-subtle">Temp.</span>
                <span className={m.temperature_c > 80 ? 'text-danger' : 'text-foreground'}>{m.temperature_c.toFixed(1)}°C</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-subtle">Produção</span>
                <span className="text-foreground">{m.production_count.toLocaleString('pt-BR')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trend */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs text-subtle uppercase tracking-widest">Trend — M01 Temperatura</span>
          <span className="text-[10px] font-mono text-subtle">(últimos 60 pontos)</span>
        </div>
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={trendPoints}>
            <XAxis dataKey="t" hide />
            <YAxis domain={[60, 100]} hide />
            <Tooltip
              contentStyle={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
              formatter={(v: unknown) => [`${Number(v).toFixed(1)}°C`, 'Temperatura']}
              labelFormatter={() => ''}
            />
            <Line type="monotone" dataKey="temp" stroke="#F97316" strokeWidth={1.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Active alarms */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 border-b border-subtle flex items-center justify-between">
          <span className="font-mono text-xs text-subtle uppercase tracking-widest">Alarmes Ativos</span>
          <span className="text-[10px] font-mono text-subtle">{alarms.filter(a => !a.acknowledged).length} ativos</span>
        </div>
        {alarms.slice(0, 4).map(alarm => (
          <div key={alarm.id} className={cn(
            'flex items-start gap-3 px-4 py-3 border-b border-subtle last:border-0 transition-opacity',
            alarm.acknowledged && 'opacity-40'
          )}>
            <span className={cn('font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5', severityColor(alarm.severity))}>
              {severityLabel(alarm.severity)}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[11px] text-foreground truncate">{alarm.description}</div>
              <div className="font-mono text-[10px] text-subtle">{alarm.machine_id} · {formatTime(alarm.created_at)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function OPCTab() {
  const { machines } = useHMIData()
  const [filter, setFilter] = useState('')

  const allTags = machines.flatMap(m => [
    { path: `Objects/LineEN01/${m.id}/Status`, name: 'Status', type: 'String', value: m.status, quality: 'Good' as const },
    { path: `Objects/LineEN01/${m.id}/Speed_RPM`, name: 'Speed_RPM', type: 'Double', value: m.speed_rpm.toFixed(2), quality: 'Good' as const },
    { path: `Objects/LineEN01/${m.id}/Temperature_C`, name: 'Temperature_C', type: 'Double', value: m.temperature_c.toFixed(2), quality: m.temperature_c > 80 ? 'Uncertain' as const : 'Good' as const },
    { path: `Objects/LineEN01/${m.id}/Pressure_Bar`, name: 'Pressure_Bar', type: 'Double', value: m.pressure_bar.toFixed(2), quality: 'Good' as const },
    { path: `Objects/LineEN01/${m.id}/ProductionCount`, name: 'ProductionCount', type: 'Int32', value: m.production_count, quality: 'Good' as const },
  ])

  const filtered = filter
    ? allTags.filter(t => t.path.toLowerCase().includes(filter.toLowerCase()))
    : allTags

  const qualityColor = (q: string) => q === 'Good' ? 'text-green' : q === 'Uncertain' ? 'text-orange' : 'text-danger'

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrar por NodeId ou nome..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="w-full glass-card rounded-lg px-3 py-2 font-mono text-xs text-foreground placeholder-[var(--foreground-subtle)] outline-none focus:border-[var(--accent-cyan)] transition-colors"
        />
      </div>
      <div className="glass-card rounded-xl overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[var(--surface-elevated)] border-b border-subtle">
              <th className="text-left px-4 py-2.5 font-mono text-[10px] text-subtle uppercase">NodeId / Path</th>
              <th className="text-left px-4 py-2.5 font-mono text-[10px] text-subtle uppercase">Tipo</th>
              <th className="text-right px-4 py-2.5 font-mono text-[10px] text-subtle uppercase">Valor</th>
              <th className="text-center px-4 py-2.5 font-mono text-[10px] text-subtle uppercase">Qualidade</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(tag => (
              <tr key={tag.path} className="border-b border-subtle last:border-0 hover:bg-[var(--surface-elevated)] transition-colors">
                <td className="px-4 py-2 font-mono text-[10px] text-muted">{tag.path}</td>
                <td className="px-4 py-2 font-mono text-[10px] text-subtle">{tag.type}</td>
                <td className="px-4 py-2 font-mono text-[11px] text-foreground text-right font-semibold">{String(tag.value)}</td>
                <td className="px-4 py-2 text-center">
                  <span className={cn('font-mono text-[10px] font-semibold', qualityColor(tag.quality))}>
                    {tag.quality}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AlarmsTab() {
  const { alarms, acknowledgeAlarm, acknowledgeAll } = useHMIData()
  const [filter, setFilter] = useState<string>('all')

  const filtered = filter === 'all' ? alarms : alarms.filter(a =>
    filter === 'active' ? !a.acknowledged : a.acknowledged
  )

  const bgBySeverity = (s: string) =>
    s === 'critical' ? 'border-l-[var(--accent-red)]' :
    s === 'warning' ? 'border-l-[var(--accent-orange)]' : 'border-l-[var(--accent-cyan)]'

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-1 glass-card rounded-lg p-1">
          {[['all', 'Todos'], ['active', 'Ativos'], ['acked', 'Reconhecidos']].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)}
              className={cn('px-3 py-1 rounded-md text-[11px] font-mono transition-all',
                filter === v ? 'bg-[var(--accent-cyan)] text-[#050d1a] font-semibold' : 'text-muted hover:text-foreground')}>
              {l}
            </button>
          ))}
        </div>
        <button
          onClick={acknowledgeAll}
          className="flex items-center gap-1.5 hmi-btn text-[11px] px-3 py-1.5 rounded-lg"
        >
          <CheckCheck className="w-3 h-3" />
          ACK Todos
        </button>
      </div>

      <div className="space-y-2">
        {filtered.map(alarm => (
          <div key={alarm.id}
            className={cn('glass-card rounded-xl p-4 border-l-4 transition-opacity', bgBySeverity(alarm.severity), alarm.acknowledged && 'opacity-50')}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className={cn('font-mono text-[10px] font-bold px-2 py-0.5 rounded shrink-0 mt-0.5', severityColor(alarm.severity))}>
                  {severityLabel(alarm.severity)}
                </span>
                <div>
                  <div className="font-mono text-sm text-foreground font-medium">{alarm.description}</div>
                  <div className="font-mono text-[10px] text-subtle mt-0.5">
                    {alarm.machine_id} · {alarm.alarm_code} · {formatTime(alarm.created_at)}
                  </div>
                </div>
              </div>
              {!alarm.acknowledged && (
                <button
                  onClick={() => acknowledgeAlarm(alarm.id)}
                  className="hmi-btn text-[10px] px-2 py-1 rounded-md shrink-0 flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> ACK
                </button>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted font-mono text-sm">
            Nenhum alarme {filter === 'active' ? 'ativo' : 'encontrado'}
          </div>
        )}
      </div>
    </div>
  )
}

function NetLogicTab() {
  return (
    <div>
      <div className="mb-4 p-4 rounded-xl glass-card">
        <p className="text-sm text-muted">
          Exemplo real de <span className="text-cyan font-mono">NetLogic C#</span> para monitoramento de thresholds e geração automática de alarmes. Este script roda no runtime a cada 1 segundo via <span className="font-mono text-foreground">PeriodicTask</span>.
        </p>
      </div>
      <div className="rounded-xl overflow-hidden border border-subtle">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--surface-elevated)] border-b border-subtle">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444] opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#F97316] opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] opacity-70" />
          </div>
          <span className="font-mono text-[10px] text-subtle ml-1">ThresholdMonitor.cs — NetLogic · Runtime</span>
        </div>
        <SyntaxHighlighter
          language="csharp"
          style={atomOneDark}
          customStyle={{
            margin: 0, padding: '16px', background: 'var(--surface)',
            fontSize: '11px', lineHeight: '1.6', maxHeight: '500px', overflow: 'auto',
          }}
          showLineNumbers
          lineNumberStyle={{ color: '#3d6080', marginRight: '12px', fontSize: '10px' }}
        >
          {NETLOGIC_CODE}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

const TAB_MAP: Record<string, React.ReactNode> = {
  hmi: <HMITab />,
  opc: <OPCTab />,
  alarms: <AlarmsTab />,
  netlogic: <NetLogicTab />,
}

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState('hmi')

  return (
    <div className="min-h-screen">
      <div className="py-12 px-6 bg-secondary border-b border-subtle relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative max-w-7xl mx-auto flex items-end justify-between gap-4">
          <div>
            <p className="section-label mb-3">
              <span className="w-8 h-px bg-[var(--accent-cyan)] inline-block" />
              Simulação ao vivo
            </p>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-2">Demo HMI</h1>
            <p className="text-muted text-sm">Dados gerados em tempo real, atualizados a cada 2 segundos.</p>
          </div>
          <div className="flex items-center gap-2 glass-card rounded-lg px-3 py-2">
            <span className="led led-green" />
            <span className="font-mono text-xs text-cyan">SIMULAÇÃO ATIVA</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-1 overflow-x-auto pb-px mb-6 border-b border-subtle">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={cn('px-4 py-2.5 text-sm font-mono whitespace-nowrap transition-all',
                activeTab === tab.id ? 'text-cyan tab-active' : 'text-muted hover:text-foreground')}>
              {tab.label}
            </button>
          ))}
        </div>
        <div key={activeTab}>{TAB_MAP[activeTab]}</div>
      </div>
    </div>
  )
}
