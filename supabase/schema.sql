-- Sink Cabinet Fix schema (V1).
-- Run this in the Supabase SQL editor, or via the Supabase CLI as a migration.
-- These tables back the tracking and capture functions in src/lib/tracking.ts.
-- RLS is enabled with anon insert policies so the public anon key can write
-- captures and clicks, while reads stay restricted.

create extension if not exists "pgcrypto";

-- 1. sessions: one row per anonymous tool session snapshot.
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  mess_type text,
  goal text,
  result_type text,
  created_at timestamptz not null default now()
);

-- 2. product_clicks: every affiliate product click.
create table if not exists public.product_clicks (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  mess_type text,
  goal text,
  component_type text,
  product_name text,
  retailer text,
  affiliate_url text,
  clicked_at timestamptz not null default now()
);

-- 3. email_captures: "Send My Plan" submissions.
create table if not exists public.email_captures (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  mess_type text,
  goal text,
  result_type text,
  created_at timestamptz not null default now()
);

-- 4. waitlist: kit waitlist submissions. Email is optional.
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text,
  desired_kit text not null,
  target_price text not null,
  top_priority text not null,
  mess_type text,
  goal text,
  created_at timestamptz not null default now()
);

-- 5. products: curated catalog. Affiliate URLs can later be served from here.
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  product_name text not null,
  component_type text not null,
  mess_type text not null,
  retailer text not null,
  price text not null,
  affiliate_url text not null,
  image_url text,
  notes text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Row Level Security.
alter table public.sessions enable row level security;
alter table public.product_clicks enable row level security;
alter table public.email_captures enable row level security;
alter table public.waitlist enable row level security;
alter table public.products enable row level security;

-- Allow anonymous inserts for capture and tracking tables.
create policy "anon insert sessions" on public.sessions
  for insert to anon with check (true);

create policy "anon insert product_clicks" on public.product_clicks
  for insert to anon with check (true);

create policy "anon insert email_captures" on public.email_captures
  for insert to anon with check (true);

create policy "anon insert waitlist" on public.waitlist
  for insert to anon with check (true);

-- Products are public read only for the anon role; active rows only.
create policy "anon read active products" on public.products
  for select to anon using (active = true);
