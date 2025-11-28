"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface Slide {
  id: string
  imageUrl: string
  title?: string
  subtitle?: string
  quote?: string
}

interface HeroSliderProps {
  slides: Slide[]
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (slides.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  if (slides.length === 0) {
    return (
      <div className="relative h-[600px] w-full bg-gradient-to-r from-saffron-500 to-saffron-700 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            A Journey from Booth Karyakarta to MLA
          </h1>
          <p className="text-xl md:text-2xl">Dedicated to serving the people</p>
        </div>
      </div>
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }


  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex"
        >
          {/* Image Section - Adaptive Width */}
          <div className="relative w-full md:w-2/3 h-full overflow-hidden">
            <Image
              src={slides[currentIndex].imageUrl}
              alt={slides[currentIndex].title || "Hero slide"}
              fill
              className="object-cover object-left"
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
              quality={90}
            />
          </div>

          {/* Quote Section - Right Side with Enhanced Saffron Background */}
          <div className="hidden md:flex relative w-1/3 h-full bg-gradient-to-br from-saffron-300 via-saffron-200 to-saffron-100 items-center justify-center p-8 md:p-12 lg:p-16">
            <div className="text-center max-w-xl w-full">
              {slides[currentIndex].quote ? (
                <blockquote className="relative">
                  <div className="absolute -top-4 -left-4 text-saffron-600 text-6xl md:text-7xl lg:text-8xl font-serif leading-none opacity-20">
                    "
                  </div>
                  <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-800 leading-tight mb-4 relative z-10">
                    {slides[currentIndex].quote}
                  </p>
                  <div className="absolute -bottom-4 -right-4 text-saffron-600 text-6xl md:text-7xl lg:text-8xl font-serif leading-none opacity-20">
                    "
                  </div>
                  <div className="mt-6 pt-6 border-t-2 border-saffron-400/30">
                    <p className="text-sm md:text-base text-saffron-700 font-medium tracking-wider uppercase">
                      — Manish Rawat
                    </p>
                  </div>
                </blockquote>
              ) : slides[currentIndex].subtitle ? (
                <div className="relative">
                  <div className="absolute -top-4 -left-4 text-saffron-600 text-6xl md:text-7xl lg:text-8xl font-serif leading-none opacity-20">
                    "
                  </div>
                  <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-800 leading-tight mb-4 relative z-10">
                    {slides[currentIndex].subtitle}
                  </p>
                  <div className="absolute -bottom-4 -right-4 text-saffron-600 text-6xl md:text-7xl lg:text-8xl font-serif leading-none opacity-20">
                    "
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute -top-4 -left-4 text-saffron-600 text-6xl md:text-7xl lg:text-8xl font-serif leading-none opacity-20">
                    "
                  </div>
                  <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-800 leading-tight mb-4 relative z-10">
                    Dedicated to serving the people
                  </p>
                  <div className="absolute -bottom-4 -right-4 text-saffron-600 text-6xl md:text-7xl lg:text-8xl font-serif leading-none opacity-20">
                    "
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile: Show quote below image */}
          <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-br from-saffron-300 via-saffron-200 to-saffron-100 p-6">
            <div className="text-center">
              {slides[currentIndex].quote ? (
                <blockquote className="relative">
                  <div className="absolute -top-2 -left-2 text-saffron-600 text-4xl font-serif leading-none opacity-20">
                    "
                  </div>
                  <p className="text-lg md:text-xl font-bold text-slate-800 leading-tight relative z-10">
                    {slides[currentIndex].quote}
                  </p>
                  <div className="absolute -bottom-2 -right-2 text-saffron-600 text-4xl font-serif leading-none opacity-20">
                    "
                  </div>
                </blockquote>
              ) : slides[currentIndex].subtitle ? (
                <div className="relative">
                  <div className="absolute -top-2 -left-2 text-saffron-600 text-4xl font-serif leading-none opacity-20">
                    "
                  </div>
                  <p className="text-lg md:text-xl font-bold text-slate-800 leading-tight relative z-10">
                    {slides[currentIndex].subtitle}
                  </p>
                  <div className="absolute -bottom-2 -right-2 text-saffron-600 text-4xl font-serif leading-none opacity-20">
                    "
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute -top-2 -left-2 text-saffron-600 text-4xl font-serif leading-none opacity-20">
                    "
                  </div>
                  <p className="text-lg md:text-xl font-bold text-slate-800 leading-tight relative z-10">
                    Dedicated to serving the people
                  </p>
                  <div className="absolute -bottom-2 -right-2 text-saffron-600 text-4xl font-serif leading-none opacity-20">
                    "
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-saffron-600"
                  : "w-2 bg-white/70 hover:bg-white/90"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

