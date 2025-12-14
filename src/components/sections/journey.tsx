"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { SectionHeading } from "@/components/ui/section-heading"
import { Sparkles, Calendar } from "lucide-react"

interface JourneyMilestone {
  year: string
  key: string
  image: string
}

const journeyMilestones: JourneyMilestone[] = [
  { year: "1998", key: "milestone1", image: "/images/pic1.jpeg" },
  { year: "2002", key: "milestone2", image: "/images/pic2.jpeg" },
  { year: "2014", key: "milestone3", image: "/images/pic3.jpeg" },
  { year: "2016", key: "milestone4", image: "/images/banner-mla.jpeg" },
  { year: "2019", key: "milestone5", image: "/images/pic5.jpeg" },
  { year: "2023", key: "milestone6", image: "/images/pic6.jpeg" },
]

export function JourneySection() {
  const t = useTranslations("sections.journey")
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSelectYear = (index: number) => {
    if (index === activeIndex || isAnimating) return
    setIsAnimating(true)
    setActiveIndex(index)
  }

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 400)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  const activeMilestone = journeyMilestones[activeIndex]

  return (
    <section className="py-20 bg-gradient-to-br from-saffron-50 via-saffron-100/50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      <div className="container">
        <div className="mb-6 text-center">
          <SectionHeading title={t("label")} />
        </div>

        {/* ROADMAP TIMELINE - Years ABOVE the horizontal line */}
        <div className="relative max-w-5xl mx-auto mb-10 pt-8 pb-4">
          
          {/* Main Horizontal Line - at bottom */}
          <div className="absolute left-0 right-0 bottom-0 h-1 bg-saffron-200 dark:bg-slate-600 rounded-full" />
          
          {/* Progress Line - Filled portion */}
          <div 
            className="absolute left-0 bottom-0 h-1 bg-gradient-to-r from-[#FF7A59] to-[#FF9F7A] rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(255,122,89,0.5)]"
            style={{ width: `${(activeIndex / (journeyMilestones.length - 1)) * 100}%` }}
          />
          

          {/* Timeline Items - Years ABOVE the line */}
          <div className="relative flex justify-between items-end">
            {journeyMilestones.map((milestone, index) => {
              const isActive = index === activeIndex
              const isPast = index < activeIndex
              
              return (
                <button
                  key={milestone.year}
                  onClick={() => handleSelectYear(index)}
                  className="group relative flex flex-col items-center"
                >
                  {/* Year label - ABOVE */}
                  <div className="mb-2">
                    <div className={`px-3 py-1.5 rounded-lg transition-colors duration-500 ease-out ${
                      isActive 
                        ? 'bg-[#FF7A59] shadow-lg shadow-[#FF7A59]/30' 
                        : isPast
                          ? 'bg-white dark:bg-slate-800 shadow border-2 border-[#FF7A59]/30'
                          : 'bg-white dark:bg-slate-800 shadow border-2 border-transparent group-hover:border-[#FF7A59]/30'
                    }`}>
                      <span className={`text-sm font-bold transition-colors duration-500 ease-out ${
                        isActive 
                          ? 'text-white' 
                          : isPast 
                            ? 'text-[#FF7A59]'
                            : 'text-slate-500 dark:text-slate-400 group-hover:text-[#FF7A59]'
                      }`}>
                        {milestone.year}
                      </span>
                    </div>
                  </div>
                  
                  {/* Short vertical connector line going DOWN to the dot */}
                  <div className={`w-0.5 h-3 transition-colors duration-500 ease-out ${
                    isActive 
                      ? 'bg-[#FF7A59]' 
                      : isPast
                        ? 'bg-[#FF7A59]/50'
                        : 'bg-saffron-300 dark:bg-slate-500 group-hover:bg-[#FF7A59]/50'
                  }`} />
                  
                  {/* Connection dot on the horizontal line */}
                  <div className={`relative w-4 h-4 rounded-full transition-colors duration-500 ease-out border-4 border-white dark:border-slate-800 z-10 translate-y-1/2 ${
                    isActive 
                      ? 'bg-[#FF7A59] shadow-[0_0_15px_rgba(255,122,89,0.6)]' 
                      : isPast
                        ? 'bg-[#FF7A59]'
                        : 'bg-saffron-300 dark:bg-slate-500 group-hover:bg-[#FF7A59]/70'
                  }`}>
                    {/* Inner dot for active */}
                    <div className={`absolute inset-1 rounded-full transition-opacity duration-500 ease-out ${
                      isActive ? 'opacity-100 bg-white' : 'opacity-0'
                    }`} />
                  </div>
                </button>
              )
            })}
          </div>
          
        </div>

        {/* Main Content Card */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-6 lg:p-10 shadow-[0_20px_60px_-15px_rgba(255,122,89,0.25)] hover:shadow-[0_30px_80px_-15px_rgba(255,122,89,0.35)] transition-shadow duration-500 border border-saffron-100 dark:border-slate-700">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left - Image */}
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-r from-[#FF7A59] via-[#FF9F7A] to-[#FF7A59] rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700 animate-gradient-x" />
                
                <div className="absolute -top-3 -left-3 w-16 h-16 border-l-4 border-t-4 border-[#FF7A59] rounded-tl-xl opacity-80" />
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-4 border-b-4 border-[#FF7A59] rounded-br-xl opacity-80" />
                
                <div 
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-700 ease-out ${
                    isAnimating 
                      ? 'opacity-0 scale-[0.98]' 
                      : 'opacity-100 scale-100'
                  }`}
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(255, 122, 89, 0.25), 0 0 0 1px rgba(255, 122, 89, 0.1)'
                  }}
                >
                  <Image
                    src={activeMilestone.image}
                    alt={t(`milestones.${activeMilestone.key}.title`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A59]/20 via-transparent to-[#FF7A59]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50" />
                      <div className="relative px-5 py-2.5 bg-white rounded-full shadow-xl">
                        <span className="text-[#FF7A59] font-black text-xl">{activeMilestone.year}</span>
                      </div>
                    </div>
                    <Sparkles className="h-6 w-6 text-white drop-shadow-lg animate-pulse" />
                  </div>
                  
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#FF7A59] rounded-full shadow-lg">
                    <span className="text-white text-xs font-bold tracking-wider">
                      {String(activeIndex + 1).padStart(2, '0')} / {String(journeyMilestones.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div 
                className={`relative z-10 transition-all duration-700 ease-out delay-150 ${
                  isAnimating 
                    ? 'opacity-0 translate-y-2' 
                    : 'opacity-100 translate-y-0'
                }`}
              >
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-[#FF7A59]/10 to-[#FF7A59]/5 rounded-full border border-[#FF7A59]/20">
                  <Calendar className="h-4 w-4 text-[#FF7A59]" />
                  <span className="text-sm font-semibold text-[#FF7A59] tracking-wider uppercase">
                    Milestone {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-4 leading-tight">
                  {t(`milestones.${activeMilestone.key}.title`)}
                </h3>
                
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-1 w-12 bg-gradient-to-r from-[#FF7A59] to-[#FF9F7A] rounded-full" />
                  <div className="h-1 w-6 bg-[#FF7A59]/30 rounded-full" />
                  <div className="h-1 w-3 bg-[#FF7A59]/20 rounded-full" />
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {t(`milestones.${activeMilestone.key}.description`)}
                </p>

                <ul className="space-y-3">
                  {t.raw(`milestones.${activeMilestone.key}.highlights`).map((point: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 group/item p-2 -mx-2 rounded-lg hover:bg-[#FF7A59]/5 transition-colors"
                    >
                      <span className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-gradient-to-br from-[#FF7A59] to-[#FF9F7A] flex items-center justify-center shadow-sm group-hover/item:scale-110 transition-transform">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      </span>
                      <span className="text-slate-600 dark:text-slate-300 group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
