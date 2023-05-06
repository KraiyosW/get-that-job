import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import babyswim from "../../image/babyswim.png";
import following from "../../image/following.png";
import smallfollowing from "../../image/smallfollowing.png";
import categorypic from "../../image/categorypic.png";
import calendar from "../../image/calendar.png";
import dollar from "../../image/dollar.png";
import Warning from "../Warning";
import Link from "next/link";
import jwtDecode from "jwt-decode";
import { createClient } from "@supabase/supabase-js";
import numeral from "numeral";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";



const Following = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const [job, setJob] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [category, setCategory] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [followStatus, setFollowStatus] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const [selectedJob, setSelectedJob] = useState(null);



  const getJobs = async () => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/followingtab?profid=${profId}`
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
  }, [isAuthenticated]);

  useEffect(() => {
    getJobs();
  }, [followStatus]);

  console.log(job);

  if (!isAuthenticated) {
    return <Warning />;
  }
  const profId = localStorage.getItem("professional_id");

  const handleFollowClick = async () => {
    await axios.post("/api/following", {
      professional_id: profId,
      job_post_id: selectedJob.job_post_id,
    });

    const newFollowStatus = { ...followStatus };
    if (selectedJob.follow_status) {
      newFollowStatus[selectedJob.job_post_id] = false;
    } else {
      newFollowStatus[selectedJob.job_post_id] = true;
    }

    setFollowStatus(newFollowStatus);
  };


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

          <div className="flex flex-col flex-wrap w-full items-start">
            <h6 className="max-[700px]:text-center mb-4 mt-4">
              {job.length} You are following jobs.
            </h6>
            <div className="flex felx-row flex-wrap gap-[15px]">
              {job.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white flex felx-row flex-wrap justify-center gap-[10px] border-[1px] border-[#E1E2E1] rounded-[8px] w-[420px] h-[210px] p-[16px] mr-[15px] shadow-[0px_0px_8px_rgba(0,0,0,0.2)]"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <Image alt="picture" src={
                          item.jobs_postings.recruiters.logo === null
                            ? logoMockup
                            : `https://zsvpcibqzkxoqqpektgc.supabase.co/storage/v1/object/public/recruiters_logo/${item.jobs_postings.recruiters.logo}`
                        }
                          width={100}
                          height={100} />
                      </div>

                      <div className="flex flex-col">
                        <div className="flex gap-1 items-center">
                          <Image alt="picture" src={categorypic} />
                          <p id="caption">{item.jobs_postings.job_category}</p>
                        </div>
                        <h6 id="heading6">{item.jobs_postings.job_title}</h6>

                        <p className="max-[700px]:hidden mb-[4px]" id="caption">
                          {shortenText(item.jobs_postings.job_description, 15)}
                        </p>

                        <div className="flex gap-4 ">
                          <div className="flex gap-1 items-center">
                            <Image
                              alt="picture"
                              src={calendar}
                              className="h-[12.5px] w-[12.5px]"
                            />
                            <p className="max-[700px]:text-[8px] max-[700px]:leading-[10px] text-[12px] leading-[16px] font-normal">
                              {item.jobs_postings.job_type}
                            </p>
                          </div>
                          <div className="flex gap-1 items-center">
                            <Image alt="picture" src={dollar} />
                            <p className="max-[700px]:text-[8px] max-[700px]:leading-[10px] text-[12px] leading-[16px] font-normal">{`${numeral(item.jobs_postings.salary_min_range).format("0a")} - ${numeral(item.jobs_postings.salary_max_range).format("0a")}`}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between items-center min-[701px]:gap-[75px]">
                      <div className="flex gap-2 p-1 items-center flex-row ">
                        <div>
                          <Image
                            alt="picture"
                            src={smallfollowing}
                            className="w-[40px] h-[40px] border-[#F48FB1]"
                          />
                        </div>
                        <Button variant="ghost"
                          color="pink" className="followButton" onClick={() => {
                            setSelectedJob(item.jobs_postings);
                            setIsOpen(true);
                          }}>
                          {item.follow_status ? "Following" : null}
                        </Button>
                        <AlertDialog
                          isOpen={isOpen}
                          leastDestructiveRef={cancelRef}
                          onClose={onClose}
                        >
                          <AlertDialogOverlay>
                            <AlertDialogContent>
                              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Unfollow Job
                              </AlertDialogHeader>

                              <AlertDialogBody>
                                {selectedJob && `Are you sure you want to unfollow ${selectedJob.job_title}?`}
                              </AlertDialogBody>

                              <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                  Cancel
                                </Button>
                                <Button
                                  colorScheme="red"
                                  onClick={() => {
                                    handleFollowClick(item.job_post_id, item.follow_status);
                                    onClose();
                                  }}
                                  ml={3}
                                >
                                  Unfollow
                                </Button>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialogOverlay>
                        </AlertDialog>


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

export default Following;