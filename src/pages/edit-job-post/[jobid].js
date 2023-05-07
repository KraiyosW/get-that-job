import React, { useState, useEffect } from "react";
import { useRecruiterPost } from "@/hooks/recruiterPost.js";
import { useRouter } from "next/router";
import SideBarRecruiter from "@/components/SidebarRecruiter.js";
import { useAuth } from "@/contexts/authentication";
import { createClient } from "@supabase/supabase-js";
import Warning from "@/components/Warning";
import { useToast, Box } from '@chakra-ui/react'
import PageNotFound from "@/components/PageNotFound";



const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);


function EditJobPost() {
  // ใช้ custom hook จาก useRecruiterPost และ useAuth
  const { editJobPost, isLoading, isError } = useRecruiterPost();
  const { recruiterState } = useAuth();
  const [post, setPost] = useState({})
  // สร้าง state สำหรับเก็บข้อมูล option ที่เลือก
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [myState, setMyState] = useState("");
  const [loading, setLoading] = useState(true);
  const userEmail = recruiterState.email;
  const router = useRouter();
  const toast = useToast();
  const id = router.query["jobid"]
  console.log(id)


  // สร้าง state สำหรับเก็บข้อมูลจากฟอร์ม
  const [formData, setFormData] = useState({
    job_title: "",
    job_category: "",
    job_type: "",
    salary_min_range: "",
    salary_max_range: "",
    job_description: "",
    requirement: "",
    optional_requirement: "",
    p_email: userEmail,
  });
  console.log(userEmail)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return; // check if id is null or undefined

        const posts = await supabase
          .from("jobs_postings")
          .select(`*, recruiters (*)`)
          .eq("job_post_id", Number(id))
          .single();

        if (!posts.data) return; // check if post is undefined or null

        setPost(posts.data);
        setLoading(false);

        setFormData({
          ...formData,
          job_post_id: posts.data.job_post_id,
          job_title: posts.data.job_title,
          job_category: posts.data.job_category,
          job_type: posts.data.job_type,
          salary_min_range: posts.data.salary_min_range,
          salary_max_range: posts.data.salary_max_range,
          job_description: posts.data.job_description,
          requirement: posts.data.requirement,
          optional_requirement: posts.data.optional_requirement,
          p_email: posts.data.recruiters.email
        });

        setSelectedOption(posts.data.job_category);
        setSelectedJobType(posts.data.job_type);
      } catch (error) {
        console.log(error);
      }
    };
    const token = localStorage.getItem("sb:token");
    setIsAuthenticated(!!token);


    fetchData();
  }, [id, userEmail, isAuthenticated]);

  console.log(post)


  // ฟังก์ชั่นสำหรับการเปลี่ยนค่าใน form
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      job_category: selectedOption,
      job_type: selectedJobType,
    });
  };

  // ฟังก์ชั่นสำหรับการเลือก option ของ job category
  const handleSelectOption = (event) => {
    setSelectedOption(event.target.value);
    setFormData({
      ...formData,
      job_category: event.target.value,
    });
  };

  // ฟังก์ชั่นสำหรับการเลือก option ของ job type
  const handleSelectJobType = (event) => {
    setSelectedJobType(event.target.value);
    setFormData({
      ...formData,
      job_type: event.target.value,
    });
  };

  if (isLoading) {
    return (
      <div className="bg-[#F5F5F6] h-screen"></div>
    );
  }
  if (!isAuthenticated) {
  return (
    <Warning />
  );
}


  // ฟังก์ชั่นสำหรับการ submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const authToken = JSON.stringify(localStorage.getItem('sb:token'));
      const response = await editJobPost(formData, authToken);
      console.log(response);
      toast({
        position: "top",
        render: () => (
          <Box
            className="bg-pink-primary flex flex-col justify-center text-center"
            p={3}
            color="white"
            borderRadius="md"
            boxShadow="md"
          >
            <div>Job Edited .</div>
            <div>Your job has been successfully edited.</div>
          </Box>
        ),
        duration: 3000,
        isClosable: true,
      });
      router.push('/job-postings')
    } catch (error) {
      console.error(error);
      toast({
        position: "top",
        render: () => (
          <Box
            className="bg-red-500 flex flex-col justify-center text-center"
            p={3}
            color="white"
            borderRadius="md"
            boxShadow="md"
          >
            <div>Error editing job.</div>
            <div>Please try again later.</div>
          </Box>
        ),
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>{loading ? (
      <></>
      ) : post ? (
        <>
      <SideBarRecruiter />
      <main className="bg-white-secondary h-screen">
        <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px] max-[700px]:items-center max-[700px]:text-center">
          <h4 id="heading4">Edit job posting</h4>
          <h5 className="mt-[24px] mb-[8px]" id="heading5">
            Main information
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-[4px]" id="overline">
              JOB TITLE
            </div>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[360px] h-[36px]"
              name="job_title"
              placeholder="Software engineer"
              type="text"
              value={formData.job_title}
              onChange={handleChange}
            />
            <div className="mt-[8px] mb-[4px]" id="overline">
              JOB CATEGORY
            </div>
            <select
              className="border-solid border border-[#F48FB1] rounded-[8px] w-full max-w-[360px] h-[36px]"
              id="category"
              name="job_category"
              value={selectedOption}
              onChange={(event) => { handleSelectOption(event) }}
            >
              <option value="" disabled>Select or create a category</option>
              <option value="Software-Developer" >Software Developer</option>
              <option value="Sales" >Sales</option>
              <option value="Graphic-Designer" >Graphic Designer</option>
              <option value="Digital-Marketing" >Digital Marketing</option>
            </select>
            <div className="mt-[8px] mb-[4px]" id="overline">
              TYPE
            </div>
            <select
              className="border-solid border border-[#F48FB1] rounded-[8px] w-full max-w-[360px] h-[36px]"
              id="type"
              name="job_type"
              value={selectedJobType}
              onChange={(event) => { handleSelectJobType(event) }}

            >
              <option value="" disabled selected>
                Select a type
              </option>
              <option value="Full-Time" >Full Time</option>
              <option value="Part-Time" >Part Time</option>
            </select>
            <div className="mt-[8px] mb-[4px]" id="overline">
              SALARY RANGE
            </div>
            <div className="flex flex-row items-center max-[700px]:justify-center">
              <input
                className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[90px] w-[102px] h-[36px] mr-[8px]"
                name="salary_min_range"
                placeholder="min"
                type="text"
                id="input-range"
                value={formData.salary_min_range}
                onChange={handleChange}
              />
              <svg
                width="11"
                height="2"
                viewBox="0 0 11 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="1"
                  y1="1"
                  x2="10"
                  y2="1"
                  stroke="#8E8E8E"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <input
                className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[90px] w-[102px] h-[36px] ml-[8px]"
                name="salary_max_range"
                placeholder="max"
                type="text"
                id="input-range"
                value={formData.salary_max_range}
                onChange={handleChange}
              />
            </div>
            <h5 className="mt-[32px] mb-[8px]" id="heading5">
              Addtional information
            </h5>
            <div>
              <div className="mt-[8px] mb-[4px]" id="overline">
                ABOUT THE JOB POSITION
              </div>
              <textarea
                className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[760px] h-[200px]"
                name="job_description"
                placeholder="Describe the main functions and characteristics of your job position"
                value={formData.job_description}
                onChange={handleChange}
              ></textarea>
              <div className="mt-[8px] mb-[4px]" id="overline">
                MANDATORY REQUIREMENTS
              </div>
              <textarea
                className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[760px] h-[200px]"
                name="requirement"
                placeholder="List each mandatory requirement in a new line"
                value={formData.requirement}
                onChange={handleChange}
              ></textarea>
              <div className="mt-[8px] mb-[4px]" id="overline">
                OPTIONAL REQUIREMENTS
              </div>
              <textarea
                className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[760px] h-[200px]"
                name="optional_requirement"
                placeholder="List each optional requirement in a new line"
                value={formData.optional_requirement}
                onChange={handleChange}
              ></textarea>
            </div>
            <br />
            <button type="submit" className="button_pink_new mt-[24px] active:opacity-[70%]">
              EDIT THIS JOB
            </button>
          </form>
        </div>
      </main>
      </>
      ) : (
        <PageNotFound/>
      )}
    </>
  );
}

export default EditJobPost;
