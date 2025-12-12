import Link from "next/link"
import { Card } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/section-heading"
import { mockPhotos, delay } from "@/lib/mock-data"
import { getLocale, getTranslations } from "next-intl/server"
import { OptimizedImage } from "@/components/ui/optimized-image"

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
        <SectionHeading 
          title={tSection("title")} 
          linkHref={`/${locale}/gallery`}
          viewAllText={tCommon("viewAll")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <Link key={photo.id} href={`/${locale}/gallery`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-saffron-300 dark:hover:border-saffron-700 hover:ring-2 hover:ring-saffron-200/50 dark:hover:ring-saffron-800/50 group">
                <div className="relative aspect-square overflow-hidden">
                  <OptimizedImage
                    src={photo.imageUrl}
                    alt={pickTitle(photo.titleHi, photo.titleEn)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-saffron-200/0 group-hover:bg-saffron-200/20 dark:group-hover:bg-saffron-800/20 transition-all duration-500" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

