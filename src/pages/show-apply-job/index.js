import React from "react";
import SideBarRecruiter from "@/components/SidebarRecruiter";
import Candidates from "@/components/recruiter-page/Candidates.js";

const CandidateShow = () => {
  return (
    <>
      <div>
        <SideBarRecruiter />
        <Candidates />
      </div>
    </>
  );
};

export default CandidateShow;