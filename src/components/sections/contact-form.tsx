"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useTranslations, useLocale } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SectionHeading } from "@/components/ui/section-heading"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, User, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, MapPin } from "lucide-react"

type ContactFormData = {
  name: string
  email: string
  phone?: string
  message: string
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const { toast } = useToast()
  const t = useTranslations("contact.form")
  const common = useTranslations("common")
  const locale = useLocale()

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
    formState: { errors, dirtyFields, isValid },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange", // Enable real-time validation
  })

  const watchedFields = watch()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus("success")
        toast({
          title: common("success"),
          description: t("success"),
        })
        reset()
        // Reset success status after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000)
      } else {
        throw new Error()
      }
    } catch {
      setSubmitStatus("error")
      toast({
        title: common("error"),
        description: t("error"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper to get field status
  const getFieldStatus = (fieldName: keyof ContactFormData) => {
    if (errors[fieldName]) return "error"
    if (dirtyFields[fieldName] && !errors[fieldName] && watchedFields[fieldName]) return "valid"
    return "idle"
  }

  const contactInfo = {
    email: "manishrawatmla@gmail.com",
    phone: "+91 94157 7090",
    address: locale === "hi" ? "सिधौली, उत्तर प्रदेश" : "Sidhauli, Uttar Pradesh"
  }

  return (
    <section className="py-16 bg-gradient-to-br from-saffron-50 via-saffron-100/50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container">
        <SectionHeading title={t("title")} className="mb-10" />
        
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden border-0 shadow-[0_10px_50px_rgba(0,0,0,0.1)]">
            <div className="grid md:grid-cols-5">
              {/* Left Decorative Panel */}
              <div className="md:col-span-2 bg-gradient-to-br from-[#FF7A59] to-[#e86a4a] p-8 md:p-10 text-white relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">
                    {locale === "hi" ? "संपर्क करें" : "Get in Touch"}
                  </h3>
                  <p className="text-white/80 mb-8 leading-relaxed">
                    {locale === "hi" 
                      ? "आपकी समस्याओं और सुझावों को सुनने के लिए हमेशा तैयार हूं।"
                      : "I am always ready to listen to your concerns and suggestions."
                    }
                  </p>
                  
                  {/* Contact Details */}
                  <div className="space-y-6">
                    <a href={`mailto:${contactInfo.email}`} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">{locale === "hi" ? "ईमेल" : "Email"}</p>
                        <p className="font-medium">{contactInfo.email}</p>
                      </div>
                    </a>
                    
                    <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">{locale === "hi" ? "फ़ोन" : "Phone"}</p>
                        <p className="font-medium">{contactInfo.phone}</p>
                      </div>
                    </a>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-white/60 text-sm">{locale === "hi" ? "कार्यालय" : "Office"}</p>
                        <p className="font-medium">{contactInfo.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Form Panel */}
              <div className="md:col-span-3 p-8 md:p-10 bg-white dark:bg-slate-900">
                {/* Success Message */}
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                      {locale === "hi" ? "आपका संदेश सफलतापूर्वक भेज दिया गया है!" : "Your message has been sent successfully!"}
                    </p>
                  </div>
                )}
                
                {/* Error Message */}
                {submitStatus === "error" && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <p className="text-red-700 dark:text-red-300 text-sm font-medium">
                      {locale === "hi" ? "कुछ गलत हो गया। कृपया पुनः प्रयास करें।" : "Something went wrong. Please try again."}
                    </p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <User className="h-4 w-4 text-[#FF7A59]" />
                      <span>{t("fields.name.label")}</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="name"
                        {...register("name")}
                        placeholder={t("fields.name.placeholder")}
                        className={`w-full h-12 px-4 rounded-xl border-2 bg-slate-50 dark:bg-slate-800 text-sm transition-all duration-200 outline-none
                          ${getFieldStatus("name") === "error" 
                            ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20" 
                            : getFieldStatus("name") === "valid"
                            ? "border-green-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/20"
                            : "border-slate-200 dark:border-slate-700 focus:border-[#FF7A59] focus:ring-4 focus:ring-[#FF7A59]/20"
                          }
                          placeholder:text-slate-500 dark:placeholder:text-slate-400
                        `}
                      />
                      {getFieldStatus("name") === "valid" && (
                        <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                      )}
                      {getFieldStatus("name") === "error" && (
                        <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
                      )}
                    </div>
                    {errors.name && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <Mail className="h-4 w-4 text-[#FF7A59]" />
                      <span>{t("fields.email.label")}</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder={t("fields.email.placeholder")}
                        className={`w-full h-12 px-4 rounded-xl border-2 bg-slate-50 dark:bg-slate-800 text-sm transition-all duration-200 outline-none
                          ${getFieldStatus("email") === "error" 
                            ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20" 
                            : getFieldStatus("email") === "valid"
                            ? "border-green-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/20"
                            : "border-slate-200 dark:border-slate-700 focus:border-[#FF7A59] focus:ring-4 focus:ring-[#FF7A59]/20"
                          }
                          placeholder:text-slate-500 dark:placeholder:text-slate-400
                        `}
                      />
                      {getFieldStatus("email") === "valid" && (
                        <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                      )}
                      {getFieldStatus("email") === "error" && (
                        <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
                      )}
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <Phone className="h-4 w-4 text-[#FF7A59]" />
                      <span>{t("fields.phone.label")}</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      placeholder={t("fields.phone.placeholder")}
                      className="w-full h-12 px-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm transition-all duration-200 outline-none focus:border-[#FF7A59] focus:ring-4 focus:ring-[#FF7A59]/20 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <MessageSquare className="h-4 w-4 text-[#FF7A59]" />
                      <span>{t("fields.message.label")}</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        {...register("message")}
                        placeholder={t("fields.message.placeholder")}
                        rows={5}
                        className={`w-full px-4 py-3 rounded-xl border-2 bg-slate-50 dark:bg-slate-800 text-sm transition-all duration-200 outline-none resize-none
                          ${getFieldStatus("message") === "error" 
                            ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/20" 
                            : getFieldStatus("message") === "valid"
                            ? "border-green-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/20"
                            : "border-slate-200 dark:border-slate-700 focus:border-[#FF7A59] focus:ring-4 focus:ring-[#FF7A59]/20"
                          }
                          placeholder:text-slate-500 dark:placeholder:text-slate-400
                        `}
                      />
                      {getFieldStatus("message") === "valid" && (
                        <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-green-500" />
                      )}
                      {getFieldStatus("message") === "error" && (
                        <AlertCircle className="absolute right-4 top-4 h-5 w-5 text-red-500" />
                      )}
                    </div>
                    {errors.message && (
                      <p className="text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-12 bg-gradient-to-r from-[#FF7A59] to-[#e86a4a] hover:from-[#e86a4a] hover:to-[#d55a3a] text-white font-semibold rounded-xl shadow-lg shadow-[#FF7A59]/30 hover:shadow-xl hover:shadow-[#FF7A59]/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        {t("sending")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-5 w-5" />
                        {t("submit")}
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
