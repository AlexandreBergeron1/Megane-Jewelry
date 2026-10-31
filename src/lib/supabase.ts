import { createClient } from "@supabase/supabase-js";

// Public client, safe for the browser (reads only via RLS)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

// Server-only client with write access. Never import this in a client component.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_SECRET_KEY!,
  { auth: { persistSession: false } }
);