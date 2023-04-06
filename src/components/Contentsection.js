import React from 'react'
import findjob from '../image/icon.svg'
import Image from 'next/image'

const Contentsection = () => {
  return (

    <div className="w-full h-screen flex flex-row mt-[20px]">
        <div className="w-7/12 h-3/5 bg-[#BF5F82] flex flex-row justify-center items-center ">
          <div className="w-9/12 h-auto flex flex-col">
            <h3 className=" text-white">Find your next job</h3>
            <h5 className=" text-white">
              Our Machine learning algorithm is so good that it's even illegal
              in some countries. Join us to use our barelly legal algorithm that
              is actually a group of interns that work on our basement.
            </h5><br/>
            <h5 className=" text-white">
              We have a job for you, no matter your background or previous
              experience. Is sending random memes through chat your only skill?
              That's ok, we got you, our Rock Star Meme Curator role is here for
              you.
            </h5>
          </div>
        </div>
        <div className="w-5/12 h-3/5 flex my-[40] bg-white justify-center items-center">
          <Image
            alt="find-your-next-job-icon"
            src={findjob}
            className="w-[60%] h-[51%]"
          />
        </div>
      </div>

  )
}

export default Contentsection


