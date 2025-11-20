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
    const tl = gsap.timeline({ delay: 0.5 })

    // Set initial states
    gsap.set(".hero-badge", {
      y: -30,
      opacity: 0,
    })

    gsap.set(".hero-title", {
      y: 80,
      opacity: 0,
    })

    gsap.set(".hero-subtitle", {
      y: 60,
      opacity: 0,
    })

    gsap.set(".hero-description", {
      y: 40,
      opacity: 0,
    })

    gsap.set(".hero-buttons", {
      y: 50,
      opacity: 0,
    })

    gsap.set(".hero-social", {
      y: 30,
      opacity: 0,
    })

    gsap.set(".floating-element", {
      opacity: 0,
      scale: 0.8,
    })

    // Animate elements in sequence
    tl.to(".hero-badge", {
      duration: 0.8,
      y: 0,
      opacity: 1,
      ease: "power3.out",
    })
      .to(".hero-title", {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "power3.out",
      }, "-=0.4")
      .to(".hero-subtitle", {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: "power2.out",
      }, "-=0.6")
      .to(".hero-description", {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: "power2.out",
      }, "-=0.4")
      .to(".hero-buttons", {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: "power2.out",
      }, "-=0.4")
      .to(".hero-social", {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: "power2.out",
      }, "-=0.6")
      .to(".floating-element", {
        duration: 1.2,
        opacity: 1,
        scale: 1,
        ease: "back.out(1.7)",
        stagger: 0.1,
      }, "-=0.8")

    // Continuous floating animation for code elements
    gsap.to(".floating-element", {
      y: "random(-20, 20)",
      x: "random(-10, 10)",
      duration: "random(3, 6)",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: {
        amount: 2,
        from: "random"
      }
    })

    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const xPos = (clientX / window.innerWidth - 0.5) * 2
      const yPos = (clientY / window.innerHeight - 0.5) * 2

      gsap.to(".floating-element", {
        duration: 0.8,
        x: xPos * 20,
        y: yPos * 15,
        ease: "power2.out",
      })
    }

    // Reset position when mouse leaves the window
    const handleMouseLeave = () => {
      gsap.to(".floating-element", {
        duration: 1.2,
        x: 0,
        y: 0,
        ease: "power2.out",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      tl.kill()
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Minimal Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-primary/5"></div>
      
      {/* Subtle Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none will-change-transform opacity-20"
        style={{ background: "transparent" }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center min-h-screen py-16">
          
          {/* Left Content - Minimalist */}
          <div ref={heroContentRef} className="space-y-12">
          

            {/* Bold, Clean Typography */}
            <div className="space-y-8">
              <h1 className="hero-title">
                <span className="block text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tight">
                  <span className="text-foreground">Ved</span>
                </span>
                <span className="block text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tight mt-2">
                  <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Rakholia
                  </span>
                </span>
              </h1>
              
              <h2 className="hero-subtitle text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-light tracking-wide max-w-lg">
                Software Engineer & AI Specialist
              </h2>
            </div>

            {/* Philosophy Quote - Inspired by minimalist design */}
            <div className="hero-description space-y-4">
              <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-md font-light">
                Building exceptional digital experiences with modern technology.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground/60 leading-relaxed max-w-md font-light italic border-l-2 border-primary/30 pl-4">
                "Code is not just about function—it's about clarity, purpose, and elegance. 
                I build what matters, removing the rest."
              </p>
            </div>

            {/* Minimal Description */}
            <p className="hero-description text-lg text-muted-foreground/80 leading-relaxed max-w-md font-light hidden">
              Building exceptional digital experiences with modern technology.
            </p>

            {/* Clean CTAs
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Work
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-border hover:border-primary/50 hover:bg-primary/5 px-8 py-4 rounded-2xl font-medium transform hover:scale-[1.02] transition-all duration-300"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Contact
              </Button>
            </div> */}

            {/* Minimal Social */}
            <div className="hero-social flex items-center gap-6 pt-8">
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/vedrakholia32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-secondary/30 hover:bg-primary/20 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a
                  href="https://in.linkedin.com/in/ved-rakholia-760767275"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-secondary/30 hover:bg-primary/20 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a
                  href="mailto:vedrakholia525@gmail.com"
                  className="w-12 h-12 bg-secondary/30 hover:bg-primary/20 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Visual - Clean & Modern */}
          <div className="relative">
            <div className="relative w-full h-[500px] lg:h-[600px] bg-gradient-to-br from-primary/3 to-secondary/5 rounded-[3rem] overflow-hidden border border-border/20">
              
              {/* Clean Code Window */}
              <div ref={floatingElementsRef} className="absolute inset-0">
                <div className="floating-element absolute top-12 left-12 right-12 h-48 bg-background/95 backdrop-blur-xl rounded-3xl border border-border/30 p-8 shadow-2xl">
                  {/* Minimal Window Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">portfolio.tsx</span>
                  </div>
                  
                  {/* Clean Code */}
                  <div className="space-y-3 text-sm font-mono">
                    <div className="text-blue-400">const <span className="text-yellow-300">developer</span> = {`{`}</div>
                    <div className="pl-4 text-emerald-400">name: <span className="text-orange-300">"Ved Rakholia"</span>,</div>
                    <div className="pl-4 text-emerald-400">role: <span className="text-purple-400">"Full Stack"</span>,</div>
                    <div className="pl-4 text-emerald-400">passion: <span className="text-orange-300">"Innovation"</span></div>
                    <div className="text-blue-400">{`};`}</div>
                  </div>
                </div>

                {/* Minimal Tech Icons */}
                <div className="floating-element absolute bottom-16 left-16 w-14 h-14 bg-blue-500/10 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-blue-500/20">
                  <span className="text-xl">⚛️</span>
                </div>
                
                <div className="floating-element absolute bottom-16 left-36 w-14 h-14 bg-emerald-500/10 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-emerald-500/20">
                  <span className="text-xl">⚡</span>
                </div>
                
                <div className="floating-element absolute bottom-16 right-36 w-14 h-14 bg-purple-500/10 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-purple-500/20">
                  <span className="text-xl">🎯</span>
                </div>

                <div className="floating-element absolute bottom-16 right-16 w-14 h-14 bg-orange-500/10 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-orange-500/20">
                  <span className="text-xl">🚀</span>
                </div>
              </div>

              {/* Subtle Center Glow */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            </div>

            {/* Minimal Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-2xl blur-sm"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary/30 rounded-xl blur-sm"></div>
          </div>

        </div>
      </div>

      {/* Clean Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border border-primary/30 rounded-full flex justify-center bg-background/20 backdrop-blur-sm">
          <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}
