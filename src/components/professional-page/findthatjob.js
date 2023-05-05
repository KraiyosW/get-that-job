import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import babyswim from "../../image/babyswim.png";
import following from "../../image/following.png";
import categorypic from "../../image/categorypic.png";
import calendar from "../../image/calendar.png";
import dollar from "../../image/dollar.png";
import Warning from "../Warning";
import { createClient } from "@supabase/supabase-js";

const Findthatjob = () => {

  const [job, setJob] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [category, setCategory] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [followStatus, setFollowStatus] = useState({});

  const getJobs = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/findthatjob?profid=${profId}`
      );
      setJob(result.data.job.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [formData, setFormData] = useState({
    job_category: "",
    job_type: "",
    salary_min_range: "",
    salary_max_range: "",
  });

  // ฟังก์ชั่นสำหรับการเปลี่ยนค่าใน form
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      job_category: category,
      job_type: selectedJobType,
    });
  };

  // ฟังก์ชั่นสำหรับการเลือก option ของ job category
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  // ฟังก์ชั่นสำหรับการเลือก option ของ job type
  const handleSelectJobType = (event) => {
    setSelectedJobType(event.target.value);
  };

  const handleSeeMore = (id) => {
    router.push(`find-that-job/${id}`);
  };
  //ตัด job_description ให้สั้น
  function shortenText(text, maxLength) {
    if (text !== null && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  function handleSalaryMin(event) {
    setSalaryMin(event.target.value);
  }

  function handleSalaryMax(event) {
    setSalaryMax(event.target.value);
  }

  useEffect(() => {
    const token = localStorage.getItem("sb:token"); // ใช้ localStorage ในการเก็บ token
    setIsAuthenticated(!!token);
    getJobs();
  }, [isAuthenticated, followStatus]);
  console.log(job);

  if (!isAuthenticated) {
    return <Warning />;
  }
  const profId = localStorage.getItem("professional_id");

  const handleFollowClick = async (id, status) => {
    console.log(id);
    console.log(status);
    await axios.post("/api/following", {
      professional_id: profId,
      job_post_id: id,
    });

    const newFollowStatus = { ...followStatus };
    if (status) {
      if (status.follow_status === undefined) {
        newFollowStatus[id] = true;
      } else if (status.follow_status) {
        newFollowStatus[id] = false;
      } else if (!status.follow_status) {
        newFollowStatus[id] = true;
      }
    }

    setFollowStatus(newFollowStatus);
  };

  const filterJobs = job.filter((jobs) => {
    if (
      category !== "Select or create a category" &&
      searchMessage.toLowerCase() !== "" &&
      selectedJobType !== "Select a type"
    ) {
      return (
        jobs.job_category.includes(category) &&
        (jobs.job_title.toLowerCase().includes(searchMessage) ||
          jobs.job_description.toLowerCase().includes(searchMessage)) &&
        jobs.job_type.includes(selectedJobType)
      );
    } else if (
      category !== "Select or create a category" &&
      selectedJobType !== "Select a type"
    ) {
      return (
        jobs.job_category.includes(category) &&
        jobs.job_type.includes(selectedJobType)
      );
    } else if (
      searchMessage.toLowerCase() !== "" &&
      selectedJobType !== "Select a type"
    ) {
      return (
        (jobs.job_title.toLowerCase().includes(searchMessage) ||
          jobs.job_description.toLowerCase().includes(searchMessage)) &&
        jobs.job_type.includes(selectedJobType)
      );
    } else if (category !== "Select or create a category") {
      return jobs.job_category.includes(category);
    } else if (searchMessage.toLowerCase() !== "") {
      return (
        jobs.job_title.toLowerCase().includes(searchMessage) ||
        jobs.job_description.toLowerCase().includes(searchMessage)
      );
    } else if (selectedJobType !== "Select a type") {
      return jobs.job_type.includes(selectedJobType);
    } else {
      return jobs;
    }
  });

  // const filterJobs = job.filter((jobs) => {
  //     if (category !== "Select or create a category" && searchMessage.toLowerCase() !== "" && selectedJobType !== "Select a type" && salaryMin !== "" && salaryMax !== "") {
  //         return (
  //             (jobs.job_category.includes(category) &&
  //                 jobs.job_title.toLowerCase().includes(searchMessage) &&
  //                 jobs.job_type.includes(selectedJobType) &&
  //                 jobs.salary_min_range >= salaryMin &&
  //                 jobs.salary_max_range <= salaryMax) ||
  //             (jobs.job_category.includes(category) &&
  //                 jobs.job_description.toLowerCase().includes(searchMessage) &&
  //                 jobs.job_type.includes(selectedJobType) &&
  //                 jobs.salary_min_range >= salaryMin &&
  //                 jobs.salary_max_range <= salaryMax)
  //         );
  //     } else if (category !== "Select or create a category" && selectedJobType !== "Select a type" && salaryMin !== "" && salaryMax !== "") {
  //         return jobs.job_category.includes(category) && jobs.job_type.includes(selectedJobType) && jobs.salary_min_range >= salaryMin && jobs.salary_max_range <= salaryMax;
  //     } else if (searchMessage.toLowerCase() !== "" && selectedJobType !== "Select a type" && salaryMin !== "" && salaryMax !== "") {
  //         return (
  //             jobs.job_title.toLowerCase().includes(searchMessage) ||
  //             jobs.job_description.toLowerCase().includes(searchMessage)) &&
  //             jobs.job_type.includes(selectedJobType) &&
  //             jobs.salary_min_range >= salaryMin &&
  //             jobs.salary_max_range <= salaryMax;
  //     } else if (category !== "Select or create a category" && salaryMin !== "" && salaryMax !== "") {
  //         return jobs.job_category.includes(category) && jobs.salary_min_range >= salaryMin && jobs.salary_max_range <= salaryMax;
  //     } else if (searchMessage.toLowerCase() !== "" && salaryMin !== "" && salaryMax !== "") {
  //         return (
  //             jobs.job_title.toLowerCase().includes(searchMessage) ||
  //             jobs.job_description.toLowerCase().includes(searchMessage)) &&
  //             jobs.salary_min_range >= salaryMin &&
  //             jobs.salary_max_range <= salaryMax;
  //     } else if (selectedJobType !== "Select a type" && salaryMin !== "" && salaryMax !== "") {
  //         return jobs.job_type.includes(selectedJobType) && jobs.salary_min_range >= salaryMin && jobs.salary_max_range <= salaryMax;
  //     } else if (category !== "Select or create a category") {
  //         return jobs.job_category.includes(category);
  //     } else if (searchMessage.toLowerCase() !== "") {
  //         return (
  //             jobs.job_title.toLowerCase().includes(searchMessage) ||
  //             jobs.job_description.toLowerCase
  //                 ().includes(searchMessage)
  //         );
  //     } else if (selectedJobType !== "Select a type") {
  //         return jobs.job_type.includes(selectedJobType);
  //     } else {
  //         return jobs;
  //     }
  // });

  return (
    <main className="bg-[#F5F5F6] h-screen">
      <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px]">
        <div className="flex flex-col">
          <div className="text-[#616161] w-[100%] h-[100%] flex-col grid mt-[10px]">
            <div className="flex flex-col flex-wrap">
              <h4 className="mb-[16px]" id="heading4">
                Find That Job
              </h4>
              <p className="mb-[4px] tracking-[1.5px]" id="overline">
                SEARCH BY JOB TITLE OR COMPANY NAME
              </p>
              <input
                className="border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] w-full max-w-[360px] h-[36px]"
                placeholder="manufacturing, sales, swim"
                type="text"
                id="input-glasses"
                value={searchMessage}
                onChange={(e) => {
                  setSearchMessage(e.target.value);
                }}
              />
              <div className="flex flex-row flex-wrap gap-[20px] mt-[7px]  text-[#616161]">
                <div>
                  <p
                    className="text-[#616161] mb-[4px] tracking-[1.5px]"
                    id="overline"
                  >
                    CATEGORY
                  </p>
                  <select
                    className="text-[#616161] border-solid border border-[#F48FB1] rounded-[8px] w-full max-w-[360px] h-[36px]"
                    id="category"
                    name="job_category"
                    value={category}
                    onChange={(event) => {
                      handleCategory(event);
                    }}
                  >
                    <option
                      className="text-[#616161]/75"
                      value="Select or create a category"
                    >
                      Select or create a category
                    </option>
                    <option value="Software-Developer">
                      Software Developer
                    </option>
                    <option value="Sales">Sales</option>
                    <option value="Graphic-Designer">Graphic Designer</option>
                    <option value="Digital-Marketing">Digital Marketing</option>
                  </select>
                </div>
                <div>
                  <p
                    className="text-[#616161] mb-[4px] tracking-[1.5px]"
                    id="overline"
                  >
                    TYPE
                  </p>
                  <select
                    className="text-[#616161] border-solid border border-[#F48FB1] rounded-[8px] w-full max-w-[360px] h-[36px]"
                    id="type"
                    name="job_type"
                    value={selectedJobType}
                    onChange={(event) => {
                      handleSelectJobType(event);
                    }}
                  >
                    <option className="text-[#616161]/75" value="Select a type">
                      Select a type
                    </option>
                    <option value="Full-Time">Full Time</option>
                    <option value="Part-Time">Part Time</option>
                  </select>
                </div>
                <div>
                  <p
                    className="text-[#616161] mb-[4px] tracking-[1.5px]"
                    id="overline"
                  >
                    SALARY RANGE
                  </p>
                  <div className="flex flex-row items-center max-[700px]:justify-center">
                    <input
                      className="text-[#616161] border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[90px] w-[102px] h-[36px] mr-[8px]"
                      name="salary_min_range"
                      placeholder="min"
                      type="text"
                      id="input-range"
                      value={salaryMin}
                      onChange={handleSalaryMin}
                    />
                    <svg
                      width="11"
                      height="2"
                      viewBox="0 0 11 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="1"
                        y1="1"
                        x2="10"
                        y2="1"
                        stroke="#8E8E8E"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                    <input
                      className="text-[#616161] border-solid border border-[#F48FB1] rounded-[8px] gap-[8px] p-[8px] max-[767px]:w-[90px] w-[102px] h-[36px] ml-[8px]"
                      name="salary_max_range"
                      placeholder="max"
                      type="text"
                      id="input-range"
                      value={salaryMax}
                      onChange={handleSalaryMax}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-wrap w-full items-center">
            <h6 className="max-[700px]:text-center mb-4 mt-4">
              {filterJobs.length} jobs for you
            </h6>
            <div className="flex felx-row flex-wrap gap-[15px]">
              {filterJobs.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white flex felx-row flex-wrap justify-center gap-[10px] border-[1px] border-[#E1E2E1] rounded-[8px] w-[320px] h-[190px] p-[16px] mr-[15px] shadow-[0px_0px_8px_rgba(0,0,0,0.2)]"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <Image alt="picture" src={babyswim} />
                      </div>

                      <div className="flex flex-col">
                        <div className="flex gap-1 items-center">
                          <Image alt="picture" src={categorypic} />
                          <p id="caption">{item.job_category}</p>
                        </div>
                        <h6 id="heading6">{item.job_title}</h6>

                        <p className="max-[700px]:hidden mb-[4px]" id="caption">
                          {shortenText(item.job_description, 15)}
                        </p>

                        <div className="flex gap-4 ">
                          <div className="flex gap-1 items-center">
                            <Image
                              alt="picture"
                              src={calendar}
                              className="h-[12.5px] w-[12.5px]"
                            />
                            <p className="max-[700px]:text-[8px] max-[700px]:leading-[10px] text-[12px] leading-[16px] font-normal">
                              {item.job_type}
                            </p>
                          </div>
                          <div className="flex gap-1 items-center">
                            <Image alt="picture" src={dollar} />
                            <p className="max-[700px]:text-[8px] max-[700px]:leading-[10px] text-[12px] leading-[16px] font-normal">{`${item.salary_min_range} - ${item.salary_max_range}`}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between items-center min-[701px]:gap-[75px]">
                      <div className="flex gap-2 p-1 items-center flex-row w-[200px]">
                        <div>
                          <Image
                            alt="picture"
                            src={following}
                            className="w-[22px] h-[22px] border-[#F48FB1]"
                          />
                        </div>
                        <button
                          onClick={() =>
                            handleFollowClick(
                              item.job_post_id,
                              item.professional_follow_jobs[0]
                            )
                          }
                        >
                          {item.professional_follow_jobs[0] === undefined
                            ? "Follow"
                            : item.professional_follow_jobs[0].follow_status
                              ? "Following"
                              : "Follow"}
                          {/* {followStatus[item.job_post_id]
                            ? "Following"
                            : "Follow"} */}
                        </button>
                      </div>
                      <div className="max-[768px]:flex max-[768px]:items-center">
                        <button
                          className="border-[1px] border-[pink] rounded-[15px] max-[700px]:py-[3px] max-[700px]:px-[5px] py-1 px-3"
                          onClick={() => handleSeeMore(item.job_post_id)}
                        >
                          SEE MORE
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Findthatjob;