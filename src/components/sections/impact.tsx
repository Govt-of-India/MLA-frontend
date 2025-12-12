"use client"

import { useTranslations } from "next-intl"

export function ImpactSection() {
  const t = useTranslations("sections.impact")
  const highlights = [
    { key: "peoplesPerson" },
    { key: "facilitator" },
    { key: "contributor" },
    { key: "organizationBuilder" },
    { key: "sportsAdministrator" },
    { key: "cooperativePioneer" },
  ]

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-saffron-50 via-saffron-100/50 to-white overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[360px_1fr] items-center">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-4 sm:space-y-6">
            <div className="relative mx-auto lg:mx-0">
              <div className="absolute inset-0 blur-3xl bg-[#FF7A59]/30 rounded-full" />
              <div className="relative h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full border-4 border-white shadow-[0_20px_70px_rgba(255,122,89,0.35)] bg-gradient-to-b from-[#FFAF7B] to-[#FF7A59] flex flex-col items-center justify-center text-white px-4">
                <span className="text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.35em]">{t("label")}</span>
                <span className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mt-1 sm:mt-2">{t("years")}</span>
                <span className="text-sm sm:text-base md:text-lg mt-1 font-medium text-center leading-tight">{t("yearsLabel")}</span>
              </div>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed text-sm sm:text-base px-2 sm:px-0">
              {t("description")}
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
            {highlights.map((highlight) => {
              const title = t(`highlights.${highlight.key}.title`)
              return (
                <div
                  key={highlight.key}
                  className="group relative rounded-2xl p-px bg-gradient-to-br from-transparent via-transparent to-transparent hover:from-[#FF7A59]/40 hover:to-white/30 transition-all duration-500"
                >
                  <div className="relative h-full rounded-2xl border-2 border-saffron-400 dark:border-saffron-600 bg-white/90 dark:bg-slate-900/80 px-4 sm:px-6 py-4 sm:py-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
                    <div className="flex items-start sm:items-center gap-3 mb-2 sm:mb-3">
                      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[#FF7A59]/15 text-[#FF7A59] flex items-center justify-center font-semibold text-base sm:text-lg flex-shrink-0">
                        {title.charAt(0)}
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-tight">
                        {title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {t(`highlights.${highlight.key}.description`)}
                    </p>
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#FF7A59]/80 transition-all duration-500 pointer-events-none" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}


