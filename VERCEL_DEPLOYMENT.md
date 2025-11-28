# Vercel Deployment Guide

## Environment Variables

The following environment variables are **optional** for deployment since the app uses mock data:

### Optional (for future database integration):
- `DATABASE_URL` - PostgreSQL connection string (not required for current deployment)
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name (not required)
- `CLOUDINARY_API_KEY` - Cloudinary API key (not required)
- `CLOUDINARY_API_SECRET` - Cloudinary API secret (not required)

### Required:
- `NEXT_PUBLIC_SITE_URL` - Your production site URL (e.g., `https://your-domain.vercel.app`)

## Build Settings

Vercel will automatically:
1. Run `npm install` (which triggers `postinstall` to generate Prisma client)
2. Run `npm run build` (which includes `prisma generate`)

## Notes

- The app currently uses **mock data**, so no database is required
- Prisma client is generated during build but not used at runtime
- All content is served from `src/lib/mock-data.ts`
- Contact form submissions are stored in memory (not persisted)

## Deployment Steps

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the project in Vercel
3. Add `NEXT_PUBLIC_SITE_URL` environment variable
4. Deploy!

The build should complete successfully without any database or Cloudinary setup.

