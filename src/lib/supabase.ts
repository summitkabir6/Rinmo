// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Server-only client using the service role key — never import this in client components
export function createServerClient() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Missing Supabase environment variables. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  })
}
