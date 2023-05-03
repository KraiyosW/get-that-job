import React from "react";
import SideBarRecruiter from "@/components/SidebarRecruiter.js";
import Candidates from "@/components/recruiter-page/Candidates.js";

const ShowCandidates = () => {
  return (
    <>
      <div>
        <SideBarRecruiter />
        <Candidates />
      </div>
    </>
  );
};

export default ShowCandidates;