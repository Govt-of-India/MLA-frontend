import { HeroSlider } from "@/components/layout/hero-slider"
import { MissionVision } from "@/components/sections/mission-vision"
import { ImpactSection } from "@/components/sections/impact"
import { JourneySection } from "@/components/sections/journey"
import { MLAProfile } from "@/components/sections/mla-profile"
import { Achievements } from "@/components/sections/achievements"
import { DevelopmentProjects } from "@/components/sections/development-projects"
import { NewsSection } from "@/components/sections/news-section"
import { EventsCalendar } from "@/components/sections/events-calendar"
import { PhotoGallery } from "@/components/sections/photo-gallery"
import { VideoSection } from "@/components/sections/video-section"
import { ContactForm } from "@/components/sections/contact-form"
import { mockPhotos } from "@/lib/mock-data"
import { getLocale, getTranslations } from "next-intl/server"

export default async function HomePage() {
  const [locale, heroTranslations] = await Promise.all([
    getLocale(),
    getTranslations("home.hero"),
  ])

  const featuredPhotos = mockPhotos.filter((photo) => photo.featured).slice(0, 5)

  const slides =
    featuredPhotos.length > 0
      ? featuredPhotos.map((photo) => ({
          id: photo.id,
          imageUrl: photo.imageUrl,
          title:
            locale === "hi" && photo.titleHi
              ? photo.titleHi
              : photo.titleEn ?? photo.titleHi ?? "",
        }))
      : [
          {
            id: "default",
            imageUrl: "/images/banner-mla.jpeg",
            title: heroTranslations("title"),
            subtitle: heroTranslations("subtitle"),
          },
        ]

  return (
    <div className="flex flex-col">
      <HeroSlider slides={slides} />
      <MissionVision />
      <ImpactSection />
      <JourneySection />
      <MLAProfile />
      <Achievements />
      <DevelopmentProjects />
      <NewsSection />
      <EventsCalendar />
      <PhotoGallery />
      <VideoSection />
      <ContactForm />
    </div>
  )
}

