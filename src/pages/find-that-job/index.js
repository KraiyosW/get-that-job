import React from "react";
import SidebarProfessional from "@/components/SidebarProfessional";
import Findthatjob from "@/components/professional-page/FindthatJob";
import FilterJob from "@/components/professional-page/FilterJob";

const FindThatJob = () => {
  return (
    <>
      <div>
        <SidebarProfessional />
        <FilterJob />
        <Findthatjob />
      </div>
    </>
  );
};

export default FindThatJob;
