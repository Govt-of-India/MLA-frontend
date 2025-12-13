import { Skeleton } from "@/components/ui/skeleton"

export default function NewsDetailLoading() {
  return (
    <div className="container py-8 sm:py-16">
      <article className="max-w-4xl mx-auto">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Back button skeleton */}
        <Skeleton className="h-5 w-24 mb-6" />

        {/* Hero image skeleton */}
        <Skeleton className="h-64 sm:h-96 w-full rounded-2xl mb-8" />

        {/* Date badge skeleton */}
        <Skeleton className="h-7 w-36 rounded-full mb-4" />

        {/* Title skeleton */}
        <Skeleton className="h-10 w-3/4 mb-2" />
        <Skeleton className="h-10 w-1/2 mb-6" />

        {/* Content card skeleton */}
        <div className="rounded-xl bg-white dark:bg-slate-800 p-6 sm:p-8 shadow-lg">
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-full mt-6" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        </div>
      </article>
    </div>
  )
}

