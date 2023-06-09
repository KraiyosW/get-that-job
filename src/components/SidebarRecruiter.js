import React from "react";
import GTJ from "../image/gtj.svg";
import bag from "../image/bag.png";
import paper from "../image/paper.png";
import profile from "../image/profile.png";
import logout from "../image/logout.png";
import edit from "../image/edit.png";
import Line from "../image/vertical-line.png";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/authentication";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SideBarRecruiter = () => {
  const { logoutAuth } = useAuth();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("sb:token");
    setIsAuthenticated(!!token);
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await logoutAuth();
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div
      className="m-0 p-0 w-[240px] bg-white-tertiary fixed h-screen overflow-auto max-[700px]:w-screen max-[700px]:h-auto max-[700px]:relative"
      id="sidebar"
    >
      <Link
        href="/"
        className="max-[700px]:flex max-[700px]:justify-center"
        onClick={() => {
          handleLogout();
        }}
      >
        <Image
          src={GTJ}
          alt="get that job logo"
          className="mb-4 max-[700px]:pl-[8px] max-[700px]:pt-[16px] pl-[16px] pt-[32px] w-[160px] cursor-pointer max-[700px]:hidden"
        />
      </Link>
      <div className="box-all">
        <div className="box-1 max-[700px]:h-auto h-[82vh] max-[700px]:flex max-[700px]:flex-row max-[700px]:w-full max-[700px]:justify-between">
          <Link
            href="/job-postings"
            className="max-[700px]:flex max-[700px]:justify-center"
          >
            <div
              className={`hover:bg-white-secondary active:bg-white-secondary max-[700px]:p-[6px] p-[12px] flex flex-row flex-warp gap-[10px] py-[17px]  ${(router.pathname.startsWith('/job-postings') || router.pathname.startsWith('/show-apply-job')) ? 'bg-white-secondary' : 'bg-white-tertiary'}`}
              id="sidebar-menu"
            >
              <Image
                src={bag}
                alt="Job Postings"
                className="max-[700px]:hidden"
              />
              <div className="max-[700px]:text-[10px] max-[700px]:leading-[17px] max-[700px]:w-[70px] max-[700px]:text-center max-[700px]:flex max-[700px]:justify-center max-[700px]:items-center text-[1rem] leading-[1.5rem] font-normal">
                Job Postings
              </div>
            </div>
          </Link>

          <Link
            href="/create-new-job"
            className="max-[700px]:flex max-[700px]:justify-center"
          >
            <div
              className={`hover:bg-white-secondary active:bg-white-secondary max-[700px]:p-[6px] p-[12px] flex flex-row flex-warp gap-[10px] py-[17px] ${router.pathname === '/create-new-job' ? 'bg-white-secondary' : 'bg-white-tertiary'}`}
              id="sidebar-menu"
            >
              <Image
                src={paper}
                alt="Create New Job"
                className="max-[700px]:hidden"
              />
              <div className="max-[700px]:text-[10px] max-[700px]:leading-[17px] max-[700px]:w-[70px] max-[700px]:text-center max-[700px]:flex max-[700px]:justify-center max-[700px]:items-center text-[1rem] leading-[1.5rem] font-normal">
                Create New Job
              </div>
            </div>
          </Link>

          <Link
            href="/edit-job-post"
            className="max-[700px]:flex max-[700px]:justify-center"
          >
            <div
              className={`hover:bg-white-secondary active:bg-white-secondary max-[700px]:p-[6px] p-[12px] flex flex-row flex-warp gap-[7px] py-[17px] ${router.pathname.startsWith('/edit-job-post') ? 'bg-white-secondary' : 'bg-white-tertiary'}`}
              id="sidebar-menu"
            >
              <Image
                src={edit}
                alt="Edit Job"
                className="ml-[4px] max-[700px]:hidden"
              />
              <div className="max-[700px]:text-[10px] max-[700px]:leading-[17px] max-[700px]:w-[70px] max-[700px]:text-center max-[700px]:flex max-[700px]:justify-center max-[700px]:items-center text-[1rem] leading-[1.5rem] font-normal">
                Edit Job
              </div>
            </div>
          </Link>

          <Link
            href="/recruiter-profile"
            className="max-[700px]:flex max-[700px]:justify-center"
          >
            <div
              className={`hover:bg-white-secondary active:bg-white-secondary max-[700px]:p-[6px] p-[12px] flex flex-row flex-warp gap-[10px] py-[17px] ${router.pathname === '/recruiter-profile' ? 'bg-white-secondary' : 'bg-white-tertiary'} `}
              id="sidebar-menu"
            >
              <Image
                src={profile}
                alt="Profile"
                className="max-[700px]:hidden"
              />
              <div className="max-[700px]:text-[10px] max-[700px]:leading-[17px] max-[700px]:w-[70px] max-[700px]:text-center max-[700px]:flex max-[700px]:justify-center max-[700px]:items-center text-[1rem] leading-[1.5rem] font-normal">
                Profile
              </div>
            </div>
          </Link>

          <div
            className="hover:bg-white-secondary active:bg-white-secondary max-[700px]:p-[6px] p-[12px] flex flex-row flex-warp gap-[10px] cursor-pointer py-[17px] "
            onClick={handleLogout}
            id="sidebar-menu"
          >
            <Image src={logout} alt="Log out" className="max-[700px]:hidden" />
            <div className="max-[700px]:text-[10px] max-[700px]:leading-[17px] max-[700px]:w-[70px] max-[700px]:text-center max-[700px]:flex max-[700px]:justify-center max-[700px]:items-center text-[1rem] leading-[1.5rem] font-normal">
              Log out
            </div>
          </div>
        </div>
        <div className="box-2 pl-[16px] max-[700px]:text-center max-[700px]:hidden">
          <div>Â© 2023 - Get That Job</div>
        </div>
      </div>
    </div>
  );
};

export default SideBarRecruiter;
