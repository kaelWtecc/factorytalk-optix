'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon, Cpu } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Visão Geral' },
  { href: '/features', label: 'Funcionalidades' },
  { href: '/architecture', label: 'Arquitetura' },
  { href: '/portfolio', label: 'Produtos' },
  { href: '/demo', label: 'Demo HMI' },
  { href: '/resources', label: 'Recursos' },
]

export function Navbar() {
  const pathname = usePathname()
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass-card border-b py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-md border border-[var(--accent-cyan)] opacity-60 group-hover:opacity-100 transition-opacity" />
              <Cpu className="w-4.5 h-4.5 text-cyan" strokeWidth={1.5} />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-foreground">FactoryTalk</span>
              <span className="font-display font-bold text-sm text-cyan"> Optix</span>
            </div>
            <span className="hidden sm:inline-block text-[10px] font-mono text-subtle border border-subtle px-1.5 py-0.5 rounded">
              v1.4.2
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const active = link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
                    active
                      ? 'text-cyan tab-active'
                      : 'text-muted hover:text-foreground hover:bg-[var(--surface)]'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Alternar tema"
              className="p-2 rounded-md text-muted hover:text-foreground hover:bg-[var(--surface)] transition-all duration-200"
            >
              {theme === 'dark'
                ? <Sun className="w-4 h-4" />
                : <Moon className="w-4 h-4" />
              }
            </button>

            {/* Demo CTA */}
            <Link
              href="/demo"
              className="hidden sm:inline-flex items-center gap-1.5 hmi-btn-primary px-3 py-1.5 text-sm rounded-md font-mono font-semibold transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80 animate-pulse" />
              Demo Live
            </Link>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-md text-muted hover:text-foreground hover:bg-[var(--surface)] transition-all"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden glass-card border-t mt-2 px-4 py-3">
          <nav className="flex flex-col gap-1">
            {navLinks.map(link => {
              const active = link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-md transition-all',
                    active
                      ? 'text-cyan bg-[var(--accent-cyan-dim)]'
                      : 'text-muted hover:text-foreground hover:bg-[var(--surface)]'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
