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

const newsSchema = z.object({
  titleEn: z.string().min(1, 'Title is required'),
  titleHi: z.string().optional(),
  contentEn: z.string().min(1, 'Content is required'),
  contentHi: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  imageUrl: z.string().optional(),
  published: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
  seoKeywords: z.string().optional(),
})

type NewsFormData = z.infer<typeof newsSchema>

export default function NewNewsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [imageUrl, setImageUrl] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<NewsFormData>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      published: false,
    },
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const onSubmit = async (data: NewsFormData) => {
    try {
      const response = await fetch('/api/news', {
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
          description: 'News article created successfully',
        })
        router.push('/admin/news')
      } else {
        throw new Error('Failed to create news')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create news article',
        variant: 'destructive',
      })
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create News Article</h1>
      <Card>
        <CardHeader>
          <CardTitle>News Details</CardTitle>
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
                  onChange={(e) => {
                    register('titleEn').onChange(e)
                    setValue('slug', generateSlug(e.target.value))
                  }}
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
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                {...register('slug')}
                placeholder="news-article-slug"
              />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contentEn">Content (English) *</Label>
                <Textarea
                  id="contentEn"
                  {...register('contentEn')}
                  placeholder="Enter content in English"
                  rows={10}
                />
                {errors.contentEn && (
                  <p className="text-sm text-destructive">{errors.contentEn.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contentHi">Content (Hindi)</Label>
                <Textarea
                  id="contentHi"
                  {...register('contentHi')}
                  placeholder="Enter content in Hindi"
                  rows={10}
                />
              </div>
            </div>

            <MediaUpload
              onUploadComplete={(url) => {
                setImageUrl(url)
                setValue('imageUrl', url)
              }}
              label="Upload Featured Image"
            />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">SEO Settings</h3>
              <div className="space-y-2">
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  {...register('seoTitle')}
                  placeholder="SEO optimized title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDesc">SEO Description</Label>
                <Textarea
                  id="seoDesc"
                  {...register('seoDesc')}
                  placeholder="SEO meta description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoKeywords">SEO Keywords</Label>
                <Input
                  id="seoKeywords"
                  {...register('seoKeywords')}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                {...register('published')}
                className="rounded"
              />
              <Label htmlFor="published">Publish immediately</Label>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create News'}
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

