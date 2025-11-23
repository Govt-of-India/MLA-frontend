import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { mockPhotos } from '@/lib/mock-data'

export default async function GalleryPage() {
  const photos = mockPhotos

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8">Photo Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
        ))}
      </div>
    </div>
  )
}

