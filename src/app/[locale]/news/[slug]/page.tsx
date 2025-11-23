import { notFound } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'
import { Card, CardContent } from '@/components/ui/card'
import { mockNews } from '@/lib/mock-data'

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug } = await params
  const news = mockNews.find(item => item.slug === slug && item.published)

  if (!news) {
    notFound()
  }

  return (
    <div className="container py-16">
      <article className="max-w-4xl mx-auto">
        {news.imageUrl && (
          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={news.imageUrl}
              alt={news.titleEn}
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
            {format(new Date(news.createdAt), 'MMMM dd, yyyy')}
          </span>
        </div>

        <h1 className="text-4xl font-bold mb-6">{news.titleEn}</h1>

        <Card>
          <CardContent className="p-8">
            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: news.contentEn.replace(/\n/g, '<br />'),
              }}
            />
          </CardContent>
        </Card>
      </article>
    </div>
  )
}

