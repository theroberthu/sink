# Sink Cabinet Fix

Affiliate first validation site. Pick an under sink mess type, pick a goal, get a 3 piece
kitchen sink reset plan. No checkout, no accounts in V1.

## Stack
Next.js App Router, TypeScript, Tailwind CSS, Supabase. Deploys on Vercel.

## Commands
- `npm run dev` dev server
- `npm run build` production build
- `npm run lint` lint
- `npm run typecheck` TypeScript check

Run `npm run typecheck` and `npm run lint` before committing.

## Layout
- `src/app` routes, layout, sitemap, robots
- `src/components` reusable UI; semantic names so a design system can swap styling later
- `src/data` placeholder content: mess types, goals, products, FAQ
- `src/lib` supabase client, analytics wrapper, tracking, session id, shared types
- `supabase/schema.sql` table definitions

## Conventions
- Keep exactly 3 choices at any major decision point (mess types, goals, kit options).
- Do not use em dashes anywhere in copy.
- Brand voice: funny, practical, simple, lightly 90s infomercial, still trustworthy.
- Styling is intentionally minimal placeholder Tailwind. Do not build a full design
  system yet; keep components semantic and easy to restyle.
- Supabase and analytics must fail gracefully when env vars are missing (never crash the
  user flow). New writes go through `src/lib/tracking.ts`; new events through
  `src/lib/analytics.ts`.
- Content pages stay server rendered for SEO. Use small client components
  (`PageViewTracker`, `TrackedCTALink`) for client side events.
