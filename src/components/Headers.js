import React from 'react'
import people from '@/image/people.png'
import Image from 'next/image'

const Headers = () => {
  return (
    <div className="min-w-full h-screen flex flex-wrap flex-col justify-start items-center bg-[#F5F5F6] ">
      <h2 className='mt-[2rem]'>The place where</h2>
      <h2 className = 'mb-[2rem]'>you get<span style={{ fontFamily: 'Montserrat' }} className='font-sans  text-6xl text-pink-500 font-light '>  that </span>job</h2>
      <h5 className= "w-[45rem] whitespace-wrap text-center">With our Machine Learning algorithm you will get that job
in no time. We promise you! Just give us the money and we 
will take care of it.</h5>
      <button className="uppercase mt-[2rem] mb-[2.063rem] w-[16.5rem] h-[3.5rem] rounded-[16px] bg-pink-primary text-white-primary tracking-[0.078rem] ">create an account now</button>
      <Image alt="profestional worker"
      src={people}
      className='w-[66.375rem] h-[21.875rem] mb-[4rem] '/>
    </div>
  )
}

export default Headers;