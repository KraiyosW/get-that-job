import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import babyswim from '../../image/babyswim.png'
import following from '../../image/following.png'
import categorypic from '../../image/categorypic.png'
import calendar from '../../image/calendar.png'
import dollar from '../../image/dollar.png'
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const Findthatjob = () => {
    const [job, setJob] = useState([]);
    // const [followStatus, setFollowStatus] = useState({});
    // const [applicationStatus, setApplicationStatus] = useState({});

    const AllJob = async () => {
        try {
            const result = await supabase.from('jobs_postings').select('*').limit(10)
            // const result = await axios.get(
            //     'http://localhost:3000/api/findthatjob'
            // );
            // const result = await supabase.from("jobs_postings").find('*')
            setJob(result.data);
            console.log(result.data);
        } catch {
            console.error();
        }
    };

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

    useEffect(() => {
        AllJob();
    }, []);

    return (

        <div className='flex'>
            <main className='flex flex-col flex-wrap w-full items-center' >
                <h6 className='mb-4'>{job.length} jobs for you</h6>
                {job.map((item) => {
                    <div key={item.job_post_id} className='grid grid-cols-3 gap-[15px]'>
                        <div className='flex flex-col justify-center gap-[10px] border-[1px] border-[#E1E2E1] rounded-[8px] w-[290px] h-[170px] p-[16px] mr-[15px] shadow-[0px_0px_8px_rgba(0,0,0,0.2)]'>
                            <div className='flex items-center gap-4'>
                                <div>
                                    <Image alt='picture' src={babyswim} />
                                </div>

                                <div className='flex flex-col'>
                                    <div className='flex gap-1 items-center'>
                                        <Image alt='picture' src={categorypic} />
                                        <p id='caption'>{item.job_category}</p>
                                    </div>
                                    <h6>{item.job_title}</h6>
                                    <h2 id='subtitle2'>{item.job_descrition}</h2>
                                    <div className='flex gap-4 '>
                                        <div className='flex gap-1 items-center'>
                                            <Image alt='picture' src={calendar} className='h-[12.5px] w-[12.5px]' />
                                            <p id='caption'>{item.job_type}</p>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <Image alt='picture' src={dollar} />
                                            <p id='caption'>{`${item.salary_min_range} - ${item.salary_max_range}`}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='flex gap-2 p-1'>
                                    <Image alt='picture' src={following} className='w-[22px] h-[22px]' />
                                    <button >Follow</button>
                                </div>
                                <div>
                                    <button className='border-[1px] border-[pink] rounded-[15px] py-1 px-3'>
                                        SEE MORE
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>
                }
                )
                }

            </main >
        </div >
    )
}

export default Findthatjob
        // <div className='flex'>
        //     <main className='flex flex-col flex-wrap w-full items-center' >
        //         <h6 className='mb-4'>12 jobs for you</h6>
        //         <div className='grid grid-cols-3 gap-[15px]'>
        //             <div className='flex flex-col justify-center gap-[10px] border-[1px] border-[#E1E2E1] rounded-[8px] w-[290px] h-[170px] p-[16px] mr-[15px] shadow-[0px_0px_8px_rgba(0,0,0,0.2)]'>
        //                 <div className='flex items-center gap-4'>
        //                     <div>
        //                         <Image src={babyswim} />
        //                     </div>

        //                     <div className='flex flex-col'>
        //                         <div className='flex gap-1 items-center'>
        //                             <Image src={categorypic} />
        //                             <p id='caption'>Manufactoring</p>
        //                         </div>
        //                         <h6>The job title</h6>
        //                         <h2 id='subtitle2'>The Company Name </h2>
        //                         <div className='flex gap-4 '>
        //                             <div className='flex gap-1 items-center'>
        //                                 <Image src={calendar} className='h-[12.5px] w-[12.5px]' />
        //                                 <p id='caption'>Full time</p>
        //                             </div>
        //                             <div className='flex gap-1 items-center'>
        //                                 <Image src={dollar} />
        //                                 <p id='caption'>2.0k - 2.5k</p>
        //                             </div>
        //                         </div>

        //                     </div>
        //                 </div>
        //                 <div className='flex justify-between'>
        //                     <div className='flex gap-2 p-1'>
        //                         <Image src={following} className='w-[22px] h-[22px]' />
        //                         <button >Follow</button>
        //                     </div>
        //                     <div>
        //                         <button className='border-[1px] border-[pink] rounded-[15px] py-1 px-3'>
        //                             SEE MORE
        //                         </button>
        //                     </div>
        //                 </div>


        //             </div>
        //         </div>
        //     </main >
        // </div >
        // <div className='flex'>
        //     <SideBarProfessional />
        //     <main className='flex flex-col flex-wrap ' >
        //         <h6 className='bg-black'>{data.length} jobs for you</h6>
        //         {data.map((item) => {
        //             <div key={item.id} className='w-1/3 p-4'>
        //                 <div className='flex items-center'>
        //                     <div>
        //                         <Image src={item.img} />
        //                     </div>

        //                     <div className='flex flex-col'>
        //                         <p id='caption'>{item.category}</p>
        //                         <h6>{item.title}</h6>
        //                         <h2 id='subtitle2'>{item.companyName}</h2>
        //                         <span>
        //                             <div>
        //                                 <Image src={calendar} />
        //                                 <p id='caption'>{item.type}</p>
        //                             </div>
        //                             <div>
        //                                 <Image src={dollar} />
        //                                 <p id='caption'>{item.salary}</p>
        //                             </div>
        //                         </span>

        //                     </div>
        //                 </div>
        //                 <div className='flex justify-between'>
        //                     <div className='flex'>
        //                         <Image src={followStatus[item.id] ? following : notFollowing} />
        //                         <button onClick={() => handleFollowClick(item.id)}>
        //                             {followStatus[item.id] ? 'FOLLOWING' : 'FOLLOW'}
        //                         </button>
        //                     </div>
        //                     <div>
        //                         <button onClick={() => handleApplyClick(item.id)}>
        //                             {applicationStatus[item.id] ? 'APPLIED' : 'SEE MORE'}
        //                         </button>
        //                     </div>
        //                 </div>
        //             </div>
        //         })}
        //     </main>
        // </div>
