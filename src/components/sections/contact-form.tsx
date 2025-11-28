"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/section-heading"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, User } from "lucide-react"

type ContactFormData = {
  name: string
  email: string
  phone?: string
  message: string
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const t = useTranslations("contact.form")
  const common = useTranslations("common")

  const contactSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("errors.name")),
        email: z.string().email(t("errors.email")),
        phone: z.string().optional(),
        message: z.string().min(10, t("errors.message")),
      }),
    [t]
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: common("success"),
          description: t("success"),
        })
        reset()
      } else {
        throw new Error()
      }
    } catch {
      toast({
        title: common("error"),
        description: t("error"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-saffron-50 via-saffron-100/50 to-white">
      <div className="container max-w-2xl">
        <SectionHeading title={t("title")} className="mb-8" />
        <Card>
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">
                  <User className="inline h-4 w-4 mr-2" />
                  {t("fields.name.label")}
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder={t("fields.name.placeholder")}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="inline h-4 w-4 mr-2" />
                  {t("fields.email.label")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder={t("fields.email.placeholder")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="inline h-4 w-4 mr-2" />
                  {t("fields.phone.label")}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder={t("fields.phone.placeholder")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t("fields.message.label")}</Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder={t("fields.message.placeholder")}
                  rows={5}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t("sending") : t("submit")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

