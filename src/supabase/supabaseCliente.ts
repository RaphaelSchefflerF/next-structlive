// src/supabase/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Supabase URL ou chave SERVICE_ROLE_KEY não encontrada!");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export default supabase;
