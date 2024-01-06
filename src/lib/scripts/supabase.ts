import { createClient } from "@supabase/supabase-js";
import { PUBLIC_DB_KEY, PUBLIC_DB_URL } from "$env/static/public";

export const supabase = createClient(
    PUBLIC_DB_URL,
    PUBLIC_DB_KEY
);