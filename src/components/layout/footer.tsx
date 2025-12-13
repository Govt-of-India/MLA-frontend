"use client"

import Link from "next/link"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { Facebook, Twitter, Instagram, Youtube, MessageCircle } from "lucide-react"

// Social link colors for hover effects
const socialColors = {
  Facebook: { bg: "#1877F2", hover: "hover:bg-[#1877F2]" },
  Twitter: { bg: "#1DA1F2", hover: "hover:bg-[#1DA1F2]" },
  Instagram: { bg: "#E4405F", hover: "hover:bg-[#E4405F]" },
  YouTube: { bg: "#FF0000", hover: "hover:bg-[#FF0000]" },
  WhatsApp: { bg: "#25D366", hover: "hover:bg-[#25D366]" },
}

export function Footer() {
  const locale = useLocale()
  const t = useTranslations("nav")
  const tf = useTranslations("footer")

  const navItems = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/gallery`, label: t("gallery") },
    { href: `/${locale}/news`, label: t("press") },
    { href: `/${locale}/contact`, label: t("contact") },
  ]

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/manishrawatmlabjp", label: "Facebook", color: socialColors.Facebook },
    { icon: Twitter, href: "https://x.com/manishrawatmla", label: "Twitter", color: socialColors.Twitter },
    { icon: Instagram, href: "https://instagram.com/manish_rawat_mla", label: "Instagram", color: socialColors.Instagram },
    { icon: Youtube, href: "https://www.youtube.com/@manishrawatmla", label: "YouTube", color: socialColors.YouTube },
    { icon: MessageCircle, href: "https://wa.me/919415777090", label: "WhatsApp", color: socialColors.WhatsApp },
  ]

  return (
    <footer className="border-t bg-gradient-to-b from-background to-slate-50 dark:to-slate-900">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href={`/${locale}`} className="flex items-center space-x-2 mb-4 group">
              <Image
                src="/images/bjp-icon.png"
                alt="BJP Logo"
                width={24}
                height={24}
                className="h-6 w-6 object-contain group-hover:scale-110 transition-transform"
              />
              <h3 className="text-lg font-semibold group-hover:text-[#FF7A59] transition-colors">{tf("brand")}</h3>
            </Link>
            <p className="text-sm text-muted-foreground">{tf("description")}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">{tf("quickLinks")}</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-[#FF7A59] hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">{tf("connect")}</h4>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative h-11 w-11 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-white transition-all duration-300 shadow-md hover:shadow-xl hover:scale-110 hover:-translate-y-1 overflow-hidden"
                    style={{ ['--hover-bg' as string]: social.color.bg }}
                  >
                    {/* Animated background */}
                    <span 
                      className="absolute inset-0 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300 ease-out"
                      style={{ backgroundColor: social.color.bg }}
                    />
                    <Icon className="h-5 w-5 relative z-10" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">{tf("contact")}</h4>
            <p className="text-sm text-muted-foreground">
              {tf("email")}: <a href="mailto:manishrawatmla@gmail.com" className="hover:text-primary transition-colors">manishrawatmla@gmail.com</a>
              <br />
              {tf("phone")}: <a href="tel:+91941577090" className="hover:text-primary transition-colors">+91 94157 7090</a>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {tf("brand")}. {tf("rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}

