import { createClient } from '@supabase/supabase-js'
import { hash } from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {company_name , email, password, company_website, about_company , logo } = req.body

    try {
      const hashedPassword = await hash(password, 10)

      const { user, error } = await supabase.auth.signUp({
        email,
        password,
        app_metadata: {
          role: 'recruiter'
        }
      })

      console.log(user)
      if (error) {
        res.status(400).json({ message: error.message })
      } else {
        // Check if email is confirmed
        if (user && !user.confirmed_at) {
          return res.status(400).json({ message: 'Email is not confirmed' })
        }

        let { data, error: insertError } = await supabase.from('recruiters').insert({
          company_name : company_name,
          email : email,
          password: hashedPassword,
          role : 'recruiter',
          company_website : company_website,
          about_company : about_company,
          logo : logo
        }, { returning: 'minimal' })

        if (insertError) {
          console.error(insertError.message)
          res.status(400).json({ message: insertError.message })
        } else {
          console.log(data)
          res.status(200).json({ user: data })
        }
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message })
    }
  }
}

