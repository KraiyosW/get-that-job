import React from "react";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SidebarProfessional from "@/components/SidebarProfessional";
import Image from "next/image";
import applyIcon from "@/image/icon-apply.png";
import backIcon from "@/image/icon-back.png";
import { createClient } from "@supabase/supabase-js";
import logoMockup from "../../image/logo-mockup.png";
import following from "../../image/following.png";
import smallfollowing from "../../image/smallfollowing.png";
import PageNotFound from "@/components/PageNotFound";
import Warning from "@/components/Warning";
import { log } from "util";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function JobDetails() {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [timeAgo, setTimeAgo] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [followStatus, setFollowStatus] = useState(null);
  const [followIcon, setFollowIcon] = useState(following);

  const router = useRouter();
  const id = router.query["jobId"];

  const fetchPost = async (profId) => {
    try {
      const posts = await supabase
        .from("jobs_postings")
        .select(`*, professional_follow_jobs (*), recruiters (*)`)
        .eq("job_post_id", Number(id))
        .eq("professional_follow_jobs.professional_id", profId)
        .single();
      setPost(posts.data);
      setLoading(false);
      // Calculate time ago
      const createdDate = new Date(posts.data.created_at);
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - createdDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTimeAgo(`${diffDays}`);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem("sb:token");
    setIsAuthenticated(!!token);
    const profId = localStorage.getItem("professional_id");
    if (id) {
      fetchPost(profId);
    }
  }, [followStatus, id, isAuthenticated]);


  const handleGoBack = () => {
    router.push("/find-that-job");
  };

  const handleApply = () => {
    router.push(`/applications/${id}`);
  };

  const handleFollowClick = async () => {
    const profId = localStorage.getItem("professional_id");
    await axios.post("/api/following", {
      professional_id: profId,
      job_post_id: id,
    });

    let newFollowStatus = followStatus;
    if (post.professional_follow_jobs[0]) {
      if (post.professional_follow_jobs[0].follow_status === undefined) {
        newFollowStatus = true;
        setFollowIcon(smallfollowing);
      } else if (post.professional_follow_jobs[0].follow_status) {
        newFollowStatus = false;
        setFollowIcon(following);
      } else if (!post.professional_follow_jobs[0].follow_status) {
        newFollowStatus = true;
        setFollowIcon(smallfollowing);
      }
    }

    setFollowStatus(newFollowStatus);
    fetchPost(profId);
  };

  if (!isAuthenticated) {
    return <Warning />;
  }

  return (
    <>

      {loading ? (
        <></>
      ) : post ? (
        <div className="job-detail-app">
          <Head />
          <SidebarProfessional />
          {/* Header Section */}
          <main className="bg-[#F5F5F6] h-screen">
            <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px]">
              <div className="flex flex-col flex-wrap">
                <div className="box-0 flex items-center mb-[18px]">
                  <button
                    className="flex flex-row items-center"
                    onClick={handleGoBack}
                  >
                    <Image
                      className="w-[8px] h-[10px] mr-[13px]"
                      src={backIcon}
                      alt="back icon button"
                    />
                    <p id="body2">BACK</p>
                  </button>
                </div>
                <div className="box-1 flex flex-row flex-wrap justify-between">
                  <div className="logo flex flex-row">
                    <div className="image">
                      <Image
                        className="w-[75px] h-[75px] drop-shadow-xl mr-[19px]"
                        src={
                          post.recruiters.logo === null
                            ? logoMockup
                            : `https://zsvpcibqzkxoqqpektgc.supabase.co/storage/v1/object/public/recruiters_logo/${post.recruiters.logo}`
                        }
                        width={74}
                        height={74}
                        alt="work logo"
                      />
                    </div>
                    <div className="company-title">
                      <h5 id="heading5" className="company-name mb-[8px]">
                        {post.recruiters.company_name}
                      </h5>
                      <button
                        className="flex flex-row items-center"
                        onClick={handleFollowClick}
                      >
                        {post.professional_follow_jobs[0] === undefined ? (
                          <Image
                            alt="picture"
                            src={following}
                            className="w-[25px] h-[25px] border-[#F48FB1] mr-2"
                          />
                        ) : post.professional_follow_jobs[0].follow_status ? (
                          <Image
                            alt="picture"
                            src={smallfollowing}
                            className="w-[40px] h-[40px] border-[#F48FB1] mr-2"
                          />
                        ) : (
                          <Image
                            alt="followIcon"
                            src={following}
                            className="w-[25px] h-[25px] border-[#F48FB1] mr-2"
                          />
                        )}
                        {post.professional_follow_jobs[0] === undefined
                          ? "Follow"
                          : post.professional_follow_jobs[0].follow_status
                            ? "Following"
                            : "Follow"}
                      </button>
                    </div>
                  </div>
                  <div className="btn">
                    <button
                      className="apply-button active:opacity-[80%] bg-pink-primary flex flex-row items-center justify-center py-[16px] px-[24px] rounded-[16px] text-white"
                      onClick={handleApply}
                    >
                      <Image
                        className="w-[20px] h-[20px] mr-[10px]"
                        src={applyIcon}
                        alt="apply icon"
                      />
                      APPLY NOW
                    </button>
                  </div>
                </div>
                <div className="box-2 text-center">
                  {/* Middle Section */}
                  <div className="">
                    <h3 className="mb-[10px]" id="heading3">
                      {post.job_title}
                    </h3>
                    <div className="flex flex-row justify-center mb-[8px] items-center">
                      <svg
                        className="mr-[4px]"
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 13.75C4.54813 13.75 1.75 10.9519 1.75 7.5C1.75 4.04813 4.54813 1.25 8 1.25C11.4519 1.25 14.25 4.04813 14.25 7.5C14.25 10.9519 11.4519 13.75 8 13.75ZM8 12.5C9.32608 12.5 10.5979 11.9732 11.5355 11.0355C12.4732 10.0979 13 8.82608 13 7.5C13 6.17392 12.4732 4.90215 11.5355 3.96447C10.5979 3.02678 9.32608 2.5 8 2.5C6.67392 2.5 5.40215 3.02678 4.46447 3.96447C3.52678 4.90215 3 6.17392 3 7.5C3 8.82608 3.52678 10.0979 4.46447 11.0355C5.40215 11.9732 6.67392 12.5 8 12.5V12.5ZM8.625 7.5H11.125V8.75H7.375V4.375H8.625V7.5Z"
                          fill="#616161"
                        />
                      </svg>

                      <p className="" id="overline">
                        POSTED{" "}
                        {timeAgo > 1
                          ? `${timeAgo} DAYS AGO`
                          : `${timeAgo} DAY AGO`}
                      </p>
                    </div>
                  </div>

                  {/* Card Section */}
                  <div className="title-header flex flex-col mb-[4px]">
                    <div className="card-section flex flex-row justify-center">
                      <div className="category flex flex-col items-center bg-white border-[1px] border-pink-tertiary rounded-[8px] px-[32px] pt-[8px] pb-[16px] mx-[16px] drop-shadow-xl mb-[50px]">
                        <p className="text-[#616161]" id="body1">
                          Category
                        </p>
                        <div className="flex flex-row">
                          <svg
                            className="mr-[12px]"
                            width="30"
                            height="29"
                            viewBox="0 0 30 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.5833 12.2174V1.20825L25.875 8.45825V25.3749H4.125V8.45825L12.5833 12.2174ZM15 5.27913V15.9366L6.54167 12.1775V22.9583H23.4583V9.89254L15 5.28033V5.27913Z"
                              fill="#616161"
                            />
                          </svg>
                          <h5 id="heading5" className="">
                            {post.job_category}
                          </h5>
                        </div>
                      </div>
                      <div className="type flex flex-col items-center  bg-white border-[1px] border-pink-tertiary  shadow-md rounded-[8px] px-[32px] pt-[8px] pb-[16px] mx-[16px] drop-shadow-xl mb-[50px]">
                        <p className="text-[#616161]" id="body1">
                          Type
                        </p>
                        <div className="flex flex-row">
                          <svg
                            className="mr-[12px]"
                            width="30"
                            height="29"
                            viewBox="0 0 30 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.0417 3.62492H25.875C26.1955 3.62492 26.5028 3.75222 26.7294 3.97883C26.956 4.20544 27.0833 4.51278 27.0833 4.83325V24.1666C27.0833 24.4871 26.956 24.7944 26.7294 25.021C26.5028 25.2476 26.1955 25.3749 25.875 25.3749H4.12499C3.80452 25.3749 3.49718 25.2476 3.27057 25.021C3.04396 24.7944 2.91666 24.4871 2.91666 24.1666V4.83325C2.91666 4.51278 3.04396 4.20544 3.27057 3.97883C3.49718 3.75222 3.80452 3.62492 4.12499 3.62492H8.95832V1.20825H11.375V3.62492H18.625V1.20825H21.0417V3.62492ZM24.6667 13.2916H5.33332V22.9583H24.6667V13.2916ZM18.625 6.04158H11.375V8.45825H8.95832V6.04158H5.33332V10.8749H24.6667V6.04158H21.0417V8.45825H18.625V6.04158ZM7.74999 15.7083H10.1667V18.1249H7.74999V15.7083ZM13.7917 15.7083H16.2083V18.1249H13.7917V15.7083ZM19.8333 15.7083H22.25V18.1249H19.8333V15.7083Z"
                              fill="#616161"
                            />
                          </svg>

                          <h5 id="heading5">{post.job_type}</h5>
                        </div>
                      </div>
                      <div className="salary flex flex-col items-center  bg-white border-[1px] border-pink-tertiary shadow-md rounded-[8px] px-[32px] pt-[8px] pb-[16px] mx-[16px] drop-shadow-xl mb-[50px]">
                        <p className="text-[#616161]" id="body1">
                          Salary
                        </p>
                        <div className="flex flex-row">
                          <svg
                            className="mr-[12px]"
                            width="30"
                            height="29"
                            viewBox="0 0 30 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 26.5834C8.32638 26.5834 2.91667 21.1737 2.91667 14.5001C2.91667 7.82646 8.32638 2.41675 15 2.41675C21.6736 2.41675 27.0833 7.82646 27.0833 14.5001C27.0833 21.1737 21.6736 26.5834 15 26.5834ZM15 24.1667C17.5638 24.1667 20.0225 23.1483 21.8354 21.3354C23.6482 19.5226 24.6667 17.0638 24.6667 14.5001C24.6667 11.9363 23.6482 9.47757 21.8354 7.66472C20.0225 5.85186 17.5638 4.83341 15 4.83341C12.4362 4.83341 9.97749 5.85186 8.16464 7.66472C6.35179 9.47757 5.33334 11.9363 5.33334 14.5001C5.33334 17.0638 6.35179 19.5226 8.16464 21.3354C9.97749 23.1483 12.4362 24.1667 15 24.1667ZM10.7708 16.9167H17.4167C17.5769 16.9167 17.7306 16.8531 17.8439 16.7398C17.9572 16.6265 18.0208 16.4728 18.0208 16.3126C18.0208 16.1523 17.9572 15.9987 17.8439 15.8854C17.7306 15.7721 17.5769 15.7084 17.4167 15.7084H12.5833C11.7822 15.7084 11.0138 15.3902 10.4473 14.8236C9.88077 14.2571 9.56251 13.4888 9.56251 12.6876C9.56251 11.8864 9.88077 11.118 10.4473 10.5515C11.0138 9.98501 11.7822 9.66675 12.5833 9.66675H13.7917V7.25008H16.2083V9.66675H19.2292V12.0834H12.5833C12.4231 12.0834 12.2694 12.1471 12.1561 12.2604C12.0428 12.3737 11.9792 12.5273 11.9792 12.6876C11.9792 12.8478 12.0428 13.0015 12.1561 13.1148C12.2694 13.2281 12.4231 13.2917 12.5833 13.2917H17.4167C18.2178 13.2917 18.9862 13.61 19.5527 14.1765C20.1192 14.743 20.4375 15.5114 20.4375 16.3126C20.4375 17.1138 20.1192 17.8821 19.5527 18.4486C18.9862 19.0152 18.2178 19.3334 17.4167 19.3334H16.2083V21.7501H13.7917V19.3334H10.7708V16.9167Z"
                              fill="#616161"
                            />
                          </svg>

                          <h5 id="heading5">{`${post.salary_min_range} - ${post.salary_max_range}`}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="box-3">
                  <section className="content-section flex flex-col">
                    <div className="about-company">
                      <h5 id="heading5" className="text-pink-tertiary mb-[8px]">
                        About {post.recruiters.company_name}
                      </h5>
                      <p className="mb-[16px]">
                        {post.recruiters.about_company}
                      </p>
                    </div>
                    <div className="about-job">
                      <h5 id="heading5" className="text-pink-tertiary mb-[8px]">
                        About the job position
                      </h5>
                      <p className="mb-[16px]">{post.job_description}</p>
                    </div>
                    <div className="mandatory-requirements">
                      <h5
                        id="heading5"
                        className="text-pink-tertiary  mb-[8px]"
                      >
                        Mandatory Requirements
                      </h5>
                      <p className="mb-[16px]">{post.requirement}</p>
                    </div>
                    <div className="optional-requirements">
                      <h5
                        id="heading5"
                        className="text-pink-tertiary  mb-[8px]"
                      >
                        Optional Requirements
                      </h5>
                      <p className="mb-[16px]">{post.optional_requirement}</p>
                    </div>
                    <div className="btn flex justify-center">
                      <button
                        className="apply-button active:opacity-[80%] bg-pink-primary rounded-[16px] text-white w-[173px] h-[56px] py-[16px] pr-[24px] text-right font-medium relative"
                        onClick={handleApply}
                      >
                        <Image
                          className="w-[20px] h-[20px] absolute left-[27px]"
                          src={applyIcon}
                          alt="apply icon"
                        />
                        Apply Now
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : (
            <PageNotFound/>
      )}
    </>
  );
}

export default JobDetails;
