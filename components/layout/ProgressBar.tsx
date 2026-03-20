'use client'
import { useScrollProgress } from '@/hooks/useTheme'

export function ProgressBar() {
  const progress = useScrollProgress()
  return (
    <div
      className="fixed top-0 left-0 z-[60] h-0.5 bg-gradient-to-r from-[var(--accent-cyan)] to-blue-400 transition-all duration-100"
      style={{ width: `${progress * 100}%` }}
    />
  )
}
