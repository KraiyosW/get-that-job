import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { parseCookies, setCookie } from 'nookies'


dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function handler(req, res) {
  const { email, password } = req.body

  try {
    const { user, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.log(error)
      res.status(400).json({ message: error.message })
    } else {
      // Check if user is a recruiter
      const { data: recruiters, error: recruitersError } = await supabase
        .from('recruiters')
        .select('*')
        .eq('email', email)
        .eq('role', 'recruiter')

      if (recruitersError) {
        console.log(recruitersError)
        throw new Error(recruitersError.message)
      }

      // Check if there are any recruiters associated with this email
      if (recruiters.length === 0) {
        res.status(401).json({ message: 'Unauthorized' })
      } else {
        const cookies = parseCookies({ req })

        // If no session, refresh it and send it back in HTTP response header
        if (!cookies['sb:token']) {
          const { data: session, error: sessionError } = await supabase.auth.getSession()
          if (sessionError) {
            console.log(sessionError)
            throw new Error(sessionError.message)
          }

          setCookie({ res }, 'sb:token', session.access_token, {
            maxAge: session.expires_in,
            path: '/',
            domain: process.env.NEXTAUTH_URL,
            sameSite: 'lax'
          })
          res.setHeader('Authorization', `Bearer ${session.access_token}`)
        } else {
          res.setHeader('Authorization', `Bearer ${cookies['sb:token']}`)
        }

        res.status(200).json({ user })
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}