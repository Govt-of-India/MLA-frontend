import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { mockPhotos, delay } from '@/lib/mock-data'

export async function PhotoGallery() {
  const locale = 'en'

  // Simulate async call
  await delay(100)
  const photos = mockPhotos.slice(0, 6)

  if (photos.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Photo Gallery</h2>
          <Link href={`/${locale}/gallery`}>
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {photos.map((photo) => (
            <Link key={photo.id} href={`/${locale}/gallery`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative aspect-square">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.titleEn}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

