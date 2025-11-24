"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Search, Globe, Sun, Moon, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { LotusIcon } from "@/components/ui/lotus-icon"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations("nav")

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLocale = (newLocale: string) => {
    // Handle root path
    if (pathname === `/${locale}` || pathname === `/${locale}/`) {
      window.location.href = `/${newLocale}`
    } else {
      const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
      window.location.href = newPath
    }
  }

  const navItems = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/gallery`, label: t("gallery") },
    { href: `/${locale}/news`, label: t("press") },
    { href: `/${locale}/videos`, label: t("myView") },
    { href: `/${locale}/contact`, label: t("contact") },
  ]

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
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 rounded-md ${
                      isActive ? "bg-white/20" : ""
                    }`}
                  >
                    {item.label}
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
                  size="icon"
                  className="h-9 w-9 rounded-full text-white hover:bg-white/20"
                  aria-label="Select language"
                >
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 bg-white rounded-lg shadow-lg border border-gray-200"
              >
                <DropdownMenuItem
                  onClick={() => toggleLocale("hi")}
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {t("languages.hindi")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => toggleLocale("en")}
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {t("languages.english")}
                </DropdownMenuItem>
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
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/")
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 rounded-md ${
                      isActive ? "bg-white/20" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </nav>
    </header>
  )
}

