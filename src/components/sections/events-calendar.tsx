import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/section-heading"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { enUS, hi as hiLocale } from "date-fns/locale"
import { mockEvents, delay } from "@/lib/mock-data"
import { getLocale, getTranslations } from "next-intl/server"

export async function EventsCalendar() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("sections.events"),
  ])

  await delay(100)
  const upcomingEvents = mockEvents
    .filter((event) => event.status === "upcoming" && new Date(event.date) >= new Date())
    .slice(0, 3)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const dateLocale = locale === "hi" ? hiLocale : enUS
  const pickText = (hiValue?: string, enValue?: string) =>
    locale === "hi" && hiValue ? hiValue : enValue ?? hiValue ?? ""

  return (
    <section className="py-16 bg-gradient-to-br from-saffron-50 via-saffron-100/50 to-white">
      <div className="container">
        <SectionHeading title={t("title")} />
        {upcomingEvents.length === 0 ? (
          <p className="text-center text-muted-foreground">{t("empty")}</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">
                      {pickText(event.titleHi, event.titleEn)}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {pickText(event.descriptionHi, event.descriptionEn).substring(0, 100)}
                    ...
                  </p>
                  <div className="space-y-1 text-xs">
                    <p className="font-semibold">
                      {format(new Date(event.date), "PPP", { locale: dateLocale })}
                    </p>
                    {event.location && (
                      <p className="text-muted-foreground">{event.location}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

