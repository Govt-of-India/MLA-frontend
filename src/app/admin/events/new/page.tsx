"use client"

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MediaUpload } from '@/components/admin/media-upload'
import { useToast } from '@/hooks/use-toast'

const eventSchema = z.object({
  titleEn: z.string().min(1, 'Title is required'),
  titleHi: z.string().optional(),
  descriptionEn: z.string().min(1, 'Description is required'),
  descriptionHi: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  location: z.string().optional(),
  status: z.enum(['upcoming', 'past', 'cancelled']).default('upcoming'),
})

type EventFormData = z.infer<typeof eventSchema>

export default function NewEventPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [imageUrl, setImageUrl] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      status: 'upcoming',
    },
  })

  const onSubmit = async (data: EventFormData) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          imageUrl: imageUrl || undefined,
        }),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Event created successfully',
        })
        router.push('/admin/events')
      } else {
        throw new Error('Failed to create event')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create event',
        variant: 'destructive',
      })
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create Event</h1>
      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="titleEn">Title (English) *</Label>
                <Input
                  id="titleEn"
                  {...register('titleEn')}
                  placeholder="Enter title in English"
                />
                {errors.titleEn && (
                  <p className="text-sm text-destructive">{errors.titleEn.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="titleHi">Title (Hindi)</Label>
                <Input
                  id="titleHi"
                  {...register('titleHi')}
                  placeholder="Enter title in Hindi"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="descriptionEn">Description (English) *</Label>
                <Textarea
                  id="descriptionEn"
                  {...register('descriptionEn')}
                  placeholder="Enter description in English"
                  rows={5}
                />
                {errors.descriptionEn && (
                  <p className="text-sm text-destructive">{errors.descriptionEn.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionHi">Description (Hindi)</Label>
                <Textarea
                  id="descriptionHi"
                  {...register('descriptionHi')}
                  placeholder="Enter description in Hindi"
                  rows={5}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Date & Time *</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  {...register('date')}
                />
                {errors.date && (
                  <p className="text-sm text-destructive">{errors.date.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  {...register('location')}
                  placeholder="Event location"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                {...register('status')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <MediaUpload
              onUploadComplete={(url) => {
                setImageUrl(url)
              }}
              label="Upload Event Image (Optional)"
            />

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Event'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

