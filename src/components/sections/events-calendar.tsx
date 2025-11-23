import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { mockEvents, delay } from '@/lib/mock-data'

export async function EventsCalendar() {
  const locale = 'en'
  
  // Simulate async call
  await delay(100)
  const upcomingEvents = mockEvents
    .filter(event => event.status === 'upcoming' && new Date(event.date) >= new Date())
    .slice(0, 3)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  if (upcomingEvents.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">
                    {locale === 'hi' && event.titleHi ? event.titleHi : event.titleEn}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {locale === 'hi' && event.descriptionHi
                    ? event.descriptionHi.substring(0, 100)
                    : event.descriptionEn.substring(0, 100)}
                  ...
                </p>
                <div className="space-y-1 text-xs">
                  <p className="font-semibold">{format(new Date(event.date), 'PPP')}</p>
                  {event.location && (
                    <p className="text-muted-foreground">{event.location}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

