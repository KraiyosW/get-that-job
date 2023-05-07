import React from 'react'
import Image from "next/image";
import noCandidate from "../image/no-candidate.png"
import Link from "next/link";

function NoCandidateFound() {
  return (
    <>
    <div className="bg-white-secondary w-screen h-screen flex flex-col px-[320px] items-center justify-center">
        <div className="flex flex-row" id="text-wraning">
        <h4 className="mr-[20px]" id="heading4">There are no candidates found.</h4>
        <Link  href='/job-postings' className=" text-pink-primary hover:text-[#3cc8b4]"><h4 className="underline underline-offset-8" id="heading4">go back.</h4></Link>
        </div>
    <Image src={noCandidate} alt="page not found" className="w-[60%] mt-[50px]"/>
    </div>
    </>
  )
}

export default NoCandidateFound