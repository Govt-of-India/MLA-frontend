"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'

interface MediaUploadProps {
  onUploadComplete: (url: string) => void
  accept?: string
  label?: string
}

export function MediaUpload({ onUploadComplete, accept = 'image/*', label = 'Upload Image' }: MediaUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }

    await handleUpload(file)
  }

  const handleUpload = async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      onUploadComplete(data.url)
      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload file',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onUploadComplete('')
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">{label}</label>
        <div className="mt-2">
          {preview ? (
            <div className="relative">
              <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <Input
                type="file"
                accept={accept}
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
                id="media-upload"
              />
              <label htmlFor="media-upload">
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploading}
                  asChild
                >
                  <span>{uploading ? 'Uploading...' : label}</span>
                </Button>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

