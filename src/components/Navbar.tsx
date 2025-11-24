"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Search, Globe, Sun, Moon, Menu, X, Check } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { LotusIcon } from "@/components/ui/lotus-icon"

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

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FF7A59] shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-3">
            <LotusIcon className="h-8 w-8 text-white" />
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
                  size="icon"
                  className="h-9 w-9 rounded-full text-white hover:bg-white/20"
                  aria-label={t("languages.label")}
                >
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-44 bg-white rounded-lg shadow-lg border border-gray-200 p-0"
              >
                <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                  {t("languages.label")}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-100" />
                {[
                  { code: "en", label: t("languages.english") },
                  { code: "hi", label: t("languages.hindi") },
                ].map((option) => (
                  <DropdownMenuItem
                    key={option.code}
                    onSelect={(event) => {
                      event.preventDefault()
                      handleLocaleSwitch(option.code)
                    }}
                    className="cursor-pointer px-4 py-2 text-sm focus:bg-gray-100 flex items-center justify-between"
                  >
                    <div className="flex flex-col text-left">
                      <span className="font-medium text-gray-900">
                        {option.label}
                      </span>
                      <span className="text-xs uppercase text-gray-500">
                        {option.code}
                      </span>
                    </div>
                    {locale === option.code && (
                      <Check className="h-4 w-4 text-[#FF7A59]" />
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
              className="lg:hidden h-9 w-9 rounded-full text-white hover:bg-white/20"
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 bg-[#FF7A59]">
            <nav className="flex flex-col space-y-1 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 rounded-md ${
                    isRouteActive(item.href) ? "bg-white/20" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </nav>
    </header>
  )
}

