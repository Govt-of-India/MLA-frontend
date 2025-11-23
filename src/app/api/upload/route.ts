import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // For demo: return a placeholder image URL
    // In production, upload to Cloudinary or your storage service
    const placeholderUrl = `https://images.unsplash.com/photo-${Math.random().toString(36).substring(7)}?w=800`
    
    console.log('File upload requested (mock mode):', {
      name: file.name,
      size: file.size,
      type: file.type,
    })

    // Return a mock URL (using Unsplash placeholder)
    return NextResponse.json({
      url: placeholderUrl,
      publicId: `mock-${Date.now()}`,
      message: 'Mock upload - Cloudinary not configured. Using placeholder image.',
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}

