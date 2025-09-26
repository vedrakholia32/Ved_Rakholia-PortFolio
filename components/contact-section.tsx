"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Phone, MapPin, Send } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contactInfoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".contact-float", {
        rotationX: () => gsap.utils.random(-30, 30),
        rotationY: () => gsap.utils.random(-30, 30),
        rotationZ: () => gsap.utils.random(-15, 15),
        z: () => gsap.utils.random(-250, 250),
      })

      gsap.to(".contact-float", {
        rotationX: "+=360",
        rotationY: "+=180",
        rotationZ: "+=90",
        duration: 35,
        ease: "none",
        repeat: -1,
        stagger: 5,
      })

      gsap.fromTo(
        titleRef.current,
        {
          y: 200,
          rotationX: 90,
          opacity: 0,
          scale: 0.5,
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
        contactInfoRef.current?.children || [],
        {
          x: -150,
          rotationY: -45,
          opacity: 0,
          scale: 0.8,
        },
        {
          x: 0,
          rotationY: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        formRef.current,
        {
          x: 150,
          rotationY: 45,
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
            trigger: formRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        footerRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.to(sectionRef.current, {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      const formFields = formRef.current?.querySelectorAll("input, textarea")
      if (formFields) {
        Array.from(formFields).forEach((field) => {
          const fieldElement = field as HTMLElement

          fieldElement.addEventListener("focus", () => {
            gsap.to(fieldElement, {
              scale: 1.02,
              rotationX: -2,
              duration: 0.3,
              ease: "power2.out",
            })
          })

          fieldElement.addEventListener("blur", () => {
            gsap.to(fieldElement, {
              scale: 1,
              rotationX: 0,
              duration: 0.3,
              ease: "power2.out",
            })
          })
        })
      }

      const socialLinks = contactInfoRef.current?.querySelectorAll("a")
      if (socialLinks) {
        Array.from(socialLinks).forEach((link) => {
          const linkElement = link as HTMLElement

          linkElement.addEventListener("mouseenter", () => {
            gsap.to(linkElement, {
              rotationY: 15,
              rotationX: -10,
              z: 20,
              scale: 1.1,
              duration: 0.3,
              ease: "power2.out",
            })
          })

          linkElement.addEventListener("mouseleave", () => {
            gsap.to(linkElement, {
              rotationY: 0,
              rotationX: 0,
              z: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            })
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)

    // In a real app, you'd send this to your backend
    alert("Thank you for your message! I'll get back to you soon.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-6 bg-secondary/20 relative overflow-hidden">
      <div ref={backgroundRef} className="absolute inset-0 pointer-events-none">
        <div className="contact-float absolute top-20 left-8 w-44 h-44 bg-gradient-to-br from-violet-500/6 to-purple-500/6 rounded-full blur-2xl"></div>
        <div className="contact-float absolute top-40 right-12 w-52 h-52 bg-gradient-to-br from-emerald-500/6 to-cyan-500/6 rounded-3xl blur-2xl"></div>
        <div className="contact-float absolute bottom-40 left-1/4 w-36 h-36 bg-gradient-to-br from-rose-500/6 to-pink-500/6 rounded-2xl blur-xl"></div>
        <div className="contact-float absolute bottom-24 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-500/6 to-indigo-500/6 rounded-full blur-2xl"></div>
        <div className="contact-float absolute top-1/2 left-16 w-32 h-32 bg-gradient-to-br from-amber-500/6 to-orange-500/6 rounded-lg blur-xl"></div>
        <div className="contact-float absolute top-2/3 right-20 w-28 h-28 bg-gradient-to-br from-teal-500/6 to-green-500/6 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6 transform-gpu">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            I'm always interested in hearing about new opportunities, interesting projects, or just having a
            conversation about technology and development.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Let's Connect</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you're looking to hire a developer, collaborate on a project, or just want to say hello, I'd
                love to hear from you. I typically respond within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="p-6 glass-effect border-border/50 hover:border-primary/20 transition-colors transform-gpu">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <a
                      href="mailto:vedrakholia525@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      vedrakholia525@gmail.com
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 glass-effect border-border/50 hover:border-primary/20 transition-colors transform-gpu">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Phone</h4>
                    <a href="tel:470-213-8207" className="text-muted-foreground hover:text-primary transition-colors">
                      470-213-8207
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 glass-effect border-border/50 hover:border-primary/20 transition-colors transform-gpu">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Location</h4>
                    <p className="text-muted-foreground">Kennesaw, GA</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow Me</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/vedrakholia32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary/50 hover:bg-primary/10 rounded-lg transition-colors group transform-gpu"
                >
                  <Github className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a
                  href="https://linkedin.com/in/ved-rakholia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary/50 hover:bg-primary/10 rounded-lg transition-colors group transform-gpu"
                >
                  <Linkedin className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a
                  href="mailto:vedrakholia525@gmail.com"
                  className="p-3 bg-secondary/50 hover:bg-primary/10 rounded-lg transition-colors group transform-gpu"
                >
                  <Mail className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="transform-gpu">
            <Card className="p-8 glass-effect border-border/50">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-background/50 border-border focus:border-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-background/50 border-border focus:border-primary"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-background/50 border-border focus:border-primary"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-background/50 border-border focus:border-primary resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div ref={footerRef} className="text-center mt-16 pt-8 border-t border-border/50 transform-gpu">
          <p className="text-muted-foreground">
            © 2025 Ved Rakholia. Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </section>
  )
}
