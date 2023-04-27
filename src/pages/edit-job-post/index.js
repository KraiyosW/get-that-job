import React from "react";
import SidebarProfessional from "@/components/SidebarProfessional";
import EditJobPosting from "@/components/recruiter-page/EditJobPosting.js";


const EditJobPost = () => {
  return (
    <>
      <div>
        <SidebarProfessional />
        <EditJobPosting />

      </div>
    </>
  );
};

export default EditJobPost;
