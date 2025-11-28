"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Award, MapPin, Calendar } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function MLAProfile() {
  const t = useTranslations("profile")
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-br from-saffron-50 via-saffron-100/50 to-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            {/* Rotating Saffron Border */}
            {isVisible && (
              <div className="absolute -inset-1 rounded-lg overflow-hidden pointer-events-none z-0">
                <div 
                  className="absolute inset-0 animate-spin-slow"
                  style={{
                    background: 'conic-gradient(from 0deg, #FF7A59, #FF7A59 90deg, transparent 90deg, transparent 360deg)',
                  }}
                />
                <div className="absolute inset-[3px] bg-white dark:bg-slate-900 rounded-lg" />
              </div>
            )}
            
            <Card className="relative border-2 border-saffron-300 dark:border-saffron-700 shadow-2xl shadow-saffron-200/50 dark:shadow-saffron-800/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-saffron-200/70 dark:hover:shadow-saffron-800/70 z-10">
              <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.15)]">
                  <Image
                    src="/images/pic1.jpeg"
                    alt={t("name")}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 280px, 360px"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                    {t("heading")}
                  </p>
                  <h2 className="text-3xl font-bold">{t("name")}</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>{t("constituency")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5" />
                      <span>{t("service")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>{t("elected")}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{t("description")}</p>
                </div>
              </div>
            </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

