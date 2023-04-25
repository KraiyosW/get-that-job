import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseSecret = process.env.SUPABASE_JWT_SECRET

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'POST':
        const { job_title, job_category, job_type, salary_min_range, salary_max_range, job_description, requirement, optional_requirement } = req.body;

        // Check if access token exists in headers
        const authToken = req.headers.authorization?.split(' ')[1];
        if (!authToken) {
          res.status(401).send({ message: 'Unauthorized. Please provide an access token.' });
          return;
        }

        const decoded = jwt.verify(authToken, supabaseSecret, { ignoreExpiration: false });
        if (!decoded || !decoded.user || !decoded.user.email) {
          res.status(401).send({ message: 'Invalid access token' });
          return;
        }

        const user = decoded.user;

        console.log(user);

        const { data: recruiters, error: recruitersError } = await supabase
          .from('recruiters')
          .select('id, role')
          .eq('email', user.email)
          .single();

        if (recruitersError) {
          throw new Error(recruitersError.message);
        }

        if (!recruiters || recruiters.role !== 'recruiter') {
          res.status(401).send({ message: `Recruiter email ${email} not found or invalid role` });
          return;
        }

        const { data, error: insertError } = await supabase
          .from('jobs_postings')
          .insert({
            recruiter_id: recruiters.id,
            job_title : job_title,
            job_category : job_category,
            job_type : job_type,
            salary_min_range : salary_min_range,
            salary_max_range : salary_max_range,
            job_description : job_description,
            requirement : requirement,
            optional_requirement : optional_requirement,
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