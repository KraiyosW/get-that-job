import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import babyswim from '../image/babyswim.png'
import following from "../image/following.png";
import categorypic from "../image/categorypic.png";
import calendar from "../image/calendar.png";
import dollar from "../image/dollar.png";


export async function getServerSideProps() {
    try {
        const result = await axios.get(
            'http://localhost:3000/api/findthatjob'
        );
        const jobData = result.data.job.data
        return {
            props: {
                jobData
            }
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                jobData: []
            }
        };
    }
}

export default function Findthatjob({ jobData }) {

    if (!jobData) {
        // Handle the case when jobData is null or undefined
        return <div>No job data available</div>;
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

                                        <button
                                            className="bg-white border-solid border border-[#F48FB1] rounded-[8px] px-[8px] mr-[15px] h-[36px]"

                                        >
                                            Low to High
                                        </button>
                                        <button
                                            className="bg-white border-solid border border-[#F48FB1] rounded-[8px] px-[8px] h-[36px]"

                                        >
                                            High to Low
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col flex-wrap w-full items-center">
                        <h6 className="max-[700px]:text-center mb-4 mt-4">

                        </h6>
                        <div className="flex felx-row flex-wrap gap-[15px]">
                            {jobData.map((item, index) => {
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
                                                    {item.job_description}
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

                                                >

                                                </button>
                                            </div>
                                            <div className="max-[768px]:flex max-[768px]:items-center">
                                                <button
                                                    className="border-[1px] border-[pink] rounded-[15px] max-[700px]:py-[3px] max-[700px]:px-[5px] py-1 px-3"

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

