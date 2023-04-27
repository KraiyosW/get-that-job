import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SidebarProfessional from "@/components/SidebarProfessional";
import Image from "next/image";
import applyIcon from "@/image/icon-apply.png";
import calendarIcon from "@/image/icon-calendar.png";
import dollarIcon from "@/image/icon-dollar.png";
import followingIcon from "@/image/icon-following.png";
import manuIcon from "@/image/icon-manu.png";
import backIcon from "@/image/icon-back.png";
import companyLogo from "@/image/logo-web-works.png";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function JobDetails() {
  const [post, setPost] = useState(null);
  const [timeAgo, setTimeAgo] = useState("");

  const router = useRouter();
  const id = router.query["jobId"];

  useEffect(() => {
    // Fetch the specific post from Supabase based on the id parameter
    const fetchPost = async () => {
      try {
        const posts = await supabase
          .from("jobs_postings")
          .select(`*, recruiters (*)`)
          .eq("job_post_id", Number(id))
          .single();
        setPost(posts.data);
        // Calculate time ago
        const createdDate = new Date(post.created_at);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - createdDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setTimeAgo(`${diffDays}`);
        console.log(timeAgo);
      } catch (error) {
        console.error(error);
      }
    };
    if (id) fetchPost();
  });

  if (!post) return <div>Loading...</div>;

  const handleGoBack = () => {
    router.push("/find-that-job");
  };

  return (
    <div className="job-detail-app flex">
      <SidebarProfessional />

      {/* Header Section */}
      <div className="flex flex-col w-full items-center ml-[240px]">
        <div className="header flex flex-row w-full justify-between">
          <div className="left-section ml-[148px] mt-[32px]">
            <button
              className="back-button flex flex-row relative"
              onClick={handleGoBack}
            >
              <Image
                className="w-[8px] h-[13px] absolute mt-[5px]"
                src={backIcon}
                alt="back icon button"
              />
              <p className="ml-[12px]">BACK</p>
            </button>
            <div className="company-card flex flex-row mt-[18px] mb-[20px]">
              <div className="logo w-[80px] h-[80px] rounded-[8px] shadow-md mr-[18px]">
                <Image
                  className="w-[75px] h-[75px] "
                  src={companyLogo}
                  alt="work logo"
                />
              </div>
              <div className="company-title">
                <h5 id="heading5" className="company-name">
                  {post.recruiters.company_name}
                </h5>
                <button className="subscription-status mt-[16px] text-right relative w-[123px]">
                  <Image
                    className="w-[40px] h-[40px] absolute bottom-[-8px]"
                    src={followingIcon}
                    alt="Apply Button Icon"
                  />
                  Following
                </button>
              </div>
            </div>
          </div>
          <button class="apply-button bg-pink-primary mr-[144px] mt-[84px] rounded-[16px] text-white w-[173px] h-[56px] py-[16px] pr-[24px] text-right font-medium relative">
            <Image
              className="w-[20px] h-[20px] absolute left-[27px]"
              src={applyIcon}
              alt="apply icon"
            />
            Apply Now
          </button>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col justify-center">
          <h3 id="heading3">{post.job_title}</h3>
          <div className="flex flex-row justify-center">
            POSTED {timeAgo > 1 ? `${timeAgo} DAYS AGO` : `${timeAgo} DAY AGO`}
          </div>
        </div>

        {/* Card Section */}
        <div className="title-header flex flex-col ">
          <div className="card-section flex flex-row justify-center">
            <div className="category flex flex-col items-center bg-white border-[1px] border-pink-tertiary rounded-[8px] px-[32px] pt-[8px] pb-[16px] mx-[16px]">
              <div>Category</div>
              <div className="">{post.job_category}</div>
            </div>
            <div className="type flex flex-col items-center  bg-white border-[1px] border-pink-tertiary  shadow-md rounded-[8px] px-[32px] pt-[8px] pb-[16px] mx-[16px]">
              <div>Type</div>
              <div>{post.job_type}</div>
            </div>
            <div className="salary flex flex-col items-center  bg-white border-[1px] border-pink-tertiary shadow-md rounded-[8px] px-[32px] pt-[8px] pb-[16px] mx-[16px]">
              <div>Salary</div>
              <div>{`${post.salary_min_range} - ${post.salary_max_range}`}</div>
            </div>
          </div>
        </div>
        <section className="content-section flex flex-col w-[760px] ml-[136px]">
          <div className="about-company">
            <h5 id="heading5" className="text-pink-tertiary ">
              About {post.recruiters.company_name}
            </h5>
            <p>{post.recruiters.about_company}</p>
          </div>
          <div className="about-job">
            <h5 id="heading5" className="text-pink-tertiary ">
              About the job position
            </h5>
            <p>{post.job_description}</p>
          </div>
          <div className="mandatory-requirements">
            <h5 id="heading5" className="text-pink-tertiary ">
              Mandatory Requirements
            </h5>
            <p>{post.requirement}</p>
          </div>
          <div className="optional-requirements">
            <h5 id="heading5" className="text-pink-tertiary ">
              Optional Requirements
            </h5>
            <p>{post.optional_requirement}</p>
          </div>
          <button class="apply-button bg-pink-primary mr-[144px] mt-[84px] rounded-[16px] text-white w-[173px] h-[56px] py-[16px] pr-[24px] text-right font-medium relative">
            <Image
              className="w-[20px] h-[20px] absolute left-[27px]"
              src={applyIcon}
              alt="apply icon"
            />
            Apply Now
          </button>
        </section>
      </div>
    </div>
  );
}

export default JobDetails;
