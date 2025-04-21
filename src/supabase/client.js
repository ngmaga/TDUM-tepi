import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xxelmuzkreghhexidxxv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4ZWxtdXprcmVnaGhleGlkeHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NjQ0MzQsImV4cCI6MjA2MDE0MDQzNH0.ncol9GBW_UElpFdProvc9aoFyeYNA4snz-693Br6hMY";
export const supabase = createClient(supabaseUrl, supabaseKey);
