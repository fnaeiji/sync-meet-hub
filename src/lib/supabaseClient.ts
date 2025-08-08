import { createClient } from "@supabase/supabase-js";

// Public creds provided by user
const supabaseUrl = "https://gcpyyuwqagfrnbsawqna.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjcHl5dXdxYWdmcm5ic2F3cW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NTY0MzIsImV4cCI6MjA3MDIzMjQzMn0.E8ZubVjoAk4eNRoN5HvTmVPezdIG2e7i-fGxS8g6Ylg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
