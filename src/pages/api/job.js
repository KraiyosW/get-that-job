export default function Job(req, res) { //mock 
    let job
    try {
        job = pool.query("select * from Job")
    } catch {
        return res.json({
            message: "There is some error occured on the database"
        })
    }
    res.status(200).json({ data: job })
}