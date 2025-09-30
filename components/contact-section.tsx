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
import emailjs from '@emailjs/browser'

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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contactInfoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  // Initialize EmailJS
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (publicKey) {
      emailjs.init(publicKey)
    }
  }, [])

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
    setSubmitStatus('idle')

    try {
      // Get EmailJS configuration from environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      // Debug logging (remove in production)
      console.log('EmailJS Config:', {
        serviceId: serviceId ? `${serviceId.substring(0, 10)}...` : 'missing',
        templateId: templateId ? `${templateId.substring(0, 10)}...` : 'missing',
        publicKey: publicKey ? `${publicKey.substring(0, 10)}...` : 'missing'
      })

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing. Please check your environment variables.')
      }

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'vedrakholia525@gmail.com',
        },
        publicKey
      )

      console.log('Email sent successfully:', result)
      setSubmitStatus('success')
      
      // Reset form on success
      setFormData({ name: "", email: "", subject: "", message: "" })
      
      // Show success message for 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
      
    } catch (error) {
      console.error('Email send failed:', error)
      
      // More detailed error handling
      let errorMessage = 'Failed to send message. Please try again or email me directly.'
      
      if (error instanceof Error) {
        if (error.message.includes('configuration is missing')) {
          errorMessage = 'Email configuration error. Please contact me directly.'
        } else if (error.message.includes('Invalid')) {
          errorMessage = 'Invalid email configuration. Please contact me directly.'
        }
      }
      
      setSubmitStatus('error')
      
      // Show error message for 8 seconds
      setTimeout(() => setSubmitStatus('idle'), 8000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" ref={sectionRef} className="py-16 sm:py-20 px-4 sm:px-6 bg-secondary/20 relative overflow-hidden">
      <div ref={backgroundRef} className="absolute inset-0 pointer-events-none hidden sm:block">
        <div className="contact-float absolute top-20 left-8 w-32 sm:w-44 h-32 sm:h-44 bg-gradient-to-br from-violet-500/6 to-purple-500/6 rounded-full blur-2xl"></div>
        <div className="contact-float absolute top-40 right-12 w-40 sm:w-52 h-40 sm:h-52 bg-gradient-to-br from-emerald-500/6 to-cyan-500/6 rounded-3xl blur-2xl"></div>
        <div className="contact-float absolute bottom-40 left-1/4 w-28 sm:w-36 h-28 sm:h-36 bg-gradient-to-br from-rose-500/6 to-pink-500/6 rounded-2xl blur-xl"></div>
        <div className="contact-float absolute bottom-24 right-1/4 w-36 sm:w-48 h-36 sm:h-48 bg-gradient-to-br from-blue-500/6 to-indigo-500/6 rounded-full blur-2xl"></div>
        <div className="contact-float absolute top-1/2 left-16 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-amber-500/6 to-orange-500/6 rounded-lg blur-xl"></div>
        <div className="contact-float absolute top-2/3 right-20 w-20 sm:w-28 h-20 sm:h-28 bg-gradient-to-br from-teal-500/6 to-green-500/6 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 transform-gpu px-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed px-4">
            I'm always interested in hearing about new opportunities, interesting projects, or just having a
            conversation about technology and development.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-6 sm:space-y-8 px-4 lg:px-0">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 sm:mb-6">Let's Connect</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 sm:mb-8">
                Whether you're looking to hire a developer, collaborate on a project, or just want to say hello, I'd
                love to hear from you. I typically respond within 24 hours.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <Card className="p-4 sm:p-6 glass-effect border-border/50 hover:border-primary/20 transition-colors transform-gpu">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">Email</h4>
                    <a
                      href="mailto:vedrakholia525@gmail.com"
                      className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                    >
                      vedrakholia525@gmail.com
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 glass-effect border-border/50 hover:border-primary/20 transition-colors transform-gpu">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">Phone</h4>
                    <a href="tel:470-213-8207" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                      470-213-8207
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6 glass-effect border-border/50 hover:border-primary/20 transition-colors transform-gpu">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">Location</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Kennesaw, GA</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Follow Me</h4>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="https://github.com/vedrakholia32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary/50 hover:bg-primary/10 rounded-lg transition-colors group transform-gpu min-h-[48px] min-w-[48px] flex items-center justify-center"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a
                  href="https://linkedin.com/in/ved-rakholia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary/50 hover:bg-primary/10 rounded-lg transition-colors group transform-gpu min-h-[48px] min-w-[48px] flex items-center justify-center"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a
                  href="mailto:vedrakholia525@gmail.com"
                  className="p-3 bg-secondary/50 hover:bg-primary/10 rounded-lg transition-colors group transform-gpu min-h-[48px] min-w-[48px] flex items-center justify-center"
                  aria-label="Email Contact"
                >
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="transform-gpu px-4 lg:px-0">
            <Card className="p-6 sm:p-8 glass-effect border-border/50">
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 sm:mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-background/50 border-border focus:border-primary min-h-[44px] text-sm sm:text-base"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-background/50 border-border focus:border-primary min-h-[44px] text-sm sm:text-base"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-background/50 border-border focus:border-primary min-h-[44px] text-sm sm:text-base"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-background/50 border-border focus:border-primary resize-none text-sm sm:text-base min-h-[120px]"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 min-h-[48px] text-sm sm:text-base"
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

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-3 sm:p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-3 sm:p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                    ❌ Failed to send message. Please try again or email me directly.
                  </div>
                )}
              </form>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div ref={footerRef} className="text-center mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border/50 transform-gpu px-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © 2025 Ved Rakholia. Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </section>
  )
}
