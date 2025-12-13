"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"

// Low-quality blur placeholder (tiny base64 encoded gray image)
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSIRMxQWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECABEhMf/aAAwDAQACEQMRAD8AyW01S6t9Ms7aOSMRwsXjBiQ8WPvuR/D6p0KVKdcVFOxns//Z"

interface OptimizedImageProps extends Omit<ImageProps, "placeholder" | "blurDataURL"> {
  /** Enable blur placeholder (default: true for images > 40px) */
  enableBlur?: boolean
  /** Custom blur data URL */
  customBlurDataURL?: string
  /** Show skeleton loader while image loads (default: true) */
  showSkeleton?: boolean
}

/**
 * OptimizedImage - A wrapper around Next.js Image with built-in optimizations
 * 
 * Features:
 * - Automatic blur placeholder for better perceived loading
 * - Skeleton loading animation while image loads
 * - WebP/AVIF format with fallbacks (configured in next.config.js)
 * - Responsive srcset generation
 * - Fade-in animation on load
 */
export function OptimizedImage({
  enableBlur = true,
  customBlurDataURL,
  showSkeleton = true,
  className = "",
  onLoad,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true)
    onLoad?.(event as any)
  }

  return (
    <>
      {/* Skeleton loader with shimmer effect - shows while image is loading */}
      {showSkeleton && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-shimmer" />
      )}
      <Image
        {...props}
        className={`${className} transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        placeholder={enableBlur ? "blur" : "empty"}
        blurDataURL={customBlurDataURL || BLUR_DATA_URL}
        onLoad={handleLoad}
      />
    </>
  )
}

