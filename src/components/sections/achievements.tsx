import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <section className="py-16 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">{t("title")}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <Card key={achievement.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {pickLocaleText(achievement.titleHi, achievement.titleEn)}
                  </CardTitle>
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {pickLocaleText(achievement.descriptionHi, achievement.descriptionEn)}
                </p>
                <span className="text-xs font-semibold text-primary">{achievement.year}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

