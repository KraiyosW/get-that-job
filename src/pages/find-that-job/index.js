import React from "react";
import SidebarProfessional from "@/components/SidebarProfessional";
import Findthatjob from "@/components/professional-page/findthatjob";
import { getServerSideProps as getServerSidePropsFindthatjob } from "./getServerSideProps";

export async function getServerSideProps(context) {
  const findThatJobProps = await getServerSidePropsFindthatjob(context);
  return { props: { ...findThatJobProps.props } };
}

const FindThatJob = (props) => {
  return (
    <div>
      <SidebarProfessional />
      <Findthatjob {...props} />
    </div>
  );
};

export default FindThatJob;
