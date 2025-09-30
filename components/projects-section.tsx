"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, TrendingUp, Download } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const projects = [
  {
    title: "CodeNest",
    subtitle: "Browser-based Code Editor SaaS",
    period: "Sep 2025 – Present",
    description:
      "Built a browser-based code editor SaaS that attracted 10+ early users in the first month, increasing collaboration among developers. Added multi-file support and subscription management via LemonSqueezy, enabling 20% of users to upgrade to paid plans.",
    achievements: [
      "10+ early users in first month",
      "20% conversion to paid plans",
      "Real-time collaboration (in progress)",
      "30% reduction in debugging time",
    ],
    technologies: ["Next.js", "TypeScript", "Convex", "LemonSqueezy"],
    links: {
      live: "https://www.code-nest.app",
      github: "https://github.com/vedrakholia32/Code-Nest",
    },
    image: "/modern-code-editor-interface-with-dark-theme.jpg",
    featured: true,
  },
  {
    title: "ErrorSense",
    subtitle: "VS Code Extension & Web App",
    period: "Aug 2025",
    description:
      "Developed a VS Code extension and web app that reduced debugging time for beginners by 40%, helping them understand errors quickly. Integrated OpenAI API for contextual explanations.",
    achievements: [
      "40% reduction in debugging time",
      "40+ downloads in first two weeks",
      "25% increase in daily active usage",
      "OpenAI API integration",
    ],
    technologies: ["Next.js", "TypeScript", "OpenAI API", "VS Code API"],
    links: {
      live: "https://marketplace.visualstudio.com/items?itemName=VedRakholia.vedrakholia",
      github: "https://github.com/vedrakholia32/Code_sense_",
    },
    image: "/vs-code-extension-interface-showing-error-explanat.jpg",
    featured: true,
  },
  {
    title: "Authentication Dashboard",
    subtitle: "Secure Auth System",
    period: "Dec 2025",
    description:
      "Built a secure authentication system that handled 20+ test accounts with 0 login failures during QA. Added email verification for password reset, improving account recovery success rate by 95%.",
    achievements: [
      "20+ test accounts, 0 failures",
      "95% account recovery success rate",
      "2x faster mobile sign-in speed",
      "Responsive React UI",
    ],
    technologies: ["Express.js", "React", "Node.js", "MongoDB", "JWT"],
    links: {
      live: "https://www.advanced-auth.in/",
      github: "https://github.com/vedrakholia32/Advanced-Auth-V2",
    },
    image: "/modern-authentication-dashboard-with-login-forms.jpg",
    featured: false,
  },
]

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating background elements with 3D rotation
      gsap.set(".project-float", {
        rotationX: () => gsap.utils.random(-20, 20),
        rotationY: () => gsap.utils.random(-20, 20),
        z: () => gsap.utils.random(-150, 150),
      })

      gsap.to(".project-float", {
        rotationX: "+=180",
        rotationY: "+=360",
        duration: 25,
        ease: "none",
        repeat: -1,
        stagger: 3,
      })

      gsap.fromTo(
        titleRef.current,
        {
          y: 120,
          rotationX: 60,
          opacity: 0,
          scale: 0.7,
        },
        {
          y: 0,
          rotationX: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        featuredRef.current,
        {
          x: -150,
          rotationY: -30,
          opacity: 0,
          scale: 0.9,
        },
        {
          x: 0,
          rotationY: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        gridRef.current?.children || [],
        {
          y: 100,
          rotationX: 45,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          rotationX: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        ctaRef.current,
        {
          y: 80,
          rotationX: 30,
          opacity: 0,
        },
        {
          y: 0,
          rotationX: 0,
          opacity: 1,
          duration: 0.8,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Section-wide parallax movement
      gsap.to(sectionRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // Interactive hover effects for project cards
      const projectCards = gridRef.current?.children
      if (projectCards) {
        Array.from(projectCards).forEach((card) => {
          const cardElement = card as HTMLElement

          cardElement.addEventListener("mouseenter", () => {
            gsap.to(cardElement, {
              rotationY: 5,
              rotationX: -5,
              z: 50,
              duration: 0.3,
              ease: "power2.out",
            })
          })

          cardElement.addEventListener("mouseleave", () => {
            gsap.to(cardElement, {
              rotationY: 0,
              rotationX: 0,
              z: 0,
              duration: 0.3,
              ease: "power2.out",
            })
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
        <section id="projects" ref={sectionRef} className="py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      <div ref={backgroundRef} className="absolute inset-0 pointer-events-none hidden sm:block">
        <div className="project-float absolute top-20 left-8 w-20 sm:w-28 h-20 sm:h-28 bg-gradient-to-br from-violet-500/8 to-indigo-500/8 rounded-2xl blur-xl"></div>
        <div className="project-float absolute top-48 right-12 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-emerald-500/8 to-cyan-500/8 rounded-full blur-xl"></div>
        <div className="project-float absolute bottom-40 left-1/4 w-18 sm:w-24 h-18 sm:h-24 bg-gradient-to-br from-pink-500/8 to-purple-500/8 rounded-lg blur-xl"></div>
        <div className="project-float absolute bottom-20 right-1/4 w-22 sm:w-30 h-22 sm:h-30 bg-gradient-to-br from-orange-500/8 to-yellow-500/8 rounded-xl blur-xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 transform-gpu px-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed px-4">
            A showcase of my recent work in web development, from SaaS applications to developer tools and
            authentication systems.
          </p>
        </div>

        {/* Featured Project Display */}
        <div className="mb-12 sm:mb-16">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center px-4 lg:px-0">
            <div ref={featuredRef} className="transform-gpu order-2 lg:order-1">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={projects[selectedProject].image || "/placeholder.svg"}
                  alt={projects[selectedProject].title}
                  className="w-full h-48 sm:h-64 lg:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {projects[selectedProject].period}
                  </Badge>
                  {projects[selectedProject].featured && (
                    <Badge className="text-xs bg-gradient-to-r from-blue-500 to-emerald-500">Featured</Badge>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 leading-tight">{projects[selectedProject].title}</h3>
                <p className="text-base sm:text-lg text-primary font-medium mb-3 sm:mb-4">{projects[selectedProject].subtitle}</p>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{projects[selectedProject].description}</p>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-sm sm:text-base">Key Achievements</h4>
                <div className="grid grid-cols-1 gap-2">
                  {projects[selectedProject].achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500 flex-shrink-0" />
                      <span className="leading-tight">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-sm sm:text-base">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {projects[selectedProject].technologies.map((tech) => (
                    <span key={tech} className="px-2 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium min-h-[28px] flex items-center">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="bg-primary hover:bg-primary/90 min-h-[44px] text-sm sm:text-base">
                  <a href={projects[selectedProject].links.live} target="_blank" rel="noopener noreferrer">
                    View Live Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild className="border-border hover:bg-secondary bg-transparent min-h-[44px] text-sm sm:text-base">
                  <a href={projects[selectedProject].links.github} target="_blank" rel="noopener noreferrer">
                    View Code
                    <Github className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Navigation */}
        <div className="flex justify-center mb-8 sm:mb-12 px-4">
          <div className="flex flex-wrap gap-2 p-2 bg-secondary/20 rounded-lg w-full sm:w-auto justify-center">
            {projects.map((project, index) => (
              <button
                key={index}
                onClick={() => setSelectedProject(index)}
                className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 min-h-[40px] flex items-center ${
                  selectedProject === index
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {project.title}
              </button>
            ))}
          </div>
        </div>

        {/* All Projects Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 lg:px-0">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden glass-effect border-border/50 hover:border-primary/20 transition-all duration-300 cursor-pointer transform-gpu"
              onClick={() => setSelectedProject(index)}
            >
              <div className="relative">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
                <div className="absolute top-3 right-3">
                  {project.featured && (
                    <Badge className="text-xs bg-gradient-to-r from-blue-500 to-emerald-500">Featured</Badge>
                  )}
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{project.subtitle}</p>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-secondary/50 text-secondary-foreground rounded text-xs min-h-[24px] flex items-center">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-secondary/50 text-secondary-foreground rounded text-xs min-h-[24px] flex items-center">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div ref={ctaRef} className="text-center mt-12 sm:mt-16 transform-gpu px-4">
          <Card className="p-6 sm:p-8 glass-effect border-border/50 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4 leading-tight">Interested in working together?</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about
              technology and development.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-primary hover:bg-primary/90 min-h-[44px] text-sm sm:text-base"
              >
                Get In Touch
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
