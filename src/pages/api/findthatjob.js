import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function FindthatJob(req, res) {
    try {
        const job = await supabase.from('jobs_postings').select('*').limit(10)
        res.statusCode = 200
        res.json({ job })

    } catch (error) {
        res.statusCode = 500
        res.json({ error: error.message })
    }
};


// import nextConnect from 'next-connect'
// const handler = nextConnect()
// handler.get(async (req, res) => {
//     const { data, error } = await supabase
//         .from('job_test')
//         .find('*')

//     if (error) {
//         res.status(500).json({ data })
//     } else {
//         res.status(200).json({ message: 'Form data submitted successfully' })
//     }
// })

// export default handler

// try {
//     const { method } = req;
//     switch (method) {
//         case 'GET':
//             const result = await supabase.rpc('find_job_test');
//             res.status(200).send({ result });
//             break;
//         default:
//             res.status(405).send({ message: 'Method Not Allowed' });
//             break;
//     }
// } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Server error' });
// }