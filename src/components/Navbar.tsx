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
    { icon: Facebook, href: "https://www.facebook.com/manishrawatmlabjp", label: "Facebook", color: "#1877F2" },
    { icon: Twitter, href: "https://x.com/manishrawatmla", label: "Twitter", color: "#1DA1F2" },
    { icon: Instagram, href: "https://instagram.com/manish_rawat_mla", label: "Instagram", color: "#E4405F" },
    { icon: Youtube, href: "https://www.youtube.com/@manishrawatmla", label: "YouTube", color: "#FF0000" },
    { icon: MessageCircle, href: "https://wa.me/91941577090", label: "WhatsApp", color: "#25D366" },
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
              {navItems.map((item) => {
                const isActive = isRouteActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-white/15 rounded-md ${
                      isActive ? "bg-white/25" : ""
                    }`}
                  >
                    {item.label}
                    {/* Active indicator - bottom bar */}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-white rounded-full" />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 px-3 rounded-lg text-white border border-white/30 bg-white/10 hover:bg-white/25 focus-visible:ring-white/50 flex items-center gap-2 font-medium"
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

            {/* Hamburger Menu - Always visible with animation */}
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 rounded-full text-white border-2 transition-all duration-300 ease-in-out ${
                mobileMenuOpen 
                  ? "bg-white/25 border-white rotate-90 scale-110" 
                  : "bg-white/10 border-white/30 hover:bg-white/25 hover:border-white/50 hover:scale-110"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <div className="relative h-5 w-5">
                <Menu className={`h-5 w-5 absolute inset-0 transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                }`} />
                <X className={`h-5 w-5 absolute inset-0 transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                }`} />
              </div>
            </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <>
            {/* Transparent Overlay Background */}
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fade-in"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Glass Menu Panel */}
            <div className="fixed right-0 top-0 h-full w-[85vw] max-w-sm z-50 flex flex-col animate-slide-in-right">
              <div className="h-full bg-gradient-to-b from-[#FF7A59] to-[#e86a4a] dark:from-slate-900 dark:to-slate-800 border-l border-white/20 dark:border-slate-700/20 shadow-2xl overflow-y-auto">
                {/* Header with Close Button */}
                <div className="flex items-center justify-between p-4 border-b border-white/20">
                  <span className="text-white font-semibold text-lg">{t("menu")}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    className="h-10 w-10 rounded-full text-white hover:bg-white/15 border border-white/20"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Navigation Links */}
                <nav className="p-4">
                  <h3 className="text-white/70 text-xs font-semibold mb-3 uppercase tracking-wider px-2">
                    {t("navigation")}
                  </h3>
                  <div className="space-y-1">
                    {navItems.map((item) => {
                      const isActive = isRouteActive(item.href)
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-all ${
                            isActive
                              ? "bg-white/25 text-white border-l-4 border-white"
                              : "text-white/90 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>
                </nav>

                {/* Divider */}
                <div className="mx-4 border-t border-white/20" />

                {/* Contact Information */}
                <div className="p-4">
                  <h3 className="text-white/70 text-xs font-semibold mb-3 uppercase tracking-wider px-2">
                    {t("contactInfo")}
                  </h3>
                  <div className="space-y-2">
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all text-white/90 hover:bg-white/10 hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{contactInfo.email}</span>
                    </a>
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all text-white/90 hover:bg-white/10 hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Phone className="h-4 w-4 flex-shrink-0" />
                      <span>{contactInfo.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-4 border-t border-white/20" />

                {/* Social Media Links */}
                <div className="p-4">
                  <h3 className="text-white/70 text-xs font-semibold mb-3 uppercase tracking-wider px-2">
                    {t("follow")}
                  </h3>
                  <div className="flex flex-wrap gap-3 px-2">
                    {socialLinks.map((social) => {
                      const Icon = social.icon
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative h-12 w-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white overflow-hidden transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg"
                          aria-label={social.label}
                          onClick={() => setMobileMenuOpen(false)}
                          style={{ ['--brand-color' as string]: social.color }}
                        >
                          {/* Animated background fill */}
                          <span 
                            className="absolute inset-0 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300 ease-out"
                            style={{ backgroundColor: social.color }}
                          />
                          <Icon className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
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

