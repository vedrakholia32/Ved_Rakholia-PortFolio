"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Trophy, Star, Target } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const achievements = [
  {
    icon: Trophy,
    title: "AI Optimization Excellence",
    organization: "Outlier",
    description: "Reduced runtime errors by 35% across 70+ weekly submissions",
    year: "2025",
    category: "Professional Achievement",
  },
  {
    icon: Star,
    title: "Code Quality Improvement",
    organization: "Outlier",
    description: "Improved AI solution accuracy by 24% in real-world coding tasks",
    year: "2025",
    category: "Technical Excellence",
  },
  {
    icon: Target,
    title: "Student Success Rate",
    organization: "Varsity Tutors",
    description: "80% of mentored students built functional projects by program end",
    year: "2025",
    category: "Mentorship",
  },
  {
    icon: Award,
    title: "Top Educator Rating",
    organization: "Varsity Tutors",
    description: "Achieved 90% positive feedback ratings from learners",
    year: "2025",
    category: "Teaching Excellence",
  },
]

const certifications = [
  {
    name: "Full Stack Development",
    issuer: "Multiple Platforms",
    technologies: ["React", "Node.js", "Next.js", "TypeScript"],
  },
  {
    name: "AI & Machine Learning",
    issuer: "Professional Training",
    technologies: ["Python", "TensorFlow", "AI Optimization"],
  },
  {
    name: "Modern Web Technologies",
    issuer: "Industry Standard",
    technologies: ["GSAP", "Three.js", "WebGL"],
  },
]

export function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const achievementsRef = useRef<HTMLDivElement>(null)
  const certificationsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating background elements
      gsap.set(".awards-float", {
        rotationX: () => gsap.utils.random(-30, 30),
        rotationY: () => gsap.utils.random(-30, 30),
        z: () => gsap.utils.random(-200, 200),
      })

      gsap.to(".awards-float", {
        rotationX: "+=360",
        rotationY: "+=180",
        duration: 25,
        ease: "none",
        repeat: -1,
        stagger: 3,
      })

      // Title animation
      gsap.fromTo(
        titleRef.current,
        {
          y: 150,
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
        }
      )

      // Achievements animation
      gsap.fromTo(
        achievementsRef.current?.children || [],
        {
          y: 100,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: achievementsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Certifications animation
      gsap.fromTo(
        certificationsRef.current?.children || [],
        {
          x: -80,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: certificationsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="relative py-32 overflow-hidden perspective-1000"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95"></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="awards-float absolute top-20 left-[10%] w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl"></div>
        <div className="awards-float absolute top-40 right-[15%] w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="awards-float absolute bottom-40 left-[20%] w-36 h-36 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl"></div>
        <div className="awards-float absolute bottom-20 right-[10%] w-28 h-28 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Recognition
            </span>
            <br />
            <span className="text-foreground">& Achievements</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Excellence in code quality, optimization, and mentorship
          </p>
        </div>

        {/* Achievements Grid */}
        <div ref={achievementsRef} className="grid md:grid-cols-2 gap-6 mb-16">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {achievement.title}
                        </h3>
                        <Badge variant="secondary" className="shrink-0">
                          {achievement.year}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-primary/80 font-medium">
                        {achievement.organization}
                      </p>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {achievement.description}
                      </p>
                      
                      <Badge variant="outline" className="mt-2">
                        {achievement.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Certifications */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">
            Technical <span className="text-primary">Expertise</span>
          </h3>
          
          <div ref={certificationsRef} className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card/30 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-2">
                      {cert.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {cert.issuer}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {cert.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50">
            <div className="text-4xl font-black text-primary mb-2">35%</div>
            <div className="text-sm text-muted-foreground">Error Reduction</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50">
            <div className="text-4xl font-black text-primary mb-2">24%</div>
            <div className="text-sm text-muted-foreground">Accuracy Boost</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50">
            <div className="text-4xl font-black text-primary mb-2">80%</div>
            <div className="text-sm text-muted-foreground">Student Success</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50">
            <div className="text-4xl font-black text-primary mb-2">90%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
