import React from 'react'
import Head from "next/head";
import SideBarRecruiter from "@/components/SidebarRecruiter";
import EditJobPosting from '@/components/recruiter-page/EditJobPosting';

function editJobPosting() {
  return (
    <>
    <Head/>
    <SideBarRecruiter/>
    <EditJobPosting/>
    </>
  )
}

export default editJobPosting