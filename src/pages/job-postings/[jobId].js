import React from 'react'
import Head from "next/head";
import SideBarRecruiter from "@/components/SidebarRecruiter";
import Candidates from '@/components/recruiter-page/Candidates';
import { useState } from "react";

function candidates() {
    const [selectedOption, setSelectedOption] = useState("all");

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  return (
    <>
     <Head />
      <SideBarRecruiter />
      <main className="bg-white-secondary h-screen">
        <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px]">
        <h4 className="max-[700px]:text-center mb-[24px]" id="heading4">
        Show Job Posting
          </h4>
          {/* {ใส่ jobPostings by id ตรงนี้} */}
          <p className="max-[700px]:text-center mb-[6px]" id="overline">
          Filter your Candidates
          </p>
          <form className="flex flex-row flex-wrap gap-[12px]">
            <div>
              <label>
                <input
                  type="radio"
                  value="all"
                  checked={selectedOption === "all"}
                  onChange={handleOptionChange}
                  className="mr-[3px] w-5 h-5 relative top-[4px] accent-pink-primary"
                  id="my-radio"
                />
                <span>All</span>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="waiting"
                  checked={selectedOption === "waiting"}
                  onChange={handleOptionChange}
                  className="mr-[3px] w-5 h-5 relative top-[4px] accent-pink-primary"
                />
                Waiting
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="progress"
                  checked={selectedOption === "progress"}
                  onChange={handleOptionChange}
                  className="mr-[3px] w-5 h-5 relative top-[4px] accent-pink-primary"
                />
                In progress
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="finished"
                  checked={selectedOption === "finished"}
                  onChange={handleOptionChange}
                  className="mr-[3px] w-5 h-5 relative top-[4px] accent-pink-primary"
                />
                Finished
              </label>
            </div>
          </form>
          <h6
            className="max-[700px]:text-center mt-[20px] mb-[8px]"
            id="heading6"
          >
            5 candidates found
          </h6>
        <Candidates/>
        </div>
      </main>
    </>
    );
}

export default candidates