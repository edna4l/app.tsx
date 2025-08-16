import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://lderxgrocdwihfjuoxmn.supabase.co';
const supabaseKey = 'sb_publishable_n3dEksgZYRwXnFN1RONi1g_LkoKjIOA';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };