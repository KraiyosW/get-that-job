import React from 'react'
import man from "@/image/man.png";
import Image from "next/image";

const BackgroundMan = ({ children }) => {
  return (
    <div className="bg-white-secondary px-[50px] min-[769px]:px-[220px] min-h-screen w-full relative">
         <Image className="absolute bottom-0 right-0 pr-0 min-[821px]:pr-[155px] w-[32%] md:w-[40%] lg:w-[35%]"
        src={man}
        alt="Background Image"
      />
    {children}
  </div>
  )
}

export default BackgroundMan;