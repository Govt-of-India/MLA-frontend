import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'
import { mockVideos } from '@/lib/mock-data'

const videoSchema = z.object({
  titleEn: z.string().min(1),
  titleHi: z.string().optional(),
  videoUrl: z.string().url(),
  thumbnailUrl: z.string().url().optional(),
  category: z.string().optional(),
  featured: z.boolean().default(false),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')

    let videos = [...mockVideos]
    
    if (featured === 'true') {
      videos = videos.filter(video => video.featured)
    }
    
    videos = videos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    if (limit) {
      videos = videos.slice(0, parseInt(limit))
    }

    return NextResponse.json(videos)
  } catch (error) {
    console.error('Error fetching videos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
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
    const validatedData = videoSchema.parse(body)

    // In mock mode, just return the data
    const video = {
      id: `video-${Date.now()}`,
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log('Video created (mock mode):', video)
    return NextResponse.json(video, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating video:', error)
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    )
  }
}

