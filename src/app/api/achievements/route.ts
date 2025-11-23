import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'
import { mockAchievements } from '@/lib/mock-data'

const achievementSchema = z.object({
  titleEn: z.string().min(1),
  titleHi: z.string().optional(),
  descriptionEn: z.string().min(1),
  descriptionHi: z.string().optional(),
  year: z.number().int().min(1900).max(2100),
  imageUrl: z.string().url().optional(),
  category: z.string().optional(),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')

    let achievements = [...mockAchievements]
    
    achievements = achievements.sort((a, b) => b.year - a.year)
    
    if (limit) {
      achievements = achievements.slice(0, parseInt(limit))
    }

    return NextResponse.json(achievements)
  } catch (error) {
    console.error('Error fetching achievements:', error)
    return NextResponse.json(
      { error: 'Failed to fetch achievements' },
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
    const validatedData = achievementSchema.parse(body)

    // In mock mode, just return the data
    const achievement = {
      id: `achievement-${Date.now()}`,
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log('Achievement created (mock mode):', achievement)
    return NextResponse.json(achievement, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating achievement:', error)
    return NextResponse.json(
      { error: 'Failed to create achievement' },
      { status: 500 }
    )
  }
}

