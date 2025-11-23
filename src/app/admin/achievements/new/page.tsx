"use client"

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

const achievementSchema = z.object({
  titleEn: z.string().min(1, 'Title is required'),
  titleHi: z.string().optional(),
  descriptionEn: z.string().min(1, 'Description is required'),
  descriptionHi: z.string().optional(),
  year: z.coerce.number().int().min(1900).max(2100),
  category: z.string().optional(),
})

type AchievementFormData = z.infer<typeof achievementSchema>

export default function NewAchievementPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [imageUrl, setImageUrl] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AchievementFormData>({
    resolver: zodResolver(achievementSchema),
  })

  const onSubmit = async (data: AchievementFormData) => {
    try {
      const response = await fetch('/api/achievements', {
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
          description: 'Achievement added successfully',
        })
        router.push('/admin/achievements')
      } else {
        throw new Error('Failed to create achievement')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add achievement',
        variant: 'destructive',
      })
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add Achievement</h1>
      <Card>
        <CardHeader>
          <CardTitle>Achievement Details</CardTitle>
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
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  {...register('year')}
                  placeholder="2024"
                  min={1900}
                  max={2100}
                />
                {errors.year && (
                  <p className="text-sm text-destructive">{errors.year.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  {...register('category')}
                  placeholder="e.g., Education, Infrastructure, Social"
                />
              </div>
            </div>

            <MediaUpload
              onUploadComplete={(url) => {
                setImageUrl(url)
              }}
              label="Upload Achievement Image (Optional)"
            />

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Achievement'}
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

