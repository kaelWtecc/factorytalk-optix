'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  label?: string
  isNode: boolean
  pulsePhase: number
}

const NODE_LABELS = ['PLC', 'HMI', 'EDGE', 'OPC UA', 'CLOUD', 'MQTT', 'SCADA', 'MES']

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let mouse = { x: -9999, y: -9999 }
    const particles: Particle[] = []
    const COUNT = 60
    const NODE_COUNT = 8
    const MAX_DIST = 130

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', () => { mouse = { x: -9999, y: -9999 } })

    // Init particles
    for (let i = 0; i < COUNT; i++) {
      const isNode = i < NODE_COUNT
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: isNode ? 3 : 1.5,
        label: isNode ? NODE_LABELS[i] : undefined,
        isNode,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    const isDark = () => !document.documentElement.classList.contains('light')

    const draw = (t: number) => {
      const dark = isDark()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cyanRgb = dark ? '0,200,255' : '0,100,160'
      const alpha = dark ? 0.5 : 0.35

      // Update and draw connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        // Move
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Mouse repulsion
        const mdx = p.x - mouse.x
        const mdy = p.y - mouse.y
        const md = Math.sqrt(mdx * mdx + mdy * mdy)
        if (md < 100) {
          p.x += (mdx / md) * 1.5
          p.y += (mdy / md) * 1.5
        }

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const a = (1 - dist / MAX_DIST) * alpha * (p.isNode || q.isNode ? 1.5 : 0.6)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${cyanRgb},${a})`
            ctx.lineWidth = p.isNode && q.isNode ? 0.8 : 0.4
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }

      // Draw particles on top
      particles.forEach(p => {
        const pulse = Math.sin(t * 0.002 + p.pulsePhase)
        const glowAlpha = dark ? 0.15 + pulse * 0.1 : 0.08 + pulse * 0.05

        if (p.isNode) {
          // Glow ring
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 18)
          grad.addColorStop(0, `rgba(${cyanRgb},${glowAlpha * 2})`)
          grad.addColorStop(1, `rgba(${cyanRgb},0)`)
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, 18, 0, Math.PI * 2)
          ctx.fill()

          // Core dot
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius + pulse * 0.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${cyanRgb},${0.7 + pulse * 0.2})`
          ctx.fill()

          // Label
          if (p.label) {
            ctx.font = '9px "Fira Code", monospace'
            ctx.fillStyle = `rgba(${cyanRgb},${0.5 + pulse * 0.15})`
            ctx.fillText(p.label, p.x + 6, p.y - 6)
          }
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${cyanRgb},${0.3 + pulse * 0.1})`
          ctx.fill()
        }
      })

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-80"
      style={{ pointerEvents: 'auto' }}
    />
  )
}
