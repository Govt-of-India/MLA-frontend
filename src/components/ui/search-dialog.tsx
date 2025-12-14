"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, X, Clock, ArrowRight, FileText, Image, Video, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "./button"

interface SearchResult {
  id: string
  title: string
  description: string
  type: "page" | "news" | "gallery" | "video"
  href: string
}

// Mock search data - in production, this would come from an API
const searchableContent: SearchResult[] = [
  { id: "1", title: "Home", description: "Welcome to Manish Rawat's official website", type: "page", href: "/" },
  { id: "2", title: "About", description: "Learn about Manish Rawat's journey and achievements", type: "page", href: "/about" },
  { id: "3", title: "Gallery", description: "Photo gallery of events and activities", type: "gallery", href: "/gallery" },
  { id: "4", title: "News & Press", description: "Latest news and press releases", type: "news", href: "/news" },
  { id: "5", title: "Videos", description: "Watch videos and speeches", type: "video", href: "/videos" },
  { id: "6", title: "Contact", description: "Get in touch with us", type: "page", href: "/contact" },
  { id: "7", title: "Development Projects", description: "Infrastructure and community development initiatives", type: "page", href: "/#development" },
  { id: "8", title: "Achievements", description: "Awards and recognitions", type: "page", href: "/#achievements" },
  { id: "9", title: "Health Camps", description: "Free health checkup camps for the community", type: "news", href: "/news" },
  { id: "10", title: "Education Initiatives", description: "Scholarship programs and educational support", type: "news", href: "/news" },
]

const RECENT_SEARCHES_KEY = "recent_searches"
const MAX_RECENT_SEARCHES = 5

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations("search")

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
      if (stored) {
        setRecentSearches(JSON.parse(stored))
      }
    }
  }, [])

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Search logic
  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = searchableContent.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
      setSelectedIndex(-1)
    } else {
      setResults([])
      setSelectedIndex(-1)
    }
  }, [query])

  // Save to recent searches
  const saveRecentSearch = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) return
    
    const updated = [searchTerm, ...recentSearches.filter((s) => s !== searchTerm)].slice(0, MAX_RECENT_SEARCHES)
    setRecentSearches(updated)
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
  }, [recentSearches])

  // Handle navigation
  const handleNavigate = useCallback((href: string, searchTerm?: string) => {
    if (searchTerm) {
      saveRecentSearch(searchTerm)
    }
    router.push(`/${locale}${href}`)
    onClose()
    setQuery("")
  }, [router, locale, onClose, saveRecentSearch])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const itemCount = results.length > 0 ? results.length : recentSearches.length

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < itemCount - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          if (results.length > 0) {
            handleNavigate(results[selectedIndex].href, query)
          } else if (recentSearches.length > 0) {
            setQuery(recentSearches[selectedIndex])
          }
        } else if (results.length > 0) {
          handleNavigate(results[0].href, query)
        }
        break
      case "Escape":
        onClose()
        break
    }
  }, [results, recentSearches, selectedIndex, query, handleNavigate, onClose])

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  }

  // Get icon for result type
  const getTypeIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "news":
        return <FileText className="h-4 w-4" />
      case "gallery":
        return <Image className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("title")}
        className="fixed top-[10%] left-1/2 -translate-x-1/2 w-[95vw] max-w-2xl z-[101] animate-slide-up-fade"
      >
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Search Input */}
          <div className="relative border-b border-slate-200 dark:border-slate-700">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("placeholder")}
              className="w-full h-14 pl-12 pr-12 text-lg bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              aria-label={t("placeholder")}
              autoComplete="off"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label={t("clear")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Results / Recent Searches */}
          <div className="max-h-[60vh] overflow-y-auto">
            {/* Search Results */}
            {query && results.length > 0 && (
              <div className="p-2">
                <p className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t("results")} ({results.length})
                </p>
                <ul role="listbox" aria-label={t("results")}>
                  {results.map((result, index) => (
                    <li key={result.id} role="option" aria-selected={selectedIndex === index}>
                      <button
                        onClick={() => handleNavigate(result.href, query)}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-colors ${
                          selectedIndex === index
                            ? "bg-[#FF7A59]/10 text-[#FF7A59]"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
                          selectedIndex === index
                            ? "bg-[#FF7A59]/20 text-[#FF7A59]"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                        }`}>
                          {getTypeIcon(result.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{result.title}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                            {result.description}
                          </p>
                        </div>
                        <ArrowRight className={`h-4 w-4 flex-shrink-0 ${
                          selectedIndex === index ? "text-[#FF7A59]" : "text-slate-400"
                        }`} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* No Results */}
            {query && results.length === 0 && (
              <div className="p-8 text-center">
                <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-slate-600 dark:text-slate-400">{t("noResults")}</p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{t("tryDifferent")}</p>
              </div>
            )}

            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div className="p-2">
                <div className="flex items-center justify-between px-3 py-2">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {t("recent")}
                  </p>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-[#FF7A59] hover:underline"
                  >
                    {t("clearAll")}
                  </button>
                </div>
                <ul role="listbox" aria-label={t("recent")}>
                  {recentSearches.map((search, index) => (
                    <li key={search} role="option" aria-selected={selectedIndex === index}>
                      <button
                        onClick={() => setQuery(search)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                          selectedIndex === index
                            ? "bg-[#FF7A59]/10 text-[#FF7A59]"
                            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span className="flex-1">{search}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Links (when no query and no recent) */}
            {!query && recentSearches.length === 0 && (
              <div className="p-2">
                <p className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t("quickLinks")}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {searchableContent.slice(0, 6).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.href)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                        {getTypeIcon(item.type)}
                      </div>
                      <span className="text-sm font-medium truncate">{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono">↑↓</kbd>
                {t("navigate")}
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono">↵</kbd>
                {t("select")}
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono">esc</kbd>
                {t("close")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

