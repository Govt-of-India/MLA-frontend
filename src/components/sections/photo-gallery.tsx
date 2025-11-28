import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockPhotos, delay } from "@/lib/mock-data"
import { getLocale, getTranslations } from "next-intl/server"

export async function PhotoGallery() {
  const [locale, tSection, tCommon] = await Promise.all([
    getLocale(),
    getTranslations("sections.gallery"),
    getTranslations("common"),
  ])

  await delay(100)
  const photos = mockPhotos.slice(0, 6)

  if (photos.length === 0) {
    return null
  }

  const pickTitle = (hiValue?: string, enValue?: string) =>
    locale === "hi" && hiValue ? hiValue : enValue ?? hiValue ?? ""

  return (
    <section className="py-16 bg-gradient-to-br from-saffron-50 via-saffron-100/50 to-white">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">{tSection("title")}</h2>
          <Link href={`/${locale}/gallery`}>
            <Button variant="outline">{tCommon("viewAll")}</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {photos.map((photo) => (
            <Link key={photo.id} href={`/${locale}/gallery`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

