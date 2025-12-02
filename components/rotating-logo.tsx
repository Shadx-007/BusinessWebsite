"use client"

import { useEffect, useRef } from "react"

export function RotatingLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let rotation = 0

    const drawLogo = () => {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = 60

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation)

      // Outer glow
      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius + 20)
      glowGradient.addColorStop(0, "rgba(46, 139, 87, 0.4)")
      glowGradient.addColorStop(1, "rgba(46, 139, 87, 0)")
      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(0, 0, radius + 20, 0, Math.PI * 2)
      ctx.fill()

      // Apple body gradient
      const gradient = ctx.createLinearGradient(-radius, -radius, radius, radius)
      gradient.addColorStop(0, "#2E8B57")
      gradient.addColorStop(0.5, "#4CAF7F")
      gradient.addColorStop(1, "#FF7A1A")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(0, 0, radius, 0, Math.PI * 2)
      ctx.fill()

      // Apple shine
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
      ctx.beginPath()
      ctx.arc(-radius / 3, -radius / 3, radius / 3, 0, Math.PI * 2)
      ctx.fill()

      // Shopping cart outline
      ctx.strokeStyle = "white"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(-radius / 2, -radius / 4)
      ctx.lineTo(-radius / 4, radius / 4)
      ctx.lineTo(radius / 4, radius / 4)
      ctx.lineTo(radius / 2, -radius / 4)
      ctx.stroke()

      // Cart handle
      ctx.beginPath()
      ctx.arc(0, -radius / 2, radius / 4, 0, Math.PI)
      ctx.stroke()

      ctx.restore()

      rotation += 0.01
      animationId = requestAnimationFrame(drawLogo)
    }

    canvas.width = 200
    canvas.height = 200

    drawLogo()

    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-40 h-40 drop-shadow-2xl"
    />
  )
}
