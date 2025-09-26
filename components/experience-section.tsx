"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ExternalLink } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const experiences = [
  {
    title: "AI Software Optimization Engineer",
    company: "Outlier",
    location: "Remote",
    period: "May 2025 – Present",
    type: "Full-time",
    description: [
      "Reviewed and optimized AI-generated code in React, Node.js, Next.js, and MERN stack, reducing runtime errors by 35% across 70+ submissions weekly",
      "Refined prompts and test cases for JavaScript, TypeScript, and backend APIs, improving AI solution accuracy by 24% in real-world coding tasks",
      "Delivered optimized solutions across multiple languages and frameworks, boosting overall code quality and reducing client bug reports by 15%",
    ],
    technologies: ["React", "Node.js", "Next.js", "TypeScript", "JavaScript", "MERN Stack"],
  },
  {
    title: "Volunteer Web Development Tutor",
    company: "Varsity Tutors",
    location: "Remote",
    period: "May 2025 – June 2025",
    type: "Volunteer",
    description: [
      "Mentored 10+ students in JavaScript, React, and Node.js, with 80% building functional projects by program end",
      "Personalized code reviews improved student project performance scores by 20% on average",
      "Designed exercises and learning materials that led to 90% positive feedback ratings from learners",
    ],
    technologies: ["JavaScript", "React", "Node.js", "Teaching", "Mentoring"],
  },
]

const education = [
  {
    degree: "Bachelor of Computer Science",
    school: "Kennesaw State University",
    location: "Kennesaw, GA",
    period: "May 2025 – Present",
    minor: "Minor in Business",
    status: "In Progress",
  },
  {
    degree: "Bachelor of Computer Science",
    school: "Gujarat Technological University",
    location: "Surat, India",
    period: "Mar 2024 – Dec 2024",
    status: "Transferred",
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".experience-float", {
        rotationX: () => gsap.utils.random(-25, 25),
        rotationY: () => gsap.utils.random(-25, 25),
        z: () => gsap.utils.random(-200, 200),
      })

      gsap.to(".experience-float", {
        rotationX: "+=270",
        rotationY: "+=360",
        duration: 30,
        ease: "none",
        repeat: -1,
        stagger: 4,
      })

      gsap.fromTo(
        titleRef.current,
        {
          y: 150,
          rotationX: 75,
          opacity: 0,
          scale: 0.6,
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
        experienceRef.current?.children || [],
        {
          x: -120,
          rotationY: -35,
          opacity: 0,
          scale: 0.85,
        },
        {
          x: 0,
          rotationY: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: experienceRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        educationRef.current?.children || [],
        {
          x: 120,
          rotationY: 35,
          opacity: 0,
          scale: 0.85,
        },
        {
          x: 0,
          rotationY: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: educationRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.to(sectionRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      const allCards = sectionRef.current?.querySelectorAll(".glass-effect")
      if (allCards) {
        Array.from(allCards).forEach((card) => {
          const cardElement = card as HTMLElement

          cardElement.addEventListener("mouseenter", () => {
            gsap.to(cardElement, {
              rotationY: 8,
              rotationX: -4,
              z: 30,
              scale: 1.02,
              duration: 0.4,
              ease: "power2.out",
            })
          })

          cardElement.addEventListener("mouseleave", () => {
            gsap.to(cardElement, {
              rotationY: 0,
              rotationX: 0,
              z: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            })
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-6 bg-secondary/20 relative overflow-hidden">
      <div ref={backgroundRef} className="absolute inset-0 pointer-events-none">
        <div className="experience-float absolute top-24 left-12 w-32 h-32 bg-gradient-to-br from-indigo-500/8 to-purple-500/8 rounded-3xl blur-xl"></div>
        <div className="experience-float absolute top-48 right-16 w-40 h-40 bg-gradient-to-br from-emerald-500/8 to-teal-500/8 rounded-full blur-xl"></div>
        <div className="experience-float absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-br from-orange-500/8 to-red-500/8 rounded-2xl blur-xl"></div>
        <div className="experience-float absolute bottom-48 right-1/3 w-36 h-36 bg-gradient-to-br from-cyan-500/8 to-blue-500/8 rounded-full blur-xl"></div>
        <div className="experience-float absolute top-1/3 right-8 w-24 h-24 bg-gradient-to-br from-pink-500/8 to-rose-500/8 rounded-lg blur-xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6 transform-gpu">
            <span className="gradient-text">Experience</span> & Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            My professional journey in software engineering and continuous learning in computer science.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground">Professional Experience</h3>

            <div ref={experienceRef} className="space-y-8">
              {experiences.map((exp, index) => (
                <Card
                  key={index}
                  className="p-6 glass-effect border-border/50 hover:border-primary/20 transition-all duration-300 transform-gpu"
                >
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h4 className="text-xl font-semibold text-foreground">{exp.title}</h4>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        {exp.type}
                      </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </div>
                    </div>

                    <ul className="space-y-2 text-muted-foreground">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-2 text-xs">▪</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold text-foreground">Education</h3>

            <div ref={educationRef} className="space-y-8">
              {education.map((edu, index) => (
                <Card
                  key={index}
                  className="p-6 glass-effect border-border/50 hover:border-primary/20 transition-all duration-300 transform-gpu"
                >
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h4 className="text-xl font-semibold text-foreground">{edu.degree}</h4>
                        {edu.minor && <p className="text-primary font-medium">{edu.minor}</p>}
                        <p className="text-muted-foreground">{edu.school}</p>
                      </div>
                      <Badge variant={edu.status === "In Progress" ? "default" : "secondary"} className="w-fit">
                        {edu.status}
                      </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {edu.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {edu.location}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Contact Info Card */}
              <Card className="p-6 glass-effect border-border/50 transform-gpu">
                <h4 className="text-lg font-semibold text-foreground mb-4">Contact Information</h4>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">📧</span>
                    <a href="mailto:vedrakholia525@gmail.com" className="hover:text-primary transition-colors">
                      vedrakholia525@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">📱</span>
                    <a href="tel:470-213-8207" className="hover:text-primary transition-colors">
                      470-213-8207
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary">🔗</span>
                    <a
                      href="https://linkedin.com/in/ved-rakholia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors flex items-center gap-1"
                    >
                      LinkedIn Profile
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
