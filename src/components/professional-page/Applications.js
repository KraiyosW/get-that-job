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
// import review from "../../image/review.png";
// import finished from "../../image/finished.png";
// import declined from "../../image/declined.png";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function Applications() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [job, setJob] = useState([]);
  const [jobStatus, setJobStatus] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
  const {professionalState} = useAuth();
  
  const router = useRouter();
  const AllJob = async () => {
    const userEmail = String(localStorage.getItem('email'));
    try {
      const result = await supabase
        .from("professional_apply_jobs")
        .select(`*, professional (*), jobs_postings (*, recruiters (*))`)
        .limit(20)
        .order("created_at", { ascending: true });
  
      console.log(result.data.map((item)=> item.professional?.email === userEmail)); /// add dot notaion prevent email undefinde
  
      const filteredResult = result.data.filter((item) => {
        if (item.professional?.email === userEmail) {
          return true;
        }
        return false;
      });

      console.log(filteredResult);
  
      const formattedJobs = filteredResult.map((job) => ({
        ...job,
        pro_created_at: moment(job.created_at).fromNow(),
        created_at: moment(job.jobs_postings.created_at).fromNow(),
        company_name: job.jobs_postings.recruiters.company_name,
        salary_min_range: numeral(job.jobs_postings.salary_min_range).format(
          "0a"
        ),
        salary_max_range: numeral(job.jobs_postings.salary_max_range).format(
          "0a"
        ),
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
    }
  };
  useEffect(() => {
    AllJob();
  }, [jobStatus]);

  const toggleExpanded = (postId) => {
    setIsExpanded((prevId) => (prevId === postId ? null : postId));
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <main className="bg-white-secondary h-screen">
        <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px]">
          <h4 className="max-[700px]:text-center mb-[24px]" id="heading4">
            Your applications
          </h4>
          <p className="max-[700px]:text-center mb-[6px]" id="overline">
            Filter your applications
          </p>
          <form className="flex max-[700px]:flex-col flex-row flex-wrap gap-[12px]">
            <div>
              <label>
                <input
                  type="radio"
                  value="all"
                  checked={selectedOption === "all"}
                  onChange={handleOptionChange}
                  className="mr-[3px] w-5 h-5 relative top-[4px] accent-pink-primary"
                  id="my-radio"
                />
                <span>All</span>
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="waiting"
                  checked={selectedOption === "waiting"}
                  onChange={handleOptionChange}
                  className="mr-[3px] w-5 h-5 relative top-[4px] accent-pink-primary"
                />
                Waiting
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="in-progress"
                  checked={selectedOption === "in-progress"}
                  onChange={handleOptionChange}
                  className="mr-[3px] w-5 h-5 relative top-[4px] accent-pink-primary"
                />
                In progress
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="finished"
                  checked={selectedOption === "finished"}
                  onChange={handleOptionChange}
                  className="mr-[3px] w-5 h-5 relative top-[4px] accent-pink-primary"
                />
                Finished
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="declined"
                  checked={selectedOption === "declined"}
                  onChange={handleOptionChange}
                  className="mr-[3px] w-5 h-5 relative top-[4px] accent-pink-primary"
                />
                Declined
              </label>
            </div>
          </form>
          <div className="flex flex-col">
            <h6
              className="max-[700px]:text-center mt-[20px] mb-[8px]"
              id="heading6"
            >
              {job.length} applications found
            </h6>
            {job.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-white px-[16px] py-[16px] border rounded-lg shadow-xl w-[100%] mb-[20px] h-auto "
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
                                ? logoMockup
                                : `https://zsvpcibqzkxoqqpektgc.supabase.co/storage/v1/object/public/recruiters_logo/${item.company_logo}`
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
                      <div className="flex flex-col max-[919px]:w-[100%] min-[920px]:w-[40%]">
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
                          {/* <Image
                        src={review}
                        alt="Review in progress"
                        className=""
                      />
                      <p className="text-center text-[#F48FB1]" id="caption">Review in<br/>progress</p> */}
                          {/* <Image
                        src={review}
                        alt="Review in progress"
                        className=""
                      />
                      <p className="text-center text-[#F48FB1]" id="caption">Review in<br/>progress</p> */}
                          {/* <Image
                        src={finished}
                        alt="Review finished"
                        className=""
                      />
                      <p className="text-center text-[#F48FB1]" id="caption">Review<br/>finished</p> */}
                          {/* <Image
                        src={declined}
                        alt="Declined Date"
                        className=""
                      />
                      <p className="text-center text-[#F48FB1]" id="caption">Declined on<br/>07/11/20</p> */}
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
                          <div className="" id="body2">
                            {item.job_description}
                          </div>
                          <div>
                            <div
                              className="text-pink-tertiary mt-[16px] mb-[8px]"
                              id="body1"
                            >
                              Mandatory Requirements
                            </div>
                            <div className="" id="body2">
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
                            <div className="" id="body2">
                              {item.optional_requirement}
                            </div>
                          </div>
                          <div className="flex justify-center">
                            <button className="button_pink_tertiary flex flex-row mt-[16px]">
                              <svg
                                className="max-[700px]:hidden mr-[10px]"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM12 10.586L14.828 7.757L16.243 9.172L13.414 12L16.243 14.828L14.828 16.243L12 13.414L9.172 16.243L7.757 14.828L10.586 12L7.757 9.172L9.172 7.757L12 10.586Z"
                                  fill="white"
                                />
                              </svg>
                              DECLINE APPLICATION
                            </button>
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
