import Link from "next/link"
import { getLocale, getTranslations } from "next-intl/server"
import { Card } from "@/components/ui/card"
import { mockPhotos } from "@/lib/mock-data"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { ChevronRight, Home } from "lucide-react"

export default async function GalleryPage() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("pages"),
  ])
  const photos = mockPhotos
  const pickTitle = (hiValue?: string, enValue?: string) =>
    locale === "hi" && hiValue ? hiValue : enValue ?? hiValue ?? ""

  return (
    <div className="container py-8 sm:py-16">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1 text-sm">
          <li>
            <Link
              href={`/${locale}`}
              className="flex items-center gap-1 text-muted-foreground hover:text-[#FF7A59] transition-colors"
            >
              <Home className="h-4 w-4" />
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="h-4 w-4 text-muted-foreground/50 mx-1" />
            <span className="text-foreground font-medium">
              {t("gallery")}
            </span>
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold mb-8">{t("gallery")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-square">
              <OptimizedImage
                src={photo.imageUrl}
                alt={pickTitle(photo.titleHi, photo.titleEn)}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                quality={80}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

