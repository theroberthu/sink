# Sink Cabinet Fix launch readiness

A practical checklist for taking the MVP from preview to production. This documents
the current build only and does not change app behavior.

## Environment variables

Set these in Vercel (Project Settings, Environment Variables) and in `.env.local`
for local work. See `.env.example` for the template.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | For data writes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For data writes | Supabase anon key |
| `NEXT_PUBLIC_POSTHOG_KEY` | Optional | Analytics key. If unset, events log to the console in development |
| `NEXT_PUBLIC_POSTHOG_HOST` | Optional | Analytics host |

The app runs without any of these. Supabase writes and analytics fail gracefully
when the keys are missing, so forms still show success states for validation.

## Supabase setup

1. Create a Supabase project.
2. Open the SQL editor and run `supabase/schema.sql`. It creates five tables:
   `sessions`, `product_clicks`, `email_captures`, `waitlist`, `products`, plus
   row level security with anon insert policies and a public read on active products.
3. Copy the project URL and anon key into the environment variables above.
4. Note: `waitlist.email` is `not null`. For an existing table with null emails,
   backfill or remove those rows before altering the column. The frontend already
   requires a valid email.

Data writes go through `src/lib/tracking.ts`. Analytics events go through
`src/lib/analytics.ts`. Both no-op safely when env vars are missing.

## Where product data lives

- Placeholder catalog: `src/data/products.ts`. Each mess type has one product per
  role (Access, Protection, Control), and a role may have more than one product so
  there is a fallback. Fields: id, messType, role, componentType, productName,
  reason, retailer, asin (optional), affiliateUrl (optional), price, viewLabel,
  status, priority, notes (optional).
- `status` is one of active, backup, out_of_stock, paused. out_of_stock and paused
  are never shown.
- Selection logic: `getBestProduct(messType, role)` filters by mess type and role,
  drops out_of_stock and paused, sorts by priority ascending, and returns the first,
  or null. `getSetupPicks(messType)` returns the one pick per role in display order.
- Affiliate links: `getFinalAffiliateUrl(product)` returns a tagged Amazon /dp/ link
  when retailer is Amazon and an asin exists (tag `sinkcabinetfi-20`), otherwise the
  explicit affiliateUrl. Placeholder ASINs and URLs ship today; replace before launch.
- If a role has no available product, the UI shows a Temporarily unavailable card and
  keeps exactly three roles visible.
- The shape mirrors the Supabase `products` table so it can later be swapped for a
  database query without changing call sites.
- Mess type copy and the 3 piece component order live in `src/data/messTypes.ts`.
  Goals live in `src/data/goals.ts`. FAQ lives in `src/data/faq.ts`.

## Where image assets live

- Files: `public/images/`. See `public/images/README.md` for the expected
  filenames and aspect ratios.
- Central config: `src/lib/images.ts` (source path, alt text, label, tone).
- `src/components/AssetImage.tsx` loads the real file and falls back to a styled
  placeholder if it is missing, with no layout shift and no broken image icon.
- The eight production images are committed: hero before and after, three mess
  type images, and three component images.

## Vercel deployment notes

- Framework preset is pinned in `vercel.json` (`"framework": "nextjs"`).
- Production branch should be `main`. Push or merge to `main` to deploy production;
  other branches get preview deployments.
- A successful build is the deploy gate. Run `npm run build` locally first.
- `next/font` fetches Geist or Manrope at build time, so the build needs outbound
  access to Google Fonts (available by default on Vercel).

## Analytics events to test

Open the browser console in development (events log there when PostHog is unset)
and confirm each fires:

| Event | Trigger |
| --- | --- |
| `landing_page_viewed` | Homepage loads |
| `find_fix_clicked` | Any Find My Cabinet Fix or That's mine CTA |
| `mess_type_selected` | Selecting a mess type in the tool |
| `result_viewed` | Fix page loads |
| `goal_selected` | Changing the goal on the fix page |
| `fit_check_viewed` | Fit check becomes visible |
| `product_clicked` | View product button. Includes mess_type, goal, setup_name, role, component_type, product_name, retailer, final_affiliate_url, product_status, priority |
| `email_submitted` | Send Me This Plan submit |
| `waitlist_started` | First focus in the waitlist form |
| `waitlist_submitted` | Join the Kit Waitlist submit. Includes email, desired_kit, target_price, top_priority, mess_type, goal |

## Manual QA checklist

- [ ] Homepage loads and the hero before and after images appear
- [ ] Homepage mess cards show once per breakpoint, no duplicates on mobile or desktop
- [ ] `/tool` step 1 shows three mess cards, easy to tap on mobile
- [ ] Selecting a mess goes straight to the fix page
- [ ] Goal selector defaults to Easy Reach and updates without navigating away
- [ ] Result shows exactly three product cards with Access, Protection, Control
- [ ] An out_of_stock or paused product is never shown; its role falls back to the
      next priority, or shows Temporarily unavailable if none are left
- [ ] View product opens one tagged affiliate link in a new tab, only one tab
- [ ] Send Me This Plan requires a valid email and shows the success message
- [ ] Join the Kit Waitlist requires a valid email and shows the success message
- [ ] Three legal pages load: privacy, terms, affiliate disclosure
- [ ] No copy contains an em dash
- [ ] `npm run build`, `npm run lint`, and `npm run typecheck` all pass

## Known limitations

- Affiliate URLs and Amazon ASINs are placeholders. The Amazon tag is wired
  (`sinkcabinetfi-20`) but the ASINs are not real, so links will not resolve until
  replaced.
- No checkout, no cart, no accounts. Affiliate first validation only.
- Supabase is optional in this build. Without it, captures are not persisted.
- Product catalog is static in code, not yet served from Supabase.
- Real cabinet photography is in place, but product images are not yet wired per card.

## Next phase backlog

- Replace placeholder affiliate URLs with real tagged links.
- Move the product catalog into the Supabase `products` table and read from it.
- Add per product images to the product cards.
- Wire a real analytics provider (PostHog or GA4).
- Add an admin or export path for captured emails and waitlist entries.
- Consider a real kit offering once waitlist demand is validated.
