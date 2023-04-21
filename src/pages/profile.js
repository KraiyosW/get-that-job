import React from 'react'
import Head from "next/head";
import SideBarRecruiter from "@/components/sidebar-recruiter";
import Profile from '@/components/recruiter-page/Profile';

function profile() {
  return (
    <>
    <Head/>
    <SideBarRecruiter/>
    <Profile/>
    </>
  )
}

export default profile