"use client"

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

const videoSchema = z.object({
  titleEn: z.string().min(1, 'Title is required'),
  titleHi: z.string().optional(),
  videoUrl: z.string().url('Valid video URL is required'),
  category: z.string().optional(),
  featured: z.boolean().default(false),
})

type VideoFormData = z.infer<typeof videoSchema>

export default function NewVideoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VideoFormData>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      featured: false,
    },
  })

  const onSubmit = async (data: VideoFormData) => {
    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          thumbnailUrl: thumbnailUrl || undefined,
        }),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Video added successfully',
        })
        router.push('/admin/videos')
      } else {
        throw new Error('Failed to create video')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add video',
        variant: 'destructive',
      })
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add Video</h1>
      <Card>
        <CardHeader>
          <CardTitle>Video Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL *</Label>
              <Input
                id="videoUrl"
                {...register('videoUrl')}
                placeholder="https://www.youtube.com/watch?v=..."
              />
              {errors.videoUrl && (
                <p className="text-sm text-destructive">{errors.videoUrl.message}</p>
              )}
              <p className="text-sm text-muted-foreground">
                Supports YouTube, Vimeo, or direct video URLs
              </p>
            </div>

            <MediaUpload
              onUploadComplete={(url) => {
                setThumbnailUrl(url)
              }}
              label="Upload Thumbnail (Optional)"
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
                placeholder="e.g., Speeches, Events, Interviews"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                {...register('featured')}
                className="rounded"
              />
              <Label htmlFor="featured">Feature this video</Label>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Video'}
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

