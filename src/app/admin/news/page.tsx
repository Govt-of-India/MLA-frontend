"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface NewsItem {
  id: string
  titleEn: string
  slug: string
  published: boolean
  createdAt: string
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      // Try API first, fallback to mock data
      try {
        const response = await fetch('/api/news')
        if (response.ok) {
          const data = await response.json()
          setNews(data)
          setLoading(false)
          return
        }
      } catch (apiError) {
        console.log('API not available, using mock data')
      }
      
      // Use mock data as fallback
      const { mockNews } = await import('@/lib/mock-data')
      setNews(mockNews)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch news',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) {
      return
    }

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'News deleted successfully',
        })
        fetchNews()
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete news',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="h-9 w-48 bg-muted animate-pulse rounded" />
          <div className="h-10 w-32 bg-muted animate-pulse rounded" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">News Management</h1>
        <Link href="/admin/news/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add News
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{item.titleEn}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Slug: {item.slug} •{' '}
                    {item.published ? (
                      <span className="text-green-600">Published</span>
                    ) : (
                      <span className="text-gray-600">Draft</span>
                    )}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link href={`/admin/news/${item.id}`}>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}

        {news.length === 0 && (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No news items found. Create your first news article.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

