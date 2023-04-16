import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
const supabaseKey = process.env.SUPABASE_JWT_SECRET

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, name, phone_number, date_of_birth, linkedin_url, title, experience, education, cv } = req.body

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      })
      console.log(user)
      if (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
      } else {
        // Resend email confirmation
        const response = await fetch(`${supabaseUrl}/auth/v1/verify?email=${email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${supabaseKey}`,
          },
          body: JSON.stringify({
            redirectTo: '/',
          }),
        })
        const responseData = await response.json()
      
        // Insert professional data to public.professional table
        const { data: userData, error: userInsertError } = await supabase
          .rpc('insert_professional_data', {
            email,
            password,
            name,
            phone_number,
            date_of_birth,
            linkedin_url,
            title,
            experience,
            education,
            cv,
          })
      
        if (userInsertError) {
          console.log(userInsertError.message)
          res.status(400).json({ message: userInsertError.message })
        } else {
          console.log(userData)
          res.status(200).json({ user: userData })
        }
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message })
    }
  }
}
