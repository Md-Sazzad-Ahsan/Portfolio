# Portfolio + Blog (Next.js)

A modern portfolio with a Markdown-powered blog built on Next.js App Router, TypeScript, and Tailwind CSS. It supports bilingual content (EN/BN), a rich Markdown editor for authoring, and PWA.

## Features

- Bilingual blog content (English and Bangla) with language toggle
- Create/Edit blog posts with a Markdown editor (live split preview)
- Robust Markdown rendering with GFM, heading anchors, and safe HTML handling
- Accessible code blocks with improved dark-mode styling
- Slug checking with smart behavior:
  - If slug exists, load that blog into the form for editing
  - If slug is new/available, preserve any user-entered data
- Blog details page with proper typography and image handling
- PWA ready (Workbox via @ducanh2912/next-pwa)

## Tech Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS (with Typography)
- MongoDB + Mongoose
- react-markdown + remark/rehype plugins
- @uiw/react-md-editor for authoring

## Prerequisites

- Node.js 22+
- Package manager: npm, yarn, pnpm, or bun
- A MongoDB connection (local or hosted)

## Local Setup

1) Install dependencies

```bash
npm install
```

2) Create an `.env.local` at the project root with placeholders (example):

```env
MONGODB_URI="<your-mongodb-connection-string>"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Optional: image provider settings, analytics, etc.
# CLOUDINARY_CLOUD_NAME="<your-cloud-name>"
# CLOUDINARY_API_KEY="<your-api-key>"
# CLOUDINARY_API_SECRET="<never-commit-this>"
```

Do NOT commit secrets. Use local env files or your host's secret manager.

3) Run dev server

```bash
npm run dev

```

Open http://localhost:3000

## Available Scripts

- `dev` – start Next.js in development
- `build` – production build
- `start` – run production server
- `lint` – lint the codebase

## Project Structure

- `app/` – routes (App Router)
- `components/` – UI components
- `models/` – Mongoose models
- `lib/` – helpers (e.g., DB connect)
- `public/` – static assets

## Blog Authoring

- The admin create/edit form lives in `components/BlogComponent/CreateBlogForm.tsx`.
- The Markdown editor is `components/BlogComponent/TextEditor.tsx`.
- Slug behavior:
  - Blur the slug field to check availability
  - If slug exists, the form loads that post for editing
  - If it’s new, your inputs are preserved and not overwritten

## Markdown Rendering

- The blog detail page at `app/blog/[slug]/page.jsx` renders content with `react-markdown` + plugins:
  - remark-gfm, rehype-slug, rehype-autolink-headings, rehype-raw
- Code blocks have improved dark-mode contrast and semantics to avoid hydration issues.

## PWA

- Configured via `@ducanh2912/next-pwa` (see `next.config.mjs`).
- Service worker is generated to `public/` during build. In dev, some PWA behaviors are limited.

## Images

- Next/Image is configured to allow Cloudinary and Google Drive URLs (see `next.config.mjs`).
- Thumbnails may be transformed for performance.

## Security Notes

- Avoid `rehype-raw` unless you trust the content source. If you need untrusted HTML, sanitize it server-side.
- Never commit credentials (DB strings, API keys). Use environment variables.

## Deployment

- Build: `npm run build`
- Start: `npm start`
- Configure environment variables in your host dashboard (do not hardcode secrets).

## Troubleshooting

- Invalid Next config errors: ensure `@ducanh2912/next-pwa` uses the curried API wrapping `nextConfig`.
- Dark mode styling: `TextEditor` and blog pages use Tailwind + targeted overrides for consistent preview.

---

Contributions and feedback are welcome!
