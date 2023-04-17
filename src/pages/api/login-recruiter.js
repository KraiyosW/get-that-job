import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Get user data including role from metadata
      const { user, error: userError } = await supabase.auth.signInWithPassword({
        email,
        password,
      }, { 
        // Specify role field in metadata
        select: '*, metadata:{"role":true}'
      });

      if (userError) {
        console.error(userError);
        res.status(401).json({ message: 'Unauthorized' });
      } else {
        // Get role from metadata
        const role = user?.user_metadata?.role;
        console.log('role', role);
        if (role === 'recruiter') {
          res.status(200).json({ user });
        } else if (role !== 'recruiter') {
          console.error(error);
          res.status(401).json({ message: 'Unauthorized' });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}