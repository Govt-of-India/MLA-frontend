import { getTranslations } from "next-intl/server"
import { MLAProfile } from "@/components/sections/mla-profile"
import { MissionVision } from "@/components/sections/mission-vision"

export default async function AboutPage() {
  const t = await getTranslations("pages")

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">{t("about")}</h1>
      <MLAProfile />
      <div className="mt-16">
        <MissionVision />
      </div>
    </div>
  )
}

