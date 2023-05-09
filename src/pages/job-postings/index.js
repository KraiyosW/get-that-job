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
          <JobPostings />
    </>
  );
}

export default jobPostings;