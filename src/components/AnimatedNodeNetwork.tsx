'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from '@/components/ThemeProvider'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  opacity: number
  pulsePhase: number
}

const NODE_COUNT = 22
const MAX_DIST = 160

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a)
}

export default function AnimatedNodeNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const animRef = useRef<number>(0)
  const { theme } = useTheme()
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // Init nodes — spread across right 60% of canvas
    nodesRef.current = Array.from({ length: NODE_COUNT }, () => ({
      x: randomBetween(30, 100),   // percent of width
      y: randomBetween(5, 95),
      vx: randomBetween(-0.015, 0.015),
      vy: randomBetween(-0.012, 0.012),
      r: randomBetween(2.5, 6),
      opacity: randomBetween(0.4, 1),
      pulsePhase: Math.random() * Math.PI * 2,
    }))

    let t = 0

    function draw() {
      if (!canvas || !ctx) return
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      const isDark = themeRef.current === 'dark'
      const nodeColor = isDark ? '#00C2FF' : '#C17A3A'
      const lineColor = isDark ? 'rgba(0,194,255,' : 'rgba(193,122,58,'

      const nodes = nodesRef.current

      // Update positions
      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy

        // Gentle drift with sine wave wobble
        n.x += Math.sin(t * 0.008 + n.pulsePhase) * 0.006
        n.y += Math.cos(t * 0.006 + n.pulsePhase) * 0.005

        // Soft boundary bounce
        if (n.x < 20) { n.x = 20; n.vx *= -1 }
        if (n.x > 100) { n.x = 100; n.vx *= -1 }
        if (n.y < 2) { n.y = 2; n.vy *= -1 }
        if (n.y > 98) { n.y = 98; n.vy *= -1 }
      })

      // Draw lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const ax = (nodes[i].x / 100) * W
          const ay = (nodes[i].y / 100) * H
          const bx = (nodes[j].x / 100) * W
          const by = (nodes[j].y / 100) * H
          const dist = Math.hypot(ax - bx, ay - by)

          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.22
            ctx.beginPath()
            ctx.moveTo(ax, ay)
            ctx.lineTo(bx, by)
            ctx.strokeStyle = lineColor + alpha + ')'
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const px = (n.x / 100) * W
        const py = (n.y / 100) * H
        const pulse = Math.sin(t * 0.04 + n.pulsePhase)

        // Outer pulse ring (only on larger nodes)
        if (n.r > 4) {
          const ringR = n.r + 4 + pulse * 3
          ctx.beginPath()
          ctx.arc(px, py, ringR, 0, Math.PI * 2)
          ctx.strokeStyle = lineColor + (0.12 + pulse * 0.06) + ')'
          ctx.lineWidth = 1
          ctx.stroke()
        }

        // Node fill
        ctx.beginPath()
        ctx.arc(px, py, n.r, 0, Math.PI * 2)
        ctx.fillStyle = nodeColor
        ctx.globalAlpha = n.opacity
        ctx.fill()
        ctx.globalAlpha = 1
      })

      t++
      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
