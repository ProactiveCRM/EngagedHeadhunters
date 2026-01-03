import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wgonwefnpccnismxquev.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indnb253ZWZucGNjbmlzbXhxdWV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMDMzNDIsImV4cCI6MjA2NTU3OTM0Mn0.EgodJFB06yNc8gJCFhlXCpU3sd9RQ-OOHalHZKt22t0";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);