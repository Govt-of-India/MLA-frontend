import { getTranslations } from "next-intl/server"
import { ContactForm } from "@/components/sections/contact-form"

export default async function ContactPage() {
  const t = await getTranslations("pages")

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">{t("contact")}</h1>
      <ContactForm />
    </div>
  )
}

