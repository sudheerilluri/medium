import { createClient } from '@supabase/supabase-js';

//const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
//const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkbWFvc2lld3J5cWhyaGlva2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1NzU0MDQsImV4cCI6MjAzODE1MTQwNH0.OgmuzSKp0R1Ic-LDdoNLgAPKTFFq_BRI8gc0PV9Yv78';

export const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);
