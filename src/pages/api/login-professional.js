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
      const { user, error } = await supabase.auth.signIn({
        email,
        password
      })

      if (error) {
        res.status(400).json({ message: error.message })
      } else {
        // Query ข้อมูลจากตารางอื่น
        const { data: professionals, error: professionalsError } = await supabase
          .from('professional')
          .select('*')
          .eq('user_id', user.id)

        if (professionalsError) {
          throw new Error(professionalsError.message)
        }

        // ตรวจสอบว่ามี professional ที่เชื่อมโยงกับ user นี้หรือไม่
        if (professionals.length === 0) {
          res.status(401).json({ message: 'Unauthorized' })
        } else {
          res.status(200).json({ user })
        }
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}