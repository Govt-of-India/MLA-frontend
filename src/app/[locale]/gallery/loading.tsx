import { GallerySkeleton, Skeleton } from "@/components/ui/skeleton"

export default function GalleryLoading() {
  return (
    <div className="container py-8 sm:py-16">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Title skeleton */}
      <Skeleton className="h-10 w-48 mb-8" />

      {/* Grid of gallery skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <GallerySkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

