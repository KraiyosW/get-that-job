import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'POST':
        const { job_title, job_category, job_type, salary_min_range, salary_max_range, job_description, requirement, optional_requirement } = req.body;

        // Check if access token exists in headers
        const {token} = req.body;
        if (!token) {
          res.status(401).send({ message: 'Unauthorized. Please provide an access token.' });
          return;
        }

        const { data: user, error } = await supabase.auth.api.getUser(token.replace('Bearer ', ''));

        if (error) {
          throw new Error(error.message);
        }
        
        // If user has not logged in, return error response
        if (!user) {
          res.status(401).send({ message: 'Unauthorized. Please login before creating a job posting.' });
          return;
        }

        // Validate input
        if (!job_title || !job_category || !job_type || !salary_min_range || !salary_max_range || !job_description || !requirement) {
          throw new Error('Missing required input');
        }

        const { data: recruiter, error: recruiterError } = await supabase
          .from('recruiters')
          .select('id, role')
          .eq('email', user.email)
          .single();

        if (recruiterError) {
          throw new Error(recruiterError.message);
        }

        if (!recruiter || recruiter.role !== 'recruiter') {
          res.status(401).send({ message: `Recruiter email ${user.email} not found or invalid role` });
          return;
        }

        const { data, error: insertError } = await supabase
          .from('jobs_postings')
          .insert({
            recruiter: recruiter.id,
            job_title,
            job_category,
            job_type,
            salary_min_range,
            salary_max_range,
            job_description,
            requirement,
            optional_requirement,
            post_status: true, // Set default post status to true
          })
          .single();

        if (insertError) {
          throw new Error(insertError.message);
        }

        res.send(data);
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
