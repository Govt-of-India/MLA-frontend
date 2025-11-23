import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Play } from 'lucide-react'
import Image from 'next/image'
import { mockVideos } from '@/lib/mock-data'

export default async function VideosPage() {
  const videos = mockVideos

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8">Videos</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-video">
              {video.thumbnailUrl ? (
                <Image
                  src={video.thumbnailUrl}
                  alt={video.titleEn}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <Play className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                <Play className="h-16 w-16 text-white" />
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{video.titleEn}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

