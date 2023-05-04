// import axios from "axios";
// import { useState } from "react";

// const useJobs = () => {
//     const [job, setJob] = useState([])
//     const getJobs = async (input) => {
//         const { searchMessage, category, selectedJobType } = input;
//         try {
//             const query = new URLSearchquery();
//             query.append("title", searchMessage);
//             query.append("category", category);
//             query.append("type", selectedJobType);
//             const result = await axios.get(`http://localhost:3000/api/findthatjob?query=${query.toString()}`)
//             setJob(result.data.job.data);
//         } catch (error) {

//         }
//         ;
//     };

//     return {
//         getJobs,
//         job
//     };
// }

// export default useJobs
    // import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const allJobs = () => {
//     const [job, setJob] = useState([]);
//     const [isError, setIsError] = useState(null);
//     const [isLoading, setIsLoading] = useState(null);

    // const getJobs = async (input) => {
    //     const { title, category, type } = input;
    //     try {
    //         const params = new URLSearchParams();
    //         params.append("title", title);
    //         params.append("category", category);
    //         params.append("type", type);
    //         setIsError(false);
    //         setIsLoading(true);
    //         const result = await axios.get(`http://localhost:3000/api/findthatjob?${params.toString()}`)
    //         setJob(result.data.job.data);
    //         setIsLoading(false);
    //     } catch (error) {
    //         setIsError(true);
    //         setIsLoading(false);
    //     }
    // };


    // return {
    //     getJobs

    // };
// };

// export default allJobs;


