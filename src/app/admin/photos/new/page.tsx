"use client"

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MediaUpload } from '@/components/admin/media-upload'
import { useToast } from '@/hooks/use-toast'

const photoSchema = z.object({
  titleEn: z.string().min(1, 'Title is required'),
  titleHi: z.string().optional(),
  category: z.string().optional(),
  featured: z.boolean().default(false),
})

type PhotoFormData = z.infer<typeof photoSchema>

export default function NewPhotoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [imageUrl, setImageUrl] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<PhotoFormData>({
    resolver: zodResolver(photoSchema),
    defaultValues: {
      featured: false,
    },
  })

  const onSubmit = async (data: PhotoFormData) => {
    if (!imageUrl) {
      toast({
        title: 'Error',
        description: 'Please upload an image',
        variant: 'destructive',
      })
      return
    }

    try {
      const response = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          imageUrl,
        }),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Photo added successfully',
        })
        router.push('/admin/photos')
      } else {
        throw new Error('Failed to create photo')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add photo',
        variant: 'destructive',
      })
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add Photo</h1>
      <Card>
        <CardHeader>
          <CardTitle>Photo Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <MediaUpload
              onUploadComplete={(url) => {
                setImageUrl(url)
              }}
              label="Upload Photo"
              accept="image/*"
            />

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

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                {...register('category')}
                placeholder="e.g., Events, Rallies, Meetings"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                {...register('featured')}
                className="rounded"
              />
              <Label htmlFor="featured">Feature this photo</Label>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting || !imageUrl}>
                {isSubmitting ? 'Adding...' : 'Add Photo'}
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

