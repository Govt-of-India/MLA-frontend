import Image from "next/image"
import { format } from "date-fns"
import { enUS, hi as hiLocale } from "date-fns/locale"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { mockNews } from "@/lib/mock-data"

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
    <div className="container py-16">
      <article className="max-w-4xl mx-auto">
        {news.imageUrl && (
          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={news.imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={90}
            />
          </div>
        )}

        <div className="mb-4">
          <span className="text-sm text-muted-foreground">
            {format(new Date(news.createdAt), "MMMM dd, yyyy", { locale: dateLocale })}
          </span>
        </div>

        <h1 className="text-4xl font-bold mb-6">{title}</h1>

        <Card>
          <CardContent className="p-8">
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

