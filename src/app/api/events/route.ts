import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'
import { mockEvents } from '@/lib/mock-data'

const eventSchema = z.object({
  titleEn: z.string().min(1),
  titleHi: z.string().optional(),
  descriptionEn: z.string().min(1),
  descriptionHi: z.string().optional(),
  date: z.string().transform((str) => new Date(str)),
  location: z.string().optional(),
  imageUrl: z.string().url().optional(),
  status: z.enum(['upcoming', 'past', 'cancelled']).default('upcoming'),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')

    let events = [...mockEvents]
    
    if (status) {
      events = events.filter(event => event.status === status)
    }
    
    events = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    
    if (limit) {
      events = events.slice(0, parseInt(limit))
    }

    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = eventSchema.parse(body)

    // In mock mode, just return the data
    const event = {
      id: `event-${Date.now()}`,
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log('Event created (mock mode):', event)
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}

