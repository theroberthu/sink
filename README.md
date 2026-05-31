# Sink Cabinet Fix

> Your sink cabinet should not fight back.

MVP foundation for [SinkCabinetFix.com](https://www.sinkcabinetfix.com). Pick the under
sink mess that looks most like yours and get a simple 3 piece kitchen sink reset plan in
under a minute.

This is an affiliate first validation build. The site recommends curated products and
tracks product clicks. There is no checkout in V1.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS (intentionally minimal, a design system comes later)
- Supabase (data + capture)
- Deployable on Vercel

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values when you have them
npm run dev
```

The app runs without Supabase configured. Forms and tracking fail gracefully and log in
development when env vars are missing.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | for data writes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | for data writes | Supabase anon key |
| `NEXT_PUBLIC_POSTHOG_KEY` | optional | Analytics (falls back to console logs) |
| `NEXT_PUBLIC_POSTHOG_HOST` | optional | Analytics host |

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage |
| `/kitchen-sink-reset` | Main SEO landing page (has FAQ schema) |
| `/kitchen-sink-reset/bottle-avalanche` | Mess type page |
| `/kitchen-sink-reset/pipe-maze` | Mess type page |
| `/kitchen-sink-reset/tiny-cabinet-energy` | Mess type page |
| `/under-sink-organizer-measurement-guide` | Measurement guide |
| `/tool` | Interactive 3 step recommendation tool |
| `/privacy`, `/terms`, `/affiliate-disclosure` | Legal |

## Project structure

```
src/
  app/         Routes, layout, sitemap, robots
  components/  Reusable UI (Header, Footer, cards, forms, tool flow)
  data/        Mess types, goals, products, FAQ (placeholder catalog)
  lib/         Supabase client, analytics, tracking, session, types
supabase/
  schema.sql   Tables: sessions, product_clicks, email_captures, waitlist, products
```

## Database

See [`supabase/schema.sql`](./supabase/schema.sql). Run it in the Supabase SQL editor to
create the five tables with anon insert policies.

## Scripts

- `npm run dev` start the dev server
- `npm run build` production build
- `npm run lint` lint
- `npm run typecheck` TypeScript check
