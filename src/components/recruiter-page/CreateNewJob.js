import React from "react";

function CreateNewJob() {
  return (
    <>
      <main className="bg-white-secondary h-screen">
        <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px] max-[700px]:items-center max-[700px]:text-center">
          <h4 id="heading4">Create new job posting</h4>
          <h5 className="mt-[24px] mb-[8px]" id="heading5">
            Main information
          </h5>
          <div>
            <p className="mb-[4px]" id="overline">
              JOB TITLE
            </p>
            <input
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[360px] h-[36px]"
              name="jobTitle"
              placeholder="Software engineer"
              type="text"
            />
            <p className="mt-[8px] mb-[4px]" id="overline">
              JOB CATEGORY
            </p>
            <select
              className="border-solid border border-[#F48FB1] rounded-[8px] w-full max-w-[360px] h-[36px]"
              id="category"
              name="category"
            >
              <option value="" disabled selected>
                Select or create a category
              </option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
              <option value="c">c</option>
            </select>
            <p className="mt-[8px] mb-[4px]" id="overline">
              TYPE
            </p>
            <select
              className="border-solid border border-[#F48FB1] rounded-[8px] w-full max-w-[360px] h-[36px]"
              id="type"
              name="type"
            >
              <option value="" disabled selected>
                Select a type
              </option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
              <option value="c">c</option>
            </select>
            <p className="mt-[8px] mb-[4px]" id="overline">
              SALARY RANGE
            </p>
            <div className="flex flex-row items-center max-[700px]:justify-center">
              <input
                className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[90px] w-[102px] h-[36px] mr-[8px]"
                name="min"
                placeholder="min"
                type="text"
                id="input-range"
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
                name="max"
                placeholder="max"
                type="text"
                id="input-range"
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
              name="jobPosition"
              placeholder="Describe the main functions and characteristics of your job position"
            ></textarea>
            <p className="mt-[8px] mb-[4px]" id="overline">
              MANDATORY REQUIREMENTS
            </p>
            <textarea
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[760px] h-[76px]"
              name="mandatoryRequirements"
              placeholder="List each mandatory requirement in a new line"
            ></textarea>
            <p className="mt-[8px] mb-[4px]" id="overline">
              OPTIONAL REQUIREMENTS
            </p>
            <textarea
              className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[760px] h-[76px]"
              name="optionalRequirements"
              placeholder="List each optional requirement in a new line"
            ></textarea>
            </div>
            <br/>
            <button className="button_pink_new mt-[24px]">POST THIS JOB</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default CreateNewJob;
