import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'PUT':
        const {
          job_post_id,
          job_title,
          job_category,
          job_type,
          salary_min_range,
          salary_max_range,
          job_description,
          requirement,
          optional_requirement,
          p_email
        } = req.body;

        // Call the RPC function update_job_posting
        await supabase.rpc('refresh_schema');

        const { data: jobId, error: rpcError } = await supabase.rpc('update_job_posting', {
          p_data: {
            job_title: job_title,
            job_category: job_category,
            job_type: job_type,
            salary_min_range: salary_min_range,
            salary_max_range: salary_max_range,
            job_description: job_description,
            requirement: requirement,
            optional_requirement: optional_requirement,
            post_status: true,
          },
          p_email: p_email,
          p_job_post_id: job_post_id,
        });

        if (rpcError) {
          throw new Error(rpcError.message);
        }

        res.send(jobId);
        break;

      default:
        res.status(405).send({ message: 'Method not allowed' });
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
}