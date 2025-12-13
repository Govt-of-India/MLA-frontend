"use client"

import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react"
import { cn } from "@/lib/utils"

type AnimationType = "fade-up" | "fade-in" | "scale-in" | "slide-left" | "slide-right"

// Animation styles based on type
const getAnimationStyles = (animation: AnimationType, isInView: boolean): CSSProperties => {
  const baseTransition = "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)"
  
  if (isInView) {
    return {
      opacity: 1,
      transform: "translate3d(0, 0, 0) scale(1)",
      transition: baseTransition,
    }
  }

  switch (animation) {
    case "fade-up":
      return {
        opacity: 0,
        transform: "translate3d(0, 30px, 0)",
        transition: baseTransition,
      }
    case "fade-in":
      return {
        opacity: 0,
        transform: "translate3d(0, 0, 0)",
        transition: baseTransition,
      }
    case "scale-in":
      return {
        opacity: 0,
        transform: "scale(0.95)",
        transition: baseTransition,
      }
    case "slide-left":
      return {
        opacity: 0,
        transform: "translate3d(-30px, 0, 0)",
        transition: baseTransition,
      }
    case "slide-right":
      return {
        opacity: 0,
        transform: "translate3d(30px, 0, 0)",
        transition: baseTransition,
      }
    default:
      return {
        opacity: 0,
        transform: "translate3d(0, 30px, 0)",
        transition: baseTransition,
      }
  }
}

interface AnimatedSectionProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  threshold?: number
  className?: string
  as?: "div" | "section" | "article" | "aside"
}

export function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  threshold = 0.1,
  className = "",
  as: Component = "div",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsInView(true)
          }, delay * 100)
          observer.unobserve(element)
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, delay])

  const animationStyles = getAnimationStyles(animation, isInView)

  return (
    <Component
      ref={ref as any}
      className={className}
      style={animationStyles}
    >
      {children}
    </Component>
  )
}

// Client wrapper for animating grid items with stagger
interface AnimatedGridProps {
  children: ReactNode
  animation?: AnimationType
  staggerDelay?: number
  threshold?: number
  className?: string
  itemClassName?: string
}

export function AnimatedGrid({
  children,
  animation = "fade-up",
  staggerDelay = 100,
  className = "",
  itemClassName = "",
}: AnimatedGridProps) {
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
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [])

  // Convert children to array
  const childArray = Array.isArray(children) ? children : [children]

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, index) => {
        const styles = getAnimationStyles(animation, isInView)
        styles.transitionDelay = isInView ? `${index * staggerDelay}ms` : "0ms"
        
        return (
          <div
            key={index}
            className={itemClassName}
            style={styles}
          >
            {child}
          </div>
        )
      })}
    </div>
  )
}
