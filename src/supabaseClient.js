// supabaseClient.js
// ------------------
// This file creates and exports a single Supabase client instance.
// All other parts of the app should import this client when they need
// to talk to Supabase (for authentication or database access).

import { createClient } from '@supabase/supabase-js';

// We NEVER hardcode Supabase credentials in the source code.
// Instead, we read them from environment variables that Vite exposes.
// These variables must be defined in your `.env` file in the project root:
//
//   VITE_SUPABASE_URL=your-project-url
//   VITE_SUPABASE_ANON_KEY=your-anon-public-key
//
// The `VITE_` prefix is required so Vite can safely expose them to the browser.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Basic safety check to help beginners:
// If either variable is missing, we log a clear error in the console.
// In a production app you might want to handle this more strictly.
if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.error(
    'Supabase environment variables are missing. ' +
      'Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'
  );
}

// Create a single Supabase client using ONLY the public anon key.
// The anon key is safe to use in frontend applications and has limited permissions.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Supabase auth quick reference:
// - Google login:
//     supabase.auth.signInWithOAuth({ provider: 'google' })
// - Email + password login:
//     supabase.auth.signInWithPassword({ email, password })
// - To react to login/logout events, you can call:
//     supabase.auth.onAuthStateChange((event, session) => { ... });

