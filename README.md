# MLA Portfolio Website

A modern, bilingual (Hindi/English) personal portfolio website for MLAs, inspired by amitshah.co.in. Built with Next.js 14, TypeScript, TailwindCSS.

## Features

- 🌐 Bilingual support (Hindi/English)
- 🎨 Modern, responsive design with dark mode
- 📱 Mobile-first approach
- 🖼️ Photo and video galleries
- 📰 News/Press section
- 📅 Events calendar
- 🏆 Achievements showcase
- 📧 Contact form
- 🔐 Admin panel for content management
- ☁️ Mock data mode (works without database/Cloudinary)

## Quick Start (No Database Required)

The website now works with **mock data** - no database or Cloudinary setup needed!

### 1. Install dependencies
```bash
npm install
```

### 2. Set up minimal environment variables
Create a `.env` file:
```env
NEXTAUTH_SECRET="any-random-string-for-development"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Open your browser
Navigate to: `http://localhost:3000`

The site will automatically redirect to `/en` (English) or you can access:
- English: `http://localhost:3000/en`
- Hindi: `http://localhost:3000/hi`

### Admin Panel Access
- URL: `http://localhost:3000/admin/login`
- Email: `admin@mla.com`
- Password: `admin123`

**Note**: Admin login works with mock authentication. In production, you'll need to set up the database.

## Mock Data Mode

The website is currently configured to use mock data, so you can:
- ✅ View all pages and sections
- ✅ See sample news, photos, videos, events, and achievements
- ✅ Test the UI/UX
- ✅ Use admin panel (view-only, changes won't persist)

## Production Setup (With Database)

When ready for production:

1. **Set up PostgreSQL**
   ```bash
   docker-compose up -d
   ```

2. **Add database URL to `.env`**
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mla_portfolio?schema=public"
   ```

3. **Run migrations**
   ```bash
   npx prisma db push
   ```

4. **Seed database**
   ```bash
   npm run db:seed
   ```

5. **Set up Cloudinary** (for media uploads)
   ```env
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + ShadCN UI
- **Database**: PostgreSQL with Prisma ORM (optional - mock data available)
- **Authentication**: NextAuth.js (mock mode available)
- **Internationalization**: next-intl
- **Media**: Cloudinary (optional - mock uploads available)
- **Animations**: Framer Motion

## Project Structure

```
MLA-frontend/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── lib/
│   │   └── mock-data.ts  # Mock data for development
│   └── ...
├── prisma/              # Database schema (optional)
└── ...
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema (requires DB)
- `npm run db:seed` - Seed database (requires DB)

## Notes

- The website works **without a database** using mock data
- All content is viewable and the UI is fully functional
- Admin panel works for viewing (changes won't persist without DB)
- Media uploads return placeholder URLs in mock mode
- Contact form submissions are logged to console in mock mode

## License

This project is private and proprietary.
