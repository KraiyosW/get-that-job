import nextConnect from 'next-connect'
import { supabase } from '../../contexts/authentication'

const handler = nextConnect()

handler.post(async (req, res) => {
    const { job_title, job_category, job_type, salary_min_range, salary_max_range, job_description, requirement, optional_requirement } = req.body
    
    const { data, error } = await supabase
      .from('jobs-postings')
      .insert({ job_title, job_category, job_type, salary_min_range, salary_max_range, job_description, requirement, optional_requirement })
      
    if (error) {
      res.status(500).json({ message: 'Error submitting form data' })
    } else {
      res.status(200).json({ message: 'Form data submitted successfully' })
    }
  })
  
  export default handler