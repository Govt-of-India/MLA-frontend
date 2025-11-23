export interface News {
  id: string
  titleEn: string
  titleHi?: string | null
  contentEn: string
  contentHi?: string | null
  slug: string
  imageUrl?: string | null
  published: boolean
  publishedAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface Photo {
  id: string
  titleEn: string
  titleHi?: string | null
  imageUrl: string
  category?: string | null
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Video {
  id: string
  titleEn: string
  titleHi?: string | null
  videoUrl: string
  thumbnailUrl?: string | null
  category?: string | null
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Event {
  id: string
  titleEn: string
  titleHi?: string | null
  descriptionEn: string
  descriptionHi?: string | null
  date: Date
  location?: string | null
  imageUrl?: string | null
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface Achievement {
  id: string
  titleEn: string
  titleHi?: string | null
  descriptionEn: string
  descriptionHi?: string | null
  year: number
  imageUrl?: string | null
  category?: string | null
  createdAt: Date
  updatedAt: Date
}

