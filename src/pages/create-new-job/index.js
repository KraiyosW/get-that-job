import React from "react";
import Head from "next/head";
import SideBarRecruiter from "@/components/SidebarRecruiter";
import CreateNewJob from "@/components/recruiter-page/CreateNewJob";

function createNewJob() {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;
  return (
    <>
      <Head />
      <SideBarRecruiter />
      <CreateNewJob isLocalStorageAvailable={isLocalStorageAvailable} />
    </>
  );
}

export default createNewJob;
