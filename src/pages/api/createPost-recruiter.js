import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseSecret = process.env.JWT_SECRET;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'POST':
        const { job_title, job_category, job_type, salary_min_range, salary_max_range, job_description, requirement, optional_requirement } = req.body;

        // Check if access token exists in headers
        const authToken = req.headers.authorization?.split(' ')[1]?.trim();
        if (!authToken) {
          res.status(401).send({ message: 'Unauthorized. Please provide an access token.' });
          return;
        }

        // Verify access token and get user email
        const decodedToken = jwt.verify(authToken, supabaseSecret);
        const userEmail = decodedToken?.user_email;
        if (!userEmail) {
          res.status(401).send({ message: 'Invalid access token' });
          return;
        }

        // Call the RPC function insert_job_posting
        const { data: jobId, error: rpcError } = await supabase.rpc('insert_job_posting', {
          p_data: {
            job_title: job_title,
            job_category: job_category,
            job_type: job_type,
            salary_min_range: salary_min_range,
            salary_max_range: salary_max_range,
            job_description: job_description,
            requirement: requirement,
            optional_requirement: optional_requirement,
            post_status: true
          },
          p_email: userEmail
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