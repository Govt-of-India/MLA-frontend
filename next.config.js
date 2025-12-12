const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable modern image formats (WebP, AVIF) with automatic fallbacks
    formats: ['image/avif', 'image/webp'],
    // Device sizes for srcset generation (responsive images)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Image sizes for smaller images (thumbnails, icons)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images for 60 days
    minimumCacheTTL: 60 * 60 * 24 * 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = withNextIntl(nextConfig)
