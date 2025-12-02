"use client"

import { useEffect, useRef } from "react"

interface FloatingIcon {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  emoji: string
  opacity: number
}

export function FloatingIcons() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight * 0.6

    const icons: FloatingIcon[] = [
      { x: 100, y: 100, vx: 0.5, vy: 0.3, size: 40, emoji: "🍌", opacity: 0.1 },
      { x: 200, y: 150, vx: -0.3, vy: 0.4, size: 50, emoji: "🥛", opacity: 0.08 },
      { x: 300, y: 80, vx: 0.4, vy: -0.2, size: 45, emoji: "🍅", opacity: 0.09 },
      { x: 150, y: 200, vx: 0.2, vy: 0.5, size: 55, emoji: "🥕", opacity: 0.07 },
    ]

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      icons.forEach((icon) => {
        icon.x += icon.vx
        icon.y += icon.vy

        if (icon.x < 0 || icon.x > canvas.width) icon.vx *= -1
        if (icon.y < 0 || icon.y > canvas.height) icon.vy *= -1

        ctx.globalAlpha = icon.opacity
        ctx.font = `${icon.size}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(icon.emoji, icon.x, icon.y)
        ctx.globalAlpha = 1
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 0.6
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10"
    />
  )
}
