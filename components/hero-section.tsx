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
      rotation: () => gsap.utils.random(-180, 180),
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
        rotation: 0,
        ease: "back.out(1.7)",
        stagger: 0.1,
      }, "-=0.8")

    // Continuous floating animation for code elements
    gsap.to(".floating-element", {
      y: "random(-20, 20)",
      x: "random(-10, 10)",
      rotation: "random(-5, 5)",
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
        rotation: xPos * 5,
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
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-secondary/10"></div>
      
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 75% 25%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
        }}></div>
      </div>

      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none will-change-transform opacity-40"
        style={{ background: "transparent" }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          
          {/* Left Content - Enhanced Typography */}
          <div ref={heroContentRef} className="space-y-10 lg:pr-12">
            
            {/* Status Badge - More refined */}
            <div className="hero-badge inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/20 backdrop-blur-sm shadow-lg">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
              </div>
              <span className="text-sm font-semibold text-primary tracking-wide">Available for opportunities</span>
            </div>

            {/* Main Headline - Enhanced Typography */}
            <div className="space-y-6">
              <h1 className="hero-title relative">
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-none">
                  <span className="text-foreground">Creative</span>
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-none mt-2">
                  <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                    Developer
                  </span>
                </span>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-sm"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-sm"></div>
              </h1>
              
              <h2 className="hero-subtitle text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-light tracking-wide">
                & AI Optimization Specialist
              </h2>
            </div>

            {/* Enhanced Description */}
            <p className="hero-description text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl font-light">
              I craft exceptional digital experiences through the perfect blend of 
              <span className="text-primary font-medium"> innovative design</span> and 
              <span className="text-primary font-medium"> robust engineering</span>. 
              Currently optimizing AI-generated code and building next-generation SaaS solutions.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-6 pt-6">
              <Button
                size="lg"
                className="group relative bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-primary-foreground px-10 py-6 text-lg rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform-gpu hover:scale-105 transition-all duration-300 overflow-hidden"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span className="relative z-10 flex items-center">
                  View My Work
                  <ExternalLink className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-border hover:border-primary/50 bg-background/50 backdrop-blur-sm hover:bg-primary/5 px-10 py-6 text-lg rounded-2xl font-semibold shadow-lg hover:shadow-xl transform-gpu hover:scale-105 transition-all duration-300"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span className="flex items-center">
                  Get In Touch
                  <Mail className="ml-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                </span>
              </Button>
            </div>

            {/* Enhanced Social Links */}
            <div className="hero-social flex items-center gap-8 pt-8">
              <span className="text-sm text-muted-foreground font-medium tracking-wider uppercase">Connect</span>
              <div className="h-px w-8 bg-gradient-to-r from-primary/50 to-transparent"></div>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/vedrakholia32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 bg-secondary/30 hover:bg-primary/20 rounded-2xl transition-all duration-300 hover:scale-110 transform-gpu backdrop-blur-sm border border-border/50 hover:border-primary/30"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a
                  href="https://in.linkedin.com/in/ved-rakholia-760767275"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 bg-secondary/30 hover:bg-primary/20 rounded-2xl transition-all duration-300 hover:scale-110 transform-gpu backdrop-blur-sm border border-border/50 hover:border-primary/30"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a
                  href="mailto:vedrakholia525@gmail.com"
                  className="group p-4 bg-secondary/30 hover:bg-primary/20 rounded-2xl transition-all duration-300 hover:scale-110 transform-gpu backdrop-blur-sm border border-border/50 hover:border-primary/30"
                  aria-label="Email Contact"
                >
                  <Mail className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Visual Element - Completely Redesigned */}
          <div className="relative lg:pl-12">
            <div className="relative">
              {/* Main Visual Container with Enhanced Aesthetics */}
              <div className="relative w-full h-[500px] lg:h-[600px] bg-gradient-to-br from-primary/5 via-secondary/5 to-purple-500/5 rounded-[2rem] overflow-hidden border border-border/30 shadow-2xl backdrop-blur-sm">
                
                {/* Enhanced Floating Elements */}
                <div ref={floatingElementsRef} className="absolute inset-0">
                  
                  {/* Premium Code Window */}
                  <div className="floating-element absolute top-8 left-8 right-8 h-52 bg-gradient-to-br from-background/95 to-background/90 backdrop-blur-lg rounded-2xl border border-border/50 p-6 shadow-2xl z-20">
                    {/* Window Controls */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg"></div>
                        <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-lg"></div>
                        <div className="w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground font-mono">hero-section.tsx</span>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Enhanced Code Content */}
                    <div className="space-y-3 text-sm font-mono leading-relaxed">
                      <div className="flex items-start gap-3">
                        <span className="text-muted-foreground/50 text-xs mt-1">1</span>
                        <div>
                          <span className="text-blue-400">const</span>{" "}
                          <span className="text-yellow-300">developer</span>{" "}
                          <span className="text-muted-foreground">=</span>{" "}
                          <span className="text-muted-foreground">{`{`}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-muted-foreground/50 text-xs mt-1">2</span>
                        <div className="pl-4">
                          <span className="text-emerald-400">name</span>
                          <span className="text-muted-foreground">:</span>{" "}
                          <span className="text-orange-300">"Ved Rakholia"</span>
                          <span className="text-muted-foreground">,</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-muted-foreground/50 text-xs mt-1">3</span>
                        <div className="pl-4">
                          <span className="text-emerald-400">skills</span>
                          <span className="text-muted-foreground">:</span>{" "}
                          <span className="text-purple-400">["React", "Next.js", "AI"]</span>
                          <span className="text-muted-foreground">,</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-muted-foreground/50 text-xs mt-1">4</span>
                        <div className="pl-4">
                          <span className="text-emerald-400">passion</span>
                          <span className="text-muted-foreground">:</span>{" "}
                          <span className="text-orange-300">"Building amazing things"</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-muted-foreground/50 text-xs mt-1">5</span>
                        <div>
                          <span className="text-muted-foreground">{`};`}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Tech Icons with Better Aesthetics */}
                  <div className="floating-element absolute bottom-24 left-10 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-blue-500/30 shadow-lg z-10 hover:scale-110 transition-transform">
                    <span className="text-2xl filter drop-shadow-lg">⚛️</span>
                  </div>
                  
                  <div className="floating-element absolute bottom-24 left-32 w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-600/30 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-emerald-500/30 shadow-lg z-10 hover:scale-110 transition-transform">
                    <span className="text-2xl filter drop-shadow-lg">🚀</span>
                  </div>
                  
                  <div className="floating-element absolute bottom-24 right-32 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-purple-500/30 shadow-lg z-10 hover:scale-110 transition-transform">
                    <span className="text-2xl filter drop-shadow-lg">💡</span>
                  </div>

                  <div className="floating-element absolute bottom-24 right-10 w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/30 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-orange-500/30 shadow-lg z-10 hover:scale-110 transition-transform">
                    <span className="text-2xl filter drop-shadow-lg">🎯</span>
                  </div>
                </div>

                {/* Enhanced Central Effects */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 left-1/3 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
                
                {/* Enhanced Decorative Grid */}
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                    backgroundSize: '48px 48px'
                  }}></div>
                </div>
              </div>

              {/* Enhanced Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-primary/30 to-blue-500/30 rounded-2xl blur-lg animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl blur-md animate-pulse delay-500"></div>
              <div className="absolute top-1/4 -left-4 w-6 h-6 bg-gradient-to-br from-emerald-500/30 to-teal-500/30 rounded-lg blur-sm animate-pulse delay-1000"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-primary/50 rounded-full flex justify-center backdrop-blur-sm bg-background/10 shadow-lg">
          <div className="w-1.5 h-4 bg-gradient-to-b from-primary to-blue-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
