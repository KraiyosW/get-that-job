import React, { useState } from "react";
import  { useRecruiterPost } from "@/hooks/recruiterPost.js";
import { useAuth } from "@/contexts/authentication";

function CreateNewJob() {
  const { createPost, isLoading, isError } = useRecruiterPost();
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const { state } = useAuth();

  const email = state.email;

  const [formData, setFormData] = useState({
    job_title: "",
    job_category: "",
    job_type: "",
    salary_min_range: "",
    salary_max_range: "",
    job_description: "",
    requirement: "",
    optional_requirement: "",
  });
  
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      job_category: selectedOption, // กำหนดค่า job_category ให้เป็นค่า selectedOption
      job_type : selectedJobType,
      userEmail : email
    });
  };

  const handleSelectOption = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSelectJobType = (event) => {
    setSelectedJobType(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const authToken = JSON.parse(localStorage.getItem('sb-zsvpcibqzkxoqqpektgc-auth-token'));
      const response = await createPost(formData,authToken);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <main className="bg-white-secondary h-screen">
        <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px] max-[700px]:items-center max-[700px]:text-center">
          <h4 id="heading4">Create new job posting</h4>
          <h5 className="mt-[24px] mb-[8px]" id="heading5">
            Main information
          </h5>
          <form onSubmit={handleSubmit}>
            <p className="mb-[4px]" id="overline">
              JOB TITLE
            </p>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[360px] h-[36px]"
              name="job_title"
              placeholder="Software engineer"
              type="text"
              value={formData.job_title}
              onChange={handleChange}
            />
            <p className="mt-[8px] mb-[4px]" id="overline">
              JOB CATEGORY
            </p>
            <select
                className="border-solid border border-[#F48FB1] rounded-[8px] w-full max-w-[360px] h-[36px]"
                id="category"
                name="job_category"
                value={selectedOption}
                onChange={(event)=>{handleSelectOption(event)}}
              >
                <option value="" disabled>Select or create a category</option>
                <option value="Software-Developer" >Software Developer</option>
                <option value="Sales" >Sales</option>
                <option value="Graphic-Designer" >Graphic Designer</option>
                <option value="Digital-Marketing" >Digital Marketing</option>
            </select>
            <p className="mt-[8px] mb-[4px]" id="overline">
              TYPE
            </p>
            <select
              className="border-solid border border-[#F48FB1] rounded-[8px] w-full max-w-[360px] h-[36px]"
              id="type"
              name="job_type"
              value={selectedJobType}
              onChange={(event)=>{handleSelectJobType(event)}}
              
            >
              <option value="" disabled selected>
                Select a type
              </option>
              <option value="Full-Time" >Full Time</option>
              <option value="Past-Time" >Past Time</option>
            </select>
            <p className="mt-[8px] mb-[4px]" id="overline">
              SALARY RANGE
            </p>
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
              <p className="mt-[8px] mb-[4px]" id="overline">
                ABOUT THE JOB POSITION
              </p>
              <textarea
                className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[760px] h-[76px]"
                name="job_description"
                placeholder="Describe the main functions and characteristics of your job position"
                value={formData.job_description}
                onChange={handleChange}
              ></textarea>
              <p className="mt-[8px] mb-[4px]" id="overline">
                MANDATORY REQUIREMENTS
              </p>
              <textarea
                className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[760px] h-[76px]"
                name="requirement"
                placeholder="List each mandatory requirement in a new line"
                value={formData.requirement}
                onChange={handleChange}
              ></textarea>
              <p className="mt-[8px] mb-[4px]" id="overline">
                OPTIONAL REQUIREMENTS
              </p>
              <textarea
                className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[760px] h-[76px]"
                name="optional_requirement"
                placeholder="List each optional requirement in a new line"
                value={formData.optional_requirement}
                onChange={handleChange}
              ></textarea>
            </div>
            <br />
            <button type="submit" className="button_pink_new mt-[24px]">
              POST THIS JOB
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default CreateNewJob;
