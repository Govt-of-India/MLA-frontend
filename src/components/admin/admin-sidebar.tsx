"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  Newspaper,
  Image,
  Video,
  Calendar,
  Trophy,
  MessageSquare,
  Settings,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/news', label: 'News', icon: Newspaper },
  { href: '/admin/photos', label: 'Photos', icon: Image },
  { href: '/admin/videos', label: 'Videos', icon: Video },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/achievements', label: 'Achievements', icon: Trophy },
  { href: '/admin/contact', label: 'Contact', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r z-40">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    isActive && 'bg-secondary'
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  )
}

