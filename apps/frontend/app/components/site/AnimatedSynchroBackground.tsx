import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'

type Particle = {
  x: number
  y: number
  speed: number
  axis: 'x' | 'y'
  direction: 1 | -1
  glow: number
}

type AnimatedSynchroBackgroundProps = {
  className?: string
}

const BASE_GRID_SIZE = 48

export function AnimatedSynchroBackground({ className }: AnimatedSynchroBackgroundProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const smoothRotateX = useSpring(rotateX, { stiffness: 120, damping: 20, mass: 0.6 })
  const smoothRotateY = useSpring(rotateY, { stiffness: 120, damping: 20, mass: 0.6 })

  const particleCount = useMemo(() => {
    if (typeof window === 'undefined') return 14
    return window.innerWidth < 768 ? 9 : 16
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return
    const node = wrapperRef.current
    if (!node) return

    // 滑鼠移動只做小角度傾斜，避免畫面過度晃動。
    const onPointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      rotateX.set((0.5 - y) * 5)
      rotateY.set((x - 0.5) * 6)
    }

    const onPointerLeave = () => {
      rotateX.set(0)
      rotateY.set(0)
    }

    node.addEventListener('pointermove', onPointerMove)
    node.addEventListener('pointerleave', onPointerLeave)
    return () => {
      node.removeEventListener('pointermove', onPointerMove)
      node.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [prefersReducedMotion, rotateX, rotateY])

  useEffect(() => {
    if (prefersReducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    let rafId = 0
    let particles: Particle[] = []

    const createParticles = (width: number, height: number): Particle[] => {
      const collection: Particle[] = []
      for (let index = 0; index < particleCount; index += 1) {
        const axis = index % 2 === 0 ? 'x' : 'y'
        const direction: 1 | -1 = index % 3 === 0 ? 1 : -1
        const gridX = Math.floor(Math.random() * Math.max(3, width / BASE_GRID_SIZE)) * BASE_GRID_SIZE
        const gridY = Math.floor(Math.random() * Math.max(3, height / BASE_GRID_SIZE)) * BASE_GRID_SIZE

        collection.push({
          x: gridX,
          y: gridY,
          speed: 0.25 + Math.random() * 0.6,
          axis,
          direction,
          glow: 1.5 + Math.random() * 2.8,
        })
      }
      return collection
    }

    const resize = () => {
      const ratio = window.devicePixelRatio || 1
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      particles = createParticles(width, height)
    }

    const step = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight

      context.clearRect(0, 0, width, height)

      // 粒子沿著網格線做線性移動，象徵有序且受型別約束的資料流。
      for (const particle of particles) {
        if (particle.axis === 'x') {
          particle.x += particle.speed * particle.direction
          if (particle.x > width + 12) particle.x = -12
          if (particle.x < -12) particle.x = width + 12
        } else {
          particle.y += particle.speed * particle.direction
          if (particle.y > height + 12) particle.y = -12
          if (particle.y < -12) particle.y = height + 12
        }

        const cyan = '60, 246, 255'
        const blue = '43, 127, 255'
        const color = particle.axis === 'x' ? cyan : blue

        context.beginPath()
        context.fillStyle = `rgba(${color}, 0.92)`
        context.shadowBlur = particle.glow * 6
        context.shadowColor = `rgba(${color}, 0.9)`
        context.arc(particle.x, particle.y, particle.glow, 0, Math.PI * 2)
        context.fill()
      }

      rafId = window.requestAnimationFrame(step)
    }

    resize()
    step()

    window.addEventListener('resize', resize)
    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [particleCount, prefersReducedMotion])

  return (
    <motion.div
      ref={wrapperRef}
      className={`absolute inset-0 overflow-hidden ${className ?? ''}`}
      style={{
        perspective: 1000,
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
      }}
      aria-hidden="true"
    >
      <div className="synchro-noise absolute inset-0" />
      <div className="grid-line absolute inset-[-12%] opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/25 to-synchro-bg" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-85" />
    </motion.div>
  )
}
