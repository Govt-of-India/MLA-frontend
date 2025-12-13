import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { enUS, hi as hiLocale } from "date-fns/locale"
import { getLocale, getTranslations } from "next-intl/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockNews } from "@/lib/mock-data"
import { truncateText } from "@/lib/utils"
import { ChevronRight, Home } from "lucide-react"

export default async function NewsPage() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("pages"),
  ])
  const news = mockNews.filter((item) => item.published)
  const dateLocale = locale === "hi" ? hiLocale : enUS
  const pickText = (hiValue?: string, enValue?: string) =>
    locale === "hi" && hiValue ? hiValue : enValue ?? hiValue ?? ""

  return (
    <div className="container py-8 sm:py-16">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1 text-sm">
          <li>
            <Link
              href={`/${locale}`}
              className="flex items-center gap-1 text-muted-foreground hover:text-[#FF7A59] transition-colors"
            >
              <Home className="h-4 w-4" />
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-4 w-4 text-muted-foreground/50 mx-1" />
            <span className="text-foreground font-medium">
              {t("news")}
            </span>
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold mb-8">{t("news")}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2">
                  {pickText(item.titleHi, item.titleEn)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3 leading-relaxed">
                  {truncateText(pickText(item.contentHi, item.contentEn), 150)}
                </p>
                <span className="text-xs text-muted-foreground font-medium">
                  {format(new Date(item.createdAt), "MMM dd, yyyy", { locale: dateLocale })}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

