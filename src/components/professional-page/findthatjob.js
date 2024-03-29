import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import babyswim from "../../image/babyswim.png";
import following from "../../image/unfollow-btn.png";
import smallfollowing from "@/image/following-btn.png";
// import smallfollowing from "../../image/small-following.png";
import categorypic from "../../image/icon-manu.png";
import calendar from "../../image/icon-calendar.png";
import dollar from "../../image/icon-dollar.png";
import Warning from "../Warning";
import { createClient } from "@supabase/supabase-js";
import logoMockup from "../../image/logo-mockup.png";
import numeral from "numeral";

const Findthatjob = () => {
  const [job, setJob] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [category, setCategory] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [followStatus, setFollowStatus] = useState({});
  const [followIcon, setFollowIcon] = useState(following);
  const [sortAscending, setSortAscending] = useState(false);
  const [sortDescending, setSortDescending] = useState(false);
  const [isAscendingClicked, setIsAscendingClicked] = useState(false);
  const [isDescendingClicked, setIsDescendingClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSortAscending = () => {
    if (!isAscendingClicked) {
      // First click, enable ascending sort and set the clicked state
      setSortAscending(true);
      setSortDescending(false);
      setIsAscendingClicked(true);
      setIsDescendingClicked(false);
    }
  };

  const handleSortDescending = () => {
    if (!isDescendingClicked) {
      // First click, enable descending sort and set the clicked state
      setSortDescending(true);
      setSortAscending(false);
      setIsDescendingClicked(true);
      setIsAscendingClicked(false);
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
  //ตัด recruiters.about_company ให้สั้น
  function shortenText(text, maxLength) {
    if (text !== null && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  useEffect(() => {
    const profId = localStorage.getItem("professional_id");
    const getJobs = async () => {
      try {
        const result = await axios.get(
          `/api/findthatjob?profid=${profId}`
        );
        setJob(result.data.job.data);
        console.log(result.data.job.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    const token = localStorage.getItem("sb:token"); // ใช้ localStorage ในการเก็บ token
    setIsAuthenticated(!!token);
    getJobs();
  }, [isAuthenticated, followStatus]);
  console.log(job);

  if (isLoading) {
    return <div className="bg-[#F5F5F6] h-screen"></div>;
  }
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
        setFollowIcon(smallfollowing);
      } else if (status.follow_status) {
        newFollowStatus[id] = false;
        setFollowIcon(following);
      } else if (!status.follow_status) {
        newFollowStatus[id] = true;
        setFollowIcon(smallfollowing);
      }
    }

    setFollowStatus(newFollowStatus);
    console.log(followStatus);
  };

  const filterJobs = job.filter((jobs) => {
    const lowercaseSearchMessage = searchMessage.toLowerCase();
    const lowercaseJobTitle = jobs.job_title.toLowerCase();
    const lowercaseAboutCompany = jobs.recruiters.company_name.toLowerCase();

    if (
      category !== "Select or create a category" &&
      lowercaseSearchMessage !== "" &&
      selectedJobType !== "Select a type"
    ) {
      return (
        jobs.job_category.includes(category) &&
        (lowercaseJobTitle.includes(lowercaseSearchMessage) ||
          lowercaseAboutCompany.includes(lowercaseSearchMessage)) &&
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
      lowercaseSearchMessage !== "" &&
      selectedJobType !== "Select a type"
    ) {
      return (
        (lowercaseJobTitle.includes(lowercaseSearchMessage) ||
          lowercaseAboutCompany.includes(lowercaseSearchMessage)) &&
        jobs.job_type.includes(selectedJobType)
      );
    } else if (category !== "Select or create a category") {
      return jobs.job_category.includes(category);
    } else if (lowercaseSearchMessage !== "") {
      return (
        lowercaseJobTitle.includes(lowercaseSearchMessage) ||
        lowercaseAboutCompany.includes(lowercaseSearchMessage)
      );
    } else if (selectedJobType !== "Select a type") {
      return jobs.job_type.includes(selectedJobType);
    } else {
      return jobs;
    }
  });

  if (sortAscending) {
    filterJobs.sort((a, b) => a.salary_min_range - b.salary_min_range);
  } else if (sortDescending) {
    filterJobs.sort((a, b) => b.salary_min_range - a.salary_min_range);
  }

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
                    className="text-[#616161] border-solid border border-[#F48FB1] rounded-[8px] w-full max-w-[360px] h-[36px] "
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
                    SORT BY SALARY
                  </p>
                  <div className="flex flex-row items-center max-[900px]:justify-center max-[700px]:justify-center">
                    <button
                      className={`border-solid border border-[#F48FB1] rounded-[8px] px-[4px] mr-[15px] h-[36px] max-[900px]:mr-[10px] max-[700px]:mr-[10px] ${
                        sortAscending ? "bg-[#F48FB1] text-white" : "bg-white"
                      }`}
                      onClick={handleSortAscending}
                    >
                      Low to High
                    </button>
                    <button
                      className={`border-solid border border-[#F48FB1] rounded-[8px] px-[4px] h-[36px] ${
                        sortDescending ? "bg-[#F48FB1] text-white" : "bg-white"
                      }`}
                      onClick={handleSortDescending}
                    >
                      High to Low
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-wrap w-full ">
            <h6
              className="max-[900px]:text-center max-[700px]:text-center mb-4 mt-4 text-[#bf5f82]"
              id="heading6"
            >
              {filterJobs.length} jobs for you
            </h6>
            <div className="flex flex-row flex-wrap gap-[15px] max-[900px]:w-full max-[700px]:w-full">
              {filterJobs.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white flex flex-row flex-wrap justify-center gap-[10px] border-[1px] border-[#E1E2E1] rounded-[8px] max-[900px]:w-full w-[420px] h-[210px] py-[16px] px-[20px] mr-[15px] shadow-[0px_0px_8px_rgba(0,0,0,0.2)] max-[900px]:h-auto"
                  >
                    <div className="flex max-[900px]:flex-col items-center gap-4 flex-wrap max-[435px]:">
                      <div className="max-[400px]:w-full">
                        <Image
                          alt="picture"
                          width={100}
                          height={100}
                          src={
                            item.recruiters.logo === null
                              ? logoMockup
                              : `https://zsvpcibqzkxoqqpektgc.supabase.co/storage/v1/object/public/recruiters_logo/${item.recruiters.logo}`
                          }
                        />
                      </div>

                      <div className="flex flex-col max-[770px]:w-full w-[250px] ">
                        <div className="flex gap-1 items-center">
                          <Image
                            alt="picture"
                            width={11.25}
                            height={12.5}
                            src={categorypic}
                          />
                          <p id="caption">{item.job_category}</p>
                        </div>
                        <h6 id="heading6">{item.job_title}</h6>

                        <p className="max-[700px]:hidden mb-[4px]" id="caption">
                          {item.recruiters.company_name}
                        </p>

                        <div className="flex gap-4 ">
                          <div className="flex gap-1 items-center">
                            <Image
                              alt="picture"
                              width={12.5}
                              height={12.5}
                              src={calendar}
                              className="h-[12.5px] w-[12.5px]"
                            />
                            <p className="max-[700px]:text-[8px] max-[700px]:leading-[10px] text-[12px] leading-[16px] font-normal">
                              {item.job_type}
                            </p>
                          </div>
                          <div className="flex gap-1 items-center">
                            <Image
                              alt="picture"
                              width={12.5}
                              height={12.5}
                              src={dollar}
                            />
                            <p className="max-[700px]:text-[8px] max-[700px]:leading-[10px] text-[12px] leading-[16px] font-normal">{`${numeral(
                              item.salary_min_range
                            ).format("0a")} - ${numeral(
                              item.salary_max_range
                            ).format("0a")}`}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row items-center  ">
                      <div className="flex gap-2 p-1 items-center flex-row ">
                        <div>
                          {item.professional_follow_jobs[0] === undefined && (
                            <Image
                              alt="picture"
                              src={following}
                              className="w-[22px] h-[22px] border-[#F48FB1]"
                            />
                          )}
                          {item.professional_follow_jobs[0]?.follow_status && (
                            <Image
                              alt="picture"
                              src={smallfollowing}
                              className="w-[40px] max-[900px]:h-auto h-[40px] border-[#F48FB1]"
                            />
                          )}
                          {item.professional_follow_jobs[0] !== undefined &&
                            !item.professional_follow_jobs[0].follow_status && (
                              <Image
                                alt="followIcon"
                                src={following}
                                className="w-[22px] max-[900px]:h-auto h-[22px] border-[#F48FB1]"
                              />
                            )}
                        </div>
                        <button
                          className=""
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
                      <div className="max-[768px]:flex max-[768px]:items-center max-[900px]:ml-0 ml-[70px]">
                        <button
                          className="border-[1px] border-[pink] rounded-[15px] max-[700px]:py-[3px] max-[700px]:px-[5px] py-1 px-3 active:opacity-[60%] hover:text-pink-primary"
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
