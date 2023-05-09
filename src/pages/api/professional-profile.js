import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function ProfessionalProfile(req, res) {

    try {
        const job = await supabase.from('professional').select('*')
        res.statusCode = 200
        res.json({ job })

    } catch (error) {
        res.statusCode = 500
        res.json({ error: error.message })
    }

}