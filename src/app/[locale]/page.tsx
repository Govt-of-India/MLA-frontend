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

  const featuredPhotos = mockPhotos.filter((photo) => photo.featured).slice(0, 4)

  // Unique quotes for each slide based on image/content
  const photoQuotes = locale === "hi"
    ? [
        "जनता की आवाज़, जनता की सेवा - यही है मेरा संकल्प",
        "शिक्षा ही विकास की नींव है, हर बच्चे को शिक्षा मिलनी चाहिए",
        "सड़कें नहीं, विकास की राह बनाते हैं",
        "स्वास्थ्य ही सबसे बड़ा धन है, हर नागरिक का स्वास्थ्य मेरी प्राथमिकता है",
      ]
    : [
        "The voice of the people, service to the people - this is my commitment",
        "Education is the foundation of development, every child deserves education",
        "We don't just build roads, we build pathways to progress",
        "Health is the greatest wealth, every citizen's health is my priority",
      ]

  // Always start with the banner image as the main slide
  const slides = [
    {
      id: "banner-main",
      imageUrl: "/images/banner-mla.jpeg",
      title: heroTranslations("title"),
      subtitle: heroTranslations("subtitle"),
      quote: locale === "hi" 
        ? "लोगों की सेवा ही सबसे बड़ा धर्म है"
        : "Service to the people is the greatest duty",
    },
    ...featuredPhotos.map((photo, index) => ({
      id: photo.id,
      imageUrl: photo.imageUrl,
      title:
        locale === "hi" && photo.titleHi
          ? photo.titleHi
          : photo.titleEn ?? photo.titleHi ?? "",
      quote: photoQuotes[index] || (locale === "hi"
        ? "समर्पण और प्रतिबद्धता के साथ जनता की सेवा"
        : "Serving the people with dedication and commitment"),
    })),
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

