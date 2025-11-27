"use client"

const impactHighlights = [
  {
    title: "People’s Person",
    description:
      "10 years as an elected representative serving people as MLA, Rajya Sabha MP, and Lok Sabha MP.",
  },
  {
    title: "Facilitator of Change",
    description:
      "Eight years as a Minister in the Gujarat Government with exemplary work at the Union Ministry of Home and Cooperation.",
  },
  {
    title: "Contributor in Nation Building",
    description:
      "A firm believer in Indian culture and ethos with an unwavering focus on national development.",
  },
  {
    title: "Organization Builder",
    description:
      "Led the BJP for six years as National President, expanding it into the world’s largest political party.",
  },
  {
    title: "Sports Administrator",
    description:
      "Instrumental in taking cricket and chess in Gujarat to new heights with world-class infrastructure.",
  },
  {
    title: "Cooperative Pioneer",
    description:
      "Brought the cooperative movement to the forefront of Gujarat’s economy and national discourse.",
  },
]

export function ImpactSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-orange-50 dark:from-slate-900 dark:to-slate-950">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[360px_1fr] items-center">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-[#FF7A59]/30 rounded-full" />
              <div className="relative h-72 w-72 rounded-full border-4 border-white shadow-[0_20px_70px_rgba(255,122,89,0.35)] bg-gradient-to-b from-[#FFAF7B] to-[#FF7A59] flex flex-col items-center justify-center text-white">
                <span className="text-sm uppercase tracking-[0.35em]">Impact</span>
                <span className="text-6xl font-black tracking-tight mt-2">25+</span>
                <span className="text-lg mt-1 font-medium">Years in Public Service</span>
              </div>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Journey from a polling booth worker to Union Home Minister, driven by people-first
              governance and relentless dedication.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {impactHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="group relative rounded-2xl p-px bg-gradient-to-br from-transparent via-transparent to-transparent hover:from-[#FF7A59]/40 hover:to-white/30 transition-all duration-500"
              >
                <div className="relative h-full rounded-2xl border border-orange-100/30 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 px-6 py-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-[#FF7A59]/15 text-[#FF7A59] flex items-center justify-center font-semibold text-lg">
                      {highlight.title.charAt(0)}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {highlight.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {highlight.description}
                  </p>
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#FF7A59]/50 transition-all duration-500 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


