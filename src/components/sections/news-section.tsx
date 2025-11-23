import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { format } from 'date-fns'
import { mockNews, delay } from '@/lib/mock-data'

export async function NewsSection() {
  const locale = 'en'

  // Simulate async call
  await delay(100)
  const news = mockNews.filter(item => item.published).slice(0, 4)

  if (news.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest News</h2>
          <Link href={`/${locale}/news`}>
            <Button variant="outline">View All</Button>
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
                      alt={item.titleEn}
                      fill
                      className="object-cover rounded-t-lg"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">
                    {locale === 'hi' && item.titleHi ? item.titleHi : item.titleEn}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                    {locale === 'hi' && item.contentHi
                      ? item.contentHi.substring(0, 100)
                      : item.contentEn.substring(0, 100)}
                    ...
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(item.createdAt), 'MMM dd, yyyy')}
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

