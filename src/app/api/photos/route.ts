import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'
import { mockPhotos } from '@/lib/mock-data'

const photoSchema = z.object({
  titleEn: z.string().min(1),
  titleHi: z.string().optional(),
  imageUrl: z.string().url(),
  category: z.string().optional(),
  featured: z.boolean().default(false),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')

    let photos = [...mockPhotos]
    
    if (featured === 'true') {
      photos = photos.filter(photo => photo.featured)
    }
    
    photos = photos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    if (limit) {
      photos = photos.slice(0, parseInt(limit))
    }

    return NextResponse.json(photos)
  } catch (error) {
    console.error('Error fetching photos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
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
    const validatedData = photoSchema.parse(body)

    // In mock mode, just return the data
    const photo = {
      id: `photo-${Date.now()}`,
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log('Photo created (mock mode):', photo)
    return NextResponse.json(photo, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating photo:', error)
    return NextResponse.json(
      { error: 'Failed to create photo' },
      { status: 500 }
    )
  }
}

