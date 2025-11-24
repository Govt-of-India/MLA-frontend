"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Award, MapPin, Calendar } from "lucide-react"

const ELECTED_YEAR = 2020

export function MLAProfile() {
  const t = useTranslations("profile")

  return (
    <section className="py-16">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-square w-full max-w-sm mx-auto">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary">MLA</span>
                  </div>
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
                      <span>{t("elected", { year: ELECTED_YEAR })}</span>
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

