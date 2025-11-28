"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Award, MapPin, Calendar } from "lucide-react"

export function MLAProfile() {
  const t = useTranslations("profile")

  return (
    <section className="py-16 bg-gradient-to-br from-saffron-50 via-saffron-100/50 to-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.15)]">
                  <Image
                    src="/images/pic1.jpeg"
                    alt={t("name")}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 280px, 360px"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                    {t("heading")}
                  </p>
                  <h2 className="text-3xl font-bold">{t("name")}</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>{t("constituency")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5" />
                      <span>{t("service")}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>{t("elected")}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{t("description")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

