'use client'
import { useState } from 'react'
import { PROTOCOLS, DEPLOY_TARGETS, NETLOGIC_CODE } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { CheckCircle2, XCircle, Clock } from 'lucide-react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const TABS = [
  { id: 'collab', label: 'Colaboração', emoji: '👥' },
  { id: 'netlogic', label: 'NetLogic C#', emoji: '⚙️' },
  { id: 'protocols', label: 'Protocolos', emoji: '🔌' },
  { id: 'deploy', label: 'Deploy', emoji: '🚀' },
  { id: 'data', label: 'Dados', emoji: '📊' },
  { id: 'security', label: 'Segurança', emoji: '🔐' },
]

function CollabTab() {
  const items = [
    { title: 'Multi-user Simultâneo', desc: 'Múltiplos engenheiros editando o mesmo projeto em tempo real via browser. Cursores e seleções visíveis para todos os participantes.', tag: 'SaaS · FT Hub' },
    { title: 'GitHub Integration Nativa', desc: 'Push, pull, branch, merge e pull requests direto dentro do studio. CI/CD automático via GitHub Actions para build e deploy.', tag: 'git · GitHub Actions' },
    { title: 'FactoryTalk Vault', desc: 'Alternativa self-hosted ao GitHub para ambientes sem acesso à internet. Version control industrial com auditoria completa.', tag: 'On-premise · Self-hosted' },
    { title: 'CI/CD Industrial', desc: 'Pipelines automáticos para build, teste e deploy de aplicações Optix. Integração com ambientes de QA e produção separados.', tag: 'Automation · DevOps' },
    { title: 'Rastreabilidade Total', desc: 'Log completo e imutável de todas as alterações: quem modificou, o quê, quando e em qual versão. Essencial para validação IQ/OQ.', tag: 'Audit · Compliance' },
    { title: 'Code Review Industrial', desc: 'Pull requests com diff visual de projetos HMI. Aprovação obrigatória antes de deploy para produção. Comentários por linha.', tag: 'Review · Approval' },
  ]

  return (
    <div>
      <div className="mb-6 p-4 rounded-xl glass-card border-glow">
        <div className="flex items-center gap-2 mb-2">
          <span className="led led-green" />
          <span className="font-mono text-xs text-cyan">Desenvolvendo em tempo real</span>
        </div>
        <p className="text-sm text-muted">
          O FactoryTalk Optix traz práticas de <span className="text-foreground font-medium">software engineering moderno</span> para a automação industrial. Version control, CI/CD e revisão de código nativos no contexto de projetos HMI.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item.title} className="glass-card rounded-xl p-4 group hover:border-[var(--accent-cyan)] transition-colors">
            <div className="font-mono text-[10px] text-cyan mb-2 opacity-70">{item.tag}</div>
            <div className="font-display font-semibold text-foreground text-sm mb-1">{item.title}</div>
            <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function NetLogicTab() {
  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl glass-card">
        <p className="text-sm text-muted leading-relaxed">
          <span className="text-foreground font-semibold">NetLogic</span> é o sistema de scripting C# do FactoryTalk Optix. Scripts são executados em <span className="text-cyan font-mono">DesignTime</span> ou <span className="text-cyan font-mono">Runtime</span>, com acesso completo ao modelo de objetos do projeto — criar, modificar, deletar nodes programaticamente, integrar com bibliotecas .NET 6+ e implementar lógica complexa não disponível nos blocos padrão.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { k: 'Linguagem', v: 'C# / .NET 6+' },
          { k: 'Execução', v: 'DesignTime + Runtime' },
          { k: 'IntelliSense', v: 'Sim (no Studio)' },
          { k: 'Debug', v: 'Breakpoints + Watch' },
        ].map(item => (
          <div key={item.k} className="glass-card rounded-lg p-3 text-center">
            <div className="font-mono text-xs text-cyan font-semibold mb-0.5">{item.v}</div>
            <div className="text-[10px] text-subtle">{item.k}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden border border-subtle">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--surface-elevated)] border-b border-subtle">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444] opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#F97316] opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] opacity-70" />
          </div>
          <span className="font-mono text-[10px] text-subtle ml-1">ThresholdMonitor.cs — NetLogic · FT Optix Runtime</span>
        </div>
        <SyntaxHighlighter
          language="csharp"
          style={atomOneDark}
          customStyle={{
            margin: 0,
            padding: '16px',
            background: 'var(--surface)',
            fontSize: '11px',
            lineHeight: '1.6',
            maxHeight: '400px',
            overflow: 'auto',
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

function ProtocolsTab() {
  return (
    <div>
      <p className="text-sm text-muted mb-5">
        O FactoryTalk Optix inclui drivers nativos para os principais protocolos industriais, sem necessidade de OPC UA gateway ou middleware adicional.
      </p>
      <div className="rounded-xl overflow-hidden border border-subtle">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--surface-elevated)] border-b border-subtle">
              <th className="text-left px-4 py-3 font-mono text-[11px] text-subtle uppercase tracking-wider">Protocolo / Driver</th>
              <th className="text-center px-4 py-3 font-mono text-[11px] text-subtle uppercase tracking-wider">Suporte</th>
              <th className="text-left px-4 py-3 font-mono text-[11px] text-subtle uppercase tracking-wider hidden sm:table-cell">Observação</th>
            </tr>
          </thead>
          <tbody>
            {PROTOCOLS.map((p, i) => (
              <tr
                key={p.name}
                className={cn(
                  'border-b border-subtle last:border-0 hover:bg-[var(--surface-elevated)] transition-colors',
                  i % 2 === 0 ? '' : 'bg-[var(--surface)]'
                )}
              >
                <td className="px-4 py-3 font-mono text-xs text-foreground font-medium">{p.name}</td>
                <td className="px-4 py-3 text-center">
                  {p.supported
                    ? <CheckCircle2 className="w-4 h-4 text-green mx-auto" />
                    : p.note === 'Em roadmap'
                      ? <Clock className="w-4 h-4 text-orange mx-auto" />
                      : <XCircle className="w-4 h-4 text-danger mx-auto" />
                  }
                </td>
                <td className="px-4 py-3 font-mono text-[11px] text-muted hidden sm:table-cell">{p.note || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-4 mt-3">
        {[
          { icon: CheckCircle2, color: 'text-green', label: 'Suporte nativo' },
          { icon: Clock, color: 'text-orange', label: 'Em roadmap' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5 text-xs text-muted">
            <item.icon className={cn('w-3.5 h-3.5', item.color)} />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

function DeployTab() {
  const [selected, setSelected] = useState<string[]>(['windows', 'panel'])

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <div className="space-y-5">
      <div className="p-4 rounded-xl glass-card">
        <div className="font-mono text-xs text-cyan mb-2">Build Once → Deploy Anywhere</div>
        <p className="text-sm text-muted">
          Um único projeto Optix compila para múltiplos targets. Selecione abaixo os targets do seu ambiente para visualizar a arquitetura:
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {DEPLOY_TARGETS.map(t => {
          const active = selected.includes(t.id)
          return (
            <button
              key={t.id}
              onClick={() => toggle(t.id)}
              className={cn(
                'glass-card rounded-xl p-4 text-left transition-all duration-200 border',
                active
                  ? 'border-[var(--accent-cyan)] shadow-glow-cyan bg-[var(--accent-cyan-dim)]'
                  : 'border-subtle hover:border-[var(--foreground-subtle)]'
              )}
            >
              <div className="text-2xl mb-2">{t.icon}</div>
              <div className="font-mono text-sm font-semibold text-foreground mb-0.5">{t.label}</div>
              <div className="text-[10px] font-mono text-muted mb-0.5">{t.os}</div>
              <div className="text-[10px] text-subtle">{t.note}</div>
            </button>
          )
        })}
      </div>

      {selected.length > 0 && (
        <div className="p-4 rounded-xl bg-[var(--accent-cyan-dim)] border border-[rgba(0,200,255,0.2)]">
          <div className="font-mono text-xs text-cyan mb-2">
            Targets selecionados: {selected.length}
          </div>
          <div className="font-mono text-xs text-foreground">
            Projeto Optix → {selected.map(id => DEPLOY_TARGETS.find(t => t.id === id)?.label).join(' + ')}
          </div>
          <p className="text-xs text-muted mt-2">
            O mesmo projeto compila e executa em todos os targets acima sem modificação de código.
          </p>
        </div>
      )}
    </div>
  )
}

function DataTab() {
  const items = [
    { title: 'SQLite Embarcado', desc: 'Logging local sem dependência externa. Histórico de tags, eventos e alarmes armazenados no próprio runtime.', tag: 'Local · Embarcado' },
    { title: 'ODBC (SQL Server / MySQL)', desc: 'Conexão direta para bancos de dados relacionais. Histórico de produção, rastreabilidade e relatórios SQL.', tag: 'Relacional · Externo' },
    { title: 'InfluxDB', desc: 'Séries temporais com retenção configurável. Alta performance para logging de dados de processo em alta frequência.', tag: 'Time-series · Alta freq.' },
    { title: 'Reports PDF', desc: 'Geração nativa de relatórios PDF. Agendamento automático ou on-demand. Templates configuráveis com dados históricos.', tag: 'Relatórios · Agendado' },
    { title: 'Dashboards & Trends', desc: 'Widgets nativos de trend, gauge e histórico. Zoom, pan e exportação. Sem dependência de ferramentas externas.', tag: 'Visualização · Nativo' },
    { title: 'DataReady → Cloud', desc: 'Contextualização e envio para DataMosaix, Plex e Fiix. OEE e KPIs em tempo real via OPC UA → MQTT → Cloud.', tag: 'IIoT · MES · CMMS' },
  ]

  return (
    <div>
      <p className="text-sm text-muted mb-5">
        Armazenamento local com sync para cloud quando a conexão for reestabelecida (<span className="text-cyan font-mono">store-and-forward</span>). Suporte completo para ambientes com conectividade intermitente.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map(item => (
          <div key={item.title} className="glass-card rounded-xl p-4 hover:border-[var(--accent-cyan)] transition-colors group">
            <div className="font-mono text-[10px] text-cyan mb-1.5 opacity-70">{item.tag}</div>
            <div className="font-display font-semibold text-foreground text-sm mb-1">{item.title}</div>
            <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SecurityTab() {
  const items = [
    { title: 'RBAC — Controle por Papel', desc: 'Perfis: Operador, Supervisor, Engenheiro, Admin. Permissões granulares por tela, ação e dispositivo. Integração com Active Directory / LDAP.', badge: 'IEC 62443' },
    { title: 'Audit Trail Completo', desc: 'Log imutável de todas as ações: login, logout, modificação de parâmetros, alarmes e comandos. Exportável para compliance.', badge: 'Compliance · FDA 21 CFR Part 11' },
    { title: 'FT Remote Access (VPN)', desc: 'VPN industrial com certificados TLS. Túnel seguro sem necessidade de abrir portas no firewall. Gerenciado via portal centralizado.', badge: 'TLS · VPN Industrial' },
    { title: 'Criptografia End-to-End', desc: 'TLS/SSL em todas as comunicações. Certificados OPC UA por nó. Dados em trânsito e em repouso protegidos.', badge: 'TLS 1.3 · OPC UA Security' },
    { title: 'Sessões com Timeout', desc: 'Logout automático por inatividade. Timeout configurável por papel. Reconexão automática com re-autenticação obrigatória.', badge: 'Session Management' },
    { title: 'Conformidade IEC 62443', desc: 'Arquitetura alinhada com a norma de cybersecurity industrial IEC 62443. Zones & Conduits para segmentação de rede.', badge: 'IEC 62443 · ISA/IEC' },
  ]

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {items.map(item => (
        <div key={item.title} className="glass-card rounded-xl p-4 hover:border-[rgba(167,139,250,0.4)] transition-colors group">
          <div className="inline-block font-mono text-[10px] px-2 py-0.5 rounded-full mb-2"
            style={{ background: 'rgba(167,139,250,0.12)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.2)' }}>
            {item.badge}
          </div>
          <div className="font-display font-semibold text-foreground text-sm mb-1">{item.title}</div>
          <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  )
}

const TAB_CONTENT: Record<string, React.ReactNode> = {
  collab: <CollabTab />,
  netlogic: <NetLogicTab />,
  protocols: <ProtocolsTab />,
  deploy: <DeployTab />,
  data: <DataTab />,
  security: <SecurityTab />,
}

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState('collab')

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-16 px-6 bg-secondary border-b border-subtle relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative max-w-7xl mx-auto">
          <p className="section-label mb-3">
            <span className="w-8 h-px bg-[var(--accent-cyan)] inline-block" />
            Documentação técnica
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Funcionalidades
          </h1>
          <p className="text-muted max-w-xl">
            Especificações técnicas detalhadas de cada módulo da plataforma FactoryTalk Optix.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-px mb-8 border-b border-subtle">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2.5 text-sm font-mono whitespace-nowrap transition-all duration-200',
                activeTab === tab.id
                  ? 'text-cyan tab-active'
                  : 'text-muted hover:text-foreground'
              )}
            >
              <span>{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div key={activeTab}>
          {TAB_CONTENT[activeTab]}
        </div>
      </div>
    </div>
  )
}
