import React, { useState } from "react";
//import createJobPosting from "../../hooks/recruiterPost";

function CreateNewJob() {
  const [job_title, setJob_title] = useState('');
  const [job_category, setJob_category] = useState('');
  const [job_type, setJob_type] = useState('');
  const [salary_min_range, setSalary_min_range] = useState('');
  const [salary_max_range, setSalary_max_range] = useState('');
  const [job_description, setJob_description] = useState(''); 
  const [requirement, setRequirement] = useState('');
  const [optional_requirement, setOptional_requirement] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await fetch('/api/submitFormJobPostings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ job_title, job_category, job_type, salary_min_range, salary_max_range, job_description, requirement, optional_requirement })
    })
    
    const { message } = await response.json()
    
    console.log(message)
  }
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
              value={job_title}
              onChange={(event) => setJob_title(event.target.value)}
            />
            <p className="mt-[8px] mb-[4px]" id="overline">
              JOB CATEGORY
            </p>
            <select
              className="border-solid border border-[#F48FB1] rounded-[8px] w-full max-w-[360px] h-[36px]"
              id="category"
              name="job_category"
              value={job_category}
              onChange={(event) => setJob_category(event.target.value)}
            >
              <option value="" disabled selected>
                Select or create a category
              </option>
              <option value="software-developer">
              Software Developer
              </option>
              <option value="sales">Sales</option>
              <option value="graphic-designer">
              Graphic Designer
              </option>
              <option value="digital-marketing">Digital Marketing</option>
            </select>
            <p className="mt-[8px] mb-[4px]" id="overline">
              TYPE
            </p>
            <select
              className="border-solid border border-[#F48FB1] rounded-[8px] w-full max-w-[360px] h-[36px]"
              id="type"
              name="job_type"
              value={job_type}
              onChange={(event) => setJob_type(event.target.value)}
            >
              <option value="" disabled selected>
                Select a type
              </option>
              <option value="a">Full Time</option>
              <option value="b">Past Time</option>
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
                value={salary_min_range}
                onChange={(event) => setSalary_min_range(event.target.value)}
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
                value={salary_max_range}
                onChange={(event) => setSalary_max_range(event.target.value)}
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
                value={job_description}
                onChange={(event) => setJob_description(event.target.value)}
              ></textarea>
              <p className="mt-[8px] mb-[4px]" id="overline">
                MANDATORY REQUIREMENTS
              </p>
              <textarea
                className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[760px] h-[76px]"
                name="requirement"
                placeholder="List each mandatory requirement in a new line"
                value={requirement}
                onChange={(event) => setRequirement(event.target.value)}
              ></textarea>
              <p className="mt-[8px] mb-[4px]" id="overline">
                OPTIONAL REQUIREMENTS
              </p>
              <textarea
                className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[760px] h-[76px]"
                name="optional_requirement"
                placeholder="List each optional requirement in a new line"
                value={optional_requirement}
                onChange={(event) => setOptional_requirement(event.target.value)}
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
