import { NewsCardSkeleton, Skeleton } from "@/components/ui/skeleton"

export default function NewsLoading() {
  return (
    <div className="container py-8 sm:py-16">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Title skeleton */}
      <Skeleton className="h-10 w-48 mb-8" />

      {/* Grid of news card skeletons */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

