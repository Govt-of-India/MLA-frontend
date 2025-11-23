import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'
import { mockNews } from '@/lib/mock-data'

const newsSchema = z.object({
  titleEn: z.string().min(1),
  titleHi: z.string().optional(),
  contentEn: z.string().min(1),
  contentHi: z.string().optional(),
  slug: z.string().min(1),
  imageUrl: z.string().url().optional(),
  published: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
  seoKeywords: z.string().optional(),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const limit = searchParams.get('limit')

    let news = [...mockNews]
    
    if (published === 'true') {
      news = news.filter(item => item.published)
    }
    
    news = news.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    if (limit) {
      news = news.slice(0, parseInt(limit))
    }

    return NextResponse.json(news)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news' },
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
    const validatedData = newsSchema.parse(body)

    // In mock mode, just return the data (would save to database in production)
    const news = {
      id: `news-${Date.now()}`,
      ...validatedData,
      publishedAt: validatedData.published ? new Date() : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log('News created (mock mode):', news)
    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating news:', error)
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    )
  }
}

