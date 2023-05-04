import React from 'react'
import Image from "next/image";
import warning from "../image/warning.png"
import arrival from "../image/arrival.png"
import Link from "next/link";

function Warning() {
  return (
    <div className="bg-white-secondary w-screen h-screen flex flex-row px-[320px] items-center justify-center">
        <Image className="w-[50%]" src={warning} alt="warning picture"/>
        <div className="w-[60%] flex flex-col items-center" id="text-wraning">
        <h4 className="mt-[3rem] text-center text-blac" id="heading4">You haven't logged in yet.<br/> Please log in.</h4>
        <Link  href='/login' className="mt-[10px] flex flex-row text-pink-primary hover:text-[#3cc8b4] text-[1.5rem] "><Image className="mr-[5px] w-[40px] h-[40px]" src={arrival} alt="Login page"/>login page</Link>
        </div>
    </div>
  )
}

export default Warning