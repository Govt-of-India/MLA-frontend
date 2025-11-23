"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, Play } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

interface Video {
  id: string
  titleEn: string
  videoUrl: string
  thumbnailUrl?: string | null
  category?: string | null
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      // Try API first, fallback to mock data
      try {
        const response = await fetch('/api/videos')
        if (response.ok) {
          const data = await response.json()
          setVideos(data)
          setLoading(false)
          return
        }
      } catch (apiError) {
        console.log('API not available, using mock data')
      }
      
      // Use mock data as fallback
      const { mockVideos } = await import('@/lib/mock-data')
      setVideos(mockVideos)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch videos',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) {
      return
    }

    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Video deleted successfully',
        })
        fetchVideos()
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete video',
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-video bg-muted animate-pulse rounded" />
              <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Videos</h1>
        <Link href="/admin/videos/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Video
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <div className="relative aspect-video">
              {video.thumbnailUrl ? (
                <Image
                  src={video.thumbnailUrl}
                  alt={video.titleEn}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <Play className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{video.titleEn}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {video.category || 'Uncategorized'}
                </span>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(video.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {videos.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No videos found. Add your first video.
          </CardContent>
        </Card>
      )}
    </div>
  )
}

