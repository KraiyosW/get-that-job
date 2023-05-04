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
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import jwtDecode from "jwt-decode";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Following = async () => {
  const [job, setJob] = useState([]);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [followStatus, setFollowStatus] = useState({});
  // const [applicationStatus, setApplicationStatus] = useState({});
  const AllJob = async () => {
    try {
      const result = await axios.get("http://localhost:3000/api/findthatjob");
      setJob(result.data.job.data);
    } catch {
      console.error();
    }
  };

  // const result = await axios.get(
  //     'http://localhost:3000/api/findthatjob'
  // );
  // const result = await supabase.from("jobs_postings").find('*')

  // const handleFollowClick = (id) => {
  //     setFollowStatus({
  //         ...followStatus,
  //         [id]: !followStatus[id],
  //     });
  // };

  // const handleApplyClick = (id) => {
  //     setApplicationStatus({
  //         ...applicationStatus,
  //         [id]: !applicationStatus[id],
  //     });
  // };

  const [jobList, setJobList] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [formData, setFormData] = useState({
    job_category: "",
    job_type: "",
    salary_min_range: "",
    salary_max_range: "",
  });

  // สร้าง state สำหรับเก็บข้อมูล option ที่เลือก
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  // ฟังก์ชั่นสำหรับการเปลี่ยนค่าใน form
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      job_category: selectedOption,
      job_type: selectedJobType,
    });
  };

  // ฟังก์ชั่นสำหรับการเลือก option ของ job category
  const handleSelectOption = (event) => {
    setSelectedOption(event.target.value);
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
//   const getProfessionalData = async () => {
//     const email = localStorage.getItem("email");
//     console.log("email", email);
//     const { data: professional, error: professionalError } = await supabase

//       .from("professional")
//       .select("*")
//       .eq("email", email)
//       .eq("role", "professional");

//     console.log(professional[0].professtional_id);

//     if (professionalError) {
//       console.log(professionalError);
//       throw new Error(professionalError.message);
//     }
//   };
//   useEffect(() => {
//     getProfessionalData();
//   }, []);

  const [followStatus, setFollowStatus] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("sb:token");
    // ใช้ localStorage ในการเก็บ token
    setIsAuthenticated(!!token);

    AllJob();
  }, [isAuthenticated]);
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return (
      <div className="max-w-full max-h-screen flex flex-col flex-warp items-center px-[50px] min-[768px]:px-[120px] ">
        <h2 className="mt-[3rem] text-center text-pink-primary" id="heading2">
          !!! Please log in before accessing this page !!!
        </h2>
        <Link
          href="/login"
          className="mt-[2rem] underline underline-offset-[10px] hover:text-pink-primary text-[2rem] "
        >
          Login page.....
        </Link>
      </div>
    );
  }

  const filteredJobs = job.filter(
    (item) =>
      item.job_title.toLowerCase().includes(searchMessage.toLowerCase()) ||
      item.job_category.includes(selectedOption)
  );

  //Following Job

  const handleFollowClick = async (id) => {
    console.log(id);
    // await axios.post("/api/following"), data
    setFollowStatus({
      ...followStatus,
      [id]: !followStatus[id],
    });
  };

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
                    value={selectedOption}
                    onChange={(event) => {
                      handleSelectOption(event);
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
                    <option value="Past-Time">Past Time</option>
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
                      value={formData.salary_min_range}
                      onChange={handleChange}
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
                      value={formData.salary_max_range}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-wrap w-full items-center">
            <h6 className="max-[700px]:text-center mb-4 mt-4">
              {filteredJobs.length} jobs for you
            </h6>
            <div className="flex felx-row flex-wrap gap-[15px]">
              {filteredJobs.map((item, index) => {
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
                          onClick={() => handleFollowClick(item.job_post_id)}
                        >
                          {followStatus[item.job_post_id]
                            ? "Following"
                            : "Follow"}
                        </button>

                        {/* <button
                          className={`bg-white border border-pink-primary rounded-md font-bold text-pink-primary py-1 px-3 hover:bg-pink-primary hover:text-white transition-colors duration-300 ${
                            followStatus
                              ? "bg-pink-primary text-white ring-2 ring-pink-primary"
                              : ""
                          }`}
                          onClick={() => setFollowStatus(!followStatus)}
                        >
                          {followStatus ? "Following" : "Follow"}
                        </button> */}
                      </div>

                      {/* <div className="flex gap-2 p-1 items-center">
                        <Image
                          alt="picture"
                          src={following}
                          className="w-[22px] h-[22px]"
                        />
                        <button>Follow</button>
                      </div> */}
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

export default Following;
