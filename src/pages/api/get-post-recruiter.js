import { getSession } from "next-auth/react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { data, error } = await supabase
    .from("recruiters")
    .select("recruiter_id")
    .eq("email", session.user.email)
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(200).json({ recruiterId: data.id });
}
