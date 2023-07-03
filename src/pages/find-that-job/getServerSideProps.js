import axios from "axios";

async function getServerSideProps(context) {
  try {
    const result = await axios.get("http://localhost:3000/api/findthatjob");
    const jobData = result.data.job.data;
    return { props: { jobData } };
  } catch (error) {
    console.error(error);
    return { props: { jobData: [] } };
  }
}

export default getServerSideProps;
