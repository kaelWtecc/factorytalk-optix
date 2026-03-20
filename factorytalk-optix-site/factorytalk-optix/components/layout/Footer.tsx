import Link from 'next/link'
import { Cpu, ExternalLink } from 'lucide-react'

const links = [
  { section: 'Plataforma', items: [
    { href: '/', label: 'Visão Geral' },
    { href: '/features', label: 'Funcionalidades' },
    { href: '/architecture', label: 'Arquitetura' },
    { href: '/portfolio', label: 'Produtos' },
  ]},
  { section: 'Recursos', items: [
    { href: '/demo', label: 'Demo HMI' },
    { href: '/resources', label: 'Documentação' },
    { href: 'https://github.com/FactoryTalk-Optix', label: 'GitHub', external: true },
    { href: 'https://rockwellautomation.com', label: 'Rockwell Automation', external: true },
  ]},
]

export function Footer() {
  return (
    <footer className="border-t border-subtle bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-md border border-[var(--accent-cyan)] opacity-70 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-cyan" strokeWidth={1.5} />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-foreground">FactoryTalk</span>
                <span className="font-display font-bold text-sm text-cyan"> Optix</span>
              </div>
            </div>
            <p className="text-xs text-muted max-w-xs leading-relaxed mb-4">
              Apresentação técnica independente da plataforma FactoryTalk Optix para engenheiros de automação e integradores de sistemas.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['OPC UA', 'IIoT', 'Edge', 'C#', 'CI/CD'].map(t => (
                <span key={t} className="tech-tag text-[10px]">{t}</span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {links.map(col => (
            <div key={col.section}>
              <div className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-3">{col.section}</div>
              <ul className="space-y-2">
                {col.items.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={'external' in item && item.external ? '_blank' : undefined}
                      rel={'external' in item && item.external ? 'noopener noreferrer' : undefined}
                      className="text-xs text-muted hover:text-foreground transition-colors inline-flex items-center gap-1"
                    >
                      {item.label}
                      {'external' in item && item.external && <ExternalLink className="w-2.5 h-2.5 opacity-50" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-subtle space-y-2">
          <p className="text-[10px] font-mono text-subtle leading-relaxed">
            ⚠ Este site é uma apresentação técnica independente, não oficial.{' '}
            <span className="text-foreground">FactoryTalk®</span> e{' '}
            <span className="text-foreground">Optix®</span> são marcas registradas da Rockwell Automation, Inc.
          </p>
          <p className="text-[10px] font-mono text-subtle">
            Todos os dados da demo são completamente simulados — não representam sistemas ou instalações reais.
          </p>
        </div>
      </div>
    </footer>
  )
}
