import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Newspaper, Image, Video, Calendar, Trophy, MessageSquare } from 'lucide-react'
import { mockNews, mockPhotos, mockVideos, mockEvents, mockAchievements } from '@/lib/mock-data'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    redirect('/admin/login')
  }

  // Use mock data counts
  const newsCount = mockNews.length
  const photosCount = mockPhotos.length
  const videosCount = mockVideos.length
  const eventsCount = mockEvents.length
  const achievementsCount = mockAchievements.length
  const contactCount = 0 // Mock contact submissions are stored in memory

  const stats = [
    { label: 'News Articles', value: newsCount, icon: Newspaper, href: '/admin/news' },
    { label: 'Photos', value: photosCount, icon: Image, href: '/admin/photos' },
    { label: 'Videos', value: videosCount, icon: Video, href: '/admin/videos' },
    { label: 'Events', value: eventsCount, icon: Calendar, href: '/admin/events' },
    { label: 'Achievements', value: achievementsCount, icon: Trophy, href: '/admin/achievements' },
    { label: 'Contact Messages', value: contactCount, icon: MessageSquare, href: '/admin/contact' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{stat.label}</CardTitle>
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

