import React from "react";
import { useRouter } from "next/router";
import SidebarProfessional from "@/components/SidebarProfessional";
import Image from "next/image";
import applyIcon from "@/image/icon-apply.png";
import calendarIcon from "@/image/icon-calendar.png";
import dollarIcon from "@/image/icon-dollar.png";
import followingIcon from "@/image/icon-following.png";
import manuIcon from "@/image/icon-manu.png";
import backIcon from "@/image/icon-back.png";
import companyLogo from "@/image/logo-web-works.png";

function JobDetails() {
  const router = useRouter();
  const findThatJob = router.query["jobId"];
  return (
    <div className="job-detail-app flex">
      <SidebarProfessional />
      <div className="flex flex-col w-full items-center ml-[240px]">
        <div className="header flex flex-row w-full justify-between">
          <div className="left-section ml-[148px] mt-[32px]">
            <button className="back-button flex flex-row relative">
              <Image
                className="w-[8px] h-[13px] absolute mt-[5px]"
                src={backIcon}
                alt="back icon button"
              />
              <p className="ml-[12px]">BACK</p>
            </button>
            <div className="company-card flex flex-row mt-[18px] mb-[20px]">
              <div className="logo w-[80px] h-[80px] rounded-[8px] shadow-md mr-[18px]">
                <Image
                  className="w-[75px] h-[75px] "
                  src={companyLogo}
                  alt="work logo"
                />
              </div>
              <div className="company-title">
                <h5 id="heading5" className="company-name">
                  The Company Name SA
                </h5>
                <button className="subscription-status mt-[16px] text-right relative w-[123px]">
                  <Image
                    className="w-[40px] h-[40px] absolute bottom-[-8px]"
                    src={followingIcon}
                    alt="Apply Button Icon"
                  />
                  Following
                </button>
              </div>
            </div>
          </div>
          <button class="apply-button bg-pink-primary mr-[144px] mt-[84px] rounded-[16px] text-white w-[173px] h-[56px] py-[16px] pr-[24px] text-right font-medium relative">
            <Image
              className="w-[20px] h-[20px] absolute left-[27px]"
              src={applyIcon}
              alt="apply icon"
            />
            Apply Now
          </button>
        </div>
        <h3 id="heading3">The Job Title {findThatJob}</h3>
        <div className="flex flex-row justify-center">
          <p>Posted 2 days ago</p>
        </div>
        <div className="title-header flex flex-col ">
          <div className="card-section flex flex-row justify-center">
            <div className="category flex flex-col items-center bg-white border-[1px] border-pink-tertiary rounded-[8px] px-[32px] mx-[16px]">
              <div>Category</div>
              <div className="">Manufacturing</div>
            </div>
            <div className="type flex flex-col items-center  bg-white border-[1px] border-pink-tertiary  shadow-md rounded-[8px] px-[32px] mx-[16px]">
              <div>Type</div>
              <div>Full time</div>
            </div>
            <div className="salary flex flex-col items-center  bg-white border-[1px] border-pink-tertiary shadow-md rounded-[8px] px-[32px] mx-[16px]">
              <div>Salary</div>
              <div>2,000 - 2,500</div>
            </div>
          </div>
        </div>
        <section className="content-section flex flex-col w-[760px] ml-[136px]">
          <div className="about-company">
            <h5 id="heading5" className="text-pink-tertiary ">
              About The company name SA
            </h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
              corporis ab. Dolor recusandae at laudantium temporibus
              perspiciatis amet commodi aut nemo nesciunt! A ipsum magnam facere
              saepe, quasi dolorum! Tempore saepe nesciunt consequatur quas
              animi modi ad, asperiores mollitia veritatis deleniti quo nemo
              voluptatum adipisci ipsam soluta laborum magnam illo. Iusto
              distinctio esse ea libero inventore asperiores. Laudantium eius,
              omnis rem beatae fugit molestias asperiores praesentium autem
              consequatur dolores ad accusamus voluptatem soluta velit
              architecto esse, odio nobis vel deserunt aliquid amet unde nam?
              Quos magnam nemo possimus ea obcaecati provident dolorum porro
              dolorem, mollitia, assumenda dicta unde sunt repellendus.
            </p>
          </div>
          <div className="about-job">
            <h5 id="heading5" className="text-pink-tertiary ">
              About the job position
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque porta nunc viverra velit tincidunt, non vehicula
              augue vehicula. Donec viverra luctus nisl, sed vehicula ligula.
              Vivamus maximus metus a magna fermentum ullamcorper. Phasellus
              ultrices vestibulum ligula ut pellentesque. Quisque quis congue
              quam. Nunc porttitor risus lorem, in blandit augue iaculis vitae.
              Cras sit amet fringilla neque. Fusce ac elit ut quam ultrices
              bibendum. Curabitur vitae dignissim quam. Suspendisse aliquet
              massa id orci volutpat ullamcorper. Nunc at ante sem. Etiam
              elementum, mi eget aliquam lobortis, elit libero tempus ex, vel
              pretium nisi risus ac augue.
            </p>
          </div>
          <div className="mandatory-requirements">
            <h5 id="heading5" className="text-pink-tertiary ">
              Mandatory Requirements
            </h5>
            <p>
              - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br />
              - Aeneanaliquam turpis eget egestas porta.
              <br />
              - Quisque tristique nuncut sem pretium bibendum.
              <br />
              - Phasellus sit amet turpis laoreet, mattis elit ut, luctus
              ligula.
              <br />- Nullam blandit arcu eget justo hendrerit finibus.
            </p>
          </div>
          <div className="optional-requirements">
            <h5 id="heading5" className="text-pink-tertiary ">
              Optional Requirements
            </h5>
            <p>
              - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br />- Maecenas vel metus imperdiet, malesuada dolor a, pulvinar
              tellus.
            </p>
          </div>
          <button class="apply-button bg-pink-primary mr-[144px] mt-[84px] rounded-[16px] text-white w-[173px] h-[56px] py-[16px] pr-[24px] text-right font-medium relative">
            <Image
              className="w-[20px] h-[20px] absolute left-[27px]"
              src={applyIcon}
              alt="apply icon"
            />
            Apply Now
          </button>
        </section>
      </div>
    </div>
  );
}

export default JobDetails;
