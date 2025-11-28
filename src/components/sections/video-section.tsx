import Link from "next/link"
import Image from "next/image"
import { Play } from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockVideos, delay } from "@/lib/mock-data"
import { getLocale, getTranslations } from "next-intl/server"

export async function VideoSection() {
  const [locale, tSection, tCommon] = await Promise.all([
    getLocale(),
    getTranslations("sections.videos"),
    getTranslations("common"),
  ])

  await delay(100)
  const videos = mockVideos.slice(0, 3)

  if (videos.length === 0) {
    return null
  }

  const pickTitle = (hiValue?: string, enValue?: string) =>
    locale === "hi" && hiValue ? hiValue : enValue ?? hiValue ?? ""

  return (
    <section className="py-16 bg-gradient-to-br from-saffron-50 via-saffron-100/50 to-white">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">{tSection("title")}</h2>
          <Link href={`/${locale}/videos`}>
            <Button variant="outline">{tCommon("viewAll")}</Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-video">
                {video.thumbnailUrl ? (
                  <Image
                    src={video.thumbnailUrl}
                    alt={pickTitle(video.titleHi, video.titleEn)}
                    fill
                    className="object-cover"
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
                <CardTitle className="text-lg">
                  {pickTitle(video.titleHi, video.titleEn)}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

