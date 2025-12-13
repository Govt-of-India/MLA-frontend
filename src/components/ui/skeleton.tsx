"use client"

import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700",
        className
      )}
    />
  )
}

// Skeleton for a card layout
export function CardSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("rounded-xl bg-white dark:bg-slate-800 p-4 shadow-md", className)}>
      <Skeleton className="h-48 w-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}

// Skeleton for news cards
export function NewsCardSkeleton() {
  return (
    <div className="rounded-xl bg-white dark:bg-slate-800 overflow-hidden shadow-md">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4">
        <Skeleton className="h-6 w-4/5 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  )
}

// Skeleton for gallery grid
export function GallerySkeleton() {
  return (
    <div className="rounded-xl overflow-hidden shadow-md">
      <Skeleton className="aspect-square w-full" />
    </div>
  )
}

// Skeleton for hero section
export function HeroSkeleton() {
  return (
    <div className="relative w-full h-[70vh] bg-slate-200 dark:bg-slate-800">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4 w-full max-w-2xl px-4">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <Skeleton className="h-10 w-40 mx-auto mt-4" />
        </div>
      </div>
    </div>
  )
}

// Skeleton for profile/about section
export function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <Skeleton className="h-64 w-64 rounded-full" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  )
}

// Skeleton for stats grid
export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-md">
          <Skeleton className="h-10 w-10 rounded-full mb-4" />
          <Skeleton className="h-8 w-20 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  )
}
