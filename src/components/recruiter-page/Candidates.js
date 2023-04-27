import React from "react";
import Image from "next/image";
import linkin from "../../image/linkin.png";
import phone from "../../image/phone.png"
import JobDate from "../../image/job-date.png";
import waiting from "../../image/waiting.png";
import download from "../../image/download.png";
import { useState } from "react";

function Candidates() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
      <>
        <div className="flex flex-col">
          <div className="bg-white px-[16px] py-[16px] border rounded-lg shadow-xl w-[100%] h-auto ">
            <div className="flex flex-col" id="box-job-all">
              <div
                className="max-[700px]:text-center flex flex-row flex-wrap justify-between w-[100%]"
                id="job-head-row"
              >
                <div id="job-title flex flex-col">
                  <h6 className="mb-[4px]" id="heading6">
                    ชื่อแคนดิเดต
                  </h6>
                  <div className="max-[700px]:mb-[15px] flex flex-row">
                    <section className="flex flex-row mr-[9px] items-center">
                      <Image
                        src={linkin}
                        alt="job position"
                        className="w-[15px] h-[15px] mr-[6px]"
                      />
                      <div className="text-grey-primary" id="body2">
                        ตำแหน่งงาน
                      </div>
                    </section>
                  </div>
                </div>
                <div className="max-[700px]:flex-col flex flex-row">
                  <div className="max-[700px]:flex-row mr-[20px] flex flex-col items-start justify-center">
                    <div className="flex flex-row mb-[4px]">
                    <Image
                      src={JobDate}
                      alt="Email Candidate"
                      className="max-[700px]:mr-[10px] mr-[6px]"
                    />
                    <div className="max-[700px]:mr-[5px] text-grey-secondary" id="caption">
                    ramon.valdes@vecindad.com
                    </div>
                    </div>
                    <div className="flex flex-row">
                    <Image
                      src={phone}
                      alt="Phone Candidate"
                      className="max-[700px]:mr-[10px] mr-[6px]"
                    />
                    <div className="max-[700px]:mr-[5px] text-grey-secondary" id="caption">
                    +524831212891
                    </div>
                    </div>
                   
                  </div>
                  <div className="max-[700px]:mt-[5px] max-[700px]:mb-[5px] max-[700px]:flex-row max-[700px]:justify-start mr-[20px] flex flex-col items-center justify-center">

                      <Image
                        src={JobDate}
                        alt="Email Candidate Date"
                        className="mr-[6px]"
                      />
                    <div className="text-grey-primary" id="caption">เวลาที่แคนดิเดตกดสมัครมา</div>
                  </div>
                  <div className="max-[700px]:flex-row max-[700px]:justify-start flex flex-col items-center justify-center">
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
                </div>
                <div className="flex flex-row items-center">
                  <button className="button_bg_white">
                    Mark as started
                  </button>
                  {/* <button className="button_pink_tertiary flex flex-row">
                    <Image
                      src={pencil}
                      alt="Edit Botton"
                      className="w-[20px] h-[20px] mr-[5px]"
                    />
                    EDIT
                  </button> */}
                                  <button
                onClick={toggleExpanded}
                className="text-pink-tertiary hover:text-pink-secondary transition-all duration-150 focus:outline-none ml-[22px] mt-[30px]"
              >
                <span className="ml-1">
                  {isExpanded ? (
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
              <div className={`mt-1 mb-2 ${isExpanded ? "" : "hidden"}`}>
                <div className="text-pink-tertiary mt-[10px] mb-[8px]" id="body1">
                  About the job position
                </div>
                <div className="" id="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  quis diam fringilla, luctus lectus dictum, volutpat lacus.
                  Vivamus lacinia felis ut mauris lacinia elementum. Sed faucibus
                  dapibus egestas. Etiam dolor neque, posuere at purus cursus,
                  molestie eleifend lacus. Aenean eu diam eu enim commodo accumsan
                  ut sit amet odio. Nam maximus varius leo, et porttitor ante
                  sodales ut. Pellentesque euismod commodo nunc ut tincidunt. Sed
                  fringilla nunc leo, a euismod ipsum aliquet placerat. Integer
                  suscipit semper mi, sit amet mollis augue mollis in. Proin
                  vestibulum accumsan elit, id pellentesque diam fermentum eget.
                  Aliquam mattis quis quam ut faucibus. Duis finibus nulla nec
                  enim eleifend dapibus.
                </div>
              <div>
                <div className="text-pink-tertiary mt-[16px] mb-[8px]" id="body1">
                  About the job position
                </div>
                <div className="" id="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  quis diam fringilla, luctus lectus dictum, volutpat lacus.
                  Vivamus lacinia felis ut mauris lacinia elementum. Sed faucibus
                  dapibus egestas. Etiam dolor neque, posuere at purus cursus,
                  molestie eleifend lacus. Aenean eu diam eu enim commodo accumsan
                  ut sit amet odio. Nam maximus varius leo, et porttitor ante
                  sodales ut. Pellentesque euismod commodo nunc ut tincidunt. Sed
                  fringilla nunc leo, a euismod ipsum aliquet placerat. Integer
                  suscipit semper mi, sit amet mollis augue mollis in. Proin
                  vestibulum accumsan elit, id pellentesque diam fermentum eget.
                  Aliquam mattis quis quam ut faucibus. Duis finibus nulla nec
                  enim eleifend dapibus.
                </div>
              </div>
              <div>
                <div className="text-pink-tertiary mt-[16px] mb-[8px]" id="body1">
                  About the job position
                </div>
                <div className="" id="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  quis diam fringilla, luctus lectus dictum, volutpat lacus.
                  Vivamus lacinia felis ut mauris lacinia elementum. Sed faucibus
                  dapibus egestas. Etiam dolor neque, posuere at purus cursus,
                  molestie eleifend lacus. Aenean eu diam eu enim commodo accumsan
                  ut sit amet odio. Nam maximus varius leo, et porttitor ante
                  sodales ut. Pellentesque euismod commodo nunc ut tincidunt. Sed
                  fringilla nunc leo, a euismod ipsum aliquet placerat. Integer
                  suscipit semper mi, sit amet mollis augue mollis in. Proin
                  vestibulum accumsan elit, id pellentesque diam fermentum eget.
                  Aliquam mattis quis quam ut faucibus. Duis finibus nulla nec
                  enim eleifend dapibus.
                </div>
              </div>
              <div className="flex justify-center mt-[25px]">
              <button className="button_bg_white flex flex-row justify-center w-[200px]">
              <Image
                        src={download}
                        alt="Download cv"
                        className="mr-[6px]"
                      />
              Download cv
                  </button>
                  </div>
                  </div>
                  </div>
            </div>
          </div>
        </div>
      </>
    );
  }

export default Candidates