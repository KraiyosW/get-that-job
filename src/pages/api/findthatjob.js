import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function FindthatJob(req, res) {
  const { profid } = req.query;

  try {
    const job = await supabase
      .from("jobs_postings")
      .select(
        "*, professional_follow_jobs ( professional_id,job_post_id, follow_status )"
      )
      .eq("professional_follow_jobs.professional_id", profid);

    res.statusCode = 200;
    res.json({ job });
  } catch (error) {
    res.statusCode = 500;
    res.json({ error: error.message });
  }
}

// const searchMessage = req.query.title || "";
// const category = req.query.category || "";
// const selectedJobType = req.query.type || "";

// console.log(category);

// let query = supabase.from("jobs_postings").select();

// if (searchMessage) {
//     query = query.ilike("job_title", `%${searchMessage}%`);
// }

// if (category) {
//     query = query.eq("job_category", category);
// }

// if (selectedJobType) {
//     query = query.eq("job_type", selectedJobType);
// }

// const { data, error } = await query;

// if (error) {
//     res.status(500).json({ error: "An error occurred while fetching jobs." });
// } else {
//     res.status(200).json({ jobs: data });
// }

// const searchMessage = req.query.title || "";
// const category = req.query.category || "";
// const selectedJobType = req.query.job_type || "";
// const { data: result } = await supabase.from("jobs_postings").select().eq("job_category", category)
// return (
//     res.json(searchMessage)
// )
// return (
//     res.json({ data: result })
// )

// let query = supabase.from("jobs_postings").select("*");

// if (searchMessage) {
//     query = query.where("job_title", "ilike", `%${searchMessage}%`);
// }
// if (selectedOption) {
//     query = query.where("job_category", selectedOption);
// }
// if (selectedJobType) {
//     query = query.where("job_type", selectedJobType);
// }

// try {
//     const { data } = await query.exec();

//     res.status(200).json({
//         data,
//     });
// } catch (error) {
//     res.status(500).json({ error: error.message });
// }

// const searchMessage = req.query.job_title || "";
// const selectedOption = req.query.job_category || "";
// const selectedJobType = req.query.job_type || "";

// let query = supabase.from("jobs_postings").select("*");

// if (searchMessage) {
//     query = query.where("job_title", "ilike", `%${searchMessage}%`);
// }
// if (selectedOption) {
//     query = query.where("job_category", selectedOption);
// }
// if (selectedJobType) {
//     query = query.where("job_type", selectedJobType);
// }

// try {
//     const { data } = await query.exec();

//     res.status(200).json({
//         data,
//     });
// } catch (error) {
//     res.status(500).json({ error: error.message });
// }

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