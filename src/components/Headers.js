import React from 'react'
import people from '@/image/people.png'
import Image from 'next/image'

const Headers = () => {
  return (
    <div className=" flex flex-wrap flex-col justify-start items-center bg-[#F5F5F6]">
      <h1 style={{ fontFamily: 'Montserrat' }} className="font-sans font-light text-6xl mt-8">The place where</h1>
      <h1 style={{ fontFamily: 'Montserrat' }} className="font-sans font-light text-6xl mt-2 ">you get<span style={{ fontFamily: 'Montserrat' }} className='font-sans  text-6xl text-pink-500 font-light'>  that </span>job</h1>
      <p style={{ fontFamily: 'Montserrat' }} className='w-128 mt-8 whitespace-wrap font-sans font-light text-2xl text-center text-black leading-[1.813rem]'>With our Machine Learning algorithm you will get that job
in no time. We promise you! Just give us the money and we 
will take care of it.</p>
      <button style={{ fontFamily: 'Inter' }} className="mt-[2rem] mb-[2.063rem] w-[16.5rem] h-[3.5rem] rounded-[16px] bg-[#F48FB1] text-white text-[1.2rem] tracking-[0.078rem]">create an account now</button>
      <Image alt="profestional worker"
      src={people}
      className='w-[66.375rem] h-[21.875rem] mb-[4rem] ' ></Image>
    </div>
  )
}

export default Headers;