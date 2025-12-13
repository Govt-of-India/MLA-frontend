import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { enUS, hi as hiLocale } from "date-fns/locale"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { mockNews } from "@/lib/mock-data"
import { ChevronRight, Home, ArrowLeft } from "lucide-react"

type NewsDetailParams = {
  slug: string
  locale: string
}

export default async function NewsDetailPage({
  params,
}: {
  params: NewsDetailParams
}) {
  const { slug, locale } = params
  const news = mockNews.find((item) => item.slug === slug && item.published)

  if (!news) {
    notFound()
  }

  const pickText = (hiValue?: string, enValue?: string) =>
    locale === "hi" && hiValue ? hiValue : enValue ?? hiValue ?? ""
  const dateLocale = locale === "hi" ? hiLocale : enUS

  const title = pickText(news.titleHi, news.titleEn)
  const content = pickText(news.contentHi, news.contentEn)

  return (
    <div className="container py-8 sm:py-16">
      <article className="max-w-4xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
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
              <Link
                href={`/${locale}/news`}
                className="text-muted-foreground hover:text-[#FF7A59] transition-colors"
              >
                {locale === "hi" ? "समाचार" : "News"}
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground/50 mx-1" />
              <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-[300px]">
                {title}
              </span>
            </li>
          </ol>
        </nav>

        {/* Back Button */}
        <Link
          href={`/${locale}/news`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#FF7A59] transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {locale === "hi" ? "सभी समाचार" : "All News"}
        </Link>

        {news.imageUrl && (
          <div className="relative h-64 sm:h-96 w-full mb-8 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={news.imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={90}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        )}

        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-[#FF7A59]/10 text-[#FF7A59] text-sm font-medium rounded-full">
            {format(new Date(news.createdAt), "MMMM dd, yyyy", { locale: dateLocale })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-6">{title}</h1>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: content.replace(/\n/g, "<br />"),
              }}
            />
          </CardContent>
        </Card>
      </article>
    </div>
  )
}

