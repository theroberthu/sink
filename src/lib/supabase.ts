import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Supabase integration placeholder.
// If env vars are missing we return null and callers fail gracefully (see tracking.ts).

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let cachedClient: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

/**
 * Returns a shared Supabase client, or null if the project is not yet configured.
 * Callers must handle the null case so the app never crashes without credentials.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!cachedClient) {
    cachedClient = createClient(supabaseUrl as string, supabaseAnonKey as string);
  }
  return cachedClient;
}
