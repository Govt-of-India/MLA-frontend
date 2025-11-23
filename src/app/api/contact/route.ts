import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})

// In-memory storage for demo (replace with database in production)
const contactSubmissions: any[] = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Store in memory (in production, save to database)
    const submission = {
      id: `contact-${Date.now()}`,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || null,
      message: validatedData.message,
      status: 'new',
      createdAt: new Date(),
    }
    
    contactSubmissions.push(submission)
    console.log('Contact submission received:', submission)

    return NextResponse.json(
      { message: 'Contact form submitted successfully', id: submission.id },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}

