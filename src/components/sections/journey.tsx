"use client"

import Image from "next/image"
import { useRef, useState } from "react"

interface JourneyMilestone {
  year: string
  title: string
  description: string
  highlights: string[]
  image: string
}

const journeyMilestones: JourneyMilestone[] = [
  {
    year: "1998",
    title: "Grassroots Leader",
    description: "Started at the polling booth level, organizing karyakartas and voter outreach.",
    highlights: [
      "Built strong connect with local communities",
      "Led award-winning voter awareness drives",
    ],
    image: "/images/pic1.jpeg",
  },
  {
    year: "2002",
    title: "Minister, Gujarat",
    description: "Served eight impactful years in the Gujarat cabinet, driving governance reforms.",
    highlights: ["Modernized policing infrastructure", "Accelerated cooperative institutions"],
    image: "/images/pic2.jpeg",
  },
  {
    year: "2014",
    title: "National President, BJP",
    description: "Reimagined the party’s organization, expanding it into the world’s largest.",
    highlights: ["Championed booth empowerment model", "Crafted invincible election machine"],
    image: "/images/pic3.jpeg",
  },
  {
    year: "2016",
    title: "Sports Visionary",
    description: "Elevated cricket and chess in Gujarat with professional infrastructure.",
    highlights: ["World-class academy pipeline", "Mentored next-gen sports administrators"],
    image: "/images/banner-mla.jpeg",
  },
  {
    year: "2019",
    title: "Union Home Minister",
    description: "Led nationally significant decisions with a people-first mindset.",
    highlights: ["Strengthened internal security grid", "Brought cooperative ethos to the centre"],
    image: "/images/pic5.jpeg",
  },
  {
    year: "2023",
    title: "Nation Builder",
    description: "Focused on empowerment, cooperative growth, and cultural renaissance.",
    highlights: ["Driving mega cooperative reforms", "Championing Indian ethos globally"],
    image: "/images/pic6.jpeg",
  },
]

export function JourneySection() {
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#FF7A59] mb-2">Journey</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Milestones of Determination
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
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
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF7A59]/40 to-transparent pointer-events-none" />
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 snap-x snap-mandatory">
              {journeyMilestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  ref={(el) => {
                    cardRefs.current[index] = el
                  }}
                  className="snap-center min-w-[280px] sm:min-w-[340px] lg:min-w-[420px] flex-shrink-0"
                >
                  <div className="h-full rounded-3xl border-2 border-saffron-200 dark:border-saffron-800 bg-white dark:bg-slate-900 overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.12)] transition-all duration-500 hover:-translate-y-1 hover:border-saffron-400 dark:hover:border-saffron-600 hover:shadow-[0_25px_70px_rgba(255,122,89,0.25)]">
                    <div className="relative h-64 md:h-80 w-full">
                      <Image
                        src={milestone.image}
                        alt={milestone.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 280px, (max-width: 1024px) 340px, 420px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl font-black text-[#FF7A59]">{milestone.year}</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-[#FF7A59] to-transparent" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                        {milestone.description}
                      </p>
                      <ul className="space-y-2">
                        {milestone.highlights.map((point) => (
                          <li
                            key={point}
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


