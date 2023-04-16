import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
const supabaseKey = process.env.SUPABASE_JWT_SECRET

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body

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
        const data = await response.json()
      
        // Insert professional data to public.professional table
        const { data: useData, error: userInsertError } = await supabase
          .from('public.professional')
          .insert([{ 
            professional_id: user.id,
            email : user.email,
            password : user.password,
            role : "professional",
            name : "Kraiyos Wanna",
            phone_number : '0991499425',
            date_of_birth : "06-04-1996",
            linkedin_url : "GG",
            title : "GG",
            experience : "2 years",
            education : "ME Engineer",
            cv : "as;dj;alsdklasddasf"
          }],{ returning: 'minimal' })
      
        if (userInsertError) {
          console.log(userInsertError.message)
          res.status(400).json({ message: userInsertError.message })
        } else {
          res.status(200).json({ user })
        }
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message })
    }
  }
}
