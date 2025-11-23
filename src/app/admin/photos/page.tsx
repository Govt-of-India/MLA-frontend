"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

interface Photo {
  id: string
  titleEn: string
  imageUrl: string
  category?: string | null
  featured: boolean
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchPhotos()
  }, [])

  const fetchPhotos = async () => {
    try {
      // Try API first, fallback to mock data
      try {
        const response = await fetch('/api/photos')
        if (response.ok) {
          const data = await response.json()
          setPhotos(data)
          setLoading(false)
          return
        }
      } catch (apiError) {
        console.log('API not available, using mock data')
      }
      
      // Use mock data as fallback
      const { mockPhotos } = await import('@/lib/mock-data')
      setPhotos(mockPhotos)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch photos',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) {
      return
    }

    try {
      const response = await fetch(`/api/photos/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Photo deleted successfully',
        })
        fetchPhotos()
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete photo',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="h-9 w-48 bg-muted animate-pulse rounded" />
          <div className="h-10 w-32 bg-muted animate-pulse rounded" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Photo Gallery</h1>
        <Link href="/admin/photos/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Photo
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {photos.map((photo) => (
          <Card key={photo.id} className="relative group">
            <div className="relative aspect-square">
              <Image
                src={photo.imageUrl}
                alt={photo.titleEn}
                fill
                className="object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(photo.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-2">
              <p className="text-xs truncate">{photo.titleEn}</p>
              {photo.featured && (
                <span className="text-xs text-primary">Featured</span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {photos.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No photos found. Add your first photo.
          </CardContent>
        </Card>
      )}
    </div>
  )
}

