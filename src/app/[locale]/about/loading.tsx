import { ProfileSkeleton, StatsSkeleton, Skeleton } from "@/components/ui/skeleton"

export default function AboutLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="bg-gradient-to-br from-[#FF7A59]/10 to-[#FF7A59]/5 py-12 sm:py-20">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <Skeleton className="h-48 w-48 sm:h-64 sm:w-64 rounded-full" />
            <div className="flex-1 text-center lg:text-left space-y-4">
              <Skeleton className="h-8 w-32 mx-auto lg:mx-0" />
              <Skeleton className="h-12 w-3/4 mx-auto lg:mx-0" />
              <Skeleton className="h-6 w-1/2 mx-auto lg:mx-0" />
              <div className="flex gap-4 justify-center lg:justify-start">
                <Skeleton className="h-16 w-32 rounded-xl" />
                <Skeleton className="h-16 w-32 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="container py-12 -mt-8">
        <StatsSkeleton />
      </div>

      {/* Biography skeleton */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>

      {/* Timeline skeleton */}
      <div className="bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container">
          <Skeleton className="h-8 w-48 mx-auto mb-8" />
          <div className="flex gap-4 justify-center mb-8">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-16 rounded-full" />
            ))}
          </div>
          <div className="flex gap-6 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="min-w-[300px] rounded-xl bg-white dark:bg-slate-800 p-6 shadow-md">
                <Skeleton className="h-6 w-20 mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3 mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

