
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qwtblctmidzxstxpuzxu.supabase.co';
const supabaseKey = 'sb_publishable_iTQMrFwJ5XdtlKA3I-x25g__o3OMd14';

export const supabase = createClient(supabaseUrl, supabaseKey);
