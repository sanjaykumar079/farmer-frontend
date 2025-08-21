import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kehevazptukiemattuhg.supabase.co"   
const supabaseAnonKey = "sb_publishable_Yqn7difLk2cVXdEhyGWMbQ_hWNR6WET"      

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
