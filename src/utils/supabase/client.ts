import { createBrowserClient } from "@supabase/ssr";
import { createClient as createNewClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const createClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase public env vars missing: createClient will use empty config");
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};

export const createAdminClient = () => {
  if (!supabaseUrl || !supabaseServiceRole) {
    console.warn("Supabase admin env vars missing: createAdminClient will use empty config");
  }

  return createNewClient(supabaseUrl, supabaseServiceRole, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
