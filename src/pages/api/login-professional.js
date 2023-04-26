import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req, res) {
  const { email, password } = req.body 
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.log(error)
      res.status(400).json({ message: error.message })
    } else {
      const { data: professional, error: professionalError } = await supabase
        .from('professional')
        .select('*')
        .eq('email', email)
        .eq('role', 'professional')

      if (professionalError) {
        console.log(professionalError)
        throw new Error(professionalError.message)
      }

      console.log(data)
      // Check if there are any professional associated with this email
      if (professional.length === 0) {
        res.status(401).json({ message: 'Unauthorized' })
      } else {
        const token = data.session.access_token
        res.status(200).json({ user: data , token })
        res.setHeader('Authorization', `Bearer ${token}`)
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}