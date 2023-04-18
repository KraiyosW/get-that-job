import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
      } else {
        // ตรวจสอบว่า user นั้นมีสิทธิ์เป็น professional หรือไม่
        const { data: professional, error: professionalError } = await supabase
          .from('professional')
          .select('*')
          .eq('email', email)
          .eq('role', 'professional')

        if (professionalError) {
          console.log(professionalError)
          throw new Error(professionalError.message)
        }
      
        // ตรวจสอบว่ามี professional ที่เชื่อมโยงกับ email นี้หรือไม่
        if (professional.length === 0) {
          res.status(401).json({ message: 'Unauthorized' })
        } else {
          res.status(200).json({ user })
        }
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}