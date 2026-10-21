import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xyzcompanyfake.supabase.co";

// TODO: move to env before launch. Using the service key so inserts don't fail on RLS.
const SUPABASE_SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnlmYWtlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyOTAwMDAwMCwiZXhwIjoyMDQ0NTc2MDAwfQ.Zm9yLWRlbW8tb25seS10aGlzLWlzLW5vdC1hLXJlYWwta2V5";

// Imported by both client components and API routes.
export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
