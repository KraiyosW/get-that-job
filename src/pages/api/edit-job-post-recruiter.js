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

        // get recruiter_id using email
        const { data: recruiterData, error: recruiterError } = await supabase
          .from('recruiters')
          .select('recruiter_id')
          .eq('email', p_email);

        if (recruiterError) {
          throw new Error(recruiterError.message);
        }

        if (recruiterData.length === 0) {
          throw new Error(`Recruiter email ${p_email} not found`);
        }

        const recruiter_id = recruiterData[0].recruiter_id;

        // get old data
        console.log('job_post_id:', job_post_id);
        console.log('recruiter_id:', recruiter_id);

            const { data: oldData, error: oldDataError } = await supabase
              .from('jobs_postings')
              .select('*')
              .eq('job_post_id', job_post_id)
              .eq('recruiter_id', recruiter_id);

            console.log('oldData:', oldData);
            console.log('oldDataError:', oldDataError);

        if (oldDataError) {
          throw new Error(oldDataError.message);
        }

        if (oldData.length === 0) {
          throw new Error(`Job posting with ID ${job_post_id} not found for recruiter with email ${p_email}`);
        }

        const oldDataRecord = oldData[0];

        // update data
        const { data: newData, error: newDataError } = await supabase
          .from('jobs_postings')
          .update({
            job_title: job_title ?? oldDataRecord.job_title,
            job_category: job_category ?? oldDataRecord.job_category,
            job_type: job_type ?? oldDataRecord.job_type,
            salary_min_range: salary_min_range ?? oldDataRecord.salary_min_range,
            salary_max_range: salary_max_range ?? oldDataRecord.salary_max_range,
            job_description: job_description ?? oldDataRecord.job_description,
            requirement: requirement ?? oldDataRecord.requirement,
            optional_requirement: optional_requirement ?? oldDataRecord.optional_requirement,
            updated_at: new Date().toISOString(),
            post_status: true
          })
          .eq('job_post_id', job_post_id)
          .eq('recruiter_id', recruiter_id);

        if (newDataError) {
          throw new Error(newDataError.message);
        }

        res.send(job_post_id);
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
