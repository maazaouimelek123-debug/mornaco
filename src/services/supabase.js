import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL =
  import.meta.env?.VITE_SUPABASE_URL || 'https://mlwtfapdmiiebghkbssy.supabase.com'

// Configurable via VITE_SUPABASE_ANON_KEY env variable or publishable token
export const SUPABASE_ANON_KEY =
  import.meta.env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Bo7bbgtuJJgX3Prl5x_mnw_3cizbkvs'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
