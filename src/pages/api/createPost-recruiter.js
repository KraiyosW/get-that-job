import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req, res) {
    const { method } = req;
  
    try {
      switch (method) {
        case 'POST':
          const { job_title, job_category, job_type, salary_min_range, salary_max_range, job_description, requirement, optional_requirement } = req.body;
  
          // Check if user has logged in
          const { user } = req.session || {};
  
          // If user has not logged in, return error response
          if (!user) {
            res.status(401).send({ message: 'Unauthorized' });
            return;
          }
  
          // Validate input
          if (!job_title || !job_category || !job_type || !salary_min_range || !salary_max_range || !job_description || !requirement) {
            throw new Error('Missing required input');
          }
  
          const { data, error } = await supabase.rpc('insert_job_posting', {
            // Send data as object with correct keys
            p_data: {
              email: user.email,
              job_title : job_title,
              job_category : job_category,
              job_type : job_type,
              salary_min_range: salary_min_range,
              salary_max_range: salary_max_range,
              job_description : job_description,
              requirement : requirement,
              optional_requirement : optional_requirement,
              post_status: true
            }
          });
  
          if (error) {
            throw new Error(error.message);
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