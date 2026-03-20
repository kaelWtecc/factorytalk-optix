'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight, ChevronDown, Cpu, Activity } from 'lucide-react'
import { useInView, useCountUp } from '@/hooks/useTheme'

const ParticleNetwork = dynamic(
  () => import('@/components/canvas/ParticleNetwork').then(m => m.ParticleNetwork),
  { ssr: false }
)

const TAGS = ['OPC UA', 'MQTT', 'NetLogic C#', 'Edge Computing', 'CI/CD', 'Linux', 'InfluxDB', 'Multi-user', 'GitHub', 'IIoT']

const stats = [
  { value: 8, suffix: '+', label: 'Protocolos Nativos', detail: 'OPC UA · MQTT · Modbus · S7TCP...' },
  { value: 3, suffix: ' SO', label: 'Windows · Linux · Browser', detail: 'Um codebase, N targets' },
  { value: 5, suffix: '', label: 'Soluções Integradas', detail: 'Software · Panel · Edge · VPN · Data' },
]

function StatCounter({ value, suffix, label, detail, inView }: {
  value: number, suffix: string, label: string, detail: string, inView: boolean
}) {
  const count = useCountUp(value, 1800, inView)
  return (
    <div className="text-center group">
      <div className="font-display text-3xl font-bold text-cyan mb-0.5">
        {count}{suffix}
      </div>
      <div className="text-sm font-semibold text-foreground mb-0.5">{label}</div>
      <div className="text-xs text-subtle font-mono hidden group-hover:block transition-all">{detail}</div>
    </div>
  )
}

export function Hero() {
  const [visible, setVisible] = useState(false)
  const [tagIndex, setTagIndex] = useState(0)
  const { ref, inView } = useInView(0.1)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTagIndex(i => (i + 1) % TAGS.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-grid">
      {/* Particle background */}
      <div className="absolute inset-0">
        <ParticleNetwork />
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, var(--background) 100%)',
        }}
      />

      {/* Top vignette */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--background)] to-transparent pointer-events-none" />

      {/* Content */}
      <div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border text-xs font-mono text-muted"
          style={{ transitionDelay: '0.1s' }}
        >
          <span className="led led-green" />
          <span className="text-subtle">PLATAFORMA HMI + IIoT</span>
          <span className="w-px h-3 bg-[var(--surface-border)]" />
          <span className="text-cyan">INDÚSTRIA 4.0</span>
          <span className="w-px h-3 bg-[var(--surface-border)]" />
          <span className="text-subtle">Rockwell Automation</span>
        </div>

        {/* Headline */}
        <div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold leading-none tracking-tight">
            <span className="block text-foreground mb-2">FactoryTalk</span>
            <span className="block gradient-text animate-glow-cyan">Optix</span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          className="max-w-2xl text-base sm:text-lg text-muted leading-relaxed"
          style={{ opacity: visible ? 1 : 0, transitionDelay: '0.3s', transition: 'opacity 0.8s ease' }}
        >
          Plataforma de desenvolvimento HMI open-architecture com{' '}
          <span className="text-cyan font-mono">OPC UA nativo</span>,{' '}
          <span className="text-cyan font-mono">scripting C#</span>,{' '}
          deploy multi-plataforma e integração cloud via{' '}
          <span className="text-foreground font-semibold">FactoryTalk Hub</span>.
        </p>

        {/* Rotating tags */}
        <div
          className="flex flex-wrap justify-center gap-2"
          style={{ opacity: visible ? 1 : 0, transitionDelay: '0.45s', transition: 'opacity 0.8s ease' }}
        >
          {TAGS.map((tag, i) => (
            <span
              key={tag}
              className="tech-tag transition-all duration-500"
              style={{
                opacity: i === tagIndex ? 1 : 0.4,
                transform: i === tagIndex ? 'scale(1.08)' : 'scale(1)',
                boxShadow: i === tagIndex ? '0 0 12px rgba(0,200,255,0.25)' : 'none',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center gap-3"
          style={{ opacity: visible ? 1 : 0, transitionDelay: '0.6s', transition: 'opacity 0.8s ease' }}
        >
          <Link
            href="/features"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono font-semibold text-sm hmi-btn-primary transition-all"
          >
            Explorar Plataforma
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-mono font-medium text-sm hmi-btn transition-all"
          >
            <Activity className="w-4 h-4 text-cyan" />
            Ver Demo HMI
          </Link>
        </div>

        {/* Stats */}
        <div
          ref={ref}
          className="w-full mt-4 grid grid-cols-3 gap-6 sm:gap-12 pt-8 border-t border-subtle"
          style={{ opacity: visible ? 1 : 0, transitionDelay: '0.75s', transition: 'opacity 0.8s ease' }}
        >
          {stats.map(s => (
            <StatCounter key={s.label} {...s} inView={inView} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-subtle animate-float"
        style={{ opacity: visible ? 0.7 : 0, transitionDelay: '1s', transition: 'opacity 0.8s ease' }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  )
}
