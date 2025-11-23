import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { mockNews } from '@/lib/mock-data'

export default async function NewsPage() {
  const news = mockNews.filter(item => item.published)

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8">Latest News</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <Link key={item.id} href={`/news/${item.slug}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              {item.imageUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.titleEn}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2">{item.titleEn}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                  {item.contentEn.substring(0, 150)}...
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
  )
}

