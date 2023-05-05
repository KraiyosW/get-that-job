import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function FollowingPage(req, res) {
  const { profid } = req.query;

  try {
    const job = await supabase
      .from("professional_follow_jobs")
      .select(
        "*, jobs_postings (job_post_id,recruiter_id,job_title,job_category,job_type,salary_min_range,salary_max_range,job_description,requirement,optional_requirement)"
      )

      .eq("professional_id", profid)
      .eq("follow_status", true);

    res.statusCode = 200;
    res.json({ job });
  } catch (error) {
    res.statusCode = 500;
    res.json({ error: error.message });
  }
}