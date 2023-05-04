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
import Link from "next/link";
import jwtDecode from "jwt-decode";

const Following = () => {
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
      const result = await axios.get("http://localhost:3000/api/findthatjob");
      setJob(result.data.job.data);
    } catch (error) {}
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
  }, [isAuthenticated]);

  // if (!isAuthenticated) {
  //   return <Warning />;
  // }

  const handleFollowClick = async (id) => {
    console.log(id);
    setFollowStatus({
      ...followStatus,
      [id]: !followStatus[id],
    });
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

  const FollowingJob = () => {
    return (
      <main className="bg-[#F5F5F6] h-screen">
        <div className="max-[700px]:ml-0 ml-[240px] max-[700px]:py-[16px] py-[32px] max-[700px]:px-[64px] px-[128px]">
          <div className="flex flex-col">
            <div className="text-[#616161] w-[100%] h-[100%] flex-col grid mt-[10px]">
              <div className="flex flex-col flex-wrap">
                <h4 className="mb-[16px]" id="heading4">
                  Following
                </h4>
              </div>
            </div>

            <div className="flex flex-col flex-wrap w-full items-center">
              <h6 className="max-[700px]:text-center mb-4 mt-4">
                You are follwing {filterJobs.length} jobs.
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

                          <p
                            className="max-[700px]:hidden mb-[4px]"
                            id="caption"
                          >
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
                            onClick={() => handleFollowClick(item.job_post_id)}
                          >
                            {followStatus[item.job_post_id]
                              ? "Following"
                              : "Follow"}
                          </button>
                        </div>
                        <div className="max-[768px]:flex max-[768px]:items-center w-[160px]">
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

  return isAuthenticated ? <FollowingJob /> : <Warning />;
};

export default Following;
