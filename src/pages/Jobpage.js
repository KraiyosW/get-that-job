import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import SideBarProfessional from '../components/SidebarProfessional'
const JobPage = () => {
    const [data, setData] = useState([]);
    const [followStatus, setFollowStatus] = useState({});
    const [applicationStatus, setApplicationStatus] = useState({});

    const AllJob = async () => {
        try {
            const result = await axios.get(
                'http://localhost:3000/api/job'
            );
            setData(result.data);
        } catch {
            console.error();
        }
    };

    const handleFollowClick = (id) => {
        setFollowStatus({
            ...followStatus,
            [id]: !followStatus[id],
        });
    };

    const handleApplyClick = (id) => {
        setApplicationStatus({
            ...applicationStatus,
            [id]: !applicationStatus[id],
        });
    };

    useEffect(() => {
        AllJob();
    }, []);

    return (
        <div className='flex'>
            <SideBarProfessional />
            <main className='flex flex-col flex-wrap ' >
                <h6 className='bg-black'>{data.length} jobs for you</h6>
                {data.map((item) => {
                    <div key={item.id} className='w-1/3 p-4'>
                        <div className='flex items-center'>
                            <div>
                                <Image src={item.img} />
                            </div>

                            <div className='flex flex-col'>
                                <p id='caption'>{item.category}</p>
                                <h6>{item.title}</h6>
                                <h2 id='subtitle2'>{item.companyName}</h2>
                                <span>
                                    <div>
                                        <Image src={calendar} />
                                        <p id='caption'>{item.type}</p>
                                    </div>
                                    <div>
                                        <Image src={dollar} />
                                        <p id='caption'>{item.salary}</p>
                                    </div>
                                </span>

                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex'>
                                <Image src={followStatus[item.id] ? following : notFollowing} />
                                <button onClick={() => handleFollowClick(item.id)}>
                                    {followStatus[item.id] ? 'FOLLOWING' : 'FOLLOW'}
                                </button>
                            </div>
                            <div>
                                <button onClick={() => handleApplyClick(item.id)}>
                                    {applicationStatus[item.id] ? 'APPLIED' : 'SEE MORE'}
                                </button>
                            </div>
                        </div>
                    </div>
                })}
            </main>
        </div>
    )
}

export default JobPage