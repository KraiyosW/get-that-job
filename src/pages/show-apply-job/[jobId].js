import React from "react";
import Image from "next/image";
import linkin from "../../image/linkin.png";
import phone from "../../image/phone.png";
import JobDate from "../../image/job-date.png";
import waiting from "../../image/waiting.png";
import download from "../../image/download.png";
import backIcon from "@/image/icon-back.png";
import TypeJob from "../../image/type-job.png";
import TimeWorking from "../../image/time-working.png";
import Salary from "../../image/salary.png";
import TTcandidate from "../../image/total-candidate.png";
import candidate from "../../image/candidate.png";
import show from "../../image/show.png";
import close from "../../image/close.png";
import closed from "../../image/closed.png";
import pencil from "../../image/pencil.png";
import review from "../../image/review.png";
import finished from "../../image/finished.png";
import { useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import numeral from "numeral";
import SideBarRecruiter from "@/components/SidebarRecruiter.js";
import moment from "moment";
import Link from "next/link";
import Warning from "@/components/Warning";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function ShowCandidates() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [post, setPost] = useState([]);
  const router = useRouter();
  const id = router.query["jobId"];
  const [jobStatus, setJobStatus] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchData = async () => {
    try {
      if (!id) return;
      const posts = await supabase
        .from("professional_apply_jobs")
        .select(`*, professional (*), jobs_postings (*)`)
        .eq("job_post_id", Number(id));
      const formattedPosts = posts.data.map((post) => ({
        ...post,
      }));
      setPost(formattedPosts);
      setIsLoading(false);
    } catch {
      console.error();
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("sb:token"); 
    setIsAuthenticated(!!token); 
    fetchData();
  }, [id, jobStatus, isUpdating]);


  const toggleExpanded = (postId) => {
    setIsExpanded((prevId) => (prevId === postId ? false : postId));
  };

  const handleStatus = async (jobId) => {
    setIsUpdating(true);
    let { data, error } = await supabase
      .from("jobs_postings")
      .update({ post_status: false })
      .match({ job_post_id: jobId });
    if (error) console.log("error", error);
    else {
      // อัพเดทสถานะของ job ใน state เมื่ออัพเดทข้อมูลในฐานข้อมูลสำเร็จ
      setJobStatus((prevState) =>
        prevState.map((job) =>
          job.job_post_id === jobId ? { ...job, post_status: false } : job
        )
      );
    }
    setIsUpdating(false);
  };

  const handleStatusCandidate = async (professional_apply_job_id) => {
    setIsUpdating(true);
    try {
      let { data, error } = await supabase
        .from("professional_apply_jobs")
        .update({ recruiter_status: 2 })
        .eq("professional_apply_job_id", professional_apply_job_id);

      if (error) throw error;

      setPost((prevState) => ({
        ...prevState,
        recruiter_status: 2,
      }));
    } catch (error) {
      console.log(error);
    }
    setIsUpdating(false);
  };

  const handleStatusFinished = async (professional_apply_job_id) => {
    setIsUpdating(true);
    try {
      let { data, error } = await supabase
        .from("professional_apply_jobs")
        .update({ recruiter_status: 3 })
        .eq("professional_apply_job_id", professional_apply_job_id);

      if (error) throw error;

      setPost((prevState) => ({
        ...prevState,
        recruiter_status: 3,
      }));
    } catch (error) {
      console.log(error);
    }
    setIsUpdating(false);
  };

  const handleGoBack = () => {
    router.push("/job-postings");
  };

  const handleEdit = (id) => {
    router.push(`/edit-job-post/${id}`);
  };

  const countInProgress = Array.from(post).filter(
    (item) => item.recruiter_status === 2
  ).length;

  if(!isAuthenticated){
    return (<Warning/>)
  }


  return (
    <>
      <SideBarRecruiter />
      <main className="bg-white-secondary h-screen">
        <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px]">
          <button
            className="flex flex-row items-center mb-[16px]"
            onClick={() => handleGoBack(post.jobs_postings)}
          >
            <Image
              className="w-[10px] h-[12px] mr-[13px]"
              src={backIcon}
              alt="back icon button"
            />
            <p className="text-[#616161]" id="body2">
              BACK
            </p>
          </button>
          <h4 className="max-[700px]:text-center mb-[24px]" id="heading4">
            Show Job Posting
          </h4>

          {post[0] && (
            <div className="bg-white px-[16px] py-[16px] border rounded-lg shadow-xl w-[100%] mb-[20px] h-auto ">
              <div className="flex flex-col" id="box-job-all">
                <div
                  className="max-[700px]:text-center flex flex-row flex-wrap justify-between w-[100%]"
                  id="job-head-row"
                >
                  <div id="job-title flex flex-col">
                    <h6 className="mb-[4px]" id="heading6">
                      {post[0].jobs_postings.job_title}
                    </h6>
                    <div className="max-[700px]:mb-[15px] flex flex-row">
                      <section className="flex flex-row mr-[9px]">
                        <Image
                          src={TypeJob}
                          alt="Type Job"
                          className="max-[700px]:w-[20px] max-[700px]:h-[20px] mr-[6px]"
                        />
                        <div className="text-grey-secondary" id="caption">
                          {post[0].jobs_postings.job_category}
                        </div>
                      </section>
                      <section className="flex flex-row mr-[9px]">
                        <Image
                          src={TimeWorking}
                          alt="Time working"
                          className="max-[700px]:w-[20px] max-[700px]:h-[20px] mr-[6px]"
                        />
                        <div className="text-grey-secondary" id="caption">
                          {post[0].jobs_postings.job_type}
                        </div>
                      </section>
                      <section className="flex flex-row mr-[9px]">
                        <Image
                          src={Salary}
                          alt="Salary"
                          className="max-[700px]:w-[20px] max-[700px]:h-[20px] mr-[6px]"
                        />
                        <div className="text-grey-secondary" id="caption">
                          {numeral(
                            post[0].jobs_postings.salary_min_range
                          ).format("0a")}{" "}
                          -{" "}
                          {numeral(
                            post[0].jobs_postings.salary_max_range
                          ).format("0a")}
                        </div>
                      </section>
                    </div>
                  </div>
                  <div className="max-[700px]:flex-col flex flex-row">
                    <div className="max-[700px]:flex-row mr-[20px] flex flex-col items-center justify-center">
                      <Image
                        src={JobDate}
                        alt="Job Date Open"
                        className="max-[700px]:mr-[10px]"
                      />
                      <div className="max-[700px]:mr-[5px]" id="caption">
                        Open on
                      </div>
                      <div id="caption">
                        {moment(post[0].jobs_postings.created_at).fromNow()}
                      </div>
                    </div>
                    <div className="max-[700px]:mt-[5px] max-[700px]:mb-[5px] max-[700px]:flex-row max-[700px]:justify-start mr-[20px] flex flex-col items-center justify-center">
                      <div className="flex flex-row">
                        <Image
                          src={TTcandidate}
                          alt="Total Candidates"
                          className="mr-[6px]"
                        />
                        <div className="max-[700px]:mr-[5px]" id="caption">
                          {post.length}
                        </div>
                      </div>
                      <div id="caption">Total</div>
                      <div id="caption">Candidates</div>
                    </div>
                    <div className="max-[700px]:flex-row max-[700px]:justify-start flex flex-col items-center justify-center">
                      <div className="flex flex-row">
                        <Image
                          src={candidate}
                          alt="Candidates on track"
                          className="mr-[6px]"
                        />
                        <div className="text-pink-primary" id="caption">
                          {countInProgress}
                        </div>
                      </div>
                      <div className="text-pink-primary" id="caption">
                        Candidates
                      </div>
                      <div className="text-pink-primary" id="caption">
                        on track
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center">
                    <button
                      onClick={() =>
                        handleStatus(post[0].jobs_postings.job_post_id)
                      }
                      className={`flex flex-row mr-[6px] ${
                        post[0].jobs_postings.post_status
                          ? "button_pink_tertiary"
                          : "button_gray"
                      }`}
                    >
                      <Image
                        src={post[0].jobs_postings.post_status ? close : closed}
                        alt="Close Botton"
                        className="w-[25px] h-[25px] mr-[5px]"
                      />
                      {post[0].jobs_postings.post_status ? "CLOSE" : "CLOSED"}
                    </button>
                    <button
                      className="button_pink_tertiary flex flex-row"
                      onClick={() =>
                        handleEdit(post[0].jobs_postings.job_post_id)
                      }
                    >
                      <Image
                        src={pencil}
                        alt="Edit Botton"
                        className="w-[20px] h-[20px] mr-[5px]"
                      />
                      EDIT
                    </button>
                    <button
                      onClick={() =>
                        toggleExpanded(post[0].jobs_postings.job_post_id)
                      }
                      className="text-pink-tertiary hover:text-pink-secondary transition-all duration-150 focus:outline-none ml-[22px] mt-[30px]"
                    >
                      <span className="ml-1">
                        {isExpanded === post[0].jobs_postings.job_post_id ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 inline"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 inline"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
                <div>
                  {isExpanded === post[0].jobs_postings.job_post_id && (
                    <div className={`mt-1 mb-2`}>
                      <div
                        className="text-pink-tertiary mt-[10px] mb-[8px]"
                        id="body1"
                      >
                        About the job position
                      </div>
                      <div className="" id="body2">
                        {post[0].jobs_postings.job_description}
                      </div>
                      <div>
                        <div
                          className="text-pink-tertiary mt-[16px] mb-[8px]"
                          id="body1"
                        >
                          Mandatory Requirements
                        </div>
                        <div className="" id="body2">
                          {post[0].jobs_postings.requirement}
                        </div>
                      </div>
                      <div>
                        <div
                          className="text-pink-tertiary mt-[16px] mb-[8px]"
                          id="body1"
                        >
                          Optional Requirements
                        </div>
                        <div className="" id="body2">
                          {post[0].jobs_postings.optional_requirement}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <h6
            className="max-[700px]:text-center mt-[20px] mb-[8px]"
            id="heading6"
          >
            {isLoading ? ( // Conditionally render based on isLoading
              <p></p>
            ) : post.length !== 0 ? (
              <p>{post.length} candidates found</p>
            ) : (
              <p>There are no candidates found.</p>
            )}
          </h6>

          <div className="flex flex-col">
            {Array.isArray(post) &&
              post.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white px-[16px] py-[16px] border rounded-lg shadow-xl w-[100%] mb-[20px] h-auto "
                  >
                    <div className="flex flex-col" id="box-job-all">
                      <div
                        className="max-[700px]:text-center flex flex-row flex-wrap w-[100%]"
                        id="job-head-row"
                      >
                        <div className="flex flex-col w-[35%]" id="job-title">
                          <h6 className="mb-[4px]" id="heading6">
                            {item.professional.name}
                          </h6>
                          <div className="max-[700px]:mb-[15px] flex flex-row">
                            <section className="flex flex-row mr-[9px] items-center">
                              <Image
                                src={linkin}
                                alt="job position"
                                className="w-[15px] h-[15px] mr-[6px]"
                              />
                              <div className="text-grey-primary" id="body2">
                                {item.jobs_postings.job_title}
                              </div>
                            </section>
                          </div>
                        </div>
                        <div className="max-[700px]:flex-col flex flex-row">
                          <div className="max-[700px]:flex-row flex flex-col items-start justify-center w-[280px]">
                            <div className="flex flex-row mb-[4px]">
                              <Image
                                src={JobDate}
                                alt="Email Candidate"
                                className="max-[700px]:mr-[10px] mr-[6px]"
                              />
                              <div
                                className="max-[700px]:mr-[5px] text-grey-secondary"
                                id="caption"
                              >
                                {item.professional.email}
                              </div>
                            </div>
                            <div className="flex flex-row">
                              <Image
                                src={phone}
                                alt="Phone Candidate"
                                className="max-[700px]:mr-[10px] mr-[6px]"
                              />
                              <div
                                className="max-[700px]:mr-[5px] text-grey-secondary"
                                id="caption"
                              >
                                {item.professional.phone_number}
                              </div>
                            </div>
                          </div>
                          <div className="max-[700px]:mt-[5px] max-[700px]:mb-[5px] max-[700px]:flex-row max-[700px]:justify-start flex flex-col items-center justify-center w-[200px]">
                            <Image
                              src={JobDate}
                              alt="Email Candidate Date"
                              className="mr-[6px]"
                            />
                            <div className="text-grey-primary" id="caption">
                              {moment(item.created_at).fromNow()}
                            </div>
                          </div>
                          {item.recruiter_status === 1 ? (
                            <div className="max-[700px]:flex-row max-[700px]:justify-start flex flex-col items-center justify-center w-[210px]">
                              <Image
                                src={waiting}
                                alt="Waiting for review"
                                className="mr-[6px]"
                              />
                              <div className="text-pink-primary" id="caption">
                                Waiting for
                              </div>
                              <div className="text-pink-primary" id="caption">
                                review
                              </div>
                            </div>
                          ) : item.recruiter_status === 2 ? (
                            <div className="max-[700px]:flex-row max-[700px]:justify-start flex flex-col items-center justify-center w-[210px]">
                              <Image
                                src={review}
                                alt="Review in progress"
                                className="mr-[6px]"
                              />
                              <div className="text-pink-primary" id="caption">
                                Review in
                              </div>
                              <div className="text-pink-primary" id="caption">
                                progress
                              </div>
                            </div>
                          ) : (
                            <div className="max-[700px]:flex-row max-[700px]:justify-start flex flex-col items-center justify-center w-[210px]">
                              <Image
                                src={finished}
                                alt="Review finished"
                                className="mr-[6px]"
                              />
                              <div className="text-pink-primary" id="caption">
                                Review
                              </div>
                              <div className="text-pink-primary" id="caption">
                                finished
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-row items-center">
                          {item.recruiter_status === 1 ||
                          item.recruiter_status === null ? (
                            <button
                              onClick={() =>
                                handleStatusCandidate(
                                  item.professional_apply_job_id
                                )
                              }
                              className="button_bg_white"
                              id="btn-white"
                            >
                              MARK AS STARTED
                            </button>
                          ) : item.recruiter_status === 2 ? (
                            <button
                              onClick={() =>
                                handleStatusFinished(
                                  item.professional_apply_job_id
                                )
                              }
                              className="button_bg_white"
                              id="btn-white"
                            >
                              MARK AS FINISHED
                            </button>
                          ) : (
                            <button className="button_gray" id="btn-gray">FINISHED</button>
                          )}
                          <button
                            onClick={() =>
                              toggleExpanded(item.professional_apply_job_id)
                            }
                            className="text-pink-tertiary hover:text-pink-secondary transition-all duration-150 focus:outline-none ml-[22px] mt-[30px]"
                          >
                            <span className="ml-1">
                              {isExpanded === item.professional_apply_job_id ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 inline"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 15l7-7 7 7"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 inline"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              )}
                            </span>
                          </button>
                        </div>
                      </div>
                      <div>
                        {isExpanded === item.professional_apply_job_id && (
                          <div className={`mt-1 mb-2`}>
                            <div
                              className="text-pink-tertiary mt-[10px] mb-[8px]"
                              id="body1"
                            >
                              Professional experience
                            </div>
                            <div className="" id="body2">
                              {item.professional_experience}
                            </div>
                            <div>
                              <div
                                className="text-pink-tertiary mt-[16px] mb-[8px]"
                                id="body1"
                              >
                                Why are you interested in working at The company
                              </div>
                              <div className="" id="body2">
                                {item.interested}
                              </div>
                            </div>
                            <div className="flex justify-center mt-[25px]">
                              {item.professional.cv !== null ? (
                                <Link
                                  href={`https://zsvpcibqzkxoqqpektgc.supabase.co/storage/v1/object/public/professional_cv/${item.professional.name}/${item.professional.cv}`}
                                >
                                  <button className="button_bg_white flex flex-row justify-center w-[200px]">
                                    <Image
                                      src={download}
                                      alt="Download cv"
                                      className="mr-[6px]"
                                    />
                                    Download cv
                                  </button>
                                </Link>
                              ) : (
                                <div className="alert">
                                  CV is not available for download.
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </>
  );
}

export default ShowCandidates;
