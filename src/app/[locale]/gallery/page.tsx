import Image from "next/image"
import { getLocale, getTranslations } from "next-intl/server"
import { Card } from "@/components/ui/card"
import { mockPhotos } from "@/lib/mock-data"

export default async function GalleryPage() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("pages"),
  ])
  const photos = mockPhotos
  const pickTitle = (hiValue?: string, enValue?: string) =>
    locale === "hi" && hiValue ? hiValue : enValue ?? hiValue ?? ""

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8">{t("gallery")}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-square">
              <Image
                src={photo.imageUrl}
                alt={pickTitle(photo.titleHi, photo.titleEn)}
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

