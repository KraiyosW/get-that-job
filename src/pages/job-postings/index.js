import Head from "next/head";
import SideBarRecruiter from "@/components/SidebarRecruiter.js";
import JobPostings from "@/components/recruiter-page/JobPostings.js";
import React from "react";
import { useState } from "react";

function jobPostings() {
  

  
  return (
    <>
      <Head />
      <SideBarRecruiter />
      <main className="bg-white-secondary h-screen">
        <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px]">
          <JobPostings />
        </div>
      </main>
    </>
  );
}

export default jobPostings;