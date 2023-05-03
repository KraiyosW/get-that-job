import React from "react";
import SideBarRecruiter from "@/components/SidebarRecruiter";
import EditJobPosting from "@/components/recruiter-page/EditJobPosting.js";

const EditJobPost = () => {
  return (
    <>
      <div>
        <SideBarRecruiter />
        <EditJobPosting />
      </div>
    </>
  );
};

export default EditJobPost;
