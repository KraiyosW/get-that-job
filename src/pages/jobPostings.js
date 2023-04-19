import Head from "next/head";
import SideBarRecruiter from "@/components/sidebar-professional";
import JobPostings from "@/components/recruiter-page/JobPostings.js";
import React from 'react'

function jobPostings() {
  return (
    <>
    <Head/>
    <SideBarRecruiter />
    <JobPostings/>
    </>
  )
}

export default jobPostings