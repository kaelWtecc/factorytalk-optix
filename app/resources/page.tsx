import { ExternalLink, FileText, Github, Youtube, MessageSquare, Download, BookOpen } from 'lucide-react'
import Link from 'next/link'

const docs = [
  { label: 'Documentação Oficial Online', href: 'https://docs.rockwellautomation.com/ftoptix', icon: BookOpen },
  { label: 'GitHub — FactoryTalk-Optix', href: 'https://github.com/FactoryTalk-Optix', icon: Github },
  { label: 'YouTube — First Steps with FT Optix', href: 'https://youtube.com', icon: Youtube },
  { label: 'Rockwell Engage Forum', href: 'https://rockwellautomation.com/engage', icon: MessageSquare },
  { label: 'Reference Architecture Guide (PDF)', href: 'https://rockwellautomation.com', icon: FileText },
]

const downloads = [
  { label: 'Baixar FT Optix Studio', sub: 'Windows · gratuito com conta RA', href: 'https://rockwellautomation.com' },
  { label: 'Abrir no FT Hub (Cloud)', sub: 'Browser · SaaS · sem instalação', href: 'https://hub.factorytalkhub.com' },
  { label: 'Demos no GitHub', sub: 'Repositórios open-source oficiais', href: 'https://github.com/FactoryTalk-Optix' },
]

const versions = [
  { v: 'v1.4.2', date: 'Mar 2025', notes: 'Melhorias de performance, novos widgets de trend, fix de OPC UA subscription.' },
  { v: 'v1.4.0', date: 'Nov 2024', notes: 'Integração nativa com GitHub Actions, suporte a InfluxDB 2.x.' },
  { v: 'v1.3.0', date: 'Jun 2024', notes: 'OptixEdge GA, suporte Linux ARM, PDF Report Engine v2.' },
  { v: 'v1.2.0', date: 'Jan 2024', notes: 'NetLogic C# melhorias, Siemens S7-1500 nativo, dark mode no Studio.' },
  { v: 'v1.0.0', date: 'Mar 2023', notes: 'Lançamento público. OPC UA nativo, multi-user via FT Hub, OptixPanel.' },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      <div className="py-16 px-6 bg-secondary border-b border-subtle relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative max-w-7xl mx-auto">
          <p className="section-label mb-3">
            <span className="w-8 h-px bg-[var(--accent-cyan)] inline-block" />
            Links e documentação
          </p>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-2">Recursos</h1>
          <p className="text-muted text-sm">Documentação oficial, downloads e histórico de versões.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Docs */}
          <div>
            <div className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-4">Documentação</div>
            <div className="space-y-2">
              {docs.map(d => (
                <a key={d.label} href={d.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 glass-card rounded-xl px-4 py-3 hover:border-[var(--accent-cyan)] transition-all group">
                  <d.icon className="w-4 h-4 text-subtle group-hover:text-cyan transition-colors shrink-0" />
                  <span className="text-sm text-muted group-hover:text-foreground transition-colors">{d.label}</span>
                  <ExternalLink className="w-3 h-3 text-subtle ml-auto shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Downloads */}
          <div>
            <div className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-4">Acesso & Downloads</div>
            <div className="space-y-3">
              {downloads.map(d => (
                <a key={d.label} href={d.href} target="_blank" rel="noopener noreferrer"
                  className="block glass-card rounded-xl px-4 py-4 hover:border-[var(--accent-cyan)] hover:shadow-glow-cyan transition-all group">
                  <div className="flex items-center gap-2 mb-1">
                    <Download className="w-4 h-4 text-cyan shrink-0" />
                    <span className="text-sm font-medium text-foreground group-hover:text-cyan transition-colors">{d.label}</span>
                  </div>
                  <p className="text-xs text-subtle pl-6">{d.sub}</p>
                </a>
              ))}

              <div className="glass-card rounded-xl p-4 mt-4">
                <div className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-3">Comunidade</div>
                <div className="space-y-2">
                  {[
                    { l: 'StackOverflow', tag: '[factorytalk-optix]', href: 'https://stackoverflow.com/questions/tagged/factorytalk-optix' },
                    { l: 'LinkedIn Group', tag: 'FactoryTalk', href: 'https://linkedin.com' },
                    { l: 'Rockwell Support', tag: 'Suporte Oficial', href: 'https://rockwellautomation.com/support' },
                  ].map(item => (
                    <a key={item.l} href={item.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between text-xs hover:text-foreground text-muted transition-colors py-1">
                      <span>{item.l}</span>
                      <span className="font-mono text-subtle text-[10px]">{item.tag}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Changelog */}
          <div>
            <div className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-4">Histórico de versões</div>
            <div className="space-y-3">
              {versions.map((v, i) => (
                <div key={v.v} className={`flex gap-3 ${i === 0 ? 'opacity-100' : 'opacity-60 hover:opacity-100 transition-opacity'}`}>
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-2 h-2 rounded-full shrink-0 mt-1 ${i === 0 ? 'bg-[var(--accent-cyan)] shadow-glow-cyan' : 'bg-[var(--surface-border)]'}`} />
                    {i < versions.length - 1 && <div className="w-px flex-1 bg-[var(--surface-border)]" />}
                  </div>
                  <div className="pb-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-mono text-sm font-bold text-cyan">{v.v}</span>
                      <span className="font-mono text-[10px] text-subtle">{v.date}</span>
                      {i === 0 && <span className="tech-tag text-[9px]">latest</span>}
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{v.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom notice */}
        <div className="mt-12 p-4 rounded-xl border border-subtle bg-[var(--surface)]">
          <p className="text-[11px] font-mono text-subtle text-center leading-relaxed">
            ⚠ Este site é uma apresentação técnica independente, não oficial.{' '}
            <span className="text-foreground">FactoryTalk®</span> e <span className="text-foreground">Optix®</span>{' '}
            são marcas registradas da Rockwell Automation, Inc.{' '}
            <a href="https://rockwellautomation.com" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">
              rockwellautomation.com ↗
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
