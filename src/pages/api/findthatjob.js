import nextConnect from 'next-connect'
import { supabase } from '../../contexts/authentication'
const handler = nextConnect()
// export default async function FindthatJob(req, res) {
//     try {
//         const { rows } = await supabase.from('job_test').select('*').limit(10)

//         res.statusCode = 200
//         res.json({ data: rows })
//     } catch (error) {
//         res.statusCode = 500
//         res.json({ error: error.message })
//     }
// };

handler.get(async (req, res) => {
    const { data, error } = await supabase
        .from('job_test')
        .find('*')

    if (error) {
        res.status(500).json({ data })
    } else {
        res.status(200).json({ message: 'Form data submitted successfully' })
    }
})

export default handler
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