import React from "react";
import Image from "next/image";
import numeral from "numeral";
import TypeJob from "../../image/type-job.png";
import TimeWorking from "../../image/time-working.png";
import Salary from "../../image/salary.png";
import JobDate from "../../image/job-date.png";
import TTcandidate from "../../image/total-candidate.png";
import candidate from "../../image/candidate.png";
import show from "../../image/show.png";
import close from "../../image/close.png";
import closed from "../../image/closed.png";
import pencil from "../../image/pencil.png";
import Warning from "../Warning";
import { useState, useEffect } from 'react'
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useAuth } from '@/contexts/authentication.js';
import Link from "next/link";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function JobPostings() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [job, setJob] = useState([]);
  const [jobStatus, setJobStatus] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedOption, setSelectedOption] = useState("all");
  const [myState,setMyState] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router= useRouter()
  const userEmail = String(myState);

  useEffect(() => {
    const storedState = localStorage.getItem("email");
    if (storedState) {
      setMyState(storedState);
    }
  }, [myState]);

  useEffect(() => {
    localStorage.setItem("myState", myState);
  }, [myState]);


  const AllJob = async () => {
    console.log(userEmail)
    try {
      const { data: jobPostingsData, error } = await supabase
        .rpc("get_jobs_by_email", { user_email: userEmail });
  
      if (error) {
        console.error("Error fetching data:", error);
        return;
      }
  
      if (!jobPostingsData || jobPostingsData.length === 0) {
        console.warn("No job postings found for the given email");
        setJob([]);
        return;
      }
  
      console.log(jobPostingsData);
      const formattedJobs = jobPostingsData.map(job => ({
        ...job,
        created_at: new Date(job.created_at).toLocaleDateString('en-GB')
      }));
      setJob(formattedJobs);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem("sb:token"); 
    setIsAuthenticated(!!token); 
    AllJob();
  }, [jobStatus,isAuthenticated,userEmail]);

  
  if (!isAuthenticated) {
    return(
      <Warning/>
    );
  }

  const toggleExpanded = (postId) => {
    setIsExpanded((prevId) => (prevId === postId ? null : postId));
  };

  const handleEdit = (id) =>{
    router.push(`edit-job-post/${id}`);
  }

  const handleShowCandidate = (id) =>{
    router.push(`show-apply-job/${id}`);
  }



  const handleStatus = async (jobId) => {
    setIsUpdating(true)
    let { data, error } = await supabase
      .from('jobs_postings')
      .update({ post_status: false })
      .match({ job_post_id: jobId })
    if (error) console.log('error', error)
    else {
      // อัพเดทสถานะของ job ใน state เมื่ออัพเดทข้อมูลในฐานข้อมูลสำเร็จ
      setJobStatus((prevState) =>
        prevState.map((job) =>
          job.job_post_id === jobId ? { ...job, post_status: false } : job
        )
      )
    }
    setIsUpdating(false)
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

 

  return (
    <>
    <main className="bg-white-secondary h-screen">
        <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px]">
    <h4 className="max-[700px]:text-center mb-[24px]" id="heading4">
            Job Postings
          </h4>
          <p className="max-[700px]:text-center mb-[6px]" id="overline">
            Filter your Job Postings
          </p>
          <form className="flex flex-row flex-wrap gap-[12px]">
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
                  value="candidates"
                  checked={selectedOption === "candidates"}
                  onChange={handleOptionChange}
                  className="mr-[3px] w-5 h-5 relative top-[4px] accent-pink-primary"
                />
                With candidates on track
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="closed"
                  checked={selectedOption === "closed"}
                  onChange={handleOptionChange}
                  className="mr-[3px] w-5 h-5 relative top-[4px] accent-pink-primary"
                />
                Closed
              </label>
            </div>
          </form>
      <div className="flex flex-col">
        <h6
          className="max-[700px]:text-center mt-[20px] mb-[8px]"
          id="heading6"
        >
          {job.length} jobs postings found
        </h6>
        {job.map((item, index) => {
          return (
            <div key={index} className="bg-white px-[16px] py-[16px] border rounded-lg shadow-xl w-[100%] mb-[20px] h-auto ">
              <div className="flex flex-col" id="box-job-all">
                <div
                  className="max-[700px]:text-center flex flex-row flex-wrap justify-between w-[100%]"
                  id="job-head-row"
                >
                  <div id="job-title flex flex-col">
                    <h6 className="mb-[4px]" id="heading6">
                      {item.job_title}
                    </h6>
                    <div className="max-[700px]:mb-[15px] flex flex-row">
                      <section className="flex flex-row mr-[9px]">
                        <Image
                          src={TypeJob}
                          alt="Type Job"
                          className="max-[700px]:w-[20px] max-[700px]:h-[20px] mr-[6px]"
                        />
                        <div className="text-grey-secondary" id="caption">
                          {item.job_category}
                        </div>
                      </section>
                      <section className="flex flex-row mr-[9px]">
                        <Image
                          src={TimeWorking}
                          alt="Time working"
                          className="max-[700px]:w-[20px] max-[700px]:h-[20px] mr-[6px]"
                        />
                        <div className="text-grey-secondary" id="caption">
                          {item.job_type}
                        </div>
                      </section>
                      <section className="flex flex-row mr-[9px]">
                        <Image
                          src={Salary}
                          alt="Salary"
                          className="max-[700px]:w-[20px] max-[700px]:h-[20px] mr-[6px]"
                        />
                        <div className="text-grey-secondary" id="caption" key={index}>
                          {numeral(item.salary_min_range).format("0a")} - {numeral(item.salary_max_range).format("0a")}
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
                      <div id="caption">{item.created_at}</div>
                    </div>
                    <div className="max-[700px]:mt-[5px] max-[700px]:mb-[5px] max-[700px]:flex-row max-[700px]:justify-start mr-[20px] flex flex-col items-center justify-center">
                      <div className="flex flex-row">
                        <Image
                          src={TTcandidate}
                          alt="Total Candidates"
                          className="mr-[6px]"
                        />
                        <div className="max-[700px]:mr-[5px]" id="caption">
                          5
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
                          3
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
                  <div className="max-[700px]:mt-[10px] max-[700px]:mb-[10px] flex flex-row items-center">
                    <button onClick={()=>(handleShowCandidate(item.job_post_id))}>
                    <Image
                      src={show}
                      alt="Show"
                      className="w-[25px] h-[25px] mr-[5px]"
                    />
                    <div id="body2">SHOW</div>
                    </button>
                  </div>
                  <div className="flex flex-row items-center">
                    <button onClick={() => handleStatus(item.job_post_id)} className={`flex flex-row mr-[6px] ${item.post_status ? 'button_pink_tertiary' : 'button_gray'}`}>
                      <Image
                        src={item.post_status ? close : closed}
                        alt="Close Botton"
                        className="w-[25px] h-[25px] mr-[5px]"
                      />
                      {item.post_status ? 'CLOSE' : 'CLOSED'}
                    </button>
                    <button className="button_pink_tertiary flex flex-row" onClick={()=> handleEdit(item.job_post_id)}>
                      <Image
                        src={pencil}
                        alt="Edit Botton"
                        className="w-[20px] h-[20px] mr-[5px]"
                      />
                      EDIT
                    </button>
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
                      <div className="text-pink-tertiary mt-[10px] mb-[8px]" id="body1">
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        }
        )
        }
      </div>
      </div>
      </main>
    </>
  );
}

export default JobPostings;
