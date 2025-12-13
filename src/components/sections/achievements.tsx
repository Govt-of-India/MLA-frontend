import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/section-heading"
import { Trophy } from "lucide-react"
import { mockAchievements, delay } from "@/lib/mock-data"
import { getLocale, getTranslations } from "next-intl/server"

export async function Achievements() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("sections.achievements"),
  ])

  await delay(100)
  const achievements = mockAchievements
    .slice(0, 6)
    .sort((a, b) => b.year - a.year)

  if (achievements.length === 0) {
    return null
  }

  const pickLocaleText = (hiValue?: string, enValue?: string) =>
    locale === "hi" && hiValue ? hiValue : enValue ?? hiValue ?? ""

  return (
    <section className="py-16 bg-gradient-to-br from-saffron-50 via-saffron-100/50 to-white">
      <div className="container">
        <SectionHeading title={t("title")} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="h-full rounded-xl border-2 border-saffron-300 dark:border-saffron-700 transition-all duration-300 hover:shadow-xl hover:shadow-saffron-200/50 dark:hover:shadow-saffron-800/50 hover:-translate-y-1">
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-base sm:text-lg leading-tight">
                    {pickLocaleText(achievement.titleHi, achievement.titleEn)}
                  </CardTitle>
                  <Trophy className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 leading-relaxed">
                  {pickLocaleText(achievement.descriptionHi, achievement.descriptionEn)}
                </p>
                <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">{achievement.year}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

