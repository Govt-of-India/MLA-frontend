"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Search, Sun, Moon, Menu, X, Check, Facebook, Twitter, Instagram, Youtube, MessageCircle, Mail, Phone } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations("nav")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const handleLocaleSwitch = (newLocale: string) => {
    if (!pathname || newLocale === locale) return

    const isRootPath =
      pathname === `/${locale}` || pathname === `/${locale}/`
    const nextPath = isRootPath
      ? `/${newLocale}`
      : pathname.replace(`/${locale}`, `/${newLocale}`)

    router.replace(nextPath)
  }

  const navItems = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/gallery`, label: t("gallery") },
    { href: `/${locale}/news`, label: t("press") },
    { href: `/${locale}/videos`, label: t("myView") },
    { href: `/${locale}/contact`, label: t("contact") },
  ]

  const isRouteActive = (href: string) => {
    const isRoot = href === `/${locale}`
    if (!pathname) return false

    if (isRoot) {
      return pathname === href || pathname === `${href}/`
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const languages = [
    { code: "en", label: t("languages.english") },
    { code: "hi", label: t("languages.hindi") },
  ]

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0]

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/manishrawatmlabjp", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/manishrawatmla", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/manish_rawat_mla", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@manishrawatmla", label: "YouTube" },
    { icon: MessageCircle, href: "https://wa.me/91941577090", label: "WhatsApp" },
  ]

  const contactInfo = {
    email: "manishrawatmla@gmail.com",
    phone: "+91 94157 7090"
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FF7A59] shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-3 -ml-6">
            <Image
              src="/images/bjp-icon.png"
              alt="BJP Logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
              priority
            />
            <span className="text-2xl font-bold text-white">Manish Rawat</span>
          </Link>

          {/* Desktop Navigation and Right Side Icons */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 rounded-md ${
                    isRouteActive(item.href) ? "bg-white/20" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 px-3 rounded-lg text-white hover:bg-white/20 flex items-center gap-2 font-medium"
                  aria-label={t("languages.label")}
                >
                  <span className="text-sm uppercase">{currentLanguage.code}</span>
                  <svg
                    className="h-4 w-4 opacity-70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-white rounded-xl shadow-xl border border-gray-200/50 p-2 mt-2"
              >
                {languages.map((option) => (
                  <DropdownMenuItem
                    key={option.code}
                    onSelect={(event) => {
                      event.preventDefault()
                      handleLocaleSwitch(option.code)
                    }}
                    className={`cursor-pointer px-4 py-3 rounded-lg text-sm transition-colors flex items-center justify-between gap-3 ${
                      locale === option.code
                        ? "bg-[#FF7A59]/10 hover:bg-[#FF7A59]/15"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex flex-col">
                        <span
                          className={`font-medium ${
                            locale === option.code
                              ? "text-[#FF7A59]"
                              : "text-gray-900"
                          }`}
                        >
                          {option.label}
                        </span>
                        <span className="text-xs uppercase text-gray-500">
                          {option.code}
                        </span>
                      </div>
                    </div>
                    {locale === option.code && (
                      <Check className="h-5 w-5 text-[#FF7A59] flex-shrink-0" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (mounted && setTheme) {
                  setTheme(theme === "dark" ? "light" : "dark")
                }
              }}
              className="h-9 w-9 rounded-full text-white hover:bg-white/20 relative"
              aria-label="Toggle theme"
              disabled={!mounted}
            >
              <div className="relative h-5 w-5">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute inset-0" />
                <Moon className="h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute inset-0" />
              </div>
            </Button>

            {/* Search Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-white hover:bg-white/20"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Hamburger Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-white hover:bg-white/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            </div>
          </div>
        </div>

        {/* Half Screen Glass Transparent Overlay Menu */}
        {mobileMenuOpen && (
          <>
            {/* Transparent Overlay Background */}
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Glass Menu Panel - Reduced Width */}
            <div className="fixed right-0 top-0 h-full w-80 z-50 flex flex-col">
              <div className="h-full bg-white/10 dark:bg-slate-900/10 backdrop-blur-2xl border-l border-white/20 dark:border-slate-700/20 shadow-2xl p-8 overflow-y-auto">
                {/* Close Button */}
                <div className="flex justify-end mb-8">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    className="h-10 w-10 rounded-full text-white hover:bg-white/15 border border-white/20 backdrop-blur-sm"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                {/* Contact Information */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">Contact</h3>
                  
                  {/* Email */}
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-3 px-6 py-4 text-base font-medium rounded-lg transition-all backdrop-blur-md text-white hover:bg-white/10 border border-white/15"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Mail className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{contactInfo.email}</span>
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 px-6 py-4 text-base font-medium rounded-lg transition-all backdrop-blur-md text-white hover:bg-white/10 border border-white/15"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Phone className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{contactInfo.phone}</span>
                  </a>
                </div>

                {/* Social Media Buttons - Horizontal */}
                <div>
                  <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">Follow</h3>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social) => {
                      const Icon = social.icon
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-12 w-12 rounded-full bg-[#FF7A59]/40 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white hover:bg-[#FF7A59]/60 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                          aria-label={social.label}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}

