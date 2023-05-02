import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const { user } = req.headers;
        
        // check if user is authenticated
        if (!user) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        // get recruiter data using email
        const { data: recruiterData, error: recruiterError } = await supabase
          .from('recruiters')
          .select('*')
          .eq('email', user);

        if (recruiterError) {
          throw new Error(recruiterError.message);
        }

        if (recruiterData.length === 0) {
          throw new Error(`Recruiter email ${user} not found`);
        }

        const recruiter = recruiterData[0];

        res.status(200).json(recruiter);
        break;

      case 'PUT':
        const { user: putUser } = req.headers;

        // check if user is authenticated
        if (!putUser) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        const {
          company_name,
          email,
          password,
          company_website,
          about_company,
          logo
        } = req.body;

        // get recruiter data using email
        const { data: recruiterDataPut, error: recruiterErrorPut } = await supabase
          .from('recruiters')
          .select('*')
          .eq('email', putUser);

        if (recruiterErrorPut) {
          throw new Error(recruiterErrorPut.message);
        }

        if (recruiterDataPut.length === 0) {
          throw new Error(`Recruiter email ${putUser} not found`);
        }

        const recruiterPut = recruiterDataPut[0];
        const recruiter_id = recruiterPut.recruiter_id;

        // update data
        const { data: newData, error: newDataError } = await supabase
          .from('recruiters')
          .update({
            company_name: company_name ?? recruiterPut.company_name,
            email: email ?? recruiterPut.email,
            password: password ?? recruiterPut.password,
            company_website: company_website ?? recruiterPut.company_website,
            about_company: about_company ?? recruiterPut.about_company,
            logo: logo ?? recruiterPut.logo,
            updated_at: new Date().toISOString()
          })
          .eq('recruiter_id', recruiter_id);

        if (newDataError) {
          throw new Error(newDataError.message);
        }

        res.send(recruiter_id);
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
