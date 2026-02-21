import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qcjpsalbhdmssqxfwqgw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjanBzYWxiaGRtc3NxeGZ3cWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2ODcxMjYsImV4cCI6MjA4NzI2MzEyNn0.rXt6nLOfp8Nq0ko3SaXouip7YzcZPisqyv-0aQCxFOY';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
