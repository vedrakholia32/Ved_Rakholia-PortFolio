"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass-effect" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="text-lg sm:text-xl font-bold gradient-text">Ved Rakholia</div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-sm font-medium transition-colors hover:text-primary focus-enhanced p-2 rounded-lg ${
                  activeSection === item.href.substring(1) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <Button onClick={() => scrollToSection("#contact")} className="hidden md:flex bg-primary hover:bg-primary/90 focus-enhanced">
            Get In Touch
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden min-h-[44px] min-w-[44px] p-2 focus-enhanced"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/20 animate-slide-in-down">
            <div className="flex flex-col space-y-1 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-left text-base font-medium transition-colors hover:text-primary focus-enhanced p-3 rounded-lg min-h-[44px] ${
                    activeSection === item.href.substring(1) ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-secondary/20"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("#contact")}
                className="mt-4 w-full bg-primary hover:bg-primary/90 min-h-[44px] focus-enhanced"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
