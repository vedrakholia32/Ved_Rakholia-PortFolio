"use client"

import { useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { gsap } from "gsap"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const heroContentRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement>(null)

  const initializeParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = []
    const particleCount = Math.min(50, Math.floor((width * height) / 15000)) // Responsive particle count

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }
    return particles
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width
      if (particle.x > canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = canvas.height
      if (particle.y > canvas.height) particle.y = 0

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`
      ctx.fill()
    })

    // Draw connections between nearby particles (optimized)
    for (let i = 0; i < particlesRef.current.length; i++) {
      const particle = particlesRef.current[i]
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const otherParticle = particlesRef.current[j]
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"

      ctx.scale(dpr, dpr)

      // Reinitialize particles on resize
      particlesRef.current = initializeParticles(rect.width, rect.height)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Start animation
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [animate, initializeParticles])

  useEffect(() => {
    const tl = gsap.timeline()

    // Set initial states for 3D animations
    gsap.set(".hero-title", {
      rotationX: -90,
      y: 100,
      opacity: 0,
      transformPerspective: 1000,
      transformOrigin: "center center",
    })

    gsap.set(".hero-subtitle", {
      rotationY: -45,
      x: -100,
      opacity: 0,
      transformPerspective: 1000,
    })

    gsap.set(".hero-description", {
      rotationX: 45,
      y: 50,
      opacity: 0,
      transformPerspective: 1000,
    })

    gsap.set(".hero-buttons", {
      rotationY: 45,
      x: 100,
      opacity: 0,
      transformPerspective: 1000,
    })

    gsap.set(".hero-social", {
      rotationX: 90,
      y: -50,
      opacity: 0,
      transformPerspective: 1000,
    })

    gsap.set(".floating-element", {
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      transformPerspective: 1000,
    })

    // Animate elements in sequence with 3D effects
    tl.to(".hero-title", {
      duration: 1.2,
      rotationX: 0,
      y: 0,
      opacity: 1,
      ease: "back.out(1.7)",
      transformOrigin: "center center",
    })
      .to(
        ".hero-subtitle",
        {
          duration: 1,
          rotationY: 0,
          x: 0,
          opacity: 1,
          ease: "power3.out",
        },
        "-=0.8",
      )
      .to(
        ".hero-description",
        {
          duration: 1,
          rotationX: 0,
          y: 0,
          opacity: 1,
          ease: "power2.out",
        },
        "-=0.6",
      )
      .to(
        ".hero-buttons",
        {
          duration: 1,
          rotationY: 0,
          x: 0,
          opacity: 1,
          ease: "power2.out",
        },
        "-=0.4",
      )
      .to(
        ".hero-social",
        {
          duration: 1,
          rotationX: 0,
          y: 0,
          opacity: 1,
          ease: "power2.out",
        },
        "-=0.2",
      )

    // Continuous floating animations for 3D elements
    gsap.to(".floating-element-1", {
      duration: 4,
      rotationY: 360,
      rotationX: 15,
      y: -20,
      repeat: -1,
      ease: "none",
      yoyo: true,
    })

    gsap.to(".floating-element-2", {
      duration: 6,
      rotationX: 360,
      rotationZ: 180,
      x: 15,
      repeat: -1,
      ease: "none",
      yoyo: true,
    })

    gsap.to(".floating-element-3", {
      duration: 5,
      rotationY: -360,
      rotationZ: 90,
      y: 15,
      repeat: -1,
      ease: "none",
      yoyo: true,
    })

    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      const xPos = (clientX / innerWidth - 0.5) * 2
      const yPos = (clientY / innerHeight - 0.5) * 2

      gsap.to(".hero-title", {
        duration: 0.5,
        rotationY: xPos * 5,
        rotationX: -yPos * 5,
        ease: "power2.out",
      })

      gsap.to(".floating-element", {
        duration: 0.8,
        x: xPos * 30,
        y: yPos * 20,
        rotationY: xPos * 10,
        rotationX: -yPos * 10,
        ease: "power2.out",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      tl.kill()
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{ background: "transparent" }}
      />

      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        <div className="floating-element floating-element-1 absolute top-1/4 left-1/4 w-16 h-16 border-2 border-primary/20 rotate-45 transform-gpu"></div>
        <div className="floating-element floating-element-2 absolute top-1/3 right-1/4 w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full transform-gpu"></div>
        <div className="floating-element floating-element-3 absolute bottom-1/3 left-1/3 w-20 h-20 border border-accent/20 transform-gpu">
          <div className="w-full h-full border-t-2 border-primary/30 rotate-45"></div>
        </div>
        <div className="floating-element floating-element-1 absolute top-1/2 right-1/3 w-8 h-8 bg-primary/20 transform rotate-12 transform-gpu"></div>
        <div className="floating-element floating-element-2 absolute bottom-1/4 right-1/5 w-14 h-14 border-2 border-secondary/20 rounded-lg transform-gpu"></div>
      </div>

      {/* Content */}
      <div ref={heroContentRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="space-y-6">
          <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-bold text-balance transform-gpu">
            <span className="gradient-text">Ved Rakholia</span>
          </h1>

          <h2 className="hero-subtitle text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium transform-gpu">
            Software Engineer & AI Optimization Specialist
          </h2>

          <p className="hero-description text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed transform-gpu">
            I build accessible, pixel-perfect digital experiences that blend thoughtful design with robust engineering.
            Currently optimizing AI-generated code and building innovative SaaS solutions.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transform-gpu">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto focus-enhanced transform-gpu hover:scale-105 transition-transform"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Work
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-secondary w-full sm:w-auto focus-enhanced bg-transparent transform-gpu hover:scale-105 transition-transform"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get In Touch
              <Mail className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="hero-social flex items-center justify-center gap-6 pt-8 transform-gpu">
            <a
              href="https://github.com/vedrakholia32"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all focus-enhanced p-2 rounded-lg hover:scale-110 transform-gpu"
              aria-label="GitHub Profile"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/ved-rakholia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all focus-enhanced p-2 rounded-lg hover:scale-110 transform-gpu"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:vedrakholia525@gmail.com"
              className="text-muted-foreground hover:text-primary transition-all focus-enhanced p-2 rounded-lg hover:scale-110 transform-gpu"
              aria-label="Email Contact"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
