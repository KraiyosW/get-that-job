import React from 'react'
import Head from "next/head";
import SideBarProfessional from "@/components/SidebarProfessional";
import Applications from '@/components/professional-page/Applications';


function applications() {
  return (
    <>
    <Head/>
    <SideBarProfessional/>
    <Applications/>
    </>
  )
}

export default applications