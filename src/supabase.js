import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zmcapewklezokczfibhc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptY2FwZXdrbGV6b2tjemZpYmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NzM5OTYsImV4cCI6MjAxNDI0OTk5Nn0.u225sftvG3sgXVdCic0hPKTmL8CdPJYnn6C4mWZXwYE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
