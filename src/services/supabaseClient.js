import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mwnbhlkyjcnrvhlgveko.supabase.co';
const supabaseAnonKey = 'sb_publishable_ppIsui5yabC8NNUQJEIeEQ_ZIuR8HeU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);