import React from 'react'
import Head from "next/head";
import SideBarRecruiter from "@/components/SidebarRecruiter";
import CreateNewJob from '@/components/recruiter-page/CreateNewJob';

function createNewJob() {
  return (
    <>
    <Head/>
    <SideBarRecruiter/>
    <CreateNewJob/>
    </>
  )
}

export default createNewJob