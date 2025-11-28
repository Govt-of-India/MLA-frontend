"use client"

export const dynamic = 'force-dynamic'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2, Calendar } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { format } from 'date-fns'
import { Event } from '@/types'

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchEvents = useCallback(async () => {
    try {
      // Try API first, fallback to mock data
      try {
        const response = await fetch('/api/events')
        if (response.ok) {
          const data = await response.json()
          // Normalize dates from API (strings) to Date objects
          const normalizedEvents = data.map((event: any) => ({
            ...event,
            date: new Date(event.date),
            createdAt: new Date(event.createdAt),
            updatedAt: new Date(event.updatedAt),
            publishedAt: event.publishedAt ? new Date(event.publishedAt) : null,
          }))
          setEvents(normalizedEvents as Event[])
          setLoading(false)
          return
        }
      } catch (apiError) {
        console.log('API not available, using mock data')
      }
      
      // Use mock data as fallback
      const { mockEvents } = await import('@/lib/mock-data')
      setEvents(mockEvents)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch events',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return
    }

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Event deleted successfully',
        })
        fetchEvents()
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete event',
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
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Events</h1>
        <Link href="/admin/events/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{event.titleEn}</CardTitle>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{format(event.date, 'PPP')}</span>
                    </div>
                    {event.location && <span>{event.location}</span>}
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        event.status === 'upcoming'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : event.status === 'past'
                          ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(event.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {events.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No events found. Add your first event.
          </CardContent>
        </Card>
      )}
    </div>
  )
}

