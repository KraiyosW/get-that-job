import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function followingHandle(req, res) {
  if (req.method !== "POST") {
    res.status(400).json({ error: "Invalid request method" });
    return;
  }

  const { professional_id, job_post_id } = req.body;
  const now = new Date().toISOString();

  req.body.followed_at = now;

  const { data: allFollowingData, error: allFollowingError } = await supabase
    .from("professional_follow_jobs")
    .select("*")
    .eq("professional_id", req.body.professional_id)
    .eq("job_post_id", req.body.job_post_id);

  if (allFollowingError) {
    console.log(allFollowingError);
    throw new Error(allFollowingError.message);
  }
  // ถ้าไม่เคยกด follow มาก่อน
  if (allFollowingData.length === 0) {
    req.body.follow_status = true;
    let { data, error } = await supabase
      .from("professional_follow_jobs")
      .insert(req.body);
    if (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    } else {
      res.status(200).json({
        message: `Now following job post id : ${req.body.job_post_id}`,
      });
    }
    // ถ้าเคยกด follow ไว้อยู่แล้วจะทำการ update เปลี่ยนเป็น false
  } else if (allFollowingData[0].follow_status === true) {
    req.body.follow_status = false;
    let { data, error } = await supabase
      .from("professional_follow_jobs")
      .update({ follow_status: req.body.follow_status, followed_at: null })
      .eq("professional_id", req.body.professional_id)
      .eq("job_post_id", req.body.job_post_id);
    if (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    } else {
      res.status(200).json({
        message: `Now following job post id : ${req.body.job_post_id}`,
      });
    }
    // ถ้าเคยกด follow ไว้อยู่แล้ว และ unfollow ไป จะทำการ update เปลี่ยนเป็น true
  } else if (allFollowingData[0].follow_status === false) {
    req.body.follow_status = true;
    let { data, error } = await supabase
      .from("professional_follow_jobs")
      .update({
        follow_status: req.body.follow_status,
        followed_at: now,
      })
      .eq("professional_id", req.body.professional_id)
      .eq("job_post_id", req.body.job_post_id);
    if (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    } else {
      res.status(200).json({
        message: `Now following job post id : ${req.body.job_post_id}`,
      });
    }
  }
}