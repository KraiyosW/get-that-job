import Head from "next/head";
import SideBarRecruiter from "@/components/SidebarRecruiter.js";
import JobPostings from "@/components/recruiter-page/JobPostings.js";
import React from 'react';
import { useAuth } from "@/contexts/authentication.js";

function JobPostingsPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <>
        <Head >
          <meta httpEquiv="refresh" content="0; url=/Login"/>
        </Head>        
      </>
    );
  }
    
  return (
    <>
      <Head>
        <title>Job Postings</title>
      </Head>
      <SideBarRecruiter />
      <JobPostings/>
    </>
  )
}

export default JobPostingsPage;