import React from 'react'
import Head from "next/head";
import SidebarProfessional from "@/components/SidebarProfessional";
import ProfessionalProfile from '@/components/professional-page/ProfessionalProfile';

function professionalProfile() {
  return (
    <>
    <Head/>
    <SidebarProfessional/>
    <ProfessionalProfile/>
    </>
  )
}

export default professionalProfile