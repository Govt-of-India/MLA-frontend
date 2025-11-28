"use client"

export const dynamic = 'force-dynamic'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, Trophy } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Achievement } from '@/types'

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchAchievements = useCallback(async () => {
    try {
      // Try API first, fallback to mock data
      try {
        const response = await fetch('/api/achievements')
        if (response.ok) {
          const data = await response.json()
          // Normalize dates from API (strings) to Date objects
          const normalizedAchievements = data.map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
          }))
          setAchievements(normalizedAchievements as Achievement[])
          setLoading(false)
          return
        }
      } catch (apiError) {
        console.log('API not available, using mock data')
      }
      
      // Use mock data as fallback
      const { mockAchievements } = await import('@/lib/mock-data')
      setAchievements(mockAchievements)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch achievements',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchAchievements()
  }, [fetchAchievements])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this achievement?')) {
      return
    }

    try {
      const response = await fetch(`/api/achievements/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Achievement deleted successfully',
        })
        fetchAchievements()
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete achievement',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="h-9 w-48 bg-muted animate-pulse rounded" />
          <div className="h-10 w-32 bg-muted animate-pulse rounded" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Achievements</h1>
        <Link href="/admin/achievements/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Achievement
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <Card key={achievement.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{achievement.titleEn}</CardTitle>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(achievement.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-primary">{achievement.year}</span>
                {achievement.category && (
                  <span className="text-xs text-muted-foreground">{achievement.category}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {achievements.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No achievements found. Add your first achievement.
          </CardContent>
        </Card>
      )}
    </div>
  )
}

