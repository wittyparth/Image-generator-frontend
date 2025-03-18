"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export function BackgroundGradient({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let hue = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createGradient = (x: number, y: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, Math.max(canvas.width, canvas.height) * 0.5)

      gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, 0.4)`)
      gradient.addColorStop(0.5, `hsla(${hue + 60}, 100%, 60%, 0.1)`)
      gradient.addColorStop(1, "hsla(0, 0%, 0%, 0)")

      return gradient
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // First gradient - top left
      ctx.fillStyle = createGradient(canvas.width * 0.1, canvas.height * 0.1)
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Second gradient - bottom right
      hue = (hue + 120) % 360
      ctx.fillStyle = createGradient(canvas.width * 0.9, canvas.height * 0.9)
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Apply blur
      ctx.filter = "blur(100px)"

      hue = (hue + 0.1) % 360
      animationFrameId = requestAnimationFrame(render)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    render()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 z-0 opacity-20 dark:opacity-10", className)}
      aria-hidden="true"
    />
  )
}

