import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to get or create the default user profile
export async function getOrCreateUserProfile() {
  const { data, error } = await supabase
    .from('user_profile')
    .select('*')
    .limit(1)
    .single();

  if (error && error.code === 'PGRST116') {
    // No profile exists, create one
    const { data: newProfile, error: createError } = await supabase
      .from('user_profile')
      .insert({ baseline_score: 59, weak_categories: [] })
      .select()
      .single();

    if (createError) throw createError;
    return newProfile;
  }

  if (error) throw error;
  return data;
}

