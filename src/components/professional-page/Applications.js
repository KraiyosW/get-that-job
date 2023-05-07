import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import logoMockup from "../../image/logo-mockup.png";
import moment from "moment";
import numeral from "numeral";
import categorypic from "../../image/type-job.png";
import typeJob from "../../image/time-working.png";
import salary from "../../image/salary.png";
import time from "../../image/time.png";
import letter from "../../image/letter.png";
import waiting from "../../image/waiting.png";
import { useAuth } from "@/contexts/authentication";
import Warning from "../Warning";
import review from "../../image/review.png";
import finished from "../../image/finished.png";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function Applications() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [job, setJob] = useState([]);
  const [jobStatus, setJobStatus] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const router = useRouter();
  function getFormattedDate(date) {
    const differenceInDays = moment().diff(moment(date), 'days');
  
    if (differenceInDays > 7) {
      const formattedDate = moment(date).format('DD/MM/YYYY');
      return formattedDate;
    } else {
      return moment(date).fromNow();
    }
  }

  const AllJob = async () => {
    const userEmail = String(localStorage.getItem('email'));
    try {
      const result = await supabase
        .from("professional_apply_jobs")
        .select(`*, professional (*), jobs_postings (*, recruiters (*))`)
        .limit(20)
        .order("created_at", { ascending: true });

      const filteredResult = result.data.filter((item) => item.professional?.email === userEmail);

      // Remove duplicates based on job_title
      const uniqueJobTitles = new Set();
      const uniqueFilteredResult = filteredResult.filter((item) => {
        if (!uniqueJobTitles.has(item.jobs_postings.job_title)) {
          uniqueJobTitles.add(item.jobs_postings.job_title);
          return true;
        }
        return false;
      });

      const formattedJobs = uniqueFilteredResult.map((job) => ({
        ...job,
        pro_created_at: getFormattedDate(job.created_at),
        created_at: getFormattedDate(job.jobs_postings.created_at),
        company_name: job.jobs_postings.recruiters.company_name,
        salary_min_range: numeral(job.jobs_postings.salary_min_range).format("0a"),
        salary_max_range: numeral(job.jobs_postings.salary_max_range).format("0a"),
        job_title: job.jobs_postings.job_title,
        job_category: job.jobs_postings.job_category,
        job_type: job.jobs_postings.job_type,
        job_description: job.jobs_postings.job_description,
        requirement: job.jobs_postings.requirement,
        optional_requirement: job.jobs_postings.optional_requirement,
        company_logo: job.jobs_postings.recruiters.logo,
      }));
      setJob(formattedJobs);
    } catch (error) {
      console.error(error);
    }finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("sb:token");
    setIsAuthenticated(!!token);
    AllJob();
  }, [jobStatus, isAuthenticated]);

  const toggleExpanded = (postId) => {
    setIsExpanded((prevId) => (prevId === postId ? null : postId));
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  if (isLoading) {
    return (
      <div className="bg-[#F5F5F6] h-screen"></div>
    );
  }
  if (!isAuthenticated) {
  return (
    <Warning />
  );
}


  return (
    <>
      <main className="bg-white-secondary h-screen">
        <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px]">
          <h4 className="max-[700px]:text-center mb-[24px]" id="heading4">
            Your applications
          </h4>


          <div className="flex flex-col">
            <h6
              className="max-[700px]:text-center mb-[8px] text-[#bf5f82]"
              id="heading6"
            >
              {job.length} applications found
            </h6>
            {job.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-white px-[16px] py-[16px] border rounded-lg shadow-xl max-[920px]:w-[100%] w-[70%] mb-[20px] h-auto "
                >
                  <div className="flex flex-col" id="box-job-all">
                    <div
                      className="max-[700px]:text-center flex flex-row flex-wrap max-[700px]:justify-between items-center w-[100%]"
                      id="job-head-row"
                    >
                      <div className="min-[701px]:flex min-[701px]:flex-row max-[919px]:w-[100%] min-[920px]:w-[40%]">
                        <div className="max-[700px]:flex max-[700px]:w-full max-[700px]:justify-center max-[700px]:mb-[20px] min-[701px]:mr-[18px]">
                          <Image
                            className="w-[60px] min-[701px]:w-[100px] min-[821px]:w-[60px] h-[60px]"
                            src={
                              item.company_logo !== null
                                ? `https://zsvpcibqzkxoqqpektgc.supabase.co/storage/v1/object/public/recruiters_logo/${item.company_logo}`
                                : logoMockup
                            }
                            width={200}
                            height={200}
                            alt="logo company"
                          />
                        </div>
                        <div id="job-title flex flex-col">
                          <h6 id="heading6">{item.job_title}</h6>
                          <div className="max-[700px]:mb-[15px] flex flex-row max-[700px]:justify-center">
                            <section className="flex flex-row mr-[9px]">
                              <div className="text-[#616161]" id="body2">
                                {item.company_name}
                              </div>
                            </section>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col max-[919px]:w-[100%] min-[920px]:w-[35%]">
                        <div className="max-[700px]:flex-col flex flex-row mb-[8px]">
                          <div className="flex flex-row mr-[9px] max-[700px]:mb-[8px] max-[700px]:items-center">
                            <Image
                              src={categorypic}
                              alt="category"
                              className="max-[768px]:w-[20px] max-[768px]:h-[20px] mr-[6px]"
                            />
                            <div className="text-grey-secondary" id="caption">
                              {item.job_category}
                            </div>
                          </div>
                          <div className="flex flex-row mr-[9px] max-[700px]:items-center">
                            <Image
                              src={typeJob}
                              alt="Type Job"
                              className="max-[768px]:w-[20px] max-[768px]:h-[20px] mr-[6px]"
                            />
                            <div className="text-grey-secondary" id="caption">
                              {item.job_type}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row flex-wrap">
                          <div className="flex flex-row mr-[9px] max-[700px]:mb-[8px] max-[700px]:items-center">
                            <Image
                              src={salary}
                              alt="Salary"
                              className="max-[700px]:w-[20px] max-[700px]:h-[20px] mr-[6px]"
                            />
                            <div
                              className="text-grey-secondary"
                              id="caption"
                              key={index}
                            >
                              {item.salary_min_range} - {item.salary_max_range}
                            </div>
                          </div>
                          <div className="max-[700px]:flex-row mr-[20px] flex flex-row max-[700px]:items-center">
                            <Image
                              src={time}
                              alt="Date Post Job"
                              className="max-[700px]:w-[20px] max-[700px]:h-[20px] mr-[6px]"
                            />
                            <div className="text-grey-secondary" id="caption">
                              Posted {item.created_at}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center max-[700px]:mt-[8px]">
                        <div className="flex flex-col items-center max-[700px]:mr-[15px] mr-[4px]">
                          <Image src={letter} alt="Sent Time" className="" />
                          <p
                            className="text-center text-[#616161]"
                            id="caption"
                          >
                            Sent
                            <br />
                            {item.pro_created_at}
                          </p>
                        </div>
                        <div className="flex flex-col items-center max-[700px]:mr-[15px]">
                          {item.recruiter_status === 1 || item.recruiter_status === null ? (
                            <div className="flex flex-col items-center">
                              <Image
                                src={waiting}
                                alt="Waiting for review"
                                className=""
                              />
                              <p
                                className="text-center text-[#F48FB1]"
                                id="caption"
                              >
                                Waiting for
                                <br />
                                review
                              </p>
                            </div>
                          ) : item.recruiter_status === 2 ? (
                            <div className="flex flex-col items-center">
                              <Image
                                src={review}
                                alt="Review in progress"
                                className=""
                              />
                              <p className="text-center text-[#F48FB1]" id="caption">Review in<br />progress</p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <Image
                                src={finished}
                                alt="Review finished"
                                className=""
                              />
                              <p className="text-center text-[#F48FB1]" id="caption">Review<br />finished</p>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => toggleExpanded(item.job_post_id)}
                          className="text-pink-tertiary hover:text-pink-secondary transition-all duration-150 focus:outline-none ml-[22px] mt-[30px]"
                        >
                          <span className="ml-1">
                            {isExpanded === item.job_post_id ? (
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
                      {isExpanded === item.job_post_id && (
                        <div className={`mt-1 mb-2`}>
                          <div
                            className="text-pink-tertiary mt-[10px] mb-[8px]"
                            id="body1"
                          >
                            About the job position
                          </div>
                          <div className="text-justify" id="body2">
                            {item.job_description}
                          </div>
                          <div>
                            <div
                              className="text-pink-tertiary mt-[16px] mb-[8px]"
                              id="body1"
                            >
                              Mandatory Requirements
                            </div>
                            <div className="text-justify" id="body2">
                              {item.requirement}
                            </div>
                          </div>
                          <div>
                            <div
                              className="text-pink-tertiary mt-[16px] mb-[8px]"
                              id="body1"
                            >
                              Optional Requirements
                            </div>
                            <div className="text-justify" id="body2">
                              {item.optional_requirement}
                            </div>
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

export default Applications;