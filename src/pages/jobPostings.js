import React from "react";
import SideBarRecruiter from "@/components/sidebar-recruiter";
import { useState } from 'react'

function jobPostings() {
  const [selectedOption, setSelectedOption] = useState('all')

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }
  return (
    <>
      <SideBarRecruiter />
      <main className="bg-white-secondary h-screen">
        <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px]">
        <h4 className="mb-[24px]" id="heading4">
          Job Postings
        </h4>
        <p className="mb-[6px]" id="overline">Filter your Job Postings</p>
        <form className="flex flex-row flex-wrap gap-[12px]">
      <div>
        <label>
          <input
            type="radio"
            value="all"
            checked={selectedOption === 'all'}
            onChange={handleOptionChange}
            className="mr-[3px] w-5 h-5 relative top-[4px]"
            id="my-radio"
          />
          <span>All</span>
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="candidates"
            checked={selectedOption === 'candidates'}
            onChange={handleOptionChange}
            className="mr-[3px] w-5 h-5 relative top-[4px]"
          />
          With candidates on track
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="closed"
            checked={selectedOption === 'closed'}
            onChange={handleOptionChange}
            className="mr-[3px] w-5 h-5 relative top-[4px]"
          />
          Closed
        </label>
      </div>
    </form>
    <h6 className="mt-[20px]" id="heading6">4 jobs postings found</h6>
    </div>
      </main>
    </>
  );
}

export default jobPostings;
