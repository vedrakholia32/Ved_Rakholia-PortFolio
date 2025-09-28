import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Ved Rakholia - Software Engineer",
  description:
    "Full-stack developer passionate about creating innovative web experiences and AI-powered solutions. Currently optimizing AI-generated code at Outlier.",
  keywords: [
    "Ved Rakholia",
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "AI Optimization",
    "SaaS",
  ],
  authors: [{ name: "Ved Rakholia", url: "https://linkedin.com/in/ved-rakholia" }],
  creator: "Ved Rakholia",
  openGraph: {
    title: "Ved Rakholia - Software Engineer",
    description: "Full-stack developer passionate about creating innovative web experiences and AI-powered solutions.",
    type: "website",
    locale: "en_US",
    siteName: "Ved Rakholia Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ved Rakholia - Software Engineer",
    description: "Full-stack developer passionate about creating innovative web experiences and AI-powered solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#020617",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="bg-background text-foreground font-sans">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  )
}
