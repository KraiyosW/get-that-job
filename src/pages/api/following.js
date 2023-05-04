import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function followingHandle(req, res) {
  //   try {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Invalid request method" });
    return;
  }
  const { professional_id, job_post_id, follow_status, followed_at } = req.body;
  req.body.followed_at = new Date();

  let { data, error } = await supabase
    .from("professional_follow_jobs")
    .insert({ professional_id, job_post_id, follow_status, followed_at });
  if (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  } else {
    console.log(data);
    res
      .status(200)
      .json({ message: `Now following job post id : ${req.body.job_post_id}` });
  }
}
