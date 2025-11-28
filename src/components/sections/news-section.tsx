import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { enUS, hi as hiLocale } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockNews, delay } from "@/lib/mock-data"
import { getLocale, getTranslations } from "next-intl/server"

export async function NewsSection() {
  const [locale, tSection, tCommon] = await Promise.all([
    getLocale(),
    getTranslations("sections.news"),
    getTranslations("common"),
  ])

  await delay(100)
  const news = mockNews.filter((item) => item.published).slice(0, 4)

  if (news.length === 0) {
    return null
  }

  const pickText = (hiValue?: string, enValue?: string) =>
    locale === "hi" && hiValue ? hiValue : enValue ?? hiValue ?? ""
  const dateLocale = locale === "hi" ? hiLocale : enUS

  return (
    <section className="py-16 bg-gradient-to-br from-saffron-50 via-saffron-100/50 to-white">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">{tSection("title")}</h2>
          <Link href={`/${locale}/news`}>
            <Button variant="outline">{tCommon("viewAll")}</Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item) => (
            <Link key={item.id} href={`/${locale}/news/${item.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                {item.imageUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={item.imageUrl}
                      alt={pickText(item.titleHi, item.titleEn)}
                      fill
                      className="object-cover rounded-t-lg"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">
                    {pickText(item.titleHi, item.titleEn)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                    {pickText(item.contentHi, item.contentEn).substring(0, 100)}...
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(item.createdAt), "MMM dd, yyyy", { locale: dateLocale })}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

