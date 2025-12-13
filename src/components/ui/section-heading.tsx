"use client"

import { ReactNode, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  linkHref?: string
  linkText?: string
  viewAllText?: string
  className?: string
}

export function SectionHeading({ 
  title, 
  linkHref, 
  linkText,
  viewAllText,
  className = "" 
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [])

  let finalLinkText = linkText
  try {
    const tCommon = useTranslations("common")
    if (!linkText && !viewAllText) {
      finalLinkText = tCommon("viewAll")
    } else if (viewAllText) {
      finalLinkText = viewAllText
    }
  } catch {
    // If translations not available (server component context), use provided text or default
    finalLinkText = linkText || viewAllText || "View All"
  }

  return (
    <div 
      ref={ref}
      className={cn(
        "flex items-center gap-4 mb-12 transition-all duration-700",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      {/* Left: Saffron pill with title */}
      <div className="relative flex-shrink-0">
        <div className="relative px-6 py-3 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-600 shadow-lg shadow-saffron-500/30 hover:shadow-saffron-500/40 transition-all duration-300 hover:scale-105">
          <h2 className="text-lg md:text-xl font-bold text-white tracking-wide whitespace-nowrap">
            {title}
          </h2>
          {/* Decorative glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-saffron-400/50 to-transparent blur-xl opacity-50" />
        </div>
      </div>

      {/* Middle: Horizontal line */}
      <div className="flex-1 h-0.5 bg-gradient-to-r from-saffron-300 via-saffron-200 to-transparent relative overflow-hidden">
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
      </div>

      {/* Right: Link or decorative element */}
      {linkHref ? (
        <Link
          href={linkHref}
          className="group flex items-center gap-2 text-saffron-600 hover:text-saffron-700 dark:text-saffron-400 dark:hover:text-saffron-300 font-semibold text-sm md:text-base transition-all duration-300 hover:gap-3 flex-shrink-0"
        >
          <span className="relative">
            {finalLinkText}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-saffron-600 group-hover:w-full transition-all duration-300" />
          </span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      ) : (
        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-saffron-500 shadow-lg shadow-saffron-500/50" />
      )}
    </div>
  )
}

