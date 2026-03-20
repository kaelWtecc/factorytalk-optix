import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#00C8FF',
          dark: '#0090B8',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          elevated: 'var(--surface-elevated)',
        },
        brand: {
          navy: '#0A1628',
          cyan: '#00C8FF',
          green: '#22C55E',
          orange: '#F97316',
          red: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'led-pulse': 'ledPulse 2s ease-in-out infinite',
        'data-flow': 'dataFlow 2s linear infinite',
        'scan-line': 'scanLine 4s linear infinite',
        'glow-cyan': 'glowCyan 2s ease-in-out infinite alternate',
        'count-up': 'countUp 2s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        ledPulse: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 6px 2px currentColor' },
          '50%': { opacity: '0.4', boxShadow: '0 0 2px 0px currentColor' },
        },
        dataFlow: {
          '0%': { strokeDashoffset: '200' },
          '100%': { strokeDashoffset: '0' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glowCyan: {
          '0%': { textShadow: '0 0 10px #00C8FF44' },
          '100%': { textShadow: '0 0 30px #00C8FF, 0 0 60px #00C8FF44' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'grid-dark': `linear-gradient(rgba(0,200,255,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0,200,255,0.03) 1px, transparent 1px)`,
        'grid-light': `linear-gradient(rgba(10,22,40,0.05) 1px, transparent 1px),
                       linear-gradient(90deg, rgba(10,22,40,0.05) 1px, transparent 1px)`,
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 200, 255, 0.4)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.4)',
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.4)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.4)',
        'card-dark': '0 4px 32px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255,255,255,0.05) inset',
        'card-light': '0 4px 32px rgba(10, 22, 40, 0.1), 0 1px 0 rgba(255,255,255,0.8) inset',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
