"use client"

import Image from "next/image"
import { useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { SectionHeading } from "@/components/ui/section-heading"

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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleSelectYear = (index: number) => {
    setActiveIndex(index)
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    })
  }

  return (
    <section className="py-16 bg-gradient-to-br from-saffron-50 via-saffron-100/50 to-white dark:bg-slate-950">
      <div className="container">
        <div className="mb-8">
          <SectionHeading title={t("label")} />
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {journeyMilestones.map((milestone, index) => (
            <button
              key={milestone.year}
              type="button"
              onClick={() => handleSelectYear(index)}
              className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                activeIndex === index
                  ? "bg-[#FF7A59] border-[#FF7A59] text-white shadow-lg shadow-[#FF7A59]/40"
                  : "border-slate-200 text-slate-600 hover:border-[#FF7A59]/50 hover:text-[#FF7A59]"
              }`}
            >
              {milestone.year}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6 snap-x snap-mandatory">
              {journeyMilestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  ref={(el) => {
                    cardRefs.current[index] = el
                  }}
                  className="snap-center min-w-[280px] sm:min-w-[340px] lg:min-w-[420px] flex-shrink-0"
                >
                  <div className="h-full rounded-3xl border-2 border-solid border-saffron-300 dark:border-saffron-700 bg-white dark:bg-slate-900 overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.12)] transition-all duration-500 hover:-translate-y-1 hover:border-saffron-400 dark:hover:border-saffron-600 hover:shadow-[0_25px_70px_rgba(255,122,89,0.25)] hover:ring-4 hover:ring-saffron-200/50 dark:hover:ring-saffron-800/50">
                    <div className="relative h-64 md:h-80 w-full overflow-hidden group">
                      <Image
                        src={milestone.image}
                        alt={t(`milestones.${milestone.key}.title`)}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 280px, (max-width: 1024px) 340px, 420px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 group-hover:via-black/10 transition-all duration-500" />
                      <div className="absolute inset-0 bg-saffron-200/0 group-hover:bg-saffron-200/10 dark:group-hover:bg-saffron-800/10 transition-all duration-500" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl font-black text-[#FF7A59]">{milestone.year}</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-[#FF7A59] to-transparent" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        {t(`milestones.${milestone.key}.title`)}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                        {t(`milestones.${milestone.key}.description`)}
                      </p>
                      <ul className="space-y-2">
                        {t.raw(`milestones.${milestone.key}.highlights`).map((point: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                          >
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FF7A59]" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


