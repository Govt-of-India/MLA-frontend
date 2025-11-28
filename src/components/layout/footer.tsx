"use client"

import Link from "next/link"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

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
    { icon: Facebook, href: "https://www.facebook.com/manishrawatmlabjp", label: "Facebook", target: "_blank", rel: "noopener noreferrer" },
    { icon: Twitter, href: "https://x.com/manishrawatmla", label: "Twitter", target: "_blank", rel: "noopener noreferrer" },
    { icon: Instagram, href: "https://instagram.com/manish_rawat_mla", label: "Instagram", target: "_blank", rel: "noopener noreferrer" },
    { icon: Youtube, href: "https://www.youtube.com/@manishrawatmla", label: "YouTube", target: "_blank", rel: "noopener noreferrer" },
  ]

  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href={`/${locale}`} className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/bjp-icon.png"
                alt="BJP Logo"
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
              <h3 className="text-lg font-semibold">{tf("brand")}</h3>
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
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">{tf("connect")}</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target={social.target}
                    rel={social.rel}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="h-5 w-5" />
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

