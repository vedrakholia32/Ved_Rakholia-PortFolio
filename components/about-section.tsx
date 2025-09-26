"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const skills = [
  { category: "Languages", items: ["Python", "JavaScript", "TypeScript", "C/C++"] },
  { category: "Frameworks", items: ["React", "Next.js", "Node.js", "Express"] },
  { category: "Databases", items: ["MongoDB", "Convex"] },
  { category: "Tools", items: ["Git", "VS Code", "Vercel", "Webhooks"] },
  { category: "AI Tools", items: ["V0", "Cursor", "GitHub Copilot", "ChatGPT"] },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating background elements
      gsap.set(".floating-element", {
        rotationX: () => gsap.utils.random(-15, 15),
        rotationY: () => gsap.utils.random(-15, 15),
        z: () => gsap.utils.random(-100, 100),
      })

      gsap.to(".floating-element", {
        rotationX: "+=360",
        rotationY: "+=180",
        duration: 20,
        ease: "none",
        repeat: -1,
        stagger: 2,
      })

      gsap.fromTo(
        titleRef.current,
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
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        subtitleRef.current,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        cardRef.current,
        {
          x: -100,
          rotationY: -25,
          opacity: 0,
        },
        {
          x: 0,
          rotationY: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        skillsRef.current?.children || [],
        {
          x: 100,
          rotationY: 25,
          opacity: 0,
          scale: 0.9,
        },
        {
          x: 0,
          rotationY: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        statsRef.current?.children || [],
        {
          y: 50,
          rotationX: 45,
          opacity: 0,
        },
        {
          y: 0,
          rotationX: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Continuous parallax scroll effects
      gsap.to(sectionRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-full blur-xl"></div>
        <div className="floating-element absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg blur-xl"></div>
        <div className="floating-element absolute bottom-40 left-1/4 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl"></div>
        <div className="floating-element absolute bottom-20 right-1/3 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg blur-xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6 transform-gpu">
            About <span className="gradient-text">Me</span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed transform-gpu"
          >
            I'm a passionate software engineer currently pursuing my Bachelor's in Computer Science at Kennesaw State
            University. I specialize in building innovative web applications and optimizing AI-generated code to create
            exceptional user experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Personal Story */}
          <div className="space-y-6">
            <Card ref={cardRef} className="p-8 glass-effect border-border/50 transform-gpu">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">My Journey</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Currently working as an <strong className="text-foreground">AI Software Optimization Engineer</strong>{" "}
                  at Outlier, where I review and optimize AI-generated code across React, Node.js, Next.js, and MERN
                  stack applications. I've successfully reduced runtime errors by 35% across 70+ submissions weekly.
                </p>
                <p>
                  My passion lies at the intersection of design and development, creating experiences that not only look
                  great but are meticulously built for performance and usability. I believe in writing clean,
                  maintainable code that scales with business needs.
                </p>
                <p>
                  When I'm not coding, I enjoy mentoring other developers, contributing to open-source projects, and
                  staying up-to-date with the latest technologies in web development and AI.
                </p>
              </div>
            </Card>
          </div>

          {/* Skills Grid */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Technical Skills</h3>
            <div ref={skillsRef} className="grid gap-4">
              {skills.map((skillGroup, index) => (
                <Card
                  key={skillGroup.category}
                  className="p-6 glass-effect border-border/50 hover:border-primary/20 transition-colors transform-gpu"
                >
                  <h4 className="font-semibold text-primary mb-3">{skillGroup.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">35%</div>
            <div className="text-sm text-muted-foreground">Runtime Error Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">70+</div>
            <div className="text-sm text-muted-foreground">Weekly Code Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">10+</div>
            <div className="text-sm text-muted-foreground">Students Mentored</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">3+</div>
            <div className="text-sm text-muted-foreground">Major Projects</div>
          </div>
        </div>
      </div>
    </section>
  )
}
